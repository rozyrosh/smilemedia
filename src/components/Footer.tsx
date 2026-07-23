import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">
        <Image
          src="/assets/images/logo2.png"
          alt={brand.name}
          width={140}
          height={40}
        />
      </div>
      <p className="footer-copy">
        © {brand.year} {brand.name} Agency. All rights reserved. ·{" "}
        {brand.location}
      </p>
      <ul className="footer-links">
        <li>
          <Link href="#services">Services</Link>
        </li>
        <li>
          <Link href="#success-stories">Stories</Link>
        </li>
        <li>
          <Link href="#web-work">Web</Link>
        </li>
        <li>
          <Link href="#difference">About</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>
    </footer>
  );
}
