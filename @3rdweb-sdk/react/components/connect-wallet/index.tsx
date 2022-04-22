import { useWeb3 } from "@3rdweb-sdk/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  ButtonProps,
  Flex,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { useConnect, useDisconnect, useMagic } from "@thirdweb-dev/react";
import { Button } from "components/buttons/Button";
import React, { useState } from "react";
import { AiOutlineDisconnect } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { ImCopy } from "react-icons/im";
import { shortenIfAddress } from "utils/usedapp-external";
import { Connector } from "wagmi-core";

const connectorIdToImageUrl: Record<string, string> = {
  MetaMask: "https://thirdweb.com/logos/metamask-fox.svg",
  WalletConnect: "https://thirdweb.com/logos/walletconnect-logo.svg",
  "Coinbase Wallet": "https://thirdweb.com/logos/coinbase-wallet-logo.svg",
  Magic: "https://thirdweb.com/logos/magic-logo.svg",
};
export const ConnectWallet: React.FC<ButtonProps> = (buttonProps) => {
  const [connector, connect] = useConnect();
  const { balance, address, chainId, getNetworkMetadata } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disconnect = useDisconnect();

  const { hasCopied, onCopy } = useClipboard(address || "");

  function handleConnect(_connector: Connector<any, any>) {
    if (_connector.name.toLowerCase() === "magic") {
      onOpen();
    } else {
      connect(_connector);
    }
  }

  if (address && chainId) {
    const SVG = getNetworkMetadata(chainId).icon;
    return (
      <Menu matchWidth isLazy>
        <MenuButton
          as={Button}
          {...buttonProps}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
        >
          <Flex direction="row" gap={3} align="center">
            <Icon boxSize={6} as={SVG} />
            <Flex gap={0.5} direction="column" textAlign="left">
              <Text size="label.sm">
                <Skeleton as="span" isLoaded={!balance.isLoading}>
                  {balance.data?.formatted || "0.000"}
                </Skeleton>{" "}
                {getNetworkMetadata(chainId).symbol}
              </Text>
              <Text size="label.sm" color="gray.500">
                {shortenIfAddress(address, true)} (
                {getNetworkMetadata(chainId).chainName})
              </Text>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList borderRadius="lg">
          <MenuItem
            closeOnSelect={false}
            icon={
              <Icon
                color={hasCopied ? "green.500" : undefined}
                as={hasCopied ? FiCheck : ImCopy}
              />
            }
            onClick={onCopy}
          >
            <Text size="label.md">Copy wallet address</Text>
          </MenuItem>
          <MenuDivider my={0} />
          <MenuItem icon={<AiOutlineDisconnect />} onClick={disconnect}>
            <Text size="label.md">Disconnect Wallet</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <>
      <MagicModal isOpen={isOpen} onClose={onClose} />
      <Menu matchWidth isLazy>
        <MenuButton
          isLoading={connector.loading}
          as={Button}
          colorScheme="primary"
          rightIcon={<ChevronDownIcon />}
          {...buttonProps}
        >
          Connect Wallet
        </MenuButton>

        <MenuList>
          {connector.data.connectors.map((_connector) => {
            if (!_connector.ready) {
              return null;
            }

            return (
              <MenuItem
                key={_connector.name}
                icon={
                  <Image
                    maxWidth={4}
                    borderRadius="md"
                    src={connectorIdToImageUrl[_connector.name]}
                    alt=""
                  />
                }
                onClick={() => handleConnect(_connector)}
              >
                <Text size="label.md">{_connector.name}</Text>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

interface IMagicModal {
  isOpen: boolean;
  onClose: () => void;
}

const MagicModal: React.FC<IMagicModal> = ({ isOpen, onClose }) => {
  const connectMagic = useMagic();
  const [email, setEmail] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  async function connect() {
    setIsConnecting(true);
    try {
      await connectMagic({ email });
      onClose();
    } catch (err) {
      console.error("failed to connect", err);
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent padding="20px" pt="32px">
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <Input
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              isLoading={isConnecting}
              onClick={() => connect()}
              borderRadius="md"
              colorScheme="primary"
            >
              Connect with Magic
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
