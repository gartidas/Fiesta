import { ButtonProps, CircularProgress } from '@material-ui/core'
import Link from 'next/link'
import { StyledMuiButton } from './Button.styled'

export interface IButtonProps extends ButtonProps {
  loading?: boolean
  isExternalLink?: boolean
}

const Button = ({
  loading,
  children,
  variant,
  color,
  disabled,
  startIcon,
  endIcon,
  href,
  isExternalLink,
  ...rest
}: IButtonProps) => {
  const optionalProps =
    href && isExternalLink ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  const btn = (
    <StyledMuiButton
      {...optionalProps}
      {...rest}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      variant={variant || 'contained'}
      color={color || 'primary'}
      disabled={disabled || loading}
    >
      {loading ? <CircularProgress size='1.3rem' /> : children}
    </StyledMuiButton>
  )

  return href && !isExternalLink ? <Link href={href}>{btn}</Link> : btn
}

export default Button
