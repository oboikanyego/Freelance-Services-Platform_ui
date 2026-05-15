# FreelanceHub 🚀

## About

FreelanceHub is a modern, full-stack freelance services platform that connects buyers and freelancers with secure transactions, fast service management, built-in real-time chat, and media uploads via Cloudinary. This is the **UI/Frontend** repository built with Angular 19, TypeScript, HTML, and SCSS.

The platform provides an intuitive interface for users to browse services, place orders, communicate with freelancers in real-time, and manage transactions securely.

## Why FreelanceHub?

- 🔒 **Secure payments** between buyers & freelancers
- 💬 **Real-time chat** for each order (Socket.IO)
- 🖼 **Upload and manage images** with Cloudinary
- 🛠 **Quickly create or order** services
- 🚀 **Modern, fast Angular 19** app
- 📱 **Responsive design** with Angular Material
- ⚡ **TypeScript** for type-safe development

## Features

- **JWT authentication & role-based access** - Secure user authentication with role-based permissions
- **Order management** for buyers & freelancers - Full order lifecycle management
- **Chat per order** with live updates - Real-time communication powered by Socket.IO
- **Service images** uploaded & managed via Cloudinary - Seamless media management
- **Forgot password** email notifications (Nodemailer) - Secure password recovery
- **MongoDB backend** with Express & Node.js - Reliable data persistence
- **Responsive UI** with Angular Material - Modern, accessible design
- **Live notifications** - Real-time updates for order status and messages

## Tech Stack

- **Frontend**: Angular 19, Angular Material, TypeScript, HTML, SCSS
- **Backend**: Node.js, Express, MongoDB
- **Real-time**: Socket.IO
- **Email service**: Nodemailer
- **Media storage**: Cloudinary
- **Deployment**: Netlify (frontend) + Render (backend)

## Language Composition

- **TypeScript**: 64.9%
- **HTML**: 18.5%
- **SCSS**: 16.6%

## Quick Start

### Clone repository
```bash
git clone https://github.com/oboikanyego/Freelance-Services-Platform_ui.git
cd Freelance-Services-Platform_ui
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser and navigate to
http://localhost:4200
```

### Backend Setup (from separate repository)
```bash
cd ../Freelance-Services-Platform_server
npm install
npm run start

# Backend runs on
http://localhost:5000
```

## Usage

1. **Sign up** as buyer or freelancer
2. **Create or order** services
3. **Upload images/media** for services via Cloudinary
4. **Chat in real-time** per order
5. **Manage orders** and transactions securely
6. **Reset password** via email if needed

## Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## Project Structure

```
src/
├── app/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API and business logic services
│   ├── models/         # TypeScript interfaces
│   └── guards/         # Route guards for auth
├── assets/             # Images and static files
├── styles/             # Global SCSS styles
└── environments/       # Environment configuration
```

## Related Repositories

- **Backend API**: [Freelance-Services-Platform_server](https://github.com/oboikanyego/Freelance-Services-Platform_server)
- **Portfolio**: [my-portfolio](https://github.com/oboikanyego/my-portfolio)

## License

MIT License - see LICENSE file for details

## Badges

![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen?logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-API-blue?logo=cloudinary)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7?logo=netlify)
![Render](https://img.shields.io/badge/Render-deployed-5c2d91?logo=render)

## Authors

- [@Oboikanyego](https://github.com/oboikanyego)

## Live App

Visit the deployed application: [FreelanceHub](https://68a393ffeb349e0008ca490b--freelance-services-platform.netlify.app/)

## Getting Help

For issues, questions, or suggestions, please open an [GitHub Issue](https://github.com/oboikanyego/Freelance-Services-Platform_ui/issues).

---

**Last Updated**: May 2026
