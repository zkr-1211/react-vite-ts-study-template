import React, { KeyboardEvent, memo, useState } from 'react'
import useInput from '@/hooks/useInput'

interface PropsType {
  data: Item
  type: 'done' | 'todo'
  onRemoveTodo?: (todo: Item) => void
  onDone?: (todo: Item) => void
  onTodo?: (done: Item) => void
  onUpdateTodo?: (todo: Item, value: string) => void
}

const TodoItem = (props: PropsType) => {
  const { data, onRemoveTodo, onDone, onUpdateTodo } = props

  const [showUpdateInput, setShowUpdateInput] = useState(false)

  const { inputValue, onChangeInput } = useInput()

  const removeTodo = () => {
    if (onRemoveTodo) onRemoveTodo(data)
  }

  const done = () => {
    if (onDone) onDone(data)
  }

  const openUpdateInput = () => {
    setShowUpdateInput(true)
  }

  const closeUpdateInput = () => {
    setShowUpdateInput(false)
  }

  const updateTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && inputValue.trim().length !== 0) {
      if (onUpdateTodo) onUpdateTodo(data, inputValue)
      closeUpdateInput()
    }
  }

  return (
    <li id={String(data.id)} onDoubleClick={openUpdateInput}>
      <div className="left">
        <input id={String(data.id)} type="checkbox" className="checkbox-input" onClick={done} />
        {showUpdateInput ? (
          <input
            type="text"
            autoFocus
            className="update-input"
            id={'input-' + data.id}
            onBlur={closeUpdateInput}
            onKeyDown={updateTodo}
            value={inputValue}
            onChange={onChangeInput}
          />
        ) : (
          <span id={'span-' + data.id}>{data.value}</span>
        )}
      </div>
      <span
        id={`todoRemove-
        ${data.id}
      `}
        className="right"
        onClick={openUpdateInput}>
        编辑
      </span>
      ---
      <span
        id={`todoRemove-
        ${data.id}
      `}
        className="right"
        onClick={removeTodo}>
        删除
      </span>
    </li>
  )
}

export default memo(TodoItem)
