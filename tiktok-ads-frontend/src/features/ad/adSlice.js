import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campaignName: "",
  objective: "",
  adText: "",
  cta: "",
  musicOption: "",
  musicId: "",
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetAd() {
      return initialState;
    },
  },
});

export const { updateField, resetAd } = adSlice.actions;
export default adSlice.reducer;
