<?php
$equipment_title = get_field('equipment_title');
$equipment_desc = get_field('equipment_desc');
$equipment_text = get_field('equipment_text');
var_dump($equipment_text);


?>
<?php get_header(); ?>

<div class="single-geometry container max-width-lg padding-top-sm">
    <?php
        while ( have_posts() ) : the_post(); ?>
    <article class="padding-bottom-xxxxl margin-top-xl offer-geometry  ">
        <a href="#" onclick="history.back()" class="post--back">Powrót</a>
        <div class="flex items-center padding-bottom-md">
            <div class="width-50%">
                <h1 class="text-uppercase">Oferta<span class="margin-left-sm subheading">geometria</span></h1>
            </div>
            <img class="padding-left-lg truck" src="<?php echo get_stylesheet_directory_uri(); ?>/images/truck.png"
                alt="ciezarowka ikona comes">

        </div>
        <div class="flex margin-top-md margin-bottom-md justify-center position-relative">
            <div class="line-gallery "></div>
            <div class="single-photo gallery">
                <?php 
                                $image1 = get_field('photo1');
                                if( !empty( $image1 ) ): ?>
                <img src="<?php echo esc_url($image1['url']); ?>" alt="<?php echo esc_attr($image1['alt']); ?>" />
                <?php endif; ?>
                <img class="padding-left-lg switch-photo"
                    src="<?php echo get_stylesheet_directory_uri(); ?>/images/g-combo_B.png" alt="szarpak">
            </div>
            <div class=" flex  flex-column  single-description padding-left-lg">
                <h3 class="heading-post padding-bottom-xs"><?php echo the_title(); ?></h3>
                <ul class="accordion  js-accordion" data-animation="on" data-multi-items="on">
                    <li class="accordion__item accordion__item--is-open js-accordion__item">
                        <button class="reset accordion__header padding-y-xx  js-tab-focus" type="button">
                            <span>dla samochodów osobowych, dostawczych i cięzarowych</span>
                            <svg class="icon accordion__icon-arrow no-js:is-hidden" viewBox="0 0 16 16"
                                aria-hidden="true">
                                <g class="icon__group" fill="none" stroke="red" stroke-linecap="square"
                                    stroke-miterlimit="10">
                                    <path d="M2 2l12 12" />
                                    <path d="M14 2L2 14" />
                                </g>
                            </svg>
                        </button>

                        <div class="accordion__panel js-accordion__panel">
                            <div class="text-component padding-top-xxxs padding-bottom-xs">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum a ab quae quas optio
                                    ut officia quia? Modi at impedit dolorem est voluptatem facilis, beatae atque
                                    tenetur, soluta dolorum inventore sapiente laborum. Alias esse soluta porro
                                    distinctio aperiam, qui suscipit.</p>
                            </div>
                        </div>
                    </li>

                    <li class="accordion__item  js-accordion__item">
                        <button class="reset accordion__header padding-y-xxs js-tab-focus" type="button">
                            <span class="text-uppercase padding-x-md">Zalety</span>

                            <svg class="icon accordion__icon-arrow no-js:is-hidden" viewBox="0 0 16 16"
                                aria-hidden="true">
                                <g class="icon__group" fill="none" stroke="red" stroke-linecap="square"
                                    stroke-miterlimit="10">
                                    <path d="M2 2l12 12" />
                                    <path d="M14 2L2 14" />
                                </g>
                            </svg>
                        </button>

                        <div class="accordion__panel js-accordion__panel">
                            <div class="text-component padding-top-xxxs  padding-bottom-xs">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum a ab quae quas optio
                                    ut officia quia? Modi at impedit dolorem est voluptatem facilis, beatae atque
                                    tenetur, soluta dolorum inventore sapiente laborum. Alias esse soluta porro
                                    distinctio aperiam, qui suscipit.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum a ab quae quas optio
                                    ut officia quia? Modi at impedit dolorem est voluptatem facilis, beatae atque
                                    tenetur, soluta dolorum inventore sapiente laborum. Alias esse soluta porro
                                    distinctio aperiam, qui suscipit.</p>
                            </div>
                        </div>
                    </li>

                    <li class="accordion__item  js-accordion__item">
                        <button class="reset accordion__header padding-y-xxs js-tab-focus" type="button">
                            <span class="text-uppercase padding-x-md">Wyposazenie</span>
                            <svg class="icon accordion__icon-arrow no-js:is-hidden" viewBox="0 0 16 16"
                                aria-hidden="true">
                                <g class="icon__group" fill="none" stroke="red" stroke-linecap="square"
                                    stroke-miterlimit="10">
                                    <path d="M2 2l12 12" />
                                    <path d="M14 2L2 14" />
                                </g>
                            </svg>
                        </button>
                        <div class="accordion__panel js-accordion__panel">
                            <div class="text-component padding-top-xxxs padding-bottom-xs">
                                <p class="text-bold"><?php echo $equipment_title ?></p>
                                <p><?php echo $equipment_text ?></p>
                            </div>
                    </li>

                    <li class="accordion__item  js-accordion__item">
                        <button class="reset accordion__header padding-y-xxs js-tab-focus" type="button">
                            <span class="text-uppercase padding-x-md">Dane techniczne</span>
                            <svg class="icon accordion__icon-arrow no-js:is-hidden" viewBox="0 0 16 16"
                                aria-hidden="true">
                                <g class="icon__group" fill="none" stroke="red" stroke-linecap="square"
                                    stroke-miterlimit="10">
                                    <path d="M2 2l12 12" />
                                    <path d="M14 2L2 14" />
                                </g>
                            </svg>
                        </button>

                        <div class="accordion__panel js-accordion__panel">
                            <div class="text-component padding-top-xxxs padding-bottom-md">
                                <p>Podstawowe dane techniczne</p>
                                <div class="margin-left-md">
                                </div>

                            </div>
                        </div>
                    </li>
                </ul>
                <a href="" class="flex-end btn btn--card text-uppercase">Karta katalogowa</a>
            </div>
        </div>
</div>

</article>
<?php endwhile; // End of the loop.
                ?>
</div>
<?php get_footer(); ?>