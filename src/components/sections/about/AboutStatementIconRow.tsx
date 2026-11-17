import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import Icon, { type IconName } from "@/components/kit/Icon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import MakroTitle from "@/components/kit/MakroTitle";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Feature = { icon?: IconName; title: string; description?: string };

type AboutStatementIconRowProps = {
  title: string;
  items: Feature[];
  ariaLabel?: string;
  className?: string;
};

const AboutStatementIconRow = ({ title, items, ariaLabel, className }: AboutStatementIconRowProps) => {
  const reduce = useReducedMotion();
  const count = items.length;
  const columns = count <= 3 ? count : count === 4 ? 2 : 3;

  return (
    <section aria-label={ariaLabel ?? "About"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col items-center">
        <MakroTitle text={title} className="max-w-[18em] text-center text-[length:var(--text-h2)] leading-[1.25] tracking-[-0.03em]" />
        {count > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 1, delay: 0.1 }}
            className="mt-[clamp(2rem,4vw,3rem)] w-full max-w-[56rem] border-t border-border pt-[clamp(2rem,4vw,3rem)]"
          >
            <ul
              style={{ "--cols": columns } as CSSProperties}
              className={cn(
                "grid gap-x-[var(--gap)] gap-y-8",
                count > 1 && "sm:grid-cols-2",
                "lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]",
              )}
            >
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: 72 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 1, delay: (index % columns) * 0.1 }}
                  className={cn("flex min-w-0 items-start gap-4", count === 1 && "justify-center")}
                >
                  {item.icon && <Icon name={item.icon} aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-foreground" strokeWidth={1.5} />}
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="text-[length:var(--text-body-lg)] leading-[1.4] tracking-[-0.01em] [overflow-wrap:anywhere]">{item.title}</h3>
                    {item.description && <p className="text-[length:var(--text-small)] leading-[1.5] text-muted-foreground [overflow-wrap:anywhere]">{item.description}</p>}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutStatementIconRow;
