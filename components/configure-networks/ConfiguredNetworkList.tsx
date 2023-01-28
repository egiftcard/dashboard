import { Box, Flex, List, ListItem } from "@chakra-ui/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { StoredChain } from "contexts/configured-chains";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { useMemo } from "react";
import { Button, Heading } from "tw-components";

interface ConfiguredNetworkListProps {
  onDelete: (network: StoredChain) => void;
  onClick: (network: StoredChain) => void;
  activeNetwork?: StoredChain;
}

export const ConfiguredNetworkList: React.FC<ConfiguredNetworkListProps> = (
  props,
) => {
  const configuredChains = useConfiguredChains();

  const { mainnets, testnets } = useMemo(() => {
    const _mainets: StoredChain[] = [];
    const _testnets: StoredChain[] = [];

    configuredChains.forEach((network) => {
      if (network.testnet) {
        _testnets.push(network);
      } else {
        _mainets.push(network);
      }
    });

    return { mainnets: _mainets, testnets: _testnets };
  }, [configuredChains]);

  return (
    <>
      <List
        spacing={0}
        overflow="auto"
        maxH="530px"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 24,
          },
        }}
        pb={8}
        sx={{
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
        }}
      >
        {mainnets.length > 0 && (
          <Box mb={8}>
            <Heading fontSize="md" color="whiteAlpha.500" mb={4} ml={8}>
              Mainnets
            </Heading>
            {mainnets.map((network) => (
              <NetworkListItem
                isActive={props.activeNetwork === network}
                onClick={() => props.onClick(network)}
                name={network.name}
                key={network.slug}
                img={network.icon?.url}
              />
            ))}
          </Box>
        )}

        {testnets.length > 0 && (
          <Box mb={8}>
            <Heading fontSize="md" color="whiteAlpha.500" mb={4} ml={8}>
              Testnets
            </Heading>
            {testnets.map((network) => (
              <NetworkListItem
                isActive={props.activeNetwork === network}
                onClick={() => props.onClick(network)}
                name={network.name}
                key={network.slug}
                img={network.icon?.url}
              />
            ))}
          </Box>
        )}
      </List>
    </>
  );
};

const NetworkListItem: React.FC<{
  onClick: () => void;
  name: string;
  isActive: boolean;
  isCustom?: boolean;
  img?: string;
}> = (props) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Button
        display="flex"
        justifyContent="flex-start"
        w="100%"
        background={props.isActive ? "#1B2129" : "transparent"}
        color={props.isActive ? "white" : "white"}
        fontWeight={500}
        fontSize="14px"
        px={8}
        pr={2}
        py={4}
        _hover={{
          background: "#1B2129",
        }}
        onClick={props.onClick}
        whiteSpace="normal"
        textAlign="left"
        borderRadius={0}
        lineHeight={1.1}
      >
        <Flex gap={3} alignItems="center">
          <ChainIcon size={20} ipfsSrc={props.img} />
          {props.name}
        </Flex>
      </Button>
    </ListItem>
  );
};
