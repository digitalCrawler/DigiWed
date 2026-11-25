import type { MetadataRoute } from "next";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";
import { VIDEO_TEMPLATES } from "@/lib/videoTemplates";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/videos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/support`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cats: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${site.url}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tpls: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${site.url}/templates/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const vids: MetadataRoute.Sitemap = VIDEO_TEMPLATES.map((v) => ({
    url: `${site.url}/videos/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...statics, ...cats, ...tpls, ...vids];
}
