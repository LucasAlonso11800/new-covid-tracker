import { renderWithProviders } from '../../utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import '@testing-library/jest-dom'
import App from '../../App';

const handlers = [rest.get('https://api.covidtracking.com/v2/us/daily.json', (req, res, ctx) => {
    return res(ctx.status(500))
})]

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Error message is rendered', async () => {
    renderWithProviders(<App />);

    expect(await screen.findByText(/There seems to be an error/i)).toBeInTheDocument();
    expect(await screen.findByText(/Request failed with status code 500/i)).toBeInTheDocument();
});