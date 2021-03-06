import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { usePodShareBalance, useTokenBalance, useTokenBalances } from '@wooy/hooks'
import { useOnboard } from '@wooy/bnc-onboard-hooks'

import { WithdrawAmount } from 'lib/components/WithdrawWizard/WithdrawAmount'
import { ethers } from 'ethers'
import { numberWithCommas } from '@wooy/utilities'
import { Odds } from 'lib/components/Odds'
import { Amount } from '@wooy/react-components'

export const PodWithdrawAmount = (props) => {
  const { pod, chainId, contractAddress, tokenAddress, nextStep, form } = props
  const tokenSymbol = pod.tokens.underlyingToken.symbol
  const decimals = pod.tokens.underlyingToken.decimals
  const podTicketTokenSymbol = pod.tokens.podStablecoin.symbol
  const podTicketAddress = pod.tokens.podStablecoin.address
  const poolTicketAddress = pod.tokens.ticket.address

  const { t } = useTranslation()
  const { address: usersAddress } = useOnboard()

  const { data: usersUnderlyingTicketBalance, isFetched: isUsersUnderlyingBalanceFetched } =
    useTokenBalances(chainId, usersAddress, [tokenAddress])
  const { data: usersPodShareBalance, isFetched: isUsersPodShareBalanceFetched } =
    usePodShareBalance(chainId, usersAddress || ethers.constants.AddressZero, podTicketAddress)
  const { data: podTicketBalance, isFetched: isPodBalanceFetched } = useTokenBalance(
    chainId,
    contractAddress,
    poolTicketAddress
  )

  const isFetched =
    isUsersUnderlyingBalanceFetched && isUsersPodShareBalanceFetched && isPodBalanceFetched

  const { watch, formState } = form
  const quantity = watch('quantity', false)

  return (
    <>
      <WithdrawAmount
        decimals={decimals}
        chainId={chainId}
        usersAddress={usersAddress}
        form={form}
        usersTicketBalance={usersPodShareBalance?.underlyingAmount.amount}
        usersUnderlyingBalance={usersUnderlyingTicketBalance?.[tokenAddress].amount}
        label={t('withdrawTokenFromPod', { token: tokenSymbol })}
        tokenSymbol={podTicketTokenSymbol}
        tokenAddress={podTicketAddress}
        nextStep={nextStep}
      />
      <div className='flex mx-auto mt-8'>
        <PodWinningOdds
          isQuantityValid={formState.isValid}
          isFetched={isFetched}
          pod={pod}
          quantity={quantity}
          podBalanceUnformatted={podTicketBalance?.amountUnformatted}
        />
        <UsersPrize
          isQuantityValid={formState.isValid}
          isFetched={isFetched}
          pod={pod}
          quantity={quantity}
          usersBalanceUnformatted={usersPodShareBalance?.underlyingAmount.amountUnformatted}
        />
      </div>
    </>
  )
}

const PodWinningOdds = (props) => {
  const { isQuantityValid, isFetched, pod, quantity, podBalanceUnformatted } = props

  const { t } = useTranslation()

  if (!isFetched || !isQuantityValid) {
    return (
      <SmallCard className='mr-2'>
        <Title>{t('yourWinningOdds')}:</Title>
        <Details>--</Details>
      </SmallCard>
    )
  }

  const decimals = pod.tokens.underlyingToken.decimals
  const numberOfWinners = pod.prizePool.config.numberOfWinners
  // Balance of pod
  const quantityUnformatted = ethers.utils.parseUnits(quantity || '0', decimals)
  const podsNewBalanceUnformatted = podBalanceUnformatted.sub(quantityUnformatted)
  // Total supply of prize pool
  const ticketTotalSupplyUnformatted = pod.prizePool.tokens.ticket.totalSupplyUnformatted
  const sponsorshipTotalSupplyUnformatted = pod.prizePool.tokens.sponsorship.totalSupplyUnformatted
  const totalSupplyUnformatted = ticketTotalSupplyUnformatted
    .add(sponsorshipTotalSupplyUnformatted)
    .sub(quantityUnformatted)

  return (
    <SmallCard className='mr-2'>
      <Title>{t('podWinningOdds')}:</Title>
      {podsNewBalanceUnformatted.isZero() ? (
        <Details>--</Details>
      ) : (
        <Odds
          ticketSupplyUnformatted={totalSupplyUnformatted}
          decimals={decimals}
          numberOfWinners={numberOfWinners}
          usersBalance={podsNewBalanceUnformatted}
        />
      )}
    </SmallCard>
  )
}

const UsersPrize = (props) => {
  const { isQuantityValid, isFetched, pod, quantity, usersBalanceUnformatted } = props
  const { t } = useTranslation()

  const decimals = pod.tokens.underlyingToken.decimals
  const quantityUnformatted = ethers.utils.parseUnits(
    isQuantityValid ? quantity || '0' : '0',
    decimals
  )
  const usersNewBalanceUnformatted = usersBalanceUnformatted?.sub(quantityUnformatted)

  if (!isFetched || !isQuantityValid || !usersNewBalanceUnformatted) {
    return (
      <SmallCard className='ml-2'>
        <Title>{t('yourPrizeIfThePodWins')}:</Title>
        <Details>--</Details>
      </SmallCard>
    )
  }

  const singlePrizeScaled = pod.prize.totalValuePerWinnerUsdScaled.toNumber()
  const ticketTotalSupplyUnformatted = pod.tokens.ticket.totalSupplyUnformatted
  const sponsorshipTotalSupplyUnformatted = pod.tokens.sponsorship.totalSupplyUnformatted
  const totalSupplyUnformatted = ticketTotalSupplyUnformatted
    .add(sponsorshipTotalSupplyUnformatted)
    .sub(quantityUnformatted)

  const usersBalanceFloat = Number(
    ethers.utils.formatUnits(usersNewBalanceUnformatted, Number(decimals))
  )
  const totalSupplyFloat = Number(
    ethers.utils.formatUnits(totalSupplyUnformatted, Number(decimals))
  )
  const usersOwnershipPercentage = usersBalanceFloat / totalSupplyFloat
  const usersPrize = (singlePrizeScaled * usersOwnershipPercentage) / 100

  if (usersPrize <= 0) {
    return (
      <SmallCard className='ml-2'>
        <Title>{t('yourPrizeIfThePodWins')}:</Title>
        <Details>--</Details>
      </SmallCard>
    )
  }

  return (
    <SmallCard className='ml-2'>
      <Title>{t('yourPrizeIfThePodWins')}:</Title>
      <Details className='text-flashy'>
        $<Amount>{numberWithCommas(usersPrize, { decimals: 0, precision: 2 })}</Amount>
      </Details>
    </SmallCard>
  )
}

const SmallCard = (props) => (
  <div className={classnames('bg-card py-2 px-4 rounded flex flex-col', props.className)}>
    {props.children}
  </div>
)

const Title = (props) => <span className='text-center text-xs opacity-80'>{props.children}</span>
const Details = (props) => (
  <span className={classnames('text-center mt-2', props.className)}>{props.children}</span>
)
