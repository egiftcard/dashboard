import { apiKeys } from "../cache-keys";
import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";

export type ApiKeyInfo = {
  creatorWalletAddress: string;
  key: string;
  revoked: boolean;
};

export function useApiKeys() {
  const { user } = useUser();

  return useQuery(
    apiKeys.keys(user?.address as string),
    async () => {
      const res = await fetch("https://api.thirdweb.com/v1/dashboard/keys", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return (data.keys as ApiKeyInfo[]).filter((item) => !item.revoked);
    },
    { enabled: !!user?.address },
  );
}

export function useCreateApiKey() {
  const { user } = useUser();

  return useMutationWithInvalidate(
    async () => {
      invariant(user, "No user is logged in");

      const res = await fetch("https://api.thirdweb.com/v1/dashboard/keys", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([apiKeys.keys(user?.address as string)]);
      },
    },
  );
}

export function useRevokeApiKey() {
  const { user } = useUser();

  return useMutationWithInvalidate(
    async (key: string) => {
      invariant(user, "No user is logged in");

      const res = await fetch(
        "https://api.thirdweb.com/v1/dashboard/keys/revoke",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key,
          }),
        },
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([apiKeys.keys(user?.address as string)]);
      },
    },
  );
}
