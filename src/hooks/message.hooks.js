import {useCallback} from 'react'

export const useMessage = () => {
    // useCallback - this is necessary so as
    // not to enter into a cyclic recursion
    return useCallback( text => {
        if (window.M && text){
            // method toast from library materialize -> alert
            window.M.toast({html: text})
            alert(text)
        }
    }, [])
}