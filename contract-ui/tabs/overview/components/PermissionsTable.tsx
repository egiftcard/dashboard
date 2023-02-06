import { extensionDetectedState } from "../../../../components/buttons/ExtensionDetectButton";
import { ROLE_DESCRIPTION_MAP } from "../../../../constants/mappings";
import { useActivity } from "@3rdweb-sdk/react/hooks/useActivity";
import {
  Box,
  Center,
  Flex,
  Icon,
  List,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useAllRoleMembers } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import type { ContractEvent } from "@thirdweb-dev/sdk/evm";
import { Role } from "@thirdweb-dev/sdk/evm";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FiCopy } from "react-icons/fi";
import {
  Button,
  Card,
  Heading,
  Text,
  TrackedLink,
  TrackedLinkProps,
} from "tw-components";

interface ContractTransaction {
  transactionHash: ContractEvent["transaction"]["transactionHash"];
  blockNumber: ContractEvent["transaction"]["blockNumber"];
  events: ContractEvent[];
}

interface PermissionsTableProps {
  contract: SmartContract;
  trackingCategory: TrackedLinkProps["category"];
}

export const PermissionsTable: React.FC<PermissionsTableProps> = ({
  contract,
  trackingCategory,
}) => {
  const [autoUpdate] = useState(true);
  const allRoleMembers = useAllRoleMembers(contract);

  const roles = useMemo(
    () => Object.keys(allRoleMembers.data || ROLE_DESCRIPTION_MAP),
    [allRoleMembers.data, contract],
  );

  return (
    <Flex gap={6} flexDirection="column">
      <Flex align="center" justify="space-between" w="full">
        <Heading flexShrink={0} size="title.sm">
          Permissions
        </Heading>
        <TrackedLink
          category={trackingCategory}
          label="view_all_permissions"
          color="blue.600"
          gap={4}
          href="/permissions"
        >
          View all permissions -&gt;
        </TrackedLink>
      </Flex>
      {contract && (
        <Card p={0} overflow="hidden">
          <SimpleGrid
            gap={2}
            columns={9}
            borderBottomWidth="1px"
            borderColor="borderColor"
            padding={4}
            bg="blackAlpha.50"
            _dark={{ bg: "whiteAlpha.50" }}
          >
            <Heading gridColumn="span 4" size="label.md">
              Transaction Hash
            </Heading>
            <Heading gridColumn="span 5" size="label.md">
              Events
            </Heading>
          </SimpleGrid>

          <List overflow="auto">
            {/* {allRoleMembers.data === 0 && (*/}
            {/*  <Center py={4}>*/}
            {/*    <Flex align="center" gap={2}>*/}
            {/*      {autoUpdate && <Spinner size="sm" speed="0.69s" />}*/}
            {/*      <Text size="body.md" fontStyle="italic">*/}
            {/*        {autoUpdate ? "listening for events" : "no events to show"}*/}
            {/*      </Text>*/}
            {/*    </Flex>*/}
            {/*  </Center>*/}
            {/* )}*/}
            {/* <AnimatePresence initial={false}>*/}
            {/*  {allRoleMembers?.slice(0, 3).map((e) => (*/}
            {/*    <EventsFeedItem key={e.transactionHash} transaction={e} />*/}
            {/*  ))}*/}
            {/* </AnimatePresence>*/}
          </List>
        </Card>
      )}
    </Flex>
  );
};

interface EventsFeedItemProps {
  transaction: ContractTransaction;
}

export const EventsFeedItem: React.FC<EventsFeedItemProps> = ({
  transaction,
}) => {
  const toast = useToast();
  const { onCopy, setValue } = useClipboard(transaction.transactionHash);

  useEffect(() => {
    if (transaction.transactionHash) {
      setValue(transaction.transactionHash);
    }
  }, [transaction.transactionHash, setValue]);

  return (
    <Box>
      <SimpleGrid
        columns={9}
        gap={2}
        as={motion.li}
        initial={{
          y: -30,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          height: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          height: "auto",
          paddingTop: "var(--chakra-space-3)",
          paddingBottom: "var(--chakra-space-3)",
          transition: { duration: 0.15 },
        }}
        exit={{
          y: 30,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          height: 0,
          transition: { duration: 0.3 },
        }}
        willChange="opacity, height, paddingTop, paddingBottom"
        borderBottomWidth="1px"
        borderColor="borderColor"
        padding={4}
        overflow="hidden"
        alignItems="center"
        _last={{ borderBottomWidth: 0 }}
      >
        <Box gridColumn="span 3">
          <Stack direction="row" align="center" spacing={3}>
            <Tooltip
              p={0}
              bg="transparent"
              boxShadow="none"
              label={
                <Card py={2} px={4}>
                  <Text size="label.sm">
                    Copy transaction hash to clipboard
                  </Text>
                </Card>
              }
            >
              <Button
                size="sm"
                bg="transparent"
                onClick={() => {
                  onCopy();
                  toast({
                    variant: "solid",
                    position: "bottom",
                    title: "Transaction hash copied.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                <Icon as={FiCopy} boxSize={3} />
              </Button>
            </Tooltip>
            <Text fontFamily="mono" noOfLines={1}>
              {transaction.transactionHash.slice(0, 32)}...
            </Text>
          </Stack>
        </Box>

        <Box gridColumn="span 1" />

        <Flex gridColumn="span 5" flexWrap="wrap" gap={2}>
          {transaction.events.slice(0, 2).map((e, idx) => (
            <Tag key={idx}>
              <Text size="body.md" fontWeight="medium">
                {e.eventName}
              </Text>
            </Tag>
          ))}
          {transaction.events.length > 2 && (
            <Tag
              border="2px solid"
              borderColor="var(--badge-bg)"
              bg="transparent"
            >
              <Text size="body.md" fontWeight="medium">
                + {transaction.events.length - 2}
              </Text>
            </Tag>
          )}
        </Flex>
      </SimpleGrid>
    </Box>
  );
};
