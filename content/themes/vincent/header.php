<!doctype html>
<html lang="sv">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width">
	<title><?php if(is_page(67)) { bloginfo('name'); echo ' | '; bloginfo('description');  } else { wp_title(); } ?></title>
	<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Vincent Orback sökning">
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
	<link rel="apple-touch-icon" href="<?php bloginfo('template_url'); ?>/images/icons/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php bloginfo('template_url'); ?>/images/icons/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('template_url'); ?>/images/icons/apple-touch-icon-114x114.png">
	<link rel="icon" href="<?php bloginfo('template_url'); ?>/images/icons/favicon.png">
	<!--[if IE]><link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/images/icons/favicon.ico"><![endif]-->
	<meta name="application-name" content="Vincent Orback | Webbdesigner i Stockholm"/> 
	<meta name="msapplication-TileColor" content="#e93e36"/>
	<meta name="msapplication-TileImage" content="<?php bloginfo('template_url'); ?>/images/icons/windows.png">
	<link rel="author" href="https://plus.google.com/105789918295897205990/posts">
	<?php wp_head(); ?>	
	</head>
<body>
<!--[if lt IE 8]><p class=chromeframe>Hej! Din webbläsare är väldigt gammal! Jag rekommenderar att du <a href="http://browsehappy.com/">uppgraderar till en ny webbläsare</a> så att du bättre kan uppleva den här webbplatsen. Jag föredrar <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a> men välj vilken du tycker kännas bäst!<br>//Vincent</p><![endif]-->

<nav class="main-nav" role="navigation">
<?php wp_nav_menu(array ('menu' => 'Huvudmeny')); ?>
</nav>
