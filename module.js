let database;
let cartCounter = {};
const dltEvents = {};

const searchBtn = document.getElementById('search');
const pro_list = document.getElementsByClassName('pro_list')[0];
const card = document.getElementsByClassName('card');
const cardContainer = document.getElementById('card_container');

const addDatabase = (data) => (database = data);

const productCardBuilder = (product, id) => {
  return `
  <li class="card" id="card__${id}">
      <div>
        <img src="${product.url}" alt="Products">
        <h4><b>${product.name}</b></h4> 
      </div
    </li>
  `;
};

const addProducts = () => {
  database.products.forEach((pro, idx) => {
    pro_list.innerHTML += productCardBuilder(pro, idx);
  });
};

const cardEvents = (isRemove = false) => {
  const event = (cb) => {
    Array.prototype.forEach.call(card, (child) => {
      cb(child);
    });
  };
  if (isRemove) {
    event((child) => {
      child.removeEventListener('click', () => {}, true);
    });
    return;
  }
  event((child) => {
    const idList = [];
    Array.prototype.forEach.call(card, (c) => {
      idList.push(c.id);
    });
    child.addEventListener('click', (e) => {
      addToCart(e.currentTarget.id);
      calculate();
    });
  });
};

const addToCart = (id) => {
  const idx = id.split('__')[1];
  cartCounter[idx] = cartCounter[idx] ? cartCounter[idx] : 0;
  cartCounter[idx] += 1;

  const imgLink = database.products[idx].url;
  const price = database.products[idx].price * cartCounter[idx];
  const name = database.products[idx].name;

  const buildCard = `
  <div class="cart_card" id="cartCard__${idx}">
    <div class="cart_grp_1">
      <div id="cart_img">
        <img src="${imgLink}" alt="product_img" />
        <span id="cart__${idx}" class="total_item">${cartCounter[idx]}</span>
      </div>
      <span id="cart_name">${name}</span>
    </div>
    <div class="cart_grp_2">
      <span>BDT<span id="cart_price">${price}</span></span>
      <img id="dlt__${idx}" class="dlt" src="./assets/dlt.svg" alt="delete_icon" />
    </div>
  </div>`;

  if (cartCounter[idx] > 1)
    document.getElementById('cart__' + idx).innerHTML = cartCounter[idx];
  else cardContainer.innerHTML += buildCard;

  dltEvents[`dlt__${idx}`] = false;
};

const calculate = () => {
  let price = 0;
  Object.keys(cartCounter).forEach((key) => {
    price += database.products[key].price * cartCounter[key];
  });
  const discount = database.discount;
  const tax = database.tax;

  const discountPrice = (price * discount) / 100;
  const subtotal = price - discountPrice;
  const taxPrice = (price * tax) / 100;
  const total = subtotal + taxPrice;

  document.getElementById('discount').innerHTML = discountPrice.toFixed(2);
  document.getElementById('subtotal').innerHTML = subtotal.toFixed(2);
  document.getElementById('tax').innerHTML = taxPrice.toFixed(2);
  document.getElementById('total').innerHTML = total.toFixed(2);
  document.getElementById('pay').innerHTML = total.toFixed(2);
};

const searchEvent = () => {
  const searchItems = [];
  database.products.forEach((pro) => {
    searchItems.push(pro.name);
  });
  searchBtn.addEventListener('keyup', (event) => {
    cardEvents(true);
    let isFind = false;
    pro_list.innerHTML = ``;
    searchItems.forEach((itm, idx) => {
      if (
        itm.includes(event.target.value) &&
        pro_list.children.length <= database.products.length
      ) {
        const pro = database.products[idx];
        pro_list.innerHTML += productCardBuilder(pro, idx);
        isFind = true;

        cardEvents();
      }
      if (!itm.includes(event.target.value) && !isFind) {
        pro_list.innerHTML = ``;
      }
    });
  });
};

const deleteEvents = (id) => {
  document.getElementById(id).addEventListener('click', () => {
    const idx = id.split('__')[1];
    cartCounter[idx] = 0;
    calculate();
    document.getElementById('cart__' + idx).innerHTML = cartCounter[idx];
    if (cartCounter[idx] == 0) {
      document.getElementById('cartCard__' + idx).remove();
      dltEvents.splice(dltEvents.indexOf(id), 1);
    }
  });
};

document.addEventListener('click', () => {
  if (Object.keys(dltEvents).length) {
    Object.keys(dltEvents).forEach((key) => {
      deleteEvents(key);
      dltEvents[key] = true;
    });
  }
});

export { addDatabase, addProducts, cardEvents, searchEvent };
