import type { Metadata } from "next";
import { DesignGallery } from "@/components/DesignGallery";
import { getDesignsContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Designs — Smile Media",
  description:
    "Full gallery of flyers, banners, brand identities and digital campaigns by Smile Media.",
};

export default async function DesignsPage() {
  const designs = await getDesignsContent();
  return <DesignGallery designs={designs} />;
}
