import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Details from './page';
import * as SearchModule from '@/services/github-service';

//エラーにならないのため、routerをモックする
jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockResolvedValue({id: '123'}),
}))

//モックデータ
const mockData = {
    id: '123',
    name: 'test',
    language: 'typescript',
    forks_count: 1,
    open_issues_count: 2,
    stargazers_count: 3,
    watchers_count: 4,
    owner: {avatar_url: ''}
}

//検索関数のモック
const searchSpy = jest.spyOn(SearchModule, 'getRepo').mockResolvedValue(mockData)

describe('Details', () => {
    it('初期化を表示する', async () => {
        render(<Details/>)
        const avatar = await screen.findByRole('img')
        const name = await screen.findByText('test')
        const lang = await screen.findByText('typescript')
        const stars = await screen.findByText('3')
        const watchers = await screen.findByText('4')
        const forks = await screen.findByText('1')
        const issues = await screen.findByText('2')
        expect(avatar).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(lang).toBeInTheDocument()
        expect(stars).toBeInTheDocument()
        expect(watchers).toBeInTheDocument()
        expect(forks).toBeInTheDocument()
        expect(issues).toBeInTheDocument()
    })
})
