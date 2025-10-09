# 🚀 Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, make sure you have:
1. ✅ A Convex account and deployment (run `bun run convex:dev` locally first)
2. ✅ Committed the `convex/_generated/` files to git
3. ✅ Your Convex production deployment URL

## 📋 Steps to Deploy

### 1. Get Your Convex Production URL

First, deploy your Convex backend to production:

```bash
bun run convex:deploy
```

This will give you a production URL like: `https://your-project.convex.cloud`

### 2. Push Your Code to Git

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Add Convex integration"
git push
```

**Important:** The `convex/_generated/` folder should now be committed (we uncommented it in `.gitignore` for Vercel builds).

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure as follows:

### 4. Environment Variables in Vercel

In your Vercel project settings, add this environment variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://your-project.convex.cloud` | Production, Preview, Development |

**How to add:**
1. Go to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Add `NEXT_PUBLIC_CONVEX_URL` with your production Convex URL
4. Select all environments (Production, Preview, Development)
5. Click "Save"

### 5. Redeploy

After adding environment variables:
1. Go to "Deployments" tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

## ✅ Verification

Once deployed, verify everything works:

1. **Visit your Vercel URL** (e.g., `https://your-app.vercel.app`)
2. **Go to the Lights page** - should show your lights from Convex
3. **Test the API** - POST to `https://your-app.vercel.app/api/scans`

```bash
curl -X POST https://your-app.vercel.app/api/scans \
  -H "Content-Type: application/json" \
  -d '{
    "lightId": "LGT-1A2B3C",
    "date": ["2024-01-15T10:30:00Z"],
    "latency": 95,
    "error": false
  }'
```

## 🔧 Troubleshooting

### Build Fails: "Module not found: @convex/_generated/api"

**Solution:** Make sure:
1. `convex/_generated/` is committed to git (check `.gitignore`)
2. Run `git add convex/_generated/` and commit
3. Push and redeploy

### Data Not Showing

**Solution:** Check:
1. `NEXT_PUBLIC_CONVEX_URL` is set correctly in Vercel
2. It points to your **production** Convex deployment (not dev)
3. Redeploy after setting environment variables

### API Returns 500 Error

**Solution:** Check:
1. Convex deployment is live
2. Environment variable is correct
3. Check Vercel function logs for details

## 🌍 Production Checklist

- [ ] Convex backend deployed to production
- [ ] `convex/_generated/` files committed to git
- [ ] `NEXT_PUBLIC_CONVEX_URL` set in Vercel
- [ ] Site deployed and accessible
- [ ] Lights page shows data from Convex
- [ ] API endpoint accepts POST requests
- [ ] Real-time updates working

## 📝 Important Notes

1. **Convex Files:** The `convex/_generated/` folder is now committed to git for Vercel builds to work
2. **Environment Variables:** Always use production Convex URL for production deployments
3. **API Keys:** For production, consider adding authentication to your API routes
4. **Rate Limiting:** Add rate limiting to prevent abuse of public API endpoints

## 🔄 Updating Your Deployment

When you make changes:

```bash
# 1. Update Convex backend
bun run convex:deploy

# 2. Commit and push changes
git add .
git commit -m "Update feature"
git push

# 3. Vercel will auto-deploy
```

---

🎉 **Your app is now live on Vercel with Convex!**

