
<div class="wrap">

	<?php echo "<h2>" . __( 'Social Posts Settings' ) . "</h2>"; ?>

	<form name="socialposts_form" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
	
		<input type="hidden" name="socialposts_hidden" value="Y">
		<?php    echo "<h4>" . __( 'Social Posts Settings', 'socialposts_trdom' ) . "</h4>"; ?>
		
		<p><?php _e("Icon size: " ); ?>
			<select name="socialposts_sizes">
				  <option value="small">Small</option>
				  <option value="medium">Medium</option>
				  <option value="big">Big</option>
		    </select>
		<?php _e(" ex: localhost" ); ?></p>

		<p><?php _e("Use SVG icons: " ); ?>
			<input type="checkbox" name="socialposts_svg">
		<?php _e(" Does not work on browsers like IE 8 and down, or older Android" ); ?></p>
		
		<p><?php _e("Database password: " ); ?><input type="text" name="socialposts_dbpwd" value="<?php echo $dbpwd; ?>" size="20"><?php _e(" ex: secretpassword" ); ?></p>
		<hr />
		<?php    echo "<h4>" . __( 'Social Posts Other Settings', 'socialposts_trdom' ) . "</h4>"; ?>
		<p><?php _e("Store URL: " ); ?><input type="text" name="socialposts_store_url" value="<?php echo $store_url; ?>" size="20"><?php _e(" ex: http://www.yourstore.com/" ); ?></p>
		<p><?php _e("Product image folder: " ); ?><input type="text" name="socialposts_prod_img_folder" value="<?php echo $prod_img_folder; ?>" size="20"><?php _e(" ex: http://www.yourstore.com/images/" ); ?></p>
		<p class="submit">
		<input type="submit" name="Submit" value="<?php _e('Update Options', 'socialposts_trdom' ) ?>" />
		</p>
	</form>
	
</div>





	<?php
		if($_POST['socialposts_hidden'] == 'Y') {
			//Form data sent
			$dbhost = $_POST['socialposts_dbhost'];
			update_option('socialposts_dbhost', $dbhost);
			$dbname = $_POST['socialposts_dbname'];
			update_option('socialposts_dbname', $dbname);
			$dbuser = $_POST['socialposts_dbuser'];
			update_option('socialposts_dbuser', $dbuser);
			$dbpwd = $_POST['socialposts_dbpwd'];
			update_option('socialposts_dbpwd', $dbpwd);
			$prod_img_folder = $_POST['socialposts_prod_img_folder'];
			update_option('socialposts_prod_img_folder', $prod_img_folder);
			$store_url = $_POST['socialposts_store_url'];
			update_option('socialposts_store_url', $store_url);
			?>
			<div class="updated"><p><strong><?php _e('Options saved.' ); ?></strong></p></div>
			<?php
		} else {
			//Normal page display
		}
	?>
	