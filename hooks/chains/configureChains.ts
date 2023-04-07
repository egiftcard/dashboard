import { Chain } from "@thirdweb-dev/chains";
import {
  StoredChain,
  SupportedChainsContext,
} from "contexts/configured-chains";
import { useContext, useMemo } from "react";
import invariant from "tiny-invariant";

/**
 * @returns a list of all the chains that are configured
 */
export function useSupportedChains() {
  const chains = useContext(SupportedChainsContext);

  invariant(
    chains,
    "useConfiguredChains must be used within a ConfiguredNetworksProvider",
  );
  return chains;
}

// maps chainId to Chain
export type ConfiguredChainRecord = Record<number, StoredChain>;

/**
 * @returns a list of record that maps configured chainId to `Chain` object
 */
export function useSupportedChainsRecord() {
  const configuredNetworks = useSupportedChains();
  return useMemo(() => {
    const record: ConfiguredChainRecord = {};
    configuredNetworks.forEach((network) => {
      record[network.chainId] = network;
    });

    return record;
  }, [configuredNetworks]);
}

/**
 * @returns a list of record that maps configured chainId to `Chain` object
 */
export function useSupportedChainsNameRecord() {
  const configuredNetworks = useSupportedChains();
  return useMemo(() => {
    const record: Record<string, StoredChain | undefined> = {};
    configuredNetworks.forEach((network) => {
      record[network.name] = network;
    });

    return record;
  }, [configuredNetworks]);
}

/**
 * @returns a list of record that maps configured chainSlug to `Chain` object
 */
export function useSupportedChainsSlugRecord() {
  const configuredNetworks = useSupportedChains();
  return useMemo(() => {
    const record: Record<string, Chain> = {};
    configuredNetworks.forEach((network) => {
      record[network.slug] = network;
    });

    return record;
  }, [configuredNetworks]);
}

/**
 * @returns `Chain` object for the given chainId if it is configured, otherwise `undefined`
 */
export function useSupportedChain(chainId: number) {
  const record = useSupportedChainsRecord();
  if (chainId in record) {
    return record[chainId];
  }
}
