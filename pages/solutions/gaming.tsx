import { AspectRatio, Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { GameShowcase } from "components/product-pages/common/GameShowcase";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { SolutionsTextImage } from "components/product-pages/common/SolutionsTextImage";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { Heading } from "tw-components";

const GAMING_GUIDES = [
  {
    title: "Get Started with the Unity SDK",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--1-.png",
    link: "https://blog.thirdweb.com/guides/get-started-with-thirdwebs-unity-sdk/",
  },
  {
    title: "Add A Connect Wallet Button In A Unity Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--6-.png",
    link: "https://blog.thirdweb.com/guides/add-a-connect-wallet-button-in-a-unity-game/",
  },
  {
    title: "Airdrop Free-To-Own NFTs For Your Web3 Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--4-.png",
    link: "https://blog.thirdweb.com/guides/airdrop-free-to-own-nfts-for-a-web3-game/",
  },
];

const Gaming: ThirdwebNextPage = () => {
  return (
    <ProductPage
      accentColor="rgba(22,82,240,.75)"
      seo={{
        title:
          "thirdweb GamingKit | SDKs, Smart Contracts & Dev Tools for Web3 Games",
        description:
          "Everything you need to build web3 games. Build a stronger community around your game by giving players ownership of in-game assets.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/thirdwebxcoinbase.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb x coinbase",
            },
          ],
        },
      }}
    >
      <Hero
        name="GamingKit"
        title="Reimagine gaming with web3 technologies"
        description="Everything you need to build web3 games. Build a stronger community around your game by giving players ownership of in-game assets."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/gamingkit"
        gradient="linear-gradient(145.96deg, rgba(205, 0, 238, 1) 5.07%, #1652F0 100%);"
        image={require("public/assets/solutions-pages/gaming/hero.png")}
        type="Solutions"
        underGetStarted={
          <Flex gap={3} justify="center" align="center" mt={4}>
            <Heading size="subtitle.xs" as="span" mt="4px">
              In partnership with
            </Heading>
            <AspectRatio w="80px" ratio={359 / 64}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="359"
                height="64"
                fill="none"
                viewBox="0 0 359 64"
              >
                <g clipPath="url(#clip0)">
                  <path
                    fill="#fff"
                    d="M72.3094 17.8676C59.2941 17.8676 49.1245 27.7478 49.1245 40.9744C49.1245 54.2011 59.0371 63.9967 72.3094 63.9967C85.5816 63.9967 95.6666 54.032 95.6666 40.8899C95.6666 27.8323 85.754 17.8676 72.3094 17.8676ZM72.3972 54.4646C64.9854 54.4646 59.5542 48.7082 59.5542 40.9777C59.5542 33.1594 64.8976 27.4063 72.3094 27.4063C79.8089 27.4063 85.2369 33.2472 85.2369 40.9777C85.2369 48.7082 79.8089 54.4646 72.3972 54.4646ZM98.5091 27.9201H104.974V63.1414H115.316V18.7262H98.5091V27.9201ZM23.0971 27.403C28.5283 27.403 32.8374 30.7528 34.4733 35.7351H45.4202C43.4364 25.0842 34.6457 17.8676 23.1849 17.8676C10.1696 17.8676 0 27.7478 0 40.9777C0 54.2076 9.9127 64 23.1849 64C34.3887 64 43.3518 56.7834 45.3356 46.0446H34.4733C32.922 51.027 28.6128 54.4646 23.1817 54.4646C15.6821 54.4646 10.4265 48.7082 10.4265 40.9777C10.4298 33.1594 15.6008 27.403 23.0971 27.403ZM295.013 36.6815L287.429 35.566C283.81 35.0522 281.224 33.8489 281.224 31.013C281.224 27.9201 284.587 26.3753 289.153 26.3753C294.152 26.3753 297.342 28.5218 298.031 32.0439H308.029C306.907 23.1101 300.012 17.8708 289.413 17.8708C278.466 17.8708 271.227 23.4549 271.227 31.3577C271.227 38.9158 275.968 43.2998 285.533 44.6722L293.117 45.7877C296.825 46.3015 298.893 47.765 298.893 50.5131C298.893 54.0353 295.274 55.4955 290.275 55.4955C284.154 55.4955 280.707 53.0043 280.19 49.2253H270.02C270.97 57.9021 277.777 64 290.187 64C301.479 64 308.975 58.8453 308.975 49.996C308.975 42.0932 303.547 37.9694 295.013 36.6815ZM110.145 0.42929C106.353 0.42929 103.508 3.1774 103.508 6.95645C103.508 10.7355 106.35 13.4836 110.145 13.4836C113.937 13.4836 116.783 10.7355 116.783 6.95645C116.783 3.1774 113.937 0.42929 110.145 0.42929ZM261.919 33.9334C261.919 24.3134 256.059 17.8708 243.648 17.8708C231.927 17.8708 225.377 23.7996 224.083 32.9057H234.34C234.857 29.3836 237.615 26.4631 243.476 26.4631C248.735 26.4631 251.32 28.7819 251.32 31.6179C251.32 35.3124 246.578 36.2555 240.718 36.8572C232.789 37.7157 222.964 40.4638 222.964 50.7733C222.964 58.764 228.912 63.9154 238.393 63.9154C245.804 63.9154 250.458 60.8226 252.787 55.9248C253.132 60.3055 256.407 63.1414 260.976 63.1414H267.009V53.9507H261.922V33.9334H261.919ZM251.749 45.1015C251.749 51.0302 246.578 55.4109 240.285 55.4109C236.406 55.4109 233.131 53.7783 233.131 50.344C233.131 45.9633 238.389 44.76 243.216 44.2462C247.87 43.8169 250.455 42.7859 251.749 40.8086V45.1015ZM196.849 17.8676C191.073 17.8676 186.247 20.2742 182.8 24.3102V0H172.458V63.1414H182.627V57.3005C186.074 61.5088 190.989 64 196.849 64C209.259 64 218.655 54.2076 218.655 40.9777C218.655 27.7478 209.087 17.8676 196.849 17.8676ZM195.298 54.4646C187.886 54.4646 182.455 48.7082 182.455 40.9777C182.455 33.2472 187.971 27.4063 195.382 27.4063C202.882 27.4063 208.137 33.1627 208.137 40.9777C208.137 48.7082 202.709 54.4646 195.298 54.4646ZM147.721 17.8676C140.999 17.8676 136.602 20.6157 134.017 24.4825V18.7262H123.759V63.1382H134.101V39.0004C134.101 32.213 138.41 27.403 144.788 27.403C150.736 27.403 154.44 31.6114 154.44 37.7125V63.1414H164.782V36.9417C164.786 25.7704 159.013 17.8676 147.721 17.8676ZM358.275 39.5175C358.275 26.8046 348.967 17.8708 336.469 17.8708C323.197 17.8708 313.457 27.8356 313.457 40.9777C313.457 54.8093 323.886 64 336.642 64C347.416 64 355.862 57.642 358.015 48.6236H347.24C345.689 52.575 341.897 54.8093 336.811 54.8093C330.173 54.8093 325.174 50.6855 324.055 43.4689H358.272V39.5175H358.275ZM324.66 36.0799C326.3 29.8942 330.953 26.8892 336.297 26.8892C342.157 26.8892 346.639 30.2389 347.673 36.0799H324.66Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="358.275" height="64" fill="#fff" />
                  </clipPath>
                </defs>
              </svg>
            </AspectRatio>
          </Flex>
        }
        largeImage
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Monetize with in-game asset sales"
            icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
          >
            Get additional revenue streams with primary sales and royalty fees
            from secondary sales for in-game assets represented as NFTs.
          </ProductCard>
          <ProductCard
            title="Grow your gaming community"
            icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
          >
            Foster a more engaged community by empowering players to become
            owners of in-game assets, turning them into advocates for your
            games.
          </ProductCard>
          <ProductCard
            title="Create new gaming universes"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            Game assets represented by NFTs can be designed to be interoperable
            across environments on the same blockchain. Assets can unlock perks
            and rewards throughout the web3 ecosystem.
          </ProductCard>
        </SimpleGrid>
      </Hero>

      <ProductSection pb={{ base: 12, lg: 24 }}>
        <Flex
          flexDir="column"
          pt={{ base: 12, lg: 24 }}
          align="center"
          gap={{ base: 6, md: 8 }}
        >
          <Heading as="h2" size="display.sm" textAlign="center">
            Connect to web3 easily.
          </Heading>
          <Heading
            as="h3"
            size="subtitle.lg"
            textAlign="center"
            maxW="container.md"
          >
            The ultimate development framework for all types of web3 games:
            free-to-own, play-to-earn, nft game, etc. Powerful Gaming Engine
            SDKs to integrate web3 features into your game.
          </Heading>
          <CodeSelector
            defaultLanguage="unity"
            docs="https://portal.thirdweb.com/gamingkit"
          />
        </Flex>
      </ProductSection>

      <SolutionsTextImage
        image={require("public/assets/solutions-pages/commerce/reimagine.png")}
        title="Bring your web2 game to web3 with GamingKit, across any EVM blockchain"
      />

      <ProductSection>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, md: 24 }}
        >
          <ProductLearnMoreCard
            title="Build"
            description="Discover ready-to-go contracts or build your own with ContractKit for gaming use cases, e.g. NFT Marketplace, Multiwrap, Packs, Tokens, and more. Enable fiat-to-crypto capabilities with Coinbase Pay integration. Integrate NFT marketplace to enforce royalty fees."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/contractkit"
          />
          <ProductLearnMoreCard
            title="Launch"
            description="Powerful Game Engine SDKs enable you to integrate web3 features into browser-based games built on Unity. SDKs allow you to easily integrate popular wallets and marketplaces into your game. Unreal Engine SDK coming soon."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Manage"
            description="View and interact with your web3 game smart contracts directly from a user interface, e.g. view all NFTs owned by a player."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
            href="https://portal.thirdweb.com/dashboard"
          />
        </SimpleGrid>
      </ProductSection>

      <GameShowcase />

      <GuidesShowcase
        title="Start building web3 games"
        description="Check out our guides and templates to start building games with thirdweb"
        solution="Gaming"
        guides={GAMING_GUIDES}
      />

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, var(--product-accent-color) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />
      <NewsletterSection />
    </ProductPage>
  );
};

Gaming.pageId = PageId.SolutionsGaming;

export default Gaming;
