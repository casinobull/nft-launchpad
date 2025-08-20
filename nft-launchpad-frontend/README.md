# HyperPad Launchpad

A modern, responsive NFT marketplace and launchpad built with Next.js, TypeScript, and Tailwind CSS. This project is a fork of the original NFT launchpad site with enhanced features and modern design.

## 🚀 Features

- **Modern UI/UX**: Beautiful gradient backgrounds and glass morphism effects
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: Smooth animations and hover effects
- **Featured Collections**: Carousel of NFT collections with navigation
- **Featured NFTs**: Grid display of individual NFT items
- **FAQ Section**: Expandable questions and answers
- **Community Section**: Statistics, testimonials, and social links
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Wallet Integration**: Connect wallet button (UI only)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nft-launchpad
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and custom utilities
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Homepage component
├── components/
│   ├── Header.tsx           # Navigation header with wallet connect
│   ├── Hero.tsx             # Hero section with main CTA
│   ├── FeaturedCollections.tsx  # NFT collections carousel
│   ├── FeaturedNFTs.tsx     # Individual NFT grid
│   ├── FAQ.tsx              # Expandable FAQ section
│   ├── Community.tsx        # Community stats and testimonials
│   └── Footer.tsx           # Footer with navigation links
```

## 🎨 Customization

### Colors and Themes
The project uses a dark theme with purple and blue gradients. You can customize the colors by modifying:

- `src/app/globals.css` - Custom CSS variables and utilities
- `tailwind.config.ts` - Tailwind configuration and custom animations

### Components
Each component is modular and can be easily customized:

- Update content in the component files
- Modify styling using Tailwind classes
- Add new animations with Framer Motion

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Animations

The project includes several types of animations:
- **Scroll-triggered animations**: Using Framer Motion's `whileInView`
- **Hover effects**: Custom CSS transitions and transforms
- **Background animations**: Floating blob effects
- **Interactive elements**: Button hover states and micro-interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

1. Create a new component in `src/components/`
2. Import and use it in `src/app/page.tsx`
3. Add any necessary TypeScript interfaces
4. Style with Tailwind CSS classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original design inspiration from the NFT launchpad site
- Icons from [Lucide React](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ using Next.js and modern web technologies.
