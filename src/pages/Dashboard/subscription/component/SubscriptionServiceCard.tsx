interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export default function SubscriptionServiceCard({
  title,
  description,
  icon,
  active,
  onToggle,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[var(--color-primary-600)] flex-shrink-0">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-[var(--color-secondary)]">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          className={`relative w-11 h-5 rounded-full transition-colors ${
            active ? "bg-[var(--color-primary)]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-[2px] left-[4px] h-4 w-4 rounded-full bg-white transition-transform ${
              active ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      {/* Accordion */}
      {children}
    </div>
  );
}
