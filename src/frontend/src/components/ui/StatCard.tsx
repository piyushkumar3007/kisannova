import type { ReactNode } from "react";

interface StatCardProps {
  icon?: ReactNode;
  value: string;
  label: string;
  description?: string;
  className?: string;
  "data-ocid"?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  description,
  className = "",
  "data-ocid": dataOcid,
}: StatCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-6 bg-card border border-border rounded-lg shadow-subtle hover:shadow-elevated transition-smooth ${className}`}
      data-ocid={dataOcid}
    >
      {icon && (
        <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center text-accent mb-1">
          {icon}
        </div>
      )}
      <span className="font-display text-4xl font-semibold text-primary leading-none">
        {value}
      </span>
      <span className="font-body font-semibold text-sm text-foreground">
        {label}
      </span>
      {description && (
        <p className="text-xs text-muted-foreground font-body leading-snug">
          {description}
        </p>
      )}
    </div>
  );
}
