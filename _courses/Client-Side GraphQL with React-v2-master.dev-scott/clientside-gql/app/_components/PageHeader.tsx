import { ReactNode } from 'react'

const PageHeader = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className="w-full flex items-center px-4 h-10 border-b gap-4">
      <span>{title}</span>
      {children}
    </div>
  )
}

export default PageHeader
