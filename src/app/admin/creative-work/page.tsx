"use client";

import { useEffect, useState } from "react";
import { MediaPicker, type MediaItem } from "@/components/admin/MediaPicker";

const categories = ["Flyers", "Banners", "Branding", "Digital"];

type Design = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  showInPortfolio: boolean;
};

export default function CreativeWorkAdminPage() {
  const [rows, setRows] = useState<Design[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Digital");
  const [showInPortfolio, setShowInPortfolio] = useState(true);
  const [picked, setPicked] = useState<MediaItem[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/designs");
    setRows(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addDesign(e: React.FormEvent) {
    e.preventDefault();
    if (!picked.length) {
      setMsg("Pick at least one gallery image");
      return;
    }
    for (const media of picked) {
      await fetch("/api/admin/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || media.filename || "Design",
          category,
          mediaId: media.id,
          imageUrl: media.url,
          showInPortfolio,
        }),
      });
    }
    setTitle("");
    setPicked([]);
    setMsg("Added to Creative Work / gallery");
    await load();
  }

  async function togglePortfolio(row: Design) {
    await fetch("/api/admin/designs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, showInPortfolio: !row.showInPortfolio }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this design?")) return;
    await fetch("/api/admin/designs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  return (
    <>
      <h1>Creative Work</h1>
      <p className="lead">
        Add designs by picking from the media gallery. Items appear on OUR
        ARTISTRY (if enabled) and all designs load on /designs (screenshot 6).
      </p>

      <form className="admin-card" onSubmit={addDesign}>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Title (optional — uses filename if empty)</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={showInPortfolio}
            onChange={(e) => setShowInPortfolio(e.target.checked)}
          />
          Show in homepage Creative Work (OUR ARTISTRY)
        </label>
        <p style={{ marginBottom: 8 }}>Pick from gallery</p>
        <MediaPicker
          multiple
          selectedIds={picked.map((p) => p.id)}
          onChange={setPicked}
        />
        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            Add selected images
          </button>
          {msg && <span className="admin-msg">{msg}</span>}
        </div>
      </form>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Homepage</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <img src={r.imageUrl} alt="" />
                </td>
                <td>{r.title}</td>
                <td>{r.category}</td>
                <td>
                  <button
                    type="button"
                    className="admin-btn secondary"
                    onClick={() => togglePortfolio(r)}
                  >
                    {r.showInPortfolio ? "Yes" : "No"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="admin-btn danger"
                    onClick={() => remove(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
