import React, { useCallback, useRef, useEffect, useState } from 'react'
import Header from '@/components/Header/index'
import TopInfo from '@/components/TopInfo'
import TodoItem from '@/components/TodoItem'
import DoneItem from '@/components/DoneItem'
import Foo from '@/components/foo'
import { observer } from 'mobx-react-lite'
import { allStore } from '@/store/index'

const Todo: React.FC = () => {
  const { todoStore } = allStore

  const [todoList, setTodoList] = useState<Item[]>(todoStore.getTodoList)
  const [doneList, setDoneList] = useState<Item[]>(todoStore.getDoneList)

  const onAddTodo = useCallback(
    (item: Item) => {
      // 异步代码拿到最新的值，然后保存
      // setTodoList(prevTodoList => {
      //   const updatedTodoList = [...prevTodoList, item];
      //   todoStore.saveTodoList(updatedTodoList);
      //   return updatedTodoList;
      // });
      // 不影响其他地方，直接更新也没问题
      setTodoList([...todoList, item])
    },
    [todoList]
  )

  const onAddLargeTodo = useCallback(
    (itemList: Item[]) => {
      setTodoList([...todoList, ...itemList])
    },
    [todoList]
  )

  const onUpdateTodo = useCallback(
    (todo: Item, value: string) => {
      // setTodoList(todoList.map(item => (item.id === todo.id ? { ...item, value } : item)))
      setTodoList(prevTodoList => {
        const updatedTodoList = prevTodoList.map(item => (item.id === todo.id ? { ...item, value } : item))
        // todoStore.saveTodoList(updatedTodoList)
        return updatedTodoList
      })
    },
    [todoList]
  )

  const onRemoveTodo = useCallback(
    (todo: Item) => {
      setTodoList(todoList.filter(item => item.id !== todo.id))
    },
    [todoList]
  )

  const onDone = useCallback(
    (todo: Item) => {
      setDoneList([...doneList, todo])
      setTodoList(todoList.filter(item => item.id !== todo.id))
    },
    [doneList, todoList]
  )

  const onTodo = useCallback(
    (done: Item) => {
      setDoneList(doneList.filter(item => item.id !== done.id))
    },
    [doneList]
  )

  useEffect(() => {
    todoStore.saveTodoInfo({ todoList, doneList })
  }, [todoList, doneList])

  const todos = todoList.map(item => (
    <TodoItem
      type="todo"
      data={item}
      key={item.id}
      onRemoveTodo={onRemoveTodo}
      onUpdateTodo={onUpdateTodo}
      onDone={onDone}
    />
  ))
  const dones = doneList.map(item => <DoneItem type="done" data={item} key={item.id} onTodo={onTodo} />)
  const fooRef = useRef<any>(null)
  return (
    <>
      <div
        onClick={() => {
          fooRef.current.hello()
        }}>
        <Foo ref={fooRef}></Foo>
      </div>
      <Header onAddTodo={item => onAddTodo(item)} onAddLargeTodo={itemList => onAddLargeTodo(itemList)}></Header>
      <div className="main-container">
        <TopInfo title="正在进行" total={todoList.length}></TopInfo>

        <div className="list-container">
          <ul id="todoList" className="list">
            {todos}
          </ul>
        </div>

        <TopInfo title="已经完成" total={doneList.length}></TopInfo>
        <div className="list-container">
          <ul id="doneList" className="list">
            {dones}
            {/* {doneList.map(item => (
              <DoneItem type="done" data={item} key={item.id} onTodo={onTodo} />
            ))} */}
          </ul>
        </div>
      </div>
    </>
  )
}

export default observer(Todo)
