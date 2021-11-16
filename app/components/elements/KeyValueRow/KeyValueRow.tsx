import { Key, Value, Wrapper } from './KeyValueRow.styled'

interface IKeyValueRowProps {
  keyName: string
  keyWidth?: string
  value?: string | number
}

const KeyValueRow = ({ keyName, keyWidth, value }: IKeyValueRowProps) => {
  return (
    <Wrapper>
      <Key keyWidth={keyWidth || 'auto'}>{keyName}</Key>
      <Value>{value}</Value>
    </Wrapper>
  )
}

export default KeyValueRow
