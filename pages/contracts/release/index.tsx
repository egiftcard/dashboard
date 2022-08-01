import { Flex, Link } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { DeployableContractTable } from "components/contract-components/contract-table";
import { useTrack } from "hooks/analytics/useTrack";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import { Heading, Text } from "tw-components";

export default function ContractsReleasePage() {
  const { Track } = useTrack({
    page: "publish",
  });

  const router = useRouter();

  const ipfsHashes = useMemo(() => {
    const ipfs = router.query.ipfs;
    return Array.isArray(ipfs) ? ipfs : [ipfs || ""];
  }, [router.query]);

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">Release Contracts</Heading>
          <Text fontStyle="italic" maxW="container.md">
            Welcome to the new thirdweb contract deployment flow.
            <br />
            <Link
              color="primary.500"
              isExternal
              href="https://portal.thirdweb.com/thirdweb-cli"
            >
              Learn more about releasing your contracts.
            </Link>
          </Text>
        </Flex>

        <DeployableContractTable
          contractIds={ipfsHashes}
          context="create_release"
        />
      </Flex>
    </Track>
  );
}

ContractsReleasePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
