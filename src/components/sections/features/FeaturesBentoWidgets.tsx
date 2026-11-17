import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady } from "@/components/kit/kitMotion";
import MakroCounter from "@/components/kit/MakroCounter";
import MakroTitle from "@/components/kit/MakroTitle";
import Media, { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type BentoRow = {
  label: string;
  value?: string;
};

type BentoItem = {
  tag?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  value?: string;
  valueLabel?: string;
  rows?: BentoRow[];
  tags?: string[];
};

type FeaturesBentoWidgetsProps = {
  ariaLabel?: string;
  tag?: string;
  title: string;
  description?: string;
  items: BentoItem[];
  backgroundImageSrc?: string;
  className?: string;
};

const reveal = { type: "spring", bounce: 0.2, duration: 1 } as const;
const small = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

const lgSpan = ["lg:row-span-3", "lg:row-span-2", "lg:row-span-2", "lg:row-span-3"];
const xlSpan = ["xl:row-span-3", "xl:row-span-2", "xl:row-span-3", "xl:row-span-3", "xl:row-span-2", "xl:row-span-2"];
const tilts = [-14, 6, -4, 10, -8, 3, 12, -10];

const BentoArticle = ({ reduce, variants, className, children }: { reduce: boolean | null; variants: Variants; className: string; children: ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ready = useImageReady(ref, inView);
  return (
    <motion.article ref={ref} initial={reduce ? false : "hidden"} animate={reduce || (inView && ready) ? "shown" : "hidden"} variants={variants} className={className}>
      {children}
    </motion.article>
  );
};

const FeaturesBentoWidgets = ({ ariaLabel, tag, title, description, items, backgroundImageSrc, className }: FeaturesBentoWidgetsProps) => {
  const reduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  const wash = backgroundImageSrc ?? items.find((item) => item.imageSrc)?.imageSrc;

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[calc(var(--section-space)/2)] text-foreground", className)}>
      <div className={cn("relative isolate mx-[var(--panel-inset)] overflow-hidden rounded-[var(--radius-card)] bg-deep py-[var(--section-space)]", wash ? "text-white" : "text-deep-foreground")}>
      {wash && (
        <>
          <Media
            src={wash}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            data-wash=""
            className="pointer-events-none absolute inset-0 -z-2 size-full scale-[1.4] object-cover blur-[56px] saturate-[0.6]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 bg-linear-to-b from-black/60 via-black/40 to-black/65" />
        </>
      )}
      <div className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] flex w-[var(--container)] flex-col items-center text-center">
        {tag && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={reveal}
            className={cn("mb-[20px] whitespace-nowrap rounded-full px-[14px] py-[6px] text-[length:var(--text-label)] leading-[1.5]", wash ? "bg-white/10 text-white" : "bg-deep-foreground/10 text-deep-foreground")}
          >
            {tag}
          </motion.p>
        )}
        <MakroTitle text={title} className="max-w-[18ch] text-[length:var(--text-h1)] leading-[1.2]" />
        {description && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 72 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ ...reveal, delay: 0.15 }}
            className={cn("mt-[16px] max-w-[36rem] text-[length:var(--text-body-lg)] leading-[1.5] text-balance", wash ? "text-white/70" : "text-deep-foreground/70")}
          >
            {description}
          </motion.p>
        )}
      </div>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[var(--gap)] lg:auto-rows-[minmax(8.5rem,auto)] lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const photo = Boolean(item.imageSrc);
          const rows = (item.rows ?? []).slice(0, 4);
          const pills = (item.tags ?? []).slice(0, 8);
          return (
            <BentoArticle
              key={index}
              reduce={reduceMotion}
              variants={{ hidden: { opacity: 0, y: 72 }, shown: { opacity: 1, y: 0, transition: { ...reveal, delay: (index % 3) * 0.1 } } }}
              className={cn(
                "relative isolate flex min-h-[22rem] flex-col items-center overflow-hidden rounded-[var(--radius-card)] bg-deep/45 p-[clamp(24px,3vw,36px)] text-center ring-1 ring-inset backdrop-blur-xl lg:min-h-0",
                photo ? "text-white ring-white/10" : "text-deep-foreground ring-deep-foreground/10",
                lgSpan[index % 4],
                xlSpan[index % 6],
              )}
            >
              {item.imageSrc && (
                <>
                  <MotionMedia
                    src={item.imageSrc}
                    alt={item.imageAlt ?? ""}
                    loading="lazy"
                    decoding="async"
                    variants={{ hidden: { scale: 1.18 }, shown: { scale: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 } } }}
                    className="absolute inset-0 -z-2 size-full object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-1 bg-linear-to-b from-black/70 via-black/25 to-black/10" />
                </>
              )}
              {item.tag && (
                <p
                  className={cn(
                    "mb-[16px] w-fit max-w-full rounded-full px-[12px] py-[4px] text-[length:var(--text-label)] leading-[1.5]",
                    photo ? "bg-white/15 text-white backdrop-blur-md" : "bg-accent text-accent-foreground",
                  )}
                >
                  {item.tag}
                </p>
              )}
              <h3 className="max-w-[16ch] text-[length:var(--text-h3)] leading-[1.3] tracking-[-0.03em] text-balance [overflow-wrap:anywhere]">{item.title}</h3>
              {item.description && (
                <p className={cn("mt-[10px] max-w-[22rem] text-[length:var(--text-body)] leading-[1.5] text-balance", photo ? "text-white/85" : "text-deep-foreground/65")}>
                  {item.description}
                </p>
              )}
              {item.value ? (
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { ...reveal, delay: 0.3 } } }}
                  className="mt-auto flex w-full max-w-[22rem] flex-col items-center gap-[6px] pt-[28px]"
                >
                  <MakroCounter
                    value={item.value}
                    className="whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:var(--text-h1)] leading-[1.05] tracking-[var(--heading-tracking)]"
                  />
                  {item.valueLabel && <p className={cn("text-[length:var(--text-body)] leading-[1.4]", photo ? "text-white/60" : "text-deep-foreground/60")}>{item.valueLabel}</p>}
                </motion.div>
              ) : rows.length > 0 ? (
                <div className="mt-auto flex w-full max-w-[24rem] flex-col gap-[8px] pt-[28px]">
                  {rows.map((row, rowIndex) => (
                    <motion.div
                      key={rowIndex}
                      variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { ...small, delay: 0.3 + rowIndex * 0.1 } } }}
                      className="flex items-center justify-between gap-[16px] rounded-[var(--radius-image)] bg-card px-[16px] py-[14px] text-left text-card-foreground"
                    >
                      <p className="min-w-0 text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere]">{row.label}</p>
                      {row.value && (
                        <p className={cn("shrink-0 whitespace-nowrap rounded-full px-[10px] py-[2px] text-[length:var(--text-small)] leading-[1.5]", rowIndex === 0 ? "bg-accent text-accent-foreground" : "bg-background text-foreground")}>
                          {row.value}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : pills.length > 0 ? (
                <div className="mt-auto flex w-full flex-wrap-reverse content-start justify-center gap-[8px] pt-[36px]">
                  {pills.map((pill, pillIndex) => (
                    <motion.p
                      key={pillIndex}
                      variants={{
                        hidden: { opacity: 0, y: -160, rotate: tilts[pillIndex % tilts.length] * 2 },
                        shown: { opacity: 1, y: 0, rotate: tilts[pillIndex % tilts.length], transition: { ...reveal, delay: 0.1 + pillIndex * 0.05 } },
                      }}
                      className={cn(
                        "max-w-full whitespace-nowrap rounded-full px-[18px] py-[8px] text-[length:var(--text-body-lg)] leading-[1.4]",
                        photo ? "bg-white/20 text-white backdrop-blur-md" : pillIndex % 3 === 0 ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground",
                      )}
                    >
                      {pill}
                    </motion.p>
                  ))}
                </div>
              ) : null}
            </BentoArticle>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default FeaturesBentoWidgets;
