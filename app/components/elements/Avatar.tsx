import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar as MuiAvatar, AvatarProps } from '@material-ui/core'
import { MD, SM } from '@contextProviders/AppThemeProvider/theme'

interface IAvatarProps extends AvatarProps {
  mdSize?: string
  smSize?: string
  size?: string
  clickable?: boolean
}

const StyledAvatar = styled(MuiAvatar)<IAvatarProps>`
  ${({ onClick, clickable }) => (onClick || clickable) && 'cursor: pointer'};

  img {
    object-fit: cover;
  }

  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};

  @media screen and (max-width: ${MD}px) {
    width: ${({ mdSize }) => mdSize || '40px'};
    height: ${({ mdSize }) => mdSize || '40px'};
  }

  @media screen and (max-width: ${SM}px) {
    width: ${({ smSize }) => smSize || '36px'};
    height: ${({ smSize }) => smSize || '36px'};
  }
`

const Avatar: FC<IAvatarProps> = ({ src, children, alt, ...rest }) => {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (src) setFailed(false)
  }, [src])

  return (
    <StyledAvatar {...rest}>
      {failed || !src ? (
        children
      ) : (
        <Image
          src={src || ''}
          width={40}
          height={40}
          alt={alt}
          quality={100}
          onError={() => setFailed(true)}
        />
      )}
    </StyledAvatar>
  )
}

export default Avatar
