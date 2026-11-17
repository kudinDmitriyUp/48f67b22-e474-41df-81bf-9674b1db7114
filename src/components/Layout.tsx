import { Outlet } from "react-router-dom";
import NavbarFloatingPill from "@/components/navbars/NavbarFloatingPill";
import FooterTrayWordmark from "@/components/sections/footer/FooterTrayWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="chip" data-card="tray" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarFloatingPill
          brand="Leeds Plumbing Co."
          navItems={[
            {
              name: "Home",
              href: "#home"
            },
            {
              name: "About Us",
              href: "#about"
            },
            {
              name: "Services",
              href: "#services"
            },
            {
              name: "Gallery",
              href: "#gallery-tilt-cards"
            },
            {
              name: "FAQ",
              href: "#faq-tray-accordion-1"
            }
          ]}
          cta={{
            text: "Contact Us",
            href: "#contact-dark-form-card"
          }}
          introDelay={1.2}
        />
      </header>
      <main className="flex-grow" data-button="chip" data-card="tray" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterTrayWordmark
          brand="Leeds Plumbing Co."
          wordmark="Leeds Plumbing Co."
          columns={[
            {
              title: "Services",
              links: [
                {
                  text: "Boiler Repairs",
                  href: "#services"
                },
                {
                  text: "Leak Detection",
                  href: "#services"
                },
                {
                  text: "System Maintenance",
                  href: "#services"
                },
                {
                  text: "Emergency Callouts",
                  href: "#contact-dark-form-card"
                }
              ]
            },
            {
              title: "Company",
              links: [
                {
                  text: "About Us",
                  href: "#about"
                },
                {
                  text: "Our Work",
                  href: "#gallery-tilt-cards"
                },
                {
                  text: "Customer Reviews",
                  href: "#customers"
                }
              ]
            },
            {
              title: "Help & Support",
              links: [
                {
                  text: "Frequently Asked Questions",
                  href: "#faq-tray-accordion-1"
                },
                {
                  text: "Request a Fixed Quote",
                  href: "#contact-dark-form-card"
                },
                {
                  text: "Coverage Areas",
                  href: "#about"
                }
              ]
            },
            {
              title: "Contact",
              links: [
                {
                  text: "hello@leedsplumbing.co.uk",
                  href: "mailto:hello@leedsplumbing.co.uk"
                },
                {
                  text: "12 Kirkstall Road, Leeds, LS3 1LH",
                  href: "#contact-dark-form-card"
                }
              ]
            }
          ]}
          copyright="© 2026 Leeds Plumbing Co. All rights reserved."
          topText="Back to top"
        />
      </footer>
    </div>
  );
}
