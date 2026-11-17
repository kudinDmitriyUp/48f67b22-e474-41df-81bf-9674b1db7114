import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, usePreloadImages } from "@/components/kit/kitMotion";
import MakroTitle from "@/components/kit/MakroTitle";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ContactData = { name: string; email: string; company: string; message: string };

type ContactDarkFormCardProps = {
  title: string;
  formTitle?: string;
  fields?: Partial<{ name: string; email: string; company: string; message: string }>;
  placeholders?: Partial<{ name: string; email: string; company: string; message: string }>;
  submitText?: string;
  successText?: string;
  onSubmit?: (data: ContactData) => void;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const defaults = { name: "Name", email: "Email", company: "Company", message: "How can we help?" };
const hints = { name: "Your name", email: "you@email.com", company: "Your company", message: "Tell us a little about what you need." };

const spring = (delay = 0) => ({ type: "spring" as const, bounce: 0.2, duration: 1, delay });

const ImagePanel = ({ src, alt, reduce }: { src: string; alt: string; reduce: boolean | null }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ready = useImageReady(ref, inView);
  const go = inView && ready;
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 72 }}
      animate={go ? { opacity: 1, y: 0 } : undefined}
      transition={spring(0.2)}
      className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-[var(--radius-card)] lg:aspect-auto"
    >
      <MotionMedia
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={reduce ? false : { scale: 1.18 }}
        animate={go ? { scale: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-0 size-full object-cover"
      />
    </motion.div>
  );
};

const ContactDarkFormCard = ({
  title,
  formTitle,
  fields,
  placeholders,
  submitText = "Send message",
  successText = "Thank you, we will be in touch soon.",
  onSubmit,
  imageSrc,
  imageAlt = "",
  ariaLabel,
  className,
}: ContactDarkFormCardProps) => {
  const uid = useId();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef);
  const [sent, setSent] = useState(false);
  const labels = { ...defaults, ...fields };
  const holders = { ...hints, ...placeholders };

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setSent(true);
  };

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className={cn("mx-auto grid w-[var(--container)] grid-cols-1 gap-x-[var(--gap)] gap-y-[clamp(2rem,4vw,3rem)] lg:grid-cols-2", !imageSrc && "lg:gap-x-[clamp(2rem,6vw,6rem)]")}>
        <div className={cn("@container min-w-0", imageSrc && "lg:col-span-2")}>
          <MakroTitle
            text={title}
            className={cn(
              "text-[length:min(var(--text-h1)*1.15,11cqw)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]",
              imageSrc ? "max-w-[18ch]" : "max-w-[12ch]",
            )}
          />
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 72 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={spring(0.1)}
          className="flex min-w-0 flex-col rounded-[var(--radius-card)] bg-deep p-2 text-deep-foreground"
        >
          {formTitle && (
            <h3 className="px-[clamp(1rem,3vw,2.25rem)] pb-[clamp(1.25rem,2.4vw,2rem)] pt-[clamp(1.25rem,2.6vw,2.25rem)] text-balance text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.03em] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
              {formTitle}
            </h3>
          )}
          <form onSubmit={onSend} className="flex flex-1 flex-col gap-[clamp(1.5rem,2.6vw,2.25rem)] rounded-[calc(var(--radius-card)-0.5rem)] bg-card px-[clamp(1rem,3vw,2.25rem)] py-[clamp(1.5rem,3vw,2.5rem)] text-card-foreground">
            <div className="grid grid-cols-1 gap-[clamp(1.5rem,2.6vw,2.25rem)] sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-2">
                <label htmlFor={`${uid}-name`} className="text-[length:var(--text-body)] leading-[1.5] [overflow-wrap:anywhere]">
                  {labels.name}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={holders.name}
                  disabled={sent}
                  className="w-full min-w-0 border-0 border-b border-border bg-transparent pb-3 pt-1 text-[length:var(--text-body)] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <label htmlFor={`${uid}-email`} className="text-[length:var(--text-body)] leading-[1.5] [overflow-wrap:anywhere]">
                  {labels.email}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={holders.email}
                  disabled={sent}
                  className="w-full min-w-0 border-0 border-b border-border bg-transparent pb-3 pt-1 text-[length:var(--text-body)] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
                />
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={`${uid}-company`} className="text-[length:var(--text-body)] leading-[1.5] [overflow-wrap:anywhere]">
                {labels.company}
              </label>
              <input
                id={`${uid}-company`}
                name="company"
                autoComplete="organization"
                placeholder={holders.company}
                disabled={sent}
                className="w-full min-w-0 border-0 border-b border-border bg-transparent pb-3 pt-1 text-[length:var(--text-body)] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={`${uid}-message`} className="text-[length:var(--text-body)] leading-[1.5] [overflow-wrap:anywhere]">
                {labels.message}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                required
                rows={4}
                placeholder={holders.message}
                disabled={sent}
                className="w-full min-w-0 resize-none border-0 border-b border-border bg-transparent pb-3 pt-1 text-[length:var(--text-body)] leading-[1.5] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground disabled:opacity-60"
              />
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <button type="submit" disabled={sent} className="btn-primary w-full disabled:cursor-default disabled:opacity-60">
                {submitText}
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    role="status"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={spring()}
                    className="text-center text-[length:var(--text-body)] leading-[1.5] text-muted-foreground [overflow-wrap:anywhere]"
                  >
                    {successText}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
        {imageSrc && <ImagePanel src={imageSrc} alt={imageAlt} reduce={reduce} />}
      </div>
    </section>
  );
};

export default ContactDarkFormCard;
