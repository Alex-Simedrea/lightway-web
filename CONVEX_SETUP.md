# Convex Setup Instructions

Convex has been integrated into your Next.js project! Follow these steps to connect your Convex backend.

## ⚡ TL;DR - Quick Start Commands

```bash
# Terminal 1: Start Convex dev server (creates your backend)
bun run convex:dev

# Terminal 2: Start Next.js dev server
bun run dev

# Optional: Add sample data
bunx convex run seed:seedData
```

## 🚀 Detailed Setup

### 1. Initialize Convex Development Server

Run the following command to start the Convex development server:

```bash
bun run convex:dev
# or
bunx convex dev
```

This command will:
- Guide you through creating a Convex account (if you don't have one)
- Create a new Convex project or link to an existing one
- Generate the `NEXT_PUBLIC_CONVEX_URL` environment variable
- Set up your `.env.local` file automatically
- Watch for changes to your Convex functions

### 2. Start Your Next.js Development Server

In a separate terminal, run:

```bash
bun run dev
```

## 📁 Project Structure

The Convex integration includes:

```
convex/
├── schema.ts          # Database schema definition
├── lights.ts          # Queries and mutations for lights
├── scans.ts          # Queries and mutations for scans
├── seed.ts           # Sample data seeding (optional)
├── tsconfig.json     # TypeScript configuration
└── _generated/       # Auto-generated types (DO NOT EDIT)
    ├── api.js
    ├── api.d.ts
    ├── server.js
    ├── server.d.ts
    └── dataModel.d.ts
```

## 📊 Database Schema

### Lights Table
- `lightId` (string) - Unique identifier for the light
- `name` (string) - Display name of the light
- Indexed by `lightId` for fast lookups

### Scans Table
- `lightId` (ID reference to lights) - Associated light
- `date` (array of strings) - Array of scan dates
- `latency` (number) - Scan latency in ms
- `error` (boolean) - Whether the scan had an error
- Indexed by `lightId` for fast lookups

## 🔧 Available Functions

### Lights Functions (`convex/lights.ts`)
- `getAllLights` - Query to get all lights
- `getLight` - Query to get a specific light by ID
- `getLightByLightId` - Query to get a light by lightId string
- `addLight` - Mutation to add a new light
- `deleteLight` - Mutation to delete a light

### Scans Functions (`convex/scans.ts`)
- `getScansForLight` - Query to get all scans for a specific light
- `addScan` - Mutation to add a new scan

## 🎯 Current Implementation

The lights page (`src/app/(app)/lights/page.tsx`) is now connected to Convex:
- Displays the count of lights from the database
- "Create" button adds a new light to the database
- Uses real-time reactive queries (updates automatically)

## 🔑 Environment Variables

After running `bunx convex dev`, your `.env.local` file will contain:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## 📝 Next Steps

1. **Add Sample Data**: 
   - Option A: Run the seed function to populate with sample data:
     ```bash
     bunx convex run seed:seedData
     ```
   - Option B: Use the Convex dashboard to manually add lights and scans

2. **Extend the UI**: Update the lights page to display the actual light data from Convex

3. **Add Scan Functionality**: Implement scan creation and display using the scans functions

4. **Deploy**: When ready, run the following to deploy to production:
   ```bash
   bun run convex:deploy
   # or
   bunx convex deploy
   ```

## 🔗 Useful Links

- [Convex Dashboard](https://dashboard.convex.dev)
- [Convex Documentation](https://docs.convex.dev)
- [Convex with Next.js](https://docs.convex.dev/quickstart/nextjs)

## 🐛 Troubleshooting

If you encounter issues:

1. **"Convex URL not found"**: Make sure you've run `bunx convex dev` and the `.env.local` file is created
2. **Type errors**: Run `bunx convex dev` to regenerate types
3. **Changes not reflecting**: Make sure both `bunx convex dev` and `bun run dev` are running

## 🎉 You're All Set!

Your Convex backend is ready to use. Start building your real-time application!

