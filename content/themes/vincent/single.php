<?php get_header(); ?>


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
				<?php the_content(); ?>
			</div>

			<div class="postmetadata">
				<?php the_tags('Taggar: ', ', ', '<br />'); ?> 
			</div>

		</article>

	<?php comments_template(); ?>

		<?php endwhile; endif; ?>

		
</section><!-- end of #content# -->
</section><!-- /#blogg -->
</div><!-- /.blogg -->
<?php get_footer(); ?>