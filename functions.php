<?php
// Defines
define( 'LESSCODE_DIR', get_stylesheet_directory() );
define( 'LESSCODE_LIB', LESSCODE_DIR . '/lib' );
define( 'LESSCODE_LIB_CLASS', LESSCODE_LIB . '/classes' );
define( 'LESSCODE_HELP_CLASS', LESSCODE_LIB . '/helpers' );
define( 'LESSCODE_URI', get_stylesheet_directory_uri() );
define( 'LESSCODE_URI_ASSETS', LESSCODE_URI . '/assets' );
define( 'LESSCODE_URI_CSS', LESSCODE_URI_ASSETS . '/css' );
define( 'LESSCODE_URI_JS', LESSCODE_URI . '/js' );

// // Helpers
// require_once LESSCODE_HELP_CLASS . '/helpers.php';


// Classes
require_once LESSCODE_LIB_CLASS . '/class.theme.php';
require_once LESSCODE_LIB_CLASS . '/class.taxonomy.php';
require_once LESSCODE_LIB_CLASS . '/class.functions.php';



// Run theme
$LESSCODE_theme = new LESSCODE_Theme();
$LESSCODE_theme->run();


// Run functions
$LESSCODE_functions = new LESSCODE_Functions();
$LESSCODE_functions->run();

// Run custom post type taxonomy
$LESSCODE_taxonomy = new LESSCODE_Taxonomy();
$LESSCODE_taxonomy->run();


function codyframe_ie_support() {
	?>
	<script>if(! ('CSS' in window) || !CSS.supports('color', 'var(--color-var)')) {var cfStyle = document.getElementById('codyframe-css');if(cfStyle) {var href = cfStyle.getAttribute('href');href = href.replace('style.css', 'style-fallback.css');cfStyle.setAttribute('href', href);}}</script>
	<?php
}


function wpb_add_google_fonts() {
   wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap', false );
   }
   
   add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );







