var fs = require('fs');

/*
  addImage(directory_name)
  this function will generate the HTML part about the Portfolio Section

*/
function addImage(dir) {

  // Look for images in directory and store all in images obj
  var images = fs.readdirSync('img/' + dir + '/');

  console.log(images);

  var thumbnails = document.getElementById('my-grid');
  var stColumn = document.getElementById('grid1');
  var ndColumn = document.getElementById('grid2');
  var rdColumn = document.getElementById('grid3');
  var modal = document.getElementById('modalContent');

  var gridIndex = 1; // This index float from 1 to 3, depending on the selected grid
  var htmlGridHeader = "<div id=\"grid3\" class=\"col-sm-4\"><div class=\"row\"><img src=\"img/" + dir + "/";
  var htmlGridFooter = "\" class=\"fit-image\" onclick=\"openModal();currentSlide(10)\" alt=\"img\"></div>"

  var htmlModalHeader = "<div class=\"my-slides\"><img src=\"img/" + dir + "/";
  var htmlModalBody1 = "\" alt=\"\" class=\"";
  var htmlModalBody2 = "-image\"><div class=\"numbertext text-center\">";
  var htmlModalFooter = " / 15</div></div>";

  for (var i = 0; i < images.length; i++) {

    // Add images to each column
    switch (gridIndex) {
      case 1:
        stColumn.innerHTML += htmlGridHeader + images[i] + htmlGridFooter;
        break;
      case 2:
        ndColumn.innerHTML += htmlGridHeader + images[i] + htmlGridFooter;
        break;
      case 3:
        rdColumn.innerHTML += htmlGridHeader + images[i] + htmlGridFooter;
        break;
      default: console.error('Failed to add images');
    }

    gridIndex++;

    // Check if the index went in overflow
    if (gridIndex > 3) {
      gridIndex = 1;
    }

    // Add images to modal (Image Viewer)
    var img = new Image();
    img.onload = function() {
      var height = img.height;
      var width = img.width;

      // Set image orientation
      var imageOrientation = "landscape";

      if (height > width) {
        imageOrientation = "portrait";
      }

      // Add to the modal section on HTML
      modal.innerHTML += htmlModalHeader + images[i] + htmlModalBody1 + imageOrientation + htmlModalBody2 + (i + 1) + htmlModalFooter;

      // When all images are loaded, next and prev buttons are added
      if (i >= images.length) {
        modal.innerHTML += "<a href=\"#\" class=\"prev\" onclick=\"changeSlides(-1)\">&#10094;</a><a href=\"#\" class=\"next\" onclick=\"changeSlides(1)\">&#10095;</a>"
      }
    }
    img.src = "img/" + dir + "/" + images[i];

  }

}
