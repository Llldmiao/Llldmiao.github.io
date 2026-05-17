import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(["seed", "draft", "published"]).default("published"),
    kind: z.enum(["note", "essay", "lab"]).default("note"),
    tags: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.url(),
    category: z.array(z.enum(["ai", "market", "utility", "writing", "system"])),
    featured: z.boolean().default(false),
    order: z.number().default(99)
  })
});

export const collections = { notes, projects };
