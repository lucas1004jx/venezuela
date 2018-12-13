


const log=console.log;


(function () {
function preloader(){
var tl = new TimelineMax();

tl.set('.progress',{opacity:0})
.to('.preloader',0.5,{scale:2})
   .to('#preloader',0.5,{opacity:0},'-=0.3')
   .set('#preloader',{display:'none'});
}
setTimeout(function(){
  preloader();
},1000);

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
    $(window).resize(function () {
        mediaQuery();
    });




//-------------pixi container----move flag--------
    if(screen === 'desktop'){


var app            = new PIXI.Application( 1837,1167, { transparent: true });
var resources=PIXI.loader.resources;
var stage               = new PIXI.Container();
var displacementSprite  = new PIXI.Sprite.fromImage( 'images/clouds.jpg' );
var displacementFilter  = new PIXI.filters.DisplacementFilter( displacementSprite );

PIXI.loader
    .add('flag','images/flag.jpg')
    .load(init);

function init() {
    document.querySelector('.pixi-container').appendChild( app.view );

    app.view.style.objectFit = 'cover';
    app.view.style.width     = '100%';
    app.view.style.height    = '100%';
    app.view.style.webkitTransform = ' scale(1.2)';
    app.view.style.transform = 'scale(1.2)';
    //console.log(app.view.style.top);

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    stage.filters = [displacementFilter];
    displacementSprite.scale.x = 0.8;
    displacementSprite.scale.y = 0.8;
    displacementFilter.autoFit = true;

    stage.addChild( displacementSprite );

    var flag   = new PIXI.Sprite(resources.flag.texture);


    app.stage.addChild(stage);
    stage.addChild( flag );
    //stage.addChild(overlay);


}

    var ticker = new PIXI.ticker.Ticker();

    ticker.autoStart = true;

    ticker.add(function( delta ) {
        displacementSprite.x += 1 * delta;
        displacementSprite.y += 10;

    });

    }


//-------map popup--------------

//close popup box
    $('.popup .close').click(function () {
        //closePopup();
        openPopup().reverse(0).timeScale(2);
    });
//open popup box
    $('.mark,.comunidad li').not('.text-container .mark').click(function () {
        openPopup();
    });


    function closePopup() {
       var tween= TweenMax.to('.popup-container',0.5,{opacity:0,onComplete:function () {
                $('.popup-container').css('display','none');
            }})

        return tween;
    }

    function openPopup() {
        var tl= new TimelineMax({onReverseComplete:function () {
                $('.popup-container').css('display','none');
            }});
        tl.set('.popup-container',{display:'block'})
            .fromTo('.popup-container',0.5,{opacity:0,scale:0,transformOrigin:'50% 50%'},{opacity:1,scale:1})
            .fromTo('.popup',0.5,{opacity:0},{opacity:1});
        return tl
            .fromTo('.popup .flecha-left',0.5,{opacity:0,x:20},{opacity:1,x:0},'flecha')
            .fromTo('.popup .flecha-right',0.5,{opacity:0,x:-20},{opacity:1,x:0},'flecha');
    }


    // -----------------load popup box data----------

    var cuidad,index,comunidad_index;
    var comunidad = ['madrid','toledo','coruña','barcelona'];
    var mark_containers=$('.mark-container');

 $('.mark-container, .comunidad li').not('.text-container .mark').click(function () {

     cuidad=$(this).parent().attr('data-cuidad');
     index=$(this).attr('data-index');

     content(this);
 });



     $('.flecha-left').click(function () {
         prev();
     });
     $('.flecha-right').click(function () {
         next();
     });


     function content(ele) {
         var propietario=$(ele).find('.info .propietario').text();
         var tipo=$(ele).find('.info .tipo').text();
         var localizacion =$(ele).find('.info .localizacion').text();
         var superficie=$(ele).find('.info .superficie').text();
         var valor=$(ele).find('.info .valor').text();
         var year=$(ele).find('.info .year').text();

         comunidad_index=comunidad.indexOf(cuidad);


         $('.text-info .propietario p').text(propietario);
         $('.text-info .tipo p').text(tipo);
         $('.text-info .localizacion p').text(localizacion);
         $('.text-info .superficie p').text(superficie);
         $('.text-info .valor p').text(valor);
         $('.text-info .year p').text(year);
     }


     function prev() {

        index--;
        // if(index<1){
        //     comunidad_index--;
        //     if(comunidad_index<0){
        //         comunidad_index=comunidad.length-1;
        //     }
        //  cuidad=comunidad[comunidad_index];
        //     index=data[cuidad].length;
        //
        // }
         if(index<=0){
             index=mark_containers.length;
         }
log(index);
        content(mark_containers[index-1]);

     }

     function next() {
         index++;

         // if(index>data[cuidad].length){
         //     comunidad_index++;
         //     if(comunidad_index>comunidad.length-1){
         //         comunidad_index=0;
         //     }
         //     cuidad=comunidad[comunidad_index];
         //     index=1;
         //
         // }

         if(index>=mark_containers.length){
             index=1;
         }

         content(mark_containers[index-1]);
     }



//drop down function

    $('.dropdown').click(function () {
       $(this).toggleClass('hide');
        var content=$(this).parent().parent().find('.content');
       if($(this).hasClass('hide')){

           TweenMax.to(content,0.5,{height:0});

       }else{
           $('html, body').animate({
               scrollTop: $(this).offset().top+100
           }, 1000);
           TweenLite.set(content, {height:'auto'})
           TweenLite.from(content, 0.2, {height:0})
       }
    });

   //animation

function mapEnter() {
    var tl = new TimelineMax();
    var map=$('.map-container .map');
    var miniMap=$('.mini-map-container .mini-map');
    var pixi=$('.pixi-container');
    var overlay=$('.pixi-container .overlay');
    tl.from(pixi,2,{opacity:0,scale:3})
        .fromTo(overlay,1,{opacity:0,left:-200},{opacity:1},'map')
        .fromTo(map,1,{scale:0,scale:0,opacity:0},{scale:1,opacity:1,scale:1},'map')
        .staggerFromTo(miniMap,0.5,{scale:2,opacity:0,transformOrigin:'50% 50%'},{scale:1,opacity:1},0.1);


    return tl;
}

function markEnter() {
    var marks=$('.mark').not('.text-container .mark');

    var tl=new TimelineMax();
    tl.staggerFromTo(marks,0.1,{y:-100,opacity:0},{y:0,opacity:1},0.1);
    return tl;

}


function logoEnter() {
   var tween= TweenMax.from('.logo-elpais',1,{opacity:0,x:-100});
   return tween;
}

function textEnter() {
    var tween = TweenMax.fromTo('.text-container',1,{opacity:0,x:200},{opacity:1,x:0});
    return tween;
}

function mouseEnter() {
    var tween = TweenMax.fromTo('.mouse_down',0.5,{opacity:0,y:50},{opacity:1,y:0});
    return tween;
}

function comunidadEnter() {
    var tl = new TimelineMax({
        onStart:function () {
            $(dropdown_madrid).addClass('hide');
        }
    });

    var comunidad = $('.comunidades section');
    var dropdown_madrid=$('.comunidad-madrid header .dropdown');
    var content_madrid=$('.comunidad-madrid .content');

    tl.staggerFromTo(comunidad,0.5,{opacity:0,y:100},{opacity:1,y:0},0.2)
        .from(content_madrid,0.5,{height:0,onStart:function () {
                $(dropdown_madrid).removeClass('hide');
            }});


    return tl;
}

var masterTl= new TimelineMax({onStart:function () {
        $('body,html').css('overflow','hidden');
    },
    onComplete:function () {
        $('body,html').css('overflow','scroll');
    }});

if(screen ==='desktop'){
    masterTl
        .add(mapEnter(),'init')
        .add(markEnter())
        .add(logoEnter(),'init -=1')
        .add(textEnter(),'init -=1')
        .add(mouseEnter())
        .add(comunidadEnter());
}else{
    masterTl
        .add(mapEnter(),'init')
        .add(logoEnter(),'init -=1')
        .add(textEnter(),'init -=1')
        .add(comunidadEnter())
        .add(markEnter());
}



//hover mark tooltip

    $('.mark').not('.text-container .mark').hover(function () {
        var ele=$(this).parent();
        if($(ele).find('.tooltip').length == 0){
            tooltip(ele);
        }
    });

     $('.mark-container').mouseleave(function () {
         var ele=$(this);
        $(ele).find('.tooltip').remove();
     });

    function tooltip(ele) {
        var info=$(ele).attr('data-info');
        new Promise(function (resolve,reject) {
            $(ele).append('<span class="tooltip">'+info+'</span>');
            resolve();
        }).then(function () {
            TweenMax.from('.tooltip',0.5,{opacity:0,y:20});
        })

    }




})()
