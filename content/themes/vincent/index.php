<?php get_header(); ?>
<div class="blogg">
<section id="hem">
<h2>Vincent Orback</h2>
<h1>Webbdesigner & Webbutvecklare</h1>
</section>

<section id="blogg">

<?php get_sidebar(); ?>
<section id="content">


	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>

			<div class="meta">
				<div class="date">
					<div class="month"><?php the_time('M') ?></div>
					<div class="day"><?php the_time('j') ?></div>
				</div>	
			</div>

			<div class="entry">
				<?php the_excerpt(); ?>
			

			<div class="postmetadata">
				<?php the_tags('Taggar: ', ', ', '<br />'); ?> 
				<?php comments_popup_link('', '1 Kommentar &#187;', '% Kommentarer &#187;'); ?>
			</div>
			</div>
		</article>

	<?php endwhile; ?>

	<?php
		global $wp_query;
		$big = 999999999; // need an unlikely integer
		echo '<div class="pagination">';
		echo paginate_links( array(
			'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format' => '?paged=%#%',
			'current' => max( 1, get_query_var('paged') ),
			'total' => $wp_query->max_num_pages,
			'show_all' => true,
			'prev_next'    => true
		) );
		
		echo '</div>';
	?>

	<?php else : ?>

		<h2 class="page-title">Hittade inga inlägg</h2>

	<?php endif; ?>
	
	
</section><!-- /#content -->
</section><!-- /#blogg -->
</div><!-- /.blogg -->
<?php get_footer(); ?>