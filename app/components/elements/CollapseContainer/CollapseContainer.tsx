import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import useWindowSize from '@hooks/useWindowSize'
import { StyledCollapse, StyledButton } from './CollapseContainer.styled'

interface ICollapseContainerProps {
  collapsedHeight?: number
  children: JSX.Element
}

const CollapseContainer = ({ collapsedHeight = 70, children }: ICollapseContainerProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const [isOverflow, setIsOverflow] = useState(false)
  const { t } = useTranslation('common')

  // Note: Makes sure "showMoreButton" is displayed properly when window is resized
  useWindowSize()

  const buttonText = collapsed ? 'showMore' : 'showLess'

  const handleIsOverflow = (el: HTMLDivElement | null) => {
    if (el) setIsOverflow(el.getBoundingClientRect().height > collapsedHeight)
  }

  if (!isOverflow) return <div ref={handleIsOverflow}>{children}</div>

  return (
    <div>
      <StyledCollapse in={!collapsed} collapsedHeight={collapsedHeight}>
        <div ref={handleIsOverflow}>{children}</div>
      </StyledCollapse>

      <StyledButton onClick={() => setCollapsed(x => !x)} size='small'>
        {t(buttonText)}
      </StyledButton>
    </div>
  )
}

export default CollapseContainer
