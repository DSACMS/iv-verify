import { beforeEach, describe, expect, it, vi } from "vitest"
import VerifyNav from "./VerifyNav"
import { fireEvent, render, screen } from "@testing-library/react"
import { i18nConfig } from "../constants"

const changeLanguageSpy = vi.fn()
const routerPushSpy = vi.fn()
const refreshSpy = vi.fn()
const cookiesSpy = vi.fn()

describe('VerifyNav', () => {

    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  ({
                push: routerPushSpy,
                asPath: '/',
                refresh: refreshSpy,
            }),
            usePathname: () => '/',
        }))

        vi.mock('react-i18next', () => ({
            useTranslation: () => ({
                t: (str: string) => str,
                i18n: {
                  changeLanguage: changeLanguageSpy,
                  language: 'en',
                }
            })
        }))

        vi.mock('react-cookie', () => ({
            useCookies: () => ([vi.fn(), cookiesSpy])
        }))
    })

    render(<VerifyNav title={"MY TITLE"} />)

    it('renders', () => {
        expect(screen.getByText("MY TITLE")).toBeDefined()
    })

    describe('changing locale to es', () => {
        fireEvent.click(screen.getByTestId("locale-es"))

        it('calls change language', () => {
            expect(changeLanguageSpy.mock.calls.length).toBe(1)
            expect(changeLanguageSpy.mock.calls[0][0]).toBe('es')
        })

        it('pushes new route', () => {
            expect(routerPushSpy.mock.calls.length).toBe(1)
            expect(routerPushSpy.mock.calls[0][0]).toBe('/es//')
        })

        it('refreshes router', () => {
            expect(refreshSpy.mock.calls.length).toBe(1)
        })

        it('sets cookie', () => {
            expect(cookiesSpy.mock.calls.length).toBe(1)
            expect(cookiesSpy.mock.calls[0][0]).toBe(i18nConfig.cookieName)
            expect(cookiesSpy.mock.calls[0][1]).toBe('es')
        })
    })
})