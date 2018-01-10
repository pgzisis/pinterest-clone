$(document).ready(function() {
  // initializations
  $(".button-collapse").sideNav();
  initializeMasonry();

  function initializeMasonry() {
    var $grid = $(".grid").imagesLoaded(function() {
      // init Masonry after all images have loaded
      $grid.masonry({
        // options...
        itemSelector: ".grid-item",
        columnWidth: ".grid-item"
      });
    });
  }

  function modalReset() {
    $(".errorField").html("");
    $("#title").val("");
    $("#title").removeClass("invalid");
    $("#url").val("");
    $(".addedPicture").attr("src", "");
    $(".pictureErrorField").html("");
  }

  $(".modal").modal({
    ready: function() {
      modalReset();
    },
    complete: function() {
      modalReset();
    }
  });

  // Modal validation
  $("#url").change(function() {
    $(".addedPicture").attr("src", $("#url").val());

    $(".addedPicture").on("error", function() {
      $(this).attr(
        "src",
        "http://via.placeholder.com/300x200?text=Picture+not+found!"
      );
    });
  });

  $("#addPicture").click(function() {
    $(".errorField").html("");
    var errors = [];
    $("#title").val(
      $("#title")
        .val()
        .trim()
    );
    $("#url").val(
      $("#url")
        .val()
        .trim()
    );

    if ($("#title").val().length > 50) {
      errors.push('<p class="red-text">Title has too many characters.</p>');
    }

    if ($("#title").val().length === 0 || $("#url").val().length === 0) {
      errors.push('<p class="red-text">Both fields are required.</p>');
    }

    if (errors.length !== 0) {
      errors.forEach(function(err) {
        $(".errorField").append(err);
      });
    } else {
      $(".errorField").html("");
      var sentData = {
        title: $("#title").val(),
        url: $("#url").val()
      };

      // adding a new picture
      $.ajax({
        method: "POST",
        data: JSON.stringify(sentData),
        contentType: "application/json",
        url: "http://localhost:3000/wall/" + $(".userHeader").data("twitterid"),
        success: function(data) {
          if (data.success) {
            $(".pictureErrorField").html("");
            location.reload(true);
          } else {
            $(".pictureErrorField").html("");
            $(".pictureErrorField").append(
              '<p class="red-text">' + data.description + "</p>"
            );
          }
        }
      });
    }
  });

  // deleting a picture
  $(".deletePicture").click(function() {
    var pictureid = $(this).data("pictureid");
    var data = { id: pictureid };
    $.ajax({
      method: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "http://localhost:3000/wall/" + $(".userHeader").data("twitterid"),
      success: function(data) {
        if (data.success) {
          location.reload(true);
        }
      }
    });
  });
});
