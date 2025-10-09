import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all scans
export const getAllScans = query({
  handler: async (ctx) => {
    return await ctx.db.query("scans").collect();
  },
});

// Query to get all scans for a specific light
export const getScansForLight = query({
  args: { lightId: v.id("lights") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("scans")
      .withIndex("by_lightId", (q) => q.eq("lightId", args.lightId))
      .collect();
  },
});

// Mutation to add a new scan
export const addScan = mutation({
  args: {
    lightId: v.id("lights"),
    date: v.array(v.string()),
    latency: v.number(),
    error: v.boolean(),
  },
  handler: async (ctx, args) => {
    const scanId = await ctx.db.insert("scans", {
      lightId: args.lightId,
      date: args.date,
      latency: args.latency,
      error: args.error,
    });
    return scanId;
  },
});

