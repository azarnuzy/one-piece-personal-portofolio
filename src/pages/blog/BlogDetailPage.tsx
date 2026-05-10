import { useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AnchorIcon,
  CodeIcon,
  HeartIcon,
  LightbulbIcon,
  QuoteIcon,
  TrendingUpIcon,
} from "lucide-react";
import { memo } from "react";

import { CategoriesWidget } from "./CategoriesWidget";
import { POSTS } from "./data";
import { LetsConnectWidget } from "./LetsConnectWidget";
import { PopularPostsWidget } from "./PopularPostsWidget";

// ─── Article sub-components ───────────────────────────────────────────────────

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 mb-3 flex items-center gap-2 heading-section text-base text-foreground md:text-lg">
      <span className="h-5 w-0.5 shrink-0 rounded-full bg-brand-treasure" aria-hidden />
      {children}
    </h2>
  );
}

function ArticleParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-sans text-sm leading-7 text-foreground/75 md:text-base md:leading-8">
      {children}
    </p>
  );
}

function ArticleCallout({
  icon: Icon,
  tone,
  children,
}: {
  icon: React.ElementType;
  tone: "treasure" | "sunset" | "info";
  children: React.ReactNode;
}) {
  const styles = {
    treasure: "border-brand-treasure/30 bg-brand-treasure/5 text-brand-treasure",
    sunset: "border-brand-sunset/30 bg-brand-sunset/5 text-brand-sunset",
    info: "border-brand-info/30 bg-brand-info/5 text-brand-info",
  }[tone];

  return (
    <div className={`my-5 flex gap-3 rounded-xl border border-l-[3px] p-4 ${styles}`}>
      <Icon size={16} className="mt-0.5 shrink-0" />
      <p className="font-sans text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}

function ArticleBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-5 flex gap-3 rounded-xl border border-brand-treasure/20 bg-brand-treasure/5 p-4 md:p-5">
      <QuoteIcon size={18} className="mt-0.5 shrink-0 text-brand-treasure/60" />
      <p className="font-display text-sm leading-relaxed text-foreground/80 italic md:text-base">
        {children}
      </p>
    </blockquote>
  );
}

