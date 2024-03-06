### 1. error due to wrong method called for asynchronous code
  <img src="error1.png" alt="error1" />
    
    Solution: 

    `expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();`

### 2. What need not to use with RTL?

  Sol - Don't use `act(()=>{})` when working with RTL even after getting warning, use `waitFor` instead.   
      
      - Prefer to use Asynchronous(findBy, findByAll, waitFor)

      - Avoid synchronous(`user.keyboard`, `user.click`) 

### 3. Importance of screen

```js

// ❌
const {getByRole} = render(<Example />)
const errorMessageNode = getByRole('alert')

// ✅
render(<Example />)
const errorMessageNode = screen.getByRole('alert')

```

### 4. Wrapping things in act unnecessarily

```js

// ❌
act(() => {
  render(<Example />)
})

const input = screen.getByRole('textbox', {name: /choose a fruit/i})
act(() => {
  fireEvent.keyDown(input, {key: 'ArrowDown'})
})

// ✅
render(<Example />)
const input = screen.getByRole('textbox', {name: /choose a fruit/i})
fireEvent.keyDown(input, {key: 'ArrowDown'})

```

### 5. Preferred way to query elements

```js

// ❌
// assuming you've got this DOM to work with:
// <label>Username</label><input data-testid="username" />
screen.getByTestId('username')

// ✅
// change the DOM to be accessible by associating the label and setting the type
// <label for="username">Username</label><input id="username" type="text" />
screen.getByRole('textbox', {name: /username/i})



// ❌
screen.getByTestId('submit-button')

// ✅
screen.getByRole('button', {name: /submit/i})


// - Avoid container
// ❌
const {container} = render(<Example />)
const button = container.querySelector('.btn-primary')
expect(button).toHaveTextContent(/click me/i)

// ✅
render(<Example />)
screen.getByRole('button', {name: /click me/i})

```

### 6. Advice: Avoid adding unnecessary or incorrect accessibility attributes.

```js

// ❌
render(<button role="button">Click me</button>)

// ✅
render(<button>Click me</button>)

```

### 7. Start preferring `@testing-library/user-event`.

```js

// ❌
fireEvent.change(input, {target: {value: 'hello world'}})

// ✅
userEvent.type(input, 'hello world')

//Note: Use `@testing-library/user-event` over `fireEvent` where possible.

```

### 8. Using `query*` variants for anything except checking for non-existence

```js

// ❌
expect(screen.queryByRole('alert')).toBeInTheDocument()

// ✅
expect(screen.getByRole('alert')).toBeInTheDocument()
expect(screen.queryByRole('alert')).not.toBeInTheDocument()

// Note: Only use the `query*` variants for asserting that an element cannot be found.


```

### 9. Using `waitFor` to wait for elements that can be queried with find*

```js

// ❌
const submitButton = await waitFor(() =>
  screen.getByRole('button', {name: /submit/i}),
)

// ✅
const submitButton = await screen.findByRole('button', {name: /submit/i})

// Note: use find* any time you want to query for something that may not be available right away.

```