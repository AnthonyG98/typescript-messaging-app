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

export type Action = UsernameAction | PasswordAction | ProfilePictureAction