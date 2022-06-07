import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  LinkOverlay,
  Skeleton,
} from "@chakra-ui/react";
import { detectFeatures } from "@thirdweb-dev/sdk";
import { FeatureWithEnabled } from "@thirdweb-dev/sdk/dist/src/constants/contract-features";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { ContractDeployForm } from "components/contract-components/contract-deploy-form";
import { useContractPublishMetadataFromURI } from "components/contract-components/hooks";
import { SnippetApiResponse } from "components/contract-tabs/code/types";
import { FeatureIconMap } from "constants/mappings";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ReactElement, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiExternalLink,
  FiInfo,
  FiSearch,
  FiXCircle,
} from "react-icons/fi";
import { useQuery } from "react-query";
import { Card, CodeBlock, Heading, LinkButton, Text } from "tw-components";

const ALWAYS_SUGGESTED = ["ContractMetadata", "Permissions"];

function extractFeatures(
  input: ReturnType<typeof detectFeatures>,
  enabledFeatures: FeatureWithEnabled[] = [],
  suggestedFeatures: FeatureWithEnabled[] = [],
  parent = "__ROOT__",
) {
  if (!input) {
    return {
      enabledFeatures,
      suggestedFeatures,
    };
  }
  for (const featureKey in input) {
    const feature = input[featureKey];
    // if feature is enabled, then add it to enabledFeatures
    if (feature.enabled) {
      enabledFeatures.push(feature);
    }
    // otherwise if it is disabled, but it's parent is enabled or suggested, then add it to suggestedFeatures
    else if (
      enabledFeatures.findIndex((f) => f.name === parent) > -1 ||
      ALWAYS_SUGGESTED.includes(feature.name)
    ) {
      suggestedFeatures.push(feature);
    }
    // recurse
    extractFeatures(
      feature.features,
      enabledFeatures,
      suggestedFeatures,
      feature.name,
    );
  }

  return {
    enabledFeatures,
    suggestedFeatures,
  };
}

function useContractFeatures(abi?: any) {
  const features = useMemo(() => {
    if (abi) {
      return extractFeatures(detectFeatures(abi));
    }
    return undefined;
  }, [abi]);
  return features;
}

