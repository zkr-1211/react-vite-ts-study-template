import React, { memo, forwardRef, useImperativeHandle } from 'react'
interface Props {
  btnClick?: (item: any) => void
  totalScore?: number
}

const Index: React.FC = forwardRef((props: Props, ref: any) => {
  const hello = () => {
    console.log('hello', props)
  }
  useImperativeHandle(ref, () => {
    return {
      hello
    }
  })
  return <div ref={ref}>Foo组件</div>
})

// 默认值设置会失效
Index.defaultProps = {
  btnClick: () => {
    //
  },
  totalScore: 0
} as Props

export default memo(Index)
