import { DeployableContractTable } from "../contract-table";
import { usePublishedContractsQuery } from "../hooks";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { RequiredParam, useAddress } from "@thirdweb-dev/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useMemo } from "react";
import { IoRefreshSharp } from "react-icons/io5";
import { Button, Heading, LinkButton, Text } from "tw-components";

interface ReleasedContractProps {
  address?: RequiredParam<string>;
  noHeader?: boolean;
}

export const ReleasedContracts: React.FC<ReleasedContractProps> = ({
  address,
  noHeader,
}) => {
  const trackEvent = useTrack();
  const walletAddress = useAddress();
  const releasedContractsQuery = usePublishedContractsQuery(
    address || walletAddress,
  );

  const releasedContracts = useMemo(
    () =>
      (releasedContractsQuery.data || [])?.map((d) =>
        d.metadataUri.replace("ipfs://", ""),
      ),
    [releasedContractsQuery],
  );

  return (
    <>
      {!noHeader && (
        <Flex
          justify="space-between"
          align="top"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Flex gap={2} direction="column">
            <Heading size="title.md">Released contracts</Heading>
            <Text fontStyle="italic" maxW="container.md">
              The list of contract instances that you have released with
              thirdweb
            </Text>
          </Flex>
          <LinkButton
            colorScheme="primary"
            href="https://portal.thirdweb.com/release"
            isExternal
            onClick={() => {
              trackEvent({
                category: "dashboard",
                action: "click",
                label: "learn-more-about-release",
              });
            }}
          >
            Learn more about Release
          </LinkButton>
        </Flex>
      )}
      <DeployableContractTable
        isFetching={releasedContractsQuery.isFetching}
        contractIds={releasedContracts}
        context="view_release"
      >
        {releasedContractsQuery.isLoading && (
          <Center>
            <Flex py={4} direction="row" gap={4} align="center">
              <Spinner size="sm" />
              <Text>Loading releases</Text>
            </Flex>
          </Center>
        )}
        {releasedContractsQuery.isError && (
          <Center>
            <Flex mt={4} py={4} direction="column" gap={4} align="center">
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertTitle mr={2}>
                  Failed to fetch released contracts
                </AlertTitle>
                <Button
                  onClick={() => releasedContractsQuery.refetch()}
                  leftIcon={<IoRefreshSharp />}
                  ml="auto"
                  size="sm"
                  colorScheme="red"
                >
                  Retry
                </Button>
              </Alert>
            </Flex>
          </Center>
        )}
        {releasedContractsQuery.isSuccess &&
          releasedContractsQuery.data.length === 0 && (
            <Center>
              <Flex py={4} direction="column" gap={4} align="center">
                <Text>No releases found.</Text>
              </Flex>
            </Center>
          )}
      </DeployableContractTable>
    </>
  );
};
