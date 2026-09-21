import { footerCopy } from '../../data/memories';

export default function Footer() {
  return (
    <footer className="relative w-full bg-iron">
      <div className="section-divider bg-concrete/20" />
      <div className="max-w-site mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-10">
          <div>
            <p className="font-display text-[26px] font-normal tracking-tight text-concrete">
              MPI<span className="text-concrete">.</span>
            </p>
            <p className="mt-2 font-display text-[13px] font-normal uppercase tracking-[0.2em] text-concrete/50">
              Class of {footerCopy.year}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="space-y-2">
              {[
                { href: '#story', label: 'Story' },
                { href: '#gallery', label: 'Gallery' },
                { href: '#class-of-2024', label: 'Class of 2024' },
                { href: '#suka', label: 'Suka' },
                { href: '#duka', label: 'Duka' },
                { href: '#members', label: 'Members' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-display text-[15px] font-normal tracking-tight text-concrete/60 hover:text-concrete transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-[13px] font-normal uppercase tracking-[0.2em] text-concrete/50 mb-3">
              Connect
            </p>
            <ul className="space-y-2">
              {footerCopy.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="font-display text-[15px] font-normal tracking-tight text-concrete/60 hover:text-concrete transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-[12px] font-normal text-concrete/40">
              {footerCopy.credit}
            </p>
          </div>
        </div>

        <p className="mt-12 text-center font-display text-[12px] font-normal uppercase tracking-[0.25em] text-concrete/30">
          &copy; {new Date().getFullYear()} — Built with memory.
        </p>
      </div>
    </footer>
  );
}
