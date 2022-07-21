import { useContractMetadata } from "@3rdweb-sdk/react";
import { useEdition } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { MintButton } from "components/contract-pages/action-buttons/MintButton";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { ContractItemsTable } from "components/contract-pages/table";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const EditionPage: NextPageWithLayout = function () {
  const editionAddress = useSingleQueryParam("edition");
  const contract = useEdition(editionAddress);
  const metadata = useContractMetadata(contract);
  return (
    <ContractLayout
      contract={contract}
      metadata={metadata}
      primaryAction={<MintButton colorScheme="primary" contract={contract} />}
      emptyState={{
        title:
          "You have not minted any NFTs yet, let's mint one to get you started!",
      }}
    >
      <ContractItemsTable
        contract={contract}
        emptyState={{
          title:
            "You have not minted any NFTs yet, let's mint one to get you started!",
        }}
      />
    </ContractLayout>
  );
};

EditionPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

EditionPage.trackingScope = "edition";

export default EditionPage;
