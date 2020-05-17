<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>
      <h2><?php the_title(); ?></h2>
    <?php endwhile; ?>
  <?php else : ?>
    <h2>No posts found.</h2>
  <?php endif; ?>
</body>
</html>