import React from 'react'
import { useTranslation } from 'react-i18next'
import { Banner } from 'lib/components/Banner'

export const MainBanner = () => {
  const { t } = useTranslation()

  return (
    <Banner gradient={'rainbow'} className='mb-12'>
        <div className='flex sm:flex-row flex-col'>
            <p>{t('mainBannerMsg')}<br/><br/>{t('mainBannerMsg2')}</p>
        </div>
    </Banner>
  )
}
