import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  UnorderedList,
  ListItem,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { Button, Card, Heading, Text, LinkButton, Link, Badge } from "tw-components";
import {
  useGrantCredits,
  useAccount,
  AccountPlan,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useState } from "react";

interface ClaimCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimCreditsModal: React.FC<ClaimCreditsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [page, setPage] = useState<"eligible" | "claimed">("eligible");
  const account = useAccount();
  const { mutate: claimCredits } = useGrantCredits();
  const { onSuccess, onError } = useTxNotifications(
    "Credits claimed successfully.",
    "Failed to claimed credits.",
  );

  const isFreePlan = account.data?.plan === AccountPlan.Free;
  const isProPlan = account.data?.plan === AccountPlan.Pro;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      onOverlayClick={() => setPage("eligible")}
    >
      <ModalOverlay />
      {page === "eligible" ? (
        <ModalContent>
          <ModalHeader>Claim Gas Credits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <Card as={Flex} alignItems="center" gap={2} flexDir="column">
                <Text textAlign="center">You&apos;re eligible for</Text>
                <Heading
                  color="bgBlack"
                  size="title.2xl"
                  fontWeight="extrabold"
                >
                  {isFreePlan ? "$250" : "$2500"}
                </Heading>
                <Text letterSpacing="wider" fontWeight="bold">
                  GAS CREDITS
                </Text>
              </Card>
              <Text>
                Or {isProPlan ? "contact us" : "upgrade"} and get access to more
                credits:
              </Text>
              <SimpleGrid columns={{ base: 1, md: isFreePlan ? 2 : 1 }} gap={4}>
                {isFreePlan && (
                  <Card
                    as={Flex}
                    justifyContent="space-between"
                    flexDir="column"
                    gap={2}
                  >
                    <Flex flexDir="column" gap={2}>
                      <Box>
                        <Badge
                          borderRadius="full"
                          size="label.sm"
                          px={3}
                          bgColor="#28622A"
                        >
                          <Text
                            color="bgBlack"
                            textTransform="capitalize"
                            fontWeight="bold"
                          >
                            Growth
                          </Text>
                        </Badge>
                      </Box>
                      <Flex flexDir="column" gap={1}>
                        <Heading
                          color="bgBlack"
                          size="title.md"
                          fontWeight="extrabold"
                        >
                          $2500
                        </Heading>
                        <Text letterSpacing="wider" fontWeight="bold">
                          GAS CREDITS
                        </Text>
                      </Flex>
                      <UnorderedList>
                        <Text as={ListItem}>10k monthly active wallets</Text>
                        <Text as={ListItem}>User analytics</Text>
                      </UnorderedList>
                    </Flex>
                    <LinkButton
                      href="/settings/billing"
                      colorScheme="blue"
                      size="sm"
                      variant="outline"
                    >
                      Upgrade for $99
                    </LinkButton>
                  </Card>
                )}
                <Card
                  as={Flex}
                  justifyContent="space-between"
                  flexDir="column"
                  gap={2}
                >
                  <Flex flexDir="column" gap={2}>
                    <Box>
                      <Badge
                        borderRadius="full"
                        size="label.sm"
                        px={3}
                        bgColor="#282B6F"
                      >
                        <Text
                          color="bgBlack"
                          textTransform="capitalize"
                          fontWeight="bold"
                        >
                          Pro
                        </Text>
                      </Badge>
                    </Box>
                    <Flex flexDir="column" gap={1}>
                      <Heading
                        color="bgBlack"
                        size="title.md"
                        fontWeight="extrabold"
                      >
                        Over $2500
                      </Heading>
                      <Text letterSpacing="wider" fontWeight="bold">
                        GAS CREDITS
                      </Text>
                    </Flex>
                    <UnorderedList>
                      <Text as={ListItem}>
                        Custom rate limits for APIs & Infra
                      </Text>
                      <Text as={ListItem}>Enterprise grade SLAs</Text>
                    </UnorderedList>
                  </Flex>
                  <LinkButton
                    href="/contact-us"
                    colorScheme="blue"
                    size="sm"
                    variant="outline"
                  >
                    Contact Us
                  </LinkButton>
                </Card>
              </SimpleGrid>
            </Flex>
          </ModalBody>

          <ModalFooter as={Flex} gap={3}>
            <Button
              colorScheme="primary"
              onClick={() => {
                claimCredits(
                  { customPromoTypes: ["OP_GAS_SPONSOR"] },
                  {
                    onSuccess: () => {
                      onSuccess();
                      setPage("claimed");
                    },
                    onError: (error) => {
                      onError(error);
                    },
                  },
                );
              }}
              w="full"
            >
              Claim {isFreePlan ? "$250" : "$2500"} Credits
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader>
            Congratulations, you&apos;ve received OP Credits
          </ModalHeader>
            <ModalCloseButton
              onClick={() => {
                onClose();
                setPage("eligible");
              }}
            />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <Card as={Flex} alignItems="center" gap={2} flexDir="column">
                <Heading
                  color="bgBlack"
                  size="title.2xl"
                  fontWeight="extrabold"
                >
                  {isFreePlan ? "$250" : "$2500"}
                </Heading>
                <Text letterSpacing="wider" fontWeight="bold">
                  GAS CREDITS
                </Text>
                <Text textAlign="center" color="faded">
                  Claimed credits will expire in 90 days.
                </Text>
              </Card>
              <Accordion mt={8} allowMultiple rounded="xl">
                <AccordionItem borderColor="borderColor">
                  <Text fontSize="1rem">
                    <AccordionButton p={4} fontWeight="medium">
                      <Box as="span" flex="1" textAlign="left">
                        How to use my credits
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={6}>
                    <Flex direction="column" gap={4}>
                      <Text color="faded">
                        Credits will automatically be applied to cover gas fees
                        for any on-chain activity across thirdweb services.
                      </Text>
                      <Text color="faded">
                        Credits apply across all API keys. You can see how many
                        credits you have left at the top of the dashboard and{" "}
                        <Link href="/settings/billing" color="blue.500">
                          billing page
                        </Link>
                        .
                      </Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem borderColor="borderColor">
                  <Text fontSize="1rem">
                    <AccordionButton p={4} fontWeight="medium">
                      <Box as="span" flex="1" textAlign="left">
                        Eligible chains
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={6}>
                    <Flex direction="column" gap={4}>
                      <Text color="faded">Optimism, Base, Zora, Mode.</Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      )}
    </Modal>
  );
};
