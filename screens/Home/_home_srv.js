import {ajax} from '../../utils/ajax';

export const getDataPerson = (page) =>{
    return ajax(null, `/people/?page=${page}`, 'GET', false)
}


