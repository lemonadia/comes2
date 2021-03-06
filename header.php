<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package test
 */

?>

<!doctype html>
<html>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <script>document.getElementsByTagName("html")[0].className += "js";</script>
	<?php wp_head(); ?>
</head>

<body <?php body_class( '' ); ?> >
  <div class="drawer js-drawer" id="dr-nav-id">
    <div class="drawer__content" role="alertdialog" aria-labelledby="dr-nav-title">
      <div class="drawer__body js-drawer__body">
        <nav class="dr-nav position-relative aria-label="Main">
          <ul>
            <li>
              <a class="dr-nav__link" href="#about">
                <span>O nas</span>
              </a>
            </li>
            <li>
              <a class="dr-nav__link" href="#offer">
                <span>Oferta</span>
              </a>
            </li>
            <li>
              <a class="dr-nav__link" href="#0">
                <span>Do pobrania</span>
              </a>
            </li>
            <li>
              <a class="dr-nav__link" href="#contact">
                <span>Kontakt</span>
              </a>
            </li>
          </ul>
          <div class="social position-absolute">
            <a href=""><img  src="<?php echo get_stylesheet_directory_uri(); ?>/images/comes-fb.png" alt="ciezarowka ikona comes"></a>
            <a href=""><img  src="<?php echo get_stylesheet_directory_uri(); ?>/images/comes-yt.png" alt="ciezarowka ikona comes"></a>
            <a href=""><img  src="<?php echo get_stylesheet_directory_uri(); ?>/images/comes-tr.png" alt="ciezarowka ikona comes"></a>
            <a href=""><img  src="<?php echo get_stylesheet_directory_uri(); ?>/images/comes-ig.png" alt="ciezarowka ikona comes"></a>
          </div>
        </nav>
      </div>
    </div>
  </div>

  <div class="dr-nav-control-wrapper">
    <div class="container height-100% flex items-center">
      <button class="reset margin-left-auto dr-nav-control anim-menu-btn js-anim-menu-btn js-dr-nav-control js-tab-focus" aria-label="Toggle navigation" aria-controls="dr-nav-id">
        <svg class="dr-nav-control__bg" aria-hidden="true" viewBox="0 0 48 48">
        </svg>
        <i class="anim-menu-btn__icon anim-menu-btn__icon--close" aria-hidden="true"></i>
      </button>
    </div>
  </div>

