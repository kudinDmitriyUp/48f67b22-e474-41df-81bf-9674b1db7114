import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FooterLink = { text: string; href: string };

type FooterColumn = { title: string; links: FooterLink[] };

type FooterTrayWordmarkProps = {
  brand: string;
  logoSrc?: string;
  wordmark?: string;
  columns?: FooterColumn[];
  copyright?: string;
  topText?: string;
  ariaLabel?: string;
  className?: string;
};

const spring = { type: "spring", bounce: 0.2, duration: 1 } as const;

const FooterTrayWordmark = ({ brand, logoSrc, wordmark, columns = [], copyright, topText = "Back to top", ariaLabel, className }: FooterTrayWordmarkProps) => {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [scale, setScale] = useState(1);
  const mark = wordmark ?? brand;

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = measureRef.current;
    if (!box || !text) return;
    const fit = () => {
      const width = text.scrollWidth;
      if (width > 0) setScale(box.clientWidth / width);
    };
    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [mark]);

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { ...spring, delay } };

  const shown = columns.slice(0, 4);

  return (
    <footer aria-label={ariaLabel ?? `${brand} footer`} className={cn("relative bg-background pt-[calc(var(--section-space)/2)] text-foreground", className)}>
      <div className="relative isolate mx-[var(--panel-inset)] mb-[var(--panel-inset)] overflow-hidden rounded-[var(--radius-card)] bg-card pt-[clamp(2.5rem,5vw,4.5rem)] text-card-foreground">
        <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-x-[var(--gap)] gap-y-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <motion.a {...rise(0)} href="#" aria-label={brand} className="flex w-fit min-w-0 items-start">
            {logoSrc ? (
              <Media src={logoSrc} alt={brand} loading="lazy" decoding="async" className="h-[clamp(2rem,3vw,2.5rem)] w-auto max-w-[60vw] object-contain" />
            ) : (
              <p className="font-[family-name:var(--font-heading)] text-[length:var(--text-h3)] leading-[1.2] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere]">{brand}</p>
            )}
          </motion.a>

          {shown.length > 0 && (
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-[2.5rem] sm:grid-cols-4">
              {shown.map((column, i) => (
                <motion.div key={`${i}-${column.title}`} {...rise(0.1 + i * 0.08)} className="flex min-w-0 flex-col gap-[1rem]">
                  <h3 className="text-[length:var(--text-label)] leading-[1.5] text-muted-foreground [overflow-wrap:anywhere]">{column.title}</h3>
                  <div className="flex flex-col gap-[0.5rem]">
                    {column.links.slice(0, 8).map((link, j) => (
                      <a
                        key={`${j}-${link.text}`}
                        href={link.href}
                        className="w-fit text-[length:var(--text-body)] leading-[1.5] [overflow-wrap:anywhere] transition-opacity duration-300 hover:opacity-60"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </nav>
          )}
        </div>

        <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] flex w-[var(--container)] flex-wrap items-center justify-between gap-x-[var(--gap)] gap-y-[0.75rem] border-t border-border pt-[1.25rem]">
          {copyright && <p className="text-[length:var(--text-small)] leading-[1.5] text-muted-foreground">{copyright}</p>}
          <a href="#" className="group flex items-center gap-[0.625rem] text-[length:var(--text-small)] leading-[1.5]">
            {topText}
            <div className="flex size-[2rem] items-center justify-center rounded-[0.625rem] bg-background transition-colors duration-300 group-hover:bg-accent">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V4M5 11l7-7 7 7" />
              </svg>
            </div>
          </a>
        </div>

        <div ref={boxRef} aria-hidden="true" className="relative mx-auto mt-[clamp(1.5rem,4vw,3rem)] w-[var(--container)] min-w-0">
          <p ref={measureRef} className="invisible absolute left-0 top-0 w-max whitespace-pre font-[family-name:var(--font-heading)] text-[length:var(--text-display)] font-semibold leading-none tracking-[-0.07em]">
            {mark}
          </p>
          <div style={{ fontSize: `calc(var(--text-display) * ${scale})` }} className="h-[0.78em] overflow-hidden">
            <motion.p
              initial={reduce ? false : { y: "0.3em" }}
              whileInView={{ y: "0em" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={spring}
              className="whitespace-pre bg-linear-to-b from-foreground to-foreground/35 bg-clip-text font-[family-name:var(--font-heading)] font-semibold leading-none tracking-[-0.07em] text-transparent"
            >
              {mark}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTrayWordmark;
