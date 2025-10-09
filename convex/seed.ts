import { internalMutation } from "./_generated/server";

/**
 * Seed the database with sample data.
 * Run this mutation from the Convex dashboard or using:
 * bunx convex run seed:seedData
 */
export const seedData = internalMutation({
  handler: async (ctx) => {
    // Clear existing data (optional - remove these lines if you want to keep existing data)
    const existingLights = await ctx.db.query("lights").collect();
    for (const light of existingLights) {
      await ctx.db.delete(light._id);
    }
    
    const existingScans = await ctx.db.query("scans").collect();
    for (const scan of existingScans) {
      await ctx.db.delete(scan._id);
    }

    // Add sample lights
    const light1 = await ctx.db.insert("lights", {
      lightId: "LGT-1A2B3C",
      name: "DPIT Information System - Light 1",
    });

    const light2 = await ctx.db.insert("lights", {
      lightId: "LGT-4D5E6F",
      name: "DPIT Information System - Light 2",
    });

    const light3 = await ctx.db.insert("lights", {
      lightId: "LGT-7G8H9I",
      name: "Navigation System - Light 1",
    });

    // Add sample scans for light 1
    await ctx.db.insert("scans", {
      lightId: light1,
      date: ["2024-01-15T10:30:00Z", "2024-01-15T14:22:00Z"],
      latency: 120,
      error: false,
    });

    await ctx.db.insert("scans", {
      lightId: light1,
      date: ["2024-01-16T09:15:00Z"],
      latency: 95,
      error: false,
    });

    // Add sample scans for light 2
    await ctx.db.insert("scans", {
      lightId: light2,
      date: ["2024-01-15T11:00:00Z"],
      latency: 250,
      error: true,
    });

    await ctx.db.insert("scans", {
      lightId: light2,
      date: ["2024-01-16T10:30:00Z", "2024-01-16T15:45:00Z"],
      latency: 88,
      error: false,
    });

    // Add sample scans for light 3
    await ctx.db.insert("scans", {
      lightId: light3,
      date: ["2024-01-15T08:00:00Z"],
      latency: 110,
      error: false,
    });

    console.log("✅ Database seeded successfully!");
    return {
      lightsCreated: 3,
      scansCreated: 5,
    };
  },
});

