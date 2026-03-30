import { createClientOnlyFn } from "@tanstack/react-start";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env/client";

/**
 * Our better-auth server instance lives in the TanStack Start server,
 * so authClient is only used on the client/browser (e.g. event handlers, effects, etc).
 *
 * For server/SSR operations, prefer `auth.api` instead, and wrap in a serverFn if needed.
 */
const getAuthClient = createClientOnlyFn(() =>
  createAuthClient({
    baseURL: env.VITE_BASE_URL,
  }),
);

export const authClient = getAuthClient();
