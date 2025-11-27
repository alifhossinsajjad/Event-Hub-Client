## Event-Hub-Server-Side

https://github.com/alifhossinsajjad/Event-Hub-Server




# EventHub - Secure Event Management Platform

🚀 Project Overview
EventHub is a full-stack, production-ready event management application built with modern web technologies. It provides a secure platform for users to discover, create, and manage events with robust authentication, real-time interactions, and comprehensive CRUD operations.



## 🛡️ Security-First Architecture

## Advanced Security Implementation


- Password Security: Utilizes bcryptjs with salt rounds for secure password hashing

- JWT Authentication: Secure token-based authentication with jsonwebtoken

- Session Management: Secure session handling with next-auth

- CORS Protection: Configured CORS policies for controlled API access

- Environment Security: Sensitive data protection using dotenv

- Input Validation: Comprehensive request validation and sanitization



## Authentication & Authorization
- Dual Authentication: Social login (Google) + Credential-based login

- Protected Routes: Role-based access control for admin features

- Secure Sessions: Encrypted session storage with automatic expiration

- Token Refresh: Secure token refresh mechanism

## 🏗️ Technical Stack
- Frontend (Next.js 16 with App Router)
- Framework: Next.js 16.0.4 with React 19.2.0

- Styling: Tailwind CSS 4.1.17 with responsive design

- Authentication: NextAuth.js 4.24.13

- UI Components: Custom components with React Icons

- Notifications: React Toastify for user feedback

- Image Optimization: Sharp for high-performance image processing

- Backend (Express.js)
- Runtime: Node.js with Express 5.1.0

- Database: MongoDB 7.0.0 with native driver

- Security: bcryptjs, JWT, CORS

## Development: Nodemon for hot reloading

# 📱 Core Features
- Public Features
- Landing Page: Modern, responsive design with 7 sections

- Event Discovery: Browse events with search and filtering

- Event Details: Comprehensive event information pages

- User Registration: Secure sign-up process

- Protected User Features
- Event Creation: Add new events with rich form validation

- Event Management: Full CRUD operations for user events

- Profile Management: Secure user profile updates

## Dashboard: Personalized user dashboard

- Admin Features
- Event Moderation: Admin-level event management

- user Management: Comprehensive user administration

## Analytics: Event and user analytics dashboard

## 🔧 Complete CRUD Operations


## Event Management




```bash
CREATE → Add new events with validation
READ   → View event lists and details
UPDATE → Modify event information
DELETE → Remove events with confirmation
```




## Deployment

To deploy this project run

```bash
  npm run i
```


## Generate NextAuth Secret




# Generate a secure secret for NextAuth
```bash
openssl rand -base64 32
```
## Copy the output and use it as your NEXTAUTH_SECRET in the .env.local file.

## Start Frontend Development Server
```bash
npm run dev
```
The frontend will run on http://localhost:3000



## 🔐 Authentication Setup
## Google OAuth Setup (Optional)
### Go to Google Cloud Console

- Create a new project

- Enable Google+ API

- Create OAuth 2.0 credentials

- Add http://localhost:3000 to authorized redirect URIs

- Copy Client ID and Secret to your .env.local file



## 📁 Project Structure


```bash

root/
├── main.module
├── public/
├── src/
│   ├── app/
│   │   ├── add-events/
│   │   ├── all-events/
│   │   │   ├── [id]/
│   │   │   └── page.jsx/
│   │   ├── api/
│   │   │   └── auth
│   │   ├── nextauth/
│   │   ├── register/
│   │   │   └──route.jsx/
│   │   ├── login/
│   │   │   └──page.jsx
│   │   ├── manage-event/
│   │   │   └── pop.js
│   │   ├── register/
│   │   │   └── pop.js
│   │   └── broadcast/
│   ├── global.css
│   ├── layout.js
│   ├── page.js/
│   ├── components/
│   │   ├── authprovider/
│   │   ├── eventcard/
│   │   ├── home/
|   |   |     └──category.jsx
|   |   |     └──feature.jsx
|   |   |     └──hero.jsx
|   |   |     └──HowItWorks.jsx
|   |   |     └──Testimonials.jsx
│   │   ├── privetRoute/
│   │   └── Sheard/
|   |   |   └──Navbar.jsx
|   |   |   └──Footer.jsx

```
