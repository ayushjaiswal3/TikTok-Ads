import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./adSlice";
import { setError, clearError } from "../errors/errorSlice";

function MusicSelector() {
  const dispatch = useDispatch();
  const { objective, musicOption, musicId } = useSelector(
    (state) => state.ad
  );

  const handleOptionChange = (option) => {
    dispatch(updateField({ field: "musicOption", value: option }));
    dispatch(updateField({ field: "musicId", value: "" }));
    dispatch(clearError());
  };

 const validateMusic = (id) => {
  if (!id || !id.toLowerCase().startsWith("music_")) {
    dispatch(
      setError("Invalid music ID. Please enter a valid music ID.")
    );
    return false;
  }
  dispatch(clearError());
  return true;
};


  return (
    <div className="music-card">
      <h3>Music Selection</h3>
      <p className="section-desc">
        Choose how you want to add background music to your ad creative.
      </p>

      {/* EXISTING MUSIC */}
      <div className={`music-option ${musicOption === "existing" ? "selected" : ""}`}>
        <div className="music-radio">
          <input
            type="radio"
            checked={musicOption === "existing"}
            onChange={() => handleOptionChange("existing")}
          />
          <span>Use Existing Music ID</span>
        </div>

        {musicOption === "existing" && (
          <input
            type="text"
            className="music-input"
            placeholder="e.g. MUSIC_123"
            value={musicId}
            onChange={(e) =>
              dispatch(updateField({ field: "musicId", value: e.target.value }))
            }
            onBlur={() => validateMusic(musicId)}
          />
        )}
      </div>

      {/* UPLOAD MUSIC */}
      <div className={`music-option ${musicOption === "upload" ? "selected" : ""}`}>
        <div className="music-radio">
          <input
            type="radio"
            checked={musicOption === "upload"}
            onChange={() => handleOptionChange("upload")}
          />
          <span>Upload Custom Music</span>
        </div>

        {musicOption === "upload" && (
          <button
            className="secondary-btn"
            onClick={() => {
              const generatedId = "MUSIC_" + Math.floor(Math.random() * 1000);
              dispatch(updateField({ field: "musicId", value: generatedId }));
              validateMusic(generatedId);
            }}
          >
            🎵 Simulate Upload
          </button>
        )}
      </div>

      {/* NO MUSIC */}
      <div
        className={`music-option ${musicOption === "none" ? "selected" : ""} ${
          objective === "Conversions" ? "disabled" : ""
        }`}
      >
        <div className="music-radio">
          <input
            type="radio"
            checked={musicOption === "none"}
            disabled={objective === "Conversions"}
            onChange={() => {
              if (objective === "Conversions") {
                dispatch(
                  setError("Music is required for Conversion campaigns.")
                );
                return;
              }
              handleOptionChange("none");
            }}
          />
          <span>No Music</span>
        </div>

        {musicOption === "none" && objective === "Traffic" && (
          <p className="success-text">✔ Allowed for Traffic campaigns</p>
        )}
      </div>
    </div>
  );
}

export default MusicSelector;
