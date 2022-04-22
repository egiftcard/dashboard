import { detectErc721Instance, useResolvedContract } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";

const NFTGetAll = dynamic(() => import("./nft/get-all"));

interface CustomContractOverviewPageProps {
  contractAddress?: string;
}

export const CustomContractOverviewPage: React.VFC<
  CustomContractOverviewPageProps
> = ({ contractAddress }) => {
  const contractQuery = useResolvedContract(contractAddress);

  if (!contractQuery || contractQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  const nftContract = detectErc721Instance(contractQuery?.contract);

  if (nftContract) {
    // nft overview page
    if (nftContract.query?.all) {
      return <NFTGetAll contract={nftContract} />;
    }
  }
  return <div>contract overview page: {contractAddress}</div>;
};
