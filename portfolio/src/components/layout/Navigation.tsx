import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          Portfolio
        </Link>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
