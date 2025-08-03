# Professional CV Website

A modern, interactive CV website built with React, TypeScript, and Three.js, featuring stunning visual effects and a professional dark theme.

## 🚀 Features

- **Interactive Three.js Effects**: Custom cursor with glowing particle trail
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Professional black/cyan color scheme
- **Smooth Animations**: Framer Motion powered transitions
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS
- **GitHub Pages Ready**: Optimized for static hosting

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/
│   ├── ThreeBackground.tsx    # 3D particle effects and custom cursor
│   ├── Navigation.tsx         # Responsive navigation bar
│   ├── Header.tsx            # Hero section with profile info
│   ├── Education.tsx         # Educational background
│   ├── Skills.tsx            # Technical and soft skills
│   ├── Projects.tsx          # Project showcase
│   └── Footer.tsx            # Contact information and links
├── types/
│   └── index.ts              # TypeScript type definitions
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles and Tailwind imports
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/professional-cv-website.git
   cd professional-cv-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment to GitHub Pages

1. **Update the base URL in `vite.config.ts`**
   ```typescript
   base: '/your-repository-name/',
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 📝 Customization

### Personal Information
Update the following files with your information:
- `src/components/Header.tsx` - Name, title, and contact links
- `src/components/Education.tsx` - Educational background
- `src/components/Skills.tsx` - Technical and soft skills
- `src/components/Projects.tsx` - Portfolio projects

### Styling
- Colors can be customized in Tailwind classes throughout components
- The main theme uses cyan (#00FFFF) as the accent color
- Background gradient can be modified in `src/App.tsx`

### Three.js Effects
- Particle count and behavior can be adjusted in `src/components/ThreeBackground.tsx`
- Cursor effects and animations are fully customizable

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## ⚡ Performance

- Optimized bundle splitting for faster loading
- Lazy loading of Three.js effects
- Compressed assets and minified code
- Efficient animation rendering

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

John Smith - [john.smith@email.com](mailto:john.smith@email.com)

Project Link: [https://github.com/johnsmith/professional-cv-website](https://github.com/johnsmith/professional-cv-website)

Live Demo: [https://johnsmith.github.io/professional-cv-website](https://johnsmith.github.io/professional-cv-website)