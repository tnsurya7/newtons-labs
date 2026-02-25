# Deployment Guide - Newton's Lab

## ✅ Build Status: SUCCESS

The application has been successfully built and is ready for deployment.

---

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Newton's Lab"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Click "Deploy"
- Done! Your site is live in ~2 minutes

**Vercel Benefits:**
- Automatic deployments on git push
- Free SSL certificate
- Global CDN
- Automatic preview deployments
- Zero configuration needed

---

### Option 2: Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `.next` folder
- Or connect your GitHub repo

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`

---

### Option 3: Self-Hosted (VPS/Cloud)

#### Requirements
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx (optional, for reverse proxy)

#### Steps

1. **Clone repository on server**
```bash
git clone YOUR_REPO_URL
cd newtons-lab
```

2. **Install dependencies**
```bash
npm install
```

3. **Build for production**
```bash
npm run build
```

4. **Start with PM2**
```bash
npm install -g pm2
pm2 start npm --name "newtons-lab" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx (optional)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Environment Variables

Create `.env.local` file (if needed for future API integration):

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Payment Gateway (future)
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Database (future)
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

**Important:** Never commit `.env.local` to git!

---

## 📊 Pre-Deployment Checklist

### Content Updates
- [ ] Replace placeholder logo in Header component
- [ ] Update contact information in Footer
- [ ] Update phone numbers (1800-123-4567)
- [ ] Update email addresses
- [ ] Update location (Chennai 600000)
- [ ] Add real test data in `lib/data/tests.json`
- [ ] Add real images to `/public` folder

### SEO & Metadata
- [ ] Update site title in `app/layout.tsx`
- [ ] Update meta description
- [ ] Update keywords
- [ ] Add Open Graph image (`/public/og-image.png`)
- [ ] Add favicon (`/public/favicon.ico`)
- [ ] Verify robots.txt (if needed)
- [ ] Add sitemap.xml (if needed)

### Performance
- [ ] Optimize images (use WebP format)
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check Lighthouse score
- [ ] Verify lazy loading works
- [ ] Test dark mode toggle

### Functionality
- [ ] Test all buttons and links
- [ ] Test shopping cart functionality
- [ ] Test theme toggle persistence
- [ ] Test mobile navigation
- [ ] Test search functionality (when implemented)
- [ ] Verify responsive design on all breakpoints

### Security
- [ ] Remove console.log statements
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS (when API is added)
- [ ] Add rate limiting (when API is added)
- [ ] Set security headers

---

## 🔍 Testing Before Deploy

### Local Production Build
```bash
# Build
npm run build

# Test production build locally
npm start

# Open http://localhost:3000
```

### Check Build Output
```bash
# Should see:
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### Performance Testing
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse
lighthouse http://localhost:3000 --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 📱 Domain Configuration

### Custom Domain Setup

#### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   - Or use CNAME to vercel.app

#### On Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS:
   - Type: CNAME
   - Name: www
   - Value: your-site.netlify.app

---

## 🔐 SSL Certificate

### Automatic (Vercel/Netlify)
- SSL is automatically provisioned
- No configuration needed

### Manual (Self-Hosted)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📈 Analytics Setup (Optional)

### Google Analytics

1. **Get GA4 Tracking ID**
- Go to [analytics.google.com](https://analytics.google.com)
- Create property
- Get Measurement ID (G-XXXXXXXXXX)

2. **Add to Next.js**

Create `app/GoogleAnalytics.tsx`:
```tsx
'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
```

Add to `app/layout.tsx`:
```tsx
import GoogleAnalytics from './GoogleAnalytics';

// In body
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

---

## 🚨 Monitoring & Maintenance

### Error Tracking
Consider adding:
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Datadog](https://www.datadoghq.com) - Performance monitoring

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com) - Free uptime monitoring
- [Pingdom](https://www.pingdom.com) - Advanced monitoring

### Performance Monitoring
- [Vercel Analytics](https://vercel.com/analytics) - Built-in (if using Vercel)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://www.webpagetest.org)

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test # if you have tests
```

---

## 📦 Build Optimization

### Image Optimization
```bash
# Install sharp for optimized images
npm install sharp
```

### Bundle Analysis
```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

---

## 🎯 Post-Deployment

### Immediate Actions
1. Test all functionality on live site
2. Submit sitemap to Google Search Console
3. Set up Google Analytics
4. Test on multiple devices
5. Share with team for feedback

### Week 1
1. Monitor error logs
2. Check analytics data
3. Gather user feedback
4. Fix any reported issues
5. Optimize based on real usage

### Ongoing
1. Regular security updates
2. Performance monitoring
3. Content updates
4. Feature additions
5. User feedback implementation

---

## 📞 Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## ✅ Deployment Complete!

Once deployed, your Newton's Lab application will be live and accessible to users worldwide. Monitor performance, gather feedback, and iterate based on user needs.

**Next Steps:**
1. Backend API integration
2. Payment gateway setup
3. User authentication
4. Booking system
5. Report management
6. Admin dashboard

Good luck with your launch! 🚀
