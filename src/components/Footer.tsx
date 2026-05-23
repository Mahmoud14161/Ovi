export default function Footer() {
  return (
    <footer className="bg-brand-deep text-brand-surface py-12 border-t border-brand-surface/10">
      <div className="max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif italic text-3xl mb-2">The OVi.</h3>
          <p className="font-light text-brand-surface/60 text-sm tracking-wide">
            Embrace the freshness of Fruity & Lovely.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-end">
          <p className="text-sm font-light text-brand-surface/50 text-center lg:text-right">
            &copy; {new Date().getFullYear()} The OVi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
