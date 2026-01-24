# Frontend Assignment – TikTok Ads Creative Flow (OAuth Required)

## Overview

This project is a frontend-only React application that simulates a TikTok Ads creative setup flow.

The objective is not to build a full Ads Manager, but to demonstrate how a real-world frontend feature would be implemented with focus on:

- OAuth integration flow (simulated)
- Conditional validation logic
- Handling real-world API failure scenarios
- Clear and user-friendly error communication

The implementation prioritizes clarity, correctness, and reasoning over visual polish.

---

## Application Flow

This is a single-page application where a user can:

1. Connect their TikTok Ads account using OAuth (mocked)
2. Create a minimal ad with creative details
3. Submit the ad while handling validation and API errors gracefully

---

## Tech Stack

- Framework: React  
- Routing: React Router  
- State Management: Redux Toolkit  
- Backend: Not required (API calls are mocked)  
- Styling: Minimal and readability-focused  

---

## How to Run the Project

### Prerequisites
- Node.js (v16 or later)
- npm

### Steps

```bash
git clone https://github.com/ayushjaiswal3/TikTok-Ads.git
cd TikTok-Ads
npm install
npm run dev
```

After starting the development server, open your browser and visit:
```bash
http://localhost:5173
```

## OAuth Setup Steps (Simulated)

This project simulates the **TikTok Ads OAuth Authorization Code flow**.  
No real TikTok Developer account or backend server is required, as the assignment focuses on frontend logic, validation, and error handling.

---

### OAuth Flow Implemented

1. The user clicks **“Connect TikTok Ads Account”** on the home page.

2. The application simulates redirecting the user to TikTok’s OAuth authorization screen.

3. After authorization, TikTok redirects the user back to the application at:

        /callback?code=XXXX

4. The `/callback` route:
- Reads the authorization `code` from the URL
- Simulates exchanging the code for an `access_token`
- Stores the token in Redux and localStorage
- Redirects the user to the protected ad creation page

The `/callback` page is used only for OAuth handling and is never accessed manually.

---

### OAuth Error Handling (Explicitly Implemented)

The application handles all OAuth-related failure cases required by the assignment and displays **human-readable error messages**.

#### Invalid Client ID / Secret
- Simulated using:

       /callback?code=INVALID_CLIENT

- Authentication is stopped
- A clear error message is shown to the user

#### Missing TikTok Ads Permission Scope
- Simulated using:

         /callback?code=NO_ADS_SCOPE

- OAuth succeeds, but Ads permissions are missing
- The user is informed that Ads access is required and prompted to reconnect

#### Expired or Revoked OAuth Token
- Simulated when the token is missing, expired, or revoked
- Protected routes automatically block access
- A global error banner instructs the user to reconnect their account

#### Geo-Restriction (403)
- Simulated using a controlled token value
- Ad submission is blocked
- A clear message explains that TikTok Ads is not available in the user’s region

Raw API error responses are never shown to the user.

---

### How to Test OAuth Error Scenarios

| Scenario | How to Trigger |
|--------|----------------|
| Invalid Client | `/callback?code=INVALID_CLIENT` |
| Missing Ads Scope | `/callback?code=NO_ADS_SCOPE` |
| Expired Token | Remove token from localStorage |
| Revoked Token | Use a revoked token value |
| Geo Restriction | Use a geo-blocked token |

---

### Why OAuth Is Simulated

TikTok Ads APIs require backend services and verified credentials.  
To stay within the scope of this frontend assignment, OAuth and API responses are mocked to demonstrate:

- Correct OAuth flow handling
- Robust error handling
- Clear UX for failures and retries


## Assumptions and Shortcuts Taken

The following assumptions and shortcuts were taken intentionally to stay within the scope of this frontend-focused assignment:

- TikTok Ads APIs are mocked, as real API integration requires backend services and verified credentials.
- OAuth Authorization Code flow is simulated to demonstrate frontend OAuth handling without a backend.
- No real TikTok Developer account or Ads account is required.
- No real media file upload is performed; music upload is simulated using generated IDs.
- Token storage uses Redux and localStorage for simplicity.
- Geo-restriction errors are simulated using controlled token values.
- Error responses are deterministic to ensure predictable behavior during review and demo.
- Visual styling is kept minimal to focus on logic, validation, and error handling.
- Budgeting, bidding, pixel tracking, and full campaign setup are intentionally excluded.

These decisions were made to prioritize clarity, correctness, and reasoning, as emphasized in the assignment instructions.


## Conclusion

This project demonstrates a production-style frontend implementation of a TikTok Ads creative setup flow within the constraints of a frontend-only assignment.

The focus was placed on:
- Correct OAuth flow handling
- Robust validation and conditional logic
- Clear and user-friendly error communication
- Thoughtful handling of real-world edge cases

By intentionally mocking APIs and OAuth behavior, the project highlights frontend decision-making, UX clarity, and error resilience, which were the primary goals of the assignment.

With additional time and backend support, this implementation could be extended to integrate real TikTok Ads APIs, media uploads, and full campaign management features.

