"use strict";

var project = {

  globalEvents: function() {
    $(document).on('click', '.blogpost .makepost_visible', function(e) {
      e.preventDefault();
      $('.makepost').removeClass('active');
      $(this).next('.makepost').addClass('active')
    });
  }

};

(function() {

  project.globalEvents();

})();