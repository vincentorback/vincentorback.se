<?php


	// Registrerar javascripts
	function vincent_scripts() {
      // Load jQuery
      if ( !is_admin() ) {
         wp_deregister_script('jquery');
         wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', null, null, true);
         wp_enqueue_script('jquery');
      }

	    wp_register_script( 'fitvids', get_template_directory_uri() . '/js/jquery.fitvids.js', array( 'jquery' ), 1.0, true );
	    wp_register_script( 'vincent', get_template_directory_uri() . '/js/vincent.js', array( 'jquery' ), 1.0, true );

	    if ( !is_page(array( 67, 203 ))) {
	        wp_enqueue_script( 'fitvids' );
	    }
	    wp_enqueue_script( 'vincent' );

	}
	add_action( 'wp_enqueue_scripts', 'vincent_scripts' );




	// Registrerar CSS3PIE för css3 i ie8 och äldre
	function my_render_ie_fixes() {
		echo '<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><style type="text/css" media="screen">nav, nav ul, #hem a, #hem a:hover, .cv, .program span, .skills span, .comment, #respond h2, .kommentarer h2 {behavior: url(' . get_template_directory_uri() .'/js/pie/PIE.htc);}</style><![endif]--><!-- [if lt IE 8]><script src="http://www.vincentorback.se/wp-content/themes/vincent/js/lte-ie7.js></script><![endif]-->';
	}
	add_action('wp_head', 'my_render_ie_fixes', 8);


	// Tillåter inläggen att ha bilder
	add_theme_support( 'post-thumbnails' );


	// Clean up the <head>
	function removeHeadLinks() {
    	remove_action('wp_head', 'rsd_link');
    	remove_action('wp_head', 'wlwmanifest_link');
    }
    add_action('init', 'removeHeadLinks');
    remove_action('wp_head', 'wp_generator');


    // Registrera sidfältet
    if (function_exists('register_sidebar')) {
    	register_sidebar(array(
    		'name' => 'Sidebar Widgets',
    		'id'   => 'sidebar-widgets',
    		'description'   => 'Widgets för sidomenyn i bloggen',
    		'before_widget' => '<div id="%1$s" class="widget %2$s">',
    		'after_widget'  => '</div>',
    		'before_title'  => '<h2>',
    		'after_title'   => '</h2>'
    	));
    }


    // Registrera menyer
	function register_v_menus() {
	  register_nav_menus(
	    array(
	      'huvud-meny' => __( 'Huvudmeny' ),
	      'english-menu' => __( 'Enlgishmenu' ),
	      'blogg-meny' => __( 'Bloggmeny' )
	    )
	  );
	}
	add_action( 'init', 'register_v_menus' );



	remove_filter('the_content', 'wptexturize');
	remove_filter('the_excerpt', 'wptexturize');
	remove_filter('comment_text', 'wptexturize');
	remove_filter('the_title', 'wptexturize');




	function new_wp_trim_excerpt($text) {
		$raw_excerpt = $text;
		if ( '' == $text ) {
			$text = get_the_content('');

			$text = strip_shortcodes( $text );

			$text = apply_filters('the_content', $text);
			$text = str_replace(']]>', ']]>', $text);
			$text = strip_tags($text, '<a>');
			$excerpt_length = apply_filters('excerpt_length', 55);

			$excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
			$words = preg_split('/(<a.*?a>)|\n|\r|\t|\s/', $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY|PREG_SPLIT_DELIM_CAPTURE );
			if ( count($words) > $excerpt_length ) {
				array_pop($words);
				$text = implode(' ', $words);
				$text = $text . $excerpt_more;
			} else {
				$text = implode(' ', $words);
			}
		}
		return apply_filters('new_wp_trim_excerpt', $text, $raw_excerpt);

	}
	remove_filter('get_the_excerpt', 'wp_trim_excerpt');
	add_filter('get_the_excerpt', 'new_wp_trim_excerpt');





	// Byter ut Läs mer... efter kortare inlägg
	function new_excerpt_more($more) {
	       global $post;
		return '...<br><a class="more" href="'. get_permalink($post->ID) . '">Läs mer...</a>';
	}
	add_filter('excerpt_more', 'new_excerpt_more');





	// Längd på inlägg som är för långa
	function new_excerpt_length()
	{
	 global $customLength;

	 if($customLength)
	 {
	  return $customLength;
	 }
	 else
	 {
	  return 150;
	 }
	}
	add_filter('excerpt_length', 'new_excerpt_length');




	// Ändra kommentarsstrukturen
