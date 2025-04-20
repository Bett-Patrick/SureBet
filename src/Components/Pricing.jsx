import PricingCard from "./PricingCard";
import { usePaystackPayment } from "react-paystack";
import { db } from "../Components/firebase";
import { doc, setDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { paystackPublicKey } from "../paystackConfig";
import { useState } from "react";

const plans = [
  {
    title: "Silver",
    price: 200,
    frequency: "day",
    color: "text-[#C0C0C0]",
    benefits: [
      "Every day is game day! Check out our daily tips and win big!",
      "Access 24 hours VIP predictions",
      "Expert Football Predictions",
    ],
  },
  {
    title: "Gold",
    price: 600,
    frequency: "week",
    color: "text-[#FFD700]",
    benefits: [
      "Get the scoop on this week’s matches",
      "Enjoy a full week of VIP predictions",
      "Weekly unbeatable football predictions!",
    ],
  },
  {
    title: "Platinum",
    price: 3000,
    frequency: "month",
    color: "text-blue-900",
    benefits: [
      "Plan ahead with our monthly predictions.",
      "Get unlimited VIP access for a month",
      "Your winning streak starts here!",
    ],
  },
];

const Pricing = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (reference, plan) => {
    try {
      await setDoc(doc(db, "subscriptions", user.uid), {
        email: user.email,
        plan,
        reference: reference.reference,
        timestamp: new Date(),
      });
      alert(`Payment successful for ${plan} plan`);
    } catch (err) {
      console.error("Error saving subscription:", err);
      alert("An error occurred while saving your subscription. Please try again.");
    }
  };

  const handlePayment = (plan) => {
    if (!user) {
      alert("You must be logged in to make a payment.");
      return;
    }

    setIsLoading(true);

    const config = {
      reference: new Date().getTime().toString(),
      email: user.email,
      amount: plan.price * 100,
      publicKey: paystackPublicKey,
      currency: "KES",
      metadata: {
        custom_fields: [
          { display_name: "Plan", value: plan.title },
          { display_name: "User Name", value: user.displayName || "Anonymous" },
          { display_name: "Subscription Duration", value: plan.frequency },
        ],
      },
    };

    const initializePayment = usePaystackPayment(config);
    initializePayment(
      (ref) => {
        setIsLoading(false);
        handleSuccess(ref, plan.title);
      },
      () => {
        setIsLoading(false);
        alert("Payment was cancelled");
      }
    );
  };

  return (
    <div className="pricings-page md:min-w-[500] mb-10 gap-10 w-[90%] mx-auto">
      <h1 className="text-4xl font-bold mb-5 mt-40">PRICING</h1>
      <h3 className="text-2xl mb-5 md:text-3xl font-bold md:mb-10">
        <span className="text-amber-300">Join a Club</span> that Suits You
      </h3>

      {isLoading && <p className="text-center text-lg">Processing payment...</p>}

      <div className="pricings flex flex-col gap-3 md:flex-row md:justify-center items-center md:gap-10 py-2">
        {plans.map((plan) => (
          <PricingCard
            key={plan.title}
            title={plan.title}
            color={plan.color}
            price={plan.price}
            frequency={plan.frequency}
            benefits={plan.benefits}
            onClick={() => handlePayment(plan)}
            aria-label={`Subscribe to the ${plan.title} plan for ${plan.price} KES per ${plan.frequency}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;