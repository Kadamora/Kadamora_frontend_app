import { useEffect, useRef, useState } from 'react';

export interface CountUpProps {
    /** Target value to animate to (e.g. "1000+", "100+", "99.9%", "4.2/5", or raw number) */
    value: string | number;
    /** Animation duration in milliseconds. Defaults to 2000ms */
    duration?: number;
    /** Optional delay in milliseconds before the animation begins */
    delay?: number;
    /** Additional CSS classes for styling */
    className?: string;
    /** Trigger count-up only when scrolled into view via IntersectionObserver. Defaults to true */
    startOnView?: boolean;
    /** IntersectionObserver viewport visibility threshold (0 to 1). Defaults to 0.15 */
    threshold?: number;
    /** Custom easing function (t: 0..1 => 0..1). Defaults to cubic ease-out */
    easing?: (t: number) => number;
}

interface ParsedMetric {
    prefix: string;
    target: number;
    decimals: number;
    suffix: string;
    hasCommas: boolean;
}

/**
 * Parses numeric strings with prefixes, decimals, and suffixes.
 * Examples:
 *   "1000+"  -> prefix: "", target: 1000, decimals: 0, suffix: "+"
 *   "99.9%"  -> prefix: "", target: 99.9, decimals: 1, suffix: "%"
 *   "4.2/5"  -> prefix: "", target: 4.2,  decimals: 1, suffix: "/5"
 *   "$5,000" -> prefix: "$", target: 5000, decimals: 0, suffix: "", hasCommas: true
 */
function parseValue(raw: string | number): ParsedMetric | null {
    if (typeof raw === 'number') {
        const str = raw.toString();
        const parts = str.split('.');
        return {
            prefix: '',
            target: raw,
            decimals: parts.length > 1 ? parts[1].length : 0,
            suffix: '',
            hasCommas: false,
        };
    }

    const str = String(raw).trim();
    const match = str.match(/^([^0-9.]*)((?:[0-9]+(?:,[0-9]+)*)(?:\.[0-9]+)?)(.*)$/);
    if (!match) return null;

    const prefix = match[1] ?? '';
    const numPart = match[2] ?? '';
    const suffix = match[3] ?? '';

    const hasCommas = numPart.includes(',');
    const sanitized = numPart.replace(/,/g, '');
    const target = parseFloat(sanitized);

    if (isNaN(target)) return null;

    const decimalParts = sanitized.split('.');
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;

    return {
        prefix,
        target,
        decimals,
        suffix,
        hasCommas,
    };
}

function formatDisplay(current: number, parsed: ParsedMetric): string {
    const { decimals, hasCommas, prefix, suffix } = parsed;
    let formattedNum: string;

    if (decimals > 0) {
        const fixed = current.toFixed(decimals);
        if (hasCommas) {
            const [intPart, decPart] = fixed.split('.');
            formattedNum = `${Number(intPart).toLocaleString('en-US')}.${decPart}`;
        } else {
            formattedNum = fixed;
        }
    } else {
        const rounded = Math.round(current);
        if (hasCommas) {
            formattedNum = rounded.toLocaleString('en-US');
        } else {
            formattedNum = rounded.toString();
        }
    }

    return `${prefix}${formattedNum}${suffix}`;
}

const defaultEaseOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
    value,
    duration = 2000,
    delay = 0,
    className = '',
    startOnView = true,
    threshold = 0.15,
    easing = defaultEaseOutCubic,
}: CountUpProps) {
    const parsed = parseValue(value);
    const containerRef = useRef<HTMLSpanElement>(null);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const [displayValue, setDisplayValue] = useState<string>(() => {
        if (!parsed) return String(value);
        // Start from 0 with matching decimals and prefix/suffix
        return formatDisplay(0, parsed);
    });

    // Check prefers-reduced-motion
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Trigger on viewport entry
    useEffect(() => {
        if (!startOnView || hasStarted) return;

        const node = containerRef.current;
        if (!node) return;

        if (typeof IntersectionObserver === 'undefined') {
            setHasStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [startOnView, hasStarted, threshold]);

    // Animate counter once started
    useEffect(() => {
        if (!hasStarted || !parsed) {
            if (!parsed) setDisplayValue(String(value));
            return;
        }

        if (prefersReducedMotion || duration <= 0) {
            setDisplayValue(formatDisplay(parsed.target, parsed));
            return;
        }

        let animationFrameId: number;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let startTime: number | null = null;

        const startAnimation = () => {
            const step = (timestamp: number) => {
                if (startTime === null) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easing(progress);

                const currentValue = easedProgress * parsed.target;
                setDisplayValue(formatDisplay(currentValue, parsed));

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(step);
                } else {
                    // Ensure exact target is set at completion
                    setDisplayValue(formatDisplay(parsed.target, parsed));
                }
            };

            animationFrameId = requestAnimationFrame(step);
        };

        if (delay > 0) {
            timeoutId = setTimeout(startAnimation, delay);
        } else {
            startAnimation();
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            cancelAnimationFrame(animationFrameId);
        };
    }, [hasStarted, parsed?.target, duration, delay, prefersReducedMotion]);

    return (
        <span
            ref={containerRef}
            className={`tabular-nums inline-block ${className}`}
            aria-label={String(value)}
        >
            {displayValue}
        </span>
    );
}
