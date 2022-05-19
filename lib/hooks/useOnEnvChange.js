import { useIsTestnets } from '@wooy/hooks'
import { useEffect } from 'react'

export const useOnEnvChange = (callback) => {
  const { isTestnets } = useIsTestnets()
  useEffect(callback, [isTestnets])
}
