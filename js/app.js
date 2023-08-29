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
  $("#clarificationCelular").mask("0000000000");
  $("#clarificationTelefono").mask("0000000000");

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
        // url: "http://serverpwa.test/api/pwa",
        data: {
          code: code,
        },
        success: function ({ data }) {
          // console.log(data);

          let clientName = {
            name: "Jorge Leon",
            adeudo: 50000,
          };

          $("#welcome").hide();

          $(".clientName").text(clientName.name);
          $(".totalMont").text(clientName.adeudo);

          // $(".clientName").text(data.name);
          // $(".totalMont").text(data.adeudo);
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

  $("#wayToLiquidate").click(function () {
    showquestion("question1-1");
  });

  $("#prevSettlementType").click(function () {
    showquestion("question1-1");
  });

  $("#button-1-2").click(function () {
    showquestion("question1-1-2");
  });

  $("#button-2").click(function () {
    showquestion("question2-1");
  });

  $("#prevQuestionOne, #prevQuestion").click(function () {
    showquestion("question1");
  });

  $("#button-3").click(function () {
    showquestion("question3-1");
  });
  $("#clarificationSubmit").click(function (e) {
    e.preventDefault();

    var celular = $("#clarificationCelular").val(),
      email = $("#clarificationEmail").val(),
      telefono = $("#clarificationTelefono").val(),
      file = $("#clarificationFile").val();
    if ($("#clarificationForm").valid()) {
      console.log("objecto", celular, email, telefono, file);

      $.ajax({
        showLoader: true,
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/todos/1",
        // url: "http://serverpwa.test/api/pwa",
        data: {
          celular: celular,
          email: email,
          telefono: telefono,
          file: file,
        },
        success: function (response) {
          console.log(response);
          showquestion("thankYou");
        },
      });
    }
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

  $("#button-4").click(function (e) {
    e.preventDefault();
    showquestion("question4-1");
  });

  $("#button-4-1, #button-4-2, #button-4-3, #button-4-4").click(function (e) {
    e.preventDefault();
    $(".question").hide();

    // console.log(e.target.textContent);

    let text = e.target.textContent.trim();

    $.ajax({
      type: "get",
      // url: "http://serverpwa.test/api/pwa",
      url: "https://jsonplaceholder.typicode.com/todos/1",
      data: {
        respuesta: text,
      },
      success: function (response) {
        showquestion("thankYou");
      },
    });
  });

  $("#explication").click(function (e) {
    showquestion("explicationForm");
  });

  $("#prevNoloConozco").click(function (e) {
    e.preventDefault();
    showquestion("question4-1");
  });

  $("#explicationSubmit").click(function (e) {
    e.preventDefault();

    var message = $("#message").val();

    if (message.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La explicación debe tener al menos 10 caracteres.",
      });
      return false;
    }

    $.ajax({
      type: "get",
      // url: "http://serverpwa.test/api/pwa",
      url: "https://jsonplaceholder.typicode.com/todos/1",
      data: {
        message: message,
      },
      success: function (response) {
        showquestion("thankYou");
      },
    });
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
    showquestion("oneTimeExhibition");
  });

  $("#creditCard").click(function () {
    showquestion("creditCardForm");
  });

  $("#paymentMethods").click(function () {
    showquestion("selectPaymentMethod");
  });

  $("#explicationForm").validate({
    rules: {
      explication: {
        minlength: 10,
        maxlength: 500,
      },
    },
    messages: {
      explication: {
        minlength: "La explicación debe tener al menos 10 caracteres.",
        maxlength: "La explicación no debe exceder los 500 caracteres.",
      },
    },
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

  $("#clarificationForm").validate({
    rules: {
      clarificationCelular: {
        minlength: 10,
        digits: true,
        required: true,
      },
      clarificationEmail: {
        required: true,
        email: true,
      },
      clarificationTelefono: {
        minlength: 10,
        digits: true,
        required: true,
      },
      clarificationFile: {
        required: true,
      },
    },
    messages: {
      clarificationCelular: {
        minlength: "El número de celular debe tener al menos 10 caracteres.",
        maxlength: "El número de celular no debe exceder los 10 caracteres.",
        digits: "Ingresa solo dígitos en este campo.",
        required: "Este campo es obligatorio.",
      },
      clarificationEmail: {
        required: "Este campo es obligatorio.",
        email: "Ingresa un correo valido.",
      },
      clarificationTelefono: {
        minlength: "El número de teléfono debe tener al menos 10 caracteres.",
        maxlength: "El número de teléfono no debe exceder los 10 caracteres.",
        digits: "Ingresa solo dígitos en este campo.",
        required: "Este campo es obligatorio.",
      },
      clarificationFile: {
        required: "Este campo es obligatorio.",
      },
    },
  });

  var horaAcceso = localStorage.getItem("horaAcceso");

  if (!horaAcceso) {
    horaAcceso = new Date().getTime();
    localStorage.setItem("horaAcceso", horaAcceso);
  }

  var horaAccesoDate = new Date(parseInt(horaAcceso));

  console.log(horaAccesoDate);

  function actualizarContador() {
    var ahora = new Date().getTime();
    var tiempoTranscurrido = ahora - horaAcceso;
    var tiempoRestante = 24 * 60 * 60 * 1000 - tiempoTranscurrido; // 24 horas en milisegundos

    if (tiempoRestante <= 0) {
      document.getElementById("tiempo-restante").textContent =
        "Tiempo expirado";
    } else {
      var segundos = Math.floor(tiempoRestante / 1000) % 60;
      var minutos = Math.floor(tiempoRestante / (1000 * 60)) % 60;
      var horas = Math.floor(tiempoRestante / (1000 * 60 * 60));

      document.getElementById("tiempo-restante").textContent =
        horas + "h " + minutos + "m " + segundos + "s";
    }
  }

  setInterval(actualizarContador, 1000);

  var hora = horaAccesoDate.getHours();
  var minutos = horaAccesoDate.getMinutes();
  var segundos = horaAccesoDate.getSeconds();
  document.getElementById("hora-acceso").textContent =
    hora + ":" + minutos + ":" + segundos;
});
