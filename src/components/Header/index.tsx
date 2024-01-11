import React, { ChangeEvent, KeyboardEvent, useState, memo } from 'react'
import { getCache, setCache } from '@/utils/cache'

interface PropsType {
  onAddTodo: (item: Item) => void
  onAddLargeTodo: (item: Item[]) => void
}

let count = getCache<number>('COUNT') || 0

const Header: React.FC<PropsType> = props => {
  const [inputValue, setInputValue] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const { onAddTodo, onAddLargeTodo } = props

  const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (inputValue.trim().length === 0) {
        alert('添加内容不能为空')
        return
      }
      const item = inputValue
      onAddTodo({
        id: count++,
        value: item,
        check: false
      })
      setCache('COUNT', count)
      setInputValue('')
    }
  }

  const addLargeTodo = (todoCount: number) => {
    console.log('🚀 ~ addLargeTodo ~ addLargeTodo:', todoCount)
    if (inputValue.trim().length === 0) {
      alert('添加内容不能为空')
      return
    }
    const item = inputValue
    const list: Item[] = []
    for (let i = 0; i < todoCount; i++) {
      list.push({
        id: count++,
        value: item,
        check: false
      })
    }
    setCache('COUNT', count)
    setInputValue('')
    onAddLargeTodo(list)
  }

  return (
    <>
      <h2>TodoList</h2>
      <div className="right">
        <input
          className="add-input"
          id="add"
          type="text"
          placeholder="添加ToDo"
          value={inputValue}
          onKeyDown={addTodo}
          onChange={onChange}
        />
        <button onClick={() => addLargeTodo(3)}>+3</button>
        <button onClick={() => addLargeTodo(1)}>+1</button>
      </div>
    </>
  )
}
export default memo(Header)
