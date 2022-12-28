import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { ReactNode } from "react";
import { Heading, Link, Text } from "tw-components";

interface FeatureCardProps {
  title: string;
  description: ReactNode;
  img: string;
  gradient: string;
}

const features: FeatureCardProps[] = [
  {
    title: "01 Build.",
    gradient: "linear-gradient(90deg, #8877f1, #7AA8D2)",
    description: (
      <>
        Integrate web3 into your apps and games easily with our{" "}
        <Link color="white" isExternal href="https://portal.thirdweb.com/sdk">
          SDKs
        </Link>
        . Explore{" "}
        <Link color="white" isExternal href="https://thirdweb.com/explore">
          ready-to-deploy contracts
        </Link>{" "}
        or build your own contract with our{" "}
        <Link
          color="white"
          isExternal
          href="https://portal.thirdweb.com/contractkit"
        >
          ContractKit
        </Link>
        .
      </>
    ),
    img: "/assets/landingpage/icons/Build.svg",
  },

  {
    title: "02 Launch.",
    gradient: "linear-gradient(90deg, #F5BC91, #E386E9)",
    description: (
      <>
        Ship your contracts on-chain with{" "}
        <Link
          color="white"
          isExternal
          href="https://portal.thirdweb.com/deploy"
        >
          Deploy
        </Link>
        , a simple deployment workflow for teams. Publish contracts with{" "}
        <Link
          color="white"
          isExternal
          href="https://portal.thirdweb.com/release"
        >
          Release
        </Link>{" "}
        and be discovered by global web3 devs.
      </>
    ),
    img: "/assets/landingpage/icons/Launch.svg",
  },

  {
    title: "03 Manage.",
    gradient: "linear-gradient(90deg, #DF85CD, #5F63E3)",
    description: (
      <>
        Monitor, interact and configure your contracts directly from the{" "}
        <Link color="white" isExternal href="https://thirdweb.com/dashboard">
          Dashboard
        </Link>
        . Invite your team to collaborate and control their access with
        permissions.
      </>
    ),
    img: "/assets/landingpage/icons/Manage.svg",
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  img,
  gradient,
}) => {
  return (
    <Box
      zIndex={10}
      as="section"
      background="rgba(0,0,0,0.6)"
      px={10}
      py={12}
      borderRadius="8px"
    >
      <Image src={img} alt="" width={10} mb={12} />
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
    </Box>
  );
};

export const KeyFeatures: React.FC = () => {
  return (
    <HomepageSection
      py={24}
      middleGradient
      gradientOpacity={{ base: 1, md: 0.5 }}
    >
      <Heading as="h3" size="display.sm" mb={24} textAlign="center">
        <Box
          as="span"
          bgGradient="linear-gradient(270.45deg, #ECC4FF 11.79%, #88B7FF 88.06%)"
          bgClip="text"
        >
          Building for web3
        </Box>
        <br />
        has never been easier.
      </Heading>
      <SimpleGrid columns={{ md: 3, base: 1 }} gap={6}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </SimpleGrid>
    </HomepageSection>
  );
};
