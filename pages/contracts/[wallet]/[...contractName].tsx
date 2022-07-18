import { Flex, Select, Skeleton } from "@chakra-ui/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import {
  fetchAllVersions,
  fetchContractPublishMetadataFromURI,
  fetchReleasedContractInfo,
  useAllVersions,
} from "components/contract-components/hooks";
import { ReleasedContract } from "components/contract-components/released-contract";
import { FeatureIconMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { GetServerSideProps } from "next";
import { ReactElement, useMemo, useState } from "react";
import { QueryClient, dehydrate } from "react-query";
import { Heading, LinkButton, Text } from "tw-components";
import { getSingleQueryValue } from "utils/router";

const ContractsNamePageWrapped = () => {
  const wallet = useSingleQueryParam("wallet");
  const contractName = useSingleQueryParam("contractName");
  const allVersions = useAllVersions(wallet, contractName);
  const [selectedVersion, setSelectedVersion] = useState<string>();

  const release = useMemo(() => {
    if (selectedVersion) {
      return allVersions.data?.find((v) => v.version === selectedVersion);
    }
    return allVersions.data?.[0];
  }, [allVersions?.data, selectedVersion]);

  console.log("*** release", { release, isSuccess: allVersions.isSuccess });

  return (
    <Flex direction="column" gap={8}>
      <Flex justifyContent="space-between" w="full">
        <Flex gap={4} alignItems="center">
          <ChakraNextImage src={FeatureIconMap["custom"]} boxSize={12} alt="" />
          <Skeleton isLoaded={allVersions.isSuccess}>
            <Heading size="title.md">{release?.name}</Heading>
            <Text>{release?.description}</Text>
          </Skeleton>
        </Flex>
        <Flex gap={3}>
          <Select onChange={(e) => setSelectedVersion(e.target.value)} w={24}>
            {(allVersions?.data || []).map((releasedVersion) => (
              <option key={releasedVersion.id} value={releasedVersion.version}>
                {releasedVersion.version}
              </option>
            ))}
          </Select>
          <LinkButton
            colorScheme="purple"
            href={`/contracts/deploy/${encodeURIComponent(
              release?.metadataUri.replace("ipfs://", "") || "",
            )}`}
          >
            Deploy {selectedVersion || "Now"}
          </LinkButton>
        </Flex>
      </Flex>
      <Flex>{release && <ReleasedContract release={release} />}</Flex>
    </Flex>
  );
};

export default function ContractNamePage() {
  return (
    <PublisherSDKContext>
      <ContractsNamePageWrapped />
    </PublisherSDKContext>
  );
}

ContractNamePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const sdk = new ThirdwebSDK("polygon");

  const wallet = getSingleQueryValue(ctx.query, "wallet");
  const contractName = getSingleQueryValue(ctx.query, "contractName");

  const publishedContract = await queryClient.fetchQuery(
    ["all-releases", wallet, contractName],
    () => fetchAllVersions(sdk, wallet, contractName),
  );

  const singularPublishedContract = publishedContract[0];

  await Promise.all([
    queryClient.prefetchQuery(
      ["released-contract", singularPublishedContract],
      () => fetchReleasedContractInfo(sdk, singularPublishedContract),
    ),
    queryClient.prefetchQuery(
      ["publish-metadata", singularPublishedContract.metadataUri],
      () =>
        fetchContractPublishMetadataFromURI(
          singularPublishedContract.metadataUri,
        ),
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
