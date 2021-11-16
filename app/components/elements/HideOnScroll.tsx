import { FC } from 'react'
import { Slide, useScrollTrigger } from '@material-ui/core'

interface IProps {
  disableHysteresis?: boolean
}

const HideOnScroll: FC<IProps> = ({ children, disableHysteresis }) => {
  const trigger = useScrollTrigger({ disableHysteresis })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children as any}
    </Slide>
  )
}

export default HideOnScroll
