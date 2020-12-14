var myMap;
ymaps.ready(init);


function init(){ 
  myMap = new ymaps.Map("map", {
      center: [53.902496, 27.561481],
      zoom: 11
  }); 

  createMap();
  events();
  closeGallery()
}



function events(){
  $('.dropdown-item').on('click', function(){
 
   getGallery($(this).data().id);  
   getDesc($(this).data().id);
   getStreet($(this).data().id);
   closeButtonDisplay() 
        
  });
}

                          
function createMap(){
  var myPlacemark = [];
  
  for(var i = 0; i < markers.length; i++){
    myPlacemark[i] = new ymaps.Placemark(markers[i].cords, markers[i].data);
    myMap.geoObjects.add(myPlacemark[i]);
    (function(ind){
      myPlacemark[i].events.add('click', function (e) {
        getGallery(ind);
        getStreet(ind)
        getDesc(ind) 
        closeButtonDisplay() 
          
      });
    })(i)
    
  }
}

function getGallery(id) {
    
    var selectMarker=markers[id];
        
    $('.sl-container').empty();
    
    var slider= getSlider(selectMarker.gallery);
    $('.sl-container').append(slider); 
    
    $('.sl').slick({
      slidesToShow: 3,
      slidesToScroll: 3
    });
}


function getSlider(g){
    var divs="";
    for(var i=0; i<g.length; i++) {
        divs+=divImage(g[i]);
     }
    var allDivs='<div class="sl">'+divs+'</div>';
    return allDivs;
}

function divImage(imageName) {
    var divIMG='<img src="assets/images/'+imageName+'"/>';
    var divString='<div class="sl__slide">'+divIMG+'</div>';
    return divString;
}


function getText(h) {
      var text='<p class="description-text">'+ h +'</p>';
      return text;
    }


function getStreetText(h) {
    
      var text='<p class="street-text">'+ h +'</p>';
      return text;
    }

function getStreet(id) {
    
    var selectMarker=markers[id];    
    $('.street').empty();
    var desc= getStreetText(selectMarker.data.hintContent);
    $('.street').append(desc); 
       
}


function getDesc(id) {
    
    var selectMarker=markers[id];    
    $('.description-container').empty();
    var desc= getText(selectMarker.descriptionText.street);
    $('.description-container').append(desc); 
     var desc2= getText(selectMarker.descriptionText.times);
    $('.description-container').append(desc2); 
    var desc3= getText(selectMarker.descriptionText.days);
    $('.description-container').append(desc3); 
    var desc4= getText(selectMarker.descriptionText.weekend);
    $('.description-container').append(desc4); 
       
}



function closeButtonDisplay(){
    $('.close-button').css('display','block');
}


function closeGallery(){
  $('.close-button').on('click', function(){
 
   $('.sl-container').empty();
   $('.close-button').css('display','none');
   $('.street').empty();
      
  });
}




