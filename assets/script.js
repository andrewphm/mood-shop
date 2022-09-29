import data from './data.js';

const itemsContainer = document.querySelector('#items');

data.forEach(({ desc, price, name, image }) => {
  const newDiv = document.createElement('div');
  newDiv.className = 'item';
  newDiv.innerHTML = `<div class="img-wrapper"><img width=300 height=300 src="${image}"></div>
                      <div class="info"> 
                      <p>${desc}</p>
                      <p>$${price}</p>
                      <button data-price="${price}" id="${name}">Add to Cart</button>
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

  if (qty === 0) {
    cartQty.innerHTML = `Your cart is empty, let's shop!`;
  } else {
    cartQty.innerHTML = `You have ${qty} items in your cart.`;
  }

  let itemStr = '';

  for (const { name, price, qty } of cart) {
    itemStr += `<li><strong>${name}</strong> $${price} x ${qty} = $${(price * qty).toFixed(
      2
    )}</li>`;
  }

  itemList.innerHTML = itemStr;
  if (cart.length > 0)
    cartTotal.innerHTML = `<p>Total cost of your items are: $${calculateTotal()}</p>`;
};

const calculateTotal = () => {
  let total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return total.toFixed(2);
};

const removeItem = (e) => {};

cartButtons.forEach((button) =>
  button.addEventListener('click', () => {
    addItem(button.getAttribute('id'), button.getAttribute('data-price'));
    showItems();
  })
);

showItems();
