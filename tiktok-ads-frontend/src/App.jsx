import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import OAuthButton from "./features/auth/OAuthButton";
import OAuthCallback from "./features/auth/OAuthCallback";
import ErrorBanner from "./features/errors/ErrorBanner";
import AdForm from "./features/ad/AdForm";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="app-container">
          <h1 className="app-title">TikTok Ads Creative Flow</h1>

          <ErrorBanner />

          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={isConnected ? <AdForm /> : <OAuthButton />}
            />

            {/* OAuth callback */}
            <Route path="/callback" element={<OAuthCallback />} />

            {/* Protected Create Ad Route */}
            <Route
              path="/create-ad"
              element={
                <ProtectedRoute>
                  <AdForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
