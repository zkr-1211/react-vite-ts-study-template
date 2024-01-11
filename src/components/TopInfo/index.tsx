import React, { memo } from 'react'

interface PropsType {
  title: string
  total: number
}

const TopInfo: React.FC<PropsType> = props => {
  const { title, total } = props

  return (
    <>
      <div className="title">{title}</div>
      <p id="todoTotal" className="value">
        总数：{total}
      </p>
    </>
  )
}

export default memo(TopInfo)
