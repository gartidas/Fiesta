import { FilterOperation } from '@api/types'
import TextBox from '@elements/TextBox/TextBox'
import { IFilterProps } from './types'

const TextFilter = ({
  column: { Header },
  setValue,
  value,
  operation = FilterOperation.Contains
}: IFilterProps) => {
  return (
    <div>
      <TextBox
        fullWidth
        variant='outlined'
        color='secondary'
        label={Header?.toString()}
        value={value?.value || ''}
        onChange={value => setValue?.({ value: value || undefined, operation })}
      />
    </div>
  )
}

export default TextFilter
