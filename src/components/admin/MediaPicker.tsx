"use client";

import { useEffect, useId, useState } from "react";

export type MediaItem = {
  id: string;
  url: string;
  filename: string;
  alt: string;
};

type Props = {
  selectedIds?: string[];
  multiple?: boolean;
  allowUpload?: boolean;
  onChange: (items: MediaItem[]) => void;
};

export function MediaPicker({
  selectedIds = [],
  multiple = true,
  allowUpload = true,
  onChange,
}: Props) {
  const inputId = useId();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedIds);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      return Array.isArray(data) ? (data as MediaItem[]) : [];
    } catch {
      setItems([]);
      return [];
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setSelected(selectedIds);
  }, [selectedIds]);

  function applySelection(nextIds: string[], pool: MediaItem[]) {
    setSelected(nextIds);
    onChange(pool.filter((i) => nextIds.includes(i.id)));
  }

  function toggle(id: string) {
    let next: string[];
    if (multiple) {
      next = selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id];
    } else {
      next = selected.includes(id) ? [] : [id];
    }
    applySelection(next, items);
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setUploadMsg("");

    const uploaded: MediaItem[] = [];
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      form.append("alt", file.name);
      const res = await fetch("/api/admin/media", { method: "POST", body: form });
      if (res.ok) {
        const media = (await res.json()) as MediaItem;
        uploaded.push(media);
      }
    }

    const pool = await load();
    setUploading(false);
    e.target.value = "";

    if (!uploaded.length) {
      setUploadMsg("Upload failed");
      return;
    }

    setUploadMsg(
      uploaded.length === 1 ? "Uploaded — selected" : `Uploaded ${uploaded.length}`,
    );

    if (multiple) {
      const next = [...new Set([...selected, ...uploaded.map((u) => u.id)])];
      applySelection(next, pool);
    } else {
      applySelection([uploaded[uploaded.length - 1].id], pool);
    }
  }

  return (
    <div>
      {allowUpload && (
        <div style={{ marginBottom: 12 }}>
          <label className="admin-field" htmlFor={inputId}>
            Upload new image
            <input
              id={inputId}
              type="file"
              accept="image/*"
              multiple={multiple}
              disabled={uploading}
              onChange={onUpload}
            />
          </label>
          {uploading && <p className="admin-msg">Uploading…</p>}
          {!uploading && uploadMsg && <p className="admin-msg">{uploadMsg}</p>}
        </div>
      )}

      <div className="admin-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggle(item.id)}
            style={{ background: "none", border: "none", padding: 0 }}
            title={item.filename}
          >
            <img
              src={item.url}
              alt={item.alt || item.filename}
              className={`admin-thumb ${selected.includes(item.id) ? "selected" : ""}`}
            />
          </button>
        ))}
        {!items.length && !uploading && (
          <p className="lead">
            No gallery images yet. Upload one above or in Media Gallery.
          </p>
        )}
      </div>
    </div>
  );
}
