import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'
import { SearchModalItem } from '@modules/SearchModal'

export const ItemInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  p {
    margin: 0px;
    line-height: 1.4rem;
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
    ::first-letter {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  span {
    font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    line-height: 1.15rem;
    display: flex;
    align-items: center;
    svg {
      font-size: 1em;
      color: ${({ theme }) => theme.palette.themeText.themeBlack};
    }
  }

  .MuiChip-root svg {
    margin: 0 0 2px 7px;
    height: 13px;
    width: 13px;
  }

  @media screen and (max-width: ${MD}px) {
    p {
      line-height: 1.25rem;
    }

    span {
      font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
      line-height: 1rem;
    }

    .MuiAvatar-root {
      width: 33px;
      height: 33px;
    }
  }
`

export const Item = styled(SearchModalItem)`
  display: flex;
  gap: 18px;

  @media screen and (max-width: ${MD}px) {
    gap: 10px;
    > svg {
      display: none;
    }
  }
`

export const EllipsisOverflow = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
