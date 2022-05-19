import { useIsTestnets } from '@wooy/hooks'
import { NETWORK } from '@wooy/utilities'

/**
 * Returns the single chainId relevant for fetching chain data about the POOL token.
 */
export const usePoolTokenChainId = () => {
  const { isTestnets } = useIsTestnets()
  return isTestnets ? NETWORK.rinkeby : NETWORK.mainnet
}
