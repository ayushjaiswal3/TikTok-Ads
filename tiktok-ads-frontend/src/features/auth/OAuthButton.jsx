// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setToken } from "./authSlice";
// import { clearError } from "../errors/errorSlice";

// function OAuthButton() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isConnected = useSelector((state) => state.auth.isConnected);

//   const handleConnect = () => {
//     // ✅ Mock OAuth success
//     const mockToken = "mock_access_token_123";

//     localStorage.setItem("access_token", mockToken);
//     dispatch(setToken(mockToken));
//     dispatch(clearError());

//     // ✅ Redirect to protected route
//     navigate("/create-ad");
//   };

//   return (
//     <div className="section auth-section">
//       <h2>1. Connect TikTok Ads Account</h2>

//       <p className="section-desc">
//         Authorize access to your TikTok Ads account so you can create and submit
//         ad creatives. This step simulates the OAuth authorization flow.
//       </p>

//       {!isConnected ? (
//         <button className="primary-btn" onClick={handleConnect}>
//           🔐 Connect TikTok Ads Account
//         </button>
//       ) : (
//         <div className="auth-success">
//           <span className="success-icon">✅</span>
//           <span>Account connected successfully</span>
//         </div>
//       )}

//       <p className="helper-text">
//         If your session expires, you’ll be prompted to reconnect before
//         submitting an ad.
//       </p>
//     </div>
//   );
// }

// export default OAuthButton;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../errors/errorSlice";

function OAuthButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isConnected = useSelector((state) => state.auth.isConnected);

  const handleConnect = () => {
    dispatch(clearError());

    // ✅ Start OAuth flow (simulate TikTok redirect)
    navigate("/callback?code=SUCCESS");
  };

  return (
    <div className="section auth-section">
      <h2>1. Connect TikTok Ads Account</h2>

      {!isConnected ? (
        <button className="primary-btn" onClick={handleConnect}>
          🔐 Connect TikTok Ads Account
        </button>
      ) : (
        <div className="auth-success">
          <span>✅ Account connected</span>
        </div>
      )}
    </div>
  );
}

export default OAuthButton;
