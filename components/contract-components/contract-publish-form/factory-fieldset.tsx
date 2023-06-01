import { AutoFactory } from "./auto-factory";
import { CustomFactory } from "./custom-factory";
import { ButtonGroup, Flex } from "@chakra-ui/react";
import { Abi } from "@thirdweb-dev/sdk";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Heading } from "tw-components";

interface FactoryFieldsetProps {
  abi: Abi;
  setCustomFactoryAbi: Dispatch<SetStateAction<Abi>>;
}

export const FactoryFieldset: React.FC<FactoryFieldsetProps> = ({
  abi,
  setCustomFactoryAbi,
}) => {
  const form = useFormContext();

  return (
    <Flex gap={12} direction="column" as="fieldset">
      <Flex gap={6} direction="column">
        <Heading size="title.lg">Factory deploy settings</Heading>
        <ButtonGroup size="sm" variant="ghost" spacing={{ base: 0.5, md: 2 }}>
          <Button
            type="button"
            isActive={form.watch("deployType") === "autoFactory"}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
            onClick={() => form.setValue("deployType", "autoFactory")}
          >
            Auto Factory (Proxy Contracts)
          </Button>
          <Button
            type="button"
            isActive={form.watch("deployType") === "customFactory"}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
            onClick={() => form.setValue("deployType", "customFactory")}
          >
            Custom Factory (Advanced)
          </Button>
        </ButtonGroup>
        {form.watch("deployType") === "autoFactory" && (
          <AutoFactory abi={abi} />
        )}
        {form.watch("deployType") === "customFactory" && (
          <CustomFactory setCustomFactoryAbi={setCustomFactoryAbi} />
        )}
      </Flex>
    </Flex>
  );
};
