import { useSendTransaction } from '@wooy/hooks'
import { useOnboard } from '@wooy/bnc-onboard-hooks'
import { useTranslation } from 'react-i18next'
import { poolToast } from '@wooy/react-components'

export const useSendTransactionWrapper = () => {
  const { address: usersAddress, provider, network: chainId } = useOnboard()
  const { t } = useTranslation()

  return useSendTransaction(t, poolToast, usersAddress, provider, chainId)
}
