import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "./authSlice";
import { setError } from "../errors/errorSlice";

function OAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      dispatch(setError("Authorization failed. No code received."));
      return;
    }

    if (code === "INVALID_CLIENT") {
      dispatch(setError("Invalid client credentials."));
      return;
    }

    if (code === "NO_ADS_SCOPE") {
      dispatch(
        setError(
          "Your TikTok account does not have Ads permissions. Please grant Ads access."
        )
      );
      return;
    }

    if (code === "GEO_BLOCKED") {
      dispatch(setError("TikTok Ads not available in your region."));
      return;
    }

    // ✅ SUCCESS: Exchange code → token
    setTimeout(() => {
      const mockToken = "mock_access_token_123";

      // 🔑 STORE TOKEN
      dispatch(setToken(mockToken));

      // 🔑 STORE EXPIRY (3 minutes)
      localStorage.setItem(
        "token_expiry",
        Date.now() + 3 * 60 * 1000
      );

      // 🔑 REDIRECT AFTER LOGIN
      navigate("/create-ad");
    }, 1000);
  }, [dispatch, navigate]);

  return <p>Connecting TikTok Ads account...</p>;
}

export default OAuthCallback;
