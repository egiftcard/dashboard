// here for backwards compat: page moved to pages/settings/api-keys
import { GetServerSideProps } from "next";

export default function page() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/settings/api-keys",
      permanent: true,
    },
  };
};
