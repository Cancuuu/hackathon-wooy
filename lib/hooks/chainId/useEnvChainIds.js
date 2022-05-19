import { useIsTestnets } from '@wooy/hooks'
import { NETWORK } from '@wooy/utilities'

export const CHAIN_IDS_BY_APP_ENV = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon],
  testnets: [NETWORK.rinkeby, NETWORK.mumbai]
})

/**
 * Returns the list of chainIds relevant for the current app state
 * @returns
 */
export const useEnvChainIds = () => {
  const { isTestnets } = useIsTestnets()
  return isTestnets ? CHAIN_IDS_BY_APP_ENV['testnets'] : CHAIN_IDS_BY_APP_ENV['mainnets']
}
