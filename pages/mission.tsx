import { Box, Container, Flex } from "@chakra-ui/react";
import { LandingLayout } from "components/landing-pages/layout";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { MarkdownRenderer } from "../components/contract-components/published-contract/markdown-renderer";
import HeroSection from "components/mission/HeroSection";
import MissionSection from "components/mission/MissionSection";
import { Aurora } from "components/homepage/Aurora";
import OverviewSection from "components/mission/OverviewSection";
import ReasonSection from "components/mission/ReasonSection";
import ReasonWeb3Section from "components/mission/ReasonWeb3Section";
import HowSection from "components/mission/HowSection";
import MajorSection from "components/mission/MajorSection";
import DesireSection from "components/mission/DesireSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import { Heading, Text } from "tw-components";
import { ChakraNextImage } from "components/Image";

const TRACKING_CATEGORY = "mission";

const Mission: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      py={{ base: "85px", md: "80px" }}
      seo={{
        title: "thirdweb's Privacy Policy",
        description:
          "The most efficient way to build web3 apps for millions of users — with a robust infrastructure stack that scales as you grow. Learn more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/mission.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb's Privacy Policy",
            },
          ],
        },
      }}
    >
      <Flex flexDir="column" position="relative" overflowX="hidden" px={3}>
        <Aurora
          pos={{ left: "50%", top: "1050px" }}
          size={{ width: "calc(100vw + 500px)", height: "3000px" }}
          color="hsl(260deg 100% 55% / 30%)"
          zIndex={2}
        />

        <Aurora
          pos={{ left: "50%", top: "3500" }}
          size={{ width: "calc(100vw + 500px)", height: "3500px" }}
          color="hsl(260deg 100% 55% / 30%)"
          zIndex={2}
        />

        <Container
          maxW="100%"
          as={Flex}
          flexDir="column"
          gap={{ base: "120px", md: "180px" }}
          position="relative"
          zIndex={3}
          px={0}
        >
          <Container
            as={Flex}
            flexDir="column"
            maxW="container.page"
            gap={{ base: "120px", md: "180px" }}
          >
            <HeroSection text="Making the internet more open and valuable for builders and users." />
            <MissionSection />
          </Container>

          <OverviewSection />

          <Container
            as={Flex}
            flexDir="column"
            maxW="container.page"
            gap={{ base: "120px", md: "180px" }}
            mt={{ base: "100px", "2xl": "200px" }}
          >
            <DesireSection />
            <ReasonSection />
            <ReasonWeb3Section />
          </Container>

          <HowSection TRACKING_CATEGORY={TRACKING_CATEGORY} />

          <Container
            as={Flex}
            flexDir="column"
            maxW="container.page"
            gap={{ base: "120px", md: "265px" }}
            mt={{ base: "100px", "2xl": "200px" }}
          >
            <MajorSection />

            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              flexDirection="column"
            >
              <ChakraNextImage
                src={require("public/assets/landingpage/desktop/xl-logo.png")}
                alt="thirdweb"
                maxW="80%"
              />

              <Text
                size="body.xl"
                fontWeight={600}
                textAlign="center"
                mt={{ base: "32px", md: "52px" }}
                color="#fff"
                fontSize={{ base: "20px", md: "32px" }}
              >
                solves for both.
              </Text>
            </Box>
          </Container>
        </Container>
      </Flex>
    </LandingLayout>
  );
};

Mission.pageId = PageId.Mission;

export default Mission;
