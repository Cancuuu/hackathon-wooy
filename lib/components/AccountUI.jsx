import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { atom, useAtom } from 'jotai'
import { useOnboard } from '@wooy/bnc-onboard-hooks'
import { Trans, useTranslation } from 'react-i18next'
import { PageTitleAndBreadcrumbs } from '@wooy/react-components'
import Link from 'next/link'

import { AccountSummary } from 'lib/components/AccountSummary'
import { AccountDeposits } from 'lib/components/AccountDeposits'
import { AccountWinnings } from 'lib/components/AccountWinnings'
import { AccountLootBoxes } from 'lib/components/AccountLootBoxes'
import { Meta } from 'lib/components/Meta'
import { PlayerLabel } from 'lib/components/PlayerLabel'
import { RetroactivePoolClaimBanner } from 'lib/components/RetroactivePoolClaimBanner'
import { testAddress } from 'lib/utils/testAddress'

export const isSelfAtom = atom(false)

export const AccountUI = () => {
  const { t } = useTranslation()

  const { address: usersAddress } = useOnboard()

  const router = useRouter()
  const playerAddress = router?.query?.playerAddress
  const address = playerAddress || usersAddress

  const [isSelf, setIsSelf] = useAtom(isSelfAtom)

  useEffect(() => {
    const addressMatches = usersAddress?.toLowerCase() === playerAddress?.toLowerCase()
    let isSelf = playerAddress ? addressMatches : router?.pathname === '/account'
    setIsSelf(isSelf)
  }, [playerAddress, usersAddress])

  const pageTitle = isSelf ? (
    t('myAccount')
  ) : (
    <Trans
      i18nKey='playerAddressWithLabel'
      defaults='Player <label>{{address}}</label>'
      components={{
        label: (
          <PlayerLabel
            id={`tooltip-playerLabel-${playerAddress}-accountUi`}
            playerAddress={playerAddress}
          />
        ),
        address: playerAddress
      }}
    />
  )

  const addressError = testAddress(address)

  return (
    <>
      <Meta title={isSelf ? t('myAccount') : t('playerAddress', { address })} />

      {isSelf && <RetroactivePoolClaimBanner />}

      <PageTitleAndBreadcrumbs
        Link={Link}
        title={pageTitle}
        breadcrumbs={[
          {
            name: t('accountOverview')
          }
        ]}
      />

      {!address ? (
        <AccountSummary />
      ) : addressError ? (
        <h6 className='text-orange my-4 font-normal'>
          There was an issue with the address provided: {playerAddress}
        </h6>
      ) : (
        <>
          <AccountSummary />

          <AccountDeposits />

          <AccountLootBoxes />

          <AccountWinnings />
        </>
      )}
    </>
  )
}
