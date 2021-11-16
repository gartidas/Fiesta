import styled from 'styled-components'

export const BOTTOM_NAVIGATION_HEIGHT = 56

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 100;

  height: ${BOTTOM_NAVIGATION_HEIGHT}px;
`
