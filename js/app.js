
//--------------mediaQuery
var screen='';
function mediaQuery(){
    if (window.matchMedia('(max-width: 599px)').matches) {
        screen='mobile';
    }else{
        screen='desktop';

    }
}

mediaQuery();
window.addEventListener('resize',function(){
  mediaQuery();
});

document.addEventListener('DOMContentLoaded',function(){
var head = document.querySelector('head');
var loadJS =function(src){

  let jsLink = document.createElement('script');
  jsLink.src=src;
  jsLink.async = false;
  head.appendChild(jsLink);
}


new Promise(function(resolve,reject){
  if(screen == 'desktop'){
    loadJS('js/pixi.min.js');
  }
  loadJS("js/jquery-3.2.1.min.js");
  loadJS("js/TweenMax.min.js");

  resolve('load');
}).then(function(resolve,reject){
  loadJS('js/main.js');

});

});
