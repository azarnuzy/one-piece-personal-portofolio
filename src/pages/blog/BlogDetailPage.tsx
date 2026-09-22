import { useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertTriangleIcon,
  AnchorIcon,
  CodeIcon,
  HeartIcon,
  LightbulbIcon,
  QuoteIcon,
  TrendingUpIcon,
} from "lucide-react";
import { memo, type ReactElement } from "react";

import { POSTS } from "./data";

// ─── Article sub-components ───────────────────────────────────────────────────

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 mb-3 flex items-center gap-2 heading-section text-base text-foreground md:text-lg">
      <span className="h-5 w-0.5 shrink-0 rounded-full bg-accent-soft" aria-hidden />
      {children}
    </h2>
  );
}

function ArticleParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-sans text-sm leading-7 text-secondary-foreground md:text-base md:leading-8">
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
    treasure: "border-accent-soft/30 bg-accent-soft/5 text-accent-soft",
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
    <blockquote className="my-5 flex gap-3 rounded-xl border border-accent-soft/20 bg-accent-soft/5 p-4 md:p-5">
      <QuoteIcon size={18} className="mt-0.5 shrink-0 text-accent-soft/60" />
      <p className="font-display text-sm leading-relaxed text-foreground/80 italic md:text-base">
        {children}
      </p>
    </blockquote>
  );
}

function ArticleCode({
  language = "TypeScript",
  children,
}: {
  language?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 px-4 py-2.5">
        <CodeIcon size={12} className="text-accent-soft/75" />
        <span className="font-mono text-2xs text-muted-foreground">{language}</span>
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

function ArticleLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-sans text-sm leading-7 text-secondary-foreground md:text-base md:leading-8 [&:first-letter]:float-left [&:first-letter]:mr-2 [&:first-letter]:font-display [&:first-letter]:text-5xl [&:first-letter]:leading-none [&:first-letter]:font-bold [&:first-letter]:text-accent-soft">
      {children}
    </p>
  );
}

function ArticleFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-6">
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full rounded-xl border border-border/50 shadow-[var(--shadow-card)]"
        />
      </a>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function ArticleTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full font-sans text-xs md:text-sm">
        <thead className="bg-muted/40 text-left text-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40 text-secondary-foreground">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleList({ ordered, children }: { ordered?: boolean; children: React.ReactNode }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List
      className={`mb-4 space-y-2 pl-5 font-sans text-sm leading-7 text-secondary-foreground md:text-base md:leading-8 ${ordered ? "list-decimal" : "list-disc"} marker:text-accent-soft`}
    >
      {children}
    </List>
  );
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-soft underline underline-offset-2 hover:text-brand-sunset"
    >
      {children}
    </a>
  );
}

// ─── Article: Sygma Studio ────────────────────────────────────────────────────

function SygmaStudioArticle() {
  return (
    <article className="min-w-0">
      <ArticleLead>
        Six months into building Sygma Studio, an enterprise-grade AI orchestration platform, I
        realized I'd been thinking about frontend architecture entirely wrong. We weren't shipping a
        web app. We were shipping a control surface for a system that had to talk to LLMs, document
        extractors, voice simulators, WhatsApp Business, and an embeddable widget — all from a
        single React codebase.
      </ArticleLead>

      <ArticleHeading>The Problem We Were Actually Solving</ArticleHeading>

      <ArticleParagraph>
        Most "AI chatbot" platforms stop at a chat window. Sygma had to go further. The product team
        needed RBAC-gated workflows for non-technical operators, a WYSIWYG editor for WhatsApp
        templates with dynamic variables and carousel previews, a voice-to-voice simulator with
        sub-second latency, and an embeddable widget that could be dropped into any third-party
        website without polluting their CSS or JS namespace.
      </ArticleParagraph>

      <ArticleCallout icon={LightbulbIcon} tone="treasure">
        When the surface area of your product is this broad, the cost of every architectural
        decision compounds. A wrong abstraction in week 2 becomes a four-week refactor in month 4.
      </ArticleCallout>

      <ArticleHeading>Zero-Dependency Widget: The Hardest Constraint</ArticleHeading>

      <ArticleParagraph>
        The embeddable widget was the part I was most nervous about. It needed to be{" "}
        <em>dropped into any website</em> with a single script tag, isolated from the host's styles,
        and weigh less than a typical icon font. We rejected React on the widget side entirely. The
        final bundle ships as a self-contained ESM module with styled-components for CSS isolation,
        a custom event bus for host communication, and a shadow-DOM fallback for the environments
        where styled-components alone wasn't enough.
      </ArticleParagraph>

      <ArticleCode language="TypeScript">{`// Single-script bootstrap — no peer deps, no globals leaked
(function bootstrap() {
  const script = document.currentScript as HTMLScriptElement;
  const tenantId = script.dataset.tenant!;

  // Mount in an isolated container so host CSS can't bleed in
  const host = document.createElement("div");
  host.id = "sygma-widget-root";
  document.body.appendChild(host);

  import(/* webpackIgnore: true */ \`\${CDN}/widget.\${VERSION}.js\`).then((m) => {
    m.mount(host, { tenantId, theme: script.dataset.theme });
  });
})();`}</ArticleCode>

      <ArticleHeading>RAG Ingestion and the Chunking Visualizer</ArticleHeading>

      <ArticleParagraph>
        Building a RAG pipeline is well-trodden ground. Making it <em>debuggable for operators</em>{" "}
        is not. Our team kept hitting the same support ticket: "Why didn't the bot find this
        answer?" The honest answer was always the same — the chunk boundaries fell badly, or the
        embedding similarity threshold was off. So we shipped a chunking visualizer and a search
        simulator that let non-engineers inspect both before deploying changes to production.
      </ArticleParagraph>

      <ArticleBlockquote>
        "The bottleneck in enterprise AI isn't model quality. It's the feedback loop between the
        operator who notices a wrong answer and the engineer who can fix it. Shorten that loop, and
        the whole product gets better."
      </ArticleBlockquote>

      <ArticleHeading>Voice-to-Voice Simulator: Latency Was the Product</ArticleHeading>

      <ArticleParagraph>
        Telerobotic, our voice simulator, demanded a different mental model entirely. Frontend
        latency budgets are usually generous — 100ms here, 200ms there, nobody complains. With
        voice, anything above 400ms round-trip feels broken. We had to instrument every layer:
        WebRTC signaling, server-side speech-to-text, LLM inference, tool calls, and TTS playback.
        The event log visualization wasn't decorative — it was the only way our QA team could tell
        whether a regression was in our code or in a vendor SDK update.
      </ArticleParagraph>

      <ArticleCallout icon={TrendingUpIcon} tone="info">
        Build the observability surface before you build the feature. Once you can see what's slow,
        the optimization opportunities become obvious. Once you can't, every "it feels sluggish"
        report eats a day of investigation.
      </ArticleCallout>

      <ArticleHeading>What I'd Do Differently</ArticleHeading>

      <ArticleParagraph>
        If I rebuilt Sygma from scratch tomorrow, the first thing I'd change is the data layer. We
        leaned on React Query for everything, which was the right call for cached reads but a poor
        fit for the streaming, event-driven parts of the app (voice, RAG progress). The mix of
        imperative event streams and declarative cache invalidation got tangled enough that I'd
        introduce a dedicated streaming primitive — probably a custom hook over WebSocket
        subscriptions with explicit lifecycle ownership — much earlier.
      </ArticleParagraph>

      <ArticleParagraph>
        The second thing: ship the embeddable widget on day one, even as a stub. We built it last,
        and a lot of architectural assumptions baked into the dashboard had to be unwound to make
        the widget feasible. Constraints that arrive late are the most expensive constraints.
      </ArticleParagraph>

      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
        <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <HeartIcon size={13} className="text-brand-sunset/70" />
          <span>Working on enterprise AI? I'd love to hear what you're shipping.</span>
        </div>
      </div>
    </article>
  );
}

