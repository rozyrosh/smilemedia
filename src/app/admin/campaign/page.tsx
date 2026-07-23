"use client";

import { useEffect, useState } from "react";
import { MediaPicker, type MediaItem } from "@/components/admin/MediaPicker";

type Slide = { id: string; imageUrl: string; mediaId?: string | null };

export default function CampaignAdminPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [picked, setPicked] = useState<MediaItem[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/campaign");
    const data: Slide[] = await res.json();
    setSlides(data);
    setPicked(
      data
        .filter((s) => s.mediaId)
        .map((s) => ({
          id: s.mediaId as string,
          url: s.imageUrl,
          filename: "",
          alt: "",
        })),
    );
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const res = await fetch("/api/admin/campaign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slides: picked.map((p) => ({ mediaId: p.id, imageUrl: p.url })),
      }),
    });
    setMsg(res.ok ? "Campaign slider updated" : "Save failed");
    await load();
  }

  return (
    <>
      <h1>Campaign Slider</h1>
      <p className="lead">
        Screenshot 3 — pick images from the gallery for the cylinder carousel.
        No re-upload needed.
      </p>

      <div className="admin-card">
        <p style={{ marginBottom: 12 }}>
          Select gallery images (order = selection order left-to-right as saved)
        </p>
        <MediaPicker
          multiple
          selectedIds={picked.map((p) => p.id)}
          onChange={setPicked}
        />
        <div className="admin-actions">
          <button type="button" className="admin-btn" onClick={save}>
            Save slider images
          </button>
          {msg && <span className="admin-msg">{msg}</span>}
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginTop: 0 }}>Current slides ({slides.length})</h3>
        <div className="admin-grid">
          {slides.map((s) => (
            <img key={s.id} src={s.imageUrl} alt="" className="admin-thumb" />
          ))}
        </div>
      </div>
    </>
  );
}
