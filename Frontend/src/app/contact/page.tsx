// app/contact/page.tsx
"use client";
import { Mail, Linkedin, FileText } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBlobs from "../components/AnimatedBlobs";
import { useChatOverflow } from "../lib/hooks/useChatOverflow";

const links = [
  {
    href: "https://drive.google.com/file/d/1RXU_kn3v-FHt8zt55SYcPZIExmXip2_B/view?usp=sharing",
    label: "Resume",
    icon: FileText,
  },
  {
    href: "https://www.linkedin.com/in/aadityashete",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:aadityashete@outlook.com",
    label: "Email",
    icon: Mail,
  },
];

export default function Contact() {
  const { chatOpen } = useChatOverflow();
  return (
    <main className="h-[70vh] flex flex-col justify-center items-center  px-6">
       {!chatOpen && (
              <AnimatedBlobs expanded={false} loading={false} move={true} />
            )}
      <ul className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center items-center z-10">
        {links.map(({ href, label, icon: Icon }) => (
          <motion.li
            key={label}
            whileHover={{
              scale: 1.04,
              y: -4,
              boxShadow: "0 8px 32px rgba(99, 102, 241, 0.10)", // indigo-500 shadow
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="w-full md:w-1/3"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 px-8 py-8 rounded-xl border border-zinc-200 bg-white text-fontprimary hover:border-indigo-500 hover:bg-indigo-50 transition-colors shadow-sm"
              style={{ textDecoration: "none", minHeight: 160 }}
            >
              <Icon size={32} strokeWidth={1.5} className="text-indigo-500 " />
              <span>{label}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}