// ─── Article: Cakra Smart Search ──────────────────────────────────────────────

function CakraArticle() {
  return (
    <article className="min-w-0">
      <ArticleLead>
        Mobile banking apps have a navigation problem. Every feature lives behind three taps, four
        if you count the loading state. When we started Cakra Smart Search, the brief was simple on
        paper: let users get to any feature in one sentence. Six months later, that one sentence had
        reshaped how I think about UX entirely.
      </ArticleLead>

      <ArticleHeading>Why Menus Are an Anti-Pattern in Banking</ArticleHeading>

      <ArticleParagraph>
        The conventional mobile banking app has 30–50 features and roughly seven slots on its home
        screen. Everything else hides under "More," and "More" is where good UX goes to die. Cakra's
        research surfaced something we'd all known intuitively: users don't learn the menu
        structure. They learn the <em>path</em> to the two or three features they use most, and
        anything outside that path is a friction wall.
      </ArticleParagraph>

      <ArticleCallout icon={LightbulbIcon} tone="treasure">
        Intent-based UX isn't about hiding the menu. It's about admitting the menu was always a
        crutch — a side-effect of designers and engineers needing to organize work, not users
        needing to organize their thoughts.
      </ArticleCallout>

      <ArticleHeading>The Web Speech API, Used Seriously</ArticleHeading>

      <ArticleParagraph>
        Most voice-input demos stop at "tell me what you said." We needed to take the spoken
        sentence and route it through an intent classifier, extract entities (recipient, amount,
        account), and pre-fill a multi-step transaction form. The Web Speech API gets you the
        transcription. Everything after that is yours to build.
      </ArticleParagraph>

      <ArticleCode language="TypeScript">{`function useVoiceIntent() {
  const recognition = useMemo(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.lang = "id-ID";
    r.interimResults = false;
    r.maxAlternatives = 3;
    return r;
  }, []);

  return useCallback(async () => {
    if (!recognition) throw new Error("voice-unsupported");

    const transcript = await new Promise<string>((resolve, reject) => {
      recognition.onresult = (e) => resolve(e.results[0][0].transcript);
      recognition.onerror = (e) => reject(e.error);
      recognition.start();
    });

    return classifyIntent(transcript); // → { route, entities }
  }, [recognition]);
}`}</ArticleCode>

      <ArticleHeading>Context-Aware Form Hydration</ArticleHeading>

      <ArticleParagraph>
        Once we had intent + entities, we needed forms that could be partially pre-filled and still
        feel coherent. The trick was treating the URL as the source of truth for the search context
        — every transaction screen reads its initial state from query params, which means the same
        screen reached via tap, voice, or deep link behaves identically. No two code paths for "user
        navigated normally" versus "user came from voice intent."
      </ArticleParagraph>

      <ArticleBlockquote>
        "Make voice navigation a strict subset of regular navigation. If your voice path has its own
        state machine, you have two products to maintain — and only one of them gets tested."
      </ArticleBlockquote>

      <ArticleHeading>The 40+ Transaction Lifecycle Problem</ArticleHeading>

      <ArticleParagraph>
        Cakra supports more than 40 distinct transaction types — transfers, bill payments, virtual
        account top-ups, QRIS payments, foreign exchange — each with its own validation rules, OTP
        flow, receipt format, and success state. The temptation is to build 40 screens. The actual
        answer was a generic transaction shell with pluggable validation, confirmation, and success
        components, driven by a per-transaction config.
      </ArticleParagraph>

      <ArticleCallout icon={TrendingUpIcon} tone="info">
        When you find yourself copy-pasting the third near-identical screen, stop. The right
        abstraction is almost always config-driven — but only after you've built two or three
        screens by hand and seen the actual axes of variation.
      </ArticleCallout>

      <ArticleHeading>What Voice Taught Me About UX</ArticleHeading>

      <ArticleParagraph>
        I came into Cakra thinking voice was a novelty layer on top of a normal app. I left
        convinced it's a forcing function. When you commit to "any feature in one sentence," you
        stop tolerating screens that exist purely because the menu had room for them. You delete the
        cruft. You consolidate. The app gets smaller, and the surface that's left is the surface
        that matters.
      </ArticleParagraph>

      <ArticleParagraph>
        If you're considering adding voice to a product, my advice is to use it as a UX audit before
        you ship it as a feature. Try to navigate your own app by sentence alone. The screens you
        can't reach are the screens you probably shouldn't have built.
      </ArticleParagraph>

      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
        <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <HeartIcon size={13} className="text-brand-sunset/70" />
          <span>Building voice or intent-based UX? Curious to compare notes.</span>
        </div>
      </div>
    </article>
  );
}

