import { CustomConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import {
  DashboardThirdwebProvider,
  DashboardThirdwebProviderProps,
} from "./providers";
import { EVMContractInfoProvider } from "@3rdweb-sdk/react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { DehydratedState, Hydrate, QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  Persister,
} from "@tanstack/react-query-persist-client";
import { shouldNeverPersistQuery, useAddress } from "@thirdweb-dev/react";
import { ConfigureNetworkModal } from "components/configure-networks/ConfigureNetworkModal";
import { DeployModalProvider } from "components/contract-components/contract-deploy-form/deploy-context-modal";
import { AppShell, AppShellProps } from "components/layout/app-shell";
import { Onboarding as OnboardingModal } from "components/onboarding";
import { PosthogIdentifier } from "components/wallets/PosthogIdentifier";
import { AllChainsProvider } from "contexts/all-chains";
import { ChainsProvider } from "contexts/configured-chains";
import { ErrorProvider } from "contexts/error-handler";
import { isSanctionedAddress } from "data/eth-sanctioned-addresses";
import { useAddRecentlyUsedChainId } from "hooks/chains/recentlyUsedChains";
import {
  useIsNetworkConfigModalOpen,
  useSetIsNetworkConfigModalOpen,
} from "hooks/networkConfigModal";
import { del, get, set } from "idb-keyval";
import { useEffect, useMemo, useState } from "react";
import { Heading } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import { bigNumberReplacer } from "utils/bignumber";
import { isBrowser } from "utils/isBrowser";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { isProd } from "constants/rpc";
import { OpCreditsGrantedModalWrapper } from "components/onboarding/OpCreditsGrantedModalWrapper";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_PAYMENTS_API,
  credentials: "include",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const __CACHE_BUSTER = "3.14.40-nightly-1e6f9dcc-20230831023648";

interface AsyncStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

let currStorage: AsyncStorage | undefined;

function getStorage() {
  if (!isBrowser()) {
    return undefined;
  }
  if (currStorage) {
    return currStorage;
  }

  currStorage = {
    getItem: async (key) => {
      const i = await get(key);
      if (!i) {
        return null;
      }
      return i as string | null;
    },
    setItem: set,
    removeItem: del,
  } as AsyncStorage;
  return currStorage;
}

const persister: Persister = createAsyncStoragePersister({
  storage: getStorage(),
  serialize: (data) => {
    return JSON.stringify(
      {
        ...data,
        clientState: {
          ...data.clientState,
          queries: data.clientState.queries.filter(
            (q) => !shouldNeverPersistQuery(q.queryKey),
          ),
        },
      },
      bigNumberReplacer,
    );
  },
  key: `tw-query-cache`,
});

interface AppLayoutProps extends AppShellProps, DashboardThirdwebProviderProps {
  dehydratedState?: DehydratedState;
}

export const AppLayout: ComponentWithChildren<AppLayoutProps> = (props) => {
  // has to be constructed in here because it may otherwise share state between SSR'd pages
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 24 hours
            cacheTime: 1000 * 60 * 60 * 24,
            // 30 seconds
            staleTime: 1000 * 30,
          },
        },
      }),
  );

  useEffect(() => {
    if (!isProd) {
      localStorage.setItem("IS_THIRDWEB_DEV", "true");
      localStorage.setItem(
        "THIRDWEB_DEV_URL",
        "https://embedded-wallet.thirdweb-dev.com",
      );
    }
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        buster: __CACHE_BUSTER,
        dehydrateOptions: {
          shouldDehydrateQuery: (q) => !shouldNeverPersistQuery(q.queryKey),
        },
      }}
    >
      <Hydrate state={props.dehydratedState}>
        <ErrorProvider>
          <ApolloProvider client={apolloClient}>
            <DeployModalProvider>
              <AllChainsProvider>
                <ChainsProvider>
                  <EVMContractInfoProvider value={props.contractInfo}>
                    <DashboardThirdwebProvider>
                      <SanctionedAddressesChecker>
                        <PosthogIdentifier />
                        <ConfigModal />

                        <OnboardingModal />
                        <OpCreditsGrantedModalWrapper />

                        <AppShell {...props} />
                      </SanctionedAddressesChecker>
                    </DashboardThirdwebProvider>
                  </EVMContractInfoProvider>
                </ChainsProvider>
              </AllChainsProvider>
            </DeployModalProvider>
          </ApolloProvider>
        </ErrorProvider>
      </Hydrate>
    </PersistQueryClientProvider>
  );
};

const SanctionedAddressesChecker: ComponentWithChildren = ({ children }) => {
  const address = useAddress();
  const isBlocked = useMemo(() => {
    return address && isSanctionedAddress(address);
  }, [address]);
  if (isBlocked) {
    return (
      <SimpleGrid
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        left={0}
        placeItems="center"
        bg="black"
        zIndex="banner"
      >
        <Flex gap={4} direction="column" align="center">
          <Heading as="p">Address is blocked</Heading>
          <CustomConnectWallet auth={{ loginOptional: true }} />
        </Flex>
      </SimpleGrid>
    );
  }
  return <>{children}</>;
};

function ConfigModal() {
  const isNetworkConfigModalOpen = useIsNetworkConfigModalOpen();
  const setIsNetworkConfigModalOpen = useSetIsNetworkConfigModalOpen();
  const addRecentlyUsedChains = useAddRecentlyUsedChainId();

  if (!isNetworkConfigModalOpen) {
    return null;
  }

  return (
    <ConfigureNetworkModal
      onNetworkAdded={(_chain) => {
        addRecentlyUsedChains(_chain.chainId);
      }}
      onClose={() => setIsNetworkConfigModalOpen(false)}
    />
  );
}