import { BatchTable } from "./batch-table";
import { SelectReveal } from "./select-reveal";
import { UploadStep } from "./upload-step";
import { Box, Container, Flex, HStack, Icon } from "@chakra-ui/react";
import { NFTMetadata, NFTMetadataInput } from "@thirdweb-dev/sdk";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import Papa from "papaparse";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { IoChevronBack } from "react-icons/io5";
import { Button, Card, Heading } from "tw-components";
import {
  CSVData,
  getAcceptedFiles,
  getMergedData,
  transformHeader,
} from "utils/batch";

interface BatchLazyMintProps {
  nextTokenIdToMint?: number;
  ecosystem: "evm" | "solana";
  isRevealable: boolean;
  nftData: NFTMetadataInput[];
  setNftData: Dispatch<SetStateAction<NFTMetadataInput[]>>;
  progress: UploadProgressEvent;
  onSubmit: (formData: {
    name?: string | undefined;
    image?: any;
    description?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
    shuffle: boolean;
    selectedReveal: string;
  }) => void;
}

export const BatchLazyMint: React.FC<BatchLazyMintProps> = ({
  nextTokenIdToMint = 0,
  ecosystem,
  isRevealable,
  onSubmit,
  nftData,
  setNftData,
  progress,
}) => {
  const [step, setStep] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);

  const onDrop = useCallback<Required<DropzoneOptions>["onDrop"]>(
    async (acceptedFiles) => {
      const { csv, json, images, videos } = await getAcceptedFiles(
        acceptedFiles,
      );

      if (csv) {
        Papa.parse<CSVData>(csv, {
          header: true,
          transformHeader,
          complete: (results) => {
            const validResults: Papa.ParseResult<CSVData> = {
              ...results,
              data: [],
            };
            for (let i = 0; i < results.data.length; i++) {
              if (!results.errors.find((e) => e.row === i)) {
                if (results.data[i].name) {
                  validResults.data.push(results.data[i]);
                }
              }
            }
            setNftData(getMergedData(validResults, undefined, images, videos));
          },
        });
      } else if (json) {
        setNftData(getMergedData(undefined, json, images, videos));
      } else {
        console.error("No CSV or JSON found");
        setHasFailed(true);
        return;
      }
    },
    [setNftData],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const paginationPortalRef = useRef<HTMLDivElement>(null);
  return (
    <Container
      maxW="container.page"
      borderRadius={{ base: 0, md: "2xl" }}
      my={{ base: 0, md: 12 }}
      p={{ base: 0, md: 4 }}
    >
      <Card bg="backgroundCardHighlight">
        <Flex flexDir="column" width="100%" p={4}>
          {step === 0 ? (
            <>
              <Flex
                align="center"
                justify="space-between"
                py={{ base: 2, md: 4 }}
                w="100%"
                mb={2}
              >
                <Heading size="title.md">Upload your NFTs</Heading>
              </Flex>
              <Flex direction="column" gap={6} h="100%">
                {nftData.length > 0 ? (
                  <BatchTable
                    portalRef={paginationPortalRef}
                    data={nftData as NFTMetadata[]}
                    nextTokenIdToMint={nextTokenIdToMint}
                  />
                ) : (
                  <UploadStep
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    hasFailed={hasFailed}
                    isDragActive={isDragActive}
                  />
                )}
                <Flex borderTop="1px solid" borderTopColor="borderColor">
                  <Container maxW="container.page">
                    <Flex
                      align="center"
                      justify="space-between"
                      p={{ base: 0, md: 4 }}
                      flexDir={{ base: "column", md: "row" }}
                      mt={{ base: 4, md: 0 }}
                    >
                      <Box ref={paginationPortalRef} />
                      <Flex
                        gap={2}
                        align="center"
                        mt={{ base: 4, md: 0 }}
                        w={{ base: "100%", md: "auto" }}
                      >
                        <Button
                          borderRadius="md"
                          isDisabled={nftData.length === 0}
                          onClick={() => {
                            setNftData([]);
                            setHasFailed(false);
                          }}
                          w={{ base: "100%", md: "auto" }}
                        >
                          Reset
                        </Button>
                        <Button
                          borderRadius="md"
                          colorScheme="primary"
                          isDisabled={nftData.length === 0}
                          onClick={() => setStep(1)}
                          w={{ base: "100%", md: "auto" }}
                        >
                          Next
                        </Button>
                      </Flex>
                    </Flex>
                  </Container>
                </Flex>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                align="center"
                justify="space-between"
                py={4}
                w="100%"
                mb={2}
              >
                <HStack>
                  <Icon
                    boxSize={5}
                    as={IoChevronBack}
                    color="gray.600"
                    onClick={() => setStep(0)}
                    cursor="pointer"
                  />
                  <Heading size="title.md">
                    When will you reveal your NFTs?
                  </Heading>
                </HStack>
              </Flex>
              <SelectReveal
                nftData={nftData}
                ecosystem={ecosystem}
                isRevealable={isRevealable}
                progress={progress}
                onSubmit={onSubmit}
              />
            </>
          )}
        </Flex>
      </Card>
    </Container>
  );
};
