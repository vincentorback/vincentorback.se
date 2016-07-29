<?php get_header(); ?>
<div class="blogg">
<section id="hem">
<h2>Vincent Orback</h2>
<h1>Webbdesigner & Webbutvecklare</h1>
</section>

<section id="blogg">

<?php get_sidebar(); ?>
<section id="content">









	<?php if (have_posts()) : ?>

		<header class="page-header">
			<h2 class="page-title">Sökresultat</h2>
		</header>

		<div class="navigation">
			<div class="next-posts"><?php next_posts_link('&laquo; Äldre inlägg') ?></div>
			<div class="prev-posts"><?php previous_posts_link('Nyare inlägg &raquo;') ?></div>
		</div>

		<?php while (have_posts()) : the_post(); ?>

			<div <?php post_class() ?> id="post-<?php the_ID(); ?>">

				<h2 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>

				<div class="meta">
					<div class="date">
						<div class="month"><?php the_time('M') ?></div>
						<div class="day"><?php the_time('j') ?></div>
					</div>	
				</div>

				<div class="entry">

					<?php the_excerpt(); ?>

				</div>

			</div>

		<?php endwhile; ?>

		<div class="navigation">
			<div class="next-posts"><?php next_posts_link('&laquo; Äldre inlägg') ?></div>
			<div class="prev-posts"><?php previous_posts_link('Nyare inlägg &raquo;') ?></div>
		</div>

	<?php else : ?>

		<h2 class="page-title">Hittade inga inlägg.</h2>

	<?php endif; ?>

	
</section><!-- end of #content# -->
</section><!-- /#blogg -->
</div><!-- /.blogg -->
<?php get_footer(); ?>