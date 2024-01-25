import { Box, Container, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import { useParallaxEffect } from "hooks/effect/useParallexEffect";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "tw-components";

const OverviewSection = () => {
  const parallaxOffset = useParallaxEffect(0.2);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      mt={40}
      flexDir={{ base: "column", "2xl": "row" }}
      gap={{ base: "80px", "2xl": 0 }}
    >
      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/parallax-left.png")}
        mobileImage={require("public/assets/landingpage/mobile/parallax-left.png")}
        alt="parallax-one"
        maxW={{ base: "100%", "2xl": "512px" }}
        transform={{
          base: "auto",
          "2xl": `translateY(${parallaxOffset - 300}px)`,
        }}
      />

      <Container
        as={Flex}
        flexDir="column"
        maxW="container.page"
        alignItems="center"
        position="relative"
        zIndex={5}
      >
        <Text size="body.xl" textAlign="center" maxW={540} color="#fff">
          <Text as="span" size="body.xl" fontWeight="bold" color="#fff">
            Over 70,000 web3 developers
          </Text>
          &nbsp;trust thirdweb to build web3 apps and games. thirdweb&apos;s
          tools are designed to help developers build apps and experiences which
          are seamless for users and abstract away the blockchain.
        </Text>
      </Container>

      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/parallax-right.png")}
        mobileImage={require("public/assets/landingpage/mobile/parallax-right.png")}
        alt="parallax-one"
        maxW={{ base: "100%", "2xl": "512px" }}
        transform={{
          base: "auto",
          "2xl": `translateY(${parallaxOffset - 300}px)`,
        }}
      />
    </Flex>
  );
};

export default OverviewSection;