// ─── Article: Hiazee ──────────────────────────────────────────────────────────

function HiazeeArticle() {
  return (
    <article className="min-w-0">
      <ArticleLead>
        Hiazee was supposed to be a graduation project. An AI-powered plant marketplace built for
        the Bangkit Academy capstone — scan a plant, identify the species, buy it from the nearest
        seller. The classroom version worked. It earned us a good grade. Then I tried to turn it
        into something real, and almost every assumption I'd made in school broke at once.
      </ArticleLead>

      <ArticleHeading>What "Working" Means in a Classroom vs. Production</ArticleHeading>

      <ArticleParagraph>
        In the capstone, "working" meant the demo ran without crashing. The ML model classified the
        three plants we'd shown it during training. The checkout flow accepted the one test card the
        lecturer used. The whole app was a beautiful Potemkin village — perfect from the angle we
        were grading it from, hollow everywhere else.
      </ArticleParagraph>

      <ArticleParagraph>
        The production rewrite is where you learn that "working" actually means: handles a wrong
        image gracefully, fails gracefully on a slow connection, doesn't lose the cart when the user
        backgrounds the app, recovers when the payment provider returns a 502, behaves the same on
        three years of Android versions, and stays under 200KB of initial JS so it loads on a 3G
        connection in a kampung.
      </ArticleParagraph>

      <ArticleCallout icon={LightbulbIcon} tone="treasure">
        Capstone projects optimize for "demo demo demo." Real products optimize for everything that
        happens when nobody is watching the demo. The gap between those two is the gap between a
        portfolio piece and a product.
      </ArticleCallout>

      <ArticleHeading>Recoil + React Query: A Pairing That Saved Me</ArticleHeading>

      <ArticleParagraph>
        The most concrete technical lesson from Hiazee was the split between server state and client
        state. In the capstone, everything lived in Redux. In production, that one global store
        turned into a swamp — stale server data, optimistic updates that drifted out of sync,
        components re-rendering for state they didn't read.
      </ArticleParagraph>

      <ArticleParagraph>
        Splitting the layers cleanly fixed almost everything. React Query owns anything that comes
        from the API — products, plant identifications, order history, user profile. Recoil owns
        anything that's purely client-side — the cart selection, the camera preview state, the
        search filter chips. The boundary became obvious, and the bug class of "data is stale
        somewhere but I can't find where" disappeared entirely.
      </ArticleParagraph>

      <ArticleCode language="TypeScript">{`// One source of truth per concern — server vs. client
const cartItemsAtom = atom<CartItem[]>({
  key: "cart/items",
  default: [],
});

function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id),
    staleTime: 60_000,
  });
}

// Composition stays clean — no global store muddling the two layers
function ProductDetail({ id }: { id: string }) {
  const { data: product } = useProduct(id);
  const [cart, setCart] = useRecoilState(cartItemsAtom);
  // ...
}`}</ArticleCode>

      <ArticleHeading>The ML Model Was Wrong More Than Right</ArticleHeading>

      <ArticleParagraph>
        Our plant classifier hit 94% accuracy on the test set. That number was a lie. In production,
        it was closer to 60%. The reason is mundane: the test set was photos in good light, of
        healthy plants, taken straight on. The real users submitted blurry photos in bedroom
        lighting of half-dead plants with one drooping leaf and a finger in frame.
      </ArticleParagraph>

      <ArticleBlockquote>
        "Your test set is a fantasy of your real users. Replace the fantasy with a steady stream of
        actual production data, or your model accuracy numbers are decorations."
      </ArticleBlockquote>

      <ArticleParagraph>
        The fix wasn't a better model — it was a better UX around the model's uncertainty. We added
        a confidence threshold and a "show me the top 3 candidates" flow when the model wasn't sure.
        The product got better and the user complaints dropped, even though the model itself never
        improved.
      </ArticleParagraph>

      <ArticleHeading>What I Unlearned</ArticleHeading>

      <ArticleParagraph>
        I unlearned "the architecture I picked in week one is the architecture I'll have in month
        six." It almost never is, and trying to lock it in early just makes the inevitable refactor
        more painful. I unlearned "if the demo works, the product works." The demo works because the
        demo is choreographed; the product has to work when nobody is choreographing it.
      </ArticleParagraph>

      <ArticleCallout icon={TrendingUpIcon} tone="info">
        Treat your first version as a learning artifact, not a foundation. The second version is
        where you build to last — and you can only build to last once you've been wrong about enough
        things in the first.
      </ArticleCallout>

      <ArticleParagraph>
        Hiazee never reached its production launch in the form we originally imagined. The
        marketplace pivoted, the team scattered post-graduation, and the codebase eventually went
        cold. But the lessons stayed. Every project I've shipped since — Sygma Studio, Cakra, all of
        them — owes something to the version of me that learned, on Hiazee, that capstone-grade is
        not production-grade and never will be.
      </ArticleParagraph>

      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
        <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <HeartIcon size={13} className="text-brand-sunset/70" />
          <span>Just shipped your first real project? I'd love to hear how it went.</span>
        </div>
      </div>
    </article>
  );
}

