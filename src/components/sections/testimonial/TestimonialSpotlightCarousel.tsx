import { useCallback, useEffect, useRef, useState } from "react";
import { usePreloadImages } from "@/components/kit/kitMotion";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import MakroTitle from "@/components/kit/MakroTitle";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const SPRING = { type: "spring", bounce: 0.2, duration: 1 } as const;
const HEADER_VIEW = { once: true, margin: "0px 0px -8% 0px" } as const;

const SURFACES = [
  "bg-accent text-accent-foreground",
  "kit-accent-tint bg-[color-mix(in_oklch,var(--accent)_30%,var(--secondary))] text-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-[color-mix(in_oklch,var(--deep)_12%,var(--background))] text-foreground",
];

type Stat = { label: string; value: string };

type Testimonial = {
  company: string;
  quote: string;
  name: string;
  role?: string;
  imageSrc: string;
  imageAlt?: string;
  logoSrc?: string;
  logoAlt?: string;
  stats?: Stat[];
};

type TestimonialSpotlightCarouselProps = {
  tag?: string;
  title: string;
  description?: string;
  items: Testimonial[];
  backgroundImageSrc?: string;
  ariaLabel?: string;
  className?: string;
};

const TestimonialSpotlightCarousel = ({ tag, title, description, items, backgroundImageSrc, ariaLabel, className }: TestimonialSpotlightCarouselProps) => {
  const wash = backgroundImageSrc ?? items[0]?.imageSrc;
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", duration: 32 });
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const [edges, setEdges] = useState({ prev: false, next: false });
  const [progress, setProgress] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setEdges({ prev: api.canScrollPrev(), next: api.canScrollNext() });
  }, []);

  const onScroll = useCallback((api: EmblaCarouselType) => {
    setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    onScroll(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect).on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect).off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  const scrollable = edges.prev || edges.next;

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[calc(var(--section-space)/2)]", className)}>
      <div className="relative isolate mx-[var(--panel-inset)] overflow-hidden rounded-[var(--radius-card)] bg-deep py-[var(--section-space)] text-white">
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
        <div className="mx-auto flex w-[var(--container)] flex-col items-center">
          <div className="mb-[clamp(2.5rem,5vw,4rem)] flex flex-col items-center text-center">
            {tag && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={HEADER_VIEW}
                transition={SPRING}
                className="mb-[20px] whitespace-nowrap rounded-full bg-white/10 px-[14px] py-[6px] text-[length:var(--text-label)] leading-[1.5] text-white"
              >
                {tag}
              </motion.p>
            )}
            <MakroTitle text={title} className="max-w-[18ch] text-[length:var(--text-h1)] leading-[1.2]" />
            {description && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 72 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={HEADER_VIEW}
                transition={{ ...SPRING, delay: 0.15 }}
                className="mt-[16px] max-w-[36rem] text-[length:var(--text-body-lg)] leading-[1.5] text-balance text-white/70"
              >
                {description}
              </motion.p>
            )}
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 96 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={SPRING}
            className="w-full"
          >
            <div ref={emblaRef} className={cn("overflow-hidden", scrollable && "cursor-grab active:cursor-grabbing")}>
              <ul className="-ml-[var(--gap)] flex">
                {items.map((item, index) => (
                  <li
                    key={`${index}-${item.name}`}
                    className={cn("flex min-w-0 shrink-0 grow-0 basis-[92%] pl-[var(--gap)]", items.length > 1 ? "lg:basis-[80%]" : "lg:basis-full")}
                  >
                    <figure className={cn("grid w-full grid-cols-1 gap-[clamp(1.5rem,3vw,2rem)] rounded-[var(--radius-card)] p-[clamp(1.25rem,2.6vw,2.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-[clamp(2rem,4vw,4rem)]", SURFACES[index % SURFACES.length])}>
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-center gap-3">
                          {item.logoSrc ? (
                            <Media
                              src={item.logoSrc}
                              alt={item.logoAlt ?? item.company}
                              loading="lazy"
                              decoding="async"
                              className="h-[clamp(1.75rem,3vw,2.25rem)] w-auto max-w-[10rem] object-contain object-left"
                            />
                          ) : (
                            <p aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-[calc(var(--radius-button)*0.75)] bg-current/10 text-[length:var(--text-body-lg)] leading-none">
                              {item.company.charAt(0)}
                            </p>
                          )}
                          <h3 className="text-[length:calc(var(--text-h3)*0.75)] leading-[1.3] tracking-[-0.02em] [overflow-wrap:anywhere]">{item.company}</h3>
                        </div>
                        <blockquote className="mt-[clamp(1.5rem,3vw,2.5rem)]">
                          <p className="text-[length:var(--text-h3)] leading-[1.3] tracking-[-0.03em] text-pretty [overflow-wrap:anywhere]">“{item.quote}”</p>
                        </blockquote>
                        {item.stats && item.stats.length > 0 && (
                          <div className="mt-auto pt-8">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-current/15 pt-5">
                              {item.stats.map((stat, statIndex) => (
                                <div key={`${statIndex}-${stat.label}`} className="flex min-w-0 flex-col gap-1">
                                  <p className="text-[length:var(--text-small)] leading-[1.5] opacity-70 [overflow-wrap:anywhere]">{stat.label}</p>
                                  <p className="text-[length:var(--text-body-lg)] leading-[1.4] [overflow-wrap:anywhere]">{stat.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-col gap-4">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-image)] lg:aspect-auto lg:min-h-[16rem] lg:flex-1">
                          <Media
                            src={item.imageSrc}
                            alt={item.imageAlt ?? item.name}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 size-full object-cover"
                          />
                        </div>
                        <figcaption className="flex flex-col gap-1">
                          <p className="text-[length:var(--text-body-lg)] leading-[1.4] [overflow-wrap:anywhere]">{item.name}</p>
                          {item.role && <p className="text-[length:var(--text-small)] leading-[1.5] opacity-70 [overflow-wrap:anywhere]">{item.role}</p>}
                        </figcaption>
                      </div>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
            {scrollable && (
              <div className="mt-6 flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    disabled={!edges.prev}
                    onClick={() => emblaApi?.scrollPrev()}
                    className="grid size-12 cursor-pointer place-items-center rounded-[calc(var(--radius-button)*0.75)] bg-deep-foreground/10 transition-[background-color,opacity] duration-300 hover:bg-deep-foreground/20 disabled:cursor-default disabled:opacity-30"
                  >
                    <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    disabled={!edges.next}
                    onClick={() => emblaApi?.scrollNext()}
                    className="grid size-12 cursor-pointer place-items-center rounded-[calc(var(--radius-button)*0.75)] bg-deep-foreground/10 transition-[background-color,opacity] duration-300 hover:bg-deep-foreground/20 disabled:cursor-default disabled:opacity-30"
                  >
                    <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </button>
                </div>
                <div aria-hidden="true" className="h-1 w-[clamp(3rem,8vw,6rem)] overflow-hidden rounded-full bg-white/15">
                  <div className="h-full origin-left rounded-full bg-accent" style={{ transform: `scaleX(${Math.max(0.15, progress)})` }} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSpotlightCarousel;
