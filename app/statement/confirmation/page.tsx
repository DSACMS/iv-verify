'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button,  Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from '@/app/i18n/client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { selectSignedStatement } from "@/lib/features/statement/statementSlice"
import Link from "next/link"
import Image from "next/image"
import ledgerImage from './ledger.png'

export default function Page() {
    const { t } = useTranslation('en')
    const dispatch = useAppDispatch()
    const router = useRouter()
    const signedStatement = useAppSelector((state) => selectSignedStatement(state))

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('statement_confirmation_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('statement_confirmation_header')}</h3>
                            <div className="margin-top-2 margin-bottom-5">{t('statement_confirmation_subheader', { 
                                number: signedStatement?.confirmationNumber ?? 'XXX' 
                                })}
                            </div>
                            <h4>{t('statement_confirmation_what_next')}</h4>
                            <ul className="margin-top-2 margin-left-4 margin-bottom-5">
                                <li>{t('statement_confirmation_benefit_worker')}</li>
                                <li>{t('statement_confirmation_portal')}</li>
                            </ul>
                            
                            <div className="margin-bottom-3 text-center">
                                <Link href="#" className="usa-link">{t('statement_confirmation_download_copy')}</Link>
                            </div>
                            <div className="text-center margin-bottom-4">
                                <Image alt={t('statement_confirmation_image_alt')} src={ledgerImage} width={282} height={365} />
                            </div>
                            <div>
                                <Button type="button">{t('statement_confirmation_download_button')}</Button>
                            </div>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}