import { POOLTOGETHER_SUBGRAPH_URIS } from '@wooy/current-pool-data'

import { useEnvChainIds } from 'lib/hooks/chainId/useEnvChainIds'

/**
 * Returns the subgraph versions keyed by chain ids of the current app environment
 * @returns
 */
export const useSubgraphVersions = () => {
  const chainIds = useEnvChainIds()
  return chainIds.reduce((subgraphVersions, chainId) => {
    subgraphVersions[chainId] = Object.keys(POOLTOGETHER_SUBGRAPH_URIS[chainId])
    return subgraphVersions
  }, {})
}
