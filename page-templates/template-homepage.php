<?php
/*
* Template Name: Homepage
*/
$about1 = get_field('about_text');
$about2 = get_field('about_text2');
?>

<?php get_header( ); ?>

<section class="hero flex items-center positinon-relative ">
    <img class="logo" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo_comes.png" alt="szarpak">
    <div class="element-hamburger-diagonal"></div>
    <div class="element-hamburger-horizontal"></div>
    <div class="slideshow js-slideshow slideshow--transition-slide" data-swipe="on">
        <p class="sr-only">Slideshow Items</p>
        <ul class="slideshow__content">
            <li class="slideshow__item js-slideshow__item "
                style="background: url('<?php bloginfo('stylesheet_directory'); ?>/images/hero1.png') center;    background-size: cover;">
                <div class="grid text-hero position-relative">
                    <div class="col-12@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja <br>W Diagnostyce</h1>
                        <a href="#offer" class="btn block margin-top-sm"><span>Sprawdź naszą ofertę</span>
                        </a>
                    </div>
                </div>
            </li>

            <li class="slideshow__item js-slideshow__item"
                style="background: url('<?php bloginfo('stylesheet_directory'); ?>/images/hero3.png') center;    background-size: cover;">
                <div class="grid text-hero position-relative">
                    <div class="col-12@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja <br>W Diagnostyce</h1>
                        <a href="#offer" class=" btn color-secondary text-md block margin-top-sm"><span>Sprawdź naszą
                                ofertę</span>
                        </a>
                    </div>
                </div>
            </li>
            <li class="slideshow__item js-slideshow__item">
                <div class="grid text-hero position-relative">
                    <div class="col-12@md">
                        <h1 class="flex color-primary text-uppercase">Perfekcja <br>W Diagnostyce</h1>
                        <a href="#offer" class=" btn color-secondary text-md block margin-top-sm"><span>Sprawdź naszą
                                ofertę</span>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</section>

<section class="padding-top-xl offer" id="offer">
    <div class="container max-width-lg padidng-bottom-xl">
        <img src="" alt="">
        <h1 class="header-draw text-uppercase">Oferta</h1>
    </div>
    <div class="drag-gallery js-drag-gallery padding-top-xl position-relative">
        <ul class="drag-gallery__list">
            <a href="<?php echo get_page_link( get_page_by_path( 'geometria' ) ); ?>"
                class="drag-gallery__item geomery-line">
                <h2 class="text-uppercase">Geometria</h2>
                <img class="line-geometry" src="<?php echo get_stylesheet_directory_uri(); ?>/images/geometry-line.png"
                    alt="szarpak">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/geometry.png" alt="szarpak">
            </a>
            <a href="<?php echo get_page_link( get_page_by_path( 'szarpaki' ) ); ?>"
                class="drag-gallery__item szarpak-line">
                <h2 class="text-uppercase">Szarpaki</h2>
                <img class="line-szarpak" src="<?php echo get_stylesheet_directory_uri(); ?>/images/line.png"
                    alt="szarpak">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/szarpak.png" alt="szarpak">
            </a>
        </ul>
        <div aria-hidden="true" class="drag-gallery__gesture-hint"></div>
    </div>
</section>


<section class="padding-top-xl about" id="about">
    <img src="" alt="">
    <h1 class="text-uppercase">O Nas </h1>
    <div class="flex  flex-column flex-row@md items-center@md">
        <div class="about-text padding-top-xl">
            <p class="text-uppercase margin-bottom-xxxs">comes</p>
            <p class="margin-bottom-lg">urządzenia do diagnostyki pojazdów</p>
            <p><?php echo $about1; ?></p>
            <ul class="accordion  js-accordion hide@md" data-animation="on" data-multi-items="on">

                <li class="accordion__item accordion__item--is-open js-accordion__item">
                    <button class="reset accordion__header padding-y-sm  js-tab-focus" type="button">
                        <span class="text-md">więcej >></span>
                    </button>

                    <div class="accordion__panel js-accordion__panel">
                        <div class="text-component padding-top-xxxs  padding-bottom-md">
                            <?php echo $about2; ?>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="padding-top-sm display@xs"><?php echo $about2; ?></p>
            <a href="/" class="btn btn--contact block text-uppercase"><span>Skontaktuj się z nami</span></a>
        </div>
        <div class="about-image">
            <div class="image-about">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/aboutphoto.png" alt="">
            </div>
        </div>
    </div>
</section>

<section class="contact" id="contact">
    <div class="flex flex-column flex-row@md">
        <div class="map width-50%"></div>
        <div class="form-comes">
            <h1 class="text-uppercase margin-bottom-md">Kontakt</h1>
            <div class="padding-bottom-xxl">
                <span class="name">COMES - Grzegorz Legomiński</span>
            </div>
            <div>
                <span class="text-uppercase  block padding-bottom-xs">Wyślij nam wiadomość</span>
                <?php echo do_shortcode( '[contact-form-7 id="27" title="Formularz 1"]' ); ?>
            </div>
        </div>
    </div>

</section>


<?php get_footer(); ?>