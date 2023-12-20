import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";
import { Transaction } from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Flex,
  FormControl,
  IconButton,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Textarea,
  Tooltip,
  UseDisclosureReturn,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ChainIcon } from "components/icons/ChainIcon";
import { TWTable } from "components/shared/TWTable";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useAllChainsData } from "hooks/chains/allChains";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRef, useState } from "react";
import { FiInfo, FiTrash } from "react-icons/fi";
import {
  Card,
  Button,
  Drawer,
  FormLabel,
  LinkButton,
  Text,
  Badge,
} from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isFetched: boolean;
  instanceUrl: string;
}

type EngineStatus =
  | "errored"
  | "mined"
  | "cancelled"
  | "sent"
  | "retried"
  | "processed"
  | "queued"
  | "user-op-sent";
const statusDetails: Record<
  EngineStatus,
  {
    name: string;
    colorScheme: string;
    showTooltipIcon?: boolean;
  }
> = {
  processed: {
    name: "Processed",
    colorScheme: "yellow",
  },
  queued: {
    name: "Queued",
    colorScheme: "yellow",
  },
  sent: {
    name: "Sent",
    colorScheme: "yellow",
  },
  "user-op-sent": {
    name: "User Op Sent",
    colorScheme: "yellow",
  },
  mined: {
    name: "Mined",
    colorScheme: "green",
    showTooltipIcon: true,
  },
  retried: {
    name: "Retried",
    colorScheme: "green",
    showTooltipIcon: true,
  },
  errored: {
    name: "Failed",
    colorScheme: "red",
    showTooltipIcon: true,
  },
  cancelled: {
    name: "Cancelled",
    colorScheme: "red",
  },
};

