"use client";

import { useEffect, useState } from "react";

export default function HeroAdminPage() {
  const [form, setForm] = useState({
    heroEyebrow: "",
    heroHeadline1: "",
    heroHeadline2: "",
    heroSub: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((s) => {
        if (!s) return;
        setForm({
          heroEyebrow: s.heroEyebrow || "",
          heroHeadline1: s.heroHeadline1 || "",
          heroHeadline2: s.heroHeadline2 || "",
          heroSub: s.heroSub || "",
        });
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMsg(res.ok ? "Hero saved" : "Save failed");
  }

  return (
    <>
      <h1>Hero Section</h1>
      <p className="lead">Edit titles and description on the homepage hero.</p>
      <form className="admin-card" onSubmit={save}>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Eyebrow</span>
          <input
            value={form.heroEyebrow}
            onChange={(e) => setForm({ ...form, heroEyebrow: e.target.value })}
          />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Headline line 1</span>
          <input
            value={form.heroHeadline1}
            onChange={(e) =>
              setForm({ ...form, heroHeadline1: e.target.value })
            }
          />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Headline line 2 (red)</span>
          <input
            value={form.heroHeadline2}
            onChange={(e) =>
              setForm({ ...form, heroHeadline2: e.target.value })
            }
          />
        </div>
        <div className="admin-field" style={{ marginBottom: 12 }}>
          <span>Description</span>
          <textarea
            rows={3}
            value={form.heroSub}
            onChange={(e) => setForm({ ...form, heroSub: e.target.value })}
          />
        </div>
        <div className="admin-actions">
          <button className="admin-btn" type="submit">
            Save hero
          </button>
          {msg && <span className="admin-msg">{msg}</span>}
        </div>
      </form>
    </>
  );
}
