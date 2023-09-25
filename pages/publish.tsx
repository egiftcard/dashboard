import { Container, Flex } from "@chakra-ui/react";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingGuidesShowcase } from "components/landing-pages/guide-showcase";
import { LandingHeroWithSideImage } from "components/landing-pages/hero-with-side-image";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Card } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "publish-landing";

const GUIDES = [
  {
    title: "Introducing thirdweb Publish",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/02/publish-ogimage.png",
    link: "https://blog.thirdweb.com/thirdweb-release/",
  },
  {
    title: "Share your smart contracts with thirdweb Publish",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/03/Publish-your-smart-contracts-to-all-of-web3-2.png",
    link: "https://blog.thirdweb.com/guides/register-your-contract-using-thirdweb-release/",
  },
];

const PublishLanding: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      bgColor="#0F0F0F"
      seo={{
        title: "Share Your Smart Contracts with the World",
        description:
          "Publish your smart contract, get a shareable landing page for it, and enable anyone to deploy it securely to any EVM chain in 1 click.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/publish.png`,
              width: 1200,
              height: 630,
              alt: "Share Your Smart Contracts with the World",
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
          miniTitle="Publish"
          title="Share your smart contracts"
          titleWithGradient="with the world"
          subtitle="Get a landing page for your contract and enable anyone to deploy it securely to any EVM chain — in 1 click."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/publish"
          contactUsTitle="Book Demo"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
          image={require("public/assets/product-pages/hero/desktop-hero-publish.png")}
          mobileImage={require("public/assets/product-pages/hero/mobile-hero-publish.png")}
        />

        <LandingGridSection title={<></>}>
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-2.svg")}
            title="Grow your protocol"
            description="Accelerate your smart contract's adoption by making it easily discoverable and deployable — and get it in front of 100k+ web3 developers."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-7.png")}
            title="A full web3 stack"
            description="Make it easy for devs to build apps on your contracts. Give builders access to a full product suite when they deploy."
          />
          <LandingIconSectionItem
            icon={require("public/assets/solutions-pages/loyalty/icon-1.png")}
            title="Secure team deployment"
            description="Let your team securely deploy your smart contracts. No need to share private keys or copy, paste ABIs."
          />
        </LandingGridSection>
        <LandingGridSection title={<></>}>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Shareable landing page"
              description="Publish your smart contract & get a personalized landing page — so that others can explore your contract, view its source code, and deploy it in clicks."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/account-abstraction.png")}
              title="Any EVM"
              description="Bring your existing smart contracts & make them instantly deployable on any EVM chain — leveraging thirdweb's tools for full EVM-compatibility."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/smart-contracts.png")}
              title="Autogenerated SDKs & dashboard"
              description="When you deploy a published contract, you get autogenerated SDKs and dashboards that let you manage your contract and help you easily build apps on top of it."
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
          desktopColumns={2}
        >
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Public Goods & Ethereum Standards"
              description="Share your contracts with the world & get featured amongst world-class engineers & protocols on thirdweb Explore — with standards for token-bound accounts, rentable NFTs, membership tokens, and much more."
            />
          </Card>
          <Card p={8}>
            <LandingIconSectionItem
              icon={require("public/assets/product-pages/engine/wallet-management.png")}
              title="Tools for Onchain Teams"
              description="Enable your team to deploy any smart contract securely without needing to know how to deploy a smart contract — so that you can collaborate with them safely onchain."
            />
          </Card>
        </LandingGridSection>

        <LandingGuidesShowcase
          title="Make your contracts discoverable"
          description="Learn how to publish and deploy your smart contracts to any EVM chain in 1 click."
          category={TRACKING_CATEGORY}
          guides={GUIDES}
        />

        <LandingEndCTA
          title="Start building"
          titleWithGradient="today."
          trackingCategory={TRACKING_CATEGORY}
          ctaLink="https://portal.thirdweb.com/publish"
          gradient="linear(to-r, #BFA3DA, #84309C, #C735B0)"
        />
      </Container>
    </LandingLayout>
  );
};

PublishLanding.pageId = PageId.PublishLanding;

export default PublishLanding;
