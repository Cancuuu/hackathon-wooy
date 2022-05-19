import React from 'react'

import * as PoolConfig from 'pools.config'

const networks = PoolConfig.default.networks

export const PoolsConfigContext = React.createContext(null)

export const PoolsConfigContextProvider = function ({ children }) {
  return (
    <PoolsConfigContext.Provider
      value={{
        networks
      }}
    >
      {children}
    </PoolsConfigContext.Provider>
  )
}