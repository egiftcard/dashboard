import { ThirdwebNextPage } from "./_app";
import { Box, DarkMode, Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageFooter } from "components/product-pages/homepage/Footer";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { PageId } from "page-id";
import Furqan from "public/assets/about/furqan-rydhan.png";
import Steven from "public/assets/about/steven-bartlett.jpeg";
import Hero from "public/assets/landingpage/hero.png";
import MobileHero from "public/assets/landingpage/mobile-hero.png";
import { Heading, Text, TrackedLink } from "tw-components";

const About: ThirdwebNextPage = () => {
  const employees = [
    {
      name: "Jake Loo",
      twitter: "jake_loo",
    },
    {
      name: "Krishang Nadgauda",
      twitter: "monkeymeaning",
    },
    {
      name: "Adam Majmudar",
      twitter: "MajmudarAdam",
    },
    {
      name: "Catty Berragan",
      twitter: "CathalUK",
    },
    {
      name: "Jonas Daniels",
      twitter: "jnsdls",
    },
    {
      name: "Nacho Iacovino",
      twitter: "nachoiacovino",
    },
    {
      name: "Eiman Abdelmoneim",
      twitter: "EimanAbdel",
    },
    {
      name: "Patrick Kearney",
      twitter: "theyoungpatrice",
    },
    {
      name: "Joaquim Verges",
      twitter: "joenrv",
    },
    {
      name: "Devin Scott",
      twitter: "dvnsctt",
    },
    {
      name: "Adam Lee",
      twitter: "AdamLeeBG",
    },
    {
      name: "Samina Kabir",
      twitter: "saminacodes",
    },
    {
      name: "Anshu Tukol",
      twitter: "AnshuTukol",
    },
    {
      name: "Jarrod Watts",
      twitter: "jarrodwattsdev",
    },
    {
      name: "Yash Kumar",
      twitter: "yash09061",
    },
    {
      name: "Rahul Menon",
      twitter: "rahulphenomenon",
    },
    {
      name: "Sian Morton",
      twitter: "Sian_Morton",
    },
    {
      name: "Beverly Rivas",
      twitter: "BevRivas",
    },
  ];

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
        <HomepageSection topGradient bottomPattern>
          <SimpleGrid
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
                The web3 Infrastructure Layer
              </Heading>
              <Heading
                as="h3"
                size="subtitle.md"
                textAlign={{ base: "center", md: "left" }}
              >
                We firmly believe that web3 is for the next generation of
                builders. We set these builders up for success, by providing
                secure and seamless tools for creators, artists, and developers
                to unlock the power of web3.
              </Heading>
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
        <HomepageSection py={14}>
          <Heading size="display.sm" mb={6}>
            Founded by
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Flex gap={6}>
              <Box borderRadius="full" overflow="hidden">
                <ChakraNextImage src={Furqan} alt="" boxSize={48} />
              </Box>
              <Flex flexDir="column" gap={2} justifyContent="center">
                <Heading
                  size="title.lg"
                  bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                  bgClip="text"
                >
                  Furqan Rydhan, CEO
                </Heading>
                <TrackedLink
                  href="https://twitter.com/FurqanR"
                  isExternal
                  category="team"
                  label="Furqan Rydhan"
                >
                  <Text size="label.md" color="gray.500">
                    @FurqanR
                  </Text>
                </TrackedLink>
              </Flex>
            </Flex>
            <Flex gap={6}>
              <Box borderRadius="full" overflow="hidden">
                <ChakraNextImage src={Steven} alt="" boxSize={48} />
              </Box>
              <Flex flexDir="column" gap={2} justifyContent="center">
                <Heading
                  size="title.lg"
                  bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                  bgClip="text"
                >
                  Steven Bartlett, CMO
                </Heading>
                <TrackedLink
                  href="https://twitter.com/SteveBartlettSC"
                  isExternal
                  category="team"
                  label="Steven Bartlett"
                >
                  <Text size="label.md" color="gray.500">
                    @SteveBartlettSC
                  </Text>
                </TrackedLink>
              </Flex>
            </Flex>
          </SimpleGrid>
        </HomepageSection>
        <HomepageSection pb={24}>
          <Heading size="display.sm" mb={6}>
            Our Team
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {employees.map((employee) => (
              <Flex key={employee.name} flexDir="column" gap={1}>
                <Heading size="title.sm">{employee.name}</Heading>
                <TrackedLink
                  href={`https://twitter.com/${employee.twitter}`}
                  isExternal
                  category="team"
                  label={employee.name}
                >
                  <Text size="label.md" color="gray.500">
                    @{employee.twitter}
                  </Text>
                </TrackedLink>
              </Flex>
            ))}
          </SimpleGrid>
        </HomepageSection>
        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};

About.pageId = PageId.AboutLanding;

export default About;
