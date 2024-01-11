import { useContext, createContext } from 'react'
import homeStore from './module/homeStore'
import todoStore from './module/todoStore'

export const allStore = {
  homeStore,
  todoStore
}
