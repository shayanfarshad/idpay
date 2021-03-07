import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const base = 'https://swapi.dev/api';






export function ajax(sys, url, Method, isbody, body) {
    let localUrl = base + url;
    // AsyncStorage.getItem('token').then((token)=>{
    //     console.log(token)
    // })
    switch (sys) {
        case 'tokenFormData':
            console.log('eee',body)
            return AsyncStorage.getItem('token').then((token)=>{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                return axios({
                    method: Method,
                    url: localUrl,
                    data: isbody ? body : null,
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token}
                });
            })
            
            
        case 'tokenJson':
            return (
                AsyncStorage.getItem('token').then((token)=>{
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                    console.log('token',token)
                    return axios({
                        url:localUrl,
                        method:Method,
                        data:  isbody ? JSON.stringify(body) : null,
                        headers: {
                           Accept: 'application/json',
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token,
                           'uuid':uuid,
                        }
                   })
                })
                 
            );

        case 'TokenUrl':
            return(
                AsyncStorage.getItem('token').then((token)=>{
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                    return axios({
                        url: localUrl + body,
                        method:Method,
                        data:  isbody ? JSON.stringify(body) : null,
                        headers: {
                           Accept: 'application/json',
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token
                        }
                   })
                })
            )
            
        case 'Url':
            function checkbody(localUrl,body){
                if(typeof(body) === 'undefined'){
                    return localUrl
                }else{
                    return localUrl + body
                }
            }
            return AsyncStorage.getItem('token').then((token)=>{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                return axios({
                    url:        checkbody(localUrl,body),
                    method:     Method,
                    headers: {
                      Accept:           'application/json',
                      'Content-Type':   'application/json',
                      'Authorization': 'Bearer ' + token
                    }
                  });
            })
            
        case 'FormData':
            return AsyncStorage.getItem('userToken').then((token)=>{
                return axios({
                    method: Method,
                    url: localUrl,
                    data: isbody ? body : null,
                    headers: { 'Content-Type': 'multipart/form-data' ,'Authorization': 'Bearer ' + token}
                });
            })
            
        default:
            return (
                axios({
                    url: localUrl ,
                    method: Method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: isbody ? JSON.stringify(body) : null
                })
            )
            
    }
}

