import {
  useConstructorParamsFromABI,
  useFunctionParamsFromABI,
} from "../hooks";
import {
  Code,
  Divider,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { getTemplateValuesForType } from "lib/deployment/template-values";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Button,
  Card,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
} from "tw-components";

interface ContractParamsFieldsetProps {
  deployParams:
    | ReturnType<typeof useFunctionParamsFromABI>
    | ReturnType<typeof useConstructorParamsFromABI>;
}

export const ContractParamsFieldset: React.FC<ContractParamsFieldsetProps> = ({
  deployParams,
}) => {
  const form = useFormContext();

  return (
    <Flex gap={16} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Heading size="title.lg">Contract Parameters</Heading>
        <Text fontStyle="normal">
          These are the parameters users will need to fill inwhen deploying this
          contract.
        </Text>
      </Flex>
      <Flex flexDir="column" gap={10}>
        {deployParams.map((param, idx) => {
          const paramTemplateValues = getTemplateValuesForType(param.type);
          return (
            <Flex flexDir="column" gap={6} key={`implementation_${param.name}`}>
              <Flex justify="space-between" align="center">
                <Heading size="title.sm">{param.name}</Heading>
                <Text size="body.sm">{param.type}</Text>
              </Flex>
              <Flex gap={6}>
                <Flex flexDir="column" gap={4} w="60%">
                  <FormControl isInvalid={!!form.formState.errors[param.name]}>
                    <FormLabel flex="1" as={Text}>
                      Display Name
                    </FormLabel>
                    <Input
                      {...form.register(
                        `constructorParams.${param.name}.displayName`,
                      )}
                      placeholder="Ex. Param 1"
                    />
                  </FormControl>
                  <FormControl isInvalid={!!form.formState.errors[param.name]}>
                    <FormLabel as={Text}>Default Value</FormLabel>

                    {paramTemplateValues.length > 0 && (
                      <InputGroup size="md">
                        <Input
                          {...form.register(
                            `constructorParams.${param.name}.defaultValue`,
                          )}
                          placeholder="This value will be pre-filled in the deploy form."
                        />
                        <InputRightElement width="10.5rem" mr={2}>
                          <Tooltip
                            bg="transparent"
                            boxShadow="none"
                            shouldWrapChildren
                            label={
                              <Card as={Flex} flexDir="column" gap={2}>
                                <Text fontWeight="bold">
                                  Supported template variable
                                </Text>
                                <Text>
                                  {paramTemplateValues[0].helperText} Click to
                                  apply.
                                </Text>
                              </Card>
                            }
                          >
                            <Button
                              variant="ghost"
                              border="1px solid"
                              borderColor="inputBg"
                              h="1.75rem"
                              size="sm"
                              onClick={() => {
                                form.setValue(
                                  `constructorParams.${param.name}.defaultValue`,
                                  paramTemplateValues[0].value,
                                );
                              }}
                            >
                              <Text>{paramTemplateValues[0].value}</Text>
                            </Button>
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                    )}
                  </FormControl>
                </Flex>
                <Flex flexDir="column" w="full">
                  <FormControl>
                    <FormLabel as={Text}>Description</FormLabel>
                    <Textarea
                      height="119px"
                      {...form.register(
                        `constructorParams.${param.name}.description`,
                      )}
                      h="full"
                      maxLength={400}
                      placeholder="Enter a description for this parameter."
                    />
                    <FormHelperText>
                      {form.watch(`constructorParams.${param.name}.description`)
                        ?.length ?? 0}
                      /400 characters
                    </FormHelperText>
                  </FormControl>
                </Flex>
              </Flex>
              {idx !== deployParams.length - 1 ? <Divider mt={8} /> : null}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
