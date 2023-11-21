import * as Types from '../../generated_types';

import { gql } from '@apollo/client';
import { CheckoutFragmentDoc } from '../../fragments/__generated__/Checkout.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckoutsByTitleFuzzyQueryVariables = Types.Exact<{
  titleQuery: Types.Scalars['String']['input'];
}>;


export type CheckoutsByTitleFuzzyQuery = { __typename?: 'query_root', checkout: Array<{ __typename?: 'checkout', id: any, owner_id: string, contract_address: string, contract_type: string, contract_chain: string, collection_title: string, collection_description?: string | null, image_url?: string | null, success_callback_url?: string | null, cancel_callback_url?: string | null, created_at: any, deleted_at: any, price: any, hide_native_mint: boolean, hide_pay_with_card: boolean, hide_pay_with_crypto: boolean, hide_pay_with_bank: boolean, hide_pay_with_ideal: boolean, hide_connect_paper_wallet: boolean, hide_connect_external_wallet: boolean, mint_abi_function_name?: string | null, custom_abi: any, listing_id?: string | null, pack_id?: string | null, pack_address?: string | null, bundle_address?: string | null, brand_dark_mode: boolean, brand_button_shape: string, brand_color_scheme: string, token_id?: string | null, webhook_urls: any, float_wallet_addresses: any, require_verified_email: boolean, has_public_link: boolean, limit_per_wallet_address?: number | null, limit_per_transaction: number, card_payments_vendor?: string | null, redirect_after_payment: boolean, should_send_transfer_completed_email: boolean, seller_twitter_handle?: string | null, use_paper_access_key: boolean, generated_by_registered_contract: boolean, registered_contract_id?: any | null, contract_args?: any | null, post_purchase_message_markdown?: string | null, post_purchase_button_text?: string | null, sponsored_fees: boolean, thirdweb_client_id?: string | null, seller: { __typename?: 'seller', id: string, twitter_handle?: string | null, service_fee_bps: number, support_email?: string | null, email_display_name?: string | null, company_name?: string | null, company_logo_url?: string | null, fee_bearer: string, default_float_wallets?: any | null, deposit_amount_usd_cents?: number | null, has_production_access?: boolean | null, is_trusted?: boolean | null } }> };


export const CheckoutsByTitleFuzzyDocument = gql`
    query CheckoutsByTitleFuzzy($titleQuery: String!) {
  checkout(
    where: {collection_title: {_ilike: $titleQuery}, deleted_at: {_gt: "now()"}}
  ) {
    ...Checkout
  }
}
    ${CheckoutFragmentDoc}`;

/**
 * __useCheckoutsByTitleFuzzyQuery__
 *
 * To run a query within a React component, call `useCheckoutsByTitleFuzzyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutsByTitleFuzzyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutsByTitleFuzzyQuery({
 *   variables: {
 *      titleQuery: // value for 'titleQuery'
 *   },
 * });
 */
export function useCheckoutsByTitleFuzzyQuery(baseOptions: Apollo.QueryHookOptions<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>(CheckoutsByTitleFuzzyDocument, options);
      }
export function useCheckoutsByTitleFuzzyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>(CheckoutsByTitleFuzzyDocument, options);
        }
export function useCheckoutsByTitleFuzzySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>(CheckoutsByTitleFuzzyDocument, options);
        }
export type CheckoutsByTitleFuzzyQueryHookResult = ReturnType<typeof useCheckoutsByTitleFuzzyQuery>;
export type CheckoutsByTitleFuzzyLazyQueryHookResult = ReturnType<typeof useCheckoutsByTitleFuzzyLazyQuery>;
export type CheckoutsByTitleFuzzySuspenseQueryHookResult = ReturnType<typeof useCheckoutsByTitleFuzzySuspenseQuery>;
export type CheckoutsByTitleFuzzyQueryResult = Apollo.QueryResult<CheckoutsByTitleFuzzyQuery, CheckoutsByTitleFuzzyQueryVariables>;