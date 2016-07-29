<?php
/*
Plugin Name: Social Posts
Plugin URI: http://www.vincentorback.se
Description: A small but awesome plugin to display social icons before or after posts.
Version: 0.1
Author: Vincent Orback
Author URI: http://www.vincentorback.se
License: GPL2
Tags: Facebook, Twitter, Flickr, Google Plus, Youtube, LinkedIn, DeviantArt, Meetup, MySpace, Soundcloud, Bandcamp, Pinterest, Vimeo and RSS feed
*/

/* ----------------------------------------------------------------------
   Plugin CSS
------------------------------------------------------------------------- */
add_action('wp_head','SocialPostsCss');
// Widget stylesheet
function SocialPostsCss() {
	echo '<link href="'.plugins_url('style.css', __FILE__).'" type="text/css" rel="stylesheet" media="screen" />';
}







/* ----------------------------------------------------------------------
   Output the icons
   
   http://www.zurb.com/playground/social-webicons
   
   http://css-tricks.com/snippets/wordpress/automatic-social-media-links/
------------------------------------------------------------------------- */
function add_post_content($content) {
	if(!is_feed() && !is_home()) {
		$content .= '
		<div class="social-posts-plugin">
			<p class="social-posts-title">Share this post</p>
			<ul class="big-social-icons">
				<li><a href="#" class="facebook-big"></a></li>
				<li><a href="#" class="twitter-big"></a></li>
				<li><a href="#" class="gplus-big"></a></li>
				<li><a href="#" class="linkedin-big"></a></li>
				<li><a href="#" class="email-big"></a></li>
			</ul>
		</div>
		
		<div class="social-posts-plugin">
			<p class="social-posts-title">Share this post</p>
			<ul class="medium-social-icons">
				<li><a href="#" class="facebook-medium"></a></li>
				<li><a href="#" class="twitter-medium"></a></li>
				<li><a href="#" class="gplus-medium"></a></li>
				<li><a href="#" class="linkedin-medium"></a></li>
				<li><a href="#" class="email-medium"></a></li>
			</ul>
		</div>
		
		<div class="social-posts-plugin">
			<p class="social-posts-title">Share this post</p>
			<ul class="small-social-icons">
				<li><a href="#" class="facebook-small"></a></li>
				<li><a href="#" class="twitter-small"></a></li>
				<li><a href="#" class="gplus-small"></a></li>
				<li><a href="#" class="linkedin-small"></a></li>
				<li><a href="#" class="email-small"></a></li>
			</ul>
		</div>
		';
	}
	return $content;
}
add_filter('the_content', 'add_post_content');


/* ----------------------------------------------------------------------
   Including the settings
------------------------------------------------------------------------- */
function socialposts_admin() {  
    include('ep_social_settings.php');  
}  
function socialposts_admin_actions() {  
    add_options_page('Social Posts Settings', 'Social Posts Settings', 'manage_options', 'SocialPostsSettings', 'socialposts_admin');  
}  
add_action('admin_menu', 'socialposts_admin_actions'); 




/* And a link to it */
function socialposts_settings_link($links) { 
  $settings_link = '<a href="options-general.php?page=SocialPostsSettings">' . __( 'Inställningar' ) . '</a>'; 
  array_unshift($links, $settings_link); 
  return $links; 
}
 
$plugin = plugin_basename(__FILE__); 
add_filter("plugin_action_links_$plugin", 'socialposts_settings_link' );





