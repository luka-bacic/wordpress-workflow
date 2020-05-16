"use strict";

import Header from './modules/header.js';
import Nav from './modules/nav.js';
import Search from './modules/search.js';
import Scroll from './modules/scroll.js';
import AjaxPagination from './modules/ajax-pagination.js';

$(document).ready(function() {
  new Search();
  new Header();
  new Scroll();
  new Nav();
  new AjaxPagination();
});
