import React from 'react'
import classnames from 'classnames'
import { Amount } from '@wooy/react-components'
import { numberWithCommas } from '@wooy/utilities'

export const TicketAmount = (props) => (
  <div
    className={classnames(
      'text-lg sm:text-2xl font-bold text-inverse-purple mb-1 leading-none',
      props.className
    )}
  >
    <Amount>{numberWithCommas(props.amount)}</Amount>
  </div>
)
