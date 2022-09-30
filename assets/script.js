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
      showItems();
      itemList.scrollIntoView();
      return;
    }
  }
  cart.push(item);

  itemList.scrollIntoView();

  showItems();
};
const getQty = () => {
  const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
  return totalQty || 0;
};

const showItems = () => {
  const qty = getQty();

  if (qty === 0) {
    cartQty.innerHTML = `Your mood cart is currently empty, <strong>let's get shopping!</strong>`;
  } else {
    cartQty.innerHTML = `You have <strong>${qty}</strong> items in your cart.`;
  }

  let itemStr = '';

  for (const { name, price, qty } of cart) {
    itemStr += `<li>
        <strong>${name}</strong> $${price} x ${qty} = $${(price * qty).toFixed(2)}
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data-name="${name}" min="0" value="${qty}">
        
        </li>`;
  }

  itemList.innerHTML = itemStr;
  if (cart.length > 0) {
    cartTotal.innerHTML = `<p>Total cost of your items are: $${calculateTotal()}</p>`;
  } else {
    cartTotal.innerHTML = ``;
  }
};

const calculateTotal = () => {
  let total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return total.toFixed(2);
};

const removeItem = (name, qty = 0) => {
  if (qty === 0) {
    const index = cart.findIndex((item) => {
      return item.name === name;
    });
    cart.splice(index, 1);
    showItems();
    return;
  }

  const index = cart.findIndex((item) => {
    return item.name == name;
  });

  cart[index].qty -= qty;
  if (cart[index].qty <= 0) cart.splice(index, 1);

  showItems();
};

itemList.addEventListener('click', (e) => {
  const name = e.target.dataset.name;
  if (e.target.classList.contains('remove')) {
    removeItem(name, 0);
  } else if (e.target.classList.contains('add-one')) {
    addItem(name);
  } else if (e.target.classList.contains('remove-one')) {
    removeItem(name, 1);
  }
});

itemList.onchange = (e) => {
  const name = e.target.dataset.name;
  if (e.target.value <= 0) {
    removeItem(name, 0);
    return;
  }

  const index = cart.findIndex((item) => item.name == name);
  cart[index].qty = parseInt(e.target.value);
  showItems();
};

cartButtons.forEach((button) =>
  button.addEventListener('click', () => {
    addItem(button.getAttribute('id'), button.getAttribute('data-price'));
    showItems();
  })
);

showItems();
