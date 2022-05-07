import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { fetchFromAPI } from './helpers';

export default function Checkout() {
  const stripe = useStripe();
  const [product, setProduct] = useState({
    name: 'Hat',
    description: 'Pug hat. A hat your pug will love.',
    images: [
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsolidstarts.com%2Ffoods%2Fcoconut%2F&psig=AOvVaw3-vVW0_8uBTk64qYoOC7Lf&ust=1652040644791000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJjWsJCZzvcCFQAAAAAdAAAAABAD',
    ],
    amount: 799,
    currency: 'cad',
    quantity: 0,
  });

  const changeQuantity = (event) => {
    setProduct({ ...product, quantity: Math.max(0, product.quantity + event) });
  };

  const handleClick = async (event) => {
    const body = { line_items: [product] };

    const { id: sessionId } = await fetchFromAPI('checkouts', {
      body,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <>

      <div>
        <h3>{product.name}</h3>
        <h4>
          Stripe Amount:
          {' '}
          {product.amount}
        </h4>
        <img src={product.images[0]} width="250px" alt="product" />

        <button
          type="button"
          onClick={() => changeQuantity(-1)}
        >
          -
        </button>
        <span>
          {product.quantity}
        </span>
        <button
          type="button"
          onClick={() => changeQuantity(1)}
        >
          +
        </button>
      </div>

      <hr />

      <button
        type="button"
        onClick={handleClick}
        disabled={product.quantity < 1}
      >
        Start Checkout
      </button>

    </>
  );
}
