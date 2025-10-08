# Project Features & Documentation

## 🎨 Design System

### Color Palette
```
Primary Red:     #E60000  - Main brand color, used for CTAs and highlights
Charcoal Black:  #1A1A1A  - Primary background
Warm Orange:     #FF7A00  - Secondary accent, glows and buttons
Orange Light:    #FFA940  - Tertiary accent
Charcoal Light:  #2A2A2A  - Card backgrounds
```

### Typography
- **Display Font**: Montserrat (800, 900) - Used for headings and hero text
- **Body Font**: Inter (400, 500, 600, 700) - Used for body text and UI

### Spacing Scale
```
xs:  0.25rem  (4px)
sm:  0.5rem   (8px)
md:  1rem     (16px)
lg:  1.5rem   (24px)
xl:  2rem     (32px)
2xl: 3rem     (48px)
```

## 🎬 Animation Patterns

### Entrance Animations
```typescript
// Fade + Slide Up
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Scale In
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
```

### Hover Effects
```typescript
// Button Hover
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Card Hover
whileHover={{ y: -10 }}
```

### Scroll Animations
Uses `react-intersection-observer` for triggering animations on scroll:
```typescript
const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
```

## 📱 Responsive Breakpoints

```
sm:  640px   - Mobile landscape
md:  768px   - Tablet
lg:  1024px  - Desktop
xl:  1280px  - Large desktop
2xl: 1536px  - Extra large
```

## 🧩 Component Architecture

### Core Components

**HeroSection.tsx**
- Parallax scrolling effect
- Animated title with gradient
- Floating background elements
- Scroll indicator

**MenuGrid.tsx**
- Category filtering system
- Animated card grid
- Hover effects with 3D transforms
- Popular item badges

**OrderSection.tsx**
- Payment details with copy-to-clipboard
- WhatsApp integration
- Delivery information
- Animated notification badges

**AboutSection.tsx**
- Restaurant story
- Animated statistics counter
- Core values cards
- Parallax decorative elements

**Footer.tsx**
- Multi-column layout
- Social media links with hover effects
- Business hours display
- Newsletter signup (optional)

**Navbar.tsx**
- Sticky navigation with scroll effects
- Mobile hamburger menu
- Smooth scroll to sections
- Glass-morphism effect

### Utility Components

**LoadingScreen.tsx**
- Animated entrance screen
- Brand showcase
- Smooth exit transition

**ThreeBackground.tsx**
- 3D animated spheres
- Subtle background motion
- Performance optimized

**CustomCursor.tsx** (Optional)
- Custom cursor design
- Hover state indicators
- Smooth spring animations

**PageTransition.tsx**
- Route transition animations
- Page enter/exit effects

## 🔧 Configuration

### Site Config (`config/site.ts`)
Centralized configuration for:
- Contact information
- Business hours
- Payment details
- Social media links
- Delivery settings
- Brand colors

### Menu Items (`components/MenuGrid.tsx`)
```typescript
interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
}
```

## 🎯 Performance Optimizations

1. **Image Optimization**
   - Next.js Image component
   - Lazy loading
   - WebP format support

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting with App Router

3. **Animation Performance**
   - CSS transforms (GPU accelerated)
   - `will-change` property for smooth animations
   - Framer Motion's hardware acceleration

4. **3D Rendering**
   - Optimized Three.js scene
   - Reduced polygon count
   - Efficient material usage

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags (title, description, keywords)
- Open Graph tags
- Structured data (JSON-LD) ready
- Sitemap generation
- Robots.txt

## 🎨 Customization Guide

### Changing Colors

**File: `app/globals.css`**
```css
@theme {
  --color-hotpot-red: #YOUR_COLOR;
  --color-hotpot-orange: #YOUR_COLOR;
  --color-hotpot-charcoal: #YOUR_COLOR;
}
```

### Adding Animations

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Your content
</motion.div>
```

### Creating New Pages

1. Create folder in `app/`
2. Add `page.tsx`
3. Import shared components

```typescript
// app/about/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Your content */}
      <Footer />
    </>
  );
}
```

## 🛠️ Development Utilities

**File: `lib/utils.ts`**

Includes helpers for:
- Price formatting
- Phone number validation
- WhatsApp link generation
- Order total calculation
- Delivery fee calculation
- Date formatting
- Clipboard operations

## 📦 Dependencies

### Core
- `next@15.5.4` - React framework
- `react@19` - UI library
- `typescript` - Type safety

### Animation & 3D
- `framer-motion` - Animations
- `three` - 3D graphics
- `@react-three/fiber` - React Three.js renderer
- `@react-three/drei` - Three.js helpers

### UI & Icons
- `react-icons` - Icon library
- `react-intersection-observer` - Scroll animations

### Styling
- `tailwindcss@4.0` - Utility CSS

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

## 🐛 Troubleshooting

**Issue: Animations not working**
- Check Framer Motion version
- Ensure 'use client' directive is present
- Verify browser supports animations

**Issue: 3D background not rendering**
- Check WebGL support in browser
- Reduce sphere count for performance
- Disable on mobile for better performance

**Issue: Images not loading**
- Verify file paths are correct
- Check image file extensions
- Ensure images are in `/public/images/`

**Issue: WhatsApp link not working**
- Format: `2348012345678` (no spaces or +)
- Test with different devices
- Check URL encoding

## 📊 Performance Metrics

Target metrics:
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🎓 Best Practices

1. **Component Organization**
   - One component per file
   - Use TypeScript interfaces
   - Extract reusable logic

2. **State Management**
   - Use React hooks
   - Keep state close to where it's used
   - Consider Zustand for complex state

3. **Styling**
   - Use Tailwind utility classes
   - Create custom classes in globals.css
   - Maintain consistent spacing

4. **Performance**
   - Lazy load heavy components
   - Optimize images before upload
   - Minimize bundle size

5. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels
   - Ensure keyboard navigation
   - Test with screen readers

## 📝 Future Enhancements

Potential features to add:
- [ ] Online ordering system with cart
- [ ] User authentication
- [ ] Order tracking
- [ ] Customer reviews
- [ ] Loyalty program
- [ ] Multiple language support
- [ ] Dark/Light mode toggle
- [ ] Advanced search & filters
- [ ] Reservation system
- [ ] Blog section

## 📄 License

MIT License - Feel free to use this project for commercial purposes.

---

**Built with ❤️ for Nigerian restaurants**
