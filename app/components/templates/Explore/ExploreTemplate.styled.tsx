import styled from 'styled-components'

export const Wrapper = styled.div`
  padding-bottom: 50px;
`

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-items: center;
  margin-top: 30px;
`

export const NothingFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  > * {
    width: 300px;

    img {
      margin-bottom: 25px;
    }
  }
`
