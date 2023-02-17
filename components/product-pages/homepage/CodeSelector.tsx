import { CodeOptionButton, CodeOptions } from "../common/CodeOptionButton";
import { Flex, Icon } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useRouter } from "next/router";
import darkTheme from "prism-react-renderer/themes/dracula";
import { useState } from "react";
import { AiOutlineCode } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { Card, CodeBlock, LinkButton, LinkButtonProps } from "tw-components";

const landingSnippets = {
  cli: ``,
  javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// initialize the SDK
const sdk = new ThirdwebSDK("mumbai");

// connect to your smart contract
const contract = await sdk.getContract("0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c");

// get all NFTs
const nfts = await contract.erc721.getAll();

console.info(nfts);`,
  react: `import { ThirdwebNftMedia, useContract, useNFTs } from "@thirdweb-dev/react";

export default function App() {
  // Connect to your smart contract
  const { contract } = useContract("0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c");

  // Get all NFTs
  const nfts = useNFTs(contract);

  // Render NFTs
  return (nfts.data || []).map((nft) => (
    <ThirdwebNftMedia key={nft.metadata.id.toString()} metadata={nft.metadata} />
  ));
}`,
  python: `from thirdweb import ThirdwebSDK
from pprint import pprint

sdk = ThirdwebSDK("mumbai")

nftCollection = sdk.get_nft_drop("0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c")

nfts = nftCollection.get_all()
pprint(nfts)`,
  go: `package main

import (
  "context"
  "encoding/json"
  "fmt"
  "github.com/thirdweb-dev/go-sdk/v2/thirdweb"
)

func main() {
  sdk, _ := thirdweb.NewThirdwebSDK("mumbai", nil)

  // Add your NFT Drop contract address here
  address := "0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c"
  nft, _ := sdk.GetNFTDrop(address)

  // Now you can use any of the read-only SDK contract functions
  nfts, _ := nft.GetAll(context.Background())

  b, _ := json.MarshalIndent(nfts, "", "  ")
  fmt.Printf(string(b))
}`,
  unity: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Thirdweb;

public class Example : MonoBehaviour {
  void Start() {
    ThirdwebSDK sdk = new ThirdwebSDK("goerli");
    string address = "0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e";
    NFTCollection nft = sdk.GetContract(address);
    List<NFT> nfts = await contract.ERC721.GetAll()
  }
}`,
};

