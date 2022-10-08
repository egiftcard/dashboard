import { Flex } from "@chakra-ui/react";
import { Text } from "tw-components";

export const Sponsors: React.FC = () => {
  return (
    <Flex w="full" flexDir="column" align="center" justify="center">
      <Text>OUR SPONSORS</Text>
      <Flex w="full" justify="space-between" align="center" mt={4} px={20}>
        <Text fontSize="32px">Sponsor A</Text>
        <Text fontSize="32px">Sponsor B</Text>
        <Text fontSize="32px">Sponsor C</Text>
        <Text fontSize="32px">Sponsor D</Text>
        <Text fontSize="32px">Sponsor E</Text>
      </Flex>
    </Flex>
  );
};
