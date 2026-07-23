"use client";

import { useEffect, useState } from "react";

export type MediaItem = {
  id: string;
  url: string;
  filename: string;
  alt: string;
};

type Props = {
  selectedIds?: string[];
  multiple?: boolean;
  onChange: (items: MediaItem[]) => void;
};

export function MediaPicker({ selectedIds = [], multiple = true, onChange }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedIds);

  useEffect(() => {
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    setSelected(selectedIds);
  }, [selectedIds]);

  function toggle(id: string) {
    let next: string[];
    if (multiple) {
      next = selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id];
    } else {
      next = selected.includes(id) ? [] : [id];
    }
    setSelected(next);
    onChange(items.filter((i) => next.includes(i.id)));
  }

  return (
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
      {!items.length && (
        <p className="lead">No gallery images yet. Upload some in Media Gallery.</p>
      )}
    </div>
  );
}
