import { Flex, Spinner } from "@chakra-ui/react";
import { DehydratedState } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import {
  SolanaProgramInfo,
  SolanaProgramInfoProvider,
} from "contexts/solana-program";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import { isPossibleSolanaAddress } from "lib/address-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { PageId } from "page-id";
import { ProgramMetadata } from "program-ui/common/program-metadata";
import { getSolNetworkFromNetworkPath } from "utils/solanaUtils";
import { ThirdwebNextPage } from "utils/types";

type SolanaProgramProps = {
  programInfo: SolanaProgramInfo;
  dehydratedState: DehydratedState;
};

const SolanaProgramPage: ThirdwebNextPage = (props: SolanaProgramProps) => {
  const { slug, programAddress } = props.programInfo;
  return (
    <>
      <ProgramMetadata address={programAddress} />
      <ContractTabRouter
        address={programAddress}
        ecosystem="solana"
        network={slug}
      />
    </>
  );
};

export default SolanaProgramPage;
SolanaProgramPage.pageId = PageId.DeployedProgram;
SolanaProgramPage.getLayout = (page, pageProps: SolanaProgramProps) => {
  // app layout has to come first in both getLayout and fallback
  return (
    <AppLayout
      layout={"custom-contract"}
      dehydratedState={{ mutations: [], queries: [] }}
    >
      <SolanaProgramInfoProvider value={pageProps.programInfo}>
        {page}
      </SolanaProgramInfoProvider>
    </AppLayout>
  );
};

// TODO better skeleton
// app layout has to come first in both getLayout and fallback
SolanaProgramPage.fallback = (
  <AppLayout layout={"custom-contract"}>
    <Flex h="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  </AppLayout>
);

// server side ---------------------------------------------------------------
export const getStaticProps: GetStaticProps<SolanaProgramProps> = (ctx) => {
  const [slug, programAddress] = ctx.params?.paths as string[];
  const solNetwork = getSolNetworkFromNetworkPath(slug);

  if (
    !programAddress ||
    !isPossibleSolanaAddress(programAddress) ||
    !solNetwork
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: { mutations: [], queries: [] },
      programInfo: {
        programAddress,
        network: solNetwork,
        slug,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: true,
    paths: [],
  };
};
