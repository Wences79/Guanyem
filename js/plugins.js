/* Extra Guanyem theme js plugins go here */

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.13
 */
;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));


/**
* Translation for Crowdfunding texts
*/
var textsCrowdfunding = [
    {
        project: "prova-completa",
        texts: [
        {ca:"Prova Completa", es:"Prueba Completa"},
        {ca:"Descripció curta del projecte.", es:"Descripción corta del proyecto."},
        {ca:"Descripció ben llarga del projecte, amb molta més informació.", es:"Descripción bien larga del proyecto, con mucha más información."},
        {ca:"Ajuda amb el que puguis", es:"Ayuda con lo que puedas"},
        {ca:"Ajuda amb el que puguis a partir d'1€", es:"Ayuda con lo que puedas a partir de 1€"},
        {ca:"Ajuda amb el que puguis a partir d'un euro, un cop sel·leccionis la opció podràs augmentar la quantitat tant com vulguis.", es:"Ayuda con lo que puedas a partir de un euro, una vez selecciones la opción podrás aumentar la cantidad tanto como quieras."},
        {ca:"Preguntes més freqüents.", es:"Preguntas más frecuentes."}]
    }
];
function translateCrowdfunding() {

    function translateElements(textsProject, elements) {
        var el = elements.length;
        var tpl = textsProject.texts.length;
        for(var i = 0; i < el; ++i) {
            for(var j = 0; j < tpl; ++j) {
                if(elements[i].textContent === textsProject.texts[j].ca) {
                    elements[i].textContent = textsProject.texts[j].es;
                } else if(elements[i].textContent === textsProject.texts[j].ca + ":") {
                    elements[i].textContent = textsProject.texts[j].es + ":";
                }
            }
        }
    }

    if(config.LANGUAGE.substr(0, 2) === "es") {
        //Translate only in Spanish.
        var project = window.location.href;
        var index = project.lastIndexOf("?");
        if (index > 0) {
            project = project.substring(0, index - 1);
        }
        index = project.lastIndexOf("/");
        if (index === project.length - 1) {
            project = project.substring(0, index);
        }
        index = project.lastIndexOf("/");
        project = project.substring(index + 1);

        var tcl = textsCrowdfunding.length;
        for (var i = 0; i < tcl; ++i) {
            var textsProject = textsCrowdfunding[i];
            if (textsProject.project === project) {
                //It's the project we need to translate, so go for it.
                //Order: P, H1, OPTION, A, DIV
                var elems = document.getElementsByTagName("p");
                translateElements(textsProject, elems);
                elems = document.getElementsByTagName("h1");
                translateElements(textsProject, elems);
                elems = document.getElementsByTagName("option");
                translateElements(textsProject, elems);
                elems = document.getElementsByTagName("a");
                translateElements(textsProject, elems);
                elems = document.getElementsByTagName("div");
                translateElements(textsProject, elems);
                elems = document.getElementsByTagName("span");
                translateElements(textsProject, elems);
            }
        }
    }
}