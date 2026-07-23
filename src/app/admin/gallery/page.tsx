"use client";

import { useEffect, useState } from "react";

type MediaItem = { id: string; url: string; filename: string; alt: string };

export default function GalleryAdminPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/media");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setMsg("");
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      form.append("alt", file.name);
      await fetch("/api/admin/media", { method: "POST", body: form });
    }
    setUploading(false);
    setMsg("Upload complete");
    e.target.value = "";
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this gallery image?")) return;
    await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  return (
    <>
      <h1>Media Gallery</h1>
      <p className="lead">
        Upload images here once. Then pick them for Creative Work, campaign
        slider, services, and web projects. The /designs page shows all creative
        work designs.
      </p>

      <div className="admin-card">
        <label className="admin-field">
          Upload images
          <input type="file" accept="image/*" multiple onChange={onUpload} />
        </label>
        {uploading && <p className="admin-msg">Uploading…</p>}
        {msg && <p className="admin-msg">{msg}</p>}
      </div>

      <div className="admin-grid">
        {items.map((item) => (
          <div key={item.id} className="admin-card" style={{ padding: 10 }}>
            <img src={item.url} alt={item.alt} className="admin-thumb" />
            <div style={{ fontSize: 12, marginTop: 8 }}>{item.filename}</div>
            <button
              type="button"
              className="admin-btn danger"
              style={{ marginTop: 8, width: "100%" }}
              onClick={() => remove(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
