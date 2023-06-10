import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Page donot exist!");
  }, []);
  return (
    <>
      <h2>Error Encountered!</h2>
      <button type="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
};

export default ErrorPage;
