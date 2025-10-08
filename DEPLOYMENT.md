# 🚀 Deployment Guide - The Hotpot

## Quick Deploy Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Built by Next.js creators
- Free tier available
- Automatic SSL
- Global CDN
- One-click deploys
- Preview deployments for testing

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - The Hotpot website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/thehotspot.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! 🎉

3. **Custom Domain (Optional)**
   - Go to project settings
   - Add domain: `thehotpot.ng`
   - Follow DNS instructions
   - Wait for DNS propagation (up to 48 hours)

**Vercel CLI Deploy:**
```bash
npm i -g vercel
vercel login
vercel
```

---

### Option 2: Netlify

**Steps:**

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `.next` folder
   - Or connect GitHub for auto-deploys

**Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

### Option 3: Traditional Hosting (cPanel, etc.)

**Requirements:**
- Node.js 18+ support
- SSH access
- PM2 or similar process manager

**Steps:**

1. **Build Production Bundle**
   ```bash
   npm run build
   ```

2. **Upload Files via FTP/SSH**
   Upload these files/folders:
   - `.next/`
   - `public/`
   - `node_modules/` (or run `npm install` on server)
   - `package.json`
   - `next.config.ts`

3. **Start the Server**
   ```bash
   npm install
   npm start
   ```

4. **Keep Running with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "thehotspot" -- start
   pm2 save
   pm2 startup
   ```

---

### Option 4: Docker

**Dockerfile** (create this file):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Deploy:**
```bash
docker build -t thehotspot .
docker run -p 3000:3000 thehotspot
```

---

## Pre-Deployment Checklist

### 1. Content Review
- [ ] All text reviewed for typos
- [ ] Menu items accurate
- [ ] Prices correct
- [ ] Contact information verified
- [ ] WhatsApp number tested

### 2. Technical Checks
- [ ] Build completes without errors: `npm run build`
- [ ] No console errors in browser
- [ ] All images optimized (< 200KB each)
- [ ] Mobile responsiveness tested
- [ ] Cross-browser testing (Chrome, Safari, Firefox)

### 3. SEO Setup
- [ ] Meta titles and descriptions set
- [ ] Favicon added
- [ ] Open Graph images ready
- [ ] Sitemap generated
- [ ] Robots.txt configured

### 4. Performance
- [ ] Lighthouse score > 90
- [ ] Images compressed
- [ ] Unused dependencies removed
- [ ] Build size optimized

### 5. Security
- [ ] Environment variables set
- [ ] No sensitive data in code
- [ ] SSL certificate active
- [ ] HTTPS enforced

---

## Environment Variables

Create `.env.local` (don't commit this):

```env
# Production Settings
NEXT_PUBLIC_SITE_URL=https://thehotpot.ng

# Contact (if pulling from env)
NEXT_PUBLIC_WHATSAPP=2348012345678
NEXT_PUBLIC_PHONE=+234 801 234 5678
NEXT_PUBLIC_EMAIL=hello@thehotpot.ng

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Keys (if needed later)
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

**Set in Vercel:**
1. Go to Project Settings
2. Environment Variables
3. Add each variable
4. Redeploy

---

## Custom Domain Setup

### 1. Purchase Domain
Recommended registrars for Nigerian domains:
- **Namecheap** - thehotpot.ng
- **GoDaddy** - thehotpot.ng
- **Cloudflare** - thehotpot.ng

### 2. DNS Configuration

**For Vercel:**
Add these DNS records:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 76.76.21.21 |
| CNAME | www  | cname.vercel-dns.com |

**For Netlify:**

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 75.2.60.5 |
| CNAME | www  | your-site.netlify.app |

### 3. SSL Certificate
- Vercel/Netlify: Automatic
- Traditional hosting: Use Let's Encrypt (free)

---

## Post-Deployment

### 1. Test Everything
- [ ] Visit all pages
- [ ] Test WhatsApp links on mobile
- [ ] Submit test order
- [ ] Check contact form (if added)
- [ ] Verify payment details display correctly

### 2. Set Up Analytics

**Google Analytics:**
```typescript
// app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 3. Submit to Search Engines
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

### 4. Social Media Setup
- Add website link to all social profiles
- Create Facebook Business Page
- Set up Instagram Business account
- Create Google Business Profile

---

## Monitoring & Maintenance

### Weekly Tasks
- Check for broken links
- Review order inquiries
- Update menu items if needed
- Check site performance

### Monthly Tasks
- Update dependencies: `npm update`
- Review analytics
- Backup database (if using one)
- Security audit

### Performance Monitoring
- Vercel Analytics (free)
- Google PageSpeed Insights
- GTmetrix
- Uptime monitoring (UptimeRobot)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
- Check file paths start with `/`
- Verify images are in `/public/images/`
- Check file extensions match code

### WhatsApp Not Opening
- Ensure number format: `2348012345678`
- Test on actual mobile device
- Check URL encoding

### Slow Loading
- Run: `npm run build` and check bundle size
- Optimize images with tools like TinyPNG
- Enable Vercel Edge Caching

---

## Rollback Plan

**If something goes wrong:**

1. **Vercel**: Use "Instant Rollback" in dashboard
2. **Git**: Revert to previous commit
   ```bash
   git log
   git revert <commit-hash>
   git push
   ```

---

## Cost Estimate

### Free Tier (Small Business)
- Vercel: Free (includes SSL, CDN)
- Domain: ₦5,000 - ₦15,000/year (.ng)
- Total: ~₦15,000/year

### Paid Tier (Growing Business)
- Vercel Pro: $20/month
- Domain: ₦10,000/year
- Analytics: Free (Google Analytics)
- Total: ~₦300,000/year

---

## Support & Updates

### Getting Help
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Community Discord: https://nextjs.org/discord

### Future Updates
Pull latest changes:
```bash
git pull origin main
npm install
npm run build
```

---

## 🎉 You're Live!

Once deployed, your site will be accessible at:
- **Vercel**: `https://thehotspot.vercel.app`
- **Custom Domain**: `https://thehotpot.ng`

**Share your new website:**
- 📱 WhatsApp Status
- 📸 Instagram Stories
- 👥 Facebook Page
- 🐦 Twitter
- 📍 Google Business

**Start taking orders and grow your business! 🚀**

---

**Need Help?** Check the main README.md or open an issue on GitHub.

Made with ❤️ in Lagos, Nigeria 🇳🇬
