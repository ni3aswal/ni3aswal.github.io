var msnry = new Masonry( '.grid', {
  itemSelector: '.photo-item',
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

var unsplashID = '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

var infScroll = new InfiniteScroll( '.grid', {
  path: function() {
    return 'https://api.unsplash.com/photos?client_id='
      + unsplashID + '&page=' + this.pageIndex;
  },
  // load response as flat text
  responseType: 'text',
  outlayer: msnry,
  status: '.page-load-status',
  history: false,
});

var Elem = document.createElement('div');

infScroll.on( 'load', function( response ) {
  var data = JSON.parse( response );
  console.log("Data JSON");
  console.log(data);
  
  // response data into HTML
  var itemsHTML = data.map( getItemHTML ).join(''); //DATA is converted to html all special chracters remoevd
      
	  // console.log("Data getItemHTML");
              // console.log(data.map( getItemHTML ));
               // console.log("Data itemsHTML");
                    // console.log(itemsHTML);
                    
					// convert HTML string into elements
					 
			   /*data.forEach((item) => {
			 
			   var aaa='<div class="photo-item"><img class="photo-item__image" src="'+item.urls.full+'" alt="Photo by Clay Banks" /><p class="photo-item__caption"><a href="https://unsplash.com/@claybanks?utm_source=infinite-scroll-demos&utm_medium=referral&utm_campaign=api-credit">Clay Banks</a> </p> </div>';
			  console.log(aaa);
			  Elem.innerHTML = Elem.innerHTML+aaa;//itemsHTML;
			  // append item elements

			  }); */
 
    Elem.innerHTML = itemsHTML;
  var items = Elem.querySelectorAll('.photo-item');
  imagesLoaded( items, function() {
    infScroll.appendItems( items );
    msnry.appended( items );
  });
  
});
infScroll.on( 'request', function( path ) {
	console.log("request");
	document.getElementById('loader').style.display='block';
	}
	);
	infScroll.on( 'load', function( response, path ) {
	console.log("appended");
	document.getElementById('loader').style.display='none';
	});
infScroll.loadNextPage();


var itemTemplateSrc = document.querySelector('#photo-item-template').innerHTML;

function getItemHTML( photo ) {
  return microTemplate( itemTemplateSrc, photo );
}

function microTemplate( src, data ) {
  // replace tags in source
  return src.replace( /\{\{([\w\-_\.]+)\}\}/gi, function( match, key ) {
    // get objects and get value from it
    var value = data;
    key.split('.').forEach( function( part ) {
      value = value[ part ];
    });

	return value;
	
  });
}