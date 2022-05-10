import { LandingMenu } from "./LandingMenu";
import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Logo } from "components/logo";
import { useTrack } from "hooks/analytics/useTrack";
import React, { useCallback, useState } from "react";
import { SiDiscord, SiGithub, SiTwitter } from "react-icons/si";
import { Button, LinkButton, NextLink } from "tw-components";

export const HomepageTopNav: React.FC<{}> = () => {
  const { trackEvent } = useTrack();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolled, setIsScrolled] = useState(false);
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < -5) {
        setIsScrolled(true);
      } else if (currPos.y >= -5) {
        setIsScrolled(false);
      }
    },
    [isMobile],
    undefined,
    false,
    33,
  );

  const scrollToId = useCallback(
    (id: string) => {
      if (document) {
        trackEvent({ category: "topnav", action: "click", label: id });
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    [trackEvent],
  );

  return (
    <>
      <Box
        transition="all 100ms ease"
        position="fixed"
        top={0}
        left={0}
        w="100%"
        zIndex="overlay"
        as="header"
        boxShadow={isScrolled ? "md" : undefined}
        bg={isScrolled ? "backgroundDark" : "transparent"}
      >
        <Container
          as={Flex}
          py={4}
          maxW="container.page"
          justify="space-between"
          align="center"
          flexDir="row"
        >
          <Link onClick={() => scrollToId("home")}>
            <Logo color="#fff" />
          </Link>
          <Stack
            display={["none", "none", "flex"]}
            direction="row"
            alignItems="center"
            color="gray.50"
            fontWeight="bold"
            spacing={10}
            as="nav"
          >
            <Link onClick={() => scrollToId("features")}>Features</Link>
            <Link onClick={() => scrollToId("developers")}>Developers</Link>
            <Link onClick={() => scrollToId("fees")}>Pricing</Link>
            <NextLink
              href="https://portal.thirdweb.com/guides"
              variant="link"
              color="inherit"
              fontWeight="inherit"
              textDecoration={undefined}
              isExternal
            >
              Developer Portal
            </NextLink>
            <Flex
              display={{ base: "none", lg: "flex" }}
              direction="row"
              align="center"
            >
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://twitter.com/thirdweb_"
                color="gray.50"
                bg="transparent"
                aria-label="twitter"
                icon={<Icon boxSize="1rem" as={SiTwitter} />}
                onClick={() =>
                  trackEvent({
                    category: "topnav",
                    action: "click",
                    label: "twitter",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://discord.gg/thirdweb"
                bg="transparent"
                color="gray.50"
                aria-label="discord"
                icon={<Icon boxSize="1rem" as={SiDiscord} />}
                onClick={() =>
                  trackEvent({
                    category: "topnav",
                    action: "click",
                    label: "discord",
                  })
                }
              />
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href="https://github.com/thirdweb-dev"
                bg="transparent"
                color="gray.50"
                aria-label="github"
                icon={<Icon boxSize="1rem" as={SiGithub} />}
                onClick={() =>
                  trackEvent({
                    category: "topnav",
                    action: "click",
                    label: "github",
                  })
                }
              />
            </Flex>
          </Stack>
          <Button colorScheme="primary" variant="outline">
            Start building
          </Button>
          {isMobile ? <LandingMenu /> : null}
        </Container>
      </Box>
      <Box h="35px" w="100%" display={["block", "block", "none"]} />
    </>
  );
};
