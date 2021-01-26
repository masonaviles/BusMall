'use strict';

// create a contructor
//   name
//   timesClicked
//   timesShown
//   image
//   all images shown

function ProductImage(name, image) {
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  //file path to image
  this.image = image;

  ProductImage.allImages.push(this);
}

// Creates our allImages property on the ProductImage Contructor
ProductImage.allImages = [];


// creates the ProductImage, and runs the operations within the constructor
new ProductImage('bag','images/bag.jpg');
new ProductImage('banana','images/banana.jpg');
new ProductImage('bathroom','images/bathroom.jpg');
new ProductImage('boots','images/boots.jpg');
new ProductImage('breakfast','images/breakfast.jpg');
new ProductImage('bubblegum','images/bubblegum.jpg');
new ProductImage('chair','images/chair.jpg');
new ProductImage('cthulhu','images/cthulhu.jpg');
new ProductImage('dog-duck', 'images/dog-duck.jpg');
new ProductImage('dragon', 'images/dragon.jpg');
new ProductImage('pen', 'images/pen.jpg');
new ProductImage('pet-sweep', 'images/pet-sweep.jpg');
new ProductImage('scissors', 'images/scissors.jpg');
new ProductImage('shark','images/shark.jpg');
new ProductImage('sweep', 'images/sweep.png');
new ProductImage('tauntaun', 'images/tauntaun.jpg');
new ProductImage('unicorn', 'images/unicorn.jpg');
new ProductImage('usb', 'images/usb.gif');
new ProductImage('water-can', 'images/water-can.jpg');
new ProductImage('wine-glass', 'images/wine-glass.jpg');
console.log(ProductImage.allImages);


// select elements from my HTML to render goat stuff

var goatContainer = document.getElementById('Product-container');
var leftProductImage = document.getElementById('Left');
var middleProductImage = document.getElementById('Middle');
var rightProductImage = document.getElementById('Right');

// generates 2 random goat images
function generateRandomProduct() {

  // randomIndex from our  array
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  // make sure they don't have the same pictures
  while (rightIndex === leftIndex) {
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (rightIndex === middleIndex) {
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (leftIndex === middleIndex) {
    middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }

  var leftProduct = ProductImage.allImages[leftIndex];
  var rightProduct = ProductImage.allImages[rightIndex];
  var middleProduct = ProductImage.allImages[middleIndex];

  return [leftProduct, middleProduct, rightProduct];
}

function renderProducts(leftProduct, middleProduct, rightProduct) {
  leftProductImage.src = leftProduct.image;
  leftProduct.timesShown++;
  // leftProductImage.setAttribute('data-id', leftGoat.image);

  rightProductImage.src = rightProduct.image;
  rightProduct.timesShown++;
  // rightProductImage.setAttribute('data-id', rightGoat.image);

  middleProductImage.src = middleProduct.image;
  middleProduct.timesShown++;
}

// initialize our page
var randomProducts = generateRandomProduct();
renderProducts(randomProducts[0], randomProducts[1], randomProducts[2]);


// how do we do something everytime an image was clicked
goatContainer.addEventListener('click', function (event) {
  console.log(event.target); // the actual item that was clicked

  // how do identify which image is clicked.  Increment the object that was clicked.
  for (var i = 0; i < ProductImage.allImages.length; i++) {
    if (event.target.src.includes(ProductImage.allImages[i].image)) {
      ProductImage.allImages[i].timesClicked++;
      console.log(ProductImage.allImages[i]);
    }
  }

  var newProducts = generateRandomProduct();
  renderProducts(newProducts[0], newProducts[1], newProducts[2]);
});

