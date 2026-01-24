import { useDispatch, useSelector } from "react-redux";
import { clearError } from "./errorSlice";

function ErrorBanner() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors.message);

  if (!errorMessage) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffe6e6",
        color: "#b30000",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "4px",
      }}
    >
      <strong>Error:</strong> {errorMessage}
      <button
        onClick={() => dispatch(clearError())}
        style={{ marginLeft: "10px" }}
      >
        ✖
      </button>
    </div>
  );
}

export default ErrorBanner;
