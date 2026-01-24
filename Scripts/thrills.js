import {cart, addTocart} from '../data/cart.js';
import { products } from '../data/product.js';
   
   let productsHTML = ``;

products.forEach((product) => {
    productsHTML += `
     <div class="product-card">
          <img src="${product.image}" alt="product" width="200px">
          <p>Thrills Couture</p>
          <span>${product.name}</span>
                    <p class="price">&#8358<b>${product.price}</b></p>
                    <button class="js-add-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>

    `;

});


function updateCartQuantity() {
    let cartQuantity = 0;

            cart.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });

            document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
}   


function count () {
    let cartQuantity = 0;

            cart.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });

            document.querySelector('.js-item-qty')
            .innerHTML = cartQuantity;
}


document.querySelector('.js-product-grid').innerHTML = productsHTML;
document.querySelectorAll('.js-add-cart').forEach ((button)=> {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            addTocart(productId);
            
            updateCartQuantity();
            

        })
})
 