<?php
/*
* Template Name: Geometria
*/
?>
<?php get_header( ); ?>



<section  class="offer-geometry padding-top-xl padding-bottom-xl">
        <div class="container max-width-lg">
            <div class="grid">
                <div class="col-6@lg">
                   <a href="#" onclick="history.back()"  class="post--back">Powrót</a>
                    <h1 class="text-uppercase">Oferta<span class="margin-left-sm subheading">geometria</span></h1>
                </div>
            </div>
            <div class="grid facetwp-template padding-top-xl padding-bottom-xl geometry--posts__module flex justify-between">
                <?php

                    $args = array(
                        'post_type' => 'geometry',
                        'posts_per_page' => 100,
                    );
                    $query = new WP_Query($args);
                    while ($query->have_posts()) : $query->the_post();
                        get_template_part('page-templates/template-parts/content', 'geometry');
                    endwhile;
                    wp_reset_query();
                    ?>
            </div>
        </div>
    </section>

    <?php get_footer( ); ?>