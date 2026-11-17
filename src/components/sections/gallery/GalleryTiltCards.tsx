import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, usePreloadImages } from "@/components/kit/kitMotion";
import MakroTitle from "@/components/kit/MakroTitle";
import MakroNotchArrow from "@/components/kit/MakroNotchArrow";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Work = {
  title: string;
  tag?: string;
  date?: string;
  description?: string;
  href?: string;
  imageSrc: string;
  imageAlt?: string;
};

type GalleryTiltCardsProps = {
  tag?: string;
  title: string;
  description?: string;
  items: Work[];
  linkLabel?: string;
  ariaLabel?: string;
  className?: string;
};

const spring = (delay = 0) => ({ type: "spring" as const, bounce: 0.2, duration: 1, delay });

const WorkLi = ({ index, reduce, children }: { index: number; reduce: boolean; children: (go: boolean) => ReactNode }) => {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const ready = useImageReady(ref, inView);
  const go = inView && ready;
  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 66, rotateX: 8 }}
      animate={go ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      transition={spring((index % 3) * 0.1)}
      style={{ transformOrigin: "50% 100%" }}
      className="flex min-w-0"
    >
      {children(go)}
    </motion.li>
  );
};

const GalleryTiltCards = ({ tag, title, description, items, linkLabel = "Read case study", ariaLabel, className }: GalleryTiltCardsProps) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef);
  const count = items.length;
  const cols = count === 1 ? "lg:max-w-[40rem] lg:mx-auto" : count === 2 || count === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3";

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} data-gallery className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-5 text-center">
          {tag && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={spring()}
              className="rounded-full bg-secondary px-4 py-1 text-[length:var(--text-label)] leading-[1.5] text-secondary-foreground tracking-[var(--label-tracking)] [text-transform:var(--label-case)]"
            >
              {tag}
            </motion.p>
          )}
          <MakroTitle
            text={title}
            className="text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]"
          />
          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 72 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={spring()}
              className="max-w-[30rem] text-pretty text-[length:var(--text-body-lg)] leading-[1.5] text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </div>
        <div className="mt-[clamp(2.5rem,5vw,3.5rem)]">
          <ul className={cn("grid grid-cols-1 gap-[clamp(0.5rem,1.4vw,1rem)] [perspective:1200px]", cols)}>
            {items.map((work, index) => {
              const body = (go: boolean) => (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)]">
                    <MotionMedia
                      src={work.imageSrc}
                      alt={work.imageAlt ?? ""}
                      loading="lazy"
                      decoding="async"
                      initial={reduce ? false : { scale: 1.18 }}
                      animate={go ? { scale: 1 } : undefined}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-[clamp(0.75rem,1.4vw,1rem)] pb-[clamp(0.75rem,1.4vw,1rem)] pt-[clamp(1.25rem,2vw,1.5rem)]">
                    {(work.tag || work.date) && (
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        {work.tag && <p className="min-w-0 rounded-full bg-background px-4 py-1 text-[length:var(--text-small)] leading-[1.5] [overflow-wrap:anywhere]">{work.tag}</p>}
                        {work.date && <p className="whitespace-nowrap text-[length:var(--text-small)] leading-[1.5] text-muted-foreground">{work.date}</p>}
                      </div>
                    )}
                    <h3 className="mt-4 text-pretty text-[length:calc(var(--text-h3)*0.75)] leading-[1.4] tracking-[-0.02em] [overflow-wrap:anywhere]">
                      {work.title}
                    </h3>
                    {work.description && <p className="mt-3 text-pretty text-[length:var(--text-body)] leading-[1.5] text-muted-foreground">{work.description}</p>}
                    {work.href && (
                      <p className="mt-auto pr-[60px] pt-10 text-[length:var(--text-body)] leading-[1.5] text-muted-foreground transition-colors duration-500 group-hover:text-card-foreground">{linkLabel}</p>
                    )}
                  </div>
                  {work.href && <MakroNotchArrow />}
                </>
              );
              return (
                <WorkLi key={`${index}-${work.title}`} index={index} reduce={!!reduce}>
                  {(go) =>
                    work.href ? (
                      <a href={work.href} className="group relative flex w-full flex-col rounded-[var(--radius-card)] bg-card p-2 text-card-foreground">
                        {body(go)}
                      </a>
                    ) : (
                      <div className="flex w-full flex-col rounded-[var(--radius-card)] bg-card p-2 text-card-foreground">{body(go)}</div>
                    )
                  }
                </WorkLi>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GalleryTiltCards;
