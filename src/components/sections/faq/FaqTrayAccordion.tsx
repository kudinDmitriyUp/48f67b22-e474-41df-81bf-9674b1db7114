import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import MakroTitle from "@/components/kit/MakroTitle";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const SPRING = { type: "spring", bounce: 0.2, duration: 1 } as const;
const OPEN_SPRING = { type: "spring", stiffness: 500, damping: 60, mass: 1 } as const;
const HEADER_VIEW = { once: true, margin: "0px 0px -8% 0px" } as const;
const ITEM_VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

type FaqItem = { title: string; description: string };

type HelpCard = {
  label?: string;
  title: string;
  description?: string;
  cta: { text: string; href: string };
  imageSrc: string;
  imageAlt?: string;
};

type FaqTrayAccordionProps = {
  tag?: string;
  title: string;
  highlight?: string;
  items: FaqItem[];
  help?: HelpCard;
  ariaLabel?: string;
  className?: string;
};

const FaqTrayAccordion = ({ tag, title, highlight, items, help, ariaLabel, className }: FaqTrayAccordionProps) => {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-label={ariaLabel ?? [title, highlight].filter(Boolean).join(" ")} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col items-center">
        {tag && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={HEADER_VIEW}
            transition={SPRING}
            className="rounded-full bg-secondary px-3.5 py-1 text-[length:var(--text-label)] leading-[1.5] text-secondary-foreground whitespace-nowrap"
          >
            {tag}
          </motion.p>
        )}
        <MakroTitle
          text={title}
          highlight={highlight}
          className="mt-5 max-w-[16em] text-center text-[length:var(--text-h1)] leading-[1.2] tracking-[var(--heading-tracking)]"
        />
        <div
          className={cn(
            "mt-[clamp(2.5rem,5vw,3.5rem)] grid w-full grid-cols-1 gap-2",
            help && "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
          )}
        >
          <ul className={cn("flex min-w-0 flex-col gap-2", help && "lg:order-2")}>
            {items.map((item, index) => {
              const isOpen = open === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <motion.li
                  key={`${index}-${item.title}`}
                  initial={reduce ? false : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={ITEM_VIEW}
                  transition={{ ...SPRING, delay: Math.min(index, 4) * 0.06 }}
                  className="rounded-[var(--radius-image)] bg-card text-card-foreground"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-start justify-between gap-6 px-[clamp(1.25rem,2.6vw,2.25rem)] py-[clamp(1.25rem,2.2vw,1.75rem)] text-left text-[length:calc(var(--text-h3)*0.75)] leading-[1.4] tracking-[-0.02em] text-balance [overflow-wrap:anywhere]"
                    >
                      {item.title}
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1.25}
                        className={cn(
                          "mt-[0.15em] size-6 shrink-0 text-muted-foreground transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)]",
                          isOpen && "rotate-45 text-foreground",
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={OPEN_SPRING}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[40em] px-[clamp(1.25rem,2.6vw,2.25rem)] pb-[clamp(1.25rem,2.2vw,1.75rem)] text-[length:var(--text-body-lg)] leading-[1.55] text-muted-foreground">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
          {help && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={ITEM_VIEW}
              transition={{ ...SPRING, delay: 0.1 }}
              className="flex min-w-0 flex-col gap-6 self-start rounded-[var(--radius-image)] bg-card text-card-foreground p-[clamp(1.25rem,2.2vw,1.75rem)] lg:sticky lg:top-24 lg:order-1"
            >
              <Media
                src={help.imageSrc}
                alt={help.imageAlt ?? ""}
                aria-hidden={help.imageAlt ? undefined : true}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[calc(var(--radius-image)*0.75)] object-cover lg:aspect-[4/5]"
              />
              <div className="flex flex-col items-start">
                {help.label && (
                  <p className="rounded-full bg-background px-3.5 py-1 text-[length:var(--text-label)] leading-[1.5] text-foreground whitespace-nowrap">{help.label}</p>
                )}
                <h3 className={cn("text-[length:calc(var(--text-h3)*0.75)] leading-[1.35] tracking-[-0.02em] text-balance [overflow-wrap:anywhere]", help.label && "mt-4")}>
                  {help.title}
                </h3>
                {help.description && <p className="mt-3 text-[length:var(--text-body)] leading-[1.6] text-muted-foreground">{help.description}</p>}
                <a href={help.cta.href} className="btn-primary mt-6">
                  {help.cta.text}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqTrayAccordion;
