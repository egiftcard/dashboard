import { paymentsKeys } from "@3rdweb-sdk/react/cache-keys";
import {
  usePaymentsEnabledContracts,
  usePaymentsRegisterContract,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useChainSlug } from "hooks/chains/chainSlug";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Button } from "tw-components";

interface EnablePaymentsButtonProps {
  contractAddress: string;
  chainId: number;
}

export const EnablePaymentsButton: React.FC<EnablePaymentsButtonProps> = ({
  contractAddress,
  chainId,
}) => {
  const { mutate: registerContract } = usePaymentsRegisterContract();
  const { data: paymentEnabledContracts } = usePaymentsEnabledContracts();
  const queryClient = useQueryClient();
  const address = useAddress();

  const contractIsEnabled = useMemo(() => {
    return paymentEnabledContracts?.some(
      (contract) =>
        contract.address.toLowerCase() === contractAddress.toLowerCase(),
    );
  }, [paymentEnabledContracts, contractAddress]);

  const router = useRouter();
  const trackEvent = useTrack();
  const chainSlug = useChainSlug(chainId);

  const { onSuccess, onError } = useTxNotifications(
    "Successfully enabled payments",
    "Failed to enable payments",
  );

  return (
    <Flex justifyContent="end">
      {contractIsEnabled ? (
        <Button colorScheme="blackAlpha" size="sm" isDisabled w="full">
          Payments Enabled
        </Button>
      ) : (
        <Button
          colorScheme="blackAlpha"
          size="sm"
          onClick={() => {
            trackEvent({
              category: "payments",
              action: "enable-payments",
              label: "attempt",
            });
            registerContract(
              {
                chain: `${chainId}`,
                contractAddress,
              },
              {
                onSuccess: () => {
                  trackEvent({
                    category: "payments",
                    action: "enable-payments",
                    label: "success",
                  });
                  queryClient.invalidateQueries(
                    paymentsKeys.contracts(address as string),
                  );
                  router.push(
                    `/${chainSlug}/${contractAddress}/payments`,
                    undefined,
                    { scroll: true },
                  );
                  onSuccess();
                },
                onError: (error) => {
                  trackEvent({
                    category: "payments",
                    action: "enable-payments",
                    label: "error",
                    error,
                  });
                  onError(error);
                },
              },
            );
          }}
          px={6}
          w="full"
        >
          Enable Payments
        </Button>
      )}
    </Flex>
  );
};
