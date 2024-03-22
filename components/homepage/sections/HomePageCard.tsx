import { Container, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { ButtonProps, Heading, Text, TrackedLinkButton } from "tw-components";

interface HomePageCardProps {
  title: string;
  description: string;
  miniImage: StaticImageData;
  miniTitle: string;
  ctaLink: string;
  ctaText: string;
  contactUsButtonMaxWidth?: ButtonProps["maxWidth"];
  customContactUsComponent?: ReactNode;
  contactUsText?: string;
  contactUsLink?: string;
  image: StaticImageData;
  mobileImage?: StaticImageData;
  TRACKING_CATEGORY: string;
}

const HomePageCard = ({
  title,
  description,
  miniImage,
  miniTitle,
  image,
  mobileImage,
  ctaLink,
  contactUsButtonMaxWidth,
  customContactUsComponent,
  contactUsText,
  contactUsLink,
  ctaText,
  TRACKING_CATEGORY,
}: HomePageCardProps) => {
  return (
    <Container
      position="relative"
      maxW={"container.page"}
      mt={20}
      mb={{ base: 12, md: 40 }}
      zIndex={10}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 12, md: 8 }}
        mt={{ base: 4, md: 28 }}
        flexDirection={"column-reverse"}
      >
        <Flex
          flexDir="column"
          gap={{ base: 6, md: 8 }}
          w={"100%"}
          maxW={{ base: "100%", md: "100%" }}
          order={{ base: 2, md: 1 }}
        >
          <Flex flexDir="column" gap={4}>
            <Flex gap="12px" alignItems="center">
              <ChakraNextImage
                height="28px"
                width="28px"
                src={miniImage}
                alt=""
              />

              <Flex flexDir="column">
                <Text fontSize="16px" fontWeight={600} color="#fff">
                  {miniTitle}
                </Text>
              </Flex>
            </Flex>
            <Heading
              as="h1"
              fontWeight={800}
              fontSize={{ base: "36px", md: "45px" }}
            >
              {title}
            </Heading>
          </Flex>
          <Text size="body.xl" mr={6}>
            {description}
          </Text>

          <Flex alignItems="center" gap="16px">
            <TrackedLinkButton
              py={6}
              px={8}
              bgColor="white"
              _hover={{
                bgColor: "white",
                opacity: 0.8,
              }}
              color="black"
              href={ctaLink}
              category={TRACKING_CATEGORY}
              label={ctaText.replaceAll(" ", "-").toLowerCase()}
              fontWeight="bold"
              maxW="190px"
              leftIcon={<Icon as={BsFillLightningChargeFill} boxSize={4} />}
            >
              {ctaText}
            </TrackedLinkButton>

            {contactUsLink && contactUsText && (
              <TrackedLinkButton
                py={6}
                px={8}
                variant="outline"
                maxW={contactUsButtonMaxWidth}
                href={contactUsLink}
                category={TRACKING_CATEGORY}
                label={contactUsText.replaceAll(" ", "-").toLowerCase()}
                fontWeight="bold"
                w="full"
              >
                {contactUsText}
              </TrackedLinkButton>
            )}

            {customContactUsComponent && customContactUsComponent}
          </Flex>

          {/*   <Text
            fontSize={"14px"}
            color={"#646D7A"}
            fontWeight={600}
            letterSpacing={"1.4px"}
          >
            TRUSTED BY
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="50px">
            {partnersImages.map((img, idx) => {
              return <ChakraNextImage key={idx} src={img} alt="" />;
            })}
          </SimpleGrid> */}
        </Flex>

        <Flex
          flexDir={"column"}
          alignItems={{ base: "center", md: "flex-end" }}
          order={{ base: 1, md: 2 }}
        >
          <LandingDesktopMobileImage
            w="full"
            maxW={"446px"}
            image={image}
            mobileImage={mobileImage}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default HomePageCard;
