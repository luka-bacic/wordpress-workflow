<?php 

get_header();

?>
  <main>
    <div class="heading">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="white-text fs-48 fw-500 lh-12 ls--01">Ving DOO</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
              <h2><?php the_title(); ?></h2>
            <?php endwhile; ?>
          <?php else : ?>
            <h2>Nema rezultata za datu pretragu</h2>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </main>

<?php

get_footer();

?>
