<?php
/*
* Template Name: Homepage
*/
?>
    
<?php get_header( ); ?>

<section class="hero flex items-center positinon-relative">
    <div class="element-hamburger-diagonal"></div>
    <div class="element-hamburger-horizontal"></div>
        <div class="slideshow js-slideshow slideshow--transition-slide"
             data-swipe="on">
            <p class="sr-only">Slideshow Items</p>
            <ul class="slideshow__content">
                <li class="slideshow__item js-slideshow__item " style="background: url('<?php bloginfo('stylesheet_directory'); ?>/images/hero1.png') center;    background-size: cover;">
                    <div class="grid text-hero">
                        <div class="col-12@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja <br>W Diagnostyce</h1>
                            <a href="#offer" class="btn block margin-top-sm"><span>Sprawdź naszą ofertę</span>
                            </a>
                        </div>
                    </div>
                </li>
            
                <li class="slideshow__item js-slideshow__item"  style="background: url('<?php bloginfo('stylesheet_directory'); ?>/images/hero3.png') center;    background-size: cover;">
                     <div class="grid">
                        <div class="col-12@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja <br>W Diagnostyce</h1>
                            <a href="/" class=" btn color-secondary text-md block margin-top-sm"><span>Sprawdź naszą ofertę</span>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="slideshow__item js-slideshow__item">
                  <div class="grid">
                        <div class="col-12@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja <br>W Diagnostyce</h1>
                            <a href="/" class="color-secondary text-md block margin-top-sm"><span>Sprawdź naszą ofertę</span>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>

    <section class="offer" id="offer">
        <div class="container max-width-lg padidng-bottom-xl">
            <img src="" alt="">
            <h1 class="header-draw text-uppercase">Oferta</h1>
        </div>
            <div class="drag-gallery js-drag-gallery padding-top-xl">
                <ul class="drag-gallery__list" >
                    <a href="<?php echo get_page_link( get_page_by_path( 'geometria' ) ); ?>" class="drag-gallery__item geomery-line">
                         <h2 class="text-uppercase">Geometria</h2>
                         <img class="line-geometry" src="<?php echo get_stylesheet_directory_uri(); ?>/images/geometry-line.png" alt="szarpak">
                         <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/geometry.png" alt="szarpak">
                    </a>
                    <a href="<?php echo get_page_link( get_page_by_path( 'szarpaki' ) ); ?>" class="drag-gallery__item szarpak-line">
                         <h2 class="text-uppercase">Szarpaki</h2>
                         <img class="line-szarpak" src="<?php echo get_stylesheet_directory_uri(); ?>/images/line.png" alt="szarpak">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/szarpak.png" alt="szarpak">
                    </a>
                </ul>
             <div aria-hidden="true" class="drag-gallery__gesture-hint"></div>
        </div>
    </section>
    

    <section class="padding-top-xxl about ">
       <!-- <div class="container max-width-lg"> -->
           <img src="" alt="">
           <h1 class="text-uppercase">O Nas </h1>
            <div class="flex  flex-column flex-row@md items-center@md gap-lg">
                <div class="about-text">
                    <p class="text-uppercase margin-bottom-xxxs">comes</p>
                    <p class="margin-bottom-md">urządzenia do diagnostyki pojazdów</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <p class="padding-top-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <a href="/" class="btn btn--contact margin-top-xxxxl@md block text-uppercase"><span>Skontaktuj się z nami</span></a>

                </div>
                <div class="about-image">
                    <div class="image-about">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png" alt="szarpak">
                    </div>
                </div>
            </div>
       <!-- </div> -->
    </section>

    <section class="contact height-100vh">
         <div class="container max-width-lg">
         <img src="" alt="">
            <!-- <h1 class="header-draw"></h1> -->
        </div>
        <div>
           <?php echo do_shortcode("[shortcode]"); ?>
        </div>
    </section>


<?php get_footer(); ?>