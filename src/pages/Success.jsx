import { Link } from "react-router-dom";

const Success = () => {
  return (
    <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen bg-white text-center text-gray-800 flex items-center justify-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
          Order Successful 🎉
        </h2>

        <p className="text-base sm:text-lg">
          Thank you for shopping with <strong>NGM and Luxury 🛍️</strong>
        </p>

        <p className="text-sm sm:text-base text-gray-600">
          We'll get in touch shortly to confirm your order.
        </p>

        <Link
          to="/"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full text-base sm:text-lg font-medium hover:bg-pink-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default Success;
