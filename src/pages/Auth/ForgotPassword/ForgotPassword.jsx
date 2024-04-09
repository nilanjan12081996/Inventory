import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordIcon, logo } from "../../../assets/images/images";

const ForgotPassword = () => {
  return (
    <div className="my-0 md:my-16 lg:my-0 mx-4 lg:mx-0 flex justify-center items-center h-screen">
      <div className="w-full max-w-lg my-0 mx-auto">
        <div className="text-center mb-4">
          <img className="inline-block w-44" src={forgotPasswordIcon} />
        </div>
        <h1 className="text-3xl md:text-4xl text-teal-400 font-bold text-center pb-5">
          Forgot your password?
        </h1>
        <p className="text-base md:text-lg text-blue-900 font-medium text-center pb-8">
          No worries, we got you covered.
        </p>
        <div className="login_area">
          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-base md:text-xl font-bold text-blue-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-blue-900 text-blue-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5"
                placeholder="Enter your email address"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center"
            >
              Reset Password
            </button>
            <div className="block text-center mt-3">
              <Link
                className="text-sm text-teal-400 font-medium hover:text-teal-500"
                to="/"
              >
                Back to Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
