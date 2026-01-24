import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { setError } from "../features/errors/errorSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isConnected, accessToken } = useSelector((state) => state.auth);

  const tokenExpiry = localStorage.getItem("token_expiry");

  // ❌ Not logged in
  if (!isConnected || !accessToken) {
    return <Navigate to="/" replace />;
  }

  // ❌ Token expired
  if (tokenExpiry && Date.now() > Number(tokenExpiry)) {
    setTimeout(() => {
      dispatch(logout());
      dispatch(
        setError(
          "Your TikTok session has expired. Please reconnect your account."
        )
      );
    }, 0);

    return <Navigate to="/" replace />;
  }

  // ❌ Token revoked
  if (accessToken === "REVOKED_TOKEN") {
    setTimeout(() => {
      dispatch(logout());
      dispatch(
        setError(
          "Your TikTok access was revoked. Please reconnect your account."
        )
      );
    }, 0);

    return <Navigate to="/" replace />;
  }

  // ✅ Token valid
  return children;
}

export default ProtectedRoute;
