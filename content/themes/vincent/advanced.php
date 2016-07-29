<?php get_header(); ?>

<!-- HEM -->
<section id="hem">
	<div class="wrapper">
		<h2>Vincent Orback</h2>
		<h1>Webbdesigner & Webbutvecklare</h1>
		<div class="menu">
			<a class="intro" href="#portfolio">Välkommen till min portfolio</a>
		</div>
	</div>
</section>




<!-- PORTFOLIO -->
<section id="portfolio">
	<p class="title">Portfolio</p>

    <?php if(get_field('portfolio')): ?>
        <div class="wrapper">
        	<?php while(the_repeater_field('portfolio')): ?>

        <div class="work">
	        <.work-info>
	            <p class="work-title"><?php the_sub_field('arbete_titel'); ?></p>

	            <p><?php the_sub_field('arbete_text'); ?></p>

	            <ul class="tags">
	                <?php if( in_array( 'Webbdesign', get_sub_field('arbete_taggar') ) ){
	                echo '<li><span aria-hidden="true" data-icon="&#x61;"></span>Webbdesign</li>';}

	                if( in_array( 'Webbutveckling', get_sub_field('arbete_taggar') ) ){
	                echo '<li><span aria-hidden="true" data-icon="&#x62;"></span>Webbutveckling</li>';}

	                if( in_array( 'Responsive Design', get_sub_field('arbete_taggar') ) ){
	                echo '<li><span aria-hidden="true" data-icon="&#x64;"></span>Responsive Design</li>';}

	                if( in_array( 'Wordpress CMS', get_sub_field('arbete_taggar') ) ){
	                echo '<li><span aria-hidden="true" data-icon="&#x63;"></span>WordPress CMS</li>';}

	                if( in_array( 'Sökmotoroptimering', get_sub_field('arbete_taggar') ) ){
	                echo '<li><span aria-hidden="true" data-icon="&#x72;"></span>Sökmotoroptimering</li>';}

	                if( in_array( 'Foto', get_sub_field('arbete_taggar') ) ){
	                echo '<li><span aria-hidden="true" data-icon="&#x66;"></span>Foto</li>';}?>
	            </ul>

	            <a class="visit" href="<?php the_sub_field('arbete_url'); ?>" target="blank" title="Besök <?php the_sub_field('arbete_titel'); ?>s hemsida">
	            Besök <?php the_sub_field('arbete_titel'); ?><span aria-hidden="true" data-icon="&#x21;"></span>
	            </a>
	        </.work-info>

	        <img src="<?php the_sub_field('arbete_bild'); ?>" alt="<?php the_sub_field('arbete_titel'); ?>" width="1024" height="525">
        </div>
        <hr>
        <?php endwhile; ?>
        </div><!-- /.wrapper -->
    <?php endif; ?>
</section>






    <!-- OM MIG -->
    <section id="ommig">
        <p class="title">Om mig</p>

        <div class="ommig">
            <div class="box">
                <p class="title-2"><?php the_field('om_mig_ingress'); ?></p><?php the_field('om_mig_text'); ?>
            </div><!-- /.box -->

            <div class="vincent">
                <img src="<?php the_field('om_mig_bild'); ?>" alt="Webbdesigner Vincent Orback" width="320" height="266"><a href="http://www.vincentorback.se/cv"><span aria-hidden="true" data-icon="&#x7a;"></span><br>CV</a>
            </div>
        </div><!-- /.ommig -->
    </section><!-- /#ommig --><!-- KONTAKT -->

    <section id="kontakt">
        <p class="title">Kontakt</p>

        <p class="title-2">Hör av dig om projektförfrågningar eller annat!</p>

        <div class="info">
            <ul class="left">
                <li>Jag</li>

                <li>Bor</li>

                <li>Jobbar</li>

                <li>Skriv</li>

                <li>Ring</li>
                <!--
                <li>Gilla</li>
                -->
            </ul>

            <ul class="right vcard">
                <li class="fn">Vincent Orback</b></li>

                <li class="locality">Stockholm</li>

                <li class="org">Front-end utvecklare på <a href="http://www.daytona.se" target="_blank">Daytona</a></li>

                <li><a class="email" href="mailto:vorback@gmail.com">vorback@gmail.com</a></li>

                <li class="tel">+46 703 861 754</li>
                <!--
                <li class="social">
                	<a href="http://www.facebook.com/sharer.php?u=http://www.vincentorback.se&t=Vincent+Orback+webbdesign+portfolio" title="share on facebook" target="_blank" aria-hidden="true" data-icon="&#x69;" class="facebook"></a>

                	<a href="http://twitter.com/share?text=Vincent+Orback+webbdesign+portfolio+@vorback&url=http://www.vincentorback.se" title="dela på twitter" target="_blank" aria-hidden="true" data-icon="&#x6b;" class="twitter"></a>

                	<a href="https://plus.google.com/share?url=http%3A%2F%2Fwww.vincentorback.se" title="dela på google plus" target="_blank" aria-hidden="true" data-icon="&#x6a;" class="gplus"></a>

					<a href="http://www.linkedin.com/shareArticle?mini=true&url=http://www.vincentorback.se&title=Vincent+Orback+webbdesign+portfolio" title="dela på linkedin" target="_blank" aria-hidden="true" data-icon="&#x6c;" class="linkedin"></a>

                </li>
                -->

            </ul>
        </div>
    </section>


<?php get_footer(); ?>