import {
  usePaymentsTestWebhook,
  PaymentsWebhooksTestInput,
  WebhookEvent,
  PaymentsWebhooksType,
} from "@3rdweb-sdk/react/hooks/usePayments";
import {
  Flex,
  Icon,
  Tooltip,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalOverlay,
  Select,
  Skeleton,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  CodeBlock,
  FormLabel,
  Heading,
  Card,
  Text,
} from "tw-components";
import { AiOutlineExperiment } from "@react-icons/all-files/ai/AiOutlineExperiment";
import { MdBlock } from "@react-icons/all-files/md/MdBlock";
import { MdCheck } from "@react-icons/all-files/md/MdCheck";

export interface PaymentsWebhooksTestButtonProps {
  accountId: string;
  isMainnets: boolean;
  webhooks: PaymentsWebhooksType[];
  isDisabled: boolean;
}

export const StatusTag = ({ status }: { status: number }) => {
  const isSuccess = status >= 200 && status < 300;
  return (
    <Tag
      colorScheme={isSuccess ? "green" : "red"}
      fontWeight="bold"
      w="fit-content"
    >
      <TagLeftIcon boxSize={4} as={isSuccess ? MdCheck : MdBlock} />
      <TagLabel>{status}</TagLabel>
    </Tag>
  );
};

export const PaymentsWebhooksTestButton: React.FC<
  PaymentsWebhooksTestButtonProps
> = ({ accountId, isMainnets, webhooks, isDisabled }) => {
  const { mutate: testWebhook, isLoading } = usePaymentsTestWebhook(accountId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const trackEvent = useTrack();
  const [data, setData] = useState<{
    status: number;
    responseBody: string;
  }>();

  const form = useForm<PaymentsWebhooksTestInput>({
    defaultValues: {
      webhookUrl: webhooks[0] ? webhooks[0].url : "",
      webhookEvent: Object.values(WebhookEvent)[0],
    },
  });

  const testTitle = `Test ${isMainnets ? "Mainnets" : "Testnets"} Webhook`;

  return (
    <>
      <Tooltip
        p={0}
        bg="transparent"
        boxShadow="none"
        label={
          isDisabled ? (
            <Card py={2} px={4} bgColor="backgroundHighlight">
              <Text>
                You need to create a {isMainnets ? "Mainnets" : "Testnets"}{" "}
                webhook first.
              </Text>
            </Card>
          ) : undefined
        }
        borderRadius="lg"
        placement="auto-end"
      >
        <Button
          onClick={onOpen}
          variant="ghost"
          size="sm"
          leftIcon={<Icon as={AiOutlineExperiment} boxSize={6} />}
          colorScheme="primary"
          w="fit-content"
          isDisabled={isDisabled}
        >
          Test Webhook
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={form.handleSubmit((input) => {
            trackEvent({
              category: "payments",
              action: "test-webhook",
              label: "attempt",
              accountId,
            });
            testWebhook(input, {
              onSuccess: (result) => {
                setData(result);
                trackEvent({
                  category: "payments",
                  action: "test-webhook",
                  label: "success",
                  accountId,
                });
              },
              onError: (error) => {
                trackEvent({
                  category: "payments",
                  action: "test-webhook",
                  label: "error",
                  accountId,
                  error,
                });
              },
            });
          })}
        >
          <ModalHeader>{testTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Flex flexDir="column" gap={4}>
              <FormControl isRequired>
                <FormLabel>Webhook Url</FormLabel>
                <Select {...form.register("webhookUrl", { required: true })}>
                  {webhooks.map((webhook) => (
                    <option key={webhook.url} value={webhook.url}>
                      {webhook.url}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Webhook Event</FormLabel>
                <Select {...form.register("webhookEvent", { required: true })}>
                  {Object.values(WebhookEvent).map((event) => (
                    <option key={event}>{event}</option>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="primary">
                Send Webhook Event
              </Button>
              {isLoading || !!data ? (
                <Stack>
                  <Heading size="label.sm">Response Status</Heading>
                  <Skeleton isLoaded={!isLoading}>
                    <StatusTag status={data?.status || 200} />
                  </Skeleton>
                  <Heading size="label.sm">Response Body</Heading>
                  <Skeleton
                    isLoaded={!!data?.responseBody}
                    w="full"
                    borderRadius="md"
                  >
                    <CodeBlock code={data?.responseBody || ""} />
                  </Skeleton>
                </Stack>
              ) : null}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
