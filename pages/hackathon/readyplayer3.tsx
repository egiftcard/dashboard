import { Box, DarkMode, Divider, Flex, Icon } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { HomepageFooter } from "components/footer/Footer";
import { Judges } from "components/hackathon/common/Judges";
import { Mentors } from "components/hackathon/common/Mentors";
import { PrizeSection } from "components/hackathon/common/PrizeSection";
import { ScheduleSection } from "components/hackathon/common/ScheduleSection";
import { Sponsors } from "components/hackathon/common/Sponsors";
import { CTAFooter } from "components/hackathon/gaming/CTAFooter";
import { FaqSection } from "components/hackathon/gaming/FAQSection";
import { Resources } from "components/hackathon/gaming/Resources";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { PageId } from "page-id";
import { Heading, LinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const Timer = dynamic(() => import("components/hackathon/common/Timer"), {
  ssr: false,
});

const metadata = {
  title:
    "Join the 'Ready Player 3' Hackathon and Transform the Gaming World with Web3 and Unity!",
  description:
    "Unleash your full potential as a game dev and build the future of gaming with thirdweb's 'Ready Player 3' Hackathon. Supported by Coinbase and more.",
};

const prizes = [
  {
    title: "1st Place",
    prize: "$5,000",
  },
  {
    title: "2nd Place",
    prize: "$3,000",
  },
  {
    title: "3rd Place",
    prize: "$2,000",
  },
];

// TODO: need better logos
const sponsors = [
  {
    name: "Coinbase",
    logo: "/assets/investors/coinbase.svg",
    link: "https://www.coinbase.com/",
  },
  {
    name: "Scenario",
    logo: "/assets/hackathon/sponsors/scenario.png",
    link: "https://scenario.gg/",
  },
  {
    name: "AWS",
    logo: "/assets/hackathon/sponsors/aws.svg",
    link: "https://aws.amazon.com/",
  },
  {
    name: "Consensus",
    logo: "/assets/hackathon/sponsors/consensus.png",
    link: "https://www.coindesk.com/consensus/",
  },
];

const scheduleItems = [
  {
    day: 2,
    items: [
      {
        title: "test event",
        link: "",
        time: "10:00 PM PST",
      },
      {
        title: "Registration Opens",
        link: "",
        time: "12:00 PM PST",
      },
    ],
  },
  {
    day: 4,
    items: [
      {
        title: "abc",
        link: "",
        time: "12:00 PM PST",
      },
    ],
  },
  {
    day: 16,
    items: [
      {
        title: "Hackathon Starts",
        link: "",
        time: "12:00 PM PST",
      },
    ],
  },
  {
    day: 31,
    items: [
      {
        title: "Hackathon Ends",
        link: "",
        time: "12:00 PM PST",
      },
    ],
  },
];

const ReadyPlayer3Landing: ThirdwebNextPage = () => {
  const trackEvent = useTrack();

  return (
    <DarkMode>
      <NextSeo
        title={metadata.title}
        description={metadata.description}
        openGraph={{
          title: metadata.title,
          url: "https://thirdweb.com/hackathon/gaming",
          description: metadata.description,
          images: [
            {
              url: "https://thirdweb.com/assets/og-image/solanathon.jpg",
              width: 1200,
              height: 630,
              alt: "thirdweb gaming hackathon: January 16 - 31",
            },
          ],
        }}
      />
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

        <Box maxW="100vw" mt="-100px" pt="100px" overflowX="hidden">
          <HomepageSection id="header" topGradient>
            <Flex
              flexDir="column"
              align="center"
              gap={4}
              mt={{ base: 12, md: 24 }}
            >
              <Flex flexDir="column" gap={2}>
                <Heading size="title.xl" textAlign="center">
                  BUILD THE FUTURE OF GAMING
                </Heading>
                <Heading
                  bgImage="linear-gradient(128deg, #9945FF -9.03%, #14EE92 98.25%)"
                  bgClip="text"
                  size="display.lg"
                  textAlign="center"
                >
                  $100,000 in prizes
                </Heading>

                <LinkButton
                  href="https://thirdweb.typeform.com/to/jta0ye4M"
                  onClick={() =>
                    trackEvent({
                      category: "readyplayer3",
                      action: "click",
                      label: "register-now",
                    })
                  }
                  h="68px"
                  w={{ base: "100%", md: 96 }}
                  fontSize="20px"
                  leftIcon={<Icon as={ImMagicWand} />}
                  color="black"
                  flexShrink={0}
                  background="rgba(255,255,255,1)"
                  _hover={{
                    background: "rgba(255,255,255,0.9)!important",
                  }}
                  isExternal
                  noIcon
                  mx="auto"
                  mt={4}
                >
                  Register Now
                </LinkButton>

                <Heading size="title.xl" textAlign="center" mt={6}>
                  Jan 16th - Jan 31st
                </Heading>
              </Flex>

              <Timer date="2023-01-16T22:00:00" />
            </Flex>
          </HomepageSection>

          <HomepageSection>
            <Sponsors sponsors={sponsors} hackathonName="ready-player-3" />
          </HomepageSection>
          <Divider mt={16} />

          <HomepageSection mt={12}>
            <PrizeSection prizes={prizes} />
          </HomepageSection>

          <Judges />
          <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(20, 253, 169, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(100px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
            zIndex={0}
          />

          <Mentors />
          <HomepageSection>
            <ScheduleSection scheduleItems={scheduleItems} month="jan" />
          </HomepageSection>

          <HomepageSection mt={{ base: 12, md: 24 }}>
            <Resources />
          </HomepageSection>

          <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(20, 253, 169, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(100px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
          />

          <HomepageSection>
            <FaqSection />
          </HomepageSection>

          <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(20, 253, 169, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(100px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
          />
          {/* <HomepageSection my={{ base: 12, md: 24 }}>
            <SubmissionRequirements />
          </HomepageSection> */}
          <CTAFooter />
          <HomepageFooter />
        </Box>
      </Flex>
    </DarkMode>
  );
};

ReadyPlayer3Landing.pageId = PageId.ReadyPlayer3Landing;

export default ReadyPlayer3Landing;
