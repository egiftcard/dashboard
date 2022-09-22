import {
  ThirdwebSDK as EVMThirdwebSDK,
  SUPPORTED_CHAIN_ID,
} from "@thirdweb-dev/sdk";
import { ThirdwebSDK as SOLThirdwebSDK } from "@thirdweb-dev/solana";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { getEVMRPC, getSOLRPC } from "constants/rpc";
import { DashboardSolanaNetwork } from "utils/network";

export const StorageSingleton = new ThirdwebStorage({
  gatewayUrls: {
    "ipfs://": [process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL as string],
  },
});

export function replaceIpfsUrl(url: string) {
  // sometimes the url passed in does not start with ipfs:// (because reasons but we should fix this)
  url = url.startsWith("ipfs://") ? url : `ipfs://${url}`;
  return StorageSingleton.resolveScheme(url);
}

// EVM SDK
const EVM_SDK_MAP = new Map<SUPPORTED_CHAIN_ID, EVMThirdwebSDK>();

export function getEVMThirdwebSDK(chainId: SUPPORTED_CHAIN_ID): EVMThirdwebSDK {
  if (EVM_SDK_MAP.has(chainId)) {
    return EVM_SDK_MAP.get(chainId) as EVMThirdwebSDK;
  }
  const rpcUrl = getEVMRPC(chainId);
  const sdk = new EVMThirdwebSDK(
    rpcUrl,
    {
      readonlySettings: {
        rpcUrl,
        chainId,
      },
    },
    StorageSingleton,
  );
  EVM_SDK_MAP.set(chainId, sdk);
  return sdk;
}

// SOLANA SDK
const SOL_SDK_MAP = new Map<DashboardSolanaNetwork, SOLThirdwebSDK>();

export function getSOLThirdwebSDK(
  network: DashboardSolanaNetwork,
): SOLThirdwebSDK {
  if (SOL_SDK_MAP.has(network)) {
    return SOL_SDK_MAP.get(network) as SOLThirdwebSDK;
  }
  const rpcUrl = getSOLRPC(network);
  const sdk = SOLThirdwebSDK.fromNetwork(rpcUrl, StorageSingleton);
  SOL_SDK_MAP.set(network, sdk);
  return sdk;
}
