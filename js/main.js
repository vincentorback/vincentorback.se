var winWidth = $(window).width(), winHeight = $(window).height();

var vincent = {
	init : function() {
		if( $('#portfolio').is('main') ) {
			vincent.smoothScroll();
		}
		if( $('#contact').is('section') ) {
			vincent.inputGrow();
		}
		if( $('#ommig').is('section') ) {
			vincent.readMore();
		}
	},
	smoothScroll : function() {
		if(winWidth > 1140){
			var scrollDistance = 235;
		}
		else {
			var scrollDistance = 30;
		}
		$(".scroll a").bind("click", function(event) {
			$("html, body").stop().animate({
				scrollTop: $($(this).attr("href")).offset().top + scrollDistance
			}, 900);
			event.preventDefault();
		});
	},
	readMore : function() {
		$("#readmore").click(function() {
			$("#hidden").slideDown("normal", function() {
				$("#readmore").fadeOut("normal", function() {
					$(this).remove();
				});
			});
		});
	},
	inputGrow : function() {
		$('#contact-form, #en-contact-form').submit(function(e){
			e.preventDefault();
			var form = $(this);
			var post_url = form.attr('action');
			var post_data = form.serialize();
			var name = $('input[name=name]');
			var email = $('input[name=email]');
			var message = $('textarea[name=message]');
			if (name.val()==='') {
				return false;
			}
			if (email.val()==='') {
				return false;
			}
			if (message.val()==='') {
				return false;
			}
			$.ajax({
				type: 'POST',
				url: post_url,
				data: post_data,
				success: function(msg) {
					$(form).fadeOut(1000, function(){
						form.html(msg).fadeIn("slow");
					});
				}
			});
		});
		var required = ["name", "email", "message"];
		var name = $("#name");
		var email = $("#email");
		var message = $("#message");
		var enemptyerror = "Fill this form would you kindly?";
		var ennameerror = "What's your name?";
		var enemailerror = "Please enter a valid e-mail.";
		var enmessageerror = "What did you come here to say?";
		var emptyerror = "Fyll i det här fältet tack!";
		var nameerror = "Vad heter du?";
		var emailerror = "Fyll i en riktig e-postadress!";
		var messageerror = "Vad var det du ville säga?";
		var i = 0;
		$("#contact-form").submit(function(){
			for (i=0;i<required.length;i++) {
				var input = $('#'+required[i]);
				if ((input.attr("placeholder") === "") || (input.attr("placeholder") === emptyerror)) {
					input.addClass("needsfilled");
					input.attr("placeholder", emptyerror);
				} else {
					input.removeClass("needsfilled");
				}
			}
			if ((name.val() === "") || (name.val() === emptyerror)) {
				name.addClass("needsfilled");
				name.attr("placeholder", nameerror);
			}
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
				email.attr("placeholder", emailerror);
			}
			if ((message.val() === "") || (message.val() === emptyerror)) {
				message.addClass("needsfilled");
				message.attr("placeholder", messageerror);
			}
			if ($(":input").hasClass("needsfilled")) {
				return false;
			} else {
				return true;
			}
		});
		$("#en-contact-form").submit(function(){
			for (i=0;i<required.length;i++) {
				var input = $('#'+required[i]);
				if ((input.attr("placeholder") === "") || (input.attr("placeholder") === enemptyerror)) {
					input.addClass("needsfilled");
					input.attr("placeholder", enemptyerror);
				} else {
					input.removeClass("needsfilled");
				}
			}
			if ((name.val() === "") || (name.val() === emptyerror)) {
				name.addClass("needsfilled");
				name.attr("placeholder", ennameerror);
			}
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
				email.attr("placeholder", enemailerror);
			}
			if ((message.val() === "") || (message.val() === emptyerror)) {
				message.addClass("needsfilled");
				message.attr("placeholder", enmessageerror);
			}
			if ($(":input").hasClass("needsfilled")) {
				return false;
			} else {
				return true;
			}
		});
		$(":input").focus(function(){
			if ($(this).hasClass("needsfilled") ) {
				$(this).val("");
				$(this).removeClass("needsfilled");
			}
		});
		$('input#name').autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('input#phone').autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('input#email').autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('textarea#message').autoResize({
			minHeight: 300,
			maxHeight: 1000,
			animate: false
		});
	}
};

