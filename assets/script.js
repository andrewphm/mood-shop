import data from './data.js';

const itemsContainer = document.querySelector('#items');

// for (let i = 0; i < data.length; i++) {
//   const newDiv = document.createElement('div');
//   newDiv.className = 'item';
//   const img = document.createElement('img');
//   img.src = data[i].image;
//   img.width = 300;
//   img.height = 300;
//   newDiv.appendChild(img);

//   // Price and desc
//   const descriptionEl = document.createElement('p');
//   const priceEl = document.createElement('p');
//   descriptionEl.innerText = data[i].desc;
//   priceEl.innerText = data[i].price;
//   newDiv.appendChild(descriptionEl);
//   newDiv.appendChild(priceEl);

//   // Make a button
//   const button = document.createElement('button');
//   button.id = data[i].name;
//   button.dataset.price = data[i].price;
//   button.innerHTML = 'Add to Cart';
//   newDiv.appendChild(button);

//   itemsContainer.appendChild(newDiv);
// }

data.forEach((mood) => {
  const newDiv = document.createElement('div');
  newDiv.className = 'item';
  newDiv.innerHTML = `<div class="img-wrapper"><img width=300 height=300 src="${mood.image}"></div>
                      <div class="info"> 
                      <p>${mood.desc}</p>
                      <p>$${mood.price}</p>
                      <button data-price="${mood.price}" id="${mood.name}">Add to Cart</button>
                      </div>`;

  itemsContainer.appendChild(newDiv);
});
