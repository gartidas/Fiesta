import useObserver from '@hooks/useObserver'
import styled from 'styled-components'

interface IObserverProps {
  callback: () => void
  disabled?: boolean
}

const DummyDiv = styled.div`
  height: 1px;
`

const Observer = ({ disabled, callback }: IObserverProps) => {
  const observe = useObserver(callback, !disabled)

  return <DummyDiv ref={node => node && observe(node)} />
}

export default Observer
