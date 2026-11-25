import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory, getTemplate } from "@/lib/templates";
import Editor from "@/components/Editor";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  const c = getCategory(t.category);
  return {
    title: `Edit “${t.name}” — ${c?.name} Card Editor`,
    description: `Edit the ${t.name} ${c?.name.toLowerCase()} invitation card online: change names, date, venue, colours and fonts, then download HD PNG or PDF free.`,
    alternates: { canonical: `/editor/${t.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function EditorPage({ params }: Props) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();
  return <Editor template={t} />;
}
