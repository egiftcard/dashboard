import {
  Alert,
  AlertIcon,
  Flex,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { Text, LinkButton } from "tw-components";

const SponsoredChains = [
  // Optimism
  10,
  // Base
  8453,
  // Zora
  7777777,
  // Mode
  34443,
  // Frax
  252,
];

interface SponsoredNetworkAlertProps {
  chain: Chain;
}

export const SponsoredNetworkAlert: React.FC<SponsoredNetworkAlertProps> = ({
  chain,
}) => {
  const cleanedChainName = chain?.name?.replace("Mainnet", "").trim();

  const isSponsored = SponsoredChains.includes(chain?.chainId);

  if (!isSponsored) {
    return null;
  }

  return (
    <Alert
      status="info"
      borderRadius="lg"
      backgroundColor="backgroundCardHighlight"
      borderLeftColor="blue.500"
      borderLeftWidth={4}
      as={Flex}
      gap={1}
    >
      <AlertIcon />
      <Flex flexDir="column">
        <AlertTitle>{cleanedChainName} is a sponsored chain</AlertTitle>
        <AlertDescription>
          <Text>
            Gas for all on-chain actions performed using thirdweb tools will be
            covered. This includes contract deploys, sponsored transactions, and
            all on-chain actions.
          </Text>
          <LinkButton href="" isExternal colorScheme="blue" size="sm" mt={2}>
            Learn more
          </LinkButton>
        </AlertDescription>
      </Flex>
    </Alert>
  );
};
