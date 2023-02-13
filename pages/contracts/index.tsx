import { useAllContractList, useAllProgramsList } from "@3rdweb-sdk/react";
import {
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAddress } from "@thirdweb-dev/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { FTUX } from "components/FTUX/FTUX";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { DeployedContracts } from "components/contract-components/tables/deployed-contracts";
import { DeployedPrograms } from "components/contract-components/tables/deployed-programs";
import { ReleasedContracts } from "components/contract-components/tables/released-contracts";
import { FancyEVMIcon } from "components/icons/Ethereum";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { utils } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { isPossibleSolanaAddress } from "lib/address-utils";
import { PageId } from "page-id";
import { useEffect, useMemo, useState } from "react";
import { Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

/**
 *
 * @TODO
 * Initially the FTUX is shown, then the contracts are shown. This creates a flash of wrong content.
 * To fix this, we need to hold off rendering either the FTUX or the contracts until we know which one to show.
 */

const Contracts: ThirdwebNextPage = () => {
  const queryParam = useSingleQueryParam("address") || "contracts";
  const address = useAddress();
  const { publicKey } = useWallet();

  /** put the component is loading state for sometime to avoid layout shift */
  const [isLoading, setIsLoading] = useState(true);

  const evmAddress = useMemo(() => {
    return queryParam === "contracts"
      ? address
      : utils.isAddress(queryParam)
      ? queryParam
      : address;
  }, [address, queryParam]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  const solAddress = useMemo(() => {
    return queryParam === "contracts"
      ? publicKey?.toBase58()
      : isPossibleSolanaAddress(queryParam)
      ? queryParam
      : publicKey?.toBase58();
  }, [publicKey, queryParam]);

  return (
    <ClientOnly fadeInDuration={600} ssr={null}>
      {!isLoading && (
        <>
          {solAddress && <SOLPrograms address={solAddress} />}
          {evmAddress && (
            <Tabs isLazy lazyBehavior="keepMounted">
              <TabList
                px={0}
                borderBottomColor="borderColor"
                borderBottomWidth="1px"
                overflowX={{ base: "auto", md: "inherit" }}
              >
                <Tab gap={2} _selected={{ borderBottomColor: "purple.500" }}>
                  <Icon opacity={0.85} boxSize={6} as={FancyEVMIcon} />
                  <Heading size="label.lg">Deployed Contracts</Heading>
                </Tab>
                <Tab
                  gap={2}
                  _selected={{
                    borderBottomColor: "#FBFF5C",
                  }}
                >
                  <ChakraNextImage
                    src={require("public/assets/product-icons/release.png")}
                    alt=""
                    boxSize={6}
                  />
                  <Heading size="label.lg">Released Contracts</Heading>
                </Tab>
              </TabList>
              <TabPanels px={0} py={2}>
                <TabPanel px={0}>
                  <EVMContracts address={evmAddress} />
                </TabPanel>
                <TabPanel px={0}>
                  <PublishedContractsPage address={evmAddress} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
          {!evmAddress && !solAddress && <FTUX />}
        </>
      )}
    </ClientOnly>
  );
};

Contracts.getLayout = (page, props) => <AppLayout {...props}>{page}</AppLayout>;
Contracts.pageId = PageId.Contracts;

export default Contracts;

interface ContractsProps {
  address: string;
}

const EVMContracts: React.FC<ContractsProps> = ({ address }) => {
  const allContractList = useAllContractList(address);
  return (
    <Flex direction="column" gap={8}>
      <DeployedContracts contractListQuery={allContractList} limit={50} />
    </Flex>
  );
};

const PublishedContractsPage: React.FC<ContractsProps> = ({ address }) => {
  return (
    <Flex direction="column" gap={8}>
      {/* this section needs to be on the publishersdk context (polygon SDK) */}
      <PublisherSDKContext>
        <ReleasedContracts address={address} />
      </PublisherSDKContext>
    </Flex>
  );
};

const SOLPrograms: React.FC<ContractsProps> = ({ address }) => {
  const allProgramAccounts = useAllProgramsList(address);

  return (
    <Flex direction="column" gap={8}>
      <DeployedPrograms programListQuery={allProgramAccounts} />
    </Flex>
  );
};
