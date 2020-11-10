<?php
/*
* Template Name: Homepage
*/
?>
    
<?php get_header( ); ?>

    <section class="flex items-center bg-dark height-100vh">
        <div class="slideshow js-slideshow slideshow--transition-slide container max-width-lg margin-auto"
             data-swipe="on">
            <p class="sr-only">Slideshow Items</p>
            <ul class="slideshow__content">
                <li class="slideshow__item js-slideshow__item">
                    <div class="grid gap-md">
                        <div class="col-8@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja W Diagnostyce</h1>

                            <a href="/" class="color-secondary text-md block margin-top-lg"><span>Sprawdź naszą ofertę</span>
                            </a>
                        </div>
                    </div>
                </li>

                <li class="slideshow__item js-slideshow__item">
                    <div class="grid">
                        <div class="col-8@lg">
                            <div class="text-component">
                                <h2 class="font-semibold flex color-primary text-uppercase">brands impossible to ignore</h2>
                                <a href="/" class="color-primary text-md block margin-top-lg"><span>work with us</span>
                                    <svg class="margin-left-xs" width="13" id="Layer_1" data-name="Layer 1"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.206 13.17221">
                                        <title>arrow</title>
                                        <path d="M.33447,1.08227h12v12m0-12-11.5,11.464"
                                              transform="translate(-0.12847 -0.08227)"
                                              style="fill: none;stroke: #fcd6ac;stroke-width: 2px"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="slideshow__item js-slideshow__item">
                    <div class="grid">
                        <div class="col-7@lg">
                            <div class="text-component">
                                <h2 class="font-semibold flex color-tertiary text-uppercase">true partnership experience</h2>
                                <a href="/" class="color-tertiary text-md block margin-top-lg"><span>work with us</span>
                                    <svg class="margin-left-xs" width="13" id="Layer_1" data-name="Layer 1"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.206 13.17221">
                                        <title>arrow</title>
                                        <path d="M.33447,1.08227h12v12m0-12-11.5,11.464"
                                              transform="translate(-0.12847 -0.08227)"
                                              style="fill: none;stroke: #d9e7f6;stroke-width: 2px"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    <section class="offer height-100vh">
        <div class="container max-width-lg padidng-bottom-xl">
            <img src="" alt="">
            <h1 class="header-draw ">Oferta</h1>
        </div>
            <div class="drag-gallery js-drag-gallery padding-top-xl">
                <ul class="drag-gallery__list">
                    <li class="drag-gallery__item">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/geometry.png" alt="szarpak">
                    </li>
                    <li class="drag-gallery__item">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/szarpak.png" alt="szarpak">
                    </li>
                </ul>
             <div aria-hidden="true" class="drag-gallery__gesture-hint"></div>
        </div>
    </section>
    <section class="contact height-100vh">
         <div class="container max-width-lg">
            <img src="" alt="">
            <h1 class="header-draw"></h1>
         </div>

        </div>
    </section>
    <section class="about height-100vh">
       
    </section>


<?php get_footer(); ?>