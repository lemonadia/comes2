<?php 
	if (!defined('ABSPATH')) exit;
	get_header(); 
?>
    <div class="container max-width-md padding-top-xxl padding-bottom-lg">
        <?php
        while ( have_posts() ) : the_post(); ?>
            <article>
                <a href="#" onclick="history.back()" class="post--back"><img class="margin-right-xs" src="<?php echo get_stylesheet_directory_uri(); ?>/images/arrow-mini.svg"><?php echo __('Back', 'izo'); ?></a>
                <h1 class="margin-bottom-sm"><?php echo the_title(); ?></h1>
                <?php the_content(); ?>
            </article>
        <?php endwhile; // End of the loop.
        ?>
    </div>

<?php get_footer();