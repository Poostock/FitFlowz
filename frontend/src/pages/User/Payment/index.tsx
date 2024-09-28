import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentMethod from "../../../components/payment/PaymentMethod";
import PackageDetails from "../../../components/payment/PaymentDetails";
import PaymentSuccess from "../../../components/payment/PaymentSuccess";
import myImage from "../../../assets/bg.jpg";
import { PaymentInterface } from "../../../interfaces/IPayment";
import { CreateCreditCard } from "../../../service/https/creditcard";
import { CreatePayment } from "../../../service/https/payment";
import { CreatePromtpay } from "../../../service/https/promtpay";

const Payment: React.FC = () => {
    const location = useLocation();
    const selectedPackage = location.state?.package;

    const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
    const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
    const [promptPayImage, setPromptPayImage] = useState<string | null>(null); // Change to string | null
    const [expiryDate, setExpiryDate] = useState<Date | null>(null); // Change to Date | null

    const handlePayment = async () => {
        const memberId = localStorage.getItem("id");

        if (!memberId || !selectedPackage) {
            console.error("Missing Member ID or Package information.");
            alert("Error: Missing member or package information.");
            return;
        }

        const paymentData: PaymentInterface = {
            PaymentMethodName: paymentMethod,
            Amount: selectedPackage.Price,
            MemberID: Number(memberId),
            PackageID: selectedPackage.ID,
        };
        console.log("Payment Data:", paymentData);

        try {
            const paymentResponse = await CreatePayment(paymentData);
            console.log("Payment Response:", paymentResponse);

            if (paymentResponse) {
                const paymentId = paymentResponse.data.ID;
                console.log(paymentId);
                if (paymentMethod === "Credit Card") {
                    const cardHolder = (document.getElementById("cardHolder") as HTMLInputElement).value;
                    console.log(cardHolder);
                    const cardNumber = Number((document.getElementById("cardNumber") as HTMLInputElement).value.replace(/[^0-9]/g, ""));
                    console.log(cardNumber);

                    const cvv = Number((document.getElementById("cvvCode") as HTMLInputElement).value);
                    console.log(cvv)
                    if(!expiryDate){
                        console.error("Expiry date is required for Credit Card payment.");
                        alert("Error: Expiry date is required for Credit Card payment.");
                        return;
                    }
                    const creditCardData = {
                        NameOnCard: cardHolder,
                        CardNumber: cardNumber,
                        ExpiryDate: expiryDate,
                        CVV: cvv,
                        PaymentID: paymentId,
                    };
                    console.log("Credit Card Data:", creditCardData);

                    const creditCardResponse = await CreateCreditCard(creditCardData);
                    console.log("Credit Card Response:", creditCardResponse);
                } else if (paymentMethod === "PromptPay") {
                    const promptPayData = {
                        Proof: promptPayImage as string,
                        PaymentID: paymentId,
                    };
                    console.log("PromptPay Data:", promptPayData);

                    const promptPayResponse = await CreatePromtpay(promptPayData);
                    console.log("PromptPay Response:", promptPayResponse);
                }

                setPaymentComplete(true);
            } else {
                console.error("Payment creation failed.");
                alert("Failed to process payment. Please try again.");
            }
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Error during payment processing.");
        }
    };

    if (paymentComplete) {
        return <PaymentSuccess />;
    }

    return (
        <div className="bg-cover min-h-screen flex items-center justify-center text-white" style={{ backgroundImage: `url(${myImage})` }}>
            <div className="flex flex-col md:flex-row h-[600px] bg-gray-900 p-12 rounded-2xl shadow-xl w-full md:w-3/4">
                <PaymentMethod
                    selectedMethod={paymentMethod}
                    onMethodChange={setPaymentMethod}
                    setPromptPayImage={setPromptPayImage} // Pass the setter as prop
                    promptPayImage={promptPayImage} // Pass the uploaded image as a prop
                    setExpiryDate={setExpiryDate} // Pass the setter for expiry date
                    expiryDate={expiryDate}
                />

                {selectedPackage ? (
                    <PackageDetails packageInfo={selectedPackage} onPaymentClick={handlePayment} />
                ) : (
                    <p className="text-white">No package information available.</p>
                )}
            </div>
        </div>
    );
};

export default Payment;
