import { SiDribbble, SiGithub } from "@icons-pack/react-simple-icons";
import { MailIcon } from "lucide-react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function LetsConnect() {
  return (
    <section className="flex h-full flex-col justify-center surface-card rounded-2xl border border-border p-6 md:p-8">
      <div className="mb-6 max-w-lg">
        <h2 className="mb-2 heading-section text-2xl text-foreground">🤝 Let's Connect!</h2>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          I'm open for opportunities and interesting projects. Let's create something amazing
          together! Feel free to reach out through any of these platforms.
        </p>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
        <PirateCTAButton
          variant="secondary"
          icon={<MailIcon size={16} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          Email Me
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<LinkedInIcon size={16} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          LinkedIn
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<SiGithub size={16} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          GitHub
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<SiDribbble size={16} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          Dribbble
        </PirateCTAButton>
      </div>
    </section>
  );
}
