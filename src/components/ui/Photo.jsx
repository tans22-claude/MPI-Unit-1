/**
 * Photo — visual placeholder + image wrapper.
 *
 * Renders an actual <img> when `src` resolves, otherwise a styled gradient
 * placeholder with the alt text rendered as a label.
 *
 * To enable real photos:
 *   1. Drop WebP/AVIF files into /public/images/<section>/
 *   2. Update src in /src/data/*.js
 *   3. The placeholder will be replaced automatically by the <img>.
 *
 * Props:
 *   - src:    image path (relative to /public)
 *   - alt:    alt text (a11y)
 *   - label:  short caption shown on placeholder
 *   - tone:   "warm" | "cool" | "neutral" | "duka" (gradient tone)
 *   - className: extra classes for the wrapper
 *   - aspect: "auto" | "square" | "wide" | "tall" (placeholder shape)
 *   - eager:  if true, image is loaded eagerly (use only for hero)
 */
export default function Photo({
  src,
  alt,
  label = '',
  tone = 'neutral',
  className = '',
  aspect = 'auto',
  eager = false,
}) {
  const tones = {
    warm:    'from-[#3a2917] via-[#5b4a36] to-[#d9a679]/40',
    cool:    'from-[#1a2230] via-[#2c3a52] to-[#7d8aa1]/40',
    neutral: 'from-[#2c2117] via-[#3a2f22] to-[#5b4a36]/50',
    duka:    'from-[#0a0604] via-[#1a120a] to-[#2c2117]/50',
  };
  const aspects = {
    auto:   'aspect-[4/5]',
    square: 'aspect-square',
    wide:   'aspect-[16/9]',
    tall:   'aspect-[3/4]',
  };

  return (
    <figure
      className={`relative overflow-hidden rounded-md ${aspects[aspect] ?? aspects.auto} ${className}`}
    >
      {/* Placeholder gradient (always rendered, behind <img> if present) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${tones[tone] ?? tones.neutral}`}
      />
      {/* Subtle noise/grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />
      {/* Real <img> overlay — when photo file exists */}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
      />
      {/* Label (only visible on placeholder) */}
      {label && (
        <figcaption className="absolute bottom-3 left-3 right-3 text-xs uppercase tracking-widest text-ink-100/70 mix-blend-difference">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
