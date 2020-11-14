<a class="col-3@md geometry-item flex flex-column items-center justify-center" href="<?php echo the_permalink(); ?>">
    <?php if ( has_post_thumbnail() ) : ?>
            <img class="post-image"src="<?php the_post_thumbnail(); ?>">
    <?php endif; ?>    
    <div class="item-text">
        <h3 class="news--item__heading  margin-top-lg"><?php echo the_title(); ?></h3>
        <?php echo '<p class="margin-top-xs padding-right-sm">'.wp_trim_words( get_the_content(), 20, '...' ).'</p>'; ?>
    </div>
    
</a>
