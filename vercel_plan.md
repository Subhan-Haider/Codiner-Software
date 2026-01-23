# Vercel Integration Plan: "One-Click Publish"

## 1. Architecture Overview (ASCII)

```ascii
+---------------------+        +------------------------+        +--------------------------+
|  Electron / Tauri   |        |  Auth Proxy Service    |        |       Vercel API         |
|  (Desktop App)      |        |  (Cloud Function)      |        |      (Request/Resp)      |
+---------------------+        +------------------------+        +--------------------------+
|                     |        |                        |        |                          |
| 1. Click "Connect"  |------->|                        |        |                          |
|    Open Browser     |        |                        |        |                          |
|    (OAuth Start)    |------->| 2. Redirect to Vercel  |------->| 3. User Approves App     |
|                     |        |    (with Client ID)    |        |                          |
| 4. Custom URI       |<-------|                        |<-------|                          |
|    myapp://callback |        | 5. Exchange Code       |        |                          |
|    ?code=123        |------->|    for Token           |------->|                          |
|                     |        |    (keeps secret safe) |        |                          |
| 6. Save Token       |<-------|                        |<-------|                          |
|    (Encrypted)      |        |                        |        |                          |
|                     |        |                        |        |                          |
| 7. Click "Publish"  |        |                        |        |                          |
|    (Read Files)     |        |                        |        |                          |
|    (Hash Content)   |        |                        |        |                          |
|                     |----------------------------------------->| 8. POST /v13/deployments |
|                     |                                          |    (File Manifest)       |
|                     |<-----------------------------------------|    Returns "missing"     |
|                     |----------------------------------------->| 9. Upload missing files  |
|                     |----------------------------------------->| 10. POST /v13/deployments|
|                     |                                          |     (Trigger Build)      |
+---------------------+        +------------------------+        +--------------------------+
```

## 2. Authentication (OAuth 2.0)

Since Vercel requires a Client Secret that cannot be safely stored in a desktop application, we must use a **Middleman Auth Service**.

### Step-by-Step Flow:
1.  **User Clicks "Connect Vercel"**:
    *   App opens system browser to: `https://auth.codiner.online/api/auth/vercel/login` (Example hosting).
2.  **Redirect to Vercel**:
    *   The service redirects to `https://vercel.com/oauth/authorize?client_id=...&state=...`.
3.  **User Grants Permission**:
    *   User logs into Vercel and clicks "Allow".
4.  **Callback**:
    *   Vercel redirects back to `https://auth.codiner.online/api/auth/vercel/callback?code=...`.
5.  **Token Exchange**:
    *   The cloud service takes the `code`, sends it + `client_secret` to `https://api.vercel.com/v2/oauth/access_token`.
    *   Vercel returns `access_token` and `team_id`.
6.  **Redirect to App**:
    *   The cloud service redirects the browser to `codiner-app://vercel-auth?token=ENCRYPTED_TOKEN`.
    *   *Note*: Ideally, pass a temporary code, and have the app fetch the token, but generic OAuth often just passes the token if the custom scheme is secure enough for the context. Better: The service shows a "Success" page and the app polls, or usage of deep links with separate ephemeral key exchange.
    *   *Simplified V1*: Redirect with token in fragment (risky if history logged) or query param.

### Backend API Design (Node.js/Next.js Example)

```typescript
// GET /api/auth/vercel/login
export default function login(req, res) {
  const state = generateState();
  res.redirect(`https://vercel.com/oauth/authorize?client_id=${ID}&state=${state}`);
}

// GET /api/auth/vercel/callback
export default async function callback(req, res) {
  const { code } = req.query;
  const tokenRes = await axios.post('https://api.vercel.com/v2/oauth/access_token', {
    client_id: ID,
    client_secret: SECRET,
    code: code,
    redirect_uri: REDIRECT_URI
  });
  
  const token = tokenRes.data.access_token;
  // Redirect to custom protocol
  res.redirect(`codiner://auth-success?token=${token}&teamId=${tokenRes.data.team_id}`);
}
```

## 3. Deployment Flow (No GitHub)

We will use the **FileSystem API** or **Deployments API with file uploads**.

1.  **Prepare**:
    *   User clicks "Publish".
    *   App scans the output folder (e.g., `dist/` or root).
    *   Generates `files` map: path -> sha1 hash.
2.  **Pre-flight Check**:
    *   `POST https://api.vercel.com/v13/deployments`
    *   Body:
        ```json
        {
          "name": "my-site",
          "files": [
            { "file": "index.html", "sha": "e5c...", "size": 1024 },
            { "file": "style.css", "sha": "b2a...", "size": 500 }
          ],
          "projectSettings": { "framework": null }
        }
        ```
3.  **Handle Missing Files**:
    *   Vercel responds with error (if files missing) or list of files to upload.
    *   If response is 200, deployment started.
    *   If response indicates missing files:
        *   Loop through missing files.
        *   `POST https://api.vercel.com/v2/files` (Content-Type: application/octet-stream, x-vercel-digest: sha).
4.  **Finalize**:
    *   Retry the Deployment POST request.
5.  **Monitor**:
    *   Poll `GET /v13/deployments/{id}` until `readyState` is `READY` or `ERROR`.

## 4. Frontend Logic

*   **State Management**:
    *   `idle`: Show "Publish" button.
    *   `building`: "Building..." (Running local build script).
    *   `hashing`: "Preparing Files...".
    *   `uploading`: "Uploading Assets (4/10)...".
    *   `deploying`: "Deploying to Edge...".
    *   `success`: Show "Live URL" and confetti.
*   **Deep Link Handler**:
    *   Register `app.setAsDefaultProtocolClient('codiner')`.
    *   Listen for `open-url` event to capture tokens.

## 5. Security Checklist

*   [ ] **Client Secret**: Never enable "Native App" flow that exposes secret. Use Proxy.
*   [ ] **Token Storage**: Use `keytar` (node-keytar) or Electron's `safeStorage` API to encrypt tokens on disk.
*   [ ] **State Validation**: Ensure OAuth `state` parameter prevents CSRF (if using browser interaction).
*   [ ] **File Safety**: Ensure `.env` files are NOT uploaded by default unless explicitly allowed.
*   [ ] **Protocol Handlers**: Validate the payload receiving from `codiner://` to avoid command injection.
