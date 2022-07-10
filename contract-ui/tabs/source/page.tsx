import { useActiveChainId } from "@3rdweb-sdk/react";
import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Flex,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { VerificationStatus } from "pages/api/verify";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Badge, Button, Card, CodeBlock, Heading } from "tw-components";

interface CustomContractSourcePageProps {
  contractAddress?: string;
}

function useContractSources(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    [contractAddress],
    async () => {
      return await sdk
        ?.getPublisher()
        .fetchContractSourcesFromAddress(contractAddress || "");
    },
    {
      enabled: !!contractAddress,
    },
  );
}

function useVerifyCall(shouldFetch: boolean, contractAddress?: string) {
  const chainId = useActiveChainId();
  return useQueryWithNetwork(
    ["verify", contractAddress],
    async () => {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractAddress,
          chainId,
        }),
      });
      return response.json();
    },
    {
      enabled: !!contractAddress && !!chainId && shouldFetch,
    },
  );
}

function useCheckVerificationStatus(guid?: string) {
  const chainId = useActiveChainId();
  return useQueryWithNetwork(
    ["verifycheck", guid],
    async () => {
      const response = await fetch(
        `/api/checkVerificationStatus?guid=${guid}&chainId=${chainId}`,
      );
      return response.json();
    },
    {
      enabled: !!guid && !!chainId,
      refetchInterval: (data, query) => {
        if (data?.result === VerificationStatus.PENDING) {
          return 2000;
        }
        return 0;
      },
    },
  );
}

interface ConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
}

const VerifyContractModal: React.FC<ConnectorModalProps> = ({
  isOpen,
  onClose,
  contractAddress,
}) => {
  const { data: verifyResult, isLoading: verifying } = useVerifyCall(
    isOpen,
    contractAddress,
  );
  const { data: verificationStatus } = useCheckVerificationStatus(
    verifyResult?.guid,
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pb={5} mx={{ base: 4, md: 0 }}>
        <ModalHeader>
          <Flex gap={2} align="center">
            <Heading size="subtitle.md">Etherscan Verification</Heading>
            <Badge variant="outline" colorScheme="purple" rounded="md" px={2}>
              beta
            </Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <Flex flexDir="column">
            {verifying && (
              <Flex gap={2} align="center">
                <Spinner color="purple.500" size="sm" />
                <Heading size="label.md">Verifying...</Heading>
              </Flex>
            )}
            {verifyResult?.error ? (
              <Flex gap={2} align="center">
                {verifyResult?.error === verifyResult.ALREADY_VERIFIED ? (
                  <Icon as={FiCheckCircle} color="green.600" />
                ) : (
                  <Icon as={FiXCircle} color="red.600" />
                )}
                <Heading size="label.md">
                  {verifyResult?.error.toString()}
                </Heading>
              </Flex>
            ) : null}
            {verificationStatus?.result ? (
              <Flex gap={2} align="center">
                {verificationStatus?.result === VerificationStatus.PENDING && (
                  <Spinner color="purple.500" size="sm" />
                )}
                {verificationStatus?.result === VerificationStatus.SUCCESS && (
                  <Icon as={FiCheckCircle} color="green.600" />
                )}
                {verificationStatus?.result === VerificationStatus.FAILED && (
                  <Icon as={FiXCircle} color="red.600" />
                )}
                <Heading size="label.md">
                  {verificationStatus.result.toString()}
                </Heading>
              </Flex>
            ) : null}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const CustomContractSourcePage: React.FC<
  CustomContractSourcePageProps
> = ({ contractAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const contractQuery = useContractSources(contractAddress);

  if (!contractAddress) {
    return <div>No contract address provided</div>;
  }
  if (!contractQuery || contractQuery?.isLoading) {
    return (
      <Flex direction="row" align="center" gap={2}>
        <Spinner color="purple.500" size="xs" />
        <Heading size="title.sm">Loading...</Heading>
      </Flex>
    );
  }

  const codeNotFound = (
    <Flex direction="column" align="left" gap={2}>
      <Flex direction="row" align="center" gap={2}>
        <Icon as={FiXCircle} color="red.500" />
        <Heading size="title.sm">Contract source code not available</Heading>
      </Flex>
      <Heading size="subtitle.sm">
        Try deploying with{" "}
        <Link
          href="https://portal.thirdweb.com/thirdweb-deploy/thirdweb-cli"
          isExternal
        >
          thirdweb CLI v0.5+
        </Link>
      </Heading>
    </Flex>
  );

  if (contractQuery.isError) {
    return codeNotFound;
  }

  // clean up the source filenames and filter out libraries
  const sources = contractQuery.data
    ? contractQuery.data
        .filter((source) => !source.filename.includes("@"))
        .map((source) => {
          return {
            ...source,
            filename: source.filename.split("/").pop(),
          };
        })
    : [];

  return (
    <>
      <VerifyContractModal
        isOpen={isOpen}
        onClose={onClose}
        contractAddress={contractAddress}
      />
      <Flex direction="column" gap={8}>
        {sources && sources.length > 0 ? (
          <>
            <Flex direction="row" alignItems="center" gap={2}>
              <Heading size="title.sm" flex={1}>
                Contract Source Code
              </Heading>
              <Button onClick={onOpen}>Verify on Etherscan</Button>
            </Flex>
            {sources.map((signature) => (
              <Card
                as={Flex}
                gap={4}
                flexDirection="column"
                key={signature.filename}
              >
                <Heading size="label.md">{signature.filename}</Heading>
                <CodeBlock code={signature.source} language="javascript" />
              </Card>
            ))}
          </>
        ) : (
          codeNotFound
        )}
      </Flex>
    </>
  );
};
