import { useSDK } from "@thirdweb-dev/react";
import {
  ChainId,
  SUPPORTED_CHAIN_ID,
  ThirdwebSDK,
  extractConstructorParamsFromAbi,
  fetchSourceFilesFromMetadata,
} from "@thirdweb-dev/sdk";
import {
  StorageSingleton,
  alchemyUrlMap,
} from "components/app-layouts/providers";
import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

interface VerifyPayload {
  contractAddress: string;
  chainId: ChainId;
}

const RequestStatus = {
  OK: "1",
  NOTOK: "0",
};

export const VerificationStatus = {
  FAILED: "Fail - Unable to verify",
  SUCCESS: "Pass - Verified",
  PENDING: "Pending in queue",
  ALREADY_VERIFIED: "Contract source code already verified",
  AUTOMATICALLY_VERIFIED: "Already Verified",
};

export const apiMap: Record<number, string> = {
  1: "https://api.etherscan.io/api",
  3: "https://api-ropsten.etherscan.io/api",
  4: "https://api-rinkeby.etherscan.io/api",
  5: "https://api-goerli.etherscan.io/api",
  10: "https://api-optimistic.etherscan.io/api",
  25: "https://api.cronoscan.com/api",
  42: "https://api-kovan.etherscan.io/api",
  56: "https://api.bscscan.com/api",
  69: "https://api-kovan-optimistic.etherscan.io/api",
  97: "https://api-testnet.bscscan.com/api",
  128: "https://api.hecoinfo.com/api",
  137: "https://api.polygonscan.com/api",
  199: "https://api.bttcscan.com/api",
  250: "https://api.ftmscan.com/api",
  256: "https://api-testnet.hecoinfo.com/api",
  1029: "https://api-testnet.bttcscan.com/api",
  1284: "https://api-moonbeam.moonscan.io/api",
  1285: "https://api-moonriver.moonscan.io/api",
  1287: "https://api-moonbase.moonscan.io/api",
  4002: "https://api-testnet.ftmscan.com/api",
  42161: "https://api.arbiscan.io/api",
  43113: "https://api-testnet.snowtrace.io/api",
  43114: "https://api.snowtrace.io/api",
  421611: "https://api-testnet.arbiscan.io/api",
  80001: "https://api-testnet.polygonscan.com/api",
  1313161554: "https://api.aurorascan.dev/api",
  1313161555: "https://api-testnet.aurorascan.dev/api",
};

export const blockExplorerMap: Record<number, { name: string; url: string }> = {
  1: { name: "Etherscan", url: "https://etherscan.io/" },
  3: { name: "Ropsten Etherscan", url: "https://ropsten.etherscan.io/" },
  4: { name: "Rinkeby Etherscan", url: "https://rinkeby.etherscan.io/" },
  5: { name: "Goerli Etherscan", url: "https://goerli.etherscan.io/" },
  10: {
    name: "Optimism Etherscan",
    url: "https://optimistic.etherscan.io/",
  },
  42: { name: "Kovan Etherscan", url: "https://kovan.etherscan.io/" },
  69: {
    name: "Optimism Kovan Etherscan",
    url: "https://kovan-optimistic.etherscan.io/",
  },
  137: { name: "Polygonscan", url: "https://polygonscan.com/" },
  250: { name: "FTMScan", url: "https://ftmscan.com/" },
  4002: { name: "FTMScan Testnet", url: "https://testnet.ftmscan.com/" },
  42161: { name: "Arbiscan", url: "https://arbiscan.io/" },
  43113: { name: "Snowtrace Testnet", url: "https://testnet.snowtrace.io/" },
  43114: { name: "Snowtrace", url: "https://snowtrace.io/" },
  421611: { name: "Arbiscan Testnet", url: "https://testnet.arbiscan.io/" },
  80001: {
    name: "Mumbai Polygonscan",
    url: "https://mumbai.polygonscan.com/",
  },
};

