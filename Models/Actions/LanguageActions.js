import { AsyncStorage } from 'react-native';

export const SetLanguage = (lang) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LANGUAGE', payload: { Language: lang } })
    }

};