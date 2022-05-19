import React from 'react'
import {
  SideNavContainer,
  SideNavLink,
  SideAccountIcon,
  SidePoolsIcon,
  SocialLinks
} from '@wooy/react-components'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SideNav = (props) => {
  const { t } = useTranslation()

  const router = useRouter()
  const { pathname } = router
  const isPoolView = !['/account'].includes(pathname)

  return (
    <div className='flex flex-col justify-between h-full'>
      <SideNavContainer className='top-side-nav'>
        <SideNavLink
          href='/'
          as='/'
          label={'Pools'}
          Link={Link}
          useRouter={useRouter}
          isCurrentPage={isPoolView}
        >
          <SidePoolsIcon />
        </SideNavLink>
        <SideNavLink
          href='/account'
          as='/account'
          label={t('account')}
          Link={Link}
          useRouter={useRouter}
          match='/account'
        >
          <SideAccountIcon />
        </SideNavLink>
      </SideNavContainer>

      <SideNavContainer className='mb-4'>
        <SocialLinks t={t} />
      </SideNavContainer>
    </div>
  )
}
