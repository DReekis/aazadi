import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page section-band">
      <div className="soft-card max-w-2xl p-8">
        <p className="eyebrow">Public record not found</p>
        <h1 className="font-editorial mt-2 text-4xl font-black text-obsidian">This page is not in the archive.</h1>
        <p className="mt-3 text-muted">The record may have moved, or the route may be incomplete.</p>
        <Link className="button-primary mt-6" href="/">
          Return home
        </Link>
      </div>
    </div>
  );
}
