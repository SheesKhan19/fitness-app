# Deployment Guide for FitSphere

## 🚀 Deploying to Production

### Prerequisites
- GitHub account (for version control)
- Vercel account (for frontend)
- Railway/Render/Heroku account (for backend)
- MongoDB Atlas account (cloud database)

---

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial FitSphere commit"
git remote add origin https://github.com/YOUR_USERNAME/fitsphere.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Select `frontend` as root directory
5. Set environment variables:
   - `VITE_API_URL`: `https://your-backend-url.com/api`
6. Click Deploy

### Step 3: Configure Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as shown

---

## Backend Deployment (Railway/Render)

### Option A: Railway

1. Push backend code to GitHub

2. Go to https://railway.app
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Choose your repository
6. Select `backend` as root directory
7. Set environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   PORT=5000
   NODE_ENV=production
   ```
8. Deploy

### Option B: Render

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (same as above)
6. Deploy

---

## Environment Variables for Production

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitsphere
JWT_SECRET=use_a_long_random_string_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

---

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create an account
3. Create a new project
4. Create a cluster (M0 free tier for testing)
5. Configure network access:
   - Add IP address (or 0.0.0.0/0 for all)
6. Create database user with credentials
7. Copy connection string
8. Replace placeholders with actual username/password
9. Use connection string in `MONGODB_URI`

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd backend
        npm install
    
    - name: Run tests
      run: |
        cd backend
        npm test
      continue-on-error: true
    
    - name: Deploy to production
      run: echo "Deploying..."
```

---

## Performance Optimization

### Frontend Optimization
```javascript
// Code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Image optimization
import { ImageOptimization } from '@vercel/og'

// Caching
app.use((req, res) => {
  res.set('Cache-Control', 'public, max-age=3600')
})
```

### Backend Optimization
```javascript
// Rate limiting
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use('/api/', limiter)

// Compression
import compression from 'compression'
app.use(compression())
```

---

## Monitoring & Logging

### Services to Use
- **Frontend**: Vercel Analytics
- **Backend**: LogRocket, Sentry, or Datadog
- **Database**: MongoDB Atlas Monitoring
- **Performance**: New Relic

### Example Sentry Setup
```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your_sentry_dsn",
  environment: process.env.NODE_ENV,
})
```

---

## Security Checklist

- ✅ Use HTTPS for all connections
- ✅ Set strong JWT secret
- ✅ Implement rate limiting
- ✅ Add CORS headers
- ✅ Validate all input
- ✅ Use environment variables for secrets
- ✅ Enable MongoDB IP whitelisting
- ✅ Add SSL certificates
- ✅ Implement CSRF protection
- ✅ Add security headers
- ✅ Regular security audits
- ✅ Keep dependencies updated

---

## Troubleshooting

### CORS Errors
```javascript
// Add to backend
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
```

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Test with MongoDB Compass

### Deployment Failures
- Check logs in deployment platform
- Verify environment variables
- Ensure all dependencies are listed in package.json
- Test locally before pushing

---

## Rollback Strategy

1. Keep previous version deployed
2. Use GitHub branches for versioning
3. Test in staging environment first
4. Have database backup strategy

---

## Cost Estimation (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel (Frontend) | 5 projects | Free |
| Railway/Render (Backend) | $5 credit | $5-50 |
| MongoDB Atlas | 512MB | Free-$57 |
| **Total** | - | ~$5-50 |

---

## Further Optimization

1. **CDN**: Use Cloudflare for caching
2. **Images**: Compress with TinyPNG/ImageOptim
3. **Database**: Add Redis caching
4. **API**: Implement GraphQL
5. **Monitoring**: Set up alerts

---

**Deployment Complete! Monitor your application regularly.** 🎉
