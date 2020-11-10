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
    <div class="drawer__body flex flex-column js-drawer__body">
      <nav class="dr-nav padding-md" aria-label="Main">
        <ul>
          <li>
            <a class="dr-nav__link" href="#0">
              <span>News</span>
            </a>
          </li>
          <li>
            <a class="dr-nav__link" href="#0">
              <span>Creative Industry</span>
          
            </a>
          </li>
          <li>
            <a class="dr-nav__link" href="#0">
              <span>Video</span>
            </a>
          </li>
          <li>
            <a class="dr-nav__link" href="#0">
              <span>Photography</span>
            </a>
          </li>
          <li>
            <a class="dr-nav__link" href="#0">
              <span>Tutorials</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

<div class="dr-nav-control-wrapper">
  <div class="container height-100% flex items-center">
    <button class="reset margin-left-auto dr-nav-control anim-menu-btn js-anim-menu-btn js-dr-nav-control js-tab-focus" aria-label="Toggle navigation" aria-controls="dr-nav-id">
      <svg class="dr-nav-control__bg" aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" stroke-miterlimit="10" /></svg>
      <i class="anim-menu-btn__icon anim-menu-btn__icon--arrow-right" aria-hidden="true"></i>
    </button>
  </div>
</div>

