import { render, screen } from '@testing-library/react';
import CreateForm from '../CreateForm';

describe('CreateForm component tests', () => {
    test('sub components: Test1', () => {
        const view = render(<CreateForm />);
        expect(view).toMatchSnapshot();
    });

    test('TextBox available: Test2', () => {
        render(<CreateForm />);
        const nameEl = screen.getByRole('textbox', { name: 'Enter name' });
        expect(nameEl).toBeInTheDocument();
        const loactionEl = screen.getByRole('combobox');
        expect(loactionEl).toBeInTheDocument();
        const colorEl = screen.getByText('Color picker');
        expect(colorEl).toBeInTheDocument();
    });
})
