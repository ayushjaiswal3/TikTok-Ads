export function submitAdApi(adData, token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 🔴 AUTH ERROR: Missing or expired token
      if (!token) {
        reject({
          type: "AUTH",
          message:
            "Your session has expired. Please reconnect your TikTok Ads account.",
        });
        return;
      }

      // 🔴 GEO RESTRICTION: Region not supported
      if (token === "GEO_BLOCKED_TOKEN") {
        reject({
          type: "GEO",
          message:
            "TikTok Ads is not available in your region (403). Please try again from a supported region.",
        });
        return;
      }

      // 🔴 MUSIC ERROR: Invalid existing music ID
      if (
        adData.musicOption === "existing" &&
        adData.musicId &&
        adData.musicId.toUpperCase().startsWith("INVALID")
      ) {
        reject({
          type: "MUSIC",
          message:
            "The provided Music ID could not be validated. Please check the ID or choose a different music option.",
        });
        return;
      }

      // 🔴 VALIDATION ERROR: Music required for conversions
      if (
        adData.objective === "Conversions" &&
        adData.musicOption === "none"
      ) {
        reject({
          type: "VALIDATION",
          message:
            "Background music is required for Conversion campaigns. Please select or upload music.",
        });
        return;
      }

      // ✅ SUCCESS
      resolve({ success: true });
    }, 1200);
  });
}
