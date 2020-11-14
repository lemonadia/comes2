<?php
/*
* Template Name: Szarpaki
*/
?>
<?php get_header( ); ?>



<section  class="offer-geometry padding-top-xl padding-bottom-xl">
        <div class="container max-width-lg">
            <div class="grid">
                <div class="col-6@lg">
                    <h1 class="text-uppercase">Oferta<span class="margin-left-sm subheading">szarpaki</span></h1>
                    <a href="#" onclick="history.back()"  class="post--back">Powrót</a>

                </div>
            </div>
            <div class="grid facetwp-template padding-top-xl padding-bottom-xl geometry--posts__module flex justify-center">
                <?php

                    $args = array(
                        'post_type' => 'szarpak',
                        'posts_per_page' => 100,
                    );
                    $query = new WP_Query($args);
                    while ($query->have_posts()) : $query->the_post();
                        get_template_part('page-templates/template-parts/content', 'szarpaki');
                    endwhile;
                    wp_reset_query();
                    ?>
            </div>
        </div>
    </section>

    <?php get_footer( ); ?>