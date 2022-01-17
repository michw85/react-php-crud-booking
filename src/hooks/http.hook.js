// hook for server interaction -> request if loading or potential mistakes
import {useState, useCallback} from 'react'

export const useHttp = () => {
    // inside the hook, we determine whether something is loaded (or find error) or not
    const [loadind, setLoading] = useState(false )
    const [error, setError] = useState(null)
    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }
        try {
            const response = await fetch(url, { method, body, headers })
            const data = await  response.json()    // parsing in json

            if(!response.ok) {  // if the request contains an error
                throw new Error(data.message || 'Something went wrong')
            }

            setLoading(false)
            return data
        }catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    // clear errors
    const clearError = useCallback(() => setError(null), [])

    return { loadind, request, error, clearError }
}