// ─── Article: SupportOps HTTP/3 stalls ────────────────────────────────────────

const HTTP3_IMG = "/article/supportops-http3";

function SupportOpsHttp3Article() {
  return (
    <article className="min-w-0">
      <ArticleFigure
        src={`${HTTP3_IMG}/request-path.png`}
        alt="The same request over HTTP/3 and over HTTP/2"
        caption="The same request over two transports: before (HTTP/3 · QUIC · UDP 443) and after (HTTP/2 · TCP 443)."
      />

      <ArticleHeading>It Started with One Slow Ticket</ArticleHeading>

      <ArticleLead>
        That afternoon I opened the SupportOps Inbox and clicked on a resolved Ticket. It took about
        ten seconds to load. Another Ticket opened instantly. Then I tried the home page,{" "}
        <C>support.azarnuzy.com</C>, and got a blank white screen with a spinner that never stopped.
      </ArticleLead>

      <ArticleFigure
        src={`${HTTP3_IMG}/08-browser-page-stuck-loading.png`}
        alt="The SupportOps home page stuck on a blank loading screen"
        caption="support.azarnuzy.com stuck on a blank page, the spinner still going."
      />

      <ArticleParagraph>
        Bugs that are "sometimes fast, sometimes slow" are hard to track down, because the cause
        could be almost anywhere. My first guess was the obvious one: the server was slow. Maybe a
        heavy query, maybe the VPS was running out of memory, maybe it needed caching.
      </ArticleParagraph>

      <ArticleParagraph>
        None of that turned out to be true. The server was fine the whole time. The problem was the{" "}
        <strong>transport the browser used to connect to the server</strong>. This post walks
        through how I got there.
      </ArticleParagraph>

      <ArticleHeading>
        First Observation: Small Responses Were Fast, Large Ones Were Slow
      </ArticleHeading>

      <ArticleParagraph>
        I opened DevTools, went to the Network tab, filtered by Fetch/XHR, and opened the Ticket
        again.
      </ArticleParagraph>

      <ArticleFigure
        src={`${HTTP3_IMG}/01-network-fetch-xhr-list.png`}
        alt="DevTools Network tab when opening a Ticket"
        caption="DevTools Network tab when opening a Ticket."
      />

      <ArticleParagraph>
        Almost every request finished in 36–86 ms, except one: the Ticket detail request, which took{" "}
        <strong>9.54 s</strong>. Looking closer, the larger the response, the longer it took:
      </ArticleParagraph>

      <ArticleTable
        head={["Request", "Size", "Time"]}
        rows={[
          [<C key="r">session, users, read</C>, "< 1 kB", "36–80 ms"],
          [<C key="r">tickets (list)</C>, "~3 kB", "394–485 ms"],
          [<C key="r">tickets/:id (detail)</C>, "~16 kB", <strong key="t">9.54 s</strong>],
        ]}
      />

      <ArticleParagraph>
        The server does about the same amount of work for each of these. What differs is the number
        of <strong>packets</strong> each response needs. A 16 kB response is split into roughly
        twelve packets of 1.2–1.5 kB. If even one of them is lost, the whole response has to wait
        for it to be resent.
      </ArticleParagraph>

      <ArticleHeading>The Server Had Already Responded in 124 ms</ArticleHeading>

      <ArticleParagraph>I clicked on the slow request and opened the Timing tab.</ArticleParagraph>

      <ArticleFigure
        src={`${HTTP3_IMG}/04-ticket-detail-timing-download-9s.png`}
        alt="Timing panel of the slow Ticket request"
        caption="Timing panel of the slow Ticket request."
      />

      <ArticleList>
        <li>
          <strong>Waiting for server response (TTFB): 124.57 ms</strong>
        </li>
        <li>
          <strong>Content download: 9.42 s</strong>
        </li>
      </ArticleList>

      <ArticleParagraph>
        This is the most important screenshot here. TTFB shows how long the server spent processing
        the request: queries, the handler, business logic. Content download shows how long it took
        for the data to reach the browser. The API was done in 124 ms. The remaining 9.4 seconds
        were spent just getting 16 kB from the proxy to my laptop.
      </ArticleParagraph>

      <ArticleCallout icon={LightbulbIcon} tone="treasure">
        So the database and the application code weren't the cause. The problem was somewhere on the
        path between the server and the laptop.
      </ArticleCallout>

      <ArticleHeading>Checking the Other Possibilities</ArticleHeading>

      <ArticleParagraph>
        I looked at the VPS monitoring for the hour of the incident. The server was barely doing
        anything: CPU averaged <strong>7.7%</strong> (peak 13.9%), memory was at{" "}
        <strong>40%</strong>, disk utilisation was <strong>0.02%</strong>, and there were only 3 TCP
        connections on average. A 2-vCPU VPS at 8% CPU doesn't need nine seconds to send 16 kB.
      </ArticleParagraph>

      <ArticleParagraph>
        Then I tested with <C>curl</C> from the same laptop on the same network:
      </ArticleParagraph>

      <ArticleTable
        head={["Test", "Result"]}
        rows={[
          [
            <span key="t">
              <C>GET /</C> (HTML shell), 3 runs
            </span>,
            "0.18–0.23 s",
          ],
          [
            <span key="t">
              <C>GET /assets/index-*.js</C> (253 kB), <strong>30 runs</strong>
            </span>,
            <span key="r">
              <strong>median 0.23 s</strong>, slowest 0.53 s
            </span>,
          ],
          [
            "ICMP ping × 20 to the VPS",
            <span key="r">
              <strong>0% loss</strong>, 47 ms RTT
            </span>,
          ],
        ]}
      />

      <ArticleParagraph>
        <C>curl</C> was fast on all 30 runs, while the browser on the same laptop kept stalling.
        Same laptop, same network, same server. So what was different between <C>curl</C> and the
        browser?
      </ArticleParagraph>

      <ArticleParagraph>The answer was in the response headers:</ArticleParagraph>

      <ArticleCode language="HTTP">{`alt-svc: h3=":443"; ma=2592000`}</ArticleCode>

      <ArticleHeading>Some Background: What Is alt-svc?</ArticleHeading>

      <ArticleParagraph>
        To make sense of this header, it helps to know a bit about how HTTP gets from one machine to
        another.
      </ArticleParagraph>

      <ArticleParagraph>
        <strong>TCP and UDP.</strong> Nearly all internet traffic runs on one of these two
        protocols. <strong>TCP</strong> is like sending a parcel with tracking: there's a handshake
        up front, every packet is acknowledged, and lost packets are resent automatically by the
        operating system. <strong>UDP</strong> is much simpler: each packet (a <em>datagram</em>) is
        sent without any check that it arrived. Routers, NATs and firewalls have handled TCP well
        for decades. UDP, on the other hand, is often rate-limited, given lower priority, or blocked
        entirely.
      </ArticleParagraph>

      <ArticleParagraph>
        <strong>HTTP/2 and HTTP/3.</strong> HTTP/2 (2015) runs over TCP and lets many requests share
        a single connection (<em>multiplexing</em>). HTTP/3 (2022,{" "}
        <A href="https://www.rfc-editor.org/rfc/rfc9114">RFC 9114</A>) runs over{" "}
        <strong>QUIC</strong>, and QUIC runs over <strong>UDP</strong>. QUIC adds the features you'd
        normally get from TCP (retransmission, ordering, congestion control, TLS 1.3) on top of UDP.
        On networks that don't restrict UDP, it works well. The catch is that, as far as the network
        is concerned, QUIC traffic is <strong>just UDP traffic</strong>.
      </ArticleParagraph>

      <ArticleParagraph>
        <strong>Alt-Svc.</strong> A browser never starts with HTTP/3. The first connection always
        goes over TCP, and the server then tells the browser that it also supports HTTP/3 on UDP
        port 443. The browser remembers this for 30 days. That's what{" "}
        <C>alt-svc: h3=":443"; ma=2592000</C> means (
        <A href="https://www.rfc-editor.org/rfc/rfc7838">RFC 7838</A>). From then on, the browser
        switches to QUIC.
      </ArticleParagraph>

      <ArticleCallout icon={AlertTriangleIcon} tone="sunset">
        Worth noting: I never enabled HTTP/3. Caddy turns it on by default, because the default
        value of its <C>protocols</C> option is <C>h1 h2 h3</C> (
        <A href="https://caddyserver.com/docs/caddyfile/options">docs</A>). HTTP/3 had been active
        since the very first deploy.
      </ArticleCallout>

      <ArticleParagraph>
        Now things started to add up. <C>curl</C> was using <strong>HTTP/2 over TCP</strong>, while
        the browser had received <C>alt-svc</C> and was using{" "}
        <strong>HTTP/3 over QUIC (UDP)</strong>. And I was on a <strong>phone hotspot</strong> at
        the time.
      </ArticleParagraph>

      <ArticleHeading>The Test That Confirmed It</ArticleHeading>

      <ArticleParagraph>
        To be sure, I needed to test this. I opened <C>brave://flags/#enable-quic</C> and set{" "}
        <strong>Experimental QUIC protocol</strong> to <em>Disabled</em>.
      </ArticleParagraph>

      <ArticleFigure
        src={`${HTTP3_IMG}/09-brave-flags-enable-quic.png`}
        alt="Brave flags page with the QUIC option"
        caption="Brave flags page with the QUIC option."
      />

      <ArticleParagraph>
        I didn't change anything else: same server, same network, same pages. The app became{" "}
        <strong>really smooth</strong>. Every Ticket opened right away.
      </ArticleParagraph>

      <ArticleParagraph>
        This A/B test was the key piece of evidence. The earlier steps narrowed things down; this
        one confirmed the cause.
      </ArticleParagraph>

      <ArticleHeading>Why UDP Struggles on a Phone Hotspot</ArticleHeading>

      <ArticleParagraph>
        Mobile networks are known to be unfriendly to UDP, for three main reasons:
      </ArticleParagraph>

      <ArticleList>
        <li>
          <strong>Short-lived NAT bindings.</strong> On mobile networks, one public IP is shared by
          thousands of subscribers through <strong>CGNAT</strong> (Carrier-Grade NAT). A TCP
          connection has a clear start and end, so the NAT can track it easily. UDP has no such
          markers, so the NAT only keeps it around for a limited time. According to{" "}
          <A href="https://www.rfc-editor.org/rfc/rfc9308#section-3.2">RFC 9308 §3.2</A>, a UDP
          binding <em>"can expire after just thirty seconds of inactivity"</em>.
        </li>
        <li>
          <strong>A smaller MTU.</strong> Tethering and carrier tunnels reduce the maximum packet
          size (<strong>MTU</strong>). TCP adapts by sending smaller segments. QUIC can't, because
          its datagrams must be at least 1200 bytes (
          <A href="https://www.rfc-editor.org/rfc/rfc9000#section-14.1">RFC 9000 §14.1</A>) and{" "}
          <strong>must not</strong> be fragmented (
          <A href="https://www.rfc-editor.org/rfc/rfc9000#section-14.2">§14.2</A>). A packet that's
          too large is simply dropped, with no notice to either side.
        </li>
        <li>
          <strong>UDP shaping.</strong> RFC 9308 §2 notes that{" "}
          <em>"between 3% and 5% of networks block all UDP traffic"</em>. Other networks don't block
          UDP but slow it down, which is much harder to spot.
        </li>
      </ArticleList>

      <ArticleHeading>The Surprise: The Browser Doesn't Fall Back to TCP</ArticleHeading>

      <ArticleParagraph>
        It's easy to assume the browser will switch to TCP if QUIC fails. That's true, but only in
        certain cases. Ian Swett, a QUIC engineer on Chromium,{" "}
        <A href="https://groups.google.com/a/chromium.org/g/proto-quic/c/cWoQxBMopR0">explains</A>:
      </ArticleParagraph>

      <ArticleBlockquote>
        If the handshake fails (i.e. UDP is blackholed), Chrome will mark QUIC as broken, then retry
        the request over TCP without the user having to reload. […] If a request fails post
        handshake, there is no auto-retry.
      </ArticleBlockquote>

      <ArticleParagraph>
        That's the explanation. If UDP is <strong>completely</strong> blocked, the handshake fails
        and the browser quietly moves to TCP, so users never notice. But if UDP is only{" "}
        <strong>partly</strong> broken, the small handshake packets still get through and the
        connection looks healthy. Then many of the larger packets carrying the response body get
        lost, and the request hangs.
      </ArticleParagraph>

      <ArticleParagraph>Put in order, here's what happened:</ArticleParagraph>

      <ArticleList ordered>
        <li>
          Caddy sent <C>alt-svc: h3</C>, and the browser switched to QUIC.
        </li>
        <li>The QUIC handshake succeeded.</li>
        <li>The API responded in 124 ms, and the headers reached the browser.</li>
        <li>
          Some of the full-size UDP packets carrying the body were lost on the hotspot path. QUIC
          resent them with growing delays (exponential back-off), so downloads took 9 seconds, or
          never finished at all.
        </li>
        <li>
          Because the failure happened <strong>after</strong> the handshake, Chromium didn't retry
          over TCP. It kept trying HTTP/3 on later requests, which is why things were sometimes fast
          and sometimes slow.
        </li>
      </ArticleList>

      <ArticleCallout icon={LightbulbIcon} tone="treasure">
        So the server was fast all along. The problem was the transport the browser picked, which
        wasn't reliable on that network.
      </ArticleCallout>

      <ArticleHeading>Other People Have Hit This Too</ArticleHeading>

      <ArticleParagraph>
        I searched Caddy's GitHub issues and found the same pattern in several of them:
      </ArticleParagraph>

      <ArticleList>
        <li>
          <A href="https://github.com/caddyserver/caddy/issues/7556">#7556</A>: occasional{" "}
          <C>ERR_QUIC_PROTOCOL_ERROR</C> in Chrome. One comment describes{" "}
          <em>"response headers flush, some body bytes arrive, then the stream aborts mid-body"</em>
          , which matches what I saw: fast headers, stalled body. Setting{" "}
          <C>QUIC_GO_DISABLE_GSO=true</C> reduced the number of aborts.
        </li>
        <li>
          <A href="https://github.com/caddyserver/caddy/issues/5942">#5942</A>: Firefox requests
          time out <em>"after several clicks all served successfully over HTTP/3"</em>.
        </li>
        <li>
          <A href="https://github.com/caddyserver/caddy/issues/6537">#6537</A> (still open):{" "}
          <em>http3 breaks SSE</em>. Relevant because the SupportOps Inbox relies on SSE.
        </li>
        <li>
          <A href="https://github.com/caddyserver/caddy/issues/7885">#7885</A>: HTTP/3 over
          Tailscale fails because of MTU, a real-world case of the MTU problem above.
        </li>
        <li>
          <A href="https://github.com/caddyserver/caddy/issues/5075">#5075</A>: how to disable
          HTTP/3. The maintainer's answer is exactly the fix I used.
        </li>
      </ArticleList>

      <ArticleParagraph>
        Most of these issues were closed without a definite root cause. That's because the cause is
        hard to reproduce: it lives in the network path, in the kernel's UDP offload (GSO), or in
        the QUIC library (quic-go). The usual recommendation is always the same:{" "}
        <strong>disable HTTP/3 and stick with TCP.</strong>
      </ArticleParagraph>

      <ArticleHeading>The Fix Is Three Lines</ArticleHeading>

      <ArticleParagraph>
        The <C>protocols</C> option in Caddy is <strong>global</strong>, so it belongs in the global
        options block at the top of the main Caddyfile, not in a site block. Putting it in a site
        file gives you a syntax error.
      </ArticleParagraph>

      <ArticleCode language="Caddyfile">{`{
	email <admin email>
	servers {
		protocols h1 h2
	}
}

import /etc/caddy/apps/*.caddy`}</ArticleCode>

      <ArticleParagraph>
        This applies to every site on that Caddy instance, which is what I wanted. Then validate and
        reload (no downtime):
      </ArticleParagraph>

      <ArticleCode language="Bash">{`docker exec caddy caddy validate --config /etc/caddy/Caddyfile
docker exec caddy caddy reload   --config /etc/caddy/Caddyfile`}</ArticleCode>

      <ArticleParagraph>
        And check that none of the domains send the HTTP/3 header anymore:
      </ArticleParagraph>

      <ArticleCode language="Bash">{`for h in support api.support widget.support; do
  echo "$h: $(curl -sI https://$h.azarnuzy.com | grep -i alt-svc || echo 'no alt-svc')"
done`}</ArticleCode>

      <ArticleParagraph>
        All three domains printed <C>no alt-svc</C>. Browsers that still have the old <C>alt-svc</C>{" "}
        cached may keep trying HTTP/3 for a while. To confirm the fix right away, restart the
        browser or open a private window.
      </ArticleParagraph>

      <ArticleHeading>What Do We Lose Without HTTP/3?</ArticleHeading>

      <ArticleTable
        head={["HTTP/3 advantage", "Impact on SupportOps"]}
        rows={[
          [
            "Faster connection setup (1 RTT instead of 2–3)",
            "Saves about 50–100 ms at a 47 ms RTT, and only on new connections. The dashboard reuses the same connection.",
          ],
          [
            "No head-of-line blocking between streams",
            "Noticeable with many parallel requests on a lossy network. Our pages only call a few small JSON endpoints.",
          ],
          [
            "Connection migration (Wi-Fi ↔ cellular)",
            "Useful for phone users. Human Agents mostly work from laptops.",
          ],
          [
            "Better on poor mobile networks",
            "In theory, yes. In practice, the mobile network was exactly where HTTP/3 broke.",
          ],
        ]}
      />

      <ArticleParagraph>
        HTTP/2 over TCP isn't outdated. We still get TLS 1.3 and HTTP/2 multiplexing. The cost is at
        most about 100 ms when opening a new connection. What we gain is no more 9-second stalls
        that the browser can't recover from. That's clearly worth it.
      </ArticleParagraph>

      <ArticleParagraph>
        If we ever want to turn HTTP/3 back on, the first thing to try is{" "}
        <C>QUIC_GO_DISABLE_GSO=true</C> on the Caddy container. Before that, we should have a way to
        monitor HTTP/3 performance across different client networks.
      </ArticleParagraph>

      <ArticleHeading>What We Still Can't Confirm</ArticleHeading>

      <ArticleParagraph>A few things can't be proven from the data I have:</ArticleParagraph>

      <ArticleList>
        <li>
          <strong>Where exactly UDP was failing.</strong> The A/B test proves QUIC was the cause,
          but it doesn't show whether the problem was the carrier's CGNAT, the hotspot's MTU, UDP
          shaping, or the quic-go/GSO behaviour from #7556. Finding out would take a packet capture
          or a <C>qlog</C>.
        </li>
        <li>
          <strong>The protocol used by each slow request.</strong> I didn't have the{" "}
          <strong>Protocol</strong> column enabled in DevTools during the incident, so I can't show
          directly that the 9.42 s request used <C>h3</C>. That conclusion rests on the A/B test.
        </li>
        <li>
          <strong>Comparison with other networks.</strong> I didn't get to compare with a home or
          office connection while HTTP/3 was still on. The fix doesn't depend on this, though, since
          no client uses UDP anymore.
        </li>
      </ArticleList>

      <ArticleHeading>Lessons: How to Debug a "Slow Page" Report</ArticleHeading>

      <ArticleParagraph>
        Start at the lowest layer and work your way up. Each step takes under a minute.
      </ArticleParagraph>

      <ArticleList ordered>
        <li>
          <strong>Check the Timing tab.</strong> If <em>Waiting for server response</em> is high,
          the problem is server processing, so jump to step 6. If <em>Content download</em> is high
          while waiting is low, the problem is delivery, so move on to the next step.
        </li>
        <li>
          <strong>Enable the Protocol column</strong> in DevTools → Network. If the slow requests
          use <C>h3</C>, suspect the transport first.
        </li>
        <li>
          <strong>Check whether the server advertises HTTP/3:</strong>{" "}
          <C>curl -sI https://support.azarnuzy.com | grep -i alt-svc</C>.
        </li>
        <li>
          <strong>Compare with TCP.</strong> Hit the same URL several times with <C>curl</C>. If{" "}
          <C>curl</C> is always fast but the browser isn't, the problem is below the HTTP layer.
        </li>
        <li>
          <strong>Run an A/B test.</strong> Disable QUIC (<C>chrome://flags/#enable-quic</C> or{" "}
          <C>brave://flags/#enable-quic</C>), or try a different network. If the problem goes away,
          the transport is the cause.
        </li>
        <li>
          <strong>Check the server:</strong> VPS monitoring, then the API logs and{" "}
          <C>docker logs caddy</C>.
        </li>
        <li>
          <strong>Only then profile the code:</strong> queries, N+1, and payload size.
        </li>
      </ArticleList>

      <ArticleCallout icon={TrendingUpIcon} tone="info">
        The biggest lesson for me: the DevTools timing panel made it look like the server was slow
        to send data. The natural reaction is to optimise the API, add caching, or upgrade the VPS.
        None of those would have fixed anything. Find out where the time actually goes before you
        start fixing.
      </ArticleCallout>

      <ArticleHeading>References</ArticleHeading>

      <ArticleParagraph>
        <strong>Specifications</strong>
      </ArticleParagraph>
      <ArticleList>
        <li>
          <A href="https://www.rfc-editor.org/rfc/rfc9000">RFC 9000: QUIC</A>: §14.1 (1200-byte
          minimum), §14.2 (no IP fragmentation)
        </li>
        <li>
          <A href="https://www.rfc-editor.org/rfc/rfc9114">RFC 9114: HTTP/3</A>: §3.1.1 (discovery
          through Alt-Svc)
        </li>
        <li>
          <A href="https://www.rfc-editor.org/rfc/rfc9308">RFC 9308: Applicability of QUIC</A>: §2
          (3–5% of networks block UDP), §3.2 (30-second NAT bindings)
        </li>
        <li>
          <A href="https://www.rfc-editor.org/rfc/rfc7838">RFC 7838: HTTP Alternative Services</A>
        </li>
      </ArticleList>

      <ArticleParagraph>
        <strong>Caddy and quic-go</strong>
      </ArticleParagraph>
      <ArticleList>
        <li>
          <A href="https://caddyserver.com/docs/caddyfile/options">
            Caddy global options: servers → protocols
          </A>
        </li>
        <li>
          Caddy issues: <A href="https://github.com/caddyserver/caddy/issues/7556">#7556</A> ·{" "}
          <A href="https://github.com/caddyserver/caddy/issues/5942">#5942</A> ·{" "}
          <A href="https://github.com/caddyserver/caddy/issues/6678">#6678</A> ·{" "}
          <A href="https://github.com/caddyserver/caddy/issues/6537">#6537</A> ·{" "}
          <A href="https://github.com/caddyserver/caddy/issues/7885">#7885</A> ·{" "}
          <A href="https://github.com/caddyserver/caddy/issues/5075">#5075</A> ·{" "}
          <A href="https://github.com/caddyserver/caddy/issues/3833">#3833</A>
        </li>
        <li>
          <A href="https://github.com/quic-go/quic-go/issues/4394">
            quic-go #4394: GSO severely degrades connection performance
          </A>
        </li>
      </ArticleList>

      <ArticleParagraph>
        <strong>Browser behaviour</strong>
      </ArticleParagraph>
      <ArticleList>
        <li>
          <A href="https://groups.google.com/a/chromium.org/g/proto-quic/c/cWoQxBMopR0">
            Chromium proto-quic: QUIC client timeouts and failover to h2
          </A>
        </li>
      </ArticleList>

      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
        <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <HeartIcon size={13} className="text-brand-sunset/70" />
          <span>
            Want to see the system this happened on?{" "}
            <A href="https://support.azarnuzy.com">Try SupportOps live</A>.
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Article router ───────────────────────────────────────────────────────────

const ARTICLE_COMPONENTS: Record<string, () => ReactElement> = {
  "1": SygmaStudioArticle,
  "2": CakraArticle,
  "3": HiazeeArticle,
  "4": SupportOpsHttp3Article,
};

// ─── Blog Detail Page ─────────────────────────────────────────────────────────

function BlogDetailPageInner() {
  const { postId } = useParams({ strict: false }) as { postId?: string };
  const post = postId ? (POSTS.find((p) => p.id === postId) ?? POSTS[0]) : POSTS[0];
  const ArticleBody = ARTICLE_COMPONENTS[post.id] ?? SygmaStudioArticle;

  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-3 pt-4 pb-6 md:px-5 md:pt-5 md:pb-8 lg:px-6">
        <div className="flex flex-col gap-4">
          {/* Full-width article — sidebar widgets removed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-4xl rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm md:p-6"
          >
            <ArticleBody />
          </motion.div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-6">
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} className="text-accent-soft" />
          Sailing the React seas
        </span>
      </footer>
    </>
  );
}

export const BlogDetailPage = memo(BlogDetailPageInner);
