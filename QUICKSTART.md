# Quick Start Guide 🚀

## Immediate Setup (5 Minutes)

### 1. Update Contact Information

**File: `config/site.ts`**

```typescript
contact: {
  phone: '+234 801 234 5678',      // ← Your phone number
  whatsapp: '2348012345678',       // ← Your WhatsApp number (no +)
  email: 'hello@thehotpot.ng',     // ← Your email
  address: '123 Street, Lagos',    // ← Your address
}
```

### 2. Update Payment Details

**File: `config/site.ts`**

```typescript
payment: {
  bankName: 'Your Bank Name',
  accountName: 'Your Account Name',
  accountNumber: '1234567890',
}
```

### 3. Update Business Hours

**File: `config/site.ts`**

```typescript
hours: {
  weekday: '10AM - 10PM',   // Monday-Friday
  saturday: '10AM - 11PM',  // Saturday
  sunday: 'Closed',         // Sunday
}
```

### 4. Add Your Menu Items

**File: `components/MenuGrid.tsx`**

```typescript
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Your Dish Name',
    category: 'Soups',           // Soups, Rice, Swallow, Grills, Drinks
    description: 'Dish description',
    price: '₦3,500',
    image: '/images/your-image.jpg',
    popular: true,               // Optional: mark as popular
  },
  // Add more items...
];
```

### 5. Add Menu Item Images

1. Add your images to `/public/images/`
2. Name them clearly (e.g., `jollof-rice.jpg`, `egusi-soup.jpg`)
3. Update the `image` property in menu items

**Recommended image sizes:**
- Width: 800px
- Height: 600px
- Format: WebP or JPG
- Keep file size under 200KB

### 6. Update Social Media Links

**File: `config/site.ts`**

```typescript
social: {
  facebook: 'https://facebook.com/yourpage',
  instagram: 'https://instagram.com/yourpage',
  twitter: 'https://twitter.com/yourpage',
}
```

## Running the Site

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Key Files to Customize

| File | What to Change |
|------|----------------|
| `config/site.ts` | Contact info, hours, payment details |
| `components/MenuGrid.tsx` | Menu items and categories |
| `components/Footer.tsx` | Footer content |
| `components/AboutSection.tsx` | Your restaurant story |
| `app/layout.tsx` | Site metadata (SEO) |

## Color Customization

**File: `app/globals.css`**

```css
--color-hotpot-red: #E60000;        /* Main accent color */
--color-hotpot-orange: #FF7A00;     /* Secondary color */
--color-hotpot-charcoal: #1A1A1A;   /* Background color */
```

## Adding New Pages

Create a new folder in `app/`:

```
app/
├── your-page/
│   └── page.tsx
```

## Tips for Best Results

✅ **DO:**
- Use high-quality food photos
- Keep descriptions short and appetizing
- Update contact info in ALL components
- Test on mobile devices
- Optimize images before uploading

❌ **DON'T:**
- Use huge uncompressed images
- Forget to update WhatsApp numbers
- Change core animation logic (unless you know what you're doing)
- Remove the loading screen (adds polish)

## Deployment Checklist

Before deploying:

- [ ] All contact information updated
- [ ] Payment details verified
- [ ] Menu items finalized
- [ ] Images added and optimized
- [ ] Social media links working
- [ ] WhatsApp number tested
- [ ] Mobile responsiveness checked
- [ ] All pages load correctly

## Quick Deploy to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial setup"
git push
```

2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click Deploy
5. Done! Your site is live 🎉

## Need Help?

Common issues and solutions:

**Images not showing?**
- Check file path: `/public/images/yourimage.jpg`
- Make sure images are in the correct folder
- File names should match exactly (case-sensitive)

**WhatsApp link not working?**
- Format: `2348012345678` (country code without +)
- Check in `config/site.ts`

**Colors not changing?**
- Clear browser cache
- Restart dev server: `Ctrl+C` then `npm run dev`

**Build errors?**
- Run `npm install` again
- Check for TypeScript errors
- Make sure all imports are correct

## Support

For questions:
- Check the main README.md
- Review component files for inline comments
- Open an issue on GitHub

---

**Ready to customize? Start with `config/site.ts` and `components/MenuGrid.tsx`!**
