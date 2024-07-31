import axios from 'axios'

let BASE_URL = '/api'
export const makeApiCall = async (
    method,
    endpoint,
    params,

    content_type
) => {
    const headers = {
        // token: token,
        'Content-Type':
            content_type === 'raw'
                ? 'application/json'
                : content_type === 'formdata'
                  ? 'multipart/form-data'
                  : 'application/json',
        app_secret: 'DPynVwSytsm'
    }

    const config = {
        headers: headers
    }

    try {
        let response
        if (method === 'post') {
            response = await axios.post(BASE_URL + endpoint, params, config)
        } else if (method == 'delete') {
            if (params === null) {
                params = ''
            }
            response = await axios.delete(BASE_URL + endpoint + params, config)
        } else {
            if (params === null) {
                params = ''
            }
            response = await axios.get(BASE_URL + endpoint + params, config)
        }
        if (response.data.status === 10) {
            //   handleLogout(navigateFunc);
        } else {
            return response
        }
    } catch (error) {
        // if (error.response.data.status === 10) {
        //   handleLogout(null);
        //   window.location.href = "/login";
        //   console.log("API call logout");
        // }
        console.error('API call error:', error)
        throw error // Rethrow the error to handle it at the calling site
    }
}
export const getDateTime = (timestamp) => {
    const date = new Date(timestamp)
    // Get the components of the date
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    // Format the date and time
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return formattedDateTime
}
