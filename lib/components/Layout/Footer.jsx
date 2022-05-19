import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tagline } from '@wooy/react-components'

export const Footer = (props) => {
  const { t } = useTranslation()
  return <Tagline>{t('theMoreYouPoolTagline')}</Tagline>
}
