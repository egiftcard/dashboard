import { Flex, FormControl } from "@chakra-ui/react";
import { getTrustedForwarders } from "@thirdweb-dev/sdk";
import { SolidityInput } from "contract-ui/components/solidity-inputs";

import { UseFormReturn } from "react-hook-form";
import {
  Button,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import { useDefaultForwarders } from "../hooks";

interface TrustedForwardersFieldsetProps {
  form: UseFormReturn<any, any>;
  forwarders: ReturnType<typeof useDefaultForwarders>;
}

export const TrustedForwardersFieldset: React.FC<
  TrustedForwardersFieldsetProps
> = ({ form, forwarders }) => {
  return (
    <Flex pb={4} direction="column" gap={2}>
      <Heading size="label.lg">Trusted Forwarders</Heading>

      <Text size="body.md" fontStyle="italic">
        Trusted forwarder addresses to enable ERC-2771 transactions, i.e.
        gasless settings.
      </Text>
      <Flex gap={4} direction={{ base: "column", md: "row" }}></Flex>
      <FormControl
        isRequired
        isInvalid={
          !!form.getFieldState(
            `deployParams._trustedForwarders`,
            form.formState,
          ).error
        }
      >
        <SolidityInput
          defaultValue={form.watch(`deployParams._trustedForwarders`)}
          solidityType="address[]"
          {...form.register(`deployParams._trustedForwarders`)}
        />
        <Button
          type="button"
          size="sm"
          colorScheme="gray"
          borderRadius="md"
          onClick={() =>
            form.setValue("deployParams._trustedForwarders", forwarders)
          }
        >
          Get default
        </Button>

        <FormErrorMessage>
          {
            form.getFieldState(
              `deployParams._trustedForwarders`,
              form.formState,
            ).error?.message
          }
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
