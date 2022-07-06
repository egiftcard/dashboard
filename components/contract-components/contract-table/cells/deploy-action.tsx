import { useContractPublishMetadataFromURI } from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { ButtonGroup, Icon, Tooltip, useDisclosure } from "@chakra-ui/react";
import { ContractDeployForm } from "components/contract-components/contract-deploy-form";
import { isContractIdBuiltInContract } from "components/contract-components/utils";
import { BuiltinContractMap } from "constants/mappings";
import { useTrack } from "hooks/analytics/useTrack";
import { BsShieldFillCheck } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { Button, Drawer, LinkButton, TrackedIconButton } from "tw-components";

export const ContractDeployActionCell: React.FC<
  DeployableContractContractCellProps
> = ({ cell: { value } }, release) => {
  const publishMetadata = useContractPublishMetadataFromURI(value);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { trackEvent } = useTrack();

  const audit =
    BuiltinContractMap[value as keyof typeof BuiltinContractMap]?.audit;

  return (
    <>
      <Drawer size="xl" isOpen={isOpen} onClose={onClose}>
        <ContractDeployForm contractId={value} />
      </Drawer>

      <ButtonGroup size="sm">
        {audit && (
          <Tooltip label="Audited Contract" borderRadius="lg" placement="top">
            <TrackedIconButton
              as={LinkButton}
              noIcon
              isExternal
              href={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/${audit}`}
              category="deploy"
              label="audited"
              aria-label="Audited contract"
              colorScheme="green"
              variant="outline"
              borderWidth="2px"
              icon={<Icon as={BsShieldFillCheck} boxSize={4} />}
              onClick={() =>
                trackEvent({
                  category: "visit-audit",
                  action: "click",
                  label: value,
                })
              }
            />
          </Tooltip>
        )}
        {isContractIdBuiltInContract(value) ? (
          <>
            {!publishMetadata.data?.deployDisabled && (
              <LinkButton
                variant="outline"
                isExternal
                href={`https://portal.thirdweb.com/pre-built-contracts/${value}`}
                onClick={() =>
                  trackEvent({
                    category: "learn-more-deploy",
                    action: "click",
                    label: value,
                  })
                }
              >
                Learn more
              </LinkButton>
            )}
            <Button
              isDisabled={publishMetadata.data?.deployDisabled}
              onClick={onOpen}
              isLoading={publishMetadata.isLoading}
              colorScheme="purple"
              variant={
                publishMetadata.data?.deployDisabled ? "outline" : "solid"
              }
              rightIcon={
                !publishMetadata.data?.deployDisabled ? (
                  <Icon as={IoRocketOutline} />
                ) : undefined
              }
            >
              {publishMetadata.data?.deployDisabled
                ? "Coming Soon"
                : "Deploy Now"}
            </Button>
          </>
        ) : (
          <LinkButton
            isDisabled={publishMetadata.data?.deployDisabled}
            isLoading={publishMetadata.isLoading}
            colorScheme="purple"
            rightIcon={<Icon as={FiArrowRight} />}
            href={`/contracts/${
              release ? "release" : "deploy"
            }/${encodeURIComponent(value)}`}
          >
            {release ? "Release" : "Deploy"}
          </LinkButton>
        )}
      </ButtonGroup>
    </>
  );
};
