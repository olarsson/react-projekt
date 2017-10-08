"use strict";

(function() {

  $(document).on('click', '.post .makepost_visible', function(e) {
    e.preventDefault();
    $('.makepost').removeClass('active');
    $(this).next('.makepost').addClass('active')
    //$(this).addClass('active');
    //console.info(this)
  });

})();