// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';

// // import CheckoutFrom from './CheckoutFrom';
// // TODO Add Publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {
//     return (
//         <div>
//             <h2>Payment page</h2>
//             <div>
//                 <Elements stripe={stripePromise}>
//                  {/* <CheckoutFrom></CheckoutFrom> */}
//                  <CheckoutForm></CheckoutForm>
//                 </Elements>
//             </div>
//         </div>
//     );
// };

// export default Payment;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
                <div className="bg-[var(--color-text-dark)] p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaCreditCard className="text-2xl text-white" />
                        <h2 className="text-2xl font-bold text-white">Secure Payment</h2>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                        <FaLock className="text-sm" />
                        <span className="text-sm">SSL Encrypted</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Details</h3>
                        <p className="text-gray-600">Complete your payment using our secure payment gateway.</p>
                    </div>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaLock className="text-gray-400" />
                            <p>Your payment information is encrypted and secure.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Payment;
