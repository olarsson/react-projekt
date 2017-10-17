"use strict";

var project = {

  globalEvents: function() {

    $(document).on('click', '.topic .makecomment_visible', function(e) {
      e.preventDefault();
      $('.makecomment').removeClass('active');
      $(this).next('.makecomment').addClass('active')
    });
    
  }

};

(function() {

  project.globalEvents();

})();