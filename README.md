# 👁️ BlindPass.io - Passwords We Never See

BlindPass is a zero-visibility password sharing platform. We're completely blind to your data - built with military-grade encryption and zero-knowledge architecture. Share credentials that self-destruct after one view, with absolute certainty that we never see them.

## ✨ Features

- **👁️ Complete Blindness**: We never see your passwords - zero visibility, zero knowledge
- **🛡️ Zero-Trust Architecture**: Military-grade AES-256-GCM encryption, keys never touch our servers
- **⏰ Self-Destruct Timer**: Set custom expiration times from 15 minutes to 7 days
- **🔐 No Traces Left**: Once viewed, data is permanently destroyed - no recovery, no logs, nothing
- **🔑 Optional Protection**: Add password protection for double security
- **📤 Export Ready**: Export to LastPass, Bitwarden, or 1Password before viewing
- **🌓 Light & Dark**: Modern UI with theme switching
- **⚡ Instant Destruction**: Built on Vercel Edge with Turso for instant auto-destruct

## 🏗️ Architecture

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive UI
- **React Router** for navigation
- **Web Crypto API** for client-side encryption

### Backend
- **Express.js** API server
- **Turso** (libSQL) database for encrypted data storage
- **Rate limiting** and security headers
- **Automatic cleanup** of expired entries

## 🔐 Security Model

SharePass implements a true zero-knowledge architecture:

1. **Base Key Generation**: A random 256-bit key is generated on the client
2. **Master Key Derivation**: If password-protected, uses PBKDF2 with 100,000 iterations
3. **Client-Side Encryption**: Content encrypted with AES-256-GCM before leaving the device
4. **Key Separation**: Encryption keys never sent to server (stored in URL hash fragment)
5. **Server Storage**: Only encrypted ciphertext stored on server
6. **One-Time Access**: Automatic deletion after retrieval or expiration

**The server cannot decrypt your data. Ever.**

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Turso database account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/JamesWilson19947/BlindPass.git
cd BlindPass
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Turso database**

Create a new database on [Turso](https://turso.tech):
```bash
turso db create sharepass
turso db show sharepass
```

4. **Configure environment variables**

Create `backend/.env`:
```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. **Initialize the database**
```bash
npm run setup-db
```

6. **Start development servers**
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3001
- Frontend on http://localhost:5173

## 📦 Deployment

BlindPass uses a **monorepo structure** and requires **two separate Vercel projects**:
- Frontend (static site)
- Backend (serverless API)

### Quick Deploy to Vercel

1. **Deploy Frontend**:
   - Create new Vercel project from your GitHub repo
   - Set **Root Directory** to `frontend`
   - Deploy

2. **Deploy Backend**:
   - Create another Vercel project from the **same** GitHub repo
   - Set **Root Directory** to `backend`
   - Add environment variables:
     - `TURSO_DATABASE_URL`
     - `TURSO_AUTH_TOKEN`
     - `FRONTEND_URL` (your frontend URL)
   - Deploy

3. **Link Frontend to Backend**:
   - In frontend project, add environment variable:
     - `VITE_API_URL` (your backend URL)
   - Redeploy frontend

📖 **Detailed deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions.

### Manual Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy backend** to your preferred Node.js hosting or serverless platform
3. **Deploy frontend** static files to CDN/static hosting
4. **Update environment variables** for both deployments

## 🛠️ Development

### Project Structure

```
sharepass/
├── backend/              # Express API server
│   ├── src/
│   │   ├── db/          # Database client and migrations
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── index.ts     # Server entry point
│   └── package.json
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts (theme)
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utilities (crypto, API, export)
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   └── package.json
│
├── package.json         # Root package (workspaces)
└── vercel.json         # Vercel deployment config
```

### Available Scripts

```bash
# Development
npm run dev                    # Start both frontend and backend
npm run dev:frontend          # Start only frontend
npm run dev:backend           # Start only backend

# Building
npm run build                 # Build both projects
npm run build:frontend        # Build only frontend
npm run build:backend         # Build only backend

# Database
npm run setup-db                     # Initialize/setup database (recommended)
npm run db:push --workspace=backend  # Alternative: Run database migrations

# Production
npm start                     # Start production server
```

## 🔒 Security Best Practices

When using SharePass:

1. **Use Strong Protection Passwords**: If adding password protection, use a strong, unique password
2. **Share Links Securely**: Use encrypted channels (Signal, WhatsApp, etc.) to share links
3. **One-Time Links**: Enable one-time access for sensitive credentials
4. **Short Expiration**: Use the shortest expiration time practical for your use case
5. **Verify Recipients**: Ensure you're sharing with the correct person

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 📧 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Remember**: SharePass is designed for temporary, secure password sharing. For long-term password management, use a dedicated password manager like Bitwarden, 1Password, or LastPass.

