import HeroBoardFrame from "@/components/sections/hero/HeroBoardFrame";
import AboutStatementIconRow from "@/components/sections/about/AboutStatementIconRow";
import FeaturesBentoWidgets from "@/components/sections/features/FeaturesBentoWidgets";
import GalleryTiltCards from "@/components/sections/gallery/GalleryTiltCards";
import TestimonialSpotlightCarousel from "@/components/sections/testimonial/TestimonialSpotlightCarousel";
import FaqTrayAccordion from "@/components/sections/faq/FaqTrayAccordion";
import ContactDarkFormCard from "@/components/sections/contact/ContactDarkFormCard";
import ScrollToneBackdrop from "@/components/kit/ScrollToneBackdrop";
import LoaderChipFill from "@/components/loaders/LoaderChipFill";

export default function HomePage() {
  return (
    <>
      <ScrollToneBackdrop

      />

      <LoaderChipFill
        label="Leeds Plumbing Co."
      />

      <div id="home" data-webild-section="HeroBoardFrame" data-webild-section-id="HeroBoardFrame-1" data-section="home">
        <HeroBoardFrame
          className="bg-transparent"
          tag="Leeds family plumbers"
          title="Clear answers for leaks and cold boilers"
          description="Family-run emergency plumbing across Leeds. We find leaks fast, fix boilers, and keep your home warm without callout fees."
          primaryButton={{
            text: "Request a repair",
            href: "#contact-dark-form-card"
          }}
          imageSrc="https://img.b2bpic.net/free-photo/black-faucet-with-steel-sink-stylish-modern-kitchen_169016-19745.jpg"
          imageAlt="modern black kitchen faucet"
          introDelay={1.2}
          kpis={[
            {
              label: "Years experience",
              value: "25+",
              delta: "Local",
              trend: [
                10,
                13,
                16,
                18,
                21,
                23,
                25
              ]
            },
            {
              label: "Repairs completed",
              value: "5,000+",
              delta: "Leeds"
            },
            {
              label: "Fixed quotes",
              value: "100%",
              delta: "No fee",
              trend: [
                98,
                99,
                100,
                100,
                100,
                100
              ]
            }
          ]}
        />
      </div>

      <div id="about" data-webild-section="AboutStatementIconRow" data-webild-section-id="AboutStatementIconRow-1" data-section="about" data-tone="card">
        <AboutStatementIconRow
          className="bg-transparent"
          title="We have kept Leeds homes warm for over 25 years with upfront pricing, fast boiler repairs, and expert leak detection."
          items={[
            {
              icon: "clock",
              title: "Punctual local arrival",
              description: "We arrive on time and protect your floors during every repair job."
            },
            {
              icon: "shield-check",
              title: "Fixed upfront pricing",
              description: "Clear quotes provided before work begins with zero hidden fees."
            },
            {
              icon: "wrench",
              title: "Expert boiler repairs",
              description: "Comprehensive heating diagnostics carried out by Gas Safe registered engineers."
            }
          ]}
        />
      </div>

      <div id="services" data-webild-section="FeaturesBentoWidgets" data-webild-section-id="FeaturesBentoWidgets-1" data-section="services" data-tone="deep" data-gallery>
        <FeaturesBentoWidgets
          className="bg-transparent"
          tag="Our Services"
          title="Boilers, leaks, and annual maintenance"
          description="Direct heating and plumbing solutions delivered by trusted local engineers across Leeds."
          backgroundImageSrc="https://img.b2bpic.net/free-photo/mechanic-filling-out-insurance-contract_482257-85122.jpg"
          items={[
            {
              tag: "Heating",
              title: "Boiler repairs & fixes",
              description: "Rapid fault diagnosis and repairs restoring hot water and central heating across Leeds.",
              tags: [
                "Gas Safe",
                "Fault Codes",
                "Radiators",
                "Controls",
                "Hot Water"
              ]
            },
            {
              title: "Completed jobs",
              description: "Over two decades of dependable heating and plumbing repairs for local homes.",
              value: "5,000+",
              valueLabel: "repairs completed"
            },
            {
              tag: "Emergency",
              title: "Leak detection",
              description: "Pinpointing hidden pipe leaks before they cause ceiling or structural damage.",
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-excited-repairman-holding-stethoscope-sitting-near-washer-white-space_140725-106453.jpg",
              imageAlt: "Front view excited repairman holding stethoscope sitting near washer on white space"
            },
            {
              title: "Service status",
              description: "Current availability for domestic callouts and routine maintenance.",
              rows: [
                {
                  label: "Boiler break downs",
                  value: "Same day"
                },
                {
                  label: "Burst pipe repair",
                  value: "Urgent"
                },
                {
                  label: "Annual boiler service",
                  value: "Available"
                }
              ]
            },
            {
              tag: "Routine",
              title: "Plumbing maintenance",
              description: "Annual safety checks, valve replacements, and radiator flushing for smooth running.",
              imageSrc: "https://img.b2bpic.net/free-photo/full-shot-man-working-as-plumber_23-2150746297.jpg",
              imageAlt: "Full shot man working as plumber"
            },
            {
              title: "Upfront pricing",
              description: "Transparent quotes with no hidden charges for every home job.",
              value: "100%",
              valueLabel: "fixed price quotes"
            }
          ]}
        />
      </div>

      <div id="gallery-tilt-cards" data-webild-section="GalleryTiltCards" data-webild-section-id="GalleryTiltCards-1" data-section="gallery-tilt-cards">
        <GalleryTiltCards
          tag="Completed Jobs"
          title="Neat pipework and boiler installs"
          description="A look at recent work completed in residential properties around Leeds."
          items={[
            {
              title: "Combi boiler replacement",
              tag: "Boiler Repair",
              date: "Feb 2026",
              description: "Installed and pressure-tested in modern kitchen cupboard space.",
              href: "#services",
              imageSrc: "https://img.b2bpic.net/free-photo/man-engaged-household-task_23-2151741241.jpg",
              imageAlt: "plumber bleeding radiator"
            },
            {
              title: "Copper pipework refit",
              tag: "Pipework",
              date: "Jan 2026",
              description: "Compliant, tidy pipe routes under floorboards.",
              href: "#services",
              imageSrc: "https://img.b2bpic.net/free-photo/adjusting-heating-valves-residential-building_169016-55768.jpg",
              imageAlt: "hands adjusting heating system valves"
            },
            {
              title: "Emergency leak patch",
              tag: "Leak Repair",
              date: "Jan 2026",
              description: "Fixed burst joint behind a ground-floor bathroom wall.",
              href: "#contact-dark-form-card",
              imageSrc: "https://img.b2bpic.net/free-photo/radiator-valve-macro-modern-heating-industrial-style_169016-69239.jpg",
              imageAlt: "close up of radiator valve"
            },
            {
              title: "Radiator upgrade",
              tag: "Radiators",
              date: "Dec 2025",
              description: "High-output panel radiator fitted in a Victorian terrace.",
              href: "#services",
              imageSrc: "https://img.b2bpic.net/free-photo/male-hands-with-wrench-turning-off-valves_169016-53780.jpg",
              imageAlt: "hands using wrench on pipes"
            },
            {
              title: "Thermal diagnostic check",
              tag: "Diagnostics",
              date: "Nov 2025",
              description: "Locating cold spots across central heating radiators.",
              href: "#services",
              imageSrc: "https://img.b2bpic.net/free-photo/plumbing-professional-doing-his-job_23-2150721546.jpg",
              imageAlt: "plumber fixing pipes under sink"
            },
            {
              title: "System maintenance",
              tag: "Maintenance",
              date: "Oct 2025",
              description: "Filter cleaning and pressure top-up on combi system.",
              href: "#services",
              imageSrc: "https://img.b2bpic.net/free-photo/modern-autonomous-heating-system-boiler-room_169016-51414.jpg",
              imageAlt: "Modern autonomous heating system in the boiler room"
            }
          ]}
          linkLabel="Book a repair quote"
          ariaLabel="Gallery of recent plumbing and boiler work in Leeds"
        />
      </div>

      <div id="customers" data-webild-section="TestimonialSpotlightCarousel" data-webild-section-id="TestimonialSpotlightCarousel-1" data-section="customers">
        <TestimonialSpotlightCarousel
          tag="Client Reviews"
          title="What local homeowners say about us"
          items={[
            {
              company: "Headingley Home",
              quote: "Leeds Plumbing Co saved the day when our boiler broke in mid-winter. Fast, friendly, and very professional. Highly recommended!",
              name: "Megan Ramirez",
              role: "Homeowner, Headingley",
              imageSrc: "https://img.b2bpic.net/free-photo/adorable-nice-charming-girl-drinking-coffee-sitting-table-countertop-modern-light-white-kitchen_231208-521.jpg",
              imageAlt: "Adorable nice charming girl drinking coffee, sitting on table countertop in modern light white kitchen",
              stats: [
                {
                  label: "Response time",
                  value: "45 minutes"
                },
                {
                  label: "Issue resolved",
                  value: "Same day"
                }
              ]
            },
            {
              company: "Roundhay Home",
              quote: "Fixed a hidden pipe leak under our kitchen floor quickly without damaging our tiling. Clean work and very fair pricing.",
              name: "Callum Hughes",
              role: "Homeowner, Roundhay",
              imageSrc: "https://img.b2bpic.net/free-photo/plumbing-inspection-man-overalls-with-badge-reclining-floor-with-tools_259150-58264.jpg",
              imageAlt: "Plumbing inspection Man in overalls with badge reclining on floor with tools",
              stats: [
                {
                  label: "Quote status",
                  value: "100% Fixed"
                },
                {
                  label: "Work outcome",
                  value: "Leak sealed"
                }
              ]
            },
            {
              company: "Horsforth Home",
              quote: "Annual boiler servicing and radiator flushing done smoothly. A reliable family team that really knows their stuff.",
              name: "Molly Graham",
              role: "Homeowner, Horsforth",
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-friends-spending-time-home_23-2150170887.jpg",
              imageAlt: "Medium shot friends spending time at home",
              stats: [
                {
                  label: "Heating rating",
                  value: "5 stars"
                },
                {
                  label: "Radiators checked",
                  value: "12 units"
                }
              ]
            }
          ]}
        />
      </div>

      <div id="faq-tray-accordion-1" data-webild-section="FaqTrayAccordion" data-webild-section-id="FaqTrayAccordion-1" data-section="faq-tray-accordion-1">
        <FaqTrayAccordion
          tag="Questions"
          title="Common questions before"
          highlight="you call us"
          items={[
            {
              title: "Are you available on weekends for emergencies?",
              description: "Yes, we prioritize emergency callouts and boiler breakdowns across Leeds on weekends with clear, transparent advice."
            },
            {
              title: "What areas in Leeds do you serve?",
              description: "We serve all Leeds postcodes including Headingley, Horsforth, Roundhay, Chapel Allerton, and surrounding areas."
            },
            {
              title: "Do you offer fixed quotes for repairs?",
              description: "Yes, we provide clear, upfront 100% fixed quotes before starting any non-emergency plumbing or heating work."
            },
            {
              title: "Should I service my boiler annually?",
              description: "Yes. An annual service maintains manufacturer warranties, prevents sudden breakdowns, and keeps your heating system safe."
            },
            {
              title: "What should I do if my boiler is leaking water?",
              description: "Turn off your main water valve immediately, switch off power to the boiler, and call our emergency line."
            },
            {
              title: "How long does a new boiler replacement take?",
              description: "A standard combi boiler swap in Leeds typically takes 1 to 2 days with minimal disruption to your home."
            }
          ]}
          help={{
            label: "Direct Help",
            title: "Still have questions?",
            description: "Speak with Katie Hayes for immediate assistance with boiler repairs and plumbing in Leeds.",
            cta: {
              text: "Get in touch",
              href: "#contact-dark-form-card"
            },
            imageSrc: "https://img.b2bpic.net/free-photo/portrait-happy-beautiful-brunette-female-wearing-working-clothes-apron-standing-workshop_613910-5811.jpg",
            imageAlt: "Portrait of a happy beautiful brunette female wearing working clothes and apron, standing in a workshop."
          }}
        />
      </div>

      <div id="contact-dark-form-card" data-webild-section="ContactDarkFormCard" data-webild-section-id="ContactDarkFormCard-1" data-section="contact-dark-form-card">
        <ContactDarkFormCard
          title="Get fast plumbing help in Leeds"
          formTitle="Request a fixed repair quote"
          fields={{
            name: "Full name",
            email: "Email address",
            company: "Leeds postcode",
            message: "Boiler or leak details"
          }}
          placeholders={{
            name: "e.g. Tyler Shaw",
            email: "hello@leedsplumbing.co.uk",
            company: "e.g. LS3 1LH",
            message: "Describe your boiler fault or plumbing leak details"
          }}
          submitText="Send repair request"
          successText="Thank you. Our family team will contact you shortly."
          imageSrc="https://img.b2bpic.net/free-photo/defective-manometers-zoom-shot_482257-96171.jpg"
          imageAlt="Defective manometers zoom in shot"
        />
      </div>
    </>
  );
}
