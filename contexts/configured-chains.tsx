import { Chain, defaultChains } from "@thirdweb-dev/chains";
import React, { createContext, useEffect, useMemo, useState } from "react";

type UpdateConfiguredChains = {
  add: (newConfiguredNetwork: Chain) => void;
  remove: (index: number) => void;
  update: (index: number, chain: Chain) => void;
};

export const ConfiguredChainsContext = createContext<Chain[] | undefined>(
  undefined,
);

export const UpdateConfiguredChainsContext = createContext<
  UpdateConfiguredChains | undefined
>(undefined);

/**
 * if no networks are configured by the user, return the defaultChains
 */
export function ConfiguredChainsProvider(props: { children: React.ReactNode }) {
  const [configuredNetworks, setConfiguredNetworks] = useState(() => {
    if (typeof window === "undefined") {
      return defaultChains;
    }

    // todo - use indexedDb instead of cookies
    const listFromCookies = configuredChainsStorage.get();

    if (listFromCookies.length === 0) {
      return defaultChains;
    }

    return listFromCookies;
  });

  // update storage when configuredNetworks changes
  useEffect(() => {
    configuredChainsStorage.set(configuredNetworks);
  }, [configuredNetworks]);

  const updator: UpdateConfiguredChains = useMemo(() => {
    return {
      add(newNetwork: Chain) {
        setConfiguredNetworks((prev) => [...prev, newNetwork]);
      },
      remove(index: number) {
        setConfiguredNetworks((prev) => {
          const newConfiguredNetworks = [...prev];
          newConfiguredNetworks.splice(index, 1);
          return newConfiguredNetworks;
        });
      },
      update(index: number, newNetwork: Chain) {
        setConfiguredNetworks((prev) => {
          const newConfiguredNetworks = [...prev];
          newConfiguredNetworks[index] = newNetwork;
          return newConfiguredNetworks;
        });
      },
    };
  }, [setConfiguredNetworks]);

  return (
    <ConfiguredChainsContext.Provider value={configuredNetworks}>
      <UpdateConfiguredChainsContext.Provider value={updator}>
        {props.children}
      </UpdateConfiguredChainsContext.Provider>
    </ConfiguredChainsContext.Provider>
  );
}

// storage  --------------------------------------------
// currently using localStorage, but will move to indexedDb shortly

const configuredChainsStorage = {
  key: "configured-chains",
  get(): Chain[] {
    try {
      const networkListStr = localStorage.getItem(configuredChainsStorage.key);
      return networkListStr ? JSON.parse(networkListStr) : [];
    } catch (e) {
      // if parsing error, clear dirty storage
      localStorage.removeItem(configuredChainsStorage.key);
    }

    return [];
  },

  set(networkList: Chain[]) {
    const value = JSON.stringify(networkList);
    localStorage.setItem(configuredChainsStorage.key, value);
  },
};
