import axios from 'axios'
import { ElMessage } from 'element-plus'

// create an axios instance
const service = axios.create({
    // baseURL: 'https://www.xinguyufu.cn', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // config.headers['Authorization'] = getToken()
        config.headers['accept'] = "application/x.fm.v1+json";
        config.headers['accept-language'] = "zh-CN,zh;q=0.9";
        // config.headers['content-type'] = "application/x-www-form-urlencoded; charset=UTF-8";
        config.headers['x-requested-with'] = "XMLHttpRequest";
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        console.log(res)
        // if the custom code is not 200, it is judged as an error.
        if (response.status !== 200) {
            ElMessage({
                message: res.errorMessage || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //   // to re-login
            //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            //     confirmButtonText: 'Re-Login',
            //     cancelButtonText: 'Cancel',
            //     type: 'warning'
            //   }).then(() => {
            //     store.dispatch('user/resetToken').then(() => {
            //       location.reload()
            //     })
            //   })
            // }
            return Promise.reject(new Error(res.errorMessage || 'Error'))
        } else {
            if (res instanceof Blob === false) {
                return res.data
            }
            return response
        }
    },
    error => {
        console.log('err' + error) // for debug
        // 401 授权过期跳转到登录页
        ElMessage({
            message: '授权过期',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
