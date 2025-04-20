import { TiTick } from "react-icons/ti";

const PricingCard = ({ title, color, price, frequency, benefits, onClick }) => {
  return (
    <div className="container flex flex-col w-[80%] md:w-[30%] bg-slate-100 p-2 mb-10 rounded-xl min-h-90">
      <h1 className={`font-bold text-3xl ${color}`}>{title.toUpperCase()}</h1>
      <hr className="opacity-20" />
      <p>Ksh {price}/ {frequency}</p>

      <div className="mt-7 space-y-2">
        {benefits.map((benefit, i) => (
          <div key={i} className="pricing-info flex items-start">
            <TiTick className="text-white rounded-full mr-2 bg-yellow-500" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <hr className="opacity-20 my-5" />
      <button
        onClick={onClick}
        className="bg-[#006400] border border-black text-white mx-auto p-2 rounded-md font-bold text-lg hover:border-yellow-500"
      >
        Get Started Now
      </button>
    </div>
  );
};

export default PricingCard;
