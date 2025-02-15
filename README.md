This project implements Google Sign-In Authentication using Node.js and MongoDB.

🚀 Setup

1️⃣ Clone & Install

git clone <your-repository-url>
cd <your-project-folder>
npm install

2️⃣ Configure Environment

Create a .env file in the root directory:

PORT=5000
MONGO_URI=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
FRONTEND_URL=<your-frontend-url>

🔑 Google Credentials

1️⃣ Go to Google Cloud Console.
2️⃣ Create/select a project & enable Google Sign-In API.
3️⃣ Generate OAuth 2.0 Client ID. and Client Secret id

