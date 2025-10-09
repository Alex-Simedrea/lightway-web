import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all lights
export const getAllLights = query({
  handler: async (ctx) => {
    return await ctx.db.query("lights").collect();
  },
});

// Query to get a specific light by ID
export const getLight = query({
  args: { id: v.id("lights") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Query to get a light by lightId string
export const getLightByLightId = query({
  args: { lightId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lights")
      .withIndex("by_lightId", (q) => q.eq("lightId", args.lightId))
      .first();
  },
});

// Mutation to add a new light
export const addLight = mutation({
  args: {
    lightId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const lightId = await ctx.db.insert("lights", {
      lightId: args.lightId,
      name: args.name,
    });
    return lightId;
  },
});

// Mutation to delete a light
export const deleteLight = mutation({
  args: { id: v.id("lights") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

