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
var buttonLinks = document.getElementById('ButtonLinks');

// info for product constructor
var imagesSrcArr = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'];
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
function ProductImage(name) {
  this.name = name.substring(0, name.length - 4);
  this.timesClicked = 0;
  this.timesShown = 0;
  //file path to image
  this.image = `images/${name}`;

  // 'this' refers to the object that the constructor is creating
  ProductImage.allImages.push(this);
  // Mapping using bracket notation on an objects to assign he object to a key that is this.name
  ProductImage.imageMap[this.name] = this;
}


// Creates our allImages property on the ProductImage Contructor
ProductImage.allImages = [];
ProductImage.imageMap = {};

// a for loop that creates the ProductImage, and runs the operations within the constructor
// for (var i = 0; i < imagesSrcArr.length; i++){
//   new ProductImage(nameSrcArr[i], imagesSrcArr[i]);
// }
for (var i = 0; i < imagesSrcArr.length; i++) {
  new ProductImage(imagesSrcArr[i]);
}
console.log('allImages: ', ProductImage.allImages);
console.log('imageMap: ', ProductImage.imageMap);
console.log('numberOfClicks: ', ProductImage.numberOfClicks);

// generates 3 random product images
function generateRandomProduct() {

  // // randomIndex from our  array
  // var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // var middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  // // make sure they don't have the same pictures
  // // put it in one while loop
  // while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex) {
  //   rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  //   middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  //   leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // }
  // // while (rightIndex === middleIndex) {
  // //   rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // // }
  // // while (leftIndex === middleIndex) {
  // //   middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  // // }

  // var leftProduct = ProductImage.allImages[leftIndex];
  // var rightProduct = ProductImage.allImages[rightIndex];
  // var middleProduct = ProductImage.allImages[middleIndex];

  // return [leftProduct, middleProduct, rightProduct];
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);

  // as long as the their is one duplicate index
  //   UPDATE:  We also need to check whether our middle and right Index are equal, that added index increases our complexity more that just double since everything needs to be compared.
  while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex) {
    if (leftIndex === rightIndex) {
      rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    if (leftIndex === middleIndex) {
      middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    // Adding additional conditional here to account for the added condition in the while
    if (middleIndex === rightIndex) {
      rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    }
  }

  var leftProductImage = ProductImage.allImages[leftIndex];
  var middleProductImage = ProductImage.allImages[middleIndex];
  var rightProductImage = ProductImage.allImages[rightIndex];

  return [leftProductImage, middleProductImage, rightProductImage];
}

// renders the 3 images
function renderProducts() {
  var currentlyRenderedImages = [leftProductImage.name, rightProductImage.name, middleProductImage.name];

  var newImages = generateRandomProduct();

  while (
    currentlyRenderedImages[0] === newImages[0].name ||
    currentlyRenderedImages[1] === newImages[0].name ||
    currentlyRenderedImages[2] === newImages[0].name ||
    currentlyRenderedImages[0] === newImages[1].name ||
    currentlyRenderedImages[1] === newImages[1].name ||
    currentlyRenderedImages[2] === newImages[1].name ||
    currentlyRenderedImages[0] === newImages[2].name ||
    currentlyRenderedImages[1] === newImages[2].name ||
    currentlyRenderedImages[2] === newImages[2].name
  ) {
    newImages = generateRandomProduct();
  }

  //render images to page
  leftProductImage.src = newImages[0].image;
  newImages[0].timesShown++;

  rightProductImage.src = newImages[1].image;
  newImages[1].timesShown++;

  middleProductImage.src = newImages[2].image;
  newImages[2].timesShown++;
}

// initialize our page
// var randomProducts = generateRandomProduct();
renderProducts();

// counter function. removes click event listener on images after 25 rounds

function roundLimit(event){
  console.log(event.target);
  for (var i = 0; i < ProductImage.allImages.length; i++){
    if (event.target.src.includes(ProductImage.allImages[i].image)){
      ProductImage.allImages[i].timesClicked++;
      console.log('ProductImage.allImages[i]: ', ProductImage.allImages[i]);
      console.log('ProductImage.allImages[i].timesClicked: ', ProductImage.allImages[i].timesClicked);
    }
  }
  rounds++;
  console.log(rounds);
  // var newProducts = generateRandomProduct();
  renderProducts();

  if (rounds === roundsLimit){
    for (var i = 0; i < ProductImage.allImages.length; i++) {
      votesByProduct.push(ProductImage.allImages[i].timesClicked);
    }
    alert('That\'s ' + roundsLimit + ' Rounds of Voting!');
    // remove the eventlistener after 25 rounds
    productContainer.removeEventListener('click', roundLimit);
    // show the stats after the 25 rounds
    renderStats();
    // draw the chart after the 25 rounds
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        // set labels to the array that contains all the names
        labels: nameSrcArr,
        datasets: [{
          label: 'times clicked',
          // votes by product / numbers clicked
          data: votesByProduct,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

// render the stats
function renderStats() {
  var h1El = document.createElement('h1');
  h1El.textContent = 'Stats';
  resultsDiv.appendChild(h1El);

  var buttonEl = document.createElement('a');
  buttonEl.textContent = 'View Results';
  buttonEl.setAttribute('class', 'btn');
  buttonEl.href = '#statsContainer';
  buttonLinks.appendChild(buttonEl);

  for (var i = 0; i < ProductImage.allImages.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = ProductImage.allImages[i].timesClicked + ' votes for ' + ProductImage.allImages[i].name;
    resultsDiv.appendChild(liEl);
  }
}

productContainer.addEventListener('click', roundLimit);
resultsDiv.appendChild(resultsUl);

// ------------------------------
// Demo Chart.js 

var ctx = document.getElementById('myChart').getContext('2d');

var votesByProduct = [];
var timesProductsAreShow = [];

// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     // set labels to the array that contains all the names
//     labels: nameSrcArr,
//     datasets: [{
//       label: 'times clicked',
//       // votes by product / numbers clicked
//       data: votesByProduct,
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });

