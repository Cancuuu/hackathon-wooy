import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useCurrentPool, useUserTicketsByPool } from '@wooy/hooks'
import { useOnboard } from '@wooy/bnc-onboard-hooks'

import { ApproveSponsorshipTxButton } from 'lib/components/ApproveSponsorshipTxButton'
import { DepositSponsorshipTxButton } from 'lib/components/DepositSponsorshipTxButton'
import { WithdrawSponsorshipTxButton } from 'lib/components/WithdrawSponsorshipTxButton'
import { ButtonDrawer } from 'lib/components/ButtonDrawer'
import { ErrorsBox } from 'lib/components/ErrorsBox'
import { Modal } from 'lib/components/Modal'
import { TextInputGroup } from 'lib/components/TextInputGroup'
import { numberWithCommas } from 'lib/utils/numberWithCommas'
import { formatUsersTokenDataForPool } from 'lib/utils/formatUsersTokenDataForPool'
import { useCurrentUsersTokenBalanceAndAllowanceOfCurrentPool } from 'lib/hooks/useUsersTokenBalanceAndAllowance'

export function DepositOrWithdrawSponsorshipModal(props) {
  const { t } = useTranslation()
  const { decimals, handleClose, isWithdraw, tickerUpcased, visible } = props

  const [needsApproval, setNeedsApproval] = useState(null)

  const { address: usersAddress } = useOnboard()

  const router = useRouter()
  const { data: pool } = useCurrentPool(router)
  const { data: usersChainData, refetch } = useCurrentUsersTokenBalanceAndAllowanceOfCurrentPool()

  // fill this in with a watched address or an address from router params
  const playerAddress = ''
  const address = playerAddress || usersAddress

  const { sponsorship } = useUserTicketsByPool(pool.prizePool.address, address)

  const { register, errors, watch, setValue } = useForm({
    mode: 'all',
    reValidateMode: 'onChange'
  })

  const onSubmit = () => {}

  const { usersTokenBalanceUnformatted, usersTokenBalance, usersTokenAllowance } =
    formatUsersTokenDataForPool(pool, usersChainData)

  const quantity = watch('quantity')

  let quantityBN = ethers.BigNumber.from(0)
  if (decimals) {
    quantityBN = ethers.utils.parseUnits(quantity || '0', Number(decimals))
  }

  useEffect(() => {
    if (quantityBN.gt(0) && usersTokenAllowance.gte(quantityBN)) {
      setNeedsApproval(false)
    } else if (quantity) {
      setNeedsApproval(true)
    }
  }, [quantityBN, usersTokenAllowance])

  let contextualBalanceBN = usersTokenBalanceUnformatted
  let contextualBalance = usersTokenBalance
  let validate = null
  if (isWithdraw) {
    contextualBalance = sponsorship?.amount
    contextualBalanceBN = sponsorship?.amountUnformatted

    validate = {
      greaterThanBalance: (value) =>
        ethers.utils.parseUnits(value, decimals).lte(sponsorship?.amountUnformatted) ||
        t('enterAmountLowerThanSponsorshipBalance')
    }
  } else {
    validate = {
      greaterThanBalance: (value) =>
        ethers.utils.parseUnits(value, decimals).lte(usersTokenBalanceUnformatted) ||
        t('enterAmountLowerThanTokenBalance')
    }
  }

  return (
    <>
      <Modal
        handleClose={handleClose}
        visible={visible}
        header={<>{isWithdraw ? t('withdrawSponsorship') : t('depositSponsorship')}</>}
      >
        <form onSubmit={onSubmit}>
          <div className='w-full mx-auto'>
            <TextInputGroup
              large
              unsignedNumber
              autoFocus
              id='quantity'
              name='quantity'
              register={register}
              validate={validate}
              label={isWithdraw ? t('withdrawAmount') : t('sponsorAmount')}
              required={t('amountRequired')}
              autoComplete='off'
              rightLabel={
                usersAddress &&
                tickerUpcased && (
                  <>
                    <button
                      type='button'
                      className='font-bold'
                      onClick={(e) => {
                        e.preventDefault()
                        setValue(
                          'quantity',
                          ethers.utils.formatUnits(contextualBalanceBN, decimals),
                          { shouldValidate: true }
                        )
                      }}
                    >
                      {numberWithCommas(contextualBalance, { precision: 2 })} {tickerUpcased}
                    </button>
                  </>
                )
              }
            />
          </div>

          <div
            className='mt-2 text-sm text-highlight-1 font-bold mb-2'
            style={{
              minHeight: 24
            }}
          >
            {Object.values(errors).length > 0 && (
              <>
                <ErrorsBox errors={errors} />
              </>
            )}
          </div>

          <div className='flex flex-col mx-auto w-full items-center justify-center'>
            <ButtonDrawer>
              {isWithdraw ? (
                <>
                  <WithdrawSponsorshipTxButton
                    {...props}
                    quantity={quantity}
                    quantityBN={quantityBN}
                  />
                </>
              ) : (
                <>
                  <ApproveSponsorshipTxButton
                    {...props}
                    refetch={refetch}
                    disabled={needsApproval === null}
                    needsApproval={needsApproval}
                  />
                  <DepositSponsorshipTxButton
                    {...props}
                    refetch={refetch}
                    quantity={quantity}
                    quantityBN={quantityBN}
                    needsApproval={needsApproval}
                  />
                </>
              )}
            </ButtonDrawer>
          </div>
        </form>
      </Modal>
    </>
  )
}
