// components/Footer.tsx

"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 mt-16 py-8 px-4 flex flex-col items-center text-sm text-gray-500">
      <pre
        aria-hidden="true"
        className="mb-2 text-xs leading-none text-gray-400"
        style={{ fontFamily: "monospace" }}
      >{`
   (\\__/)
   (•ㅅ•)
   / 　 づ
      `}</pre>
      <div>
        © {new Date().getFullYear()} Aaditya Shete &middot; Designed with care
      </div>
      <div className="mt-4">
        Last updated Jan 2026
      </div>
    </footer>
  );
}
