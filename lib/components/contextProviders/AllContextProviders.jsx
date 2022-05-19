import React from 'react'

import { ConfettiContextProvider } from 'lib/components/contextProviders/ConfettiContextProvider'
import { PoolsConfigContextProvider } from 'lib/components/contextProviders/PoolsConfigContextProvider'
import { ThemeContextProvider } from '@wooy/react-components'

export function AllContextProviders(props) {
  const { children } = props

  return (
    <ThemeContextProvider>
      <ConfettiContextProvider>
        <PoolsConfigContextProvider>{children}</PoolsConfigContextProvider>
      </ConfettiContextProvider>
    </ThemeContextProvider>
  )
}
