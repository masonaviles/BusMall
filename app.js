'use strict';

// variables

// rounds
var rounds = 0;
var roundsLimit = 25;

// select elements from my HTML to render product stuff
var productContainer = document.getElementById('Product-container');
var leftProductImage = document.getElementById('Left');
var middleProductImage = document.getElementById('Middle');
var rightProductImage = document.getElementById('Right');

// results html elements
var resultsDiv = document.getElementById('Results');
var resultsUl = document.createElement('ul');

// info for product constructor
var imagesSrcArr = [
  'images/bag.jpg',
  'images/banana.jpg',
  'images/bathroom.jpg',
  'images/boots.jpg',
  'images/breakfast.jpg',
  'images/bubblegum.jpg',
  'images/chair.jpg',
  'images/cthulhu.jpg',
  'images/dog-duck.jpg',
  'images/dragon.jpg',
  'images/pen.jpg',
  'images/pet-sweep.jpg',
  'images/scissors.jpg',
  'images/shark.jpg',
  'images/sweep.png',
  'images/tauntaun.jpg',
  'images/unicorn.jpg',
  'images/usb.gif',
  'images/water-can.jpg',
  'images/wine-glass.jpg'];
var nameSrcArr = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'];

// create a contructor
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

// a for loop that creates the ProductImage, and runs the operations within the constructor
for (var i = 0; i < imagesSrcArr.length; i++){
  new ProductImage(nameSrcArr[i], imagesSrcArr[i]);
}
console.log(ProductImage.allImages);


// generates 3 random product images
function generateRandomProduct() {

  // randomIndex from our  array
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  // make sure they don't have the same pictures
  // put it in one while loop
  while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex) {
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  // while (rightIndex === middleIndex) {
  //   rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // }
  // while (leftIndex === middleIndex) {
  //   middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // }

  var leftProduct = ProductImage.allImages[leftIndex];
  var rightProduct = ProductImage.allImages[rightIndex];
  var middleProduct = ProductImage.allImages[middleIndex];

  return [leftProduct, middleProduct, rightProduct];
}

// renders the 3 images
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

// counter function. removes click event listener on images after 25 rounds

function roundLimit(event){
  console.log(event.target);
  for (var i = 0; i < ProductImage.allImages.length; i++){
    if (event.target.src.includes(ProductImage.allImages[i].image)){
      ProductImage.allImages[i].timesClicked++;
      console.log(ProductImage.allImages[i]);
    }
  }
  rounds++;
  console.log(rounds);
  var newProducts = generateRandomProduct();
  renderProducts(newProducts[0], newProducts[1], newProducts[2]);
  if (rounds === roundsLimit){
    alert('That\'s ' + roundsLimit + ' Rounds of Voting!');
    productContainer.removeEventListener('click', roundLimit);
  }
}

productContainer.addEventListener('click', roundLimit);
resultsDiv.appendChild(resultsUl);

