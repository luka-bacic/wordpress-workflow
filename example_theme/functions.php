<?php 

// Add CSS, JS, Fonts
function resources() {
  // Add all JS libraries (includes one big file with all libraries located in `/assets/js/libraries/`)
  wp_enqueue_script( 'libraries', get_template_directory_uri() . '/dist/js/libraries.min.js', array(), true , true );
  
  // Custom site scripts
  wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', array(), true , true );

  // All CSS combined into 1 (the file outputted by combining sass files and other css files placed in `/assets/_css/`)
  wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/dist/css/main.min.css' );
}
add_action('wp_enqueue_scripts', 'resources');

// Add type="module" for the main script
function add_type_attribute($tag, $handle, $src) {
  // if not your script, do nothing and return original $tag
  if ( 'main' !== $handle ) {
    return $tag;
  }
  // change the script tag by adding type="module" and return it.
  $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
  return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
