import React from 'react'
import { ethers } from 'ethers'
import { useAllPools } from '@wooy/hooks'

import { useTranslation } from 'react-i18next'

import { displayAmountInEther } from 'lib/utils/displayAmountInEther'
import { normalizeTo18Decimals } from 'lib/utils/normalizeTo18Decimals'

export const AllPoolsTotalAwarded = (props) => {
  const { t } = useTranslation()

  const { data: pools } = useAllPools()

  let cumulativePrizeNetAllPools = ethers.BigNumber.from(0)
  pools?.forEach((_pool) => {
    const cumulativePrizeNet = _pool.prize.cumulativePrizeNet
    if (cumulativePrizeNet) {
      const decimals = _pool.tokens.underlyingToken.decimals
      const cumulativePrizeNetForPool = normalizeTo18Decimals(cumulativePrizeNet, decimals)
      cumulativePrizeNetAllPools = cumulativePrizeNetAllPools.add(cumulativePrizeNetForPool)
    }
  })

  return (
    <>
      <h4>
        {t('totalAwardedForAllPools')}{' '}
        <span className='text-flashy'>
          ${displayAmountInEther(cumulativePrizeNetAllPools, { decimals: 18, precision: 2 })}
        </span>
      </h4>
    </>
  )
}
