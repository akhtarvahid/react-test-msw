import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import CreateForm from '../CreateForm';
import { log } from 'console';
import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event'
describe('CreateForm component tests', () => {
    const mockFn = jest.fn();

    test('sub components: Test1', () => {
        const view = render(<CreateForm colorSetter={mockFn} />);
        expect(view).toMatchSnapshot();
    });

    test('TextBox available: Test2', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const nameEl = screen.getByRole('textbox', { name: 'Enter name' });
        expect(nameEl).toBeInTheDocument();

        logRoles(nameEl)

        const nameLabel = screen.getByLabelText('Enter name');
        expect(nameLabel).toBeInTheDocument();
        logRoles(nameLabel)

        const loactionEl = screen.getByRole('combobox');
        expect(loactionEl).toBeInTheDocument();
        logRoles(loactionEl)

        const colorEl = screen.getByLabelText('Color picker');
        expect(colorEl).toBeInTheDocument();
    });

    test('TextBox Change event: Test3', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const nameEl = screen.getByRole('textbox', {
            name: "Enter name"
        });
        fireEvent.change(nameEl, { target: { value: 'xyz' } })
        expect(nameEl).toBeInTheDocument();
    });

    test('TextBox Location change event: Test4', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const nameEl = screen.getByRole('combobox');
        fireEvent.change(nameEl, { target: { value: 'India' } })
        expect(nameEl).toBeInTheDocument();
    });
    test('TextBox Color change event: Test5', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const colorEl = screen.getByRole('textbox', {
            name: "Color picker"
        });
        fireEvent.change(colorEl, { target: { value: 'abc' } })
        expect(colorEl).toBeInTheDocument();
    });

    test('TextBox Submit button: Test6', async () => {
        user.setup();
        render(<CreateForm colorSetter={mockFn} />);
        const submitBtn = screen.getByRole('button', {
            name: "Submit"
        });
        await user.click(submitBtn);
        expect(submitBtn).toBeInTheDocument();
        const colorEl = screen.getByRole('textbox', {
            name: "Color picker"
        });
        await userEvent.clear(colorEl);
        expect(colorEl).toHaveValue('');
    });
})
