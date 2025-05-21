import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    const secret = res.data?.clientSecret;
                    if (secret) {
                        setClientSecret(secret);
                    } else {
                        console.error("Missing clientSecret in response", res.data);
                        setError("Failed to initialize payment. Please try again.");
                    }
                })
                .catch(err => {
                    console.error("Failed to create payment intent", err);
                    setError("Failed to initialize payment. Please try again.");
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || processing) return;

        setProcessing(true);
        setError('');

        const card = elements.getElement(CardElement);
        if (!card) {
            setProcessing(false);
            return;
        }

        try {
            const { error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                setProcessing(false);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                setError(confirmError.message);
            } else if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                };

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    if (res.data?.paymentResult?.insertedId) {
                        await refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful!",
                            text: "Your payment has been processed successfully.",
                            confirmButtonColor: 'var(--color-text-dark)',
                        });
                        navigate('/dashboard/paymentHistory');
                    }
                } catch (error) {
                    console.error("Error saving payment:", error);
                    setError("Payment successful but failed to save details. Please contact support.");
                }
            }
        } catch (error) {
            console.error("Payment error:", error);
            setError("An unexpected error occurred. Please try again.");
        }

        setProcessing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-xl font-bold text-[var(--color-text-dark)]">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                    padding: '10px 0',
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <p className="text-red-600 text-sm">{error}</p>
                    </motion.div>
                )}

                {transactionId && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                        <p className="text-green-600 text-sm">
                            Payment successful! Transaction ID: {transactionId}
                        </p>
                    </motion.div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                        !stripe || !clientSecret || processing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[var(--color-text-dark)] hover:bg-opacity-90 transition-colors'
                    }`}
                >
                    {processing ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Pay Now'
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CheckoutForm;
