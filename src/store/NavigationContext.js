import { createContext, useState } from "react"

//Initialize context
const NavigationContext = createContext({
    sideBar: true,
    sidebarHandler: () => {}
})

export function NavigationContextProvider (props) {
    const [showSidebar, setShowSidebar] = useState(true)

    function sidebarHandler() {
        setShowSidebar(!showSidebar)
        // setShowSidebar(() => {
        //     return setShowSidebar(!showSidebar)
        // })
    }

    const contextValue = {
        sidebar: showSidebar,
        sidebarHandler: sidebarHandler,
    }
    return (
        <NavigationContext.Provider value={contextValue}>
            {props.children}
        </NavigationContext.Provider>
    )
}
export default NavigationContext