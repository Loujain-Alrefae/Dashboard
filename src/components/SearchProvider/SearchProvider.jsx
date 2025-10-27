import { createContext, useState } from "react"

// Create a new context called SearchContext
// This will allow components to share and access search-related state
export const SearchContext = createContext()

// Define the SearchProvider component that wraps around children components
export const SearchProvider = ({children}) => {
    // Declare a state variable to hold the current search input
    // `searchProduct` stores the search term, and `setSearchProduct` updates it
    const [searchProduct , setSearchProduct] = useState("")
    return (
        // Provide the search state and updater function to all child components
        <SearchContext.Provider value={{setSearchProduct , searchProduct}}>
            {children}
        </SearchContext.Provider>
    )
}


