import React from "react";

interface EngineeringCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "interactive";
}

export function EngineeringCard({
  title,
  subtitle,
  headerRight,
  footer,
  children,
  className = "",
  variant = "default",
}: EngineeringCardProps) {
  const variantStyles = {
    default: "bg-[#11141d] border border-[#283144]",
    elevated: "bg-[#181d28] border border-[#3d4964] shadow-md",
    interactive: "bg-[#11141d] border border-[#283144] hover:border-[#3d4964] hover:bg-[#181d28] transition-all",
  };

  return (
    <section className={`rounded-sm overflow-hidden flex flex-col ${variantStyles[variant]} ${className}`}>
      {(title || headerRight) && (
        <header className="px-4 py-3 border-b border-[#283144] bg-[#141824]/60 flex items-center justify-between gap-2">
          <div>
            {title && (
              <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wide uppercase text-[#f1f5f9] flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[11px] text-[#94a3b8] font-sans mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </header>
      )}

      <div className="p-4 flex-1">{children}</div>

      {footer && (
        <footer className="px-4 py-2.5 border-t border-[#283144] bg-[#0d1017]/80 text-[11px] text-[#64748b] font-mono flex items-center justify-between">
          {footer}
        </footer>
      )}
    </section>
  );
}
