import {ajax} from '../../utils/ajax';

export const getPersonFullDetail = (id) =>{
    return ajax(null, `/people/${id}/`, 'GET', false)
}


