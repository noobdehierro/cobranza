$(document).ready(function () {
  var beforeInstallPrompt = null;

  $(window).on("beforeinstallprompt", eventHandler);

  function eventHandler(event) {
    beforeInstallPrompt = event.originalEvent;
    $("#installBtn").removeAttr("disabled");
    $("#installBtn").removeAttr("style");
  }

  $("#installBtn").on("click", function () {
    if (beforeInstallPrompt) {
      beforeInstallPrompt.prompt();
    }
  });
});

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
  $("#telefono").mask("0000000000");
  $("#celular").mask("0000000000");
  $("#telefonoContacto").mask("0000000000");

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
        // url: "https://jsonplaceholder.typicode.com/todos/1",
        url: "http://serverpwa.test/api/pwa",
        data: {
          code: code,
        },
        success: function ({ data }) {
          console.log(data);

          // let clientName = {
          //   name: "Jorge Leon",
          //   adeudo: 50000,
          // };

          $("#welcome").hide();

          // $(".clientName").text(clientName.name);
          // $(".totalMont").text(clientName.adeudo);

          $(".clientName").text(data.name);
          $(".totalMont").text(data.adeudo);
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

  $("#button-1").click(function () {
    showquestion("question1-1");
  });

  $("#prevHome").click(function () {
    showquestion("confirmCode");
  });

  $("#button-1-1").click(function () {
    showquestion("question1-1-1");
  });

  $("#button-1-2").click(function () {
    showquestion("question1-1-2");
  });

  $("#button-2").click(function () {
    showquestion("question2-1");
  });

  $("#help").click(function (e) {
    e.preventDefault();
    var celular = $("#celular").val(),
      email = $("#email").val(),
      telefono = $("#telefono").val(),
      telefonoContacto = $("#telefonoContacto").val();

    if ($("#helpForm").valid()) {
      if (celular || telefono || email || telefonoContacto) {
        console.log(celular, email, telefono, telefonoContacto);

        $.ajax({
          type: "get",
          // url: "http://serverpwa.test/api/pwa",
          url: "https://jsonplaceholder.typicode.com/todos/1",
          data: {
            code: 123456,
          },
          success: function (response) {
            showquestion("thankYou");
          },
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Ayudalo",
          text: "llena alguno de los campos, y lo podras apoyar con mas facilidad",
        });
      }
    }
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

  $("#helpForm").validate({
    rules: {
      celular: {
        minlength: 10,
        digits: true,
      },
      telefono: {
        minlength: 10,
        digits: true,
      },
      telefonoContacto: {
        minlength: 10,
        digits: true,
      },
    },
    messages: {
      celular: {
        minlength: "El número de celular debe tener al menos 10 caracteres.",
        maxlength: "El número de celular no debe exceder los 10 caracteres.",
        digits: "Ingresa solo dígitos en este campo.",
      },
      telefono: {
        minlength: "El número de teléfono debe tener al menos 10 caracteres.",
        maxlength: "El número de teléfono no debe exceder los 10 caracteres.",
        digits: "Ingresa solo dígitos en este campo.",
      },
      telefonoContacto: {
        minlength: "El número de teléfono debe tener al menos 10 caracteres.",
        maxlength: "El número de teléfono no debe exceder los 10 caracteres.",
        digits: "Ingresa solo dígitos en este campo.",
      },
    },
  });
});
