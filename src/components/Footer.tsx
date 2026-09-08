import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-8 text-xs text-soft">
      <div className="section-pad mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} Himanshu Bharti. All rights reserved.</p>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <Link
            to="/blogs"
            className="text-soft transition-colors hover:text-brand-400 hover:underline"
          >
            Blogs
          </Link>
          <span>•</span>
          <Link
            to="/privacy"
            className="text-soft transition-colors hover:text-brand-400 hover:underline"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            to="/terms"
            className="text-soft transition-colors hover:text-brand-400 hover:underline"
          >
            Terms &amp; Conditions
          </Link>
        </div>
        <p className="font-mono text-[11px]">Meta App Review Compliant</p>
      </div>
    </footer>
  );
}