const columnHelper = createColumnHelper<Transaction>();

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  isLoading,
  isFetched,
  instanceUrl,
}) => {
  const { chainIdToChainRecord } = useAllChainsData();
  const transactionDisclosure = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const columns = [
    columnHelper.accessor("chainId", {
      header: "Chain",
      cell: (cell) => {
        const chainId = cell.getValue();
        if (!chainId) {
          return;
        }

        const chain = chainIdToChainRecord[parseInt(chainId)];
        if (chain) {
          return (
            <Flex align="center" gap={2}>
              <ChainIcon size={12} ipfsSrc={chain?.icon?.url} />
              <Text>{chain.name}</Text>
            </Flex>
          );
        }
      },
    }),
    columnHelper.accessor("queueId", {
      header: "Queue ID",
      cell: (cell) => {
        return (
          <AddressCopyButton
            address={cell.getValue() ?? ""}
            title="queue ID"
            size="xs"
          />
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (cell) => {
        const transaction = cell.row.original;
        const { errorMessage, minedAt } = transaction;
        const status = (transaction.status as EngineStatus) ?? null;
        if (!status) {
          return null;
        }

        const showCancelTransactionButton = [
          "processed",
          "queued",
          "sent",
        ].includes(status);

        const shouldShowTooltip =
          status === "errored" || (status === "mined" && minedAt);

        return (
          <Flex align="center" gap={1}>
            <Tooltip
              borderRadius="md"
              bg="transparent"
              boxShadow="none"
              maxW={{ md: "450px" }}
              label={
                shouldShowTooltip ? (
                  <Card bgColor="backgroundHighlight">
                    <Text>
                      {status === "errored"
                        ? errorMessage
                        : (status === "mined" || status === "retried") &&
                          minedAt
                        ? `Completed ${format(new Date(minedAt), "PP pp")}`
                        : undefined}
                    </Text>
                  </Card>
                ) : null
              }
            >
              <Badge
                borderRadius="full"
                size="label.sm"
                variant="subtle"
                px={3}
                py={1.5}
                colorScheme={statusDetails[status].colorScheme}
              >
                <Flex gap={1} align="center">
                  {statusDetails[status].name}
                  {statusDetails[status].showTooltipIcon && <FiInfo />}
                </Flex>
              </Badge>
            </Tooltip>
            {showCancelTransactionButton && (
              <CancelTransactionButton
                transaction={transaction}
                instanceUrl={instanceUrl}
              />
            )}
          </Flex>
        );
      },
    }),
    columnHelper.accessor("fromAddress", {
      header: "Backend Wallet",
      cell: (cell) => {
        return <AddressCopyButton size="xs" address={cell.getValue() ?? ""} />;
      },
    }),
    columnHelper.accessor("functionName", {
      header: "Function",
      cell: (cell) => {
        const { functionName, extension } = cell.row.original;
        const functionDisplay =
          extension === "none" ? functionName : `${extension} ${functionName}`;

        return (
          <Tooltip
            borderRadius="md"
            bg="transparent"
            boxShadow="none"
            label={
              <Card bgColor="backgroundHighlight">
                <Text>{functionDisplay}</Text>
              </Card>
            }
            shouldWrapChildren
          >
            <Text fontFamily="mono" isTruncated maxW={150}>
              {functionDisplay}
            </Text>
          </Tooltip>
        );
      },
    }),
    columnHelper.accessor("transactionHash", {
      header: "Transaction Hash",
      cell: (cell) => {
        const { chainId, transactionHash } = cell.row.original;
        if (!chainId || !transactionHash) {
          return;
        }

        const chain = chainIdToChainRecord[parseInt(chainId)];
        if (chain) {
          const explorer = chain.explorers?.[0];
          if (!explorer) {
            return (
              <AddressCopyButton
                address={transactionHash}
                title="transaction hash"
              />
            );
          }

          return (
            <LinkButton
              key={explorer.name}
              variant="ghost"
              isExternal
              size="xs"
              href={`${explorer.url}/tx/${transactionHash}`}
            >
              <Text fontFamily="mono" maxW="100px" isTruncated>
                {transactionHash}
              </Text>
            </LinkButton>
          );
        }
      },
    }),
    columnHelper.accessor("queuedAt", {
      header: "Queued",
      cell: (cell) => {
        const value = cell.getValue();
        if (!value) {
          return;
        }

        const date = new Date(value);
        return (
          <Tooltip
            borderRadius="md"
            bg="transparent"
            boxShadow="none"
            label={
              <Card bgColor="backgroundHighlight">
                <Text>{format(date, "PP pp z")}</Text>
              </Card>
            }
            shouldWrapChildren
          >
            <Text>{formatDistanceToNowStrict(date, { addSuffix: true })}</Text>
          </Tooltip>
        );
      },
    }),
  ];

  return (
    <>
      <TWTable
        title="transactions"
        data={transactions}
        columns={columns}
        isLoading={isLoading}
        isFetched={isFetched}
        onRowClick={(row) => {
          setSelectedTransaction(row);
          transactionDisclosure.onOpen();
        }}
      />

      {transactionDisclosure.isOpen && selectedTransaction && (
        <TransactionDetailsDrawer
          transaction={selectedTransaction}
          disclosure={transactionDisclosure}
          instanceUrl={instanceUrl}
        />
      )}
    </>
  );
};

const CancelTransactionButton = ({
  transaction,
  instanceUrl,
}: {
  transaction: Transaction;
  instanceUrl: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useApiAuthToken();
  const { onSuccess, onError } = useTxNotifications(
    "Successfully sent a request to cancel the transaction",
    "Failed to cancel transaction",
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onClickContinue = async () => {
    try {
      const resp = await fetch(`${instanceUrl}transaction/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
          "x-backend-wallet-address": transaction.fromAddress ?? "",
        },
        body: JSON.stringify({ queueId: transaction.queueId }),
      });
      if (!resp.ok) {
        const json = await resp.json();
        throw json.error?.message;
      }
      onSuccess();
    } catch (e) {
      console.error("Cancelling transaction:", e);
      onError(e);
    }

    onClose();
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={closeButtonRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Cancel Transaction</DrawerHeader>
          <DrawerBody>
            <Stack gap={4}>
              <Text>Are you sure you want to cancel this transaction?</Text>
              <FormControl>
                <FormLabel>Queue ID</FormLabel>
                <Text fontFamily="mono">{transaction.queueId}</Text>
              </FormControl>
              <FormControl>
                <FormLabel>Submitted at</FormLabel>
                <Text>
                  {format(new Date(transaction.queuedAt ?? ""), "PP pp z")}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel>From</FormLabel>
                <AddressCopyButton
                  address={transaction.fromAddress ?? ""}
                  size="xs"
                  shortenAddress={false}
                />
              </FormControl>
              <FormControl>
                <FormLabel>To</FormLabel>
                <AddressCopyButton
                  address={transaction.toAddress ?? ""}
                  size="xs"
                  shortenAddress={false}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Function</FormLabel>
                <Text fontFamily="mono">{transaction.functionName}</Text>
              </FormControl>

              <Text>
                If this transaction is already submitted, it may complete before
                the cancellation is submitted.
              </Text>
            </Stack>
          </DrawerBody>

          <DrawerFooter as={Flex} gap={3}>
            <Button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              variant="ghost"
            >
              Close
            </Button>
            <Button type="submit" colorScheme="red" onClick={onClickContinue}>
              Cancel transaction
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Tooltip
        borderRadius="md"
        bg="transparent"
        boxShadow="none"
        label={
          <Card bgColor="backgroundHighlight">
            <Text>Cancel transaction</Text>
          </Card>
        }
      >
        <IconButton
          aria-label="Cancel transaction"
          icon={<FiTrash />}
          colorScheme="red"
          variant="ghost"
          size="xs"
          onClick={onOpen}
        />
      </Tooltip>
    </>
  );
};

const TransactionDetailsDrawer = ({
  transaction,
  disclosure,
  instanceUrl,
}: {
  transaction: Transaction;
  disclosure: UseDisclosureReturn;
  instanceUrl: string;
}) => {
  const { chainIdToChainRecord } = useAllChainsData();

  if (!transaction.chainId) {
    return null;
  }

  const chain = chainIdToChainRecord[parseInt(transaction.chainId)];
  const explorer = chain.explorers?.[0];

  const status = statusDetails[transaction.status];

  return (
    <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Transaction Details</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Queue ID</FormLabel>
              <Text>{transaction.queueId}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Badge
                borderRadius="full"
                size="label.sm"
                variant="subtle"
                px={3}
                py={1.5}
                colorScheme={status.colorScheme}
                w="fit-content"
              >
                <Flex gap={1} align="center">
                  {status.name}
                </Flex>
              </Badge>
            </FormControl>

            <FormControl>
              <FormLabel>Chain</FormLabel>
              <Flex align="center" gap={2}>
                <ChainIcon size={12} ipfsSrc={chain?.icon?.url} />
                <Text>{chain?.name}</Text>
              </Flex>
            </FormControl>

            {transaction.queuedAt && (
              <FormControl>
                <FormLabel>Queued At</FormLabel>
                <Text>
                  {new Date(transaction.queuedAt).toLocaleString(undefined, {
                    timeZoneName: "short",
                  })}
                </Text>
              </FormControl>
            )}

            {transaction.minedAt && (
              <FormControl>
                <FormLabel>Mined At</FormLabel>
                <Text>
                  {new Date(transaction.minedAt).toLocaleString(undefined, {
                    timeZoneName: "short",
                  })}
                </Text>
              </FormControl>
            )}

            <Divider />

            <FormControl>
              <FormLabel>From Address</FormLabel>
              <LinkButton
                variant="ghost"
                isExternal
                size="xs"
                href={
                  explorer
                    ? `${explorer.url}/address/${transaction.fromAddress}`
                    : "#"
                }
              >
                <Text fontFamily="mono">{transaction.fromAddress}</Text>
              </LinkButton>
            </FormControl>

            <FormControl>
              <FormLabel>To Address</FormLabel>
              <LinkButton
                variant="ghost"
                isExternal
                size="xs"
                href={
                  explorer
                    ? `${explorer.url}/address/${transaction.toAddress}`
                    : "#"
                }
              >
                <Text fontFamily="mono">{transaction.toAddress}</Text>
              </LinkButton>
            </FormControl>

            {transaction.transactionHash && (
              <FormControl>
                <FormLabel>Transaction Hash</FormLabel>
                <LinkButton
                  variant="ghost"
                  isExternal
                  size="xs"
                  href={
                    explorer
                      ? `${explorer.url}/tx/${transaction.transactionHash}`
                      : "#"
                  }
                  maxW="100%"
                >
                  <Text fontFamily="mono" isTruncated>
                    {transaction.transactionHash}
                  </Text>
                </LinkButton>
              </FormControl>
            )}

            <FormControl>
              <FormLabel>Error Message</FormLabel>
              <Textarea fontFamily="mono" fontSize="x-small" rows={8}>
                {transaction.errorMessage}
              </Textarea>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={disclosure.onClose} colorScheme="blue">
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
