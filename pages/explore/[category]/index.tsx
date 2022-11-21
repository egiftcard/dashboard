import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { ContractCard } from "components/explore/contract-card";
import { DeployUpsellCard } from "components/explore/upsells/deploy-your-own";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import {
  ALL_CATEGORIES,
  ExploreCategory,
  getCategory,
  prefetchCategory,
} from "data/explore";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Heading, Link, Text } from "tw-components";
import { getSingleQueryValue } from "utils/router";

const ExploreCategoryPage: ThirdwebNextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <>
      <NextSeo
        title={`${props.category.name} Smart Contracts | Explore`}
        description={`${props.category.description} Deploy with one click to Ethereum, Polygon, Optimism, and other EVM blockchains with thirdweb.`}
      />
      <Flex direction="column" gap={{ base: 6, md: 12 }}>
        <Flex direction="column" gap={{ base: 2, md: 4 }}>
          <Flex direction="column" gap={0}>
            <Breadcrumb fontWeight={400}>
              <BreadcrumbItem>
                <Link as={BreadcrumbLink} href="/explore">
                  <Flex
                    gap={1}
                    as={Heading}
                    size="label.md"
                    fontWeight={400}
                    align="center"
                  >
                    <Icon as={FiChevronLeft} />
                    Explore
                  </Flex>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Link
                  as={BreadcrumbLink}
                  href={`/explore/${props.category.id}`}
                  aria-current="page"
                >
                  <Heading size="label.md">
                    {props.category.displayName || props.category.name}
                  </Heading>
                </Link>
              </BreadcrumbItem>
            </Breadcrumb>

            <Heading as="h1" size="display.sm">
              {props.category.displayName || props.category.name}
            </Heading>
          </Flex>
          <Text as="h2" size="body.xl" maxW="container.md">
            {props.category.description}{" "}
            {props.category.learnMore && (
              <Link
                _light={{
                  color: "blue.500",
                  _hover: { color: "blue.700" },
                }}
                _dark={{ color: "blue.300", _hover: { color: "blue.500" } }}
                isExternal
                href={props.category.learnMore}
              >
                Learn more
              </Link>
            )}
          </Text>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
          {props.category.contracts.map((publishedContractId) => {
            const [publisher, contractId] = publishedContractId.split("/");
            return (
              <ContractCard
                key={publishedContractId}
                publisher={publisher}
                contractId={contractId}
              />
            );
          })}
        </SimpleGrid>
        <DeployUpsellCard />
      </Flex>
    </>
  );
};

ExploreCategoryPage.getLayout = (page: ReactElement) => (
  <AppLayout noSEOOverride>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

ExploreCategoryPage.pageId = PageId.ExploreCategory;

export default ExploreCategoryPage;

interface ExplorePageProps {
  category: ExploreCategory;
}

export const getStaticProps: GetStaticProps<ExplorePageProps> = async (ctx) => {
  const categoryId = getSingleQueryValue(ctx.params, "category") as string;

  const category = getCategory(categoryId);
  if (!category) {
    return {
      notFound: true,
    };
  }
  // pre load the data as well
  const queryClient = new QueryClient();
  await prefetchCategory(category, queryClient);

  return {
    props: { category, dehydratedState: dehydrate(queryClient) },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ALL_CATEGORIES.map((category) => ({
      params: { category },
    })),
    fallback: false,
  };
};
