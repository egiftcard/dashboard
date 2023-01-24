import { ConfiguredNetworkInfo } from "./types";
import { Box, Icon, List, ListItem } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Button, Heading } from "tw-components";

interface ConfiguredNetworkListProps {
  onDelete: (network: ConfiguredNetworkInfo) => void;
  networks: ConfiguredNetworkInfo[];
  onClick: (network: ConfiguredNetworkInfo) => void;
  activeNetwork?: ConfiguredNetworkInfo;
}

export const ConfiguredNetworkList: React.FC<ConfiguredNetworkListProps> = (
  props,
) => {
  const { mainnets, testnets } = useMemo(() => {
    const _mainets: ConfiguredNetworkInfo[] = [];
    const _testnets: ConfiguredNetworkInfo[] = [];

    props.networks.forEach((network) => {
      if (
        network.name.toLowerCase().includes("test") ||
        network.type === "testnet"
      ) {
        _testnets.push(network);
      } else {
        _mainets.push(network);
      }
    });

    return { mainnets: _mainets, testnets: _testnets };
  }, [props.networks]);

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
        pr={4}
        sx={{
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
        }}
      >
        {mainnets.length > 0 && (
          <Box mb={8}>
            <Heading fontSize="md" color="whiteAlpha.500" mb={2}>
              Mainnets
            </Heading>
            {mainnets.map((network) => (
              <NetworkListItem
                isActive={props.activeNetwork === network}
                onClick={() => props.onClick(network)}
                name={network.name}
                key={network.name}
              />
            ))}
          </Box>
        )}

        {testnets.length > 0 && (
          <Box mb={8}>
            <Heading fontSize="md" color="whiteAlpha.500" mb={2}>
              Testnets
            </Heading>
            {testnets.map((network) => (
              <NetworkListItem
                isActive={props.activeNetwork === network}
                onClick={() => props.onClick(network)}
                name={network.name}
                key={network.name}
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
}> = (props) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Button
        display="flex"
        justifyContent="space-between"
        w="100%"
        background={props.isActive ? "white" : "transparent"}
        color={props.isActive ? "black" : "white"}
        fontWeight={500}
        fontSize="14px"
        // color={props.isActive ? "white" : "white"}
        p={0}
        mb={1}
        pl={3}
        _hover={{
          background: props.isActive ? "white" : "backgroundHighlight",
        }}
        onClick={props.onClick}
        whiteSpace="normal"
        textAlign="left"
        lineHeight={1.1}
      >
        {props.name}
        {props.isActive && (
          <Icon as={FaChevronRight} mr={3} color="backgroundBody" />
        )}
      </Button>
    </ListItem>
  );
};
