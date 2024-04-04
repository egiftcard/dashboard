import { z } from "zod";

const mintResponseSchema = z.object({
  result: z.object({
    queueId: z.string(),
  }),
});

const ownedResponseSchema = z.object({
  result: z.array(
    z.object({
      owner: z.string().startsWith("0x"),
      type: z.string(),
      supply: z.string(),
    }),
  ),
});

const thirdwebEngineUrl = process.env.THIRDWEB_ENGINE_URL;
const thirdwebEngineWallet = process.env.THIRDWEB_ENGINE_WALLET;
const thirdwebEngineAccessToken = process.env.THIRDWEB_ACCESS_TOKEN;

const degenChainId = 666666666;
const degenNftContractAddress = "0x9DbD184379643B58C0b135ce93AB8D5e452Bf661";

export class ThirdwebDegenEngine {
  public static mint = async (receiver: string) => {
    const response = await fetch(
      `${thirdwebEngineUrl}/contract/${degenChainId}/${degenNftContractAddress}/erc721/claim-to`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thirdwebEngineAccessToken}`,
          "x-backend-wallet-address": thirdwebEngineWallet as string,
        },
        body: JSON.stringify({
          receiver: receiver.toLowerCase(),
          quantity: "1",
        }),
      },
    );

    const result = await response.json();
    console.log(result);
    return mintResponseSchema.parse(result);
  };

  public static isNFTOwned = async (receiver: string) => {
    const response = await fetch(
      `${thirdwebEngineUrl}/contract/${degenChainId}/${degenNftContractAddress}/erc721/get-owned?walletAddress=${receiver.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thirdwebEngineAccessToken}`,
          "x-backend-wallet-address": thirdwebEngineWallet as string,
        },
      },
    );

    const result = await response.json();

    const parsedResult = ownedResponseSchema.parse(result);

    return parsedResult.result.length > 0;
  };
}
