import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { Heading, Link, Text } from "tw-components";

interface SolutionCardProps {
  title: string;
  description: string;
  img: string;
  gradient: string;
  partnerIcon: string;
  arrowIcon: string;
  href: string;
}

const solutions: SolutionCardProps[] = [
  {
    title: "GamingKit",
    gradient: "linear-gradient(90deg, #A79AF9, #7AA8D2)",
    description:
      "Integrate web3 into your apps and games easily with our SDKs. Explore ready-to-deploy contracts or build your own contract with our ContractKit.",
    img: "/assets/landingpage/GamingKit.png",
    partnerIcon: "/assets/landingpage/icons/Coinbase.svg",
    arrowIcon: "/assets/landingpage/icons/arrow-blue.svg",
    href: "/solutions/gaming",
  },
  {
    title: "CommerceKit",
    gradient: "linear-gradient(90deg, #E8B3E0, #A45B99)",
    description:
      "Integrate web3 into your apps and games easily with our SDKs. Explore ready-to-deploy contracts or build your own contract with our ContractKit.",
    img: "/assets/landingpage/CommerceKit.png",
    partnerIcon: "/assets/landingpage/icons/Shopify.svg",
    arrowIcon: "/assets/landingpage/icons/arrow-pink.svg",
    href: "/solutions/commerce",
  },
];

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  img,
  gradient,
  partnerIcon,
  arrowIcon,
  href,
}) => {
  return (
    <Box
      overflow="hidden"
      zIndex={10}
      as="section"
      background="rgba(0,0,0,0.7)"
      borderRadius="8px"
    >
      <Image
        src={img}
        alt=""
        width="100%"
        height={{ lg: 250, base: 180 }}
        objectFit="cover"
      />
      <Box p={{ base: 6, lg: 12 }} py={{ base: 10 }}>
        <Heading
          as="h3"
          fontSize="24px"
          mb={6}
          bgGradient={gradient}
          bgClip="text"
        >
          {title}
        </Heading>
        <Text size="body.lg" lineHeight={1.7}>
          {description}
        </Text>
        <Flex alignItems="center" gap={2} mt={10}>
          <Text lineHeight={1}>In partnership with</Text>
          <Image src={partnerIcon} alt="" width={100} />
          <Link href={href} ml="auto" isExternal>
            <Image src={arrowIcon} alt="" width={8} />
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export const SolutionsSection: React.FC = () => {
  return (
    <HomepageSection
      py={24}
      middleGradient
      gradientOpacity={{ base: 1, md: 0.5 }}
    >
      <Heading as="h3" size="display.sm" mb={6} textAlign="center">
        Explore{" "}
        <Box
          as="span"
          bgGradient="linear-gradient(270.45deg, #ECC4FF 11.79%, #88B7FF 88.06%)"
          bgClip="text"
        >
          solutions.
        </Box>
      </Heading>
      <Text textAlign="center" size="body.lg" mb={12}>
        Thirdweb powers the best web3 projects across verticals
      </Text>
      <SimpleGrid
        columns={{ md: 2, base: 1 }}
        gap={6}
        maxW={1000}
        margin="0 auto"
      >
        {solutions.map((feature) => (
          <SolutionCard key={feature.title} {...feature} />
        ))}
      </SimpleGrid>
    </HomepageSection>
  );
};
