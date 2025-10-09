import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lights: defineTable({
    lightId: v.string(),
    name: v.string(),
  }).index("by_lightId", ["lightId"]),
  
  scans: defineTable({
    lightId: v.id("lights"),
    date: v.array(v.string()),
    latency: v.number(),
    error: v.boolean(),
  }).index("by_lightId", ["lightId"]),
});

