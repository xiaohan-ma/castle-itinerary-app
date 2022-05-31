import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `http://localhost:3001/`,
        headers: {'X-Custom-Header': 'foobar'}
    })
}