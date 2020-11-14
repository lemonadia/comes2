<?php

class LESSCODE_Theme {
	
	public function run() {
		add_filter( 'init', array( &$this, 'post_types' ), 1 );
		add_action( 'after_setup_theme', array( &$this, 'setup_theme' ), 0 );
		add_filter( 'mb_settings_pages', array( &$this, 'load_options' ) );
		add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_scripts' ), 1000 );
        add_filter('upload_mimes', array( &$this, 'cc_mime_types'));

	}
	
	// public function lc_theme_textdomain() {
	// 	load_theme_textdomain( 'lc', get_template_directory() . '/languages' );
	// }
	public function setup_theme() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );
	}
	
	public function enqueue_scripts() {
		$theme_version = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'codyframe', get_template_directory_uri() . '/assets/css/lc.css', array(), $theme_version );
		wp_enqueue_script( 'codyframe', get_template_directory_uri() . '/assets/js/scripts.js', array(), $theme_version, true );

		wp_deregister_script( 'jquery' );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
	

	// Allow SVG
    public function cc_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
	
	
	// Register Menu
	public function register_primary_menu() {
		register_nav_menu( 'lc_primary', __( 'Primary Menu', 'lc' ) );
		register_nav_menu( 'lc_mobile', __( 'Mobile Menu', 'lc' ) );
	}
	
	public function post_types() {
		register_post_type( 'geometry', array(
			'labels'        => array(
				'name'          => __( 'Geometria', 'izo' ),
				'add_new'       => __( 'Dodaj', 'izo' ),
				'add_new_item'  => __( 'Dodaj', 'izo' ),
				'edit_item'     => __( 'Edytuj', 'izo' ),
				'singular_name' => __( 'Geometria', 'izo' )
			),
			'public'        => true,
			'has_archive'   => false,
			'show_in_menu'  => true,
			'supports'      => array(
				'title',
				'thumbnail',
				'editor',
				'excerpt',
				'custom-fields', 
			),
			'show_in_rest' => true,
			'rewrite'       => array(
				'slug' => 'geometria'
			),
			'menu_icon'     => 'dashicons-admin-generic',
		) );
		register_post_type( 'szarpak', array(
			'labels'        => array(
				'name'          => __( 'Szarpaki', 'izo' ),
				'add_new'       => __( 'Dodaj', 'izo' ),
				'add_new_item'  => __( 'Dodaj', 'izo' ),
				'edit_item'     => __( 'Edytuj', 'izo' ),
				'singular_name' => __( 'Szarpak', 'izo' )
			),
			'public'        => true,
			'has_archive'   => false,
			'show_in_menu'  => true,
			'supports'      => array(
				'title',
				'thumbnail',
				'editor',
				'excerpt',
				'custom-fields', 

			),
			'show_in_rest' => true,
			'rewrite'       => array(
				'slug' => 'szarpaki'
			),
		) );
	}
	
}