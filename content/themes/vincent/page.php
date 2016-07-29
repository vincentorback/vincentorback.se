<?php get_header(); ?>
<div class="blogg">
<section id="hem">
<h2>Vincent Orback</h2>
<h1>Webbdesigner & Webbutvecklare</h1>
</section>

<section id="main">
  <div class="page">
    <section id="blogg">

<?php get_sidebar(); ?>
<section id="content">

	
<header class="page-header">
	<h1 class="page-title"><?php if (! is_page('hem')) { echo get_the_title(); } ?></h1>
</header>
			

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<div class="post" id="post-<?php the_ID(); ?>">
		<div class="entry">
			<?php the_content(); ?>
		</div>
	</div>
<?php endwhile; endif; ?>
		
		
		
		
</section><!-- end of #content# -->
</section><!-- /#blogg -->
</div><!-- /.blogg -->
<?php get_footer(); ?>