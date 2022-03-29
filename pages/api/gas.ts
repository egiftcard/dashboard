import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const gasEndpoint = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`;
  const ethPriceEndpoint = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_KEY}`;

  const gasPrice = fetch(gasEndpoint);
  const ethPrice = fetch(ethPriceEndpoint);

  try {
    const [gasPriceRes, ethPriceRes] = await Promise.all([gasPrice, ethPrice]);
    const gasData = await gasPriceRes.json();
    const ethPriceData = await ethPriceRes.json();

    if (gasData.status !== "1") {
      return res.status(500).json({ error: "Failed to fetch gas price" });
    }

    if (ethPriceData.status !== "1") {
      return res.status(500).json({ error: "Failed to fetch ETH price" });
    }

    return res.status(200).json({
      gasPrice: gasData.result.ProposeGasPrice,
      ethPrice: ethPriceData.result.ethusd,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
