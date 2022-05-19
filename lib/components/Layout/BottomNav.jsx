import {
  BottomAccountIcon,
  BottomNavContainer,
  BottomNavLink,
  BottomPoolsIcon
} from '@wooy/react-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const BottomNav = (props) => {
  const router = useRouter()
  const { pathname } = router
  const isPoolView = !['/account'].includes(pathname)

  return (
    <BottomNavContainer>
      <BottomNavLink
        shallow
        href='/'
        as='/'
        label={'Pools'}
        Link={Link}
        useRouter={useRouter}
        isCurrentPage={isPoolView}
      >
        <BottomPoolsIcon />
      </BottomNavLink>
      <BottomNavLink
        shallow
        href='/account'
        as='/account'
        label={'Account'}
        Link={Link}
        useRouter={useRouter}
        match='/account'
      >
        <BottomAccountIcon />
      </BottomNavLink>
    </BottomNavContainer>
  )
}
