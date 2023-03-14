import { ChakraNextImage } from "../../components/Image";
import { HomepageTopNav } from "../../components/product-pages/common/Topnav";
import {
  Box,
  DarkMode,
  Flex,
  GridItem,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";
import { HomepageFooter } from "components/footer/Footer";
import { landingSnippets } from "components/product-pages/homepage/CodeSelector";
import { YoutubeEmbed } from "components/video-embed/YoutubeEmbed";
import Image from "next/image";
import { PageId } from "page-id";
import darkTheme from "prism-react-renderer/themes/dracula";
import { Suspense } from "react";
import {
  Card,
  CodeBlock,
  CodeBlockProps,
  Heading,
  Link,
  LinkButton,
  Text,
} from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import { ThirdwebNextPage } from "utils/types";

type SDKCardProps = {
  title: string;
  image: string;
  links: {
    text: string;
    href: string;
  }[];
  code: CodeBlockProps;
};

const SDKCard: ComponentWithChildren<SDKCardProps> = ({
  title,
  image,
  links,
  code,
  children,
}) => {
  return (
    <Card
      as={Flex}
      flexDir="column"
      bg="#0F0F0F"
      border="none"
      p={10}
      alignItems="flex-start"
    >
      <>
        <Flex
          alignItems="center"
          justifyContent="center"
          w={20}
          h={20}
          border="1px solid #A7BFFA1A"
          rounded="lg"
        >
          <ChakraNextImage src={image} alt="" width={12} height={12} />
        </Flex>
        <Heading mt={4} mb={10} size="title.lg">
          {title}
        </Heading>
        {children}
        <CodeBlock
          my={8}
          darkTheme={darkTheme}
          color="white"
          fontSize={{ base: "12px", md: "14px" }}
          {...code}
        />
        {links.map(({ text, href }) => (
          <Link
            mt={4}
            href={href}
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            {text} &gt;
          </Link>
        ))}
      </>
    </Card>
  );
};

const Base: ThirdwebNextPage = () => {
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
        <HomepageTopNav />
        <Box mt="-80px" pt="80px" overflowX="hidden">
          <SimpleGrid
            maxW={{ base: "3xl", md: "8xl" }}
            mx="auto"
            columns={{ base: 1, md: 2 }}
            h={{ md: "calc(100vh - 80px)" }}
            maxH={1080}
            alignItems="center"
          >
            <GridItem py={{ base: 12, md: 0 }}>
              <Image
                src="/assets/build/base/base.png"
                alt="Base"
                width={757}
                height={380}
              />
            </GridItem>
            <GridItem p={{ base: 4, md: 12 }}>
              <Heading as="h1" size="title.xl">
                Secure, low-cost, developer-friendly Ethereum L2.
              </Heading>
              <Heading as="h2" size="title.xl" my={{ base: 4, md: 10 }}>
                Built to bring the next billion users to web3.
              </Heading>
              <Link
                href="https://base.org/"
                color="#245CF1"
                textDecoration="none"
                fontSize="2rem"
                fontWeight={700}
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Check out Base &rarr;
              </Link>
            </GridItem>
          </SimpleGrid>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="3xl"
            mx="auto"
            py={24}
            px={{ base: 4, md: 8 }}
          >
            <Heading
              as="h3"
              size="title.xl"
              textAlign="center"
              letterSpacing="-0.02em"
            >
              <Box
                as="span"
                background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                bgClip="text"
              >
                thirdweb
              </Box>{" "}
              brings your web3 ideas to production in record time.
            </Heading>
            <Card
              p={0}
              w="full"
              mt={14}
              bg="#0F0F0F"
              border="0"
              overflow="hidden"
            >
              <Flex flexDir="column" alignItems="center" p={12}>
                <Heading
                  size="title.2xl"
                  background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                  bgClip="text"
                  textAlign="center"
                  letterSpacing="-0.02em"
                >
                  CatAttack
                </Heading>
                <Heading
                  size="title.lg"
                  mt={4}
                  textAlign="center"
                  letterSpacing="-0.02em"
                >
                  The first game built on Base.
                </Heading>
                <LinkButton
                  my={8}
                  href="https://catattacknft.vercel.app"
                  bg="white"
                  _hover={{ bg: "whiteAlpha.800" }}
                >
                  <Heading as="span" size="title.md" color="black">
                    Play the game
                  </Heading>
                </LinkButton>
                <Heading
                  my={4}
                  size="title.sm"
                  fontSize="16px"
                  color="whiteAlpha.600"
                >
                  Clone the code
                </Heading>
                <SimpleGrid columns={{ sm: 2 }} gap={4}>
                  {[
                    {
                      title: "Web",
                      href: "https://github.com/thirdweb-example/catattacknft",
                    },
                    {
                      title: "Mobile",
                      href: "https://github.com/thirdweb-example/catattacknft-react-native",
                    },
                  ].map(({ title, href }) => (
                    <Link
                      p={1}
                      rounded="lg"
                      background="linear-gradient(-45deg, #A854F3, #EEB2F9, #A854F3)"
                      backgroundSize="200% 200%"
                      href={href}
                      transitionProperty="background-position, transform"
                      transitionDuration="slower"
                      isExternal
                      _hover={{
                        backgroundPosition: "bottom right",
                      }}
                      _active={{
                        transform: "scale(0.95)",
                      }}
                    >
                      <Flex
                        p={4}
                        rounded="lg"
                        bg="backgroundDark"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <SiGithub />
                        <Text ml={2} color="white" size="label.lg">
                          {title}
                        </Text>
                      </Flex>
                    </Link>
                  ))}
                </SimpleGrid>
              </Flex>
              <Image
                width="862"
                height="238"
                src="/assets/build/base/cats.png"
                alt=""
              />
            </Card>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="3xl"
            mx="auto"
            py={12}
            px={{ base: 4, md: 8 }}
          >
            <Heading
              as="h3"
              size="title.xl"
              textAlign="center"
              letterSpacing="-0.02em"
              background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
              bgClip="text"
            >
              Built with thirdweb in 2 days.
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} w="full" gap={6} mt={8}>
              {[
                { title: "100k+", label: "players" },
                { title: "1 Million+", label: "contract transactions" },
              ].map(({ title, label }) => (
                <Card
                  as={GridItem}
                  bg="#0F0F0F"
                  border="0"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  p={8}
                >
                  <Heading
                    size="title.2xl"
                    background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                    bgClip="text"
                    textAlign="center"
                    letterSpacing="-0.02em"
                  >
                    {title}
                  </Heading>
                  <Heading
                    color="whiteAlpha.500"
                    size="title.xs"
                    mt={3}
                    textAlign="center"
                    letterSpacing="-0.02em"
                  >
                    {label}
                  </Heading>
                </Card>
              ))}
            </SimpleGrid>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="5xl"
            mx="auto"
            py={24}
            px={{ base: 4, md: 8 }}
          >
            <Heading
              maxW="3xl"
              size="title.sm"
              bg="linear-gradient(0, #6891F7 -18.75%, #A7BFFA 100%)"
              bgClip="text"
              letterSpacing="-0.02em"
              textAlign="center"
            >
              You could be the next hit on Base.
            </Heading>
            <Heading
              maxW="3xl"
              size="title.2xl"
              letterSpacing="-0.02em"
              textAlign="center"
              mt={4}
              mb={12}
            >
              Learn how to build your own web3 apps or games.
            </Heading>
            <YoutubeEmbed
              maxWidth={1080}
              videoId="b_tERTX4as0"
              aspectRatio={16 / 9}
              title="Building Your First Web3 Game With a Unity SDK (thirdweb's GamingKit)"
            />
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="6xl"
            mx="auto"
            py={24}
            gap={6}
            px={{ base: 4, md: 8 }}
          >
            <Heading
              maxW="xl"
              size="title.2xl"
              letterSpacing="-0.02em"
              textAlign="center"
            >
              Start building with{" "}
              <Box
                as="span"
                bg="linear-gradient(0, #6891F7 -18.75%, #A7BFFA 100%)"
                bgClip="text"
              >
                coinbase
              </Box>{" "}
              and{" "}
              <Box
                as="span"
                background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                bgClip="text"
              >
                thirdweb.
              </Box>
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} mt={12} gap={6} w="full">
              {[
                {
                  title: "Wallet",
                  href: "https://www.coinbase.com/wallet",
                  image: "/assets/build/base/coinbase-wallet.png",
                },
                {
                  title: "Wallet as a Service",
                  href: "https://www.coinbase.com/cloud/products/waas",
                  image: "/assets/build/base/coinbase-waas.png",
                },
                {
                  title: "Pay",
                  href: "https://www.coinbase.com/cloud/products/pay-sdk",
                  image: "/assets/build/base/coinbase-pay.png",
                },
              ].map(({ title, href, image }) => (
                <LinkBox
                  as={Card}
                  bg="#0F0F0F"
                  border="3px solid transparent"
                  transitionProperty="border"
                  transitionDuration="slow"
                  _hover={{ borderColor: "#2151F5" }}
                  py={10}
                  px={6}
                >
                  <Flex flexDir="column" alignItems="center">
                    <Heading
                      textAlign="center"
                      size="title.lg"
                      letterSpacing="-0.02em"
                      background="linear-gradient(80deg, #6891F7, #C0D2FF, #6891F7)"
                      backgroundClip="text"
                      backgroundSize="200% 200%"
                      transitionProperty="background-position, transform"
                      transitionDuration="slower"
                      _hover={{
                        backgroundPosition: "bottom right",
                      }}
                      {...{ as: LinkOverlay, href, isExternal: true }}
                    >
                      {title}
                    </Heading>
                    <Box h={20} mt={10}>
                      <ChakraNextImage
                        height="78"
                        width="160"
                        src={image}
                        alt=""
                      />{" "}
                    </Box>
                  </Flex>
                </LinkBox>
              ))}
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" gap={6}>
              <GridItem as={Flex} flexDir="column" gap={6}>
                {(
                  [
                    {
                      title: "Deploy Contracts",
                      image: "/assets/build/base/contracts.svg",
                      code: {
                        code: "npx thirdweb deploy",
                        language: "bash",
                      },
                      links: [
                        {
                          text: "Browse docs",
                          href: "https://portal.thirdweb.com/deploy",
                        },
                      ],
                      children: (
                        <LinkButton
                          href="/explore"
                          bg="white"
                          _hover={{ bg: "whiteAlpha.800" }}
                        >
                          <Text as="span" size="label.lg" color="black">
                            Deploy a contract
                          </Text>
                        </LinkButton>
                      ),
                    },
                    {
                      title: "Build Web3 Mobile apps",
                      image: "/assets/build/base/apps.svg",
                      code: {
                        code: landingSnippets["react"].replace(
                          "/react",
                          "/react-native",
                        ),
                        language: "jsx",
                      },
                      links: [
                        {
                          text: "Browse docs",
                          href: "https://portal.thirdweb.com/react-native",
                        },
                        {
                          text: "Browse templates",
                          href: "https://portal.thirdweb.com/templates",
                        },
                      ],
                    },
                  ] as SDKCardProps[]
                ).map((props) => (
                  <SDKCard key={props.title} {...props} />
                ))}
              </GridItem>
              <GridItem as={Flex} flexDir="column" gap={6}>
                {(
                  [
                    {
                      title: "Build Web3 Websites",
                      image: "/assets/build/base/websites.svg",
                      code: {
                        code: landingSnippets["react"],
                        language: "jsx",
                      },
                      links: [
                        {
                          text: "Browse docs",
                          href: "https://portal.thirdweb.com/react",
                        },
                        {
                          text: "Browse templates",
                          href: "https://portal.thirdweb.com/templates",
                        },
                      ],
                    },
                    {
                      title: "Build Web3 Unity games",
                      image: "/assets/build/base/games.svg",
                      code: {
                        code: landingSnippets["unity"],
                        language: "cpp",
                      },
                      links: [
                        {
                          text: "Browse docs",
                          href: "https://portal.thirdweb.com/unity",
                        },
                        {
                          text: "Browse templates",
                          href: "https://portal.thirdweb.com/templates",
                        },
                      ],
                    },
                  ] as SDKCardProps[]
                ).map((props) => (
                  <SDKCard key={props.title} {...props} />
                ))}
              </GridItem>
            </SimpleGrid>
          </Flex>
          <Suspense>
            <HomepageFooter />
          </Suspense>
        </Box>
      </Flex>
    </DarkMode>
  );
};

Base.pageId = PageId.BuildBaseLanding;

export default Base;
