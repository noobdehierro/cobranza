function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    var url = window.location.href;
    var swLocation = "/sac/sw.js";

    if (url.includes("localhost")) {
      swLocation = "/sw.js";
    }

    navigator.serviceWorker
      .register(swLocation)
      .then((reg) => {
        console.log("Registration successful", reg);
      })
      .catch((e) =>
        console.error("Error during service worker registration:", e)
      );
  } else {
    console.warn("Service Worker is not supported");
  }
}

registerServiceWorker();

$(document).ready(function () {
  $("#confirmCode").click(function () {
    var code = $("#code").val();

    if (
      $("#referencias").is(":checked") &&
      $("#privacidad").is(":checked") &&
      code.trim() !== ""
    ) {
      $.ajax({
        showLoader: true,
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/todos/1",
        data: {
          code: code,
        },
        success: function (data) {
          console.log(data);

          let clientName = {
            name: "Jorge Leon",
            adeudo: 50000,
          };

          $("#welcome").hide();

          $(".clientName").text(clientName.name);
          $(".totalMont").text(clientName.adeudo);
          showquestion("question1");
        },
        error: function (error) {
          console.log(error);
        },
      }).done(function () {
        setTimeout(function () {
          $("#overlay").fadeOut(300);
        }, 500);
      });
    }
  });

  $("#button-1, #button-2").click(function () {
    showquestion("question1-1");
  });

  $("#button-1-1").click(function () {
    showquestion("question1-1-1");
  });

  $("#button-1-2").click(function () {
    showquestion("question1-1-2");
  });

  function showquestion(questionId) {
    $(".question").hide();
    $("#" + questionId).show();
  }

  $(document).ajaxSend(function () {
    $("#overlay").fadeIn(300);
  });

  $(document).ajaxComplete(function () {
    $("#overlay").fadeOut(300);
  });

  $("#payInOneExhibition").click(function () {
    showquestion("selectPaymentMethod");
  });

  $("#creditCard").click(function () {
    showquestion("creditCardForm");
  });
});
