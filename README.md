# BFHL API – Bajaj Finserv Test Assessment

This repository contains a **test assessment project for Bajaj Finserv**.  
It implements a REST API in **Node.js + Express**, following the given requirements.

---

## 🚀 Features
- REST API with **POST /bfhl**
- Input: JSON array of strings
- Output:
  - `is_success` (status flag)
  - `user_id` (`{full_name_ddmmyyyy}`, lowercase, underscores)
  - `email` (from environment variables)
  - `roll_number` (from environment variables)
  - Odd numbers (strings)
  - Even numbers (strings)
  - Alphabets (uppercased)
  - Special characters
  - Sum of numeric values (string)
  - Concatenated alphabet characters (reversed, alternating caps)
- Error handling and validation included
- Middleware for security & scalability:
  - `helmet`, `cors`, `compression`, `express-rate-limit`, `pino-http`

---

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: Helmet, CORS, Compression, Rate limiting, Pino
- **Deployment Options**: Railway / Render / Vercel

---

## 📦 Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/bfhl-api.git
cd bfhl-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Copy the provided `.env.example` file and fill in your details:

```bash
cp .env.example .env
```

#### `.env.example`

```env
# Server
PORT=3000

# User info
FULL_NAME=John Doe
DOB_DDMMYYYY=17091999
EMAIL=john@xyz.com
ROLL_NUMBER=ABCD123
```

Update `.env` with your actual details before running.

### 4. Run locally

```bash
npm run dev
```

API will be available at:
`http://localhost:3000/bfhl`

---

## 📡 API Usage

### Endpoint

`POST /bfhl`

### Request Example

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### Response Example

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

## 📤 Deployment

* Push this repo to GitHub
* Deploy to your preferred host:

  * [Railway](https://railway.app)
  * [Render](https://render.com)
  * [Vercel](https://vercel.com)
* Configure the environment variables from `.env`

Example production endpoint:
`https://<your-app>.railway.app/bfhl`

---

## 📜 License

This project is licensed under a **custom proprietary license**.
Usage is strictly limited to **Bajaj Finserv Limited, its employees, affiliates, and contractors**,
who are granted full rights to use, copy, modify, and commercialize this software.

See [LICENSE](./LICENSE) for details.

```