(function(e){function r(t){this.filter(r.resizableFilterSelector).each(function(){new i(e(this),t)});return this}function i(t,n){t.data("AutoResizer")&&t.data("AutoResizer").destroy();n=this.config=e.extend({},r.defaults,n);this.el=t;this.nodeName=t[0].nodeName.toLowerCase();this.originalHeight=t.height();this.previousScrollTop=null;this.value=t.val();n.maxWidth==="original"&&(n.maxWidth=t.width());n.minWidth==="original"&&(n.minWidth=t.width());n.maxHeight==="original"&&(n.maxHeight=t.height());n.minHeight==="original"&&(n.minHeight=t.height());this.nodeName==="textarea"&&t.css({resize:"none",overflowY:"hidden"});t.data("AutoResizer",this);n.animate.complete=function(e){return function(){n.onAfterResize.call(t);return e.apply(this,arguments)}}(n.animate.complete);this.bind()}var t="ar"+ +(new Date),n=r.defaults={onResize:function(){},onBeforeResize:function(){return 123},onAfterResize:function(){return 555},animate:{duration:200,complete:function(){}},extraSpace:50,minHeight:"original",maxHeight:500,minWidth:"original",maxWidth:500};r.cloneCSSProperties=["lineHeight","textDecoration","letterSpacing","fontSize","fontFamily","fontStyle","fontWeight","textTransform","textAlign","direction","wordSpacing","fontSizeAdjust","paddingTop","paddingLeft","paddingBottom","paddingRight","width"];r.cloneCSSValues={position:"absolute",top:-9999,left:-9999,opacity:0,overflow:"hidden"};r.resizableFilterSelector=["textarea:not(textarea."+t+")","input:not(input[type])","input[type=text]","input[type=password]","input[type=email]","input[type=tel]","input[type=url]"].join(",");r.AutoResizer=i;e.fn.autoResize=r;i.prototype={bind:function(){var t=e.proxy(function(){this.check();return!0},this);this.unbind();this.el.bind("keyup.autoResize",t).bind("change.autoResize",t).bind("paste.autoResize",function(){setTimeout(function(){t()},0)});this.el.is(":hidden")||this.check(null,!0)},unbind:function(){this.el.unbind(".autoResize")},createClone:function(){var n=this.el,i=this.nodeName==="textarea"?n.clone():e("<span/>");this.clone=i;e.each(r.cloneCSSProperties,function(e,t){i[0].style[t]=n.css(t)});i.removeAttr("name").removeAttr("id").addClass(t).attr("tabIndex",-1).css(r.cloneCSSValues);this.nodeName==="textarea"?i.height("auto"):i.width("auto").css({whiteSpace:"nowrap"})},check:function(e,t){if(!this.clone){this.createClone();this.injectClone()}var n=this.config,r=this.clone,i=this.el,s=i.val();if(s===this.prevValue)return!0;this.prevValue=s;if(this.nodeName==="input"){r.text(s);var o=r.width(),u=o+n.extraSpace>=n.minWidth?o+n.extraSpace:n.minWidth,a=i.width();u=Math.min(u,n.maxWidth);if(u<a&&u>=n.minWidth||u>=n.minWidth&&u<=n.maxWidth){n.onBeforeResize.call(i);n.onResize.call(i);i.scrollLeft(0);if(n.animate&&!t)i.stop(1,1).animate({width:u},n.animate);else{i.width(u);n.onAfterResize.call(i)}}return}r.width(i.width()).height(0).val(s).scrollTop(1e4);var f=r[0].scrollTop;if(!s){f=n.minHeight;this.previousScrollTop=null}else{if(this.previousScrollTop===f)return;this.previousScrollTop=f;if(f+n.extraSpace>=n.maxHeight){i.css("overflowY","");f=n.maxHeight;t=!0}else if(f+n.extraSpace<=n.minHeight)f=n.minHeight;else{i.css("overflowY","hidden");f+=n.extraSpace}}n.onBeforeResize.call(i);n.onResize.call(i);if(n.animate&&!t)i.stop(1,1).animate({height:f},n.animate);else{i.height(f);n.onAfterResize.call(i)}},destroy:function(){this.unbind();this.el.removeData("AutoResizer");this.clone.remove();delete this.el;delete this.clone},injectClone:function(){(r.cloneContainer||(r.cloneContainer=e("<arclones/>").appendTo("body"))).append(this.clone)}}})(jQuery);


$(document).ready(function() {
	vincent.init();
});