import { Header, Link, NavMenuButton, PrimaryNav, Title } from "@trussworks/react-uswds"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface VerifyNavProps {
    title: string
}

export default function VerifyNav(props: VerifyNavProps) {
    const { t, i18n } = useTranslation()
    const [expanded, setExpanded] = useState(false)

    function makeNavItem(text: string, lang: string) {
        const isCurrent = i18n.language.startsWith(lang)
        return <Link 
            href="#" 
            className={`usa-nav__link ${isCurrent ? "usa-current" : ""}`}
            onClick={() => {i18n.changeLanguage(lang) }}
            >{text}</Link>
    }

    const navItems = [
        makeNavItem(t('nav_english'), "en"),
        makeNavItem(t('nav_espanol'), "es"),
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