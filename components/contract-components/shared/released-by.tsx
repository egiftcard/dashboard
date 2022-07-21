import { Flex } from "@chakra-ui/react";
import {
  useEnsName,
  useReleasesFromDeploy,
} from "components/contract-components/hooks";
import { useMemo } from "react";
import { LinkButton, Text } from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";

interface ReleasedByProps {
  contractAddress: string;
}

export const ReleasedBy: React.FC<ReleasedByProps> = ({ contractAddress }) => {
  const releasesFromDeploy = useReleasesFromDeploy(contractAddress);

  const lastRelease = useMemo(
    () => releasesFromDeploy?.data?.at(-1),
    [releasesFromDeploy?.data],
  );

  const ensName = useEnsName(lastRelease?.name);

  return lastRelease ? (
    <Flex flexDir="column" gap={3}>
      <LinkButton
        href={`/contracts/${lastRelease?.publisher}/${lastRelease?.name}/${lastRelease?.version}`}
        noMatch
      >
        {lastRelease?.name} | {lastRelease?.version}
      </LinkButton>
      <Text size="label.sm" textAlign="center">
        Released by {shortenIfAddress(ensName.data || lastRelease?.publisher)}
      </Text>
    </Flex>
  ) : null;
};
