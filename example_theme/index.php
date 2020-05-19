<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <?php wp_head(); ?>
</head>
<body>
  <div class="container">
    <div class="row">
      <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
          <div class="col">
            <h2><?php the_title(); ?></h2>
          </div>
        <?php endwhile; ?>
      <?php else : ?>
        <div class="col">
          <h2>No posts found.</h2>
        </div>
      <?php endif; ?>
    </div>

    <div class="row">
      <div class="col">
        <figure> 
          <!-- You include images by referencing them from the `dist` directory, like this: -->
          <img
            src="<?php echo bloginfo( 'template_directory' ) . '/dist/images/lizard.jpg'; ?>"
            alt="pink lizard chilling"
          />
          <figcaption>
            Photo by <a href="https://unsplash.com/@magdalenakulamanchee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Magdalena Kula Manchee</a> on <a href="https://unsplash.com/">Unsplash</a>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
  
  <?php wp_footer(); ?>
</body>
</html>