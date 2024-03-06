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