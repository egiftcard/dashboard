import { ThirdwebNextPage } from "./_app";
import { SimpleGrid } from "@chakra-ui/react";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { PageId } from "page-id";

const PreBuiltContracts: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Pre-built Contracts",
        description: "Ready-to-go contracts for your needs.",
        openGraph: {
          title: "Pre-built Contracts | thirdweb",
          url: `https://thirdweb.com/pre-built-contracts`,
        },
      }}
    >
      <Hero
        name="Pre-built Contracts"
        title="Ready-to-go contracts for your needs."
        description="Get started quickly and easily with our pre-built and audited smart contract suite."
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/pre-built-contracts"
        image={require("public/assets/product-pages/authentication/auth.png")}
        gradient="linear-gradient(147.15deg, #410AB6 30.17%, #AB2E2E 100.01%)"
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="A contract for your use-case"
            icon={require("/public/assets/product-pages/pre-builts/hero-icon-1.png")}
          >
            Whether you need NFTs, Tokens, Marketplaces, or something else,
            we’ve got you covered with contracts for the most common use-cases.
          </ProductCard>
          <ProductCard
            title="Powerful tooling to build apps"
            icon={require("/public/assets/product-pages/pre-builts/hero-icon-2.png")}
          >
            Get custom SDKs and dashboards for your contract to build and manage
            your apps.
          </ProductCard>
          <ProductCard
            title="Out-of-the-box security"
            icon={require("/public/assets/product-pages/pre-builts/hero-icon-3.png")}
          >
            Our contracts are thoroughly audited and secured in advance so you
            can focus on building.
          </ProductCard>
        </SimpleGrid>
      </Hero>
    </ProductPage>
  );
};

PreBuiltContracts.pageId = PageId.PreBuiltContractsLanding;

export default PreBuiltContracts;
