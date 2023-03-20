import { Flex, Input, Select, SelectProps } from "@chakra-ui/react";
import { useSDKChainId } from "@thirdweb-dev/react";
import { CURRENCIES, CurrencyMetadata } from "constants/currencies";
import { constants, utils } from "ethers";
import React, { useMemo, useState } from "react";
import { Button } from "tw-components";
import { OtherAddressZero } from "utils/zeroAddress";

interface CurrencySelectorProps extends SelectProps {
  value: string;
  small?: boolean;
  hideDefaultCurrencies?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
  small,
  hideDefaultCurrencies,
  ...props
}) => {
  const chainId = useSDKChainId() as number;
  const [isAddingCurrency, setIsAddingCurrency] = useState(false);
  const [editCustomCurrency, setEditCustomCurrency] = useState("");
  const [customCurrency, setCustomCurrency] = useState("");
  const [initialValue] = useState(value);

  const isCustomCurrency: boolean = useMemo(() => {
    if (initialValue && chainId && initialValue !== customCurrency) {
      if (chainId in CURRENCIES) {
        return !CURRENCIES[chainId]?.find(
          (currency: CurrencyMetadata) =>
            currency.address.toLowerCase() === initialValue.toLowerCase(),
        );
      }

      // for non-default chains
      return true;
    }

    return false;
  }, [chainId, customCurrency, initialValue]);

  const currencyOptions: CurrencyMetadata[] =
    CURRENCIES[chainId]?.filter(
      (currency: CurrencyMetadata) =>
        currency.address.toLowerCase() !== constants.AddressZero.toLowerCase(),
    ) || [];

  const addCustomCurrency = () => {
    if (!utils.isAddress(editCustomCurrency)) {
      return;
    }
    if (editCustomCurrency) {
      setCustomCurrency(editCustomCurrency);
      if (onChange) {
        onChange({
          target: { value: editCustomCurrency },
        } as any);
      }
    } else {
      setEditCustomCurrency(customCurrency);
    }

    setIsAddingCurrency(false);
    setEditCustomCurrency("");
  };

  if (isAddingCurrency && !hideDefaultCurrencies) {
    return (
      <Flex direction="column">
        <Flex align="center">
          <Button
            borderRadius="4px 0px 0px 4px"
            colorScheme="primary"
            onClick={() => setIsAddingCurrency(false)}
          >
            {"<-"}
          </Button>
          <Input
            w="auto"
            isRequired
            placeholder="ERC20 Address"
            borderRadius="none"
            value={editCustomCurrency}
            onChange={(e) => setEditCustomCurrency(e.target.value)}
          />
          <Button
            borderRadius="0px 4px 4px 0px"
            colorScheme="primary"
            onClick={addCustomCurrency}
            isDisabled={!utils.isAddress(editCustomCurrency)}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" mt={small && !hideDefaultCurrencies ? 5 : 0}>
      <Select
        position="relative"
        value={
          value?.toLowerCase() === constants.AddressZero.toLowerCase()
            ? OtherAddressZero.toLowerCase()
            : value?.toLowerCase()
        }
        onChange={(e) => {
          if (e.target.value === "custom") {
            setIsAddingCurrency(true);
          } else {
            onChange?.(e);
          }
        }}
        placeholder="Select Currency"
        {...props}
      >
        {chainId &&
          !hideDefaultCurrencies &&
          currencyOptions.map((currency: CurrencyMetadata) => (
            <option
              key={currency.address}
              value={currency.address.toLowerCase()}
            >
              {currency.symbol} ({currency.name})
            </option>
          ))}
        {isCustomCurrency && (
          <option key={initialValue} value={initialValue.toLowerCase()}>
            {initialValue}
          </option>
        )}
        {customCurrency && (
          <option key={customCurrency} value={customCurrency.toLowerCase()}>
            {customCurrency}
          </option>
        )}
        {!hideDefaultCurrencies && <option value="custom">Custom ERC20</option>}
      </Select>
    </Flex>
  );
};
