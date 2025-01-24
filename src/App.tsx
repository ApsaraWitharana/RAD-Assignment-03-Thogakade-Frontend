import { createBrowserRouter, RouterProvider } from "react-router"
import "./App.css"
import { RootLayout } from "./components/RootLayout"
import Customer from "./pages/Customer"
import Item from "./pages/Item"
import PlaceOrder from "./pages/PlaceOrder"
import Dashboard from "./pages/Dashboard"

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "", element: <Dashboard /> },
                { path: "/customer", element: <Customer /> },
                { path: "/item", element: <Item /> },
                { path: "/place-order", element: <PlaceOrder /> }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default App
