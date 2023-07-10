import { Box, DarkMode, Flex } from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { NextSeo, NextSeoProps } from "next-seo";
import { ComponentWithChildren } from "types/component-with-children";

interface LandingLayoutProps {
  seo: NextSeoProps;
}

export const LandingLayout: ComponentWithChildren<LandingLayoutProps> = ({
  seo,
  children,
}) => {
  return (
    <DarkMode>
      <NextSeo {...seo} />
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
        {/* pull it up by as much as the topnav is tall */}
        <Box mt="-80px" overflowX="hidden" py={{ base: "120px", md: "80px" }}>
          {children}
        </Box>
        <NewsletterSection />
        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};
