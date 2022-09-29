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

const cartButtons = document.querySelectorAll('.info button');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');

const cart = [];
const addItem = (name, price) => {
  const item = { name, price, qty: 1 };
  for (const cartItem of cart) {
    if (cartItem.name == item.name) {
      cartItem.qty++;
      return;
    }
  }
  cart.push(item);
};
const getQty = () => {
  const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
  return totalQty || 0;
};

const showItems = () => {
  const qty = getQty();

  cartQty.innerHTML = `You have ${qty} items in your cart.`;

  let itemStr = '';

  itemList.innerHTML = itemStr;
};

const calculateTotal = () => {};

const removeItem = (e) => {};

cartButtons.forEach((button) =>
  button.addEventListener('click', () => {
    addItem(button.getAttribute('id'), button.getAttribute('data-price'));
    showItems();
  })
);
