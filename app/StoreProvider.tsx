'use client'
import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from '../lib/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.subscribe(() => {
      const sessionStorage = window.sessionStorage
      if (sessionStorage) {
        sessionStorage.setItem("VERIFY_LEDGER", JSON.stringify(storeRef.current?.getState()))
      }
    })
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}