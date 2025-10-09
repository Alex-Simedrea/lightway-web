# 🔧 Quick Fix for Vercel Build Error

## The Problem
```
Module not found: Can't resolve '@convex/_generated/api'
```

## ✅ The Solution

I've fixed the imports and updated the configuration. Here's what you need to do:

### Step 1: Commit the Generated Files

The `convex/_generated/` folder is now allowed in git (I updated `.gitignore`). Commit these files:

```bash
git add convex/_generated/
git add .
git commit -m "Fix Vercel build: commit Convex generated files"
git push
```

### Step 2: Set Environment Variable in Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name:** `NEXT_PUBLIC_CONVEX_URL`
   - **Value:** Your production Convex URL (from `bun run convex:deploy`)
   - **Environments:** All (Production, Preview, Development)

### Step 3: Redeploy

After committing and setting the environment variable:
1. Go to Vercel dashboard → Deployments
2. Click "Redeploy" on the latest deployment

## 🎯 What Changed

1. ✅ Fixed imports from `@convex/_generated/api` to use relative paths
2. ✅ Updated `.gitignore` to allow committing `convex/_generated/` files
3. ✅ Simplified build configuration

## 📋 Files Modified

- `/src/app/(app)/lights/page.tsx` - Changed import path
- `/src/app/api/scans/route.ts` - Changed import path
- `/.gitignore` - Uncommented `convex/_generated/`
- `/tsconfig.json` - Removed unused `@convex/*` alias

## ✨ That's It!

Your Vercel build should now work. The generated Convex files will be part of your repository, which is the recommended approach for production deployments.

---

📚 For complete deployment instructions, see `VERCEL_DEPLOYMENT.md`

