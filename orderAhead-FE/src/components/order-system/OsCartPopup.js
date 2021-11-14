import React from 'react';
import OsIconClose from './icons/OsIconClose';
import OsCartItem from './loop/OsCartItem';

const OsCartPopup = () => {
  return (
    <div class="os-cart-popup">
      <div class="os-cart-popup__header">
        <div class="os-cart-popup__overview">
          <div class="os-cart-popup__title">Shopping Cart</div>
          <div class="os-cart-popup__subtotal">Subtotal:&nbsp;$222.50</div>
        </div>
        <button class="os-cart-popup__close">
          <OsIconClose />&nbsp; Close
        </button>
      </div>
      <div class="os-cart-popup__details">
        <div class="os-cart-popup__products os-cart-product-list">
          <OsCartItem />
          <OsCartItem />
          <OsCartItem />
        </div>
      </div>
      <div class="os-cart-popup__footer">
        <button class="os-cart-popup__checkout-button">Proceed to checkout</button>
        <div class="os-cart-popup__right">
          <div class="os-cart-popup__total">Subtotal: $222.50</div>
          <div class="os-cart-popup__taxnote">*Cannabis tax will be added at checkout.</div>
        </div>
      </div>
    </div>
  );
};

export default OsCartPopup;