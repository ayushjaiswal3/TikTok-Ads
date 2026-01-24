import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./adSlice";
import MusicSelector from "./MusicSelector";
import { submitAdApi } from "../../services/api";
import { setError, clearError } from "../errors/errorSlice";

function AdForm() {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.ad);

  const handleChange = (e) => {
    dispatch(
      updateField({
        field: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmit = async () => {
    dispatch(clearError());

    // 🔴 1️⃣ BASIC FIELD VALIDATION
    if (
      !ad.campaignName ||
      ad.campaignName.length < 3 ||
      !ad.objective ||
      !ad.adText ||
      ad.adText.length > 100 ||
      !ad.cta
    ) {
      dispatch(
        setError("Please fix the highlighted errors before submitting.")
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 🔴 2️⃣ MUSIC OPTION NOT SELECTED (🔥 REQUIRED UX FIX)
    if (!ad.musicOption) {
      dispatch(
        setError(
          "Please select a music option (Existing Music, Upload Custom Music, or No Music) before submitting."
        )
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 🔴 3️⃣ OPTION A: Existing Music ID
    if (ad.musicOption === "existing") {
      if (!ad.musicId || !ad.musicId.trim()) {
        dispatch(setError("Music ID is required."));
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (!ad.musicId.toLowerCase().startsWith("music_")) {
        dispatch(
          setError("This Music ID is invalid or not accessible.")
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 🔴 4️⃣ OPTION B: Upload Custom Music
    if (ad.musicOption === "upload") {
      if (!ad.musicId || !ad.musicId.trim()) {
        dispatch(
          setError(
            "Please upload custom music before submitting the ad."
          )
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 🔴 5️⃣ OPTION C: No Music + Conversions
    if (ad.musicOption === "none" && ad.objective === "Conversions") {
      dispatch(
        setError("Music is required for Conversion campaigns.")
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // ✅ 6️⃣ SUBMIT AD
    try {
      const token = localStorage.getItem("access_token");
      await submitAdApi(ad, token);
      alert("Ad submitted successfully ✅");
    } catch (err) {
      dispatch(
        setError(
          err.message ||
            "Failed to submit ad. Please try again."
        )
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="section">
      <h2>2. Create Ad</h2>
      <p className="section-desc">
        Fill in the creative details for your TikTok ad. All fields are required
        unless stated otherwise.
      </p>

      {/* Campaign Name */}
      <div className="form-group">
        <label>Campaign Name</label>
        <input
          type="text"
          name="campaignName"
          placeholder="e.g. Summer Sale Campaign"
          value={ad.campaignName}
          onChange={handleChange}
        />
        {ad.campaignName && ad.campaignName.length < 3 && (
          <p className="error-text">
            Campaign name must be at least 3 characters
          </p>
        )}
      </div>

      {/* Objective */}
      <div className="form-group">
        <label>Objective</label>
        <select
          name="objective"
          value={ad.objective}
          onChange={handleChange}
        >
          <option value="">Select an objective</option>
          <option value="Traffic">Traffic</option>
          <option value="Conversions">Conversions</option>
        </select>
      </div>

    {/* Ad Text */}
<div className="form-group">
  <label>Ad Text</label>
  <textarea
    name="adText"
    placeholder="Write a short description (max 100 characters)"
    value={ad.adText}
    onChange={handleChange}
  />
  <small>{ad.adText.length}/100 characters</small>

  {/* 🔴 Inline error: required */}
  {!ad.adText && (
    <p className="error-text">Ad text is required.</p>
  )}

  {/* 🔴 Inline error: max length */}
  {ad.adText.length > 100 && (
    <p className="error-text">
      Ad text cannot exceed 100 characters.
    </p>
  )}
</div>


      {/* CTA */}
      <div className="form-group">
        <label>Call To Action</label>
        <input
          type="text"
          name="cta"
          placeholder="e.g. Learn More"
          value={ad.cta}
          onChange={handleChange}
        />
        {!ad.cta && <p className="error-text">CTA is required</p>}
      </div>

      {/* Music Selection */}
      <MusicSelector />

      {/* Submit */}
      <button className="primary-btn" onClick={handleSubmit}>
        Submit Ad
      </button>
    </div>
  );
}

export default AdForm;
