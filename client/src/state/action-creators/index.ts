import { ActionType } from "../action-types"
import { Dispatch } from "redux"
import { Action } from "../actions/index"

export const enterUsername = (username: string) =>{
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.USERNAME,
            payload: username,
        })
    }
}
export const enterPassword = (password: string) =>{
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.PASSWORD,
            payload: password
        })
    }
}
export const enterProfilePicture = (profilePicture: string) =>{
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.PROFILE_PICTURE,
            payload: profilePicture
        })
    }
}
export const enterSearchUser = (search: string) =>{
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.SEARCH,
            payload: search
        })
    }
}
export const enterChatId = (chat: string) =>{
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.CHAT,
            payload: chat
        })
    }
}
export const enterMessage = (message: string) =>{
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionType.MESSAGE,
            payload: message
        })
    }
}