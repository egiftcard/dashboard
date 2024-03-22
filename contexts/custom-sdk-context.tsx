import { useQueryClient } from "@tanstack/react-query";
import { ThirdwebSDKProvider, useSigner } from "@thirdweb-dev/react";
import type { SDKOptions } from "@thirdweb-dev/sdk";
import {
  DASHBOARD_THIRDWEB_CLIENT_ID,
  DASHBOARD_THIRDWEB_SECRET_KEY,
} from "constants/rpc";
import {
  useSupportedChain,
  useSupportedChains,
} from "hooks/chains/configureChains";
import { getDashboardChainRpc } from "lib/rpc";
import { StorageSingleton } from "lib/sdk";
import { ComponentWithChildren } from "types/component-with-children";

export const CustomSDKContext: ComponentWithChildren<{
  desiredChainId?: number;
  options?: SDKOptions;
}> = ({ desiredChainId, options, children }) => {
  const signer = useSigner();
  const queryClient = useQueryClient();
  const networkInfo = useSupportedChain(desiredChainId || -1);
  const configuredChains = useSupportedChains();

  return (
    <ThirdwebSDKProvider
      activeChain={desiredChainId}
      signer={signer}
      queryClient={queryClient}
      supportedChains={configuredChains}
      sdkOptions={{
        gasSettings: {
          maxPriceInGwei: 650,
        },
        readonlySettings:
          networkInfo && desiredChainId
            ? {
              chainId: desiredChainId,
              rpcUrl: getDashboardChainRpc(networkInfo),
            }
            : undefined,
        ...options,
      }}
      clientId={DASHBOARD_THIRDWEB_CLIENT_ID}
      secretKey={DASHBOARD_THIRDWEB_SECRET_KEY}
      storageInterface={StorageSingleton}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};

export const PublisherSDKContext: ComponentWithChildren = ({ children }) => (
  <CustomSDKContext
    // polygon = 137
    desiredChainId={137}
    options={{
      gasless: {
        engine: {
          relayerUrl:
            "https://checkout.engine.thirdweb.com/relayer/0c2bdd3a-307f-4243-b6e5-5ba495222d2b",
          relayerForwarderAddress: "0x409d530a6961297ece29121dbee2c917c3398659",
        },
        experimentalChainlessSupport: true,
      },
    }}
  >
    {children}
  </CustomSDKContext>
);
