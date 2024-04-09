import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
// import { loginSuccess, loginFailure } from '../../../actions/authActions';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  clearErrorsMessages,
  login,
  resetAfterLoggedIn,
} from "../../../slices/AuthSlice";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Checkbox } from "flowbite-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching data from store
  const { message, isLoggedIn, error } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    // clear error
    dispatch(clearErrorsMessages());
  }, []);

  useEffect(() => {
    if (error && message) {
      setErrorMessage(message);
    } else if (isLoggedIn) {
      dispatch(resetAfterLoggedIn());
      navigate("/dashboard");
    }
  }, [message, error, isLoggedIn, dispatch, navigate]);

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="my-0 lg:my-0 mx-4 lg:mx-0 flex justify-center items-center h-screen">
      <div className="w-full max-w-lg my-0 mx-auto">
        <div className="text-center mb-8">
          {/* <img className="inline-block" src={logo} alt="Logo" /> */}
          {/* <h1 className="text-xl font-bold text-[#173f7e]">LOGO</h1> */}
        </div>
        <h1 className="text-3xl md:text-4xl text-[#556ee6] font-bold text-center pb-5">
          Log In
        </h1>
        <p className="text-base md:text-lg text-blue-900 font-medium text-center pb-8">
          Welcome back! Please enter your details.
        </p>
        <div className="login_area">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Failed! </span> {errorMessage}
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-base text-left md:text-xl font-bold text-blue-900 dark:text-white"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  className={`bg-gray-50 border ${
                    errors.username
                      ? "border-red-500 focus:border-red-900 focus:ring-red-600"
                      : "border-blue-900 focus:border-blue-900 focus:ring-blue-900"
                  } text-blue-900 text-sm rounded-lg   block w-full p-2.5`}
                  placeholder="Enter your email address"
                  {...register("username", {
                    required: true,
                  })}
                />
                {errors?.username && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AiOutlineExclamationCircle className="text-red-600" />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block mb-2 text-base md:text-xl font-bold text-blue-900"
                >
                  Password
                </label>
                <div className="block md:hidden">
                  <Link
                    className="text-base md:text-xl text-[#556ee6] font-bold hover:text-teal-500"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="relative">
                <input
                  placeholder="Enter your password"
                  type={passwordType}
                  id="password"
                  className={`bg-gray-50 border ${
                    errors.password
                      ? "border-red-500 focus:border-red-900 focus:ring-red-600"
                      : "border-blue-900 focus:border-blue-900 focus:ring-blue-900"
                  } text-blue-900 text-sm rounded-lg   block w-full p-2.5`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  
                />

                {errors?.password?.message && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AiOutlineExclamationCircle className="text-red-600" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-blue-900 rounded bg-gray-50 focus:ring-3 focus:ring-blue-900"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-base font-medium text-blue-900"
                >
                  Remember me!
                </label>
              </div>
              <div className="hidden md:block">
                <Link
                  className="text-[#556ee6] font-medium hover:text-blue-950"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Checkbox
                        onChange={togglePassword}
                       
                      />
                      <span>Show password</span>
            </div>
            <button
              type="submit"
              className="text-white bg-[#556ee6] hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
