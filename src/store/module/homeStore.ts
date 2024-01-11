import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
interface transitionStyleType {
  display: string
  top: number
  left: number
  transform: string
  transition: string
}
class Store {
  name = '张三'
  age = 18
  count = 0
  transitionStyle: transitionStyleType = {
    display: 'none',
    top: 0,
    left: 0,
    transform: 'scale(0)',
    transition: 'none'
  }
  constructor () {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'homeStore',
      properties: ['transitionStyle'],
      storage: window.localStorage
    })
  }

  add () {
    this.count++
  }
  setTransitionStyle (newTransitionStyle: transitionStyleType) {
    this.transitionStyle = newTransitionStyle
  }
}

export default new Store()
