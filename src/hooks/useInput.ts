import { useState, ChangeEvent } from 'react'

export default function useInput () {
  const [inputValue, setInputValue] = useState('')

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return { inputValue, onChangeInput }
}
