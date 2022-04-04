// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {
  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $(function () {
    // The DOM is ready!
    const loginForm = $('#login-form');
    loginForm.on('click', function (event) {
      event.preventDefault();
      const body = getFormBody($(this));
      console.log(body);
    });
  });

  // The rest of the code goes here!

  function login(body) {
    return $.ajax({
      url: '/login',
      type: 'POST',
      data: body,
    });
  }

  function getFormBody(form) {
    const body = {};
    const fields = form.serializeArray();
    fields.forEach((field) => {
      body[field.name] = field.value;
    });
    return body;
  }
})(window.jQuery, window, document);
// The global jQuery object is passed as a parameter
