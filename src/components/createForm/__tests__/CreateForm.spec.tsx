import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import CreateForm from '../CreateForm';
import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event'
describe('CreateForm component tests', () => {
    const submitHandlerMock = jest.fn();

    test('sub components: Test1', () => {
        const view = render(<CreateForm colorSetter={submitHandlerMock} />);
        expect(view).toMatchSnapshot();
    });

    test('TextBox available: Test2', () => {
        render(<CreateForm colorSetter={submitHandlerMock} />);
        const nameInputElem = screen.getByRole('textbox', { name: 'Enter name' });
        expect(nameInputElem).toBeInTheDocument();

        //logRoles(nameInputElem)

        const nameInputLabel = screen.getByLabelText('Enter name');
        expect(nameInputLabel).toBeInTheDocument();
        //logRoles(nameInputLabel)

        const loactionSelectElem = screen.getByRole('combobox');
        expect(loactionSelectElem).toBeInTheDocument();
        //logRoles(loactionSelectElem)

        const colorInputElem = screen.getByLabelText('Color picker');
        expect(colorInputElem).toBeInTheDocument();
    });

    test('TextBox Change event: Test3', () => {
        render(<CreateForm colorSetter={submitHandlerMock} />);
        const nameInputElem = screen.getByRole('textbox', {
            name: "Enter name"
        });
        fireEvent.change(nameInputElem, { target: { value: 'xyz' } })
        expect(nameInputElem).toBeInTheDocument();
    });

    test('TextBox Location change event: Test4', () => {
        render(<CreateForm colorSetter={submitHandlerMock} />);
        const nameInputElem = screen.getByRole('combobox');
        fireEvent.change(nameInputElem, { target: { value: 'India' } })
        expect(nameInputElem).toBeInTheDocument();
    });
    test('TextBox Color change event: Test5', () => {
        render(<CreateForm colorSetter={submitHandlerMock} />);
        const colorInputElem = screen.getByRole('textbox', {
            name: "Color picker"
        });
        fireEvent.change(colorInputElem, { target: { value: 'abc' } })
        expect(colorInputElem).toBeInTheDocument();
    });

    test('TextBox Submit button: Test6', async () => {
        user.setup();
        render(<CreateForm colorSetter={submitHandlerMock} />);
        const submitBtn = screen.getByRole('button', {
            name: "Submit"
        });
        await user.click(submitBtn);
        expect(submitBtn).toBeInTheDocument();
        const colorInputElem = screen.getByRole('textbox', {
            name: "Color picker"
        });
        await userEvent.clear(colorInputElem);
        expect(colorInputElem).toHaveValue('');
        expect(submitHandlerMock).toHaveBeenCalledTimes(1);
    });
})
