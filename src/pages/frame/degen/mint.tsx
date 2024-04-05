import { useEffect } from "react";
import Head from "next/head";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const title = "Certified Degen NFT";
const description = "Mint Certified Degen NFT using thirdweb engine";

const ogImageUrl = `${getAbsoluteUrl()}/assets/og-image/degen-enchine-frame.png`;

const BaseFramePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://frames.thirdweb.com/mint");
  }, [router]);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content={ogImageUrl} />
        <meta property="fc:frame:button:1" content="Claim NFT on Degen Chain" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta
          property="fc:frame:button:1:target"
          content={`${getAbsoluteUrl()}/api/frame/degen/mint?action=mint`}
        />
      </Head>
    </>
  );
};

export default BaseFramePage;
