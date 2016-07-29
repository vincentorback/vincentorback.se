<?php

	if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
		die ('Ladda inte den här sidan direkt. Tack!');

	if ( post_password_required() ) { ?>
		Det här inlägget är lösenordsskyddat.
	<?php
		return;
	}
?>


<?php if ( have_comments() ) : ?>
<div class="kommentarer">	
	<h2 id="comments"><?php comments_number('', 'En Kommentar', '% Kommentarer' );?></h2>

	<div class="navigation">
		<div class="next-posts"><?php previous_comments_link() ?></div>
		<div class="prev-posts"><?php next_comments_link() ?></div>
	</div>

	<ol class="commentlist">
		<?php wp_list_comments('avatar_size=100&type=comment&callback=mytheme_comment'); ?>
	</ol>

	<div class="navigation">
		<div class="next-posts"><?php previous_comments_link() ?></div>
		<div class="prev-posts"><?php next_comments_link() ?></div>
	</div>
	
 <?php else : // this is displayed if there are no comments so far ?>

	<?php if ( comments_open() ) : ?>
		<!-- If comments are open, but there are no comments. -->

	 <?php else : // comments are closed ?>

	<?php endif; ?>
	
<?php endif; ?>

<?php if ( comments_open() ) : ?>

<div id="respond">

	<h2><?php comment_form_title( 'Kommentera', 'Kommentera %s' ); ?></h2>

	<div class="cancel-comment-reply">
		<?php cancel_comment_reply_link(); ?>
	</div>

	<?php if ( get_option('comment_registration') && !is_user_logged_in() ) : ?>
		<p>Du måste <a href="<?php echo wp_login_url( get_permalink() ); ?>">logga in</a> för att kommentera.</p>
	<?php else : ?>

	<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">

		<?php if ( is_user_logged_in() ) : ?>

			<p>Inloggad som <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>. <a href="<?php echo wp_logout_url(get_permalink()); ?>" title="Log out of this account">Logga ut &raquo;</a></p>

		<?php else : ?>

			<div>
				<label for="author">Namn<b>*</b></label>
				<input type="text" name="author" id="author" value="<?php echo esc_attr($comment_author); ?>" size="22" tabindex="1" <?php if ($req) echo "aria-required='true'"; ?> />
			</div>

			<div>
				<label for="email">E-post<b>*</b> <span>(kommer inte att visas)</span></label>
				<input type="email" name="email" id="email" value="<?php echo esc_attr($comment_author_email); ?>" size="22" tabindex="2" <?php if ($req) echo "aria-required='true'"; ?> />
				
			</div>

			<div>
				<label for="url">Hemsida</label>
				<input type="url" name="url" id="url" value="<?php echo esc_attr($comment_author_url); ?>" size="22" tabindex="3" />
				
			</div>

		<?php endif; ?>

		<!--<p>You can use these tags: <code><?php echo allowed_tags(); ?></code></p>-->

		<div>
			<label for="url">Kommentar<b>*</b></label>
			<textarea name="comment" id="comment" cols="40" rows="10" tabindex="4"></textarea>
		</div>

		<div>
			<input name="submit" type="submit" id="submit" tabindex="5" value="Skicka kommentar" />
			<?php comment_id_fields(); ?>
		</div>
		<br>
		<p class="req"><b>*</b> Måste fyllas i</p>
		
		<?php do_action('comment_form', $post->ID); ?>

	</form>

	<?php endif; // If registration required and not logged in ?>
	
</div>
</div><!-- /.kommentarer -->
<?php endif; ?>
