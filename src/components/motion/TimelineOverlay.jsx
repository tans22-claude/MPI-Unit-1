const milestones = [
  { year: '2024', label: 'Where It Began', start: 0.00, end: 0.20, color: '#f19ec8' },
  { year: '2025', label: 'More Stories', start: 0.20, end: 0.40, color: '#3949ab' },
  { year: '2026', label: 'More Memories', start: 0.40, end: 0.60, color: '#2e7d32' },
  { year: '2027', label: 'Still Together', start: 0.60, end: 0.80, color: '#9c27b0' },
  { year: '2028', label: 'Where We Are', start: 0.80, end: 1.00, color: '#f9a825' },
];

export default function TimelineOverlay({ progress = 0 }) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-10" style={{ left: '25%' }}>
      <div className="flex flex-col items-start gap-0">
        {milestones.map((m, i) => {
          const center = (m.start + m.end) / 2;
          const dist = Math.abs(progress - center);
          const range = 0.18;
          const opacity = Math.max(0, 1 - dist / range);

          const isActive = progress >= m.start && progress < m.end;
          const isLast = i === milestones.length - 1 && progress >= m.end;
          const isPast = progress >= m.end;

          let lineFill = 0;
          if (progress >= m.end) {
            lineFill = 100;
          } else if (progress >= m.start) {
            lineFill = ((progress - m.start) / (m.end - m.start)) * 100;
          }

          const glowSize = isActive || isLast ? '0 0 20px 6px' : '0 0 10px 3px';
          const glowOpacity = isActive || isLast ? 0.8 : isPast ? 0.4 : 0;

          return (
            <div key={m.year} className="flex flex-col items-start">
              {/* Year */}
              <span
                className={`font-display leading-none tracking-tighter transition-all duration-300 ${
                  isActive || isLast
                    ? 'text-[clamp(2.8rem,6vw,4.5rem)] font-normal'
                    : 'text-[clamp(1.5rem,2.5vw,2rem)] font-normal'
                }`}
                style={{
                  color: m.color,
                  opacity: isActive || isLast ? 1 : isPast ? 0.7 : Math.max(0.4, opacity),
                  textShadow: (isActive || isLast)
                    ? `0 0 30px ${m.color}, 0 0 60px ${m.color}80`
                    : isPast
                    ? `0 0 12px ${m.color}60`
                    : 'none',
                }}
              >
                {m.year}
              </span>

              {/* Label */}
              <span
                className="font-display text-[12px] sm:text-[14px] font-normal tracking-tight mt-0.5 transition-all duration-300"
                style={{
                  color: m.color,
                  opacity: isActive || isLast ? 0.9 : isPast ? 0.5 : Math.max(0.25, opacity),
                  textShadow: (isActive || isLast)
                    ? `0 0 15px ${m.color}90`
                    : 'none',
                }}
              >
                {m.label}
              </span>

              {/* Dot + Line */}
              {i < milestones.length - 1 && (
                <div className="flex flex-col items-start my-1.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-[3px] transition-all duration-300"
                    style={{
                      backgroundColor: isActive || isLast ? m.color : isPast ? m.color : 'transparent',
                      borderColor: m.color,
                      opacity: isActive || isLast ? 1 : isPast ? 0.6 : 0.4,
                      boxShadow: (isActive || isLast)
                        ? `0 0 16px 5px ${m.color}cc, 0 0 30px 8px ${m.color}66`
                        : isPast
                        ? `0 0 8px 2px ${m.color}55`
                        : 'none',
                    }}
                  />
                  <div
                    className="relative w-[3px] h-14 sm:h-18 mt-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: m.color + '30' }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full rounded-full transition-none"
                      style={{
                        height: `${lineFill}%`,
                        backgroundColor: m.color,
                        boxShadow: (isActive || isLast)
                          ? `0 0 8px 2px ${m.color}aa`
                          : 'none',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Last dot */}
              {i === milestones.length - 1 && (
                <div
                  className="w-3.5 h-3.5 rounded-full border-[3px] mt-2 transition-all duration-300"
                  style={{
                    backgroundColor: isActive || isLast ? m.color : 'transparent',
                    borderColor: m.color,
                    opacity: isActive || isLast ? 1 : 0.4,
                    boxShadow: (isActive || isLast)
                      ? `0 0 16px 5px ${m.color}cc, 0 0 30px 8px ${m.color}66`
                      : 'none',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
