1. error due to wrong method called for asynchronous code
  <img src="error1.png" alt="error1" />
    
    Solution: 
    
    `expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();`