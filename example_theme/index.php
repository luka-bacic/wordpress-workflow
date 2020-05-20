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
    <!-- <div class="row">
      <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
          <div class="col">
            <h2><?php the_title(); e ?></h2>
          </div>
        <?php endwhile; ?>
      <?php else : ?>
        <div class="col">
          <h2>No posts found.</h2>
        </div>
      <?php endif; ?>
    </div> -->

    <div class="row">
      <div class="col">
        <h2>Including images in template files</h2>
        <p>You include images in template files by referencing them from the `dist` directory.</p>
        <pre>
          &lt;img
            src="&lt;?php echo bloginfo( 'template_directory' ) . '/dist/images/lizard.jpg'; ?&gt;"
            alt="pink lizard chilling"
          /&gt;
        </pre>
        <figure> 
          
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

    <div class="row">
      <div class="col">
        <h2>Including images in stylesheets</h2>
        <p>In css, you reference the image by a relative URL.</p>
        <pre>
          .bg-image {
            background: url('../images/komodo.jpg');
          }
        </pre>
        <div>
          <div class="bg-image"></div>
          <p class="text-center">
            Photo by <a href="https://unsplash.com/@davidclode">David Clode</a> on <a href="https://unsplash.com/">Unsplash</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  <?php wp_footer(); ?>
</body>
</html>