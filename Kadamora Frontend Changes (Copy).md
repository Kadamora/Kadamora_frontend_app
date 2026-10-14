Kadamora API · security update · branch app

# Frontend changes for the security update

The backend went through a security hardening pass. Most of it is invisible to the frontend, but the changes below affect the web app (and the mobile app, if it uses the same endpoints). Each item says what changed on the API and what to do. Start with the first section: those break things if they are not handled before the backend is deployed.

Base URL **/api/v1** Response envelope unchanged: **{ success, statusCode, message, data, errors }** Swagger: **/docs** on staging

0 of 0 done

[Breaking](#breaking) [Behaviour](#behaviour) [Responses](#responses) [Validation](#validation) [New endpoints](#new) [Test plan](#test)

Breaking fails until handled Behaviour works, but the UX needs updating Validation new 400s for bad input New new endpoint to use

## Must handle before the backend deploys

These change how existing screens work. Ship the frontend side together with the backend release.

[x]

Breaking

### Access tokens now expire after 15 minutes

every authenticated request · POST /auth/refresh

Access tokens used to last 7 days. They now last about 15 minutes. Refresh tokens are **single use**: each call to `/auth/refresh` returns a new refresh token and revokes the old one.

What to do

- When a request returns `401` with `message: "Token expired"`, call `POST /auth/refresh` with `{ refreshToken }`, save **both** new tokens, and retry the request once.
- Allow only one refresh at a time. If three requests fail together and each refreshes with the same token, the second and third fail (the token was already rotated) and the user is logged out.
- If refresh itself returns `401`, clear the session and go to login.
- Only refresh on `"Token expired"`. Other 401s (wrong password on change-password, wrong code on verify) are real errors to show.
- Optional: `accessTokenExpiresAt` comes back with every token pair if you prefer refreshing a minute before expiry.

```
// axios example: one shared refresh, retry once
let refreshing = null;

api.interceptors.response.use((r) => r, async (error) => {
  const original = error.config;
  const expired = error.response?.status === 401
    && error.response?.data?.message === 'Token expired';
  if (!expired || original._retried) throw error;
  original._retried = true;

  refreshing ??= api.post('/auth/refresh', { refreshToken: getRefreshToken() })
    .then(({ data }) => {
      saveTokens(data.data.accessToken, data.data.refreshToken); // store BOTH
      return data.data.accessToken;
    })
    .finally(() => { refreshing = null; });

  try {
    const token = await refreshing;
    original.headers.Authorization = `Bearer ${token}`;
    return api(original);
  } catch (e) {
    logout();          // refresh token invalid or revoked
    throw e;
  }
});
```

[x]

Breaking

### Socket.IO must reconnect with a fresh token

Socket.IO handshake

Short-lived tokens mean a socket that reconnects with the token it was created with will be rejected after 15 minutes. Disabled or deleted accounts are also rejected. Sockets now only accept connections from the allowed web origins.

What to do

- Pass the token as a function so every reconnect reads the current token.
- On a `connect_error` whose message starts with `Authentication error`, refresh the token, then reconnect.

```
const socket = io(API_ORIGIN, {
  auth: (cb) => cb({ token: getAccessToken() }), // read on every (re)connect
});

socket.on('connect_error', async (err) => {
  if (err.message.startsWith('Authentication error')) {
    await refreshTokens();   // same single-flight refresh as above
    socket.connect();
  }
});
```

[x]

Breaking

### Email verification needs the code, which is now 6 characters

POST /auth/verify-account · POST /auth/resend-verification

`token` is now required on `/auth/verify-account` (before, sending only the email worked, which was a security hole). Codes are 6 characters, letters and digits, case-insensitive, valid for 1 hour. A wrong or expired code returns `401` (it used to be `404`). Codes sent before the deploy no longer work.

What to do

- Make the code input accept 6 characters (letters and digits). Do not force numeric keyboards.
- Always send `{ email, token }`.
- Show the `401` message and offer "Resend code".
- `/auth/resend-verification` body must be exactly `{ email }`; extra fields return `400`.

[x]

Breaking

### Signup always returns 201 and no user id

POST /auth/signup

To stop people discovering who has an account, signup returns the same `201` whether the email (or phone number) is new or already registered. There is no `409` any more, and `data.uid` is gone. Existing account owners get an email telling them someone tried to sign up.

What to do

- After a 201, go to the "enter your code" screen and show `data.message`.
- Remove any "account already exists" handling and anything that reads `data.uid`.
- Add a "Didn't get a code? Resend" link on that screen.

[ ]

Breaking

### Agent identity documents use a new private upload

POST /upload/kyc → POST /agents/upload-documents

Government ID, business certificate and proof of address are now stored privately. `/agents/upload-documents` no longer accepts URLs. It only accepts references returned by the new `POST /upload/kyc`, uploaded by the same user.

What to do

- Upload KYC files with `POST /upload/kyc` (multipart field `files`, up to 5 files, PNG/JPEG/WebP/PDF, 10MB each). Do not use `POST /upload` for these.
- Send the returned `data.refs` in the matching array: `governmentId` (1 to 5 required), `businessCertificate`, `proofOfAddress` (up to 5 each). Upload each category separately so you know which refs go where.
- Document links in `GET /agents/profile`, `GET /agents/settings/overview` and the admin agent endpoints are now signed URLs that **expire after 10 minutes**. Do not store or cache them; refetch the profile when the user opens a document.
- If an **approved** agent replaces documents, their status goes back to `under_review` and their listings are hidden until an admin re-approves. Warn them before they submit.

```
const fd = new FormData();
idFiles.forEach((f) => fd.append('files', f));
const up = await api.post('/upload/kyc', fd);        // { data: { refs: [...] } }

await api.post('/agents/upload-documents', {
  governmentId: up.data.data.refs,
});
```

[x]

Breaking

### Tenant invitation links carry a token, not a tenant id

/verify-acceptance/:token → PUT /tenants/accept-invitation/:token

Invitation emails now link to `/verify-acceptance/<token>`, where the token is a long signed string (it contains dots) that expires after 14 days. The API rejects raw tenant ids. Links sent before the deploy stop working.

What to do

- Make sure the `/verify-acceptance/:param` route accepts any long string. Remove UUID checks on it.
- Pass it through unchanged: `PUT /tenants/accept-invitation/${encodeURIComponent(token)}`.
- On `400` ("invalid or has expired"), tell the user to ask their agent to re-send the invite.
- Mobile: update the deep link handler the same way.

[x]

Breaking

### Changing bank details needs the current password

PATCH /management/update-settings · PATCH /management/update-settings/:propertyId

If the body contains `bankName`, `accountNumber` or `accountName`, it must also contain `currentPassword`, or the API returns `401`. The owner gets an email when bank details change. Other settings (notification toggles) do not need the password.

What to do

- Only send bank fields when the user actually changed them. If the settings form always posts every field, every toggle change will now ask for a password.
- When bank fields changed, ask for the current password and send it as `currentPassword`.
- `accountNumber` must be 6 to 20 digits; `bankName` up to 100 characters; `accountName` up to 150.

[x]

Breaking

### Only approved agents can list properties or invite tenants

POST /listings/agent · PUT /listings/update/:id · POST /management/create-property · PUT /management/update-property/:id · POST /tenants/invite-tenant/:propertyId

These return `403` unless the agent's status is `approved`. Messages: `"Only verified agents can perform this action"` (not an agent) or `"Your agent account is not yet verified. Please wait for admin approval."` (pending, under review, rejected or suspended). Listings of agents who are not approved are hidden from the public.

What to do

- Read the agent status from `GET /agents/profile` and disable or hide these actions until it is `approved`, with a short explanation and a link to upload documents.
- Show the 403 message if the action is attempted anyway.

[x]

Breaking

### Each web origin must be on the API's allow-list

all browser requests and sockets

In production the API only answers browsers from origins listed in its `CORS_ORIGINS` setting. A domain not on the list gets CORS errors on every request. Mobile apps are not affected.

What to do

- Send the backend owner every origin the web app runs on, per environment (for example `https://kadamora.com`, `https://www.kadamora.com`, the staging domain). Exact scheme and host, no trailing slash.
- JSON request bodies are limited to 1MB. Do not send images as base64 in JSON; use the upload endpoints.

[x]

Breaking

### Contact form must send a source

POST /contact

`source` is now a required field on the contact form: a non-empty string, at most 100 characters. It records where the message came from. Without it the API returns `400` with a field error under `errors.source`, so every contact form submission fails until the frontend sends it.

What to do

- Add `source` to every place that posts to `/contact` (contact page, footer form, mobile app, and any other).
- Set it in code, not from user input. Use one fixed lowercase value per form, for example `contact-page` or `mobile-app`, and agree the list with the backend owner so reports group cleanly.
- Ship this before or together with the backend release.

```
await api.post('/contact', {
  fullName, email, subject, message,
  source: 'contact-page',   // fixed per form, never from user input
});
```

## Behaviour changes to reflect in the UI

Nothing breaks outright, but screens that branch on old messages or status codes will show the wrong thing.

[x]

Behaviour

### Login, forgot password and resend give the same answer for unknown emails

POST /auth/login · POST /auth/forgot-password · POST /auth/resend-verification

- **Login**: an unknown email now returns `401 "Invalid credentials"`, same as a wrong password (it used to say "User not found"). A correct password on a disabled or inactive account returns `403` with a "contact support" message.
- **Forgot password** and **resend verification** always return `200` with a generic message. There is no `404` for unknown emails and no `400` "already verified".

What to do

- Show `message` from the response as is. Remove branches on "User not found" or on 404 from these endpoints.
- After forgot-password, always move to the "enter code" screen.

[x]

Behaviour

### Changing or resetting the password logs out every device

POST /auth/change-password · POST /agents/settings/change-password · POST /auth/reset-password

All refresh tokens are revoked, including the current device's. The access token keeps working until it expires, then refresh fails. The user also gets an email.

What to do

- After a successful change, clear the stored tokens and send the user to login with "Password changed. Please log in again."

[x]

Behaviour

### Rate limits return 429

all endpoints

Any endpoint can return `429 "Too many requests. Please try again later."`. The `RateLimit` response header says when it resets. Limits users can realistically hit:

| Endpoint | Limit |
| --- | --- |
| POST /auth/login | 10 failed attempts per email per IP in 15 min (successful logins don't count) |
| verify-account · verify-otp · reset-password | 5 wrong codes per email per IP in 15 min |
| forgot-password · resend-verification · signup | 5 per email in 15 min |
| POST /messages/send · timeline comments | 20 per minute per user |
| POST /upload · /upload/video · /upload/kyc | 30 per 15 min per user |
| POST /contact · accept-invitation | 10 per hour per IP |
| everything | 300 per minute per IP |

What to do

- Handle 429 globally: show the message, do not auto-retry in a loop.
- On code-entry screens, disable submit briefly after a wrong code.

[ ]

Behaviour

### Inactive accounts get 403 on any request

all authenticated endpoints

If an admin disables, deactivates or deletes an account, every request returns `403` with a "contact support at support@kadamora.com" message.

What to do

- On a 403 whose message mentions contacting support, log the user out and show the message on the login screen.

[x]

Behaviour

### Server errors return generic messages

all endpoints

Unexpected failures now return messages like `"Login failed. Please try again later."` instead of internal details. Validation errors still come back as `400` with field messages in `errors` (for example `{ "email": ["Please enter a valid email address"] }`).

What to do

- Do not parse `message` for technical strings; show it.
- Map `errors` keys to form fields where possible.

[ ]

Behaviour

### Subscriptions only accept billing periods the plan is sold at

POST /subscriptions/subscribe · POST /subscriptions/initialize-payment

`frequency` must be `MONTHLY`, `QUARTERLY` or `YEARLY`, and `planId` must be a UUID. If the plan has no price for that period (many plans have no quarterly price), the API returns `400 "This plan is not available for the selected billing frequency"`. An expired subscription now only gives free-plan limits.

What to do

- On the plans screen, only show a billing period when the plan has a price for it (`monthlyPrice`, `quarterlyPrice`, `yearlyPrice`).
- Show the expiry date and a "Renew" prompt when `endDate` has passed.

[ ]

Behaviour

### Messaging rejects self-messages and inactive recipients

POST /messages/send

Sending to yourself returns `400`. Sending to a deleted, disabled or unverified user returns `404 "Sender or recipient not found"`. `content` is limited to 5,000 characters.

What to do

- Hide "Message" on your own listings and profile, and add a 5,000-character counter.

[x]

## Response shape changes

Fields added to or removed from responses. Check any screen that reads them.

Behaviour

### Public listings return a smaller agent object

GET /listings/all · GET /listings/:id

`agent` used to be the full database record. It is now:

```
agent: {
  id, agencyCompanyName, position, yearsOfExperience, areaOfOperation,
  bio, website, linkedinProfile,
  isVerified,              // true when the agent is approved
  user: { id }             // in /listings/all
  user: { id, firstName, lastName, imgUrl, email, phoneNumber } // in /listings/:id
}
```

Gone: `status`, `registrationLicenseNumber`, timestamps, and on the user `role`, `status`, `lastLoginAt`, notification settings. Listings of agents who are not approved no longer appear in `/listings/all`, and `/listings/:id` returns `404 "Property is currently unavailable"` for them (the owning agent and admins still see them).

What to do

- Search the codebase for `listing.agent.` and `agent.user.` and check every field used is still in the list above.
- Use `agent.isVerified` for a "Verified agent" badge.

[ ]

Behaviour

### Marketplace listings return a smaller provider object

GET /services/all · POST /services/onboard

```
provider: {
  id, businessName, yearsOfExperience, bio, website,
  state: { id, name },
  user: { id, firstName, lastName, imgUrl, email, phoneNumber }
}
```

Only listings from approved providers are returned.

What to do

- Check marketplace cards and the onboarding success screen only use these fields.

[ ]

Behaviour

### Paginated lists now include a pagination object, and limit is capped at 100

GET /listings/all · GET /services/all · GET /support-tickets · and other paged lists

Paged responses now include a top-level `pagination: { total, page, limit, totalPages }` next to `data`. It was computed before but never sent. `limit` must be 1 to 100 and `page` at least 1; larger values return `400` on validated lists and are clamped on `/notifications` and `/listings/agent/listings`.

What to do

- Use `pagination.totalPages` for pagers and infinite scroll instead of guessing from page size.
- Never request more than `limit=100`. If a screen loads "everything", page through instead.

[ ]

Behaviour

### Payment verification failures no longer include Paystack data

POST /wallet/deposit/verify · GET /subscriptions/verify-payment

A failed verification returns `400 "Payment verification failed"` without the Paystack payload. You can only verify your own references (someone else's returns `404`). Verifying twice is safe and returns `200 "Transaction already verified"`.

What to do

- Remove UI that reads Paystack fields from the error body.
- Treat "already verified" as success on the payment return page.

[ ]

Behaviour

### A user can now have more than one role

POST /auth/login · GET /auth/account · PUT /auth/account · message conversations · admin user endpoints · access token

Users now hold a list of roles instead of one. Registering as an agent or onboarding as a service provider **adds** that role and keeps the existing ones, so one account can be, for example, both an agent and a service provider. Possible values: `user`, `agent`, `service_provider`, `admin`. Every user has at least one role.

Responses that included `role` now also include `roles`. `role` is still sent, so nothing breaks today, but it now holds only the user's highest role (admin, then agent, then service_provider, then user) and will be removed in a later release. The access token carries `roles` as well.

```
user: {
  id, email, firstName, lastName, ...
  roles: ['user', 'agent', 'service_provider'],  // use this
  role: 'agent',                                 // deprecated: highest role only
}
```

What to do

- Replace checks like `user.role === 'agent'` with `user.roles.includes('agent')`. A check on `role` gives the wrong answer for anyone with two roles: an agent who is also a provider has `role: 'agent'`, so a provider check on `role` misses them.
- Show the menus and dashboards for every role the user holds, not just one, and let them switch between, for example, the agent and provider views.
- After agent registration or provider onboarding, refetch `GET /auth/account` (or refresh the token) to pick up the new role. The roles in the current access token only update when a new token is issued.
- Stop reading `role` in new code.

## New validation rules

These endpoints now reject input they used to accept. Match the rules in the forms so users see the problem before submitting.

[ ]

Validation

### Check each form against these rules

| Endpoint | Rule |
| --- | --- |
| PUT /auth/account | `imgUrl` must be a full `https://` URL (max 2048). An empty string is rejected: omit the field instead. |
| POST /upload | PNG, JPEG, WebP, GIF, PDF, DOC/DOCX, PPT/PPTX, MP4, MPEG, MOV, WebM, AVI. Images and documents max **10MB**, videos 50MB, max 10 files. File content must match its type (a renamed file is rejected). SVG is not allowed. |
| POST /upload/video | One video, max 50MB, content checked. |
| timeline create-post / -announcement / -event | Images: PNG, JPEG, WebP or GIF, max **5MB** each (was 10MB, any image type), max 10. |
| POST /documents/:propertyId | `title` (max 255), `category` one of Legal, Property, Maintenance, Personal, Financial; `fileUrl` full URL; optional `status` Active, Expired, Pending, Approved, Issued. |
| POST /inspections/:propertyId | `type` Virtual, Physical or Hybrid; `scheduledDate` ISO date (`2026-11-02`); `scheduledTime` (max 50); `hostingLink` full URL if sent. |
| POST /maintenance/:propertyId | `title` (max 255) and `description` (max 5000) required; `priority` Low, Medium or High; `imageUrls` up to 20 URLs. |
| PUT /maintenance/:id/assign | `scheduledDate` ISO date; `serviceCost` number ≥ 0. |
| PATCH …/status (documents, inspections, maintenance) | Exact enum values with this casing, e.g. `"In Progress"`, not `"in_progress"`. |
| POST /wallet/deposit/init | `amount` 100 to 10,000,000, at most 2 decimal places. |
| POST /tenants/record-payment | `amountPaid` 0.01 to 1,000,000,000, at most 2 decimals. |
| tenant invite / update rent | `amount` at most 2 decimals, max 1,000,000,000. |
| GET /payments/resolve-account | `accountNumber` exactly 10 digits; `bankCode` 1 to 10 letters or digits. |
| POST /support-tickets | `agentId` must be a UUID; subject max 200; description max 5000. |
| POST /support-tickets/:id/messages | `content` max 5000; `attachments` up to 10 `https` URLs. |
| GET /support-tickets | Only `status`, `priority`, `category`, `page`, `limit` (≤100). Any other query parameter returns 400. |
| timeline comments | `content` max 2000; `parentCommentId` must be a UUID. |
| GET /services/all | `search` max 100 characters; `page`/`limit` integers (limit ≤100). |
| GET /listings/all | `location` up to 20 values, each max 100 characters. |
| POST /contact | `source` required, non-empty, max 100 characters (see the Breaking item above). |
| admin: users/:id/status | `status` one of active, inactive, disabled, deleted. |
| admin: GET /admin/admin-agents | `?status` one of pending, under_review, approved, rejected, suspended; no other query params. |

Unknown body fields are rejected with 400 on most endpoints that have a schema (they are silently ignored on documents, inspections and maintenance). Send only the documented fields.

## New endpoints

[ ]

New

### Delete account for every user

DELETE /auth/account { password }

Any user (tenant, regular user, agent, provider) can now delete their account. It requires the current password, logs out every device, removes personal data and private documents, and takes listings offline. `POST /agents/settings/delete-account` still works and does the same thing.

- `401`: wrong password.
- `400`: the wallet still has a balance; the user must contact support first.

What to do

- Add "Delete account" to settings for **all** users, with a password confirmation step and a clear warning. Apple and Google require this in apps that allow sign-up.
- On success, clear the session and show a confirmation.

[ ]

New

### Private document upload

POST /upload/kyc

Covered in the KYC item above. Use it only for identity documents; keep using `POST /upload` for listing photos, videos and property documents.

## Test plan against staging

Run these once the backend branch is on staging. Each one exercises a change above.

[ ]

Sign up with a new email, enter the 6-character code, land logged in.

[ ]

Sign up again with the same email: same success screen, and the inbox gets "Someone tried to sign up with your email".

[ ]

Leave the app open for 20 minutes, then click around: requests keep working (silent refresh), and real-time messages still arrive.

[ ]

Open three tabs, wait past expiry, reload all three: none of them logs out.

[ ]

Change password: you are sent to login, and another logged-in device is logged out within 15 minutes.

[ ]

As a new agent, upload KYC documents through the new flow, then open one from the profile (link works), wait 10 minutes, and check the old link no longer opens.

[ ]

As a pending agent, try to create a listing: the action is disabled or shows the "not yet verified" message.

[ ]

Invite a tenant, open the email link, accept: works. Edit the token in the URL: shows the "invalid or expired" message.

[ ]

Change only a notification toggle in property settings: no password prompt. Change the account number: password prompt, and an email arrives.

[ ]

Enter a wrong verification code 6 times: a friendly "too many attempts" message, no crash.

[ ]

Browse listings and the marketplace: cards, agent and provider details all render; pagination works.

[ ]

Make a test deposit and a subscription payment: the return page shows success, and refreshing it does not double-charge or error.

[ ]

Delete a test account: logged out, cannot log back in, its listings are gone from search.

[ ]

Submit the contact form from each place it appears: each succeeds, and the admin message list shows the expected `source` for each.

[ ]

Register a test account as an agent, then onboard it as a service provider: `GET /auth/account` shows both roles in `roles`, and both the agent and provider screens are reachable.

Source: backend branch app (commit 90a7d848). Full API reference in Swagger at /docs on staging.

Checkbox progress is saved in this browser only.