"use client";

import { useEffect, useState } from "react";
import { MediaPicker, type MediaItem } from "@/components/admin/MediaPicker";

type Site = {
  id: string;
  num: string;
  url: string;
  domain: string;
  tag: string;
  imageUrl: string;
  desc: string;
};

export default function WebAdminPage() {
  const [rows, setRows] = useState<Site[]>([]);
  const [form, setForm] = useState({
    domain: "",
    url: "",
    tag: "",
    desc: "",
  });
  const [picked, setPicked] = useState<MediaItem[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/web");
    setRows(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addSite(e: React.FormEvent) {
    e.preventDefault();
    const media = picked[0];
    await fetch("/api/admin/web", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrl: media?.url || "",
        mediaId: media?.id || null,
      }),
    });
    setForm({ domain: "", url: "", tag: "", desc: "" });
    setPicked([]);
    setMsg("Web project added");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this web project?")) return;
    await fetch("/api/admin/web", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  return (
    <>
      <h1>Web Development</h1>
      <p className="lead">Add new website cards to the Websites We Built section.</p>

      <form className="admin-card" onSubmit={addSite}>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Domain</span>
          <input
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            required
          />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Live URL</span>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Tag</span>
          <input
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Description</span>
          <textarea
            rows={3}
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </div>
        <p style={{ marginBottom: 8 }}>Pick screenshot from gallery</p>
        <MediaPicker
          multiple={false}
          selectedIds={picked.map((p) => p.id)}
          onChange={setPicked}
        />
        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            Add web card
          </button>
          {msg && <span className="admin-msg">{msg}</span>}
        </div>
      </form>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Domain</th>
              <th>Tag</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.imageUrl ? <img src={r.imageUrl} alt="" /> : "—"}
                </td>
                <td>{r.domain}</td>
                <td>{r.tag}</td>
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
