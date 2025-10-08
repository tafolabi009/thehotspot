# 🎯 Feature Implementation Guide

## Overview
This document explains how each feature was implemented and how to use/modify them.

---

## 1. 3D Parallax Motion

### Implementation Location
- **Files**: `components/HeroSection.tsx`, `components/MenuGrid.tsx`
- **Library**: Framer Motion

### How It Works
```tsx
// Mouse position tracking
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

// Convert to rotation with spring physics
const rotateX = useSpring(
  useTransform(mouseY, [-0.5, 0.5], [10, -10]),
  { damping: 25, stiffness: 200 }
);

// Apply to element
<motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
```

### Customization
```tsx
// Adjust tilt intensity (default: 10 degrees)
useTransform(mouseY, [-0.5, 0.5], [20, -20]) // More dramatic

// Adjust spring physics
{ damping: 15, stiffness: 300 } // Faster response
{ damping: 35, stiffness: 150 } // Slower, smoother
```

---

## 2. Floating 3D Food Elements

### Implementation Location
- **File**: `components/FloatingFoods.tsx`
- **Libraries**: Three.js, React Three Fiber, @react-three/drei

### Component Structure
```tsx
<Canvas>
  <Scene>
    <FloatingFood position={[-4, 2, -5]} color="#FF7A00" />
    // More food elements...
  </Scene>
</Canvas>
```

### How It Works
1. Canvas creates 3D context
2. Each `FloatingFood` is a distorted icosahedron
3. `Float` wrapper adds bobbing motion
4. `useFrame` adds continuous rotation
5. Point lights add glow effect

### Customization
```tsx
// Add more food elements
<FloatingFood position={[x, y, z]} color="#YOUR_COLOR" scale={size} />

// Change shapes
<icosahedronGeometry args={[1, 1]} /> // Current
<boxGeometry args={[1, 1, 1]} />      // Cubes
<sphereGeometry args={[1, 32, 32]} /> // Spheres

// Adjust floating
<Float speed={2} floatIntensity={2}> // Current
<Float speed={4} floatIntensity={4}> // Faster, higher
```

---

## 3. Fire Glow Animations

### Implementation Location
- **File**: `components/FireButton.tsx`
- **Library**: Framer Motion

### Animation Layers
1. **Base glow** - Radial gradient blur
2. **Shimmer** - Moving gradient overlay
3. **Glow border** - Pulsing outline

### Customization
```tsx
// Change glow colors
background: 'radial-gradient(circle, rgba(255, 122, 0, 0.8) 0%, rgba(230, 0, 0, 0.6) 50%)'

// Adjust pulse speed
transition: { duration: 1, repeat: Infinity } // Default
transition: { duration: 0.5, repeat: Infinity } // Faster pulse

// Change hover scale
whileHover={{ scale: 1.05 }} // Default
whileHover={{ scale: 1.1 }}  // Larger grow
```

---

## 4. Shopping Cart System

### Implementation Location
- **Files**: `components/CartDrawer.tsx`, `components/MenuGrid.tsx`
- **Storage**: localStorage

### State Management
```tsx
// Cart items state
const [cartItems, setCartItems] = useState<CartItem[]>([]);

// Add item
const addToCart = (item: MenuItem) => {
  setCartItems((prevItems) => {
    const existing = prevItems.find((i) => i.id === item.id);
    if (existing) {
      return prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...prevItems, { ...item, quantity: 1 }];
  });
};
```

### LocalStorage Persistence
```tsx
// Save order
const order = { code, items, total, timestamp };
localStorage.setItem('hotpot_orders', JSON.stringify([...existingOrders, order]));

// Retrieve orders
const orders = JSON.parse(localStorage.getItem('hotpot_orders') || '[]');
```

### Customization
```tsx
// Change cart slide direction
initial={{ x: '100%' }}  // From right (default)
initial={{ x: '-100%' }} // From left
initial={{ y: '100%' }}  // From bottom

// Adjust animation speed
transition={{ type: 'spring', damping: 30, stiffness: 300 }} // Default
transition={{ type: 'spring', damping: 20, stiffness: 400 }} // Faster
```

---

## 5. Order Code Generation

### Implementation Location
- **File**: `components/CartDrawer.tsx`

### Algorithm
```tsx
const generateOrderCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const part1 = Array.from({ length: 4 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
  const part2 = Array.from({ length: 3 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
  return `THP-${part1}-${part2}`;
};
```

### Format
- Prefix: `THP-` (The Hotpot)
- Part 1: 4 random alphanumeric characters
- Part 2: 3 random alphanumeric characters
- Example: `THP-8K2X-9A7`

### Customization
```tsx
// Change prefix
return `YOUR-${part1}-${part2}`;

// Longer codes
const part1 = Array.from({ length: 6 }, ...) // 6 chars instead of 4

// Numbers only
const chars = '0123456789';

// Letters only
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
```

---

## 6. WhatsApp Integration

### Implementation Location
- **Files**: `components/CartDrawer.tsx`, `components/OrderSection.tsx`

### Message Format
```tsx
const message = encodeURIComponent(
  `Hi, I just placed an order on The Hotpot!\n\n` +
  `Order Code: ${orderCode}\n\n` +
  `Here's my order summary:\n${itemsList}\n\n` +
  `Total: ₦${total.toLocaleString()}\n\n` +
  `Please confirm my order. Thank you!`
);

window.open(`https://wa.me/${number}?text=${message}`, '_blank');
```

### Customization
```tsx
// Change phone number
const whatsappNumber = '2348012345678'; // Format: country code + number

