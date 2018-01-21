const baseUrl = 'http://localhost:3006'

const toJson = response => {
    var json = response.ok ? response.json() : []
    return json;
};
//拼接参数
const getParam = data => {
    return Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`//TODO 是否得用encodeURI函数
    }).join('&');
};
/**
 * @param url 完整路径
 */
const getFetch = (url, data) => {
    if (data) {
        url += `?${getParam(data)}`;
    }
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        }
    }).then(toJson)
};

/**
 * @param url 完整路径
 */
const postFetch = (url, data) => {
    return fetch(url, {
        method: 'POST',
        // headers: {
        // 	Accept: '*/*',
        // 	'Content-Type': 'application/json'
        // },
        body: data
    }).then(toJson);
};

var get = (url, data) => {
    // let url = `${baseUrl}${path}`;

    return getFetch(url, data);
};
var post = (url, data) => {
    var param = new FormData();
    Object.keys(data).forEach((key, index) => {
        param.append(key, data[key])
    })
    return postFetch(url, param);
}


export { get, post }