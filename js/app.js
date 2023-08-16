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
        url: "http://serverpwa.test/api/pwa",
        data: {
          code: code,
        },
        success: function (data) {
          console.log(data);

          $("#welcome").hide();

          $(".clientName").text(data.data.name);
          $(".totalMont").text(data.data.adeudo);
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

  // $("#paymentForm").submit(function (event) {
  //   event.preventDefault();

  //   const selectedMethod = $("input[name='paymentMethod']:checked").val();

  //   if (selectedMethod === "efectivo") {
  //     showquestion("successPayment");
  //   } else if (selectedMethod === "tarjeta") {
  //     const cardNumber = $("#cardNumber").val();
  //     const expDate = $("#expDate").val();
  //     const cvc = $("#cvc").val();

  //     showquestion("successPayment");
  //   }
  // });

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

  // $("input[name='paymentMethod']").change(function () {
  //   if ($(this).val() === "tarjeta") {
  //     $("#creditCardFields").show();
  //     $("#creditCardFieldsTwo").show();
  //   } else {
  //     $("#creditCardFields").hide();
  //     $("#creditCardFieldsTwo").hide();
  //   }
  // });

  // $("#paymentFormTwo").submit(function (event) {
  //   event.preventDefault();

  //   const selectedMethod = $("input[name='paymentMethod']:checked").val();

  //   if (selectedMethod === "efectivo") {
  //     showquestion("successPayment");
  //   } else if (selectedMethod === "tarjeta") {
  //     const cardNumber = $("#cardNumber").val();
  //     const expDate = $("#expDate").val();
  //     const cvc = $("#cvc").val();

  //     showquestion("successPayment");
  //   }
  // });

  $("#payInOneExhibition").click(function () {
    showquestion("selectPaymentMethod");
  });

  $("#creditCard").click(function () {
    showquestion("creditCardForm");
  });
});
