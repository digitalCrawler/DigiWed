import { site } from "./site";

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${site.url}${t.path}`,
    })),
  };
}

export function creativeWorkJsonLd(opts: {
  name: string; description: string; path: string; keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    keywords: opts.keywords.join(", "),
    genre: "Wedding invitation template",
    isAccessibleForFree: true,
    license: `${site.url}/terms`,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    inLanguage: ["en-IN", "hi-IN"],
  };
}
