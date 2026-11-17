import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { List } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import MakroTitle from "@/components/kit/MakroTitle";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };

type Kpi = { label: string; value: string; delta?: string; trend?: number[] };

type HeroBoardFrameProps = {
  tag?: string;
  title: string;
  description?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  imageSrc: string;
  imageAlt?: string;
  kpis?: Kpi[];
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const spring = { type: "spring", bounce: 0.2, duration: 1 } as const;
const calm = { duration: 1.4, ease: [0.22, 1, 0.36, 1] } as const;
const BOARD_AT = 0.8;

const SLOTS = [
  { place: "left-[-1.5%] top-[10%]", depth: -140 },
  { place: "right-[-1.5%] top-[34%]", depth: -70 },
  { place: "left-[14%] bottom-[-5%] hidden sm:block", depth: -200 },
];

const Spark = ({ points }: { points: number[] }) => {
  const min = Math.min(...points);
  const span = Math.max(...points) - min || 1;
  const d = points.map((p, i) => `${i ? "L" : "M"}${((i / (points.length - 1)) * 100).toFixed(1)} ${(28 - ((p - min) / span) * 24).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true" className="h-[1.75rem] w-full overflow-visible">
      <path d={`${d} L100 30 L0 30 Z`} className="fill-accent/40" />
      <path d={d} fill="none" strokeWidth={1.5} vectorEffect="non-scaling-stroke" className="stroke-foreground" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const KpiCard = ({ kpi, index, progress, delay }: { kpi: Kpi; index: number; progress: MotionValue<number>; delay: number }) => {
  const reduce = useReducedMotion();
  const slot = SLOTS[index];
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : slot.depth]);
  return (
    <motion.div style={{ y }} className={cn("absolute z-10 w-[clamp(8.5rem,17vw,13.5rem)]", slot.place)}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...spring, delay }}
        className="flex flex-col gap-[clamp(0.375rem,0.8vw,0.625rem)] rounded-[var(--radius-image)] bg-card/85 p-[clamp(0.75rem,1.2vw,1.125rem)] text-card-foreground shadow-[0_1.5rem_3rem_-1.25rem_color-mix(in_srgb,var(--deep)_40%,transparent)] ring-1 ring-card/60 backdrop-blur-xl"
      >
        <p className="text-[length:var(--text-small)] leading-[1.3] text-muted-foreground [overflow-wrap:anywhere]">{kpi.label}</p>
        <div className="flex flex-wrap items-center gap-x-[0.5rem] gap-y-[0.25rem]">
          <p className="whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:clamp(1.25rem,2.4vw,2rem)] leading-[1.1] tracking-[var(--heading-tracking)]">{kpi.value}</p>
          {kpi.delta && <p className="shrink-0 rounded-full bg-accent px-[0.5rem] py-[0.0625rem] text-[length:0.75rem] leading-[1.5] text-accent-foreground">{kpi.delta}</p>}
        </div>
        {kpi.trend && kpi.trend.length > 1 && <Spark points={kpi.trend} />}
      </motion.div>
    </motion.div>
  );
};

const HeroBoardFrame = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  imageAlt = "",
  kpis = [],
  introDelay = 0,
  ariaLabel,
  className,
}: HeroBoardFrameProps) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });
  const imageY = useTransform(progress, [0, 1], ["0%", reduce ? "0%" : "5%"]);

  const appear = (y: number, delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { ...spring, delay: delay + introDelay } };

  return (
    <section
      ref={sectionRef}
      data-scene
      aria-label={ariaLabel ?? "Hero"}
      className={cn("relative isolate overflow-hidden bg-background pb-[var(--section-space)] pt-[clamp(6.5rem,9vw,8.5rem)] text-foreground", className)}
    >
      <div className="relative mx-auto flex w-[var(--container)] flex-col items-center text-center">
        {tag && (
          <motion.div {...appear(24, 0)} className="flex max-w-full items-center gap-[0.5rem] rounded-full bg-card px-[0.875rem] py-[0.375rem] text-card-foreground">
            <List aria-hidden="true" className="size-4 shrink-0 opacity-75" strokeWidth={1.5} />
            <p className="truncate text-[length:var(--text-label)] leading-[1.5]">{tag}</p>
          </motion.div>
        )}

        <MakroTitle
          tag="h1"
          text={title}
          immediate
          byLine
          delay={introDelay + 0.12}
          className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[12em] text-[length:var(--text-display)] leading-[1.25] tracking-[var(--heading-tracking)]"
        />

        {description && (
          <motion.p {...appear(48, 0.45)} className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[30rem] text-balance text-[length:var(--text-body-lg)] leading-[1.5] text-muted-foreground">
            {description}
          </motion.p>
        )}

        {(primaryButton || secondaryButton) && (
          <motion.div {...appear(48, 0.6)} className="mt-[clamp(1.75rem,3.4vw,3rem)] flex flex-wrap items-center justify-center gap-x-[1rem] gap-y-[1.25rem]">
            {primaryButton && (
              <a href={primaryButton.href} className="btn-primary btn-lg">
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a href={secondaryButton.href} className="btn-secondary btn-lg bg-card">
                {secondaryButton.text}
              </a>
            )}
          </motion.div>
        )}
      </div>

      <div className="relative mx-auto mt-[clamp(3rem,6vw,5.5rem)] w-[var(--container)]">
        <motion.div
          data-hero-board
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: introDelay + BOARD_AT }}
          className="rounded-[var(--radius-card)] bg-card p-[clamp(0.375rem,1vw,0.75rem)]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, clipPath: "inset(6% 6% 6% 6% round 16px)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
            transition={{ ...calm, delay: introDelay + BOARD_AT }}
            className="aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] sm:aspect-[16/10] lg:aspect-[16/9]"
          >
            <MotionMedia
              src={imageSrc}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ y: imageY, scale: 1.12 }}
              className="size-full object-cover"
            />
          </motion.div>
        </motion.div>
        {kpis.slice(0, 3).map((kpi, i) => (
          <KpiCard key={`${i}-${kpi.label}`} kpi={kpi} index={i} progress={progress} delay={introDelay + BOARD_AT + 0.4 + i * 0.12} />
        ))}
      </div>
    </section>
  );
};

export default HeroBoardFrame;
