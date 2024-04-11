import {
	Code,
	Divider,
	Flex,
	Icon,
	useClipboard,
	useToast,
} from "@chakra-ui/react";
import type { TransactionError } from "@thirdweb-dev/sdk";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { FiAlertTriangle, FiCheck, FiCopy, FiHelpCircle } from "react-icons/fi";
import { Button, Drawer, Heading, LinkButton, Text } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import type { ComponentWithChildren } from "types/component-with-children";
import { parseErrorToMessage } from "utils/errorParser";

interface ErrorContext {
	onError: (error: unknown, errorTitle?: string) => void;
	dismissError: () => void;
}

const ErrorContext = createContext<ErrorContext>({
	onError: () => undefined,
	dismissError: () => undefined,
});

type EnhancedTransactionError = TransactionError & {
	title: string;
};

export const ErrorProvider: ComponentWithChildren = ({ children }) => {
	const toast = useToast();
	const [currentError, setCurrentError] = useState<EnhancedTransactionError>();
	const dismissError = useCallback(() => setCurrentError(undefined), []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: `toast` is stable
	const onError = useCallback((err: unknown, title = "An error occurred") => {
		if (isTransactionError(err)) {
			(err as any).title = title;
			setCurrentError(err as EnhancedTransactionError);
		} else {
			toast({
				position: "bottom",
				variant: "solid",
				title,
				description: parseErrorToMessage(err),
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	}, []);

	const { onCopy, hasCopied, setValue } = useClipboard(
		currentError?.message || "",
	);

	useEffect(() => {
		if (currentError?.message) {
			setValue(currentError?.message);
		}
	}, [currentError?.message, setValue]);

	return (
		<>
			<Drawer size="md" isOpen={!!currentError} onClose={dismissError}>
				<Flex direction="column" gap={4}>
					<Flex direction="row" gap={1} align="center">
						<Icon boxSize={5} as={FiAlertTriangle} color="red.500" />
						<Heading size="subtitle.md">
							Error: Failed to send transaction
						</Heading>
					</Flex>
					<Flex direction="column" gap={2}>
						<Heading size="label.md">From</Heading>
						<AddressCopyButton
							title="error"
							address={currentError?.info?.from}
						/>
					</Flex>
					<Flex direction="column" gap={2}>
						<Heading size="label.md">To</Heading>
						<AddressCopyButton title="error" address={currentError?.info?.to} />
					</Flex>
					<Flex direction="column" gap={2}>
						<Heading size="label.md">Chain / Chain ID</Heading>
						<Text>
							{currentError?.info.network.name} (
							{currentError?.info.network.chainId})
						</Text>
					</Flex>
					<Flex direction="column" gap={2}>
						<Heading size="label.md">Root cause</Heading>
						<Code px={4} py={2} borderRadius="md" whiteSpace="pre-wrap">
							{currentError?.reason}
						</Code>
					</Flex>
					<Divider my={2} borderColor="borderColor" />
					<Heading size="subtitle.md">Need help with this error?</Heading>
					<LinkButton
						colorScheme="primary"
						isExternal
						noIcon
						href="/support"
						leftIcon={<Icon boxSize="1rem" as={FiHelpCircle} />}
					>
						Visit our support site
					</LinkButton>
					<Button
						onClick={onCopy}
						leftIcon={<Icon boxSize={3} as={hasCopied ? FiCheck : FiCopy} />}
					>
						{hasCopied ? "Copied!" : "Copy error to clipboard"}
					</Button>
					<Text fontStyle="italic">
						Copying the error message will let you report this error with all
						its details to our team.
					</Text>
				</Flex>
			</Drawer>

			<ErrorContext.Provider
				value={{
					onError,
					dismissError,
				}}
			>
				{children}
			</ErrorContext.Provider>
		</>
	);
};

export function useErrorHandler() {
	return useContext(ErrorContext);
}

function isTransactionError(error: unknown): error is TransactionError {
	return error instanceof Object && "reason" in error && "info" in error;
}
