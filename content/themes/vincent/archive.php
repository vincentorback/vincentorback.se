<?php get_header(); ?>
<div class="blogg">
<section id="hem">
<h2>Vincent Orback</h2>
<h1>Webbdesigner & Webbutvecklare</h1>
</section>

<section id="blogg">

<?php get_sidebar(); ?>
<section id="content">


			<header class="page-header">
			<?php if (have_posts()) : ?>

 			<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>

			<?php /* If this is a category archive */ if (is_category()) { ?>
				<h2 class="page-title">Arkiv för <?php single_cat_title(); ?>-kategorin:</h2>

			<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				<h2 class="page-title">Inläggad taggade &#8216;<?php single_tag_title(); ?>&#8217;</h2>

			<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h2 class="page-title">Arkiv för <?php the_time('F jS, Y'); ?></h2>

			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h2 class="page-title">Arkiv för <?php the_time('F, Y'); ?></h2>

			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h2 class="pagetitle">Arkiv för <?php the_time('Y'); ?></h2>

			<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h2 class="pagetitle">Författararkiv</h2>

			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2 class="pagetitle">Bloggarkiv</h2>
			
			<?php } ?>
			</header>
			
		<?php while (have_posts()) : the_post(); ?>
			
				<div <?php post_class() ?>>
				
						<h2 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
					
						<div class="meta">
							<div class="date">
								<div class="month"><?php the_time('M') ?></div>
								<div class="day"><?php the_time('j') ?></div>
							</div>	
						</div>

						<div class="entry">
							<?php the_content(); ?>
						</div>

				</div>
				
			<?php endwhile; ?>
						
	<?php else : ?>

		<h2 class="page-title">Hittade inga inlägg.</h2>

	<?php endif; ?>





</section><!-- end of #content# -->
</section><!-- /#blogg -->
</div><!-- /.blogg -->
<?php get_footer(); ?>