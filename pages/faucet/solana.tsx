import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { CTA } from "components/faucet/CTA";
import FormComponent from "components/faucet/FormComponent";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Heading } from "tw-components";

const SolanaFaucet: NextPage = () => {
  return (
    <AppLayout>
      <NextSeo
        title="Solana faucet"
        description="Get Solana devnet tokens for free"
        openGraph={{
          title: "Solana faucet | thirdweb",
          url: `https://thirdweb.com/faucet/solana`,
        }}
      />
      <Flex flexDir="column" maxW="900px" w="full">
        <Heading color="#F2F2F7">Solana faucet</Heading>
        <Heading fontSize="20px" color="whiteAlpha.800" my="4">
          Get Solana devnet tokens for free
        </Heading>
        <FormComponent />
        <CTA />
      </Flex>
    </AppLayout>
  );
};

export default SolanaFaucet;
