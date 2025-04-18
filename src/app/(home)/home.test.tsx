import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './page';
import * as SearchModule from '@/services/github-service';

//エラーにならないのため、routerをモックする
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

//モックデータ
const mockData = {
    items: [{
        id: '123',
        name: 'test',
        owner: {avatar_url: ''}
    }]
}

//検索関数のモック
const searchSpy = jest.spyOn(SearchModule, 'searchRepo').mockResolvedValue(mockData)

describe('Home', () => {
    it('初期化を表示する', () => {
        render(<Home/>)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('検察キーワードを入力できる', () => {
        render(<Home/>)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target: {value: 'test123'}})
        expect(input).toHaveValue('test123')
    })

    it('検察できる', async () => {
        render(<Home/>)
        const button = screen.getByText('検索')
        fireEvent.click(button)
        expect(searchSpy).toHaveBeenCalled()
        const searchResult = await screen.findByText('test')
        expect(searchResult).toBeInTheDocument()
    })
})