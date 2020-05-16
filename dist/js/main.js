(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _header = _interopRequireDefault(require("./modules/header.js"));

var _nav = _interopRequireDefault(require("./modules/nav.js"));

var _search = _interopRequireDefault(require("./modules/search.js"));

var _scroll = _interopRequireDefault(require("./modules/scroll.js"));

var _ajaxPagination = _interopRequireDefault(require("./modules/ajax-pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

$(document).ready(function () {
  new _search["default"]();
  new _header["default"]();
  new _scroll["default"]();
  new _nav["default"]();
  new _ajaxPagination["default"]();
});

},{"./modules/ajax-pagination.js":2,"./modules/header.js":3,"./modules/nav.js":4,"./modules/scroll.js":5,"./modules/search.js":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxPagination = function AjaxPagination() {
  _classCallCheck(this, AjaxPagination);

  // Enable async AJAX
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.async = true;
  }); // For Project archive page

  if ($(".post-type-archive-ving_project").length) {
    // For Active projects
    getNewProjectPage("#current-projects", "#active-content", "#active-row", '.active'); // For Finished projects

    getNewProjectPage("#finished-projects", "#finished-content", "#finished-row", '.finished');
  } // // Set new height when Project tab is changed
  // $('a[href="#current-projects"]').click(function() {
  //   console.log('a');
  // });
  // For Blog post page, archive


  if ($(".blog").length || $(".archive").length) {
    getNewBlogPage("#post-container", "#post-row-wrap", "#post-row");
  }
}; // Fetches the new page from a pagination link for the archive page
// 
// @param  tab        - ID of the bootstrap tab (Active or Finished, see project archive page)
// @param  rowWrap    - ID of the div surrounding the project row
// @param  row        - ID of the div which has all the projects listed
// @param  pagination - class of which pagination to trigger


exports["default"] = AjaxPagination;

function getNewProjectPage(tab, rowWrap, row, pagination) {
  var $tab = $(tab);
  var $rowWrap = $(rowWrap);

  if ($tab.length) {
    // Sets the height on the row wrap based on the current height of the post row
    var setHeight = function setHeight() {
      // A element with display: none has a height of 0, if this is the case grab the height of the surrounding div
      $tab.css({
        height: $(row).height() ? $(row).height() : $('.tab-content').height()
      });
    };

    console.log('tab: ', $tab, '\nrow: ', $rowWrap); // set initial height on div surrounding blog posts

    setHeight(); // Variable for debouncing the resize event

    var timeoutVar;
    $(window).on("resize", function () {
      clearTimeout(timeoutVar);
      timeoutVar = setTimeout(setHeight, 50); // run code only when resizing is finished
    });
    $rowWrap.on('click', '.pagination' + pagination + ' a', function (e) {
      // Stop going to link
      e.preventDefault(); // Get link

      var link = $(this).attr('href'); // Load new projects from link 

      $rowWrap.fadeOut(300, function () {
        $(this).load(link + ' ' + row, function () {
          $rowWrap.fadeIn(500); // Set new height

          setHeight(); // Scroll to top of tab

          $("html, body").animate({
            scrollTop: $(".nav-project-wrapper").offset().top - 130
          });
        });
      });
    });
  }
} // Fetches the new page from a pagination link for the Blog page and related blog archive pages
// 
// @param  tab        - ID of the div surrounding blog posts and blog sidebar
// @param  rowWrap    - ID of the div surrounding the blog posts row
// @param  postRow    - ID of the div which has all the blog posts listed


function getNewBlogPage(tab, rowWrap, postRow) {
  var $tab = $(tab);
  var $rowWrap = $(rowWrap);

  if ($tab.length) {
    // Sets the height on the row wrap based on the current height of the post row
    var setHeight = function setHeight() {
      $rowWrap.css({
        height: $(postRow).height()
      });
    };

    // Set initial height of the tab, important for animating the height
    setHeight(); // Variable for debouncing the resize event

    var timeoutVar;
    $(window).on("resize", function () {
      clearTimeout(timeoutVar);
      timeoutVar = setTimeout(setHeight, 50); // run code only when resizing is finished
    });
    $rowWrap.on('click', '.pagination a', function (e) {
      // Stop going to link
      e.preventDefault(); // Get link

      var link = $(this).attr('href'); // Load new blog posts from link 

      $rowWrap.animate({
        opacity: 0 // fade out old posts

      }, 500, "swing", function () {
        $rowWrap.load(link + ' ' + postRow, function () {
          // Animate insertion of new blog posts
          $rowWrap.css("opacity", "1").animate({
            height: $(postRow).height()
          }, 600); // Scroll to top of blog listings

          $("html, body").animate({
            scrollTop: $("#post-container").offset().top - 130
          });
        });
      });
    });
  }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function Header() {
  _classCallCheck(this, Header);

  // Make header background have a color if scrolled down
  // Element to observe 
  var toggle = document.querySelector('.x-obs'); // Create IntersectionObserver instance

  var observer = new IntersectionObserver(function (entries, observer) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        $("header").addClass('scrolled');
      } else {
        $("header").removeClass('scrolled');
      }
    }
  }, {}); // Start observing

  observer.observe(toggle);
};