export const apiKeyMap: Record<number, string> = {
  [ChainId.Mainnet]: process.env.ETHERSCAN_KEY as string,
  [ChainId.Rinkeby]: process.env.ETHERSCAN_KEY as string,
  [ChainId.Goerli]: process.env.ETHERSCAN_KEY as string,
  [ChainId.Polygon]: process.env.POLYGONSCAN_KEY as string,
  [ChainId.Mumbai]: process.env.POLYGONSCAN_KEY as string,
  [ChainId.Fantom]: process.env.FANTOMSCAN_KEY as string,
  [ChainId.FantomTestnet]: process.env.FANTOMSCAN_KEY as string,
  [ChainId.Avalanche]: process.env.SNOWTRACE_KEY as string,
  [ChainId.AvalancheFujiTestnet]: process.env.SNOWTRACE_KEY as string,
  [ChainId.Arbitrum]: process.env.ARBITRUMSCAN_KEY as string,
  [ChainId.ArbitrumTestnet]: process.env.ARBITRUMSCAN_KEY as string,
  [ChainId.Optimism]: process.env.OPTIMISMSCAN_KEY as string,
  [ChainId.OptimismTestnet]: process.env.OPTIMISMSCAN_KEY as string,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid method" });
  }

  try {
    const { contractAddress, chainId } = req.body as VerifyPayload;

    const endpoint: string | undefined = apiMap[chainId];

    if (!endpoint) {
      throw new Error(
        `ChainId ${chainId} is not supported for etherscan verification`,
      );
    }

    console.log(`Verifying contract ${contractAddress} on chain ${chainId}`);

    const rpc = alchemyUrlMap[chainId as SUPPORTED_CHAIN_ID];
    console.log(`Using RPC ${rpc}`);
    const sdk = new ThirdwebSDK(
      rpc,
      {
        readonlySettings: {
          rpcUrl: rpc,
          chainId,
        },
      },
      StorageSingleton,
    );
    const compilerMetadata = await sdk
      .getPublisher()
      .fetchCompilerMetadataFromAddress(contractAddress);
    const compilerVersion = compilerMetadata.metadata.compiler.version;

    const sources = await fetchSourceFilesFromMetadata(
      compilerMetadata,
      StorageSingleton,
    );

    const sourcesWithUrl = compilerMetadata.metadata.sources;
    const sourcesWithContents: Record<string, { content: string }> = {};
    for (const path of Object.keys(sourcesWithUrl)) {
      const sourceCode = sources.find((source) => path === source.filename);
      if (!sourceCode) {
        throw new Error(`Could not find source file for ${path}`);
      }
      sourcesWithContents[path] = {
        content: sourceCode.source,
      };
    }

    const compilerInput: any = {
      language: "Solidity",
      sources: sourcesWithContents,
      settings: {
        optimizer: compilerMetadata.metadata.settings.optimizer,
        evmVersion: compilerMetadata.metadata.settings.evmVersion,
        remappings: compilerMetadata.metadata.settings.remappings,
        outputSelection: {
          "*": {
            "*": [
              "abi",
              "evm.bytecode",
              "evm.deployedBytecode",
              "evm.methodIdentifiers",
              "metadata",
            ],
            "": ["ast"],
          },
        },
      },
    };

    const compilationTarget =
      compilerMetadata.metadata.settings.compilationTarget;
    const targets = Object.keys(compilationTarget);
    const contractPath = targets[0];

    const encodedConstructorArgs = await fetchConstructorParams(
      contractAddress,
      chainId,
      compilerMetadata.abi,
    );

    const requestBody: Record<string, string> = {
      apikey: apiKeyMap[chainId],
      module: "contract",
      action: "verifysourcecode",
      contractaddress: contractAddress,
      sourceCode: JSON.stringify(compilerInput),
      codeformat: "solidity-standard-json-input",
      contractname: `${contractPath}:${compilerMetadata.name}`,
      compilerversion: `v${compilerVersion}`,
      constructorArguements: encodedConstructorArgs,
    };

    const parameters = new URLSearchParams({ ...requestBody });
    console.log("DEBUG - requestBody", requestBody);

    const result = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: parameters.toString(),
    });

    const data = await result.json();
    console.log("DEBUG - data", data);
    if (data.status === RequestStatus.OK) {
      return res.status(200).json({ guid: data.result });
    } else {
      return res.status(200).json({ error: data.result });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: (e as any).toString() });
  }
};

/**
 * Fetch the deploy transaction from the given contract address and extract the encoded constructor parameters
 * @param contractAddress
 * @param chainId
 * @param abi
 */
async function fetchConstructorParams(
  contractAddress: string,
  chainId: ChainId,
  abi: any,
): Promise<string> {
  const constructorParamTypes = extractConstructorParamsFromAbi(abi);
  if (constructorParamTypes.length === 0) {
    return "";
  }
  const construtctorParamByteLength = constructorParamTypes.length * 64;
  console.log("Constructor params:", constructorParamTypes.length);
  const requestBody = {
    apiKey: apiKeyMap[chainId],
    module: "account",
    action: "txlist",
    address: contractAddress,
    page: "1",
    sort: "asc",
    offset: "1",
  };
  const parameters = new URLSearchParams({ ...requestBody });
  const result = await fetch(apiMap[chainId], {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: parameters.toString(),
  });
  const data = await result.json();
  if (
    data &&
    data.status === RequestStatus.OK &&
    data.result[0] !== undefined
  ) {
    const txData = data.result[0].input;
    console.log("DEBUG - txData", txData);
    const constructorArgs = txData.substring(
      txData.length - construtctorParamByteLength,
    );
    console.log("checking constructor args:", constructorArgs);
    try {
      // sanity check that the constructor params are valid
      const contract = new Interface(abi);
      ethers.utils.defaultAbiCoder.decode(
        contract.deploy.inputs,
        `0x${constructorArgs}`,
      );
    } catch (e) {
      throw new Error("Could not decode constructor parameters");
    }

    return constructorArgs;
  } else {
    // Could not retrieve constructor parameters, using empty parameters as fallback
    return "";
  }
}
