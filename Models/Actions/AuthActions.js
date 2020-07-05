import axios from 'axios'
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';


export const UserLogin = (val, password , userKey) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/login', {
                params: {
                    val, password, userKey
                }
            }).then(function (response) {
                const usr = {
                    _id: response.data._id,
                    email: response.data.email,
                    fullname: response.data.fullname,
                    mobile: response.data.mobile,
                    password: response.data.password,
                    imgPath: response.data.imgPath,
                    birthday: response.data.birthday,
                    zoneID: response.data.zoneID,
                    cityID: response.data.cityID,
                    gender: response.data.gender,
                    loginType: response.data.loginType,
                    bankName: response.data.bankName,
                    bankAccount: response.data.bankAccount,
                    userKey: response.data.userKey,
                    userBalacne: response.data.userBalacne,
                    type: response.data.type
                }
                //console.log(usr)
                AsyncStorage.setItem('User', JSON.stringify(usr))
                AsyncStorage.setItem('LogOut','LogIn')
                dispatch({ type: 'LOGIN_SUCCESS', payload: usr })
            }).catch(function (error) {
                dispatch({ type: 'LOGIN_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'LOGIN_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'LOGIN_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILED', payload: "Something went wrong" })
        }
    }
}
export const SaveUser = (usr) => {
    return (dispatch) => {
        dispatch({ type: 'REGISTER_SUCCESS', payload: usr })
    }
}
export const UpdateUser = (usr) => {
    return (dispatch) => {
        dispatch({ type: 'REGISTER_ATTEMP' })
        try {
            axios.put('http://68.183.39.113/api/user/user/'+ usr._id , {
                _id:usr._id,
                fullname: usr.fullname,
                mobile: usr.mobile,
                email: usr.email, 
                imgPath: usr.imgPath, 
                birthday: usr.birthday,
                zoneID: usr.zoneID,
                cityID: usr.cityID,
                gender: usr.gender,
                loginType: usr.loginType,
                bankName: usr.bankName,
                bankAccount: usr.bankAccount
            }).then(function (response) {
                //console.log(response)
                    const usr = {
                        _id: response.data._id,
                        email: response.data.email,
                        fullname: response.data.fullname,
                        mobile: response.data.mobile,
                        imgPath: response.data.imgPath,
                        birthday: response.data.birthday,
                        zoneID: response.data.zoneID,
                        cityID: response.data.cityID,
                        gender: response.data.gender,
                        loginType: response.data.loginType,
                        bankName: response.data.bankName,
                        bankAccount: response.data.bankAccount                    }
                    //console.log(usr)
                    AsyncStorage.setItem('User', JSON.stringify(usr))
                    dispatch({ type: 'REGISTER_SUCCESS', payload: usr })
                    alert('Data updated')
            }).catch(function (error) {
                dispatch({ type: 'REGISTER_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'REGISTER_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
        }
    }
}
 export const ChangePwd =(id , newPwd)=>{
    return (dispatch) => {
        dispatch({ type: 'REGISTER_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.put('http://68.183.39.113/api/user/user/'+ id , {
              password:newPwd
           }).then(function (response) {
                    const usr = {
                       _id: response.data._id,
                       email: response.data.email,
                       fullname: response.data.fullname,
                       mobile: response.data.mobile,
                       imgPath: response.data.imgPath,
                       birthday: response.data.birthday,
                       zoneID: response.data.zoneID._id,
                       cityID: response.data.cityID._id,
                       gender: response.data.gender,
                       password:response.data.password
                   }
                   AsyncStorage.setItem('User', JSON.stringify(usr))
                   dispatch({ type: 'REGISTER_SUCCESS', payload: usr })
                    alert('Password updated')
           }).catch(function (error) {
                //   alert(error +'Something went wrong')
                  if (error.response.data.message) {
                    dispatch({ type: 'REGISTER_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'REGISTER_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const UserRegister = (fullname, mobile, email, password,loginType,type ,experiences , cv , educationalQualification,
    universityName,graduationYear,specialization,medicalLicenseNumber,fieldOfCooperation) => {
    return async (dispatch) => {
        dispatch({ type: 'REGISTER_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/register',{
                fullname,mobile,email,password,loginType,type ,experiences , cv , educationalQualification,
                 universityName,graduationYear,specialization,medicalLicenseNumber,fieldOfCooperation
            }).then(function (response) {
                const usr = {
                    _id: response.data._id,
                    email: response.data.email,
                    fullname: response.data.fullname,
                    mobile: response.data.mobile,
                    password: response.data.password,
                    loginType: response.data.loginType,
                }
                //console.log(usr)
                // AsyncStorage.setItem('User', JSON.stringify(usr))
                dispatch({ type: 'REGISTER_SUCCESS', payload: usr })
            }).catch(function (error) {
                // dispatch({ type: 'REGISTER_FAILED', payload: error.message })
                if (error.response.data.error) {
                    dispatch({ type: 'REGISTER_FAILED', payload: error.response.data.error })
                } else {
                    dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
        }
    }
}
export const SetLoading = ( bool ) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER', payload: bool })
    }
}
export const UserGetPwd = (email) => {
    return async (dispatch) => {
        dispatch({ type: 'GETPWD_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/forgetPassword', {
                params: {
                    email
                }
            }).then(function (response) {
                if(response.data.message === 'DONE'){
                    dispatch({ type: 'GETPWD_SUCCESS' })
                }
            }).catch(function (error) {
                    dispatch({ type: 'GETPWD_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'GETPWD_FAILED', payload: "Something went wrong" })
        }
    }
}  
  export const getTitles = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'USER_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/userByID', {
                params: {
                    id
                }
            }).then(function (response) {
                const Titles = {
                    zoneAr: response.data.zoneID.titleAr,
                    zoneEN: response.data.zoneID.titleEN,
                    cityAr: response.data.cityID.titleAr,
                    cityEN: response.data.cityID.titleEN,
                }
                dispatch({ type: 'USER_SUCCESS', payload: Titles })
               
            }).catch(function (error) {
                    dispatch({ type: 'USER_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'USER_FAILED', payload: "Something went wrong" })
        }
    }
}
export const getZone = () => {
    return async (dispatch) => {
        dispatch({ type: 'ZONE_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/zones')
            .then(function (response) {
                const Data = response.data;
            const zone = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   titleAr:Data[index].titleAr,
                   titleEN: Data[index].titleEN,
                   id:Data[index]._id
                }
             
                zone.push(obj)
            }
            dispatch({ type: 'ZONE_SUCCESS', payload: zone })
            }).catch(function (error) {
                    dispatch({ type: 'ZONE_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'ZONE_FAILED', payload: "Something went wrong" })
        }
    }
       
}
  export const getCity = (zoneID) => {
    return async (dispatch) => {
        dispatch({ type: 'CITY_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/cities',{
                params: {
                    zoneID
                }
            })
            .then(function (response) {
                const Data = response.data;
            const city = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   titleAr:Data[index].titleAr,
                   titleEN: Data[index].titleEN,
                   id:Data[index]._id
                }
             
                city.push(obj)
            }
            dispatch({ type: 'CITY_SUCCESS', payload: city })
            }).catch(function (error) {
                    dispatch({ type: 'CITY_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'CITY_FAILED', payload: "Something went wrong" })
        }
    }
       
}
export const programRequest = (userID,fullname, mobile, email, zoneID , cityID , gender  ,amount) => {
    return async (dispatch) => {
        dispatch({ type: 'PROGRAM_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/event', {
                userID, fullname, mobile, email, zoneID, cityID, gender  , amount,
            }).then(function (response) {
                  if(response.data._id){
                    //   alert('Your request send successfully')
                      dispatch({ type: 'PROGRAM_SUCCESS'})
                  }
               
            }).catch(function (error) {
                dispatch({ type: 'PROGRAM_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'PROGRAM_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'PROGRAM_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'PROGRAM_FAILED', payload: "Something went wrong" })
        }
    }
}
export const createLecture = (userID,entityName, coordinatorName, mobile, email, zoneID , cityID , date , time  ,amount) => {
    return async (dispatch) => {
        dispatch({ type: 'LECTURE_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/awareness',{
                userID, entityName, coordinatorName , mobile, email, zoneID, cityID, date , time , amount,
            }).then(function (response) {
                  if(response.data._id){
                    //   alert('Your request send successfully')
                      dispatch({ type: 'LECTURE_SUCCESS'})
                  }
            }).catch(function (error) {
                dispatch({ type: 'LECTURE_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'LECTURE_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'LECTURE_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'LECTURE_FAILED', payload: "Something went wrong" })
        }
    }
}
export const LatestNews = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'LATESTNEWS_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/reventNewsByID', {
                params: {
                    id
                }
            }).then(function (response) {
                const LatestNews = {
                    _id: response.data._id,
                    titleAr: response.data.titleAr,
                    titleEN: response.data.titleEN,
                    descriptionAr: response.data.descriptionAr,
                    descriptionEN: response.data.descriptionEN,
                    imgPath: response.data.imgPath,
                    type: response.data.type,
                    videoLink: response.data.videoLink,
                }
                dispatch({ type: 'LATESTNEWS_SUCCESS', payload: LatestNews })
            }).catch(function (error) {
                    dispatch({ type: 'LATESTNEWS_FAILED', payload: error })
                    // dispatch({ type: 'LATESTNEWS_FAILED', payload: "Something went wrong" })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'LATESTNEWS_FAILED', payload: "Something went wrong" })
        }
    }
}
export const Offers = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'OFFERS_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/offersByID', {
                params: {
                    id
                }
            }).then(function (response) {
                const offer = {
                    _id: response.data._id,
                    titleAr: response.data.titleAr,
                    titleEN: response.data.titleEN,
                    descriptionAr: response.data.descriptionAr,
                    descriptionEN: response.data.descriptionEN,
                    imgPath: response.data.imgPath,
                }
                dispatch({ type: 'OFFERS_SUCCESS', payload: offer })
            }).catch(function (error) {
                    dispatch({ type: 'OFFERS_FAILED', payload: error })
                    // dispatch({ type: 'OFFERS_FAILED', payload: "Something went wrong" })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'OFFERS_FAILED', payload: "Something went wrong" })
        }
    }
}
export const getProgram =()=>{
    return (dispatch) => {
        dispatch({ type: 'GETPROGRAM_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/event')
           .then(function (response) {
            const Data = response.data;
            const program = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   zoneAr:Data[index].zoneID.titleAr,
                   zoneEN: Data[index].zoneID.titleEN,
                   cityAr:Data[index].cityID.titleAr,
                   cityEN: Data[index].cityID.titleEN,
                   id:Data[index]._id
                }
             
                program.push(obj)
            }
                   dispatch({ type: 'GETPROGRAM_SUCCESS', payload: program })
           }).catch(function (error) {
            dispatch({ type: 'GETPROGRAM_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'GETPROGRAM_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'GETPROGRAM_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'GETPROGRAM_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'GETPROGRAM_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getSpecialist = (type) => {
    return async (dispatch) => {
        dispatch({ type: 'SPECIALIST_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/getCollaboratorType', {
                params: {
                    type
                }
            }).then( (response)=> {
            const Data = response.data;
            const specialist = []
            if(Data.length >0){
                for (let index = 0; index < Data.length; index++) {
                    var obj = {
                        fullname:Data[index].fullname,
                        experiences: Data[index].experiences,
                        imgPath: Data[index].imgPath,
                        id:Data[index]._id
                    }
                 
                    specialist.push(obj)
                   
                }
            }else{
                alert('No specialist')
            }
           
            dispatch({ type: 'SPECIALIST_SUCCESS', payload: specialist })
            }).catch( (error)=> {
                    dispatch({ type: 'SPECIALIST_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'SPECIALIST_FAILED', payload: "Something went wrong" })
        }
    }
}  
export const getTimes = (id , date , timeType) => {
    return async (dispatch) => {
        dispatch({ type: 'TIMES_ATTEMP' })
        try {
            axios.get('http://68.183.39.113/api/user/userTimeByDate', {
                params: {
                    id , date , timeType
                }
            }).then( (response)=> {
            const Data = response.data;
            const times = []
            if(Data.length>0){
                for (let index = 0; index < Data.length; index++) {
                    var obj = {
                        id:Data[index]._id,
                        startTime:Data[index].timeFrom,
                        endTime:Data[index].timeTo,
                        date: Data[index].date
                    }
                    times.push(obj)
                }
            }else{
                alert('No times available')
            }
               
            dispatch({ type: 'TIMES_SUCCESS', payload: times })
            }).catch( (error)=> {
                    dispatch({ type: 'TIMES_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'TIMES_FAILED', payload: "Something went wrong" })
        }
    }
} 
export const MakeRequest = (obj , obj2 , paymentMethod , amount) => {
    return (dispatch) => {
        dispatch({ type: 'MAKEREQUEST_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/makeRequest', {
                userID: obj.userID,
                type: obj.type,
                age: obj.age,
                stutteringBegin: obj.begin,
                stutteringReason: obj.reason, 
                stutteringLevel: obj.level, 
                increasesDecreases: obj.increase ,
                stutteringSide: obj.sides,
                examples: obj.examples,
                pronunciationSpecialists: obj.otherSpecialist,
                familyStuttering: obj.family,
                feelingsAboutStuttering: obj.feeling,
                speicalistID: obj2.speicalistID,
                date: obj2.date,
                time: obj2.time,
                description: obj2.description,
                paymentMethod,
                amount

            }).then(function (response) {
                if(response.data._id){
                    // alert('Your request send successfully')
                    dispatch({ type: 'MAKEREQUEST_SUCCESS' })
                  }
            }).catch(function (error) {
                dispatch({ type: 'MAKEREQUEST_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'MAKEREQUEST_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'MAKEREQUEST_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'MAKEREQUEST_FAILED', payload: "Something went wrong" })
        }
    }
}
export const MakeSession = (obj , paymentMethod , amount) => {
    return (dispatch) => {
        dispatch({ type: 'MAKESESSION_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/makeSession', {
                userID: obj.userID,
                speicalistID: obj.speicalistID,
                date: obj.date,
                time: obj.time,
                description: obj.description,
                paymentMethod,
                amount

            }).then(function (response){
                if(response.data._id){
                    // alert('Your request send successfully')
                    dispatch({ type: 'MAKESESSION_SUCCESS' })
                  }
            }).catch(function (error) {
                dispatch({ type: 'MAKESESSION_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'MAKESESSION_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'MAKESESSION_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'MAKESESSION_FAILED', payload: "Something went wrong" })
        }
    }
}
export const getLecture =()=>{
    return (dispatch) => {
        dispatch({ type: 'GETLECTURE_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/getAwareness')
           .then(function (response) {
            const Data = response.data;
            const lecture = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   zoneAr:Data[index].zoneID.titleAr,
                   zoneEN: Data[index].zoneID.titleEN,
                   cityAr:Data[index].cityID.titleAr,
                   cityEN: Data[index].cityID.titleEN,
                   id:Data[index]._id
                }
             
                lecture.push(obj)
            }
                   dispatch({ type: 'GETLECTURE_SUCCESS', payload: lecture })
           }).catch(function (error) {
                 dispatch({ type: 'GETLECTURE_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'GETLECTURE_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'GETLECTURE_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'GETLECTURE_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'GETLECTURE_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const lectureJoin = (obj ) => {
    return (dispatch) => {
        dispatch({ type: 'LECTUREJOIN_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/awarenessRequest', {
                awarenessID: obj.awarenessID,
                specialistID: obj.specialistID,
                dateOne: obj.dateOne,
                timeOne: obj.timeOne,
                dateTwo: obj.dateTwo,
                timeTwo: obj.timeTwo,
                dateThree: obj.dateThree,
                timeThree: obj.timeThree

            }).then(function (response){
                if(response.data._id){
                    // alert('Your request send successfully')
                    dispatch({ type: 'LECTUREJOIN_SUCCESS' })
                  }
            }).catch(function (error) {
                dispatch({ type: 'LECTUREJOIN_FAILED', payload: error.message })
                if (error.response.data.message) {
                    dispatch({ type: 'LECTUREJOIN_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'LECTUREJOIN_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'LECTUREJOIN_FAILED', payload: "Something went wrong" })
        }
    }
}
export const getConsulting =(speicalistID)=>{
    return (dispatch) => {
        dispatch({ type: 'GETCUNSULTING_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/getRequestBySpecialist',{
            params: {
                speicalistID
            }
           })
           .then(function (response) {
            const Data = response.data;
            const arr = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   id: Data[index]._id,
                   fullname: Data[index].userID.fullname,
                   imgPath: Data[index].userID.imgPath,
                   type: Data[index].type,
                   time: Data[index].createdAt
                }
             
                arr.push(obj)
            }
                   dispatch({ type: 'GETCUNSULTING_SUCCESS', payload: arr })
           }).catch(function (error) {
            dispatch({ type: 'GETCUNSULTING_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'GETCUNSULTING_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'GETCUNSULTING_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'GETCUNSULTING_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'GETCUNSULTING_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getSession =(speicalistID)=>{
    return (dispatch) => {
        dispatch({ type: 'GETSESSION_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/getSessionBySpecialist',{
            params: {
                speicalistID
            }
           })
           .then(function (response) {
            const Data = response.data;
            const arr = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   id:Data[index]._id,
                   fullname: Data[index].userID.fullname,
                   imgPath: Data[index].userID.imgPath,
                   type: Data[index].requestID.type,
                   time: Data[index].createdAt
                }
             
                arr.push(obj)
            }
            dispatch({ type: 'GETSESSION_SUCCESS', payload: arr })
           }).catch((error)=> {
                 dispatch({ type: 'GETSESSION_FAILED', payload: error.message })
                //   if (error.response.data.message) {
                //     dispatch({ type: 'GETSESSION_FAILED', payload: error.response.data.message })
                // } else {
                //     dispatch({ type: 'GETSESSION_FAILED', payload: "Something went wrong" })
                // }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'GETSESSION_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'GETSESSION_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getConsultingById =(id)=>{
    return (dispatch) => {
        dispatch({ type: 'CONSULTINGBYID_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/requestByID',{
            params: {
                id
            }
           })
           .then(function (response) {
            const Data = response.data;
                var obj = {
                   id:Data._id,
                   usrID: Data.userID._id,
                   fullname: Data.userID.fullname,
                   imgPath: Data.userID.imgPath,
                   type: Data.type,
                   age: Data.age,
                   begin: Data.stutteringBegin,
                   reason: Data.stutteringReason,
                   level: Data.stutteringLevel,
                   increase: Data.increasesDecreases,
                   anotherOne: Data.pronunciationSpecialists,
                   family: Data.familyStuttering,
                   feeling: Data.feelingsAboutStuttering,
                   stutteringSide: Data.stutteringSide,
                   examples: Data.examples

                }
             
                   dispatch({ type: 'CONSULTINGBYID_SUCCESS', payload: obj })
           }).catch(function (error) {
            dispatch({ type: 'CONSULTINGBYID_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'CONSULTINGBYID_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'CONSULTINGBYID_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'CONSULTINGBYID_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'CONSULTINGBYID_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getSessionById =(id)=>{
    return (dispatch) => {
        dispatch({ type: 'SESSIONBYID_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/sessionByID',{
            params: {
                id
            }
           })
           .then(function (response) {
            const Data = response.data;
                var obj = {
                   id:Data._id,
                   usrID: Data.userID._id,
                   fullname: Data.userID.fullname,
                   imgPath: Data.userID.imgPath,
                   type: Data.requestID.type,
                   age: Data.requestID.age,
                   begin: Data.requestID.stutteringBegin,
                   reason: Data.requestID.stutteringReason,
                   level: Data.requestID.stutteringLevel,
                   increase: Data.requestID.increasesDecreases,
                   anotherOne: Data.requestID.pronunciationSpecialists,
                   family: Data.requestID.familyStuttering,
                   feeling: Data.requestID.feelingsAboutStuttering,
                   stutteringSide: Data.requestID.stutteringSide,
                   examples: Data.requestID.examples

                }
             
                   dispatch({ type: 'SESSIONBYID_SUCCESS', payload: obj })
           }).catch(function (error) {
            dispatch({ type: 'SESSIONBYID_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'SESSIONBYID_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'SESSIONBYID_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'SESSIONBYID_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'SESSIONBYID_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getUserReservation =(userID)=>{
    return (dispatch) => {
        dispatch({ type: 'USERRESERVATION_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/getAllReservation',{
            params: {
                userID
            }
           })
           .then( (response)=> {

                var gData = [];
                console.log(response.data);
                response.data[0].session = response.data[0].session || [];
                response.data[0].session.forEach(element => {
                    const obj={
                        nameAr:'جلسة علاجية',
                        nameEn: 'Session',
                        specialist: element.speicalistID.fullname,
                        description: element.speicalistID.experiences,
                        imgPath: element.speicalistID.imgPath,
                        date: element.date,
                        time: element.time,
                        type:1
                    }
                    gData.push(obj);
                });
                response.data[1].request = response.data[1].request || [];
                response.data[1].request.forEach(element => {
                    const obj={
                        nameAr:'أستشارة',
                        nameEn: 'Consulting',
                        specialist: element.speicalistID.fullname,
                        description: element.speicalistID.experiences,
                        imgPath: element.speicalistID.imgPath,
                        date: element.date,
                        time: element.time,
                        type:1
                    }
                    gData.push(obj);
                });
                response.data[2].event = response.data[2].event || [];
                response.data[2].event.forEach(element => {
                    const obj={
                        id: element._id,
                        nameAr:'برنامج نادى أرادة',
                        nameEn: 'Erada program',
                        imgPath: null,
                        zoneAr: element.zoneID.titleAr,
                        zoneEN: element.zoneID.titleEN,
                        cityAr: element.cityID.titleAr,
                        cityEN: element.cityID.titleEN,
                        paymetStatus: element.paymetStatus,
                        price: element.amount,
                        type:2,
                        key:'Program'
                    }
                    gData.push(obj);
                });
                response.data[3].awareness = response.data[3].awareness || [];
                response.data[3].awareness.forEach(element => {
                    const obj={
                        id: element._id,
                        nameAr:'محاضرة توعية',
                        nameEn: 'Awereness lecture ',
                        imgPath: null,
                        zoneAr: element.zoneID.titleAr,
                        zoneEN: element.zoneID.titleEN,
                        cityAr: element.cityID.titleAr,
                        cityEN: element.cityID.titleEN,
                        paymetStatus: element.paymetStatus,
                        date: element.date,
                        time: element.time,
                        price: element.amount,
                        type:2,
                        key:'Lecture'
                    }
                    gData.push(obj);
                });
                
                   dispatch({ type: 'USERRESERVATION_SUCCESS', payload: gData })
           }).catch((error)=> {

            dispatch({ type: 'USERRESERVATION_FAILED', payload: error })
                //   if (error.response.data.message) {
                //     dispatch({ type: 'USERRESERVATION_FAILED', payload: error.response.data.message })
                // } else {
                //     dispatch({ type: 'USERRESERVATION_FAILED', payload: "Something went wrong" })
                // }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'USERRESERVATION_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'USERRESERVATION_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const StartChat = (userID, specialistID , type) => {
    return async (dispatch) => {
        dispatch({ type: 'STARTCHAT_ATTEMP' })
        try {
            axios.post('http://68.183.39.113/api/user/startChat',{
                userID,specialistID,type
            }).then(function (response) {
               if(response.data._id){
                dispatch({ type: 'STARTCHAT_SUCCESS'})
               }
            }).catch(function (error) {
                dispatch({ type: 'STARTCHAT_FAILED', payload: error.message })
                // if (error.response.data.message) {
                //     dispatch({ type: 'STARTCHAT_FAILED', payload: error.response.data.message })
                // } else {
                //     dispatch({ type: 'STARTCHAT_FAILED', payload: "Something went wrong" })
                // }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'STARTCHAT_FAILED', payload: "Something went wrong" })
        }
    }
}
export const getUserNotify =(userID)=>{
    return (dispatch) => {
        dispatch({ type: 'USERNOTIFY_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/notifyByUser',{
            params: {
                userID
            }
           })
           .then(function (response) {
            const Data = response.data;
            const arr = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   _id: Data[index]._id,
                   id: Data[index].userDataID._id,
                   msg: Data[index].msg,
                   msgAR: Data[index].msgAR,
                   imgPath: Data[index].userDataID.imgPath,
                   description: Data[index].userDataID.experiences,
                   fullname: Data[index].userDataID.fullname,
                   date: Data[index].createdAt,
                   type: Data[index].type,
                   seen: Data[index].seen
                   
                }
             
                arr.push(obj)
            }
                   dispatch({ type: 'USERNOTIFY_SUCCESS', payload: arr })
           }).catch(function (error) {
            dispatch({ type: 'USERNOTIFY_FAILED', payload: error})
                //   if (error.response.data.message) {
                //     dispatch({ type: 'USERNOTIFY_FAILED', payload: error.response.data.message })
                // } else {
                //     dispatch({ type: 'USERNOTIFY_FAILED', payload: "Something went wrong" })
                // }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'USERNOTIFY_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'USERNOTIFY_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getSpecialistNotify =(specialistID)=>{
    return (dispatch) => {
        dispatch({ type: 'SPECIALISTNOTIFY_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/notifyBySpecialist',{
            params: {
                specialistID
            }
           })
           .then(function (response) {
            const Data = response.data;
            const arr = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    _id: Data[index]._id,
                   id: Data[index].userDataID._id,
                   msg: Data[index].msg,
                   msgAR: Data[index].msgAR,
                   imgPath: Data[index].userDataID.imgPath,
                   fullname: Data[index].userDataID.fullname,
                   date: Data[index].createdAt,
                   type: Data[index].type,
                   seen: Data[index].seen
                   
                }
             
                arr.push(obj)
            }
                   dispatch({ type: 'SPECIALISTNOTIFY_SUCCESS', payload: arr })
           }).catch(function (error) {
            dispatch({ type: 'SPECIALISTNOTIFY_FAILED', payload: error })
                //   if (error.response.data.message) {
                //     dispatch({ type: 'SPECIALISTNOTIFY_FAILED', payload: error.response.data.message })
                // } else {
                //     dispatch({ type: 'SPECIALISTNOTIFY_FAILED', payload: "Something went wrong" })
                // }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'SPECIALISTNOTIFY_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'SPECIALISTNOTIFY_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const ReteChat =(chatID , rate)=>{
    return (dispatch) => {
        dispatch({ type: 'RATECHAT_ATTEMP' })
        NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.put('http://68.183.39.113/api/user/rate/'+ chatID ,{
             rate
           })
           .then(function (response) {
             if(response.data._id){
                dispatch({ type: 'RATECHAT_SUCCESS' })
             }
           }).catch(function (error) {
            dispatch({ type: 'RATECHAT_FAILED', payload: error })
                //   if (error.response.data.message) {
                //     dispatch({ type: 'RATECHAT_FAILED', payload: error.response.data.message })
                // } else {
                //     dispatch({ type: 'RATECHAT_FAILED', payload: "Something went wrong" })
                // }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'RATECHAT_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'RATECHAT_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getUserChat =(userID)=>{
    return (dispatch) => {
        dispatch({ type: 'USERCHAT_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/chatbyUser',{
            params: {
                userID
            }
           })
           .then(function (response) {
            const Data = response.data;
            const arr = []
            for (let index = 0; index < Data.length; index++) {
                   if(Data[index].requestID){
                    var obj = {
                        id: Data[index].speicalistID._id,
                        imgPath: Data[index].speicalistID.imgPath,
                        fullname: Data[index].speicalistID.fullname,
                        date: Data[index].createdAt,
                        requestID: Data[index].requestID                   
                     }
                   }else{
                    var obj = {
                        id: Data[index].speicalistID._id,
                        imgPath: Data[index].speicalistID.imgPath,
                        fullname: Data[index].speicalistID.fullname,
                        date: Data[index].createdAt,
                        sesstionID: Data[index].sesstionID                   
                     }
                   }
               
             
                arr.push(obj)
            }
                   dispatch({ type: 'USERCHAT_SUCCESS', payload: arr })
           }).catch(function (error) {
            dispatch({ type: 'USERCHAT_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'USERCHAT_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'USERCHAT_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'USERCHAT_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'USERCHAT_FAILED', payload: "No internet connection" })
       }
     });
    }
}
 export const getSpecialistChat =(speicalistID)=>{
    return (dispatch) => {
        dispatch({ type: 'SPECIALISTCHAT_ATTEMP' })
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/chatbyspeicalist',{
            params: {
                speicalistID
            }
           })
           .then(function (response) {
            const Data = response.data;
            const arr = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                   id: Data[index].userID._id,
                   imgPath: Data[index].userID.imgPath,
                   fullname: Data[index].userID.fullname,
                   date: Data[index].createdAt,                   
                }
             
                arr.push(obj)
            }
                   dispatch({ type: 'SPECIALISTCHAT_SUCCESS', payload: arr })
           }).catch(function (error) {
            dispatch({ type: 'SPECIALISTCHAT_FAILED', payload: error.message })
                  if (error.response.data.message) {
                    dispatch({ type: 'SPECIALISTCHAT_FAILED', payload: error.response.data.message })
                } else {
                    dispatch({ type: 'SPECIALISTCHAT_FAILED', payload: "Something went wrong" })
                }
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        dispatch({ type: 'SPECIALISTCHAT_FAILED', payload: "Something went wrong" })
       }
       
     } else {
        dispatch({ type: 'SPECIALISTCHAT_FAILED', payload: "No internet connection" })
       }
     });
    }
}

 


