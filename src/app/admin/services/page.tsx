"use client";

import { useEffect, useState } from "react";
import { MediaPicker, type MediaItem } from "@/components/admin/MediaPicker";

type Service = {
  id: string;
  num: string;
  name: string;
  imageUrl: string;
  mediaId?: string | null;
  items: string[];
};

export default function ServicesAdminPage() {
  const [rows, setRows] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [picked, setPicked] = useState<MediaItem[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/services");
    setRows(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addService(e: React.FormEvent) {
    e.preventDefault();
    const media = picked[0];
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        imageUrl: media?.url || "",
        mediaId: media?.id || null,
        items: itemsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    });
    setName("");
    setItemsText("");
    setPicked([]);
    setMsg("Service card added");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this service card?")) return;
    await fetch("/api/admin/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  return (
    <>
      <h1>Our Services</h1>
      <p className="lead">Add new service cards to the homepage carousel.</p>

      <form className="admin-card" onSubmit={addService}>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Service name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Items (one per line)</span>
          <textarea
            rows={5}
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
          />
        </div>
        <p style={{ marginBottom: 8 }}>Pick image from gallery (optional)</p>
        <MediaPicker
          multiple={false}
          selectedIds={picked.map((p) => p.id)}
          onChange={setPicked}
        />
        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            Add service card
          </button>
          {msg && <span className="admin-msg">{msg}</span>}
        </div>
      </form>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Items</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.imageUrl ? <img src={r.imageUrl} alt="" /> : "—"}
                </td>
                <td>
                  {r.num} {r.name}
                </td>
                <td>{(r.items || []).join(", ")}</td>
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
