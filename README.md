# Adarsh's Portfolio

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Vite for lightning-fast development and optimized builds
- **Type Safety**: Full TypeScript support for better development experience
- **Animations**: Beautiful animations powered by Framer Motion
- **SEO Optimized**: Proper meta tags and semantic HTML for better search engine visibility
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── Navbar.tsx
├── pages/          # Page components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   └── Projects.tsx
├── hooks/          # Custom React hooks
│   ├── useForm.ts
│   └── useScrollAnimation.ts
├── utils/          # Utility functions and constants
│   ├── constants.ts
│   ├── motionVariants.ts
│   └── types.ts
├── styles/         # Global styles
│   └── globals.css
└── assets/         # Static assets
    ├── images/
    └── svgs/
```

## 🎨 Color Palettes

The project includes three predefined color palettes in `src/utils/constants.ts`:

### Modern (Default)
- Primary: `#3B82F6` (Blue)
- Secondary: `#8B5CF6` (Violet)  
- Accent: `#06B6D4` (Cyan)

### Warm
- Primary: `#F59E0B` (Amber)
- Secondary: `#EC4899` (Pink)
- Accent: `#EF4444` (Red)

### Nature
- Primary: `#10B981` (Emerald)
- Secondary: `#14B8A6` (Teal)
- Accent: `#06B6D4` (Cyan)

## 🛠️ Setup & Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Update your information**
   - Edit `src/utils/constants.ts` to add your personal URLs
   - Replace placeholder content with your actual information
   - Add your resume PDF to `public/resume.pdf`

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Customization

### Personal Information
Update `src/utils/constants.ts`:

```typescript
export const URLS = {
  GITHUB_PROFILE_URL: 'https://github.com/your-username',
  LINKEDIN_PROFILE_URL: 'https://linkedin.com/in/your-profile',
  RESUME_DOWNLOAD_URL: '/resume.pdf',
  EMAIL: 'your.email@example.com',
};
```

### Choose Color Palette
```typescript
// Choose from: modern, warm, nature
export const COLORS = COLOR_PALETTES.modern;
```

### Add Your Projects
Update `src/pages/Projects.tsx` with your actual projects.

### Customize About Page
Update `src/pages/About.tsx` with your bio, skills, and education.

## 🎭 Animation System

Pre-built Framer Motion variants in `src/utils/motionVariants.ts`:
- Page transitions
- Hover effects  
- Scroll animations
- Button interactions
- And more...

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. `npm run build`
2. Upload `dist` folder

## 📱 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

---

Made with ❤️ using React + TypeScript + Tailwind CSS + Framer Motion
