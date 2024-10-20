import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./index.css"

// WARNING: why functional components in app?
// Because these are downloaded shadcn/ui components

// ADDITIONALLY DONE:
// 1. App is optimized for large data (for example by using debounce)

createRoot(document.getElementById("root")!).render(<App />)
