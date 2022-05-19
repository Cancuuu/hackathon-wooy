import { PRIZE_POOL_TYPES } from '@wooy/current-pool-data'
import { KNOWN_YIELD_SOURCES } from 'lib/constants/customYieldSourceImages'

export const useIsPoolYieldSourceKnown = (pool) =>
  pool.prizePool.type === PRIZE_POOL_TYPES.genericYield &&
  KNOWN_YIELD_SOURCES[pool.chainId]?.includes(pool.prizePool.yieldSource.address)
