import {
  Box,
  DarkMode,
  Flex,
  Icon,
  LinkBox,
  SimpleGrid,
} from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { Aurora } from "components/homepage/Aurora";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { GetStaticProps } from "next";
import { PageId } from "page-id";
import { ReactNode } from "react";
import { BsGithub } from "react-icons/bs";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const repositories = [
  {
    id: "contracts",
    name: "Contracts",
    description:
      "Solidity smart contracts that power our Solidity SDK and Explore.",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description:
      "User interface to deploy, explore and interact with smart contracts.",
  },
  {
    id: "js",
    name: "JS Monorepo",
    description:
      "TypeScript, React and Wallet SDKs, CLI, Auth, Storage, and more.",
  },
  {
    id: "python-sdk",
    name: "Python SDK",
    description: "Create web3 backend applications using Python.",
  },
  {
    id: "unity-sdk",
    name: "Unity SDK",
    description: "Create web-based or native web3 games using Unity.",
  },
  {
    id: "go-sdk",
    name: "Go SDK",
    description: "Create web3 backend applications using Go.",
  },
  {
    id: "docs",
    name: "Portal",
    description: "Documentation, templates, and guides for developers.",
  },
  {
    id: "solana",
    name: "Solana SDK",
    description: "Build web3 applications on the Solana blockchain.",
  },
  {
    id: "dynamic-contracts",
    name: "Dynamic Contracts",
    description:
      "Architectural pattern for writing dynamic smart contracts in Solidity.",
  },
];

interface RepoCardProps {
  title: string;
  description: ReactNode;
  url: string;
}

interface PageProps {
  contributors: GithubContributor[];
}

interface GithubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface GithubRepository {
  id: number;
  name: string;
  fork: boolean;
}

