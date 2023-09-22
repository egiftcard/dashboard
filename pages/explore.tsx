import { Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingLayout } from "components/landing-pages/layout";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Card } from "tw-components";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingGuidesShowcase } from "components/landing-pages/guide-showcase";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingSectionHeading } from "components/landing-pages/section-heading";

const TRACKING_CATEGORY = "explore-landing";

const GUIDES = [
  {
    title: "Build a Web3 Customer Loyalty Program (Loyalty Card)",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/09/Build-a-Loyalty-Program-using-the-Loyalty-Card-Contract--1-.png",
    link: "https://blog.thirdweb.com/guides/loyalty-card-contract/",
  },
  {
    title: "Build an NFT Subscription App (Unlock Protocol Membership)",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/03/Create-a-subscription-using-Unlock-2.png",
    link: "https://blog.thirdweb.com/guides/build-a-subscription-with-unlock/",
  },
  {
    title: "Build a Gas-Optimized NFT Drop (ERC721A)",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/08/thumbnail-19.png",
    link: "https://blog.thirdweb.com/guides/get-started-with-the-contracts-sdk/",
  },
];

const ExploreLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "The Front Page for Smart Contracts",
        description:
          "Browse smart contracts from the world's best engineers & protocols, for every use case — and deploy them to any EVM chain with thirdweb Explore.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/explore.png`,
              width: 1200,
              height: 630,
              alt: "The Front Page for Smart Contracts",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <LandingHeroWithSideImage
          miniTitle="Explore"
          title="Any smart contract you need"
          titleWithGradient="in one library"
          subtitle="Browse smart contracts from the world's best engineers & protocols, for every use case — and deploy them to any EVM chain."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/explore"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          image={require("public/assets/product-pages/smart-wallet/desktop-hero.png")}
          mobileImage={require("public/assets/product-pages/smart-wallet/mobile-hero.png")}
        />

        <LandingGridSection title={<></>}>
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-1.png")}
            title="Discover your next idea"
            description="Browse our extensive collection of the most popular and unique smart contracts being built with today. Uncover cutting-edge Web3 use-cases before anyone else."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.svg")}
            title="Accelerate development"
            description="Easily deploy any contract to any EVM chain with a single click. No need for private keys or scripts. Start building instantly by unlocking our full product suite."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-7.png")}
            title="Cheaper to deploy"
            description="thirdweb is up to 10x cheaper to deploy new contracts, when leveraging proxy contracts."
          />
        </LandingGridSection>
        <LandingGridSection title={<></>}>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Smart contracts for every use case"
              description="Pre-built & audited smart contracts for the most popular Ethereum standards (ERC-721, ERC-1155, ERC-20)."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/account-abstraction.png")}
              title="Deployable on any EVM chain"
              description="Use thirdweb's smart contract tools with native EVM-compatibility — so you can build web3 apps on any of 900+ blockchains."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Ready-to-ship in a few clicks"
              description="No need to copy-paste ABIs or use private keys when deploying smart contracts — simply configure your smart contract's metadata & hit “Deploy”."
            />
          </Card>
        </LandingGridSection>

        <LandingGridSection
          title={
            <LandingSectionHeading
              title="What You Can Build"
              blackToWhiteTitle=""
            />
          }
        >
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="NFT Drops and Marketplaces"
              description="Use popular contracts to quickly build common Web3 apps."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Web3 Games"
              description="Every contract you need to build blockchain based games with in-game assets powered by NFTs, and an in-game economy powered by a native token. "
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Smart Wallets"
              description="Deploy smart wallet factories for your app — using account abstraction to give your users powerful features such as wallet recovery, multi-signature security, & batch transactions."
            />
          </Card>
        </LandingGridSection>

        <LandingGuidesShowcase
          title="Build apps with smart contracts you can trust"
          category={TRACKING_CATEGORY}
          description="Start building with pre-built smart contracts, or build your own with our Solidity SDK"
          guides={GUIDES}
        />

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/dashboard/wallets/smart-wallet"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

ExploreLanding.pageId = PageId.ExploreLanding;

export default ExploreLanding;
