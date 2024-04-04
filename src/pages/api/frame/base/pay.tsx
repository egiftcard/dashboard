import { getBuyWithCryptoQuote } from "thirdweb/pay";
import { thirdwebClient } from "lib/thirdweb-client";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import PayTxFrame from "components/pay/PayTxFrame";
import satori from "satori";
import { errorResponse, successHtmlResponse } from "utils/api";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { CoinbaseKit } from "classes/CoinbaseKit";
import { getFarcasterAccountAddress } from "utils/tx-frame";
import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";

import path from "path";
import { ThirdWebPayTransactionFrame } from "classes/ThirdWebPayTransactionFrame";
import { getConfirmMetaData, getConfirmPayMetaData } from "lib/pay-frames";
import { shortenAddress } from "@thirdweb-dev/react";
import { abi } from "lib/pay-abi-tx-frame";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(400).send("invalid method");
  }

  const body = req.body;

  const { isValid, message } = await CoinbaseKit.validateMessage(body);

  // Validate if message is valid
  if (!isValid || !message) {
    throw new Error("Not valid message");
  }

  const type = ThirdWebPayTransactionFrame.getValidTypeQuery(
    req.query.type as string,
  );
  console.log(type);

  if (type === "confirm") {
    const formattedToAmount =
      await ThirdWebPayTransactionFrame.getFormattedToAmount(message.input);

    const address = getFarcasterAccountAddress(message.interactor);

    const htmlResponse = ThirdWebPayTransactionFrame.htmlResponse(
      getConfirmMetaData(shortenAddress(address), formattedToAmount),
    );

    return res.status(200).send(htmlResponse);
  }

  if (type === "compute-transaction") {
    const formattedToAmount = ThirdWebPayTransactionFrame.getFormattedToAmount(
      req.query.amount as string,
    );

    const htmlResponse = ThirdWebPayTransactionFrame.htmlResponse(
      getConfirmPayMetaData(formattedToAmount),
    );

    return res.status(200).send(htmlResponse);
  }

  if (type === "tx") {
    console.log("HE!?");
    const formattedToAmount = ThirdWebPayTransactionFrame.getFormattedToAmount(
      req.query.amount as string,
    );

    const address = "0xe99bc90d3cb86cf095d75a020c10fbf9d4aa9a4d";
    await ThirdWebPayTransactionFrame.getTransactionData({
      fromAddress: address,
      amount: formattedToAmount,
    });

    return res.status(200).send({
      chainId: "eip155:8453",
      method: "eth_sendTransaction",
      params: {
        abi,
        to: "0xe99bc90d3cb86cf095d75a020c10fbf9d4aa9a4d",
        data: "0x883f574400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000a4081b4f17af9ef4fc7a22b470913389ebb00000000000000000000000000000000b7da6b9fe2634cf08b916aa89d7f83b400000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000010e9deaaf401e0000000000000000000000000000000000000000000000000000000000000660c940f00000000000000000000000000000000000000000000000000000000000001000000000000000000000000001231deb6f5749ef6ce6943a275a1d3e7486f4eae00000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000000281b4f17af9ef4fc7a22b470913389ebb000000000000000000000000000000000000000000000000000000003dde4b49dcfd8f14524b8cb439703d024a5c4a1b000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e68623878ad5ceefa790ce00770de86bfb7a3c83000000000000000000000000000000000000000000000000000000000000004600000000000000000000000000000000000000000000000000000000000007e44630a0d82ab6168f24eefce1b27a356f51f8b7770009dc16d5cfb6a1bbf087f01f226b3500000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000e99bc90d3cb86cf095d75a020c10fbf9d4aa9a4d000000000000000000000000000000000000000000145e8fd9cf3cece9c394d4000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000087468697264776562000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783030303030303030303030303030303030303030303030303030303030303030303030303030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000001111111254eeb25477b68fb85ed929f73a9605820000000000000000000000001111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000000000000000000000000000000000000000000000000000004ed4e862860bed51a9570b96d89af5e1b0efefed000000000000000000000000000000000000000000000010e9deaaf401e0000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052812aa3caf000000000000000000000000e37e799d5077682fa0a244d46e5649f71457bd09000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000004ed4e862860bed51a9570b96d89af5e1b0efefed000000000000000000000000e37e799d5077682fa0a244d46e5649f71457bd090000000000000000000000001231deb6f5749ef6ce6943a275a1d3e7486f4eae000000000000000000000000000000000000000000000010e9deaaf401e00000000000000000000000000000000000000000000000145e8fd9cf3cece9c394d30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000038c00000000000000000000000000000000000000000000036e0003400002f600a0c9e75c48000000000000002f02010000000000000000000000000000000000000000000002c800023b00008d00a007e5c0d200000000000000000000000000000000000000000000000000006900001a40414200000000000000000000000000000000000006d0e30db002a000000000000000000000000000000000000000000000670b6c803f8c4a1f8e9bee63c1e5010ca6485b7e9cf814a3fd09d81672b07323535b64420000000000000000000000000000000000000600a007e5c0d200000000000000000000000000000000000000000000000000018a00001a40414200000000000000000000000000000000000006d0e30db05106cf77a3ba9a5ca399b7c97c74d54e5b1beb874e4342000000000000000000000000000000000000060004cac88ea9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d080e67a57278a896bf200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000e37e799d5077682fa0a244d46e5649f71457bd090000000000000000000000000000000000000000000000000000000066132b33000000000000000000000000000000000000000000000000000000000000000100000000000000000000000042000000000000000000000000000000000000060000000000000000000000004ed4e862860bed51a9570b96d89af5e1b0efefed0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000420dd381b31aef6683db6b902084cb0ffece40da00a007e5c0d200000000000000000000000000000000000000000000000000006900001a40414200000000000000000000000000000000000006d0e30db002a0000000000000000000000000000000000000000000130ccf58b6051ce078d0d7ee63c1e501c9034c3e7f58003e6ae0c8438e7c8f4598d5acaa420000000000000000000000000000000000000600a0f2fa6b664ed4e862860bed51a9570b96d89af5e1b0efefed0000000000000000000000000000000000000000001478c407edde091e655e420000000000000006f57cce568665619a80a06c4eca274ed4e862860bed51a9570b96d89af5e1b0efefed1111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000002e9b301200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004166d871ca91c71b6876f1324d37551ae33f4128d6011f75ab2eba52d4cc6eb76b23ae487c9dc499d3cbdbbff7c9bf32e6058c0d89f6c47f212c6d0005130c04f71b00000000000000000000000000000000000000000000000000000000000000",
        value: "100000000000000000000",
      },
    });
  }

  return res.status(400).send("invalid response");
}
