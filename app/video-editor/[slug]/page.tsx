import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategory } from "@/lib/templates";
import { getVideoTemplate } from "@/lib/videoTemplates";
import VideoEditor from "@/components/VideoEditor";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideoTemplate(slug);
  if (!v) return {};
  const c = getCategory(v.category);
  return {
    title: `Edit “${v.name}” — ${c?.name} Video Editor`,
    description: `Edit the ${v.name} ${c?.name.toLowerCase()} invitation video: change names, date, venue, colours and animation, add music, then download a 1080×1920 clip free.`,
    alternates: { canonical: `/video-editor/${v.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function VideoEditorPage({ params }: Props) {
  const { slug } = await params;
  const v = getVideoTemplate(slug);
  if (!v) notFound();
  return <VideoEditor template={v} />;
}
