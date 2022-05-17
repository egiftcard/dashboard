import { ConsolePage } from "./_app";
import {
  Box,
  Center,
  DarkMode,
  Flex,
  LightMode,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { CaseStudyCard } from "components/homepage/CaseStudyCard";
import { CodeSelector } from "components/homepage/CodeSelector";
import { ContractCard } from "components/homepage/ContractCard";
import { DashboardCard } from "components/homepage/DashboardCard";
import { HomepageFooter } from "components/homepage/Footer";
import { HomepageSection } from "components/homepage/Section";
import { SupportedChain } from "components/homepage/SupportedChain";
import { HomepageTopNav } from "components/homepage/Topnav";
import {
  ExampleItem,
  exampleCategories,
} from "components/homepage/examples/ExampleItem";
import { GeneralCta } from "components/shared/GeneralCta";
import { BuiltinContractMap } from "constants/mappings";
import { useTrack } from "hooks/analytics/useTrack";
// images
import Analytics from "public/assets/landingpage/analytics.png";
import Contracts from "public/assets/landingpage/contracts.png";
import Hero from "public/assets/landingpage/hero.png";
import Keys from "public/assets/landingpage/keys.png";
import ListImage from "public/assets/landingpage/list.png";
import MobileHero from "public/assets/landingpage/mobile-hero.png";
import Statistics from "public/assets/landingpage/statistics.png";
import ThirdwebTeams from "public/assets/landingpage/thirdweb-teams.png";
import WhiteLogo from "public/assets/landingpage/white-logo.png";
// end images
import React from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { BsMenuButtonWide } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { MdOutlineAnalytics } from "react-icons/md";
import { Heading, Link, Text } from "tw-components";

const Home: ConsolePage = () => {
  const { Track } = useTrack({ page: "home" });

  return (
    <DarkMode>
      <Track>
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
          <HomepageSection id="home" topGradient bottomPattern>
            <SimpleGrid
              pb={{ base: 12, md: 24 }}
              pt={{
                base: 24,
                md: 48,
              }}
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 6, md: 8 }}
            >
              <Flex
                flexDir="column"
                gap={{ base: 6, md: 8 }}
                align={{ base: "initial", md: "start" }}
              >
                <Heading
                  as="h2"
                  size="display.md"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Build web3 apps, easily.
                </Heading>
                <Heading
                  as="h3"
                  size="subtitle.md"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Powerful SDKs and intuitive tools for building web3 apps.
                  Bring your own contracts or use ours for free. Get to
                  production faster.
                </Heading>
                <LightMode>
                  <Flex flexDir="column" align="center" gap={6}>
                    <GeneralCta size="lg" />
                    <Link
                      href="#fees"
                      borderBottomWidth="1px"
                      _hover={{
                        textDecor: "none",
                        opacity: 1,
                      }}
                      opacity={0.8}
                    >
                      <Text size="body.lg">thirdweb is 100% free</Text>
                    </Link>
                  </Flex>
                </LightMode>
              </Flex>
              <Flex
                display={{ base: "none", md: "flex" }}
                justifyContent="flex-end"
              >
                <ChakraNextImage
                  alt=""
                  maxW={96}
                  w={96}
                  mt={8}
                  src={Hero}
                  mr={12}
                />
              </Flex>
              <Flex
                display={{ base: "flex", md: "none" }}
                justifyContent="center"
              >
                <ChakraNextImage
                  alt=""
                  maxW={96}
                  w={96}
                  mt={8}
                  px={4}
                  src={MobileHero}
                />
              </Flex>
            </SimpleGrid>
          </HomepageSection>

          <HomepageSection id="contracts" middleGradient>
            <Flex
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              py={{ base: 12, md: 24 }}
              align="center"
            >
              <Flex
                p={{ base: 0, md: 12 }}
                flexDir="column"
                gap={{ base: 6, md: 8 }}
                borderWidth={{ base: 0, md: 2 }}
                borderColor="rgba(255,255,255,.1)"
                borderRadius="2xl"
                mb={{ base: 4, md: 12 }}
              >
                <Heading textAlign="center" size="display.sm" as="h2">
                  Introducing:
                  <br />
                  <Heading
                    as="span"
                    bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                    bgClip="text"
                    size="display.sm"
                  >
                    thirdweb deploy
                  </Heading>
                </Heading>
                <Heading size="subtitle.lg" as="h3" textAlign="center">
                  Create and deploy your own contracts with our intuitive SDK
                </Heading>
                <SimpleGrid
                  flexDir="column"
                  justifyContent="space-between"
                  w="100%"
                  columns={{ base: 1, md: 3 }}
                  gap={{ base: 12, md: 6 }}
                  py={12}
                  px={{ base: 6, md: 0 }}
                >
                  <Stack spacing={4}>
                    <ChakraNextImage src={Keys} alt="" w={10} />
                    <Heading size="title.sm">No more private keys</Heading>
                    <Text size="body.lg">
                      Use your favorite wallet to deploy. Have a team? Use your
                      Gnosis Safe!
                      <br />
                      Never accidentally leak your private keys again.
                    </Text>
                  </Stack>

                  <Stack spacing={4}>
                    <ChakraNextImage src={Statistics} alt="" w={10} />
                    <Heading size="title.sm">Power up with extensions</Heading>
                    <Text size="body.lg">
                      <Link
                        href="https://portal.thirdweb.com/thirdweb-deploy/contract-features"
                        isExternal
                      >
                        Delayed Reveal
                      </Link>
                      ,{" "}
                      <Link
                        href="https://portal.thirdweb.com/thirdweb-deploy/contract-features"
                        isExternal
                      >
                        Signature Minting
                      </Link>
                      ,{" "}
                      <Link
                        href="https://portal.thirdweb.com/thirdweb-deploy/contract-features/permissions"
                        isExternal
                      >
                        Permissions & Roles
                      </Link>
                      ,{" "}
                      <Link
                        href="https://portal.thirdweb.com/thirdweb-deploy/contract-features/royalty"
                        isExternal
                      >
                        Royalties
                      </Link>
                      ,{" "}
                      <Link
                        href="https://portal.thirdweb.com/thirdweb-deploy/contract-features"
                        isExternal
                      >
                        Primary Sales
                      </Link>
                      ,{" "}
                      <Link
                        href="https://portal.thirdweb.com/thirdweb-deploy/contract-features"
                        isExternal
                      >
                        and more...
                      </Link>{" "}
                      <br />
                      Ready to go in minutes.
                    </Text>
                  </Stack>

                  <Stack spacing={4}>
                    <ChakraNextImage src={ListImage} alt="" w={10} />
                    <Heading size="title.sm">
                      Automatic SDKs and dashboard
                    </Heading>
                    <Text size="body.lg">
                      Get fully-featured SDKs for popular languages out of the
                      box and use the dashboard to effortlessly manage your
                      contracts.
                    </Text>
                  </Stack>
                </SimpleGrid>
              </Flex>
              <Heading
                fontStyle="italic"
                size="subtitle.lg"
                as="h3"
                textAlign="center"
              >
                or get started with thirdweb pre-built contracts
              </Heading>
              <SimpleGrid
                columns={{ base: 2, md: 5 }}
                spacing={{ base: 3, md: 4 }}
                mb={12}
              >
                {Object.entries(BuiltinContractMap)
                  .filter(
                    ([, contract]) => contract.title !== "NOT IMPLEMENTED",
                  )
                  .map(([key, contract]) => (
                    <ContractCard
                      key={key}
                      contract={contract}
                      contractType={key as keyof typeof BuiltinContractMap}
                    />
                  ))}
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="developers" bottomPattern middleGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="display.sm" textAlign="center">
                Powerful SDKs. Easy integrations.
              </Heading>
              <Heading as="h3" size="subtitle.lg" textAlign="center">
                Intuitive SDK for websites, mobiles, backend servers, games,
                etc.
              </Heading>
              <CodeSelector />
            </Flex>
          </HomepageSection>

          <HomepageSection id="features" bottomGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 12, md: 24 }}
            >
              <Heading
                as="h2"
                size="display.sm"
                textAlign="center"
                fontWeight={500}
              >
                A dashboard to
                <br />
                control{" "}
                <Heading as="span" fontSize="inherit" fontWeight={900}>
                  everything
                </Heading>
                .
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                <DashboardCard
                  headingTitle="thirdweb teams"
                  headingIcon={AiOutlineTeam}
                  title={
                    <>
                      Built with a focus on{" "}
                      <Heading
                        as="span"
                        bgGradient="linear(to-l, #48BCA8, #A998FF)"
                        bgClip="text"
                        display="inline"
                        size="title.sm"
                      >
                        empowering your team
                      </Heading>
                    </>
                  }
                  subtitle="Deploy and manage your contracts with your Gnosis Safe, manage permissions, and more."
                  rightImage={ThirdwebTeams}
                  gradientBGs={{
                    topGradient:
                      "linear-gradient(135.89deg, #E21E12 17.67%, #00FFE0 59.03%)",
                    bottomGradient: "#C512E2",
                  }}
                />
                <DashboardCard
                  headingTitle="Contract manager"
                  headingIcon={BsMenuButtonWide}
                  title={
                    <>
                      <Heading
                        as="span"
                        bgGradient="linear(to-l, #E483F4, #FAC588)"
                        bgClip="text"
                        display="inline"
                        size="title.sm"
                      >
                        Your contracts
                      </Heading>
                      , at your fingertips
                    </>
                  }
                  subtitle="Keep track of your contracts, effortlessly deploy new versions, and more."
                  rightImage={Contracts}
                  gradientBGs={{
                    rightGradient: "#E28F12",
                    leftGradient: "#C512E2",
                  }}
                />
                <DashboardCard
                  headingTitle="thirdweb reports"
                  headingIcon={MdOutlineAnalytics}
                  title={
                    <>
                      Reports to learn about{" "}
                      <Heading
                        as="span"
                        bgGradient="linear(to-l, #585EE9, #E487D0)"
                        bgClip="text"
                        display="inline"
                        size="title.sm"
                      >
                        contract usage
                      </Heading>
                    </>
                  }
                  subtitle="Pre-built reports for all of your contracts. Understand how your contracts are being used."
                  rightImage={Analytics}
                  gradientBGs={{
                    rightGradient: "#C512E2",
                    bottomGradient: "#00FFE0",
                  }}
                />
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="networks">
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="display.sm" textAlign="center">
                Think Multi-Chain
              </Heading>
              <Heading size="subtitle.lg" as="h3" textAlign="center">
                Major chains are supported. More are coming soon.
              </Heading>
              <Box w="full">
                <Text size="label.lg" textTransform="uppercase">
                  Available now
                </Text>
                <SimpleGrid
                  columns={{ base: 2, md: 4 }}
                  spacing={4}
                  mt={5}
                  mb={12}
                >
                  <SupportedChain type="ethereum" />
                  <SupportedChain type="polygon" />
                  <SupportedChain type="avalanche" />
                  <SupportedChain type="fantom" />
                </SimpleGrid>

                <Text size="label.lg" textTransform="uppercase">
                  Coming soon
                </Text>

                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt={5}>
                  <SupportedChain type="solana" />
                  <SupportedChain type="flow" />
                </SimpleGrid>
              </Box>
            </Flex>
          </HomepageSection>

          <HomepageSection id="fees" middleGradient>
            <SimpleGrid
              py={{ base: 12, md: 24 }}
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 6, md: 8 }}
            >
              <Flex
                gap={{ base: 6, md: 8 }}
                flexDir="column"
                justify="space-between"
              >
                <Heading
                  size="display.sm"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Always know what you&apos;ll pay.
                  <br />
                  This time it&apos;s $0.
                </Heading>
                <Text
                  size="body.xl"
                  fontStyle="italic"
                  textAlign={{ base: "center", md: "left" }}
                >
                  We may introduce advanced features which you can decide to pay
                  for in the future. We will always be transparent and clear
                  about any paid features up-front.
                </Text>
              </Flex>
              <Box
                border=".5px solid"
                borderColor="#4953AF"
                p={12}
                borderRadius="lg"
                backgroundColor="#0000004d"
              >
                <Heading
                  bgGradient="linear(to-r, #FFB8E6, #8689E3)"
                  bgClip="text"
                  size="display.lg"
                  mb={6}
                >
                  Free.
                </Heading>
                <List
                  spacing={3}
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  textAlign="left"
                  color="gray.400"
                  mb={16}
                >
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Zero fees on contract deployments
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Zero fees on transactions
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    New features added every week
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Save on gas fees with advanced optimizations
                  </ListItem>
                </List>
                <LightMode>
                  <GeneralCta title="Start building today" size="lg" w="100%" />
                </LightMode>
              </Box>
            </SimpleGrid>
          </HomepageSection>

          <HomepageSection id="examples" bottomGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 12, md: 24 }}
            >
              <Heading
                as="h2"
                bgGradient="linear(to-r, #907EFF, #C5D8FF)"
                bgClip="text"
                size="display.md"
                textAlign="center"
              >
                What will you build?
              </Heading>
              <SimpleGrid
                w="100%"
                columns={{ base: 2, md: 4 }}
                spacing={{ base: 6, md: 12 }}
              >
                {exampleCategories.map((category) => (
                  <ExampleItem category={category} key={category} />
                ))}
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          {/* <HomepageSection id="partners" middleGradient>
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading as="h2" size="title.xl" textAlign="center">
                <Heading
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                  bgClip="text"
                  size="display.md"
                >
                  100k+ contracts deployed
                </Heading>
                by builders all over the world.
              </Heading>

              <SimpleGrid
                w="full"
                columns={{ base: 2, md: 4 }}
                spacing={4}
                mt={5}
                mb={12}
              >
                <Partner type="paper" />
                <Partner type="whop" />
                <Partner type="filta" />
                <Partner type="daocentral" />
                <Partner type="presearch" />
                <Partner type="citydao" />
                <Partner type="paper" />
                <Partner type="whop" />
              </SimpleGrid>
            </Flex>
          </HomepageSection> */}

          <HomepageSection id="case-studies">
            <Flex
              flexDir="column"
              py={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
            >
              <Heading
                maxW="container.lg"
                as="h2"
                size="display.sm"
                textAlign="center"
              >
                Success stories
              </Heading>
              <Heading maxW="lg" size="subtitle.lg" as="h3" textAlign="center">
                Game-changing companies are making the most of web3 with
                thirdweb.
              </Heading>
              <SimpleGrid
                flexDirection={{ base: "column", md: "row" }}
                gap={12}
                columns={{ base: 1, md: 2 }}
                w="full"
              >
                <CaseStudyCard
                  title="100thieves"
                  description="100Thieves launched an NFT to commemorate their historic 2021 LCS Championship win, with over 700k NFTs claimed."
                  href="https://twitter.com/thirdweb_/status/1488987923978588160"
                />
                <CaseStudyCard
                  title="boohoo"
                  description="boohoo launched their entry into web3 with boohooverse using thirdweb to make it easy for a non crypto-native audience."
                  href="https://twitter.com/thirdweb_/status/1518591454326702081"
                />
                <CaseStudyCard
                  title="yestheory"
                  description="Yes Theory created a tiered digital ticket NFT drop to crowdfund the biggest documentary ever made and released on YouTube."
                  href="https://twitter.com/thirdweb_/status/1516460620798963713"
                />
                <CaseStudyCard
                  title="fnatic"
                  description="Fnatic launched their free and paid digital membership program using thirdweb, with over 400k NFTs claimed on the free tier."
                  href="https://twitter.com/thirdweb_/status/1509180723978252303"
                />
              </SimpleGrid>
            </Flex>
          </HomepageSection>

          <HomepageSection id="get-started" bottomGradient bottomPattern>
            <Flex
              flexDir="column"
              pt={{ base: 12, md: 24 }}
              align="center"
              gap={{ base: 6, md: 8 }}
              pb={{ base: 24, md: 0 }}
            >
              <Center mb={6} pt={24}>
                <Center p={2} position="relative" mb={6}>
                  <Box
                    position="absolute"
                    bgGradient="linear(to-r, #F213A4, #040BBF)"
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    borderRadius="3xl"
                    overflow="visible"
                    filter="blur(15px)"
                  />

                  <ChakraNextImage
                    alt=""
                    boxSize={{ base: 24, md: 32 }}
                    placeholder="empty"
                    src={WhiteLogo}
                  />
                </Center>
              </Center>
              <Heading as="h2" size="display.md" textAlign="center">
                Get started with thirdweb
              </Heading>
              <Heading
                as="h3"
                maxW="600px"
                textAlign="center"
                size="subtitle.lg"
              >
                Build web3 apps with ease. Get instant access, explore our tools
                and build something magical.
              </Heading>
              <LightMode>
                <GeneralCta title="Start building for free" size="lg" />
              </LightMode>
            </Flex>
          </HomepageSection>

          <HomepageFooter />
        </Flex>
      </Track>
    </DarkMode>
  );
};

export default Home;