function mytheme_comment($comment, $args, $depth) {
		$GLOBALS['comment'] = $comment;
		extract($args, EXTR_SKIP);

		if ( 'div' == $args['style'] ) {
			$tag = 'div';
			$add_below = 'comment';
		} else {
			$tag = 'li';
			$add_below = 'div-comment';
		}
?>
		<<?php echo $tag ?> <?php comment_class(empty( $args['has_children'] ) ? '' : 'parent') ?> id="comment-<?php comment_ID() ?>">
		<?php if ( 'div' != $args['style'] ) : ?>
		<div id="div-comment-<?php comment_ID() ?>" class="comment-body">
		<?php endif; ?>
		<div class="comment-author vcard">
		<?php if ($args['avatar_size'] != 0) echo get_avatar( $comment, $args['avatar_size'] ); ?>
		<?php printf(__('<cite class="fn">%s</cite>'), get_comment_author_link()) ?>
		</div>
<?php if ($comment->comment_approved == '0') : ?>
		<em class="comment-awaiting-moderation"><?php _e('Din kommentar väntar på att godkännas.') ?></em>
		<br />
<?php endif; ?>

		<div class="comment-meta commentmetadata">
			<?php
				/* translators: 1: date, 2: time */
				printf(get_comment_date()) ?><?php edit_comment_link(__('(Edit)'),'  ','' );
			?>
		</div>

		<?php comment_text() ?>

		<div class="reply">
		<?php comment_reply_link(array_merge( $args, array('add_below' => $add_below, 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
		</div>
		<?php if ( 'div' != $args['style'] ) : ?>
		</div>
		<?php endif; ?>
<?php
        }




	// Gör så att videos visas i utdragen av nyheterna
	function new_excerpt($text)
	{
		global $post;
		$pattern = get_shortcode_regex();
		preg_match_all( '/'. $pattern .'/s', $post->post_content, $matches );
		if(is_array( $matches ) && array_key_exists(2, $matches ))
		{
	    //I'm currently using only youtube and flv videos. If you use
	    //other videos then add those shortcodes in the following array
			$arr=array('youtube','flv');
			foreach($matches[2] as $v)
			{
				if(in_array($v, $matches[2]))
				{
					$vdo=apply_filters('the_content', $matches[0][0]);
					$text=get_the_excerpt();
					$text.="<div style='margin:20px 0 0 -115px;'>".$vdo."</div>";
				}
			}
		}
		return $text;
	}
	add_filter('the_excerpt', 'new_excerpt');







	// Egen dashboard-widget
	add_action('wp_dashboard_setup', 'my_custom_dashboard_widgets');

	function my_custom_dashboard_widgets() {
	global $wp_meta_boxes;

	wp_add_dashboard_widget('custom_help_widget', 'Välkommen till Vincent Orbacks Adminsida', 'custom_dashboard_help');
	}

	function custom_dashboard_help() {
	echo '<p>Hemsidan är gjord av: <a href="http://www.vincentorback.se" target="blank">Vincent Orback</a><br>E-post: <a href="mailto:vorback@gmail.com" target="blank">vorback@gmail.com</a><br>Telefon: <a href="tel:0703861754" target="blank">0703 861 754</a><br><br>Senast uppdaterad: 19 Februari 2013.</p>';
	}




	// Byter ut avatars
	add_filter( 'avatar_defaults', 'newgravatar' );

	function newgravatar ($avatar_defaults) {
	    $myavatar = get_bloginfo('template_directory') . '/images/avatar.png';
	    $avatar_defaults[$myavatar] = "Vincent";
	    return $avatar_defaults;
	}




	function _remove_script_version( $src ){
		$parts = explode( '?', $src );
		return $parts[0];
	}
	add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
	add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );






	function vincent_login_css() {
		echo '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/css/login.css">';
	}

	function vincent_login_url() { return home_url(); }

	function vincent_login_title() { return get_option('blogname'); }

	add_action('login_head', 'vincent_login_css');
	add_filter('login_headerurl', 'vincent_login_url');
	add_filter('login_headertitle', 'vincent_login_title');

	// custom backend footer
	function vincent_custom_admin_footer() {
		echo '<span id="footer-thankyou">Hemsida av <a href="http://www.vincentorback.se" target="_blank">Vincent Orback</a></span>';
	}

	add_filter('admin_footer_text', 'vincent_custom_admin_footer');





	function dvl_change_opengraph_type( $type ) {
		if ( is_page(67))  {
	        return 'website';
	    }
	    else {
		    return 'article';
	    }
	}
	add_filter( 'wpseo_opengraph_type', 'dvl_change_opengraph_type', 10, 1 );

?>