const authSnippets = {
  cli: ``,
  javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("goerli");

// Login with a single line of code
const payload = await sdk.auth.login();

// And verify the address of the logged in wallet
const address = await sdk.auth.verify(payload);`,
  react: `import { useSDK } from "@thirdweb-dev/react";

export default function App() {
 const sdk = useSDK();

 async function login() {
  // Login with a single line of code
  const payload = await sdk.auth.login();

  // And verify the address of the logged in wallet
  const address = await sdk.auth.verify(payload);
 }
}`,
  python: `from thirdweb import ThirdwebSDK

sdk = ThirdwebSDK("goerli")

# Login with a single line of code
payload = sdk.auth.login();

# And verify the address of the logged in wallet
address = sdk.auth.verify(payload);`,
  go: `import "github.com/thirdweb-dev/go-sdk/thirdweb"

func main() {
  sdk, err := thirdweb.NewThirdwebSDK("goerli", nil)

  // Login with a single line of code
  payload, err := sdk.Auth.Login()

  // And verify the address of the logged in wallet
  address, err := sdk.Auth.Verify(payload)
}`,
  unity: ``,
};

const storageSnippets = {
  cli: `// You can upload individual files
npx thirdweb upload ./path/to/file.jpg

// Or you can upload a folder
npx thirdweb upload ./path/to/folder`,
  javascript: `import { ThirdwebStorage } from "@thirdweb-dev/storage";

// First, instantiate the SDK
const storage = new ThirdwebStorage();

// Here we get the IPFS URI of where our metadata has been uploaded
const uri = await storage.upload(metadata);
// This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
console.log(uri);

// Here we a URL with a gateway that we can look at in the browser
const url = await storage.resolveScheme(uri);
// This will log a URL like https://gateway.ipfscdn.io/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
console.log(url);

// You can also download the data from the uri
const data = await storage.downloadJSON(uri);`,
  react: `// Upload files to IPFS
import { useStorageUpload } from "@thirdweb-dev/react";

function App() {
  const { mutateAsync: upload } = useStorageUpload();

  const uploadData = () => {
    // Get any data that you want to upload
    const dataToUpload = [...];

    // And upload the data with the upload function
    const uris = await upload({ data: dataToUpload });
  }
  ...
}

// Render files from IPFS
import { MediaRenderer } from "@thirdweb-dev/react";

function App() {
  return (
    <MediaRenderer
      src="ipfs://QmamvVM5kvsYjQJYs7x8LXKYGFkwtGvuRvqZsuzvpHmQq9/0"
    />
  )
}`,
  python: ``,
  go: ``,
  unity: ``,
};

export interface CodeSelectorProps {
  defaultLanguage?: CodeOptions;
  snippets?: "landing" | "auth" | "storage";
  docs?: string;
}

export const CodeSelector: React.FC<CodeSelectorProps> = ({
  defaultLanguage = "javascript",
  snippets = "landing",
  docs = "https://portal.thirdweb.com/",
}) => {
  const { asPath } = useRouter();

  const [activeLanguage, setActiveLanguage] =
    useState<CodeOptions>(defaultLanguage);
  const trackEvent = useTrack();

  const actualSnippets =
    snippets === "landing"
      ? landingSnippets
      : snippets === "storage"
      ? storageSnippets
      : authSnippets;

  return (
    <>
      <Flex
        background="rgba(0,0,0,0.4)"
        boxShadow="0 0 1px 1px hsl(0deg 0% 100% / 15%)"
        justify={"center"}
        margin="0 auto"
        transform={{ base: "translateY(20px)", md: "translateY(50%)" }}
        zIndex={100}
        backdropFilter={"blur(10px)"}
        borderRadius={"8px"}
        padding="2px"
        gap={"2px"}
        maxW="calc(100% - 60px)"
        flexWrap="wrap"
      >
        {Object.keys(actualSnippets).map((key) =>
          actualSnippets[key as keyof typeof actualSnippets] ? (
            <CodeOptionButton
              key={key}
              setActiveLanguage={setActiveLanguage}
              activeLanguage={activeLanguage}
              language={key as CodeOptions}
              textTransform="capitalize"
            >
              {key === "javascript"
                ? "JavaScript"
                : key === "cli"
                ? "CLI"
                : key}
            </CodeOptionButton>
          ) : null,
        )}
      </Flex>

      <Card
        w={{
          base: "full",
          md: asPath === "/dashboard/storage" ? "inherit" : "69%",
        }}
        p={0}
        background="rgba(0,0,0,0.4)"
        boxShadow="0 0 1px 1px hsl(0deg 0% 100% / 15%)"
        position="relative"
        border="none"
      >
        <CodeBlock
          darkTheme={darkTheme}
          color="white"
          fontSize={{ base: "12px", md: "14px" }}
          borderWidth={0}
          w="full"
          py={6}
          pb={{ base: 12, md: 6 }}
          code={actualSnippets[activeLanguage]}
          language={
            activeLanguage === "react" || activeLanguage === "cli"
              ? "jsx"
              : activeLanguage === "unity"
              ? "cpp"
              : activeLanguage
          }
          backgroundColor={
            asPath === "/dashboard/storage" ? undefined : "transparent"
          }
          mt={4}
        />

        {/* Links for Replit and Docs  */}
        <Flex justify="end" gap={6} position="absolute" bottom={0} right={2}>
          <CustomLinkButton
            px={4}
            text="Docs"
            href={docs}
            icon={<Icon color={"white"} as={CgFileDocument} />}
            onClick={() =>
              trackEvent({
                category: "code-selector",
                action: "click",
                label: "try-it",
              })
            }
          />

          {snippets === "landing" && (
            <CustomLinkButton
              text="Run"
              href={`https://replit.com/@thirdweb/${activeLanguage}-sdk`}
              icon={<Icon color={"white"} as={AiOutlineCode} />}
              onClick={() =>
                trackEvent({
                  category: "code-selector",
                  action: "click",
                  label: "documentation",
                })
              }
            />
          )}
        </Flex>
      </Card>
    </>
  );
};

interface CustomLinkButtonProps extends LinkButtonProps {
  onClick: () => void;
  text: string;
  href: string;
  icon: React.ReactElement;
}

const CustomLinkButton: React.FC<CustomLinkButtonProps> = ({
  onClick,
  href,
  icon,
  text,
  ...linkButtonProps
}) => {
  return (
    <LinkButton
      href={href}
      isExternal
      leftIcon={icon}
      bg="transparent"
      noIcon
      padding={0}
      fontWeight={400}
      fontSize="14px"
      borderRadius={"10px"}
      fontFamily={"mono"}
      color={"white"}
      _hover={{
        bg: "trnasparent",
      }}
      onClick={onClick}
      {...linkButtonProps}
    >
      {text}
    </LinkButton>
  );
};
