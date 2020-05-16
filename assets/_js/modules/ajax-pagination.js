"use strict";

export default class AjaxPagination {
  constructor() {
    // Enable async AJAX
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      options.async = true;
    });

    // For Project archive page
    if($(".post-type-archive-ving_project").length) {
      // For Active projects
      getNewProjectPage(
        "#current-projects",
        "#active-content",
        "#active-row",
        '.active'
      );

      // For Finished projects
      getNewProjectPage(
        "#finished-projects",
        "#finished-content",
        "#finished-row",
        '.finished'
      );
    }

    // // Set new height when Project tab is changed
    // $('a[href="#current-projects"]').click(function() {
    //   console.log('a');
    // });

    // For Blog post page, archive
    if($(".blog").length || $(".archive").length) {
      getNewBlogPage(
        "#post-container",
        "#post-row-wrap",
        "#post-row"
      );
    }
  }
}

// Fetches the new page from a pagination link for the archive page
// 
// @param  tab        - ID of the bootstrap tab (Active or Finished, see project archive page)
// @param  rowWrap    - ID of the div surrounding the project row
// @param  row        - ID of the div which has all the projects listed
// @param  pagination - class of which pagination to trigger
function getNewProjectPage(tab, rowWrap, row, pagination) {
  const $tab = $(tab);
  const $rowWrap = $(rowWrap);

  if($tab.length) {
    console.log('tab: ', $tab, '\nrow: ', $rowWrap);
    // set initial height on div surrounding blog posts
    setHeight();
    
    // Variable for debouncing the resize event
    let timeoutVar;

    $(window).on("resize", function() {
      clearTimeout(timeoutVar);

      timeoutVar = setTimeout(setHeight, 50); // run code only when resizing is finished
    });

    $rowWrap.on('click', '.pagination' + pagination + ' a', function(e) {
      // Stop going to link
      e.preventDefault();

      // Get link
      let link = $(this).attr('href');

      // Load new projects from link 
      $rowWrap.fadeOut(300, function(){
        $(this).load(link + ' ' + row, function() {
          $rowWrap.fadeIn(500);

          // Set new height
          setHeight();

          // Scroll to top of tab
          $("html, body").animate({
            scrollTop: $(".nav-project-wrapper").offset().top - 130
          })
        });
      });
    });

    // Sets the height on the row wrap based on the current height of the post row
    function setHeight() {
      // A element with display: none has a height of 0, if this is the case grab the height of the surrounding div
      $tab.css({
        height: $(row).height() ? $(row).height() : $('.tab-content').height(),
      });
    }
  }
}

// Fetches the new page from a pagination link for the Blog page and related blog archive pages
// 
// @param  tab        - ID of the div surrounding blog posts and blog sidebar
// @param  rowWrap    - ID of the div surrounding the blog posts row
// @param  postRow    - ID of the div which has all the blog posts listed
function getNewBlogPage(tab, rowWrap, postRow) {
  const $tab = $(tab);
  const $rowWrap = $(rowWrap);

  if($tab.length) {
    // Set initial height of the tab, important for animating the height
    setHeight();
    
    // Variable for debouncing the resize event
    let timeoutVar;

    $(window).on("resize", function() {
      clearTimeout(timeoutVar);

      timeoutVar = setTimeout(setHeight, 50); // run code only when resizing is finished
    });
    
    
    $rowWrap.on('click', '.pagination a', function(e) {
      // Stop going to link
      e.preventDefault();
      
      // Get link
      let link = $(this).attr('href');
      
      // Load new blog posts from link 
      $rowWrap.animate({
        opacity: 0 // fade out old posts
      }, 500, "swing", function(){
        $rowWrap.load(link + ' ' + postRow, function() {
          // Animate insertion of new blog posts
          $rowWrap
          .css("opacity", "1")
          .animate({
            height: $(postRow).height()
          }, 600)
          
          // Scroll to top of blog listings
          $("html, body").animate({
            scrollTop: $("#post-container").offset().top - 130
          })
        });
      });
    });

    // Sets the height on the row wrap based on the current height of the post row
    function setHeight() {
      $rowWrap.css({
        height: $(postRow).height(),
      });
    }
  }
}
