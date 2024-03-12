import { AccountPlan, useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, FormLabel } from "tw-components";
import { PlanToCreditsRecord } from "./ApplyForOpCreditsModal";
import { ChakraNextImage } from "components/Image";
import { useLocalStorage } from "hooks/useLocalStorage";
import { Select as ChakraSelect } from "chakra-react-select";

interface FormSchema {
  firstname: string;
  lastname: string;
  thirdweb_account_id: string;
  plan_type: string;
  email: string;
  "0-2/name": string;
  "0-2/superchain_verticals": string;
  "0-2/superchain_chain": string;
  what_would_you_like_to_meet_about_: string;
}

interface ApplyForOpCreditsFormProps {
  onClose: () => void;
}

export const ApplyForOpCreditsForm: React.FC<ApplyForOpCreditsFormProps> = ({
  onClose,
}) => {
  const { data: account } = useAccount();
  const [, setHasAppliedForOpGrant] = useLocalStorage(
    `appliedForOpGrant-${account?.id}`,
    false,
  );
  const transformedQueryData = useMemo(
    () => ({
      firstname: "",
      lastname: "",
      thirdweb_account_id: account?.id || "",
      plan_type: PlanToCreditsRecord[account?.plan || AccountPlan.Free].title,
      email: account?.email || "",
      "0-2/name": "",
      "0-2/superchain_verticals": "",
      "0-2/superchain_chain": "",
      what_would_you_like_to_meet_about_: "",
    }),
    [account],
  );

  const form = useForm<FormSchema>({
    defaultValues: transformedQueryData,
    values: transformedQueryData,
  });

  const trackEvent = useTrack();

  const { onSuccess, onError } = useTxNotifications(
    "We have received your application and will notify you if you are selected.",
    "Something went wrong, please try again.",
  );

  return (
    <ModalContent
      as="form"
      onSubmit={form.handleSubmit(async (data) => {
        const fields = Object.keys(data).map((key) => ({
          name: key,
          value: (data as any)[key],
        }));

        trackEvent({
          category: "op-sponsorship",
          action: "apply",
          label: "attempt",
        });

        try {
          const response = await fetch("/api/apply-op-sponsorship", {
            method: "POST",
            body: JSON.stringify({ fields }),
          });

          if (!response.ok) {
            trackEvent({
              category: "op-sponsorship",
              action: "apply",
              label: "error",
              error: "form-submission-failed",
            });
            throw new Error("Form submission failed");
          }

          await response.json();

          trackEvent({
            category: "op-sponsorship",
            action: "apply",
            label: "success",
          });

          onSuccess();
          onClose();
          setHasAppliedForOpGrant(true);

          form.reset();
        } catch (error) {
          trackEvent({
            category: "op-sponsorship",
            action: "apply",
            label: "error",
            error: (error as Error).message,
          });
          onError(error);
        }
      })}
    >
      <ModalHeader textAlign="center">Gas Credits Application</ModalHeader>
      <ModalCloseButton
        onClick={() => {
          onClose();
        }}
      />
      <ModalBody as={Flex} flexDir="column" gap={4}>
        <ChakraNextImage
          src={require("public/assets/dashboard/op-sponsorship-form.png")}
          alt=""
          w="full"
        />
        <Flex gap={4}>
          <FormControl gap={6} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input {...form.register("firstname", { required: true })} />
          </FormControl>
          <FormControl gap={6} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input {...form.register("lastname", { required: true })} />
          </FormControl>
        </Flex>
        <FormControl gap={6} isRequired>
          <FormLabel>Company Name</FormLabel>
          <Input {...form.register("0-2/name", { required: true })} />
        </FormControl>
        <FormControl gap={6} isRequired>
          <FormLabel>Industry</FormLabel>
          <ChakraSelect
            options={[
              "DAOs",
              "Education & Community",
              "Fandom & Rewards",
              "Gaming & Metaverse",
              "Infra & Dev Tools",
              "NFTs",
              "Payments & Finance (DeFi)",
              "Security & Identity",
              "Social",
              "Other",
            ].map((vertical) => ({
              label: vertical,
              value: vertical === "Payments & Finance (DeFi)" ? "DeFi" : vertical,
            }))}
            placeholder="Select vertical"
            isRequired
            onChange={(value) => {
              if (value?.value) {
                form.setValue("0-2/superchain_verticals", value.value);
              }
            }}
          />
        </FormControl>
        <FormControl gap={6} isRequired>
          <FormLabel>Chain</FormLabel>
          <ChakraSelect
            options={["Optimism", "Base", "Zora", "Mode", "Frax"].map(
              (chain) => ({
                label: chain === "Optimism" ? "OP Mainnet" : chain,
                value: chain,
              }),
            )}
            onChange={(values) => {
              form.setValue(
                "0-2/superchain_chain",
                values.map(({ value }) => value).join(";"),
              );
            }}
            isMulti
            selectedOptionStyle="check"
            placeholder="Select chains"
            isRequired
          />
        </FormControl>
        <FormControl gap={6}>
          <FormLabel>Tell us more about your project</FormLabel>
          <Textarea
            {...form.register("what_would_you_like_to_meet_about_", {
              required: true,
            })}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button
          w="full"
          type="submit"
          colorScheme="primary"
          isDisabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Applying..." : "Apply now"}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
