import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { getChain } from '@pooltogether/evm-chains-extended'
import { useOnboard } from '@wooy/bnc-onboard-hooks'

import { getNetworkNameAliasByChainId, NETWORK } from 'lib/utils/networks'

// TODO: Don't return until wallet is ready so we know if there will be a change
// then we won't fetch mainnet, throw it away and fetch what the wallet is connected to
export const useNetwork = () => {
  const router = useRouter()
  const { network: walletChainId } = useOnboard()

  return useMemo(
    () => getNetwork(router.query.poolAlias, router.query.networkName, walletChainId),
    [router?.query?.poolAlias, router?.query?.networkName, walletChainId]
  )
}

const getNetwork = (poolAlias, routerNetwork, walletChainId) => {
  let pool // const pool = POOL_ALIASES[poolAlias]

  let chainId
  if (pool) {
    chainId = pool.chainId
  } else if (routerNetwork) {
    chainId = NETWORK[routerNetwork]
  } else if (walletChainId) {
    chainId = walletChainId
  } else {
    chainId = NETWORK.mainnet
  }

  let networkData
  try {
    networkData = getChain(chainId)
  } catch (error) {}

  let networkName
  try {
    networkName = getNetworkNameAliasByChainId(chainId)
  } catch (e) {}

  return {
    ...networkData,
    networkName,
    walletMatchesNetwork: walletChainId ? chainId === walletChainId : null
  }
}