// Modify message template
const message = `
Your custom message here
Order: ${orderCode}
Total: ₦${total}
`;

// Add customer info (if collected)
const message = `
Order Code: ${orderCode}
Customer: ${name}
Address: ${address}
Items: ${itemsList}
`;
```

---

## 7. Seller Dashboard

### Implementation Location
- **File**: `app/seller/page.tsx`

### Search Logic
```tsx
const handleSearch = () => {
  const orders = JSON.parse(localStorage.getItem('hotpot_orders') || '[]');
  const found = orders.find((order: Order) => 
    order.code.toUpperCase() === orderCode.toUpperCase()
  );
  
  if (found) {
    setSearchedOrder(found);
  } else {
    setNotFound(true);
  }
};
```

### Features
- Case-insensitive search
- Loading state simulation
- Order detail display
- Print functionality
- Timestamp formatting

### Customization
```tsx
// Add order status
interface Order {
  code: string;
  items: CartItem[];
  total: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'delivered'; // Add this
}

// Filter orders by date
const todayOrders = orders.filter(order => {
  const orderDate = new Date(order.timestamp).toDateString();
  const today = new Date().toDateString();
  return orderDate === today;
});

// Add search by customer name
const found = orders.find((order) => 
  order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
);
```

---

## 8. Scroll Snapping

### Implementation Location
- **File**: `app/globals.css`

### CSS Implementation
```css
html {
  scroll-snap-type: y proximity;
}

section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

### Snap Types
- `proximity` - Snaps when close to target (current)
- `mandatory` - Always snaps to nearest section

### Customization
```css
/* Stronger snapping */
scroll-snap-type: y mandatory;

/* Horizontal snapping */
scroll-snap-type: x proximity;

/* No snapping */
scroll-snap-type: none;

/* Snap to center */
scroll-snap-align: center;
```

---

## 9. Toast Notifications

### Implementation Location
- **File**: `components/MenuGrid.tsx`

### Implementation
```tsx
const toast = document.createElement('div');
toast.className = 'fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg z-50 animate-slide-in';
toast.textContent = `${item.name} added to cart! 🔥`;
document.body.appendChild(toast);
setTimeout(() => toast.remove(), 2000);
```

### Customization
```tsx
// Change position
toast.className = 'fixed bottom-6 left-6 ...' // Bottom left
toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 ...' // Top center

// Change duration
setTimeout(() => toast.remove(), 3000); // 3 seconds

// Change colors
bg-green-500  // Success (default)
bg-red-500    // Error
bg-blue-500   // Info
bg-yellow-500 // Warning

// Add icon
toast.innerHTML = `<span>✓</span> ${item.name} added to cart!`;
```

---

## 10. Responsive Design

### Breakpoints
```tsx
// TailwindCSS breakpoints
sm:  640px   // Mobile landscape
md:  768px   // Tablet
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large

// Usage example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Mobile Optimizations
1. **Simplified animations** on mobile
2. **Touch-optimized** buttons (larger tap targets)
3. **Hamburger menu** for navigation
4. **Single column** layouts
5. **Reduced 3D complexity** for performance

---

## Performance Tips

### 3D Rendering
```tsx
// Reduce polygon count
<icosahedronGeometry args={[1, 0]} /> // Lower detail

// Limit floating elements
// Show only 3-4 on mobile instead of 6

// Conditional rendering
{!isMobile && <FloatingFoods />}
```

### Animations
```tsx
// Use transform instead of position
// Good
<motion.div style={{ x: 100 }} />

// Bad (causes reflow)
<motion.div style={{ left: 100 }} />

// Reduce animation frequency
useFrame((state) => {
  if (state.clock.getElapsedTime() % 0.1 < 0.05) {
    // Update every 100ms instead of every frame
  }
});
```

### Images
```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image 
  src="/image.jpg" 
  alt="Description"
  width={800}
  height={600}
  loading="lazy" // Lazy load
  quality={85}   // Optimize quality
/>
```

---

## Testing Checklist

### Functionality
- [ ] Add items to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] Clear cart
- [ ] Generate order code
- [ ] Send to WhatsApp
- [ ] Search order (seller)
- [ ] Order persists in localStorage

### Animations
- [ ] Hero parallax works
- [ ] Card tilt on hover
- [ ] Fire glow on buttons
- [ ] Cart drawer slides smoothly
- [ ] Loading states appear
- [ ] Success modal animates

### Responsive
- [ ] Mobile menu works
- [ ] Cart usable on mobile
- [ ] Cards stack properly
- [ ] Text readable on small screens
- [ ] Touch targets adequate

### Performance
- [ ] Page loads under 3s
- [ ] Animations run at 60fps
- [ ] No layout shifts
- [ ] Images optimized

---

## Common Issues & Solutions

### Issue: Cart doesn't save
**Solution**: Check localStorage permissions, try incognito mode

### Issue: 3D elements not visible
**Solution**: Check WebGL support, update browser

### Issue: Animations laggy
**Solution**: Reduce 3D complexity, disable shadows, lower detail

### Issue: WhatsApp not opening
**Solution**: Check number format (no + or spaces in URL)

---

## Future Enhancements

- [ ] Backend integration (Node.js/Python API)
- [ ] Real-time order updates (WebSockets)
- [ ] Payment gateway (Paystack)
- [ ] User authentication
- [ ] Order history
- [ ] Push notifications
- [ ] Admin analytics dashboard
- [ ] Customer reviews
- [ ] Loyalty program

---

**Need help implementing a feature? Check the component files for inline comments!**
