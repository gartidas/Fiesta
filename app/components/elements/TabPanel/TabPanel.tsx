interface ITabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
  className?: string
  alwaysVisible?: boolean
}

const TabPanel = ({ children, value, index, className, alwaysVisible }: ITabPanelProps) => {
  if (!alwaysVisible && value !== index) return null

  return (
    <div role='tabpanel' className={className}>
      {children}
    </div>
  )
}

export default TabPanel
