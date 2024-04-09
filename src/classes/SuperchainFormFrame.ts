import { FrameMetadataType, getFrameHtmlResponse } from "@coinbase/onchainkit";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

type HubspotFields = [
  {
    name: "email";
    value: string;
  },
  {
    name: "superchain_chain";
    value: string;
  },
  {
    name: "website";
    value: string;
  },
  {
    name: "farcaster_handle";
    value: string;
  },
];

const validChains = z.union([
  z.literal("Base"),
  z.literal("Frax"),
  z.literal("Lisk"),
  z.literal("Mode"),
  z.literal("Optimism"),
  z.literal("Zora"),
]);

const validQueryType = z.union([
  z.literal("chain"),
  z.literal("email"),
  z.literal("website"),
]);

export class SuperChainFormFrame {
  static getQueryType = (type: string) => {
    return validQueryType.parse(type);
  };

  static getChain = (chain: string) => {
    const lowercaseChain = chain.toLowerCase();
    const capitalizedChain =
      lowercaseChain.charAt(0).toUpperCase() + lowercaseChain.slice(1);

    return validChains.parse(capitalizedChain);
  };

  static getEmail = (email: string) => {
    return z.string().email().parse(email);
  };

  static getWebsiteUrl = (url: string) => {
    const regex =
      // eslint-disable-next-line no-useless-escape
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,})([\/\w \.-]*)*\/?$/;
    if (!regex.test(url)) {
      throw new Error("Invalid URL");
    }
    return url;
  };

  public static htmlResponse = (frameMetaData: FrameMetadataType) => {
    return getFrameHtmlResponse(frameMetaData);
  };

  public static sendFormToHubspot = async (fields: HubspotFields) => {
    const response = await fetch(
      "https://api.hsforms.com/submissions/v3/integration/secure/submit/23987964/38c5be6b-b260-4a91-a09a-868ea324d995",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({
          fields,
        }),
      },
    );

    if (!response.ok) {
      const resp = await response.json();
      console.log({ resp });
      const errMessage = `Failed to send form to email: ${fields[0].value} and farcaster handle: ${fields[3].value}`;
      Sentry.captureException(new Error(errMessage, { cause: resp }));
      throw new Error("Failed to send form");
    }
  };
}
