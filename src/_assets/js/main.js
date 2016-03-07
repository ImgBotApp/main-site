var Form = {

  name: '',
  email: '',
  message: '',

  submitForm: function() {
    Form.name = $('#contactName').val();
    Form.email = $('#contactEmail').val();
    Form.message = $('#contactMessage').val();

    console.log(Form.name, Form.email, Form.message);

    $.ajax({
      type: "POST",
      url: "php/form-process.php",
      data: "name=" + Form.name + "&email=" + Form.email + "&message=" + Form.message,
      success: function(text) {
        if (text == "success") {
          Form.submitSuccess();
        } else {
          Form.submitError();
          Form.submitStatusMessage(false, text);
        }
      }
    });
  },

  submitSuccess: function() {
    $("#contactForm")[0].reset();
    Form.submitMessageStatus(true, "Message Submitted!");
  },

  submitError: function() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });
  },

  submitStatusMessage: function(valid, message) {
    var messageClasses;
    if(valid) {
      messageClasses = "h3 text-center tada animated text-success"; 
    } else {
      messageClasses = "h3 text-center text-danger"; 
    }
    $('#submitStatus').removeClass().addClass(messageClasses).text(message);
  }

};

$(document).ready(function() {

  $('#contactForm').validator().on("submit", function(e) {
    if(e.isDefaultPrevented()) {
      // handle invalid form
      Form.submitStatusMessage(false, "Oops. Make sure all fields are filled in correctly.");
    } else {
      e.preventDefault();
      Form.submitForm();
    }
  });

});
