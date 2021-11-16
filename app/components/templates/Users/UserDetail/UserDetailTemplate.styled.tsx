import styled from 'styled-components'
import { LG, MD, SM } from '@contextProviders/AppThemeProvider/theme'

export const TopSection = styled.section`
  display: flex;
  padding-top: 30px;

  @media screen and (max-width: ${MD}px) {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
`

export const NameAndButtonsAndBioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const NameAndButtonsWrapper = styled.div`
  display: flex;

  @media screen and (max-width: ${MD}px) {
    align-items: center;
    flex-direction: column;
  }
`

export const BioText = styled.div`
  white-space: pre-wrap;
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  font-weight: 300;
  word-break: break-word;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 5px;

  margin-left: 20px;

  @media screen and (max-width: ${MD}px) {
    margin-left: 0;
    margin-top: 20px;
    justify-content: center;
  }
`

export const AvatarWrapper = styled.div`
  padding: 0 50px;

  .MuiAvatar-root {
    height: 170px;
    width: 170px;
    box-shadow: 0 13px 13px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: ${LG}px) {
    padding-left: 0;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 0;
    margin-bottom: 10px;

    .MuiAvatar-root {
      height: 130px;
      width: 130px;
    }
  }
`

export const NameAndFriendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    margin: 0;
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: 400;
    line-height: 1em;
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);

    ::first-letter {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
  }

  @media screen and (max-width: ${MD}px) {
    align-items: center;
  }

  @media screen and (max-width: ${SM}px) {
    h1 {
      margin: 8px 0 6px;
    }
  }
`

export const FriendsWrapper = styled.div`
  p {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
    font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
    margin-top: 5px;
    cursor: pointer;
  }

  span {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`
