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



