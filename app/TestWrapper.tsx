import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18nTesting from '@/app/I18nTesting'
import { EnhancedStore } from '@reduxjs/toolkit'

interface Props {
    store: EnhancedStore
    children: React.ReactNode
}

export default function TestWrapper({ children, store }: Props) {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18nTesting}>
                {children}
            </I18nextProvider>
        </Provider>
    )
}