const RepoCard: React.FC<RepoCardProps> = ({ title, description, url }) => {
  return (
    <LinkBox
      as="a"
      background={"rgba(0,0,0,0.2)"}
      boxShadow="0 0 0 1px hsl(0deg 0% 100% / 15%)"
      borderRadius="12px"
      padding={8}
      href={url}
      _hover={{
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
      transition="background-color 0.2s ease"
    >
      <Heading as="h3" fontSize="28px" mb={4} fontWeight={700}>
        {title}
      </Heading>
      <Text size="body.lg" lineHeight={1.7} color="#888">
        {description}
      </Text>
    </LinkBox>
  );
};

const OSS: ThirdwebNextPage = ({ contributors }: PageProps) => {
  const trackEvent = useTrack();

  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
      >
        <ProductPage
          seo={{
            title: "Open Source Community",
            description:
              "All of our SDKs, infrastructure, and documentation are open source under the Apache 2.0 license and open to contributions.",
            openGraph: {
              images: [
                {
                  url: `${getAbsoluteUrl()}/assets/og-image/sdk.png`,
                  width: 2334,
                  height: 1260,
                  alt: "thirdweb Open Source SDKs",
                },
              ],
            },
          }}
        >
          <HomepageSection bottomPattern pb={32}>
            <Aurora
              pos={{ left: "50%", top: "0%" }}
              size={{ width: "2400px", height: "2400px" }}
              color="hsl(289deg 78% 30% / 45%)"
            />

            <Flex
              pt={24}
              mb={{ base: 24, md: -24 }}
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              align={{ base: "initial", md: "start" }}
            >
              <Heading
                as="h2"
                size="display.md"
                textAlign={{ base: "center", md: "left" }}
              >
                Open Source
              </Heading>
              <Heading
                as="h3"
                size="subtitle.md"
                textAlign={{ base: "center", md: "left" }}
                maxW="container.sm"
              >
                All of our SDKs, infrastructure, and documentation are open
                source under the Apache 2.0 license and open to contributions.
              </Heading>

              <Flex
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
                mt={{ base: 8, md: 0 }}
              >
                <Flex flexDir="column" gap={3} flexGrow={1} minW={300}>
                  <LinkButton
                    href="https://github.com/orgs/thirdweb-dev/"
                    onClick={() =>
                      trackEvent({
                        category: "cta-button",
                        action: "click",
                        label: "oss",
                        title: "View GitHub",
                      })
                    }
                    px={4}
                    py={7}
                    fontSize="20px"
                    leftIcon={<Icon as={BsGithub} color="black" />}
                    color="black"
                    flexShrink={0}
                    background="rgba(255,255,255,1)"
                    _hover={{
                      background: "rgba(255,255,255,0.9)!important",
                    }}
                  >
                    View GitHub
                  </LinkButton>
                </Flex>
              </Flex>
            </Flex>
          </HomepageSection>
          <HomepageSection pb={32}>
            <Heading size="display.sm" mb={12}>
              Top Contributors
            </Heading>
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              gap={8}
              justifyContent="space-evenly"
            >
              {contributors
                .filter((contributor) => contributor.contributions > 0)
                .filter(
                  (contributor) => contributor.login.indexOf("[bot]") === -1,
                )
                .slice(0, 24)
                .map((contributor) => (
                  <Flex key={contributor.login} flexDir="column" gap={1}>
                    <TrackedLink
                      href={`https://github.com/${contributor.login}`}
                      isExternal
                      category="team"
                      label={contributor.login}
                    >
                      <Heading size="title.sm">@{contributor.login}</Heading>
                    </TrackedLink>
                    <Text size="label.md" color="gray.500">
                      {contributor.contributions}{" "}
                      {contributor.contributions === 1
                        ? "contribution"
                        : "contributions"}
                    </Text>
                  </Flex>
                ))}
            </SimpleGrid>
          </HomepageSection>
          <HomepageSection pb={32}>
            <Heading size="display.sm" mb={12}>
              Repositories
            </Heading>
            <SimpleGrid columns={{ lg: 3, base: 1 }} gap={{ lg: 12, base: 12 }}>
              {repositories.map((repo) => (
                <RepoCard
                  key={repo.id}
                  title={repo.name}
                  description={repo.description}
                  url={`https://github.com/thirdweb-dev/${repo.id}`}
                />
              ))}
            </SimpleGrid>
          </HomepageSection>

          <HomepageFooter />
        </ProductPage>
      </Flex>
    </DarkMode>
  );
};

OSS.pageId = PageId.OSS;

export default OSS;

export const getStaticProps: GetStaticProps = async () => {
  const orgName = "thirdweb-dev";

  const authHeader = {
    headers: {
      Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    },
  };

  // Fetch the list of all repositories belonging to the organization
  const reposResponse = await fetch(
    `https://api.github.com/orgs/${orgName}/repos?per_page=100`,
    authHeader,
  );

  const reposData = (await reposResponse.json()) as GithubRepository[];

  const repos = reposData
    .filter((repo) => repo.fork === false)
    .filter((repo) => repo.name !== "shopify-thirdweb-theme")
    .map((repo) => repo.name);

  const contributors: Record<string, GithubContributor> = {};

  for (const repo of repos) {
    const response = await fetch(
      `https://api.github.com/repos/${orgName}/${repo}/contributors`,
      authHeader,
    );
    const data = (await response.json()) as GithubContributor[];

    data.forEach((contributor) => {
      const login = contributor.login;
      const contributions = contributor.contributions;
      if (contributors[login]) {
        contributors[login].contributions += contributions;
      } else {
        contributors[login] = {
          login,
          avatar_url: contributor.avatar_url,
          html_url: contributor.html_url,
          contributions,
        };
      }
    });
  }

  // Sort the contributors by their contributions in descending order
  const sortedContributors = Object.values(contributors).sort(
    (a, b) => b.contributions - a.contributions,
  );

  return {
    props: { contributors: sortedContributors },
    revalidate: 3600, // revalidate the data at most once every hour
  };
};