export default function ContractDetailPage() {
  const { Track } = useTrack({
    page: "contract-detail",
  });

  const router = useRouter();
  const contractId = useSingleQueryParam("contractId");
  const from = useSingleQueryParam("from");
  const publishMetadataQuery = useContractPublishMetadataFromURI(
    contractId || "",
  );
  const contractTypeImage = useMemo(() => {
    return contractId && contractId in FeatureIconMap
      ? FeatureIconMap[contractId as keyof typeof FeatureIconMap]
      : FeatureIconMap["custom"];
  }, [contractId]);
  const features = useContractFeatures(publishMetadataQuery.data?.abi);

  const [extensionFilter, setExtensionFilter] = useState("");

  const [enabledFeatures, suggestedFeatures] = useMemo(() => {
    if (!features) {
      return [[], [], []];
    }
    const enabled = features.enabledFeatures.filter(
      (f) =>
        f.name.toLowerCase().includes(extensionFilter.toLowerCase()) ||
        f.namespace.toLowerCase().includes(extensionFilter.toLowerCase()),
    );
    const suggested = features.suggestedFeatures.filter(
      (f) =>
        f.name.toLowerCase().includes(extensionFilter.toLowerCase()) ||
        f.namespace.toLowerCase().includes(extensionFilter.toLowerCase()),
    );
    return [enabled, suggested] as const;
  }, [extensionFilter, features]);

  return (
    <Track>
      <Flex direction="column" as="section" gap={4}>
        <Flex gap={4} align="center">
          {from && (
            <IconButton
              variant="ghost"
              aria-label="back"
              onClick={() => router.back()}
              icon={<Icon boxSize={6} as={FiArrowLeft} />}
            />
          )}
          <Heading>Contract Details</Heading>
        </Flex>
        <Flex align="center" gap={4} justify="space-between" as="header">
          <Flex align="center" gap={2}>
            <Skeleton isLoaded={publishMetadataQuery.isSuccess}>
              {publishMetadataQuery.data?.image ? (
                typeof publishMetadataQuery.data.image === "string" ? (
                  <Image
                    objectFit="contain"
                    boxSize="64px"
                    src={publishMetadataQuery.data.image}
                    alt={publishMetadataQuery.data?.name}
                  />
                ) : (
                  <ChakraNextImage
                    boxSize="64px"
                    src={publishMetadataQuery.data.image}
                    alt={publishMetadataQuery.data?.name}
                  />
                )
              ) : contractTypeImage ? (
                <ChakraNextImage
                  boxSize="64px"
                  src={contractTypeImage}
                  alt={publishMetadataQuery.data?.name || ""}
                />
              ) : null}
            </Skeleton>
            <Flex direction="column" gap={1} align="flex-start">
              <Skeleton isLoaded={publishMetadataQuery.isSuccess}>
                <Heading size="title.md">
                  {publishMetadataQuery.isSuccess
                    ? publishMetadataQuery.data?.name
                    : "testing testing testing"}
                </Heading>
              </Skeleton>
            </Flex>
          </Flex>
          <Flex align="center" gap={4}>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiSearch} />
              </InputLeftElement>
              <Input
                value={extensionFilter}
                onChange={(e) => setExtensionFilter(e.target.value)}
                placeholder="Filter extensions..."
                variant="outline"
                borderColor="borderColor"
              />
            </InputGroup>
          </Flex>
        </Flex>
        <Divider borderColor="borderColor" />
        <Flex gap={12} direction="column" as="main">
          {contractId && (
            <Flex gap={4} direction="column">
              <Box>
                <Heading size="subtitle.lg">Deploy contract</Heading>
                <Text>
                  Now you&apos;re ready to deploy, fill the parameters and
                  select the network in which you want to deploy the contract
                  to.
                </Text>
              </Box>
              <Card>
                <Flex direction="column" gap={8}>
                  {enabledFeatures.length > 0 && (
                    <Flex direction="column" gap={4}>
                      <Box>
                        <Heading size="subtitle.md">
                          Detected Extensions
                        </Heading>
                        <Text>
                          These extensions will automatically be available for
                          this contract in the dashboard as well as in the SDKs.
                        </Text>
                      </Box>
                      <Flex gap={2}>
                        {enabledFeatures.map((feature) => (
                          <EnabledFeature
                            key={feature.name}
                            feature={feature}
                          />
                        ))}
                      </Flex>
                    </Flex>
                  )}
                  <ContractDeployForm contractId={contractId} />
                </Flex>
              </Card>
            </Flex>
          )}
          {suggestedFeatures.length > 0 && (
            <Flex gap={4} direction="column" as="section">
              <Box>
                <Heading size="subtitle.lg">Suggested Extensions</Heading>
                <Text>
                  These extensions would likely be useful for this contract, but
                  are not being implemented.
                </Text>
              </Box>

              <Accordion
                allowToggle
                allowMultiple
                defaultIndex={[0]}
                display="flex"
                flexDir="column"
                gap={6}
              >
                {suggestedFeatures.map((feature) => (
                  <FeatureDetails
                    key={feature.name}
                    contractName={publishMetadataQuery.data?.name}
                    feature={feature}
                    state="suggested"
                  />
                ))}
              </Accordion>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Track>
  );
}

ContractDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

interface EnabledFeatureProps {
  feature: FeatureWithEnabled;
}

const EnabledFeature: React.FC<EnabledFeatureProps> = ({ feature }) => {
  const { trackEvent } = useTrack();
  return (
    <Card
      overflow="hidden"
      py={2}
      as={LinkBox}
      _hover={{ opacity: 0.8 }}
      borderRadius="full"
    >
      <Flex gap={2} align="center" justify="space-between">
        <Flex gap={2} align="center">
          <Icon boxSize={4} color="green.500" as={FiCheckCircle} />
          <LinkOverlay
            href={`https://portal.thirdweb.com/typescript/${feature.docLinks.sdk}`}
            isExternal
            onClick={() =>
              trackEvent({
                category: "extensions-deploy",
                action: "click",
                label: feature.name,
              })
            }
          >
            <Heading textAlign="left" size="subtitle.sm">
              {feature.name}
            </Heading>
          </LinkOverlay>
          <Icon as={FiExternalLink} />
        </Flex>
      </Flex>
    </Card>
  );
};

interface FeatureDetailsProps {
  feature: FeatureWithEnabled;
  state: "enabled" | "disabled" | "suggested";
  contractName?: string;
}

const FeatureDetails: React.FC<FeatureDetailsProps> = ({
  feature,
  state,
  contractName = "YourContract",
}) => {
  const { trackEvent } = useTrack();
  const codeSnippets = useFeatureCodeSnippet();

  const featureDetails = useMemo(() => {
    return codeSnippets.data ? codeSnippets.data[feature.name] : undefined;
  }, [codeSnippets.data, feature.name]);

  const contractFeatureName = feature.docLinks.contracts;
  const contractFeaturePath = contractFeatureName.startsWith("I")
    ? "feature/interface"
    : "feature";

  return (
    <Card p={0} overflow="hidden">
      <AccordionItem border="none">
        <AccordionButton
          p={4}
          justifyContent="space-between"
          _focus={{
            boxShadow: "none",
          }}
          _expanded={{
            bg: "blackAlpha.50",
          }}
        >
          <Flex gap={2} align="center" justify="space-between">
            <Flex gap={2} align="center">
              <Icon
                boxSize={4}
                color={
                  state === "enabled"
                    ? "green.500"
                    : state === "suggested"
                    ? "blue.500"
                    : "red.500"
                }
                as={
                  state === "enabled"
                    ? FiCheckCircle
                    : state === "suggested"
                    ? FiInfo
                    : FiXCircle
                }
              />
              <Heading textAlign="left" size="subtitle.sm">
                {feature.name}
              </Heading>
            </Flex>
          </Flex>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          {featureDetails && (
            <Flex direction="column" gap={2}>
              <Flex gap={4} justify="space-between" align="center">
                <Heading size="label.md">{featureDetails.summary}</Heading>
                <LinkButton
                  size="sm"
                  href={
                    state === "enabled"
                      ? `https://portal.thirdweb.com/typescript/${feature.docLinks.sdk}`
                      : `https://portal.thirdweb.com/contracts/${feature.docLinks.contracts}`
                  }
                  isExternal
                  variant="ghost"
                  borderRadius="md"
                  onClick={() =>
                    trackEvent({
                      category: "extensions-deploy",
                      action: "click",
                      label: feature.name,
                    })
                  }
                >
                  Learn more
                </LinkButton>
              </Flex>
              {state === "enabled" ? (
                <>
                  {featureDetails.examples.javascript && (
                    <CodeBlock
                      mt={1}
                      language="javascript"
                      code={featureDetails.examples.javascript.replaceAll(
                        "{{contract_address}}",
                        "0x...",
                      )}
                    />
                  )}
                </>
              ) : (
                <Flex mt={2} gap={3} direction="column">
                  <CodeBlock
                    language="solidity"
                    code={`import "@thirdweb-dev/contracts/${contractFeaturePath}/${contractFeatureName}.sol";

contract ${contractName} is ${contractFeatureName} { ... }`}
                  />
                </Flex>
              )}
            </Flex>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Card>
  );
};

function useFeatureCodeSnippet() {
  return useQuery(["feature-snippets"], async () => {
    const res = await fetch(
      `https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/main/docs/feature_snippets.json`,
    );
    return (await res.json()) as SnippetApiResponse;
  });
}
