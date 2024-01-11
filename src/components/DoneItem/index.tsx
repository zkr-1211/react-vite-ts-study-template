import React, { memo } from 'react'
interface PropsType {
  data: Item
  type: 'done' | 'todo'
  onRemoveTodo?: (todo: Item) => void
  onDone?: (todo: Item) => void
  onTodo?: (done: Item) => void
  onUpdateTodo?: (todo: Item, value: string) => void
}

const DoneItem = (props: PropsType) => {
  const { data, onTodo } = props

  const todo = () => {
    onTodo?.(data)
  }

  return (
    <li draggable="true" id={String(data.id)}>
      <div className="left">
        <input type="checkbox" className="checkbox-input" checked disabled />
        <span>{data.value}</span>
      </div>
      <span id={`doneRemove-${data.id}`} className="right" onClick={todo}>
        删除
      </span>
    </li>
  )
}

export default memo(DoneItem)
