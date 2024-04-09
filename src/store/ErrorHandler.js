import { useNavigate } from "react-router-dom";

const errorHandler = (errorsData) => {
  const navigate = useNavigate();
  let errors = {};
  console.log('errorsData', errorsData);
  errors.message = 'Something went wrong. Please try again later.';
  let statusCode = errorsData?.response?.status
    ? errorsData.response.status
    : undefined;

  if (statusCode) {
    switch (statusCode) {
      case 400:
        errors.message = errorsData?.response?.data?.message
          ? errorsData.response?.data?.message
          : 'Validation error';
        break;
      case 403:
        break;
      case 401:
        sessionStorage.removeItem('adminToken'); 
              navigate('/');
      case 422:
        errors.message = errorsData?.response?.data?.errors
          ? errorsData.response.data.errors
          : 'Validation error';
        break;
      default:
        errors.message = errorsData?.response?.data?.error
          ? errorsData.response.data.error
          : 'Something went wrong. Please try again later';
        break;
    }
  } else if (errorsData.code === 'ERR_NETWORK') {
    errors.message = 'API server network error';
  }

  return errors;
};

export default errorHandler;
