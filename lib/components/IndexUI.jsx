import React from 'react'

import { Meta } from 'lib/components/Meta'
import { useTranslation } from 'react-i18next'
import { PoolLists } from 'lib/components/PoolLists'
import { RetroactivePoolClaimBanner } from 'lib/components/RetroactivePoolClaimBanner'
import { MainBanner } from 'lib/components/MainBanner'

export const IndexUI = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <Meta title={t('pools')} />

      <MainBanner />
      
      <RetroactivePoolClaimBanner />

      <PoolLists />
    </>
  )
}
