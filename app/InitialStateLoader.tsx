'use client'
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setInitialStateAction } from "@/lib/actions"

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        let persistedState = {}
        if (typeof window !== "undefined" && window.sessionStorage != null) {
            const serialized = window.sessionStorage.getItem("VERIFY_LEDGER")
            persistedState = serialized != null ? JSON.parse(serialized) : {}

            if (persistedState) {
                dispatch(setInitialStateAction(persistedState))
            }
        }
    }, [dispatch])


    return children
}