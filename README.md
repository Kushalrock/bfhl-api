# 📦 BFHL API – Bajaj Finserv Test Assessment

A **Node.js + Express** REST API built for the **Bajaj Finserv Hiring Assessment**.
Implements the **/bfhl** endpoint with advanced request processing, structured logging, and production-ready middleware.

---

## 🚀 Features

* **Core API**

  * `POST /bfhl` → Process an array of strings
  * `GET /` → Health check
  * 404 catch-all → `"Only POST route /bfhl is available"`
* **Data Processing**

  * Odd & Even numbers (as strings)
  * Alphabets (converted to uppercase)
  * Special characters (non-alphanumeric, alphanum mixes, floats, etc.)
  * Numeric sum (string)
  * Concatenated string:

    * Collect all alphabetic characters
    * Reverse order
    * Alternate casing (Upper / lower)
  * `user_id` generated as `{full_name_ddmmyyyy}` (lowercase, underscores)
* **Robust Middleware**

  * `helmet` → Secure HTTP headers
  * `cors` → Cross-origin requests
  * `compression` → Gzip responses
  * `express-rate-limit` → Prevent abuse (120 req/min)
* **Logging**

  * **Pretty console logs** (colored, human-friendly)
  * **Access logs** (`logs/access-YYYY-MM-DD.log`)
  * **Error logs** (`logs/error-YYYY-MM-DD.log`)
  * Logs rotate daily, JSON structured for analysis
* **Error Handling**

  * Centralized error middleware
  * Logs both to console & files
  * Safe API error responses (`500 Internal Server Error`)
* **Deployment-ready**

  * Config via `.env`
  * Works with **Railway**, **Render**, **Vercel**, or any Node host

---

## 🛠 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Security Middleware**: Helmet, CORS, Compression, Rate-limit
* **Logging**: Winston + Daily Rotate
* **Dev Tools**: Nodemon
* **Deployment**: Railway / Render / Vercel

---

## 📂 Folder Structure

```
bfhl-api/
├─ src/
│  ├─ index.js       # Express server & routes
│  ├─ logic.js       # Data processing functions
│  └─ logger.js      # Winston logger setup (console + file rotation)
│
├─ logs/             # Auto-created: access + error logs
│
├─ .env.example      # Example environment config
├─ package.json
├─ .gitignore
└─ README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/bfhl-api.git
cd bfhl-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` → `.env` and update with your details:

```env
PORT=3000
FULL_NAME=John Doe
DOB_DDMMYYYY=17091999
EMAIL=john@xyz.com
ROLL_NUMBER=ABCD123
LOG_LEVEL=debug
```

### 4. Run locally

```bash
npm run dev
```

Server will be available at →
`http://localhost:3000`

---

## 📡 API Usage

### 🔹 Health Check

**GET /**

```json
{ "status": "ok" }
```

---

### 🔹 Process Data

**POST /bfhl**

#### Request

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

#### Response

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

---

### 🔹 Invalid Payload

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": "not-an-array"}'
```

Response:

```json
{
  "is_success": false,
  "error": "Invalid payload: 'data' must be an array."
}
```

---

### 🔹 Unhandled Route

```bash
curl http://localhost:3000/anything
```

Response:

```json
{
  "is_success": false,
  "message": "Only POST route /bfhl is available"
}
```

---

## 📝 Logging

* Console → Pretty, colorized logs for dev
* `logs/access-YYYY-MM-DD.log` → Every request (JSON structured)
* `logs/error-YYYY-MM-DD.log` → All errors & exceptions (JSON structured)

Example **console log**:

```
2025-08-29 12:34:56 info: Request processed {"method":"POST","url":"/bfhl","status":200,"duration_ms":12}
```

Example **error log entry**:

```json
{
  "message": "Unhandled error",
  "stack": "...",
  "path": "/bfhl",
  "body": { "data": null },
  "timestamp": "2025-08-29T12:34:56.123Z"
}
```

---

## 🚀 Deployment

1. Push this repo to GitHub
2. Deploy to your choice:

   * [Railway](https://railway.app)
   * [Render](https://render.com)
   * [Vercel](https://vercel.com)
3. Configure `.env` variables in host dashboard

Example production endpoint:
`https://<your-app>.railway.app/bfhl`

---