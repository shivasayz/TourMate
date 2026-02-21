import axios from 'axios';
import {showAlert} from "./alerts"

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout from + charge credit card
    const stripe = Stripe('pk_test_51T2X2LJQ1jbdbaxh7gTZN5hfvKWHsw4SVjTRQSOmrmyisKbzXPFTpjYF4N66RJVj3S7xmcW8RBWIbEeSrvD8Uypb00Oul3uz9z');
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
