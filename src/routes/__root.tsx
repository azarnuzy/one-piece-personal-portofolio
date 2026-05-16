import { a11yDevtoolsPlugin } from "@tanstack/devtools-a11y/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { AppLayout } from "@/components/portfolio/AppLayout";
import { AppLoader } from "@/components/portfolio/AppLoader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import appCss from "@/styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <AppLayout />,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Azar — Software Engineer",
      },
      {
        name: "description",
        content:
          "Software Engineer building AI-powered platforms — full-stack frontend with a performance-first mindset.",
      },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon/favicon-96x96.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      // Preload hero assets so they're decoded before first paint.
      // Both bg images preload because the dual-stack approach in HeroShell
      // keeps both in the DOM (opacity-toggled per theme), eliminating the
      // theme-switch flicker entirely.
      { rel: "preload", as: "image", href: "/background-light.png" },
      { rel: "preload", as: "image", href: "/background-night.png" },
      { rel: "preload", as: "image", href: "/person.png" },
      // Preload loader assets so the loading screen is fully decoded
      // before first paint (no flash of unstyled loader).
      { rel: "preload", as: "image", href: "/logo-mugiwara.png" },
      { rel: "preload", as: "image", href: "/svg/captains_wheel.svg" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Runs synchronously before first paint — prevents dark/light flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=document.documentElement;d.classList.remove('light','dark');if(t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}else{d.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <AppLoader />
          <Toaster richColors />
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            a11yDevtoolsPlugin(),
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
