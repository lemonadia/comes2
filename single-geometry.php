<?php
$opis = get_field('opis');
$equipment_title = get_field('equipment_title');
$equipment_desc = get_field('equipment_desc');
$equipment_text = get_field('equipment_text');
$dane = get_field('dane');
$zalety = get_field('zalety');


?>
<?php get_header(); ?>

<div class="single-geometry container max-width-lg padding-top-sm">
    <img class="logo-offer" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-dark.png" alt="logo comes">
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
        <div class="flex flex-column flex-row@md margin-top-md margin-bottom-md justify-center position-relative">
            <div class="line-gallery "></div>
            <div class="single-photo gallery">
                <?php 
                                $image1 = get_field('photo1');
                                if( !empty( $image1 ) ): ?>
                <img class="geometry-img" src="<?php echo esc_url($image1['url']); ?>"
                    alt="<?php echo esc_attr($image1['alt']); ?>" />
                <?php endif; ?>
                <?php 
                                $image2 = get_field('photo2');
                                if( !empty( $image2 ) ): ?>
                <img src="<?php echo esc_url($image2['url']); ?>" alt="<?php echo esc_attr($image2['alt']); ?>" />
                <?php endif; ?>
            </div>
            <div class=" flex  flex-column  single-description padding-left-lg@md">
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
                                <p><?php echo $opis ?></p>
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
                            <div class="advantages text-component padding-top-xxxs  padding-bottom-xs">
                                <?php echo $zalety ?>
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
                                <div><?php echo $equipment_text ?></div>
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
                                <p class="text-bold">Podstawowe dane techniczne</p>
                                <div class="margin-left-md">
                                    <div><?php echo $dane ?></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>


                <div class="modal modal--animate-fade bg-contrast-higher bg-opacity-90% js-modal" id="modal-full-width">
                    <div class="modal__content bg height-100% flex flex-column" role="alertdialog"
                        aria-labelledby="modal-title" aria-describedby="modal-description">
                        <header class="padding-y-sm padding-x-md flex items-end justify-end">
                            <button class="reset modal__close-btn modal__close-btn--inner js-modal__close js-tab-focus">
                                <svg class="icon" viewBox="0 0 20 20">
                                    <title>Close modal window</title>
                                    <g fill="none" stroke="white" stroke-miterlimit="10" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="3" y1="3" x2="17" y2="17" />
                                        <line x1="17" y1="3" x2="3" y2="17" />
                                    </g>
                                </svg>
                            </button>
                        </header>
                        <div class="overflow-hidden">
                            <div class="carousel carousel-v3 flex flex-column container max-width-lg js-carousel"
                                data-drag="on" data-loop="off" data-overflow-items="on">
                                <p class="sr-only">Carousel items</p>

                                <div class="carousel__wrapper position-relative">
                                    <ol class="carousel__list">
                                        <li class="carousel__item">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png"
                                                alt="">
                                        </li>

                                        <li class="carousel__item">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png"
                                                alt="">
                                        </li>

                                        <li class="carousel__item">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png"
                                                alt="">
                                        </li>

                                        <li class="carousel__item">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png"
                                                alt="">
                                        </li>

                                        <li class="carousel__item">
                                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png"
                                                alt="">
                                        </li>
                                    </ol>

                                    <nav class="no-js:is-hidden">
                                        <ul
                                            class="position-absolute top-0 left-0 bottom-0 right-0 pointer-events-none flex items-center justify-between">
                                            <li>
                                                <button
                                                    class="reset carousel-v3__control carousel-v3__control--prev js-carousel__control js-tab-focus">
                                                    <svg class="icon icon--xs" viewBox="0 0 16 16">
                                                        <title>Show previous items</title>
                                                        <g>
                                                            <path
                                                                d="M10.892,16.41L4.241,8.65c-0.321-0.374-0.321-0.927,0-1.301l6.651-7.76l1.519,1.302L6.317,8l6.093,7.108 L10.892,16.41z">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    class="reset carousel-v3__control carousel-v3__control--next js-carousel__control js-tab-focus">
                                                    <svg class="icon icon--xs" viewBox="0 0 16 16">
                                                        <title>Show next items</title>
                                                        <g>
                                                            <path
                                                                d="M5.108,16.41L3.59,15.108L9.683,8L3.59,0.892L5.108-0.41l6.651,7.76c0.321,0.374,0.321,0.927,0,1.301 L5.108,16.41z">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="buttons-post"> <button class="btn--gallery text-uppercase"
                        aria-controls="modal-full-width">Galeria
                        urządzenia</button>
                    <a href="" class="flex-end btn btn--card text-uppercase">Karta katalogowa</a>
                </div>

            </div>
        </div>
</div>

</article>
<?php endwhile; // End of the loop.
                ?>
</div>
<?php get_footer(); ?>