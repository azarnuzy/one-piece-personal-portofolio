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
import { memo, type ReactElement } from "react";

import { POSTS } from "./data";

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
        <CodeIcon size={12} className="text-brand-treasure/70" />
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
    <p className="mb-5 font-sans text-sm leading-7 text-secondary-foreground md:text-base md:leading-8 [&:first-letter]:float-left [&:first-letter]:mr-2 [&:first-letter]:font-display [&:first-letter]:text-5xl [&:first-letter]:leading-none [&:first-letter]:font-bold [&:first-letter]:text-brand-treasure">
      {children}
    </p>
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

// ─── Article router ───────────────────────────────────────────────────────────

const ARTICLE_COMPONENTS: Record<string, () => ReactElement> = {
  "1": SygmaStudioArticle,
  "2": CakraArticle,
  "3": HiazeeArticle,
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
          <AnchorIcon size={11} className="text-brand-treasure" />
          Sailing the React seas
        </span>
      </footer>
    </>
  );
}

export const BlogDetailPage = memo(BlogDetailPageInner);
