import { makeAutoObservable, set } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
interface todoInfoType {
  todoList: Item[]
  doneList: Item[]
}
class Store {
  todoInfo: todoInfoType = {
    todoList: [],
    doneList: []
  }
  constructor () {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'todoStore',
      properties: ['todoInfo'],
      storage: window.localStorage
    })
  }
  get getTodoList () {
    return this.todoInfo.todoList
  }
  get getDoneList () {
    return this.todoInfo.doneList
  }

  saveTodoInfo = (todoInfo: todoInfoType) => {
    this.todoInfo = todoInfo
  }
}

export default new Store()
