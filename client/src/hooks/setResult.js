import * as Action from '../store/result_reducer';

export const PushAnswer = (result) => async (dispatch) => {
    try{
        await dispatch(Action.pushResultAction(result))
    } catch(error) {
        console.log(error);
    }
}