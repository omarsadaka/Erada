const initialState = {
    Processing: false,
    Message: null,
    User: null,
    Titles: {},
    Zones: [],
    Cities: [],
    News:{},
    Offer: {},
    Program:[],
    Specialist:[],
    Times:[],
    Lecture:[],
    Consulting:[],
    Session:[],
    ConsultingByID:{},
    SessionByID: {},
    AllReservation:[],
    UserNotify:[],
    SpecialistNotify:[],
    UserChat:[],
    SpecialistChat:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ATTEMP':
            return {
                ...state,
                Message: null,
                Processing: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                Processing: false,
                User: {
                    _id: action.payload._id,
                    email: action.payload.email,
                    fullname: action.payload.fullname,
                    mobile: action.payload.mobile,
                    password: action.payload.password,
                    imgPath: action.payload.imgPath,
                    birthday: action.payload.birthday,
                    zoneID: action.payload.zoneID,
                    cityID: action.payload.cityID,
                    gender : action.payload.gender,
                    loginType: action.payload.loginType,
                    bankName: action.payload.bankName,
                    bankAccount: action.payload.bankAccount,
                    userKey: action.payload.userKey,
                    userBalacne: action.payload.userBalacne,
                    type: action.payload.type
                },
                Message: "Login Done",
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                Processing: false,
                Message: action.payload
            }

        case 'LOGOUT_ATTEMP':
            return { ...state, Processing: true, Message: null, }
        case 'LOGOUT_SUCCESS':
            return { ...state, Processing: false, User: null, Message: null, }
        case 'LOGOUT_FAILED':
            return { ...state, Processing: false, Message: action.payload }

        case 'REGISTER_ATTEMP':
            return {
                ...state,
                Message: null,
                Processing: true,
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                Processing: false,
                User: {
                    _id: action.payload._id,
                    email: action.payload.email,
                    fullname: action.payload.fullname,
                    mobile: action.payload.mobile,
                    password: action.payload.password,
                    imgPath: action.payload.imgPath,
                    birthday: action.payload.birthday,
                    gender : action.payload.gender,
                    loginType: action.payload.loginType,
                    bankName: action.payload.bankName,
                    bankAccount: action.payload.bankAccount,
                },
                Message: "Register Done",
            }
            case 'REGISTER_FAILED':
            return {
                ...state,
                Processing: false,
                Message: action.payload
            }
        case 'LOADING_USER':
            return {
                ...state,
                Message: null,
                Processing: action.payload,
            }
            case 'GETPWD_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'GETPWD_SUCCESS':
            return { ...state, Processing: false , Message :'Password send to your email' }
            case 'GETPWD_FAILED':
            return { ...state, Processing: false, Message: action.payload }
            case 'ZONE_ATTEMP':
            return { ...state}
            case 'ZONE_SUCCESS':
            return { ...state, Processing: false, Zones: action.payload}
            case 'ZONE_FAILED':
            return { ...state, Message: action.payload }
            case 'CITY_ATTEMP':
            return { ...state}
            case 'CITY_SUCCESS':
            return { ...state, Processing: false, Cities: action.payload}
            case 'CITY_FAILED':
            return { ...state, Message: action.payload }

            case 'USER_ATTEMP':
            return { ...state }
            case 'USER_SUCCESS':
            return  {
                ...state,
                Titles: {
                    zoneAr: action.payload.zoneAr,
                    zoneEN: action.payload.zoneEN,
                    cityAr: action.payload.cityAr,
                    cityEN: action.payload.cityEN,
                }
            }
            case 'USER_FAILED':
            return { ...state, Message: action.payload }
            case 'PROGRAM_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'PROGRAM_SUCCESS':
            return { ...state, Processing: false , Message :'Your request send' }
            case 'PROGRAM_FAILED':
            return { ...state, Processing: false, Message: action.payload }
            case 'LECTURE_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'LECTURE_SUCCESS':
            return { ...state, Processing: false , Message :'Lecture created successfully'}
            case 'LECTURE_FAILED':
            return { ...state, Processing: false, Message: action.payload }

            case 'LATESTNEWS_ATTEMP':
                return {
                    ...state,
                    Message: null,
                    Processing: true
                }
            case 'LATESTNEWS_SUCCESS':
                return {
                    ...state,
                    Processing: false,
                    News: {
                        _id: action.payload._id,
                        titleAr: action.payload.titleAr,
                        titleEN: action.payload.titleEN,
                        descriptionAr: action.payload.descriptionAr,
                        descriptionEN: action.payload.descriptionEN,
                        imgPath: action.payload.imgPath,
                        type: action.payload.type,
                        videoLink : action.payload.videoLink,
                    },
                }
            case 'LATESTNEWS_FAILED':
                return {
                    ...state,
                    Processing: false,
                    Message: action.payload
                }

                case 'OFFERS_ATTEMP':
                return {
                    ...state,
                    Message: null,
                    Processing: true
                }
            case 'OFFERS_SUCCESS':
                return {
                    ...state,
                    Processing: false,
                    Offer: {
                        _id: action.payload._id,
                        titleAr: action.payload.titleAr,
                        titleEN: action.payload.titleEN,
                        descriptionAr: action.payload.descriptionAr,
                        descriptionEN: action.payload.descriptionEN,
                        imgPath: action.payload.imgPath,
                    },
                }
            case 'OFFERS_FAILED':
                return {
                    ...state,
                    Processing: false,
                    Message: action.payload
                }
            case 'GETPROGRAM_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'GETPROGRAM_SUCCESS':
            return { ...state, Processing: false, Program: action.payload}
            case 'GETPROGRAM_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'SPECIALIST_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'SPECIALIST_SUCCESS':
            return { ...state, Processing: false, Specialist: action.payload}
            case 'SPECIALIST_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'TIMES_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'TIMES_SUCCESS':
            return { ...state, Processing: false, Times: action.payload}
            case 'TIMES_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'MAKEREQUEST_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'MAKEREQUEST_SUCCESS':
            return { ...state, Processing: false , Message :'Your request created successfully' }
            case 'MAKEREQUEST_FAILED':
            return { ...state, Processing: false, Message: action.payload }
            case 'MAKESESSION_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'MAKESESSION_SUCCESS':
            return { ...state, Processing: false , Message :'Your session created successfully' }
            case 'MAKESESSION_FAILED':
            return { ...state, Processing: false, Message: action.payload }
            case 'GETLECTURE_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'GETLECTURE_SUCCESS':
            return { ...state, Processing: false, Lecture: action.payload}
            case 'GETLECTURE_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'LECTUREJOIN_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'LECTUREJOIN_SUCCESS':
            return { ...state, Processing: false , Message :'Your join send successfully' }
            case 'LECTUREJOIN_FAILED':
            return { ...state, Processing: false, Message: action.payload }
            case 'GETCUNSULTING_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'GETCUNSULTING_SUCCESS':
            return { ...state, Processing: false, Consulting: action.payload}
            case 'GETCUNSULTING_FAILED':
            return { ...state, Processing: false , Message: action.payload }

            case 'GETSESSION_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'GETSESSION_SUCCESS':
            return { ...state, Processing: false, Session: action.payload}
            case 'GETSESSION_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'CONSULTINGBYID_ATTEMP':
            return {
                ...state,Message: null,Processing: true}
           case 'CONSULTINGBYID_SUCCESS':
            return {...state,Processing: false,
                ConsultingByID: {
                    id:action.payload.id,
                    usrID: action.payload.usrID,
                    fullname: action.payload.fullname,
                    imgPath: action.payload.imgPath,
                    type: action.payload.type,
                    age: action.payload.age,
                    begin: action.payload.begin,
                    reason: action.payload.reason,
                    level: action.payload.level,
                    increase: action.payload.increase,
                    anotherOne: action.payload.anotherOne,
                    family: action.payload.family,
                    feeling: action.payload.feeling,
                    stutteringSide: action.payload.stutteringSide,
                    examples: action.payload.examples
 
                },
            }
        case 'CONSULTINGBYID_FAILED':
            return {...state,Processing: false,Message: action.payload
            }

            case 'SESSIONBYID_ATTEMP':
                return {
                    ...state,Message: null,Processing: true}
               case 'SESSIONBYID_SUCCESS':
                return {...state,Processing: false,
                    SessionByID: {
                        id:action.payload.id,
                        usrID: action.payload.usrID,
                        fullname: action.payload.fullname,
                        imgPath: action.payload.imgPath,
                        type: action.payload.type,
                        age: action.payload.age,
                        begin: action.payload.begin,
                        reason: action.payload.reason,
                        level: action.payload.level,
                        increase: action.payload.increase,
                        anotherOne: action.payload.anotherOne,
                        family: action.payload.family,
                        feeling: action.payload.feeling,
                        stutteringSide: action.payload.stutteringSide,
                        examples: action.payload.examples
     
                    },
                }
            case 'SESSIONBYID_FAILED':
                return {...state,Processing: false,Message: action.payload    
                }

            case 'USERRESERVATION_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'USERRESERVATION_SUCCESS':
            return { ...state, Processing: false, AllReservation: action.payload}
            case 'USERRESERVATION_FAILED':
            return { ...state, Processing: false , Message: action.payload }   
            case 'STARTCHAT_ATTEMP':
            return { ...state, Processing: true, Message: null, }
            case 'STARTCHAT_SUCCESS':
            return { ...state, Processing: false , Message :'Start chat done' }
            case 'STARTCHAT_FAILED':
            return { ...state, Processing: false, Message: action.payload }   
            case 'USERNOTIFY_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'USERNOTIFY_SUCCESS':
            return { ...state, Processing: false, UserNotify: action.payload}
            case 'USERNOTIFY_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'SPECIALISTNOTIFY_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'SPECIALISTNOTIFY_SUCCESS':
            return { ...state, Processing: false, SpecialistNotify: action.payload}
            case 'SPECIALISTNOTIFY_FAILED':
            return { ...state, Processing: false , Message: action.payload }
            case 'RATECHAT_ATTEMP':
            return { ...state,Message: null,Processing: true}
            case 'RATECHAT_SUCCESS':
            return { ...state, Processing: false, Message :'Rate Done'}
            case 'RATECHAT_FAILED':
            return { ...state, Processing: false , Message: action.payload }

            case 'USERCHAT_ATTEMP':
                return { ...state,Message: null,Processing: true}
                case 'USERCHAT_SUCCESS':
                return { ...state, Processing: false, UserChat: action.payload}
                case 'USERCHAT_FAILED':
                return { ...state, Processing: false , Message: action.payload }

                case 'SPECIALISTCHAT_ATTEMP':
                    return { ...state,Message: null,Processing: true}
                    case 'SPECIALISTCHAT_SUCCESS':
                    return { ...state, Processing: false, SpecialistChat: action.payload}
                    case 'SPECIALISTCHAT_FAILED':
                    return { ...state, Processing: false , Message: action.payload }
           


        default:
            return state
    }
};