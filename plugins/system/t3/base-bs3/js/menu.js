/*
     Copyright (C) 2004-2013 JoomlArt.com. All Rights Reserved.
 @license       GNU General Public License version 2 or later; see LICENSE.txt
 @authors       JoomlArt, JoomlaBamboo, (contribute to this project at github
                & Google group to become co-author)
 @Google group: https://groups.google.com/forum/#!forum/t3fw
 @Link:         http://t3-framework.org
------------------------------------------------------------------------------
*/
(function(e){var m=function(a,d){this.$menu=e(a);this.$menu.length&&(this.options=e.extend({},e.fn.t3menu.defaults,d),this.child_open=[],this.loaded=!1,this.start())};m.prototype={constructor:m,start:function(){if(!this.loaded){this.loaded=!0;var a=this,d=this.options,f=this.$menu;this.$items=f.find("li");this.$items.each(function(c,f){var g=e(this),b=g.children(".dropdown-menu"),h=g.children("a"),l={$item:g,child:b.length,link:h.length,clickable:!(h.length&&b.length),mega:g.hasClass("mega"),status:"close",
timer:null,atimer:null};g.data("t3menu.item",l);if(b.length&&!d.hover)g.on("click",function(c){c.stopPropagation();g.hasClass("group")||"close"!=l.status||(c.preventDefault(),a.show(l))});else g.on("click",function(a){a.stopPropagation()});if(d.hover&&(g.on("mouseover",function(c){if(!g.hasClass("group")){var b=e(c.target);b.data("show-processed")||(b.data("show-processed",!0),setTimeout(function(){b.data("show-processed",!1)},10),a.show(l))}}).on("mouseleave",function(c){if(!g.hasClass("group")){var b=
e(c.target);b.data("hide-processed")||(b.data("hide-processed",!0),setTimeout(function(){b.data("hide-processed",!1)},10),a.hide(l))}}),h.length&&b.length))h.on("click",function(a){return l.clickable})});e(document.body).on("tap hideall.t3menu",function(c){clearTimeout(a.timer);a.timer=setTimeout(e.proxy(a.hide_alls,a),"tap"==c.type?500:a.options.hidedelay)});f.find(".mega-dropdown-menu").on("tap hideall.t3menu",function(a){a.stopPropagation();a.preventDefault();return!1})}},show:function(a){e.inArray(a,
this.child_open)<this.child_open.length-1&&this.hide_others(a);e(document.body).trigger("hideall.t3menu",[this]);clearTimeout(this.timer);clearTimeout(a.timer);clearTimeout(a.ftimer);clearTimeout(a.ctimer);"open"==a.status&&a.$item.hasClass("open")&&this.child_open.length||(a.mega?(clearTimeout(a.astimer),clearTimeout(a.atimer),this.position(a.$item),a.astimer=setTimeout(function(){a.$item.addClass("animating")},10),a.atimer=setTimeout(function(){a.$item.removeClass("animating")},this.options.duration+
50),a.timer=setTimeout(function(){a.$item.addClass("open")},100)):a.$item.addClass("open"),a.status="open",a.child&&-1==e.inArray(a,this.child_open)&&this.child_open.push(a));a.ctimer=setTimeout(e.proxy(this.clickable,this,a),300)},hide:function(a){clearTimeout(this.timer);clearTimeout(a.timer);clearTimeout(a.astimer);clearTimeout(a.atimer);clearTimeout(a.ftimer);a.mega?(a.$item.addClass("animating"),a.atimer=setTimeout(function(){a.$item.removeClass("animating")},this.options.duration),a.timer=setTimeout(function(){a.$item.removeClass("open")},
100)):a.$item.removeClass("open");a.status="close";for(var d=this.child_open.length;d--;)this.child_open[d]===a&&this.child_open.splice(d,1);a.ftimer=setTimeout(e.proxy(this.hidden,this,a),this.options.duration);this.timer=setTimeout(e.proxy(this.hide_alls,this),this.options.hidedelay)},hidden:function(a){"close"==a.status&&(a.clickable=!1)},hide_others:function(a){var d=this;e.each(this.child_open.slice(),function(e,c){a&&(c==a||c.$item.has(a.$item).length)||d.hide(c)})},hide_alls:function(a,d){if(!a||
"tap"==a.type||"hideall"==a.type&&this!=d){var f=this;e.each(this.child_open.slice(),function(a,d){d&&f.hide(d)})}},clickable:function(a){a.clickable=!0},position:function(a){var d=a.children(".mega-dropdown-menu"),f=d.is(":visible");f||d.show();var c=a.offset(),h=a.outerWidth(),g=e(window).width()-this.options.sb_width,b=d.outerWidth(),k=a.data("level");f||d.css("display","");d.css({left:"",right:""});1==k?(a=a.data("alignsub"),k=f=0,"justify"!=a&&(a||(a="left"),"center"==a?(c=c.left+h/2,e.support.t3transform||
(k=-b/2,d.css(this.options.rtl?"right":"left",k+h/2))):c=c.left+("left"==a&&this.options.rtl||"right"==a&&!this.options.rtl?h:0),this.options.rtl?"right"==a?c+b>g&&(f=g-c-b,d.css("left",f),g<b&&d.css("left",f+b-g)):(c<("center"==a?b/2:b)&&(f=c-("center"==a?b/2:b),d.css("right",f+k)),c+("center"==a?b/2:0)-f>g&&d.css("right",c+("center"==a?(b+h)/2:0)+k-g)):"right"==a?c<b&&(f=c-b,d.css("right",f),b>g&&d.css("right",b-g+f)):(c+("center"==a?b/2:b)>g&&(f=g-c-("center"==a?b/2:b),d.css("left",f+k)),0>c-("center"==
a?b/2:0)+f&&d.css("left",("center"==a?(b+h)/2:0)+k-c)))):this.options.rtl?a.closest(".mega-dropdown-menu").parent().hasClass("mega-align-right")?c.left+h+b>g&&(a.removeClass("mega-align-right"),0>c.left-b&&d.css("right",c.left+h-b)):0>c.left-b&&(a.removeClass("mega-align-left").addClass("mega-align-right"),c.left+h+b>g&&d.css("left",g-c.left-b)):a.closest(".mega-dropdown-menu").parent().hasClass("mega-align-right")?0>c.left-b&&(a.removeClass("mega-align-right"),c.left+h+b>g&&d.css("left",g-c.left-
b)):c.left+h+b>g&&(a.removeClass("mega-align-left").addClass("mega-align-right"),0>c.left-b&&d.css("right",c.left+h-b))}};e.fn.t3menu=function(a){return this.each(function(){var d=e(this),f=d.data("megamenu"),c="object"==typeof a&&a;if(!f)d.data("megamenu",new m(this,c));else if("string"==typeof a&&f[a])f[a]()})};e.fn.t3menu.defaults={duration:400,timeout:100,hidedelay:200,hover:!0,sb_width:20};e(document).ready(function(){var a=e(".t3-megamenu").data("duration")||0;a&&e('<style type="text/css">.t3-megamenu.animate .animating > .mega-dropdown-menu,.t3-megamenu.animate.slide .animating > .mega-dropdown-menu > div {transition-duration: '+
a+"ms !important;-webkit-transition-duration: "+a+"ms !important;}</style>").appendTo("head");var d=a?100+a:500,f="rtl"==e(document.documentElement).attr("dir"),c=e(document.documentElement).hasClass("mm-hover"),h=function(){var a=e('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children();b=b.innerWidth()-b.height(100).innerWidth();a.remove();return b}();e.support.transition||(e(".t3-megamenu").removeClass("animate"),d=100);e("ul.nav").has(".dropdown-menu").t3menu({duration:a,
timeout:d,rtl:f,sb_width:h,hover:c});e(window).load(function(){e("ul.nav").has(".dropdown-menu").t3menu({duration:a,timeout:d,rtl:f,sb_width:h,hover:c})})})})(jQuery);