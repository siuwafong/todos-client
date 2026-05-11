import { useContext } from "react"
import { FeatureContext } from "@/context/FeatureContext"

export const useFeatures = () =>{
    const context = useContext(FeatureContext)
    
    if (context === undefined || context === null) {
        throw new Error('useTodos must be used within a FeatureProviderProvider')
    }
    return context
}
