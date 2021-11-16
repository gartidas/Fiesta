import { Children, cloneElement, isValidElement, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { isFunction } from 'lodash'

interface IProps extends LinkProps {
  activeClassName?: string
  children: ReactNode | ((isActive: boolean) => ReactNode)
}

const NavLink = ({ href, children, activeClassName, ...rest }: IProps) => {
  const { asPath } = useRouter()
  const isActive = asPath.includes(href.toString())

  const addActiveClass = (node: ReactNode): ReactNode =>
    Children.map(node, x => {
      if (isValidElement(x))
        return cloneElement(x, { ...x.props, className: activeClassName || 'active' })
    })?.[0]

  return (
    <Link {...rest} href={href}>
      {isFunction(children) ? children(isActive) : isActive ? addActiveClass(children) : children}
    </Link>
  )
}

export default NavLink
