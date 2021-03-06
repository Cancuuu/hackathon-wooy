import React, { useContext } from 'react'
import ContentLoader from 'react-content-loader'
import { isMobile } from 'react-device-detect'

import { UI_LOADER_ANIM_DEFAULTS } from 'lib/constants'
import { ThemeContext } from '@wooy/react-components'

export const IndexUILoader = (props) => {
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
        viewBox='0 0 400 150'
        backgroundColor={bgColor}
        foregroundColor={foreColor}
      >
        <rect x='0' y='0' rx='5' ry='5' width='400' height='150' />
      </ContentLoader>
    )
  }

  return (
    <ContentLoader
      {...UI_LOADER_ANIM_DEFAULTS}
      viewBox='0 0 600 300'
      backgroundColor={bgColor}
      foregroundColor={foreColor}
    >
      <rect x='0' y='0' rx='5' ry='5' width='600' height='300' />
    </ContentLoader>
  )
}