exports["default"] = Header;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nav = function Nav() {
  _classCallCheck(this, Nav);

  // Mobile navigation behaviour
  var $navContainer = $("#navigation-wrap"); // The darkened area in left side of mobile nav

  var $background = $("#empty-space"); // Links in nav which scroll to an ID on a page (like Contact link)

  var $hashLinks = $navContainer.find("a[href*='#'");
  $background.click(function () {
    toggleNav();
  }); // Select all Navbar togglers 

  var $buttons = $('.toggle-nav'); // Toggle "opened" class on the $navContainer

  $buttons.each(function () {
    $(this).click(function () {
      toggleNav();
    });
  });
  $hashLinks.click(function () {
    toggleNav();
  });

  function toggleNav() {
    $navContainer.toggleClass("opened");
  }
};

exports["default"] = Nav;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function Scroll() {
  _classCallCheck(this, Scroll);

  // Enable smooth scroll for "Contact" link in nav menu
  // 
  // Select all wanted links with hashes in nav to have smooth scrolling
  $('.navbar a[href*="#"]') // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'); // Does a scroll target exist?

      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 115
        }, 700);
      }
    }
  });
};

exports["default"] = Scroll;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function Search() {
  _classCallCheck(this, Search);

  var $searchInput = $(".search-form input");
  var $searchButton = $(".search-form button"); // On initial load, check if search input is empty

  toggleDisabled($searchInput, $searchButton); // When typing in search input and leaving focus, check if search input is empty

  $searchInput.on("keyup focusout", function () {
    toggleDisabled($searchInput, $searchButton);
  }); // When search input loses focus, toggle the "opened" class

  $searchInput.on("blur focus", function () {
    $(".search-wrap").toggleClass("opened");
  }); // On initial load, set search form width

  setSearchWidth(); // Variable for debouncing the resize event

  var timeoutVar; // After resizing is finished, set new width for search form

  $(window).on("resize", function () {
    clearTimeout(timeoutVar);
    timeoutVar = setTimeout(setSearchWidth, 200); // run code only when resizing is finished
  });
}; // Toggles disabled attribute and "disabled" class on given $input
// 
// @param  $input  - jQuery node, text input
// @param  $submit - jQuery node, button


exports["default"] = Search;

function toggleDisabled($input, $submit) {
  if ($input.val().trim().length) {
    $submit.prop("disabled", false);
    $submit.removeClass("disabled");
  } else {
    $submit.prop("disabled", true);
    $submit.addClass("disabled");
  }
} // Sets the max width for the search form when expanded


function setSearchWidth() {
  var width = $(".search-form").offset().left - $("#navigation-container").offset().left;

  if (window.innerWidth < 992) {
    $(".search-wrap").css({
      "width": "250px"
    });
  } else if (window.innerWidth <= 1399) {
    // search bar is as wide as left side of nav menu
    $(".search-wrap").css({
      "width": width + 40 + "px"
    });
  } else {
    // search bar is as wide as left side of nav menu, with larger padding
    $(".search-wrap").css({
      "width": width + 75 + "px"
    });
  }
}

},{}]},{},[1]);
