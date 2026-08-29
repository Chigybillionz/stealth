import { createFileRoute } from "@tanstack/react-router";

import { createChallengeNonce } from "@/server/api/abuse-service";
import { apiSuccess, handleApiRequest } from "@/server/api/response";
import { loadRuntimeConfig } from "@/config";

export const Route = createFileRoute("/api/v1/auth/challenge")({
  server: {
    handlers: {
      GET: ({ request }) =>
        handleApiRequest(request, async () => {
          const config = loadRuntimeConfig();
          const challenge = createChallengeNonce(
            config.secrets.operatorSecret ?? "stealth_challenge_secret"
          );
          return apiSuccess(request, challenge);
        }),
    },
  },
});
