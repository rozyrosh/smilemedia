"use client";

import { useEffect, useState } from "react";
import { MediaPicker, type MediaItem } from "@/components/admin/MediaPicker";

type HeroSlideDraft = {
  key: string;
  titleLine1: string;
  titleLine2: string;
  imageUrl: string;
  mediaId?: string | null;
  picking?: boolean;
};

export default function HeroAdminPage() {
  const [form, setForm] = useState({
    heroEyebrow: "",
    heroSub: "",
  });
  const [slides, setSlides] = useState<HeroSlideDraft[]>([]);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const [settingsRes, slidesRes] = await Promise.all([
      fetch("/api/admin/settings"),
      fetch("/api/admin/hero-slides"),
    ]);

    let settings: {
      heroEyebrow?: string;
      heroSub?: string;
    } | null = null;
    try {
      if (settingsRes.ok) settings = await settingsRes.json();
    } catch {
      settings = null;
    }

    let rows: Array<{
      id: string;
      titleLine1: string;
      titleLine2: string;
      imageUrl: string;
      mediaId?: string | null;
    }> = [];
    try {
      if (slidesRes.ok) {
        const data = await slidesRes.json();
        if (Array.isArray(data)) rows = data;
      }
    } catch {
      rows = [];
    }

    if (settings) {
      setForm({
        heroEyebrow: settings.heroEyebrow || "",
        heroSub: settings.heroSub || "",
      });
    }

    setSlides(
      rows.map((s) => ({
        key: s.id,
        titleLine1: s.titleLine1 || "",
        titleLine2: s.titleLine2 || "",
        imageUrl: s.imageUrl || "",
        mediaId: s.mediaId || null,
        picking: false,
      })),
    );
  }

  useEffect(() => {
    load();
  }, []);

  function updateSlide(key: string, patch: Partial<HeroSlideDraft>) {
    setSlides((prev) =>
      prev.map((s) => (s.key === key ? { ...s, ...patch } : s)),
    );
  }

  function moveSlide(key: string, dir: -1 | 1) {
    setSlides((prev) => {
      const i = prev.findIndex((s) => s.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function addSlide() {
    setSlides((prev) => [
      ...prev,
      {
        key: `new-${Date.now()}`,
        titleLine1: "NEW",
        titleLine2: "SLIDE",
        imageUrl: "",
        mediaId: null,
        picking: true,
      },
    ]);
  }

  function removeSlide(key: string) {
    setSlides((prev) => prev.filter((s) => s.key !== key));
  }

  function onPickImage(key: string, items: MediaItem[]) {
    const item = items[0];
    if (!item) return;
    updateSlide(key, {
      imageUrl: item.url,
      mediaId: item.id,
      picking: false,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (slides.some((s) => !s.imageUrl)) {
      setMsg("Every slide needs an image — upload or pick one");
      return;
    }
    setSaving(true);
    setMsg("");

    const settingsRes = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroEyebrow: form.heroEyebrow,
        heroSub: form.heroSub,
        heroHeadline1: slides[0]?.titleLine1 || "",
        heroHeadline2: slides[0]?.titleLine2 || "",
      }),
    });

    const slidesRes = await fetch("/api/admin/hero-slides", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slides: slides.map((s) => ({
          titleLine1: s.titleLine1,
          titleLine2: s.titleLine2,
          imageUrl: s.imageUrl,
          mediaId: s.mediaId || null,
        })),
      }),
    });

    setSaving(false);
    setMsg(
      settingsRes.ok && slidesRes.ok
        ? "Hero slider saved"
        : "Save failed — check login and try again",
    );
    if (settingsRes.ok && slidesRes.ok) await load();
  }

  return (
    <>
      <h1>Hero Section</h1>
      <p className="lead">
        Edit the shared eyebrow/description and each homepage slider slide —
        headline lines + background image.
      </p>

      <form onSubmit={save}>
        <div className="admin-card">
          <h3 style={{ marginTop: 0 }}>Shared text</h3>
          <div className="admin-field" style={{ marginBottom: 12 }}>
            <span>Eyebrow</span>
            <input
              value={form.heroEyebrow}
              onChange={(e) =>
                setForm({ ...form, heroEyebrow: e.target.value })
              }
            />
          </div>
          <div className="admin-field">
            <span>Description</span>
            <textarea
              rows={3}
              value={form.heroSub}
              onChange={(e) => setForm({ ...form, heroSub: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ margin: 0 }}>Slides ({slides.length})</h3>
            <button
              type="button"
              className="admin-btn secondary"
              onClick={addSlide}
            >
              Add slide
            </button>
          </div>

          {!slides.length && (
            <p className="lead" style={{ marginBottom: 0 }}>
              No slides yet. Add one and pick an image from the Media Gallery.
            </p>
          )}

          {slides.map((slide, index) => (
            <div
              key={slide.key}
              className="admin-card"
              style={{ background: "#0b1224", marginBottom: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <strong style={{ letterSpacing: "0.04em" }}>
                  Slide {index + 1}
                </strong>
                <div className="admin-actions" style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="admin-btn secondary"
                    onClick={() => moveSlide(slide.key, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="admin-btn secondary"
                    onClick={() => moveSlide(slide.key, 1)}
                    disabled={index === slides.length - 1}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="admin-btn danger"
                    onClick={() => removeSlide(slide.key)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <div>
                  {slide.imageUrl ? (
                    <img
                      src={slide.imageUrl}
                      alt=""
                      className="admin-thumb"
                      style={{ width: "100%", height: 100, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="admin-thumb"
                      style={{
                        width: "100%",
                        height: 100,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        color: "var(--admin-muted)",
                      }}
                    >
                      No image
                    </div>
                  )}
                  <button
                    type="button"
                    className="admin-btn secondary"
                    style={{ width: "100%", marginTop: 8 }}
                    onClick={() =>
                      updateSlide(slide.key, { picking: !slide.picking })
                    }
                  >
                    {slide.picking ? "Hide gallery" : "Change image"}
                  </button>
                </div>

                <div>
                  <div className="admin-field" style={{ marginBottom: 12 }}>
                    <span>Headline line 1</span>
                    <input
                      value={slide.titleLine1}
                      onChange={(e) =>
                        updateSlide(slide.key, { titleLine1: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <span>Headline line 2 (red)</span>
                    <input
                      value={slide.titleLine2}
                      onChange={(e) =>
                        updateSlide(slide.key, { titleLine2: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {slide.picking && (
                <div style={{ marginTop: 14 }}>
                  <p style={{ margin: "0 0 8px", fontSize: 13 }}>
                    Upload a new image or pick one from the Media Gallery
                  </p>
                  <MediaPicker
                    multiple={false}
                    allowUpload
                    selectedIds={slide.mediaId ? [slide.mediaId] : []}
                    onChange={(items) => onPickImage(slide.key, items)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="admin-actions">
          <button className="admin-btn" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save hero slider"}
          </button>
          {msg && <span className="admin-msg">{msg}</span>}
        </div>
      </form>
    </>
  );
}
