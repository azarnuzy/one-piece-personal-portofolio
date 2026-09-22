import {
  SiBetterauth,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiHono,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpentelemetry,
  SiPnpm,
  SiReact,
  SiRedis,
  SiSequelize,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiVitest,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { CpuIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

const TECH = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, label: "Next.js", color: "currentColor" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#38BDF8" },
  { Icon: SiVuedotjs, label: "Vue.js", color: "#4FC08D" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
  { Icon: SiExpress, label: "Express", color: "currentColor" },
  { Icon: SiSequelize, label: "Sequelize", color: "#52B0E7" },
  { Icon: SiRedis, label: "Redis", color: "#FF4438" },
  { Icon: SiGit, label: "Git", color: "#F05032" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
  { Icon: SiNginx, label: "Nginx", color: "#009639" },
  { Icon: SiVitest, label: "Vitest", color: "#6E9F18" },
  { Icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { Icon: SiHono, label: "Hono", color: "#E36002" },
  { Icon: SiTanstack, label: "TanStack", color: "currentColor" },
  { Icon: SiBetterauth, label: "Better Auth", color: "currentColor" },
  { Icon: SiOpentelemetry, label: "OTel", color: "#F5A800" },
  { Icon: SiGithubactions, label: "GH Actions", color: "#2088FF" },
  { Icon: SiPnpm, label: "pnpm", color: "#F69220" },
];

// Icons8 color logos (PNG from their CDN) for the SupportOps stack.
const ICONS8 = [
  { id: "38561", label: "PostgreSQL" },
  { id: "zJh5Gyrd6ZKu", label: "Prisma" },
  { id: "YO3YqSaTOu5K", label: "Vite" },
  { id: "pUf6Ty49x4KC", label: "MCP" },
];

const ANVIA_URL = "https://anvia.dev";

export function TechIUse() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="sunny" position="bottom-right" size={170} opacity={0.07} rotate={-6} />

      <div className="relative mb-4 flex shrink-0 items-center gap-2">
        <CpuIcon size={16} className="text-brand-sunset" />
        <h2 className="heading-section text-lg text-foreground">Tech I Use</h2>
      </div>

      <div className="relative grid grid-cols-4 gap-2.5">
        {TECH.map(({ Icon, label, color }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-muted/60 p-2.5 transition-colors hover:border-brand-treasure/50 hover:bg-brand-treasure/5"
          >
            <Icon size={20} style={{ color }} className="transition-transform" />
            <span className="font-sans text-2xs text-muted-foreground group-hover:text-card-foreground">
              {label}
            </span>
          </motion.div>
        ))}
        {ICONS8.map(({ id, label }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: (TECH.length + idx) * 0.05 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-muted/60 p-2.5 transition-colors hover:border-brand-treasure/50 hover:bg-brand-treasure/5"
          >
            <img
              src={`https://img.icons8.com/?id=${id}&format=png&size=40`}
              alt=""
              width={20}
              height={20}
              loading="lazy"
            />
            <span className="font-sans text-2xs text-muted-foreground group-hover:text-card-foreground">
              {label}
            </span>
          </motion.div>
        ))}
        <motion.a
          href={ANVIA_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: (TECH.length + ICONS8.length) * 0.05 }}
          whileHover={{ y: -3, scale: 1.04 }}
          className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-muted/60 p-2.5 transition-colors hover:border-brand-treasure/50 hover:bg-brand-treasure/5"
        >
          <img
            src="/tech/anvia-mark.png"
            alt=""
            width={20}
            height={20}
            loading="lazy"
            className="rounded-[4px]"
          />
          <span className="font-sans text-2xs text-muted-foreground group-hover:text-card-foreground">
            Anvia
          </span>
        </motion.a>
      </div>

      <p className="relative mt-3 text-right font-sans text-2xs text-muted-foreground">
        Some logos by{" "}
        <a
          href="https://icons8.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-card-foreground"
        >
          Icons8
        </a>
      </p>
    </motion.section>
  );
}
