# Adarsh's Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion featuring cosmic animations and optimized performance.

## ✨ Features

- **Cosmic Animated Background**: Real-time sun/moon positioning with beautiful space animations
- **Performance Optimized**: 141kB First Load JS with dynamic imports and code splitting
- **Responsive Design**: Fully responsive across all devices with mobile-first approach
- **Type Safety**: Full TypeScript support for better development experience
- **Smooth Animations**: Framer Motion animations with interaction-aware performance optimization
- **Modern Stack**: Next.js 15, React 18, Tailwind CSS, and production-ready configuration

## 🚀 Tech Stack

- **Framework**: Next.js 15.1.0 with App Router
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion with GPU acceleration
- **Performance**: Bundle analyzer, dynamic imports, optimized caching
- **Analytics**: Vercel Analytics integration

## 🏗️ Project Structure

```
app/
├── page.tsx          # Homepage with hero section
├── about/            # About page with profile details
├── projects/         # Projects showcase
├── travel/           # Travel experiences
├── contact/          # Contact form and links
├── layout.tsx        # Root layout with fonts and analytics
└── api/              # API routes

components/
├── AnimatedBackground.tsx  # Cosmic background with sun positioning
├── CosmicLoader.tsx       # Loading animation
├── Hero.tsx              # Hero section
├── Button.tsx            # Reusable button component
└── ...                   # Other UI components
    └── svgs/
```

## 🎨 Color Palettes

The project includes three predefined color palettes in `src/utils/constants.ts`:

### Modern (Default)
- Primary: `#3B82F6` (Blue)
- Secondary: `#8B5CF6` (Violet)  
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Analyze bundle size
npm run analyze
```

## 📈 Performance

- **First Load JS**: 141kB (optimized)
- **Bundle Splitting**: Dynamic imports for heavy components
- **Caching**: 1-year cache for static assets
- **Image Optimization**: WebP/AVIF formats with quality optimization
- **Animation Performance**: RequestAnimationFrame with interaction-aware pausing

## 🌐 Deployment

This project is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **Any static hosting platform**

### Environment Variables (Optional)
```bash
REVALIDATION_SECRET=your-secret-key  # For ISR revalidation endpoint
ANALYZE=true                         # Enable bundle analyzer
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 🎨 Design Features

- Cosmic theme with animated planets, nebula, and geometric elements
- Real-time sun position calculation based on time of day
- Smooth page transitions and hover effects
- Professional gradient typography
- Interactive elements with performance optimization

---

Built with ❤️ by [Adarsh Borker](https://github.com/borkeradarsh)

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
