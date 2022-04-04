  // IIFE - Immediately Invoked Function Expression
  (function($, window, document) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {

     // The DOM is ready!

   });

   // The rest of the code goes here!
   
   function login(body){
       return $.ajax({
           url:'/login',
           type: 'POST',
           data: body
       })
   }

  }(window.jQuery, window, document));
  // The global jQuery object is passed as a parameter