/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'vincent\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-brush' : '&#x61;',
			'icon-tools' : '&#x62;',
			'icon-cog' : '&#x63;',
			'icon-mobile' : '&#x64;',
			'icon-gauge' : '&#x65;',
			'icon-camera' : '&#x66;',
			'icon-cart' : '&#x68;',
			'icon-twitter' : '&#x6b;',
			'icon-linkedin' : '&#x6c;',
			'icon-github' : '&#x6d;',
			'icon-phone' : '&#x6e;',
			'icon-mail' : '&#x6f;',
			'icon-thumbs-up' : '&#x70;',
			'icon-compass' : '&#x71;',
			'icon-search' : '&#x72;',
			'icon-printer' : '&#x73;',
			'icon-trophy' : '&#x74;',
			'icon-megaphone' : '&#x75;',
			'icon-graduation' : '&#x76;',
			'icon-new' : '&#x77;',
			'icon-briefcase' : '&#x78;',
			'icon-screen' : '&#x79;',
			'icon-newspaper' : '&#x7a;',
			'icon-cc' : '&#x31;',
			'icon-cc-by' : '&#x32;',
			'icon-cc-nc' : '&#x33;',
			'icon-dribbble' : '&#x34;',
			'icon-rss' : '&#x35;',
			'icon-export' : '&#x21;',
			'icon-link' : '&#x22;',
			'icon-list' : '&#x28;',
			'icon-cycle' : '&#x2a;',
			'icon-heart' : '&#x23;',
			'icon-googleplus' : '&#x6a;',
			'icon-facebook' : '&#x69;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};