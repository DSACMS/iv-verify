import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'

test('Page', () => {
    vi.mock('next/navigation', () => require('next-router-mock'))
    const store = makeStore()
    render (<Provider store={store}><Page /></Provider>)
    expect(screen.getByLabelText('What is the name of the person, client, or company that you worked for?')).toBeDefined()
})