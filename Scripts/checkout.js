import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/product.js";
import {deliveryOptions} from "../data/delveryOptions.js"
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

hello()
 const today = dayjs();
 const deliveryDate = today.clone().add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })
    cartSummaryHTML += 

    `<div class="cart-item-container
js-cart-item-container
 js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.price}
                </div>
                <div class="product-quantity
                js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingProduct.id}"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>


             

             ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
` ;
});

    
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
   
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today
      .clone()
      .add(deliveryOption.deliveryDays, 'day')
      .format('ddd, DD MM YYYY')
      const priceStrings = deliveryOption.price
       === 0
       ? "FREE"
       : `${deliveryOption.price} -`

       const isChecked = deliveryOption.id === cartItem.deliveryOptionId ;
      html += 
        ` 
        <div class="delivery-option">
             <input type="radio" 
             ${isChecked ? 'checked' : ''}  
             class="delivery-option-input" sss
             name="delivery-option-${matchingProduct.id}">
             <div>
             <div class="delivery-option-date">
             ${deliveryDate}
             </div>

             <div class="delivery-option-price">
             ${priceStrings} Shippng
             </div>
             </div>
             </div>
        `
    })

    return html;
  }
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
link.addEventListener('click', () => {
       const productId = link.dataset.productId;

        removeFromCart(productId);
       const container = document.querySelector(`.js-cart-item-container-${productId}`)
   
       container.remove();
});
})

