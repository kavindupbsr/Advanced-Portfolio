import type { ReactNode } from 'react';
import Link from 'next/link';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold tracking-tight text-foreground">
            Portfolio
          </Link>
          <nav className="flex items-center gap-4 text-sm text-text-muted">
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-content flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} Portfolio. All rights reserved.
      </footer>
    </>
  );
}
