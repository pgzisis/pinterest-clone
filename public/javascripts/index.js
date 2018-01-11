$(document).ready(function() {
  // initializations
  $(".button-collapse").sideNav();
  $("select").material_select();

  $(document).on("change", "select", function() {
    window.location.href =
      "https://hidden-plains-14482.herokuapp.com/wall/" + $(this).val();
  });
});
