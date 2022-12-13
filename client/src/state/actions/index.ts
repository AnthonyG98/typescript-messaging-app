import { ActionType } from "../action-types"

interface UsernameAction {
    type: ActionType.USERNAME
    payload: string
}
interface PasswordAction {
    type: ActionType.PASSWORD
    payload: string
}
interface ProfilePictureAction {
    type: ActionType.PROFILE_PICTURE
    payload: string
}
interface SearchAction {
    type: ActionType.SEARCH
    payload: string
}
interface ChatAction {
    type: ActionType.CHAT
    payload: string
}
interface MessageAction {
    type: ActionType.MESSAGE
    payload: string
}
export type Action = UsernameAction | PasswordAction | ProfilePictureAction | SearchAction | ChatAction | MessageAction