"use strict";

export default class Search {
  constructor() {
    const $searchInput = $(".search-form input");
    const $searchButton = $(".search-form button");
    
    // On initial load, check if search input is empty
    toggleDisabled($searchInput, $searchButton);

    // When typing in search input and leaving focus, check if search input is empty
    $searchInput.on("keyup focusout", function () {
      toggleDisabled($searchInput, $searchButton);
    });

    // When search input loses focus, toggle the "opened" class
    $searchInput.on("blur focus", function() {
      $(".search-wrap").toggleClass("opened");
    })
    
    // On initial load, set search form width
    setSearchWidth();
    
    // Variable for debouncing the resize event
    let timeoutVar;

    // After resizing is finished, set new width for search form
    $(window).on("resize", function(){
      clearTimeout(timeoutVar);

      timeoutVar = setTimeout(setSearchWidth, 200); // run code only when resizing is finished
    });

  }
}

// Toggles disabled attribute and "disabled" class on given $input
// 
// @param  $input  - jQuery node, text input
// @param  $submit - jQuery node, button
function toggleDisabled($input, $submit) {
  if ($input.val().trim().length) {
    $submit.prop("disabled", false);
    $submit.removeClass("disabled");
  } else {
    $submit.prop("disabled", true);
    $submit.addClass("disabled");
  }
}

// Sets the max width for the search form when expanded
function setSearchWidth() {
  let width = $(".search-form").offset().left - $("#navigation-container").offset().left;

  if(window.innerWidth < 992) {
    $(".search-wrap").css({
      "width": "250px",
    });
  } else if(window.innerWidth <= 1399) { // search bar is as wide as left side of nav menu
    $(".search-wrap").css({
      "width": width + 40 + "px",
    });
  } else { // search bar is as wide as left side of nav menu, with larger padding
    $(".search-wrap").css({
      "width": width + 75 + "px",
    });
  }
}