import React, { useContext } from 'react'
import ContentLoader from 'react-content-loader'
import { isMobile } from 'react-device-detect'

import { UI_LOADER_ANIM_DEFAULTS } from 'lib/constants'
import { ThemeContext } from '@wooy/react-components'

export const TicketsUILoader = (props) => {
  if (typeof window === 'undefined') {
    return null
  }

  const { theme } = useContext(ThemeContext)

  const bgColor = theme === 'light' ? '#ffffff' : '#242c9e'
  const foreColor = theme === 'light' ? '#f5f5f5' : '#0003FF'

  if (isMobile) {
    return (
      <ContentLoader
        {...UI_LOADER_ANIM_DEFAULTS}
        viewBox='0 0 200 80'
        backgroundColor={bgColor}
        foregroundColor={foreColor}
        className='my-4'
      >
        <rect x='0' y='0' rx='3' ry='3' width='200' height='70' />
      </ContentLoader>
    )
  }

  return (
    <ContentLoader
      {...UI_LOADER_ANIM_DEFAULTS}
      viewBox='0 0 400 50'
      backgroundColor={bgColor}
      foregroundColor={foreColor}
      className='my-4'
    >
      <rect x='0' y='0' rx='3' ry='3' width='400' height='50' />{' '}
    </ContentLoader>
  )
}
