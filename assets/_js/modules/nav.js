"use strict";

export default class Nav {
  constructor() {
    // Mobile navigation behaviour
    const $navContainer = $("#navigation-wrap");
    // The darkened area in left side of mobile nav
    const $background = $("#empty-space");
    // Links in nav which scroll to an ID on a page (like Contact link)
    const $hashLinks = $navContainer.find("a[href*='#'");

    $background.click(function() {
      toggleNav();
    });
    
    // Select all Navbar togglers 
    const $buttons = $('.toggle-nav');

    // Toggle "opened" class on the $navContainer
    $buttons.each(function(){
      $(this).click(function(){
        toggleNav();
      });
    });

    $hashLinks.click(function() {
      toggleNav();
    });

    function toggleNav() {
      $navContainer.toggleClass("opened");
    }
  }
}
