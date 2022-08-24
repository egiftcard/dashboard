import { NFTMintForm } from "./mint-form";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { NFTContract, useLazyMint } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer } from "tw-components";

interface NFTLazyMintButtonProps {
  contract: NFTContract;
}

export const NFTLazyMintButton: React.FC<NFTLazyMintButtonProps> = ({
  contract,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useLazyMint(contract);

  const detectedState = extensionDetectedState({
    contract,
    feature: ["ERC721Droppable", "ERC1155Droppable"],
  });

  if (detectedState !== "enabled") {
    return null;
  }

  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm contract={contract} lazyMintMutation={mutation} />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Single Upload
      </Button>
    </>
  );
};
