"use strict";

export default class Header {
  constructor() {
    // Make header background have a color if scrolled down
    
    // Element to observe 
    const toggle = document.querySelector('.x-obs');
    
    // Create IntersectionObserver instance
    const observer = new IntersectionObserver(function(entries, observer){
      for(let i = 0; i < entries.length; i++) {
        if(entries[i].isIntersecting) {
          $("header").addClass('scrolled');
        } else {
          $("header").removeClass('scrolled');
        }
      }
    }, {});

    // Start observing
    observer.observe(toggle);
  }
}
