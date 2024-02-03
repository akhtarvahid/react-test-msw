import { fireEvent, render, screen } from '@testing-library/react';
import CreateForm from '../CreateForm';

describe('CreateForm component tests', () => {
    const mockFn = jest.fn();
    
    test('sub components: Test1', () => {
        const view = render(<CreateForm colorSetter={mockFn}  />);
        expect(view).toMatchSnapshot();
    });

    test('TextBox available: Test2', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const nameEl = screen.getByRole('textbox', { name: 'Enter name' });
        expect(nameEl).toBeInTheDocument();

        const nameLabel = screen.getByLabelText('Enter name');
        expect(nameLabel).toBeInTheDocument();

        const loactionEl = screen.getByRole('combobox');
        expect(loactionEl).toBeInTheDocument();

        const colorEl = screen.getByLabelText('Color picker');
        expect(colorEl).toBeInTheDocument();
    });

    test('TextBox Change event: Test3', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const nameEl = screen.getByRole('textbox', {
            name: "Enter name"
        });
        fireEvent.change(nameEl, {target: {value: 'xyz'}})
        expect(nameEl).toBeInTheDocument();
    });

    test('TextBox Location change event: Test4', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const nameEl = screen.getByRole('combobox');
        fireEvent.change(nameEl, {target: {value: 'India'}})
        expect(nameEl).toBeInTheDocument();
    });
    test('TextBox Color change event: Test5', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const colorEl = screen.getByRole('textbox', {
            name: "Color picker"
        });
        fireEvent.change(colorEl, {target: {value: 'abc'}})
        expect(colorEl).toBeInTheDocument();
    });

    test('TextBox Submit button: Test6', () => {
        render(<CreateForm colorSetter={mockFn} />);
        const submitBtn = screen.getByRole('button', {
            name: "Submit"
        });
        fireEvent.click(submitBtn, {target: {value: 'Submit'}})
        expect(submitBtn).toBeInTheDocument();
    });
})
