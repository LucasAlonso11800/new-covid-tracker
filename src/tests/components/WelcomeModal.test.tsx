import { renderWithProviders } from '../../utils/test-utils';
import { fireEvent, screen } from '@testing-library/react'
import { WelcomeModal } from '../../components';


test('Welcome modal starts open and closes on button click', () => {
    renderWithProviders(<WelcomeModal />);
    const modal = screen.getByTestId("welcome-modal");
    expect(modal).toHaveClass('open');
    fireEvent.click(screen.getByRole('button', { name: /Go to dashboard/i }));
    expect(modal).toHaveClass('closed');
});