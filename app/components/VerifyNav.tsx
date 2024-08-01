import { Header, Link, NavMenuButton, PrimaryNav, Title } from "@trussworks/react-uswds"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { i18nConfig } from "@/app/constants"
import { usePathname, useRouter } from "next/navigation"
import { useCookies } from "react-cookie"

interface VerifyNavProps {
    title: string
}

export default function VerifyNav(props: VerifyNavProps) {
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const currentPathname = usePathname()
    const [_, setCookie] = useCookies([i18nConfig.cookieName]);
    const currentLocale = i18n.language
    const [expanded, setExpanded] = useState(false)

    function changeLang(locale: string) {
        i18n.changeLanguage(locale)
        setCookie(i18nConfig.cookieName, locale)

        if (locale === i18nConfig.defaultLocale) {
            router.push(currentPathname.replace(`${currentLocale}`, ''));
        } else if (currentLocale == i18nConfig.defaultLocale) {
            router.push(`/${locale}/${currentPathname}`)
        } else {
            router.push(currentPathname.replace(`/${currentLocale}`, `/${locale}`) + "/")
        }
        router.refresh();
    }

    function makeLangNavItem(text: string, lang: string) {
        const isCurrent = i18n.language?.startsWith(lang) ?? "en"
        return <Link 
            href="#" 
            className={`usa-nav__link ${isCurrent ? "usa-current" : ""}`}
            onClick={() => {changeLang(lang) }}
            data-testid={`locale-${lang}`}
            >{text}</Link>
    }

    function makeNavItem(text: string, url: string) {
        return <Link
            href={url}
            className={`usa-nav__link`}
            >{text}</Link>
    }

    const navItems = [
        makeNavItem("Home", "/"),
        makeLangNavItem(t('nav_english'), "en"),
        makeLangNavItem(t('nav_espanol'), "es"),
    ]

    const onClick = () => {
        setExpanded(prev => !prev)
    }
    return (
        <Header basic={true} showMobileOverlay={expanded}>
        <div className="usa-nav-container">
            <div className="usa-navbar">
                <Title>{props.title}</Title>
                <NavMenuButton onClick={onClick} label="Menu" />
            </div>
            <PrimaryNav items={navItems} mobileExpanded={expanded} onToggleMobileNav={onClick} />
        </div>
    </Header>
    )
}