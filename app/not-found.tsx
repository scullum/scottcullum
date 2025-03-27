import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl md:text-8xl mb-6 glitch" data-text="404">
        404
      </h1>
      <p className="text-xl md:text-2xl mb-8">Page not found</p>
      <p className="text-accent font-mono mb-8">
        We prototype clarity, but this page is definitely unclear.
      </p>
      <Link
        href="/"
        className="punk-border inline-flex items-center justify-center px-8 py-3 text-lg font-mono uppercase bg-black text-white hover:bg-accent hover:text-black transition-colors duration-200 no-underline"
      >
        Back to home
      </Link>
    </div>
  );
}
