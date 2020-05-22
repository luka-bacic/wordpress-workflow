<?php 

// Add CSS, JS, Fonts
function resources() {
  // Add jQuery via CDN
  wp_enqueue_script( 'jquery_cdn', 'https://code.jquery.com/jquery-3.5.1.min.js', null, null, true);

  // Add Bootstrap Bundle v4.5
  wp_enqueue_script( 'bootstrap_bundle', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js', null, null, true);

  // Custom site scripts
  wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', array(), true , true );

  // Bootstrap CSS
  wp_enqueue_style( 'bootstrap_css', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' );
  
  // Theme CSS
  wp_enqueue_style( 'theme_style', get_template_directory_uri() . '/dist/css/main.min.css' );
}
add_action('wp_enqueue_scripts', 'resources');
