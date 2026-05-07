import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404 error
        </p>
        <h1 className="mb-3 text-4xl font-bold text-foreground sm:text-5xl">Page not found</h1>
        <p className="mb-8 text-base text-text-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-strong"
          >
            Back to home
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-border px-5 py-2.5 font-semibold text-foreground transition hover:bg-surface"
          >
            Read blog
          </Link>
        </div>
      </div>
    </main>
  );
}
