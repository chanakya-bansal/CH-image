"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [files, setFiles] = useState<{ id: string; data: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const res = await fetch("/api/download");
        const data = await res.json();
        setFiles(data.urls || []);
      } catch (err) {
        console.error("Failed to fetch URLs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, []);

  const handleClick = (id: string) => {
    // 1. Open in new tab
    window.open(`/api/view/${id}`, "_blank");

    // 2. Trigger hidden download in background
    const link = document.createElement("a");
    link.href = `/api/download/${id}`;
    link.download = `${id}.png`; // filename hint
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!files.length) {
    return <p className="text-center mt-10">No files found.</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Files</h1>
      <ul className="space-y-4">
        {files.map(({ id, data }) => (
          <li
            key={id}
            className="p-4 "
          >
            <button
              onClick={() => handleClick(id)}
              className="text-blue-600 hover:underline"
            >
              {data.slice(-6)}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