function ArticleCode({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 px-4 py-2.5">
        <CodeIcon size={12} className="text-brand-treasure/70" />
        <span className="font-mono text-2xs text-muted-foreground">JavaScript</span>
        <div className="ml-auto flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-sunset/60" />
          <span className="h-2 w-2 rounded-full bg-brand-sun/60" />
          <span className="h-2 w-2 rounded-full bg-brand-success/60" />
        </div>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-foreground/80 md:text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function ArticleMilestoneList({ items }: { items: { year: string; text: string }[] }) {
  return (
    <ul className="my-5 flex flex-col gap-3">
      {items.map(({ year, text }) => (
        <li key={year} className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 rounded-full bg-brand-treasure/15 px-2 py-0.5 font-display text-2xs font-bold text-brand-treasure">
            {year}
          </span>
          <span className="font-sans text-sm leading-relaxed text-foreground/75">{text}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Static article body ──────────────────────────────────────────────────────

function ArticleBody() {
  return (
    <article className="min-w-0">
      <p className="mb-5 font-sans text-sm leading-7 text-foreground/75 md:text-base md:leading-8 [&:first-letter]:float-left [&:first-letter]:mr-2 [&:first-letter]:font-display [&:first-letter]:text-5xl [&:first-letter]:leading-none [&:first-letter]:font-bold [&:first-letter]:text-brand-treasure">
        Every developer has a story — a moment when a blank screen and a blinking cursor stopped
        feeling intimidating and started feeling like an invitation. For me, that moment arrived
        later than I expected, and it arrived quietly, without fanfare.
      </p>

      <ArticleHeading>The Spark That Started It All</ArticleHeading>

      <ArticleParagraph>
        It started during my second year of university when I stumbled across a YouTube tutorial on
        building a simple to-do list in vanilla JavaScript. I remember watching the DOM update in
        real time — items appearing and disappearing as if by magic — and thinking:{" "}
        <em>this is the closest thing to actual sorcery I've ever seen</em>. That evening I stayed
        up until 3 AM rebuilding the project from scratch, breaking everything, and fixing it again.
      </ArticleParagraph>

      <ArticleCallout icon={LightbulbIcon} tone="treasure">
        If you're just starting out, build small things obsessively. The gap between "I understand
        this concept" and "I can build this from memory" is crossed only by repetition.
      </ArticleCallout>

      <ArticleHeading>First Steps: Learning the Fundamentals</ArticleHeading>

      <ArticleParagraph>
        I spent the first three months doing nothing but HTML, CSS, and vanilla JavaScript. No
        frameworks, no shortcuts. I wanted to understand the DOM deeply before layering abstractions
        on top. One of the most useful exercises I did was replicating popular UI components from
        scratch — a modal, a dropdown, an image carousel.
      </ArticleParagraph>

      <ArticleCode>{`// My first attempt at a reusable component — messy, but mine
function createModal(content) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const box = document.createElement('div');
  box.className = 'modal-box';
  box.innerHTML = content;

  overlay.appendChild(box);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}

createModal('<h2>Hello World</h2><p>My first modal!</p>');`}</ArticleCode>

      <ArticleParagraph>
        Looking back at that code now makes me cringe — no accessibility, no keyboard support, no
        cleanup logic. But it was mine, and it worked, and it taught me more than any tutorial ever
        could.
      </ArticleParagraph>

      <ArticleHeading>Landing My First Real Project</ArticleHeading>

      <ArticleParagraph>
        About eight months in, a friend of a friend needed a website for their small business. It
        was nothing glamorous — just a landing page with a contact form — but it was a real client,
        a real deadline, and real money on the line. I said yes before I had any idea how to deliver
        it. That forced urgency is something I'd recommend to every early-career developer.
      </ArticleParagraph>

      <ArticleBlockquote>
        "Say yes to the project you're 60% confident you can deliver. The other 40% you'll figure
        out along the way. That's where real growth happens."
      </ArticleBlockquote>

      <ArticleParagraph>
        The project took me three times longer than a senior dev would have needed. I asked endless
        questions on Stack Overflow, broke the layout on mobile three times, and had a minor
        existential crisis over CSS flexbox. But I shipped it, the client loved it, and I had my
        first portfolio piece.
      </ArticleParagraph>

      <ArticleHeading>Key Milestones Along the Way</ArticleHeading>

      <ArticleParagraph>
        Growth in this field rarely feels linear. It comes in surges — long plateaus followed by
        sudden jumps in understanding. Here are the moments that felt like genuine leaps for me:
      </ArticleParagraph>

      <ArticleMilestoneList
        items={[
          { year: "2020", text: "Learned HTML, CSS, and vanilla JS — built my first 10 projects." },
          { year: "2021", text: "Picked up React and shipped my first SPA for a client." },
          {
            year: "2022",
            text: "Dived into TypeScript, testing, and CI/CD pipelines at my first internship.",
          },
          {
            year: "2023",
            text: "Joined a startup full-time — learned to work in a real product team under pressure.",
          },
          {
            year: "2024",
            text: "Started writing publicly, contributing to open source, and mentoring juniors.",
          },
        ]}
      />

      <ArticleHeading>Lessons That Changed How I Code</ArticleHeading>

      <ArticleParagraph>
        The biggest shift in my development wasn't technical — it was philosophical. Early on, I
        optimized for cleverness: the shortest, most "elegant" solution. Over time, I learned to
        optimize for readability. Code is read far more often than it is written, and the developer
        reading it six months from now is almost certainly going to be you.
      </ArticleParagraph>

      <ArticleCallout icon={TrendingUpIcon} tone="info">
        Name things clearly. Write code that explains itself. Leave comments only when the "why" is
        genuinely non-obvious. Your future self will thank you.
      </ArticleCallout>

      <ArticleParagraph>
        I also learned the value of shipping small. A feature that's 80% done and deployed is
        infinitely more useful than a perfect feature that lives on a local branch. Perfectionism is
        the enemy of progress, and in frontend development, user feedback beats internal debate
        every single time.
      </ArticleParagraph>

      <ArticleHeading>Where I Am Today & What's Next</ArticleHeading>

      <ArticleParagraph>
        Four years in, I'm still learning every single day — and that's exactly how I like it. The
        ecosystem moves fast: new frameworks emerge, old patterns get replaced, best practices
        evolve. What keeps me grounded is a deep understanding of the fundamentals and a genuine
        curiosity for what comes next.
      </ArticleParagraph>

      <ArticleParagraph>
        If you're reading this at the start of your own journey: stay consistent, build things
        relentlessly, and don't be afraid to ship imperfect work. The path from curious beginner to
        confident developer isn't linear, but it is very much real — and it starts with a blinking
        cursor and enough stubbornness to keep going.
      </ArticleParagraph>

      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
        <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <HeartIcon size={13} className="text-brand-sunset/70" />
          <span>If this resonated with you, share it with someone starting their journey.</span>
        </div>
      </div>
    </article>
  );
}

// ─── Blog Detail Page ─────────────────────────────────────────────────────────

function BlogDetailPageInner() {
  const { postId } = useParams({ strict: false }) as { postId?: string };
  const post = postId ? (POSTS.find((p) => p.id === postId) ?? POSTS[0]) : POSTS[0];

  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-3 pt-4 pb-6 md:px-5 md:pt-5 md:pb-8 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* Left: article */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 flex-1 rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm md:p-6"
          >
            <ArticleBody />
          </motion.div>

          {/* Right: sidebar widgets */}
          <div className="flex flex-col gap-3 lg:w-[248px] lg:shrink-0 xl:w-[264px]">
            <PopularPostsWidget />
            <CategoriesWidget />
            <LetsConnectWidget />
          </div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-6">
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          Made with <HeartIcon size={11} className="text-brand-sunset" /> and lots of ☕
        </span>
      </footer>
    </>
  );
}

export const BlogDetailPage = memo(BlogDetailPageInner);
