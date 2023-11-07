import { Container, Flex } from "@chakra-ui/react";
import LandingCardWithImageBackground from "components/landing-pages/card-with-image-background";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingHero } from "components/landing-pages/hero";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingOptionSelector } from "components/landing-pages/option-selector";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card, Heading, Text, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "chains-landing";

const SELECTOR_ITEMS = [
  {
    title: "For Chains-as-a-Service Providers",
    description:
      "Enhance your developers' experience with building on your chain by providing access to dev tools across: contracts, wallets, payments, and infrastructure. Empower your developers to build production-ready web3 apps and games, faster.",
    steps: [
      "Contact us to get your chain approved to be added to thirdweb global chainlist.",
      "Once added, a shareable dynamic landing page will be generated for your chain.",
      "Subnet developers can easily deploy contracts to their subnet in just a few clicks and access SDKs to integrate contracts into their apps",
    ],
    products: ["explore", "interact"],
  },
  {
    title: "For Appchain Developers",
    description:
      "Start building production-ready web3 apps and games on top of your subnet with our dev tools across: contracts, wallets, payments, and infrastructure.",
    steps: [
      "After appchain developers create their subnet on an approved chains-as-a-service platform, a dynamic landing page is generated with SDKs, contract deployment and infrastructure for their subnet.",
      "Appchain developer deploys contract specific to their appchain.",
      "Appchain developer build web3 apps using thirdweb product suite: contracts, wallets, payments, infrastructure products.",
    ],
    products: ["explore", "interact"],
  },
];

const SolutionsChains: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "All-in-one dev tools for your chain",
        description:
          "Accelerate the growth of your chain by providing an all-in-one web3 development stack that allows your developers to build production-ready web3 apps and games.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/chains-solutions.png`,
              width: 1200,
              height: 630,
              alt: "All-in-one dev tools for your chain",
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
          miniTitle="Chains & Appchains"
          title="Instant developer tools on your chain"
          titleWithGradient=""
          subtitle="The easiest way for developers to build on your EVM chain (or appchain) — with wallets, smart contracts, payments, and infrastructure for them to scale web3 apps."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="/contact-us"
          noContactUs
          gradient="linear(to-r,  #F856C8, #F856C8)"
          ctaText="Contact Us"
          image={require("public/assets/product-pages/hero/desktop-hero-chains.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-chains.png")}
        />

        <LandingGridSection>
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/icons/icon-build.svg")}
            title="Flexible"
            description="Our products are designed to be fully composable to give your developers flexibility in how they want to build. Use thirdweb managed infrastructure services or bring your own permissioned RPCs."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/icons/icon-ship.svg")}
            title="Build faster"
            description="Make it easier for developers to onboard onto your chain by providing an all-in-one developer tools, including: contracts, wallets, payments, and infrastructure."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/icons/icon-tool.svg")}
            title="Developer-first experience"
            description="Offer your developers most intuitive SDKs detect extensions in your contracts to handle common contract operations for developers. Extensions also unlock Dashboard UI functionality and data feeds."
          />
        </LandingGridSection>

        <LandingOptionSelector
          items={SELECTOR_ITEMS}
          TRACKING_CATEGORY={TRACKING_CATEGORY}
          blackToWhiteTitle=""
          title="What You Can Build"
        />

        <LandingGridSection desktopColumns={4}>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-ship.svg")}
              title="Deploy"
              description="Offer your Deploy contracts directly to your appchain."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-contract.svg")}
              title="Any Contracts"
              description="Build your own contracts with Build or discover ready-to-deploy contracts in Explore."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-dashboard.svg")}
              title="Fully managed infrastructure"
              description="Fully managed infrastructure services in a single ecosystem that enables developers to build for scale."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/solutions-pages/icons/icon-smart-wallet.svg")}
              title="Flexible wallet experiences"
              description="Onboard web2 and web3 users with fully customizable connect wallet components."
            />
          </Card>
        </LandingGridSection>

        <LandingCardWithImageBackground
          image={require("public/assets/landingpage/coinbase-event.png")}
        >
          <Flex flexDir="column" gap="27px" maxWidth="600px">
            <Heading fontSize="xx-large" fontWeight="600" color="white">
              Launch production-ready subnets with thirdweb and AvaCloud
            </Heading>
            <Text fontSize="medium" fontWeight="400" color="white">
              Thirdweb&apos;s integration into AvaCloud enables anyone to build
              comprehensive apps with tools for Wallets, Payments, Contracts and
              infrastructure, while also running customizable blockchains which
              maintain their own security.
            </Text>
            <TrackedLinkButton
              variant="outline"
              isExternal
              bgColor="#FFF"
              color="#000"
              border="none"
              _hover={{
                opacity: 0.9,
              }}
              py={6}
              category={TRACKING_CATEGORY}
              label="coinbase-case-study"
              href="https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life"
              maxW="fit-content"
            >
              Learn More
            </TrackedLinkButton>
          </Flex>
        </LandingCardWithImageBackground>

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          noCta={true}
          contactUsLink="https://docs.google.com/forms/d/e/1FAIpQLSfzwj6mr7mZjntv5C8HD9CfMXkIupuOqBSWa-XIWepJnnCEKg/viewform"
          gradient="linear(to-r, #F213A4, #F97CCE)"
        />
      </Container>
    </LandingLayout>
  );
};

SolutionsChains.pageId = PageId.SolutionsChains;

export default SolutionsChains;
