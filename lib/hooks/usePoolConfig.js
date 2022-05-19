import { PoolsConfigContext } from 'lib/components/contextProviders/PoolsConfigContextProvider'
import { useContext } from 'react'

export function usePoolConfig(pool) {
    const poolAddress = pool?.contract?.prizePool?.address
    const poolChainId = pool?.chainId
    const networks = useContext(PoolsConfigContext).networks

    const networkFound = networks.find(networkRecord => networkRecord?.chainId == poolChainId);
    return networkFound?.pools.find(
        (poolRecord) => poolRecord?.address.toLowerCase() == poolAddress.toLowerCase()
    )
}