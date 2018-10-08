import { IMAGE_URL } from './config';
import { getUploadToken } from '../services/common';

export const handleIMG = (url) => {
    if (!url) return '';
    if (url.includes('http') || url.includes('https')) {
        return url;
    }
    return IMAGE_URL + url;
};

// 对象，按从大到小重新排列，comKey为比较属性
export const sortArr = (arr, comKey) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j][comKey] < arr[j + 1][comKey]) { // 相邻元素两两对比
                let temp = arr[j + 1]; // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};

export const uploadImageReq = (file) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const key = `back-${Date.now()}-${text}`;
    return new Promise(
        (resolve, reject) => {
            getUploadToken({
                bucket: 'dx-image-test',
                key,
                expires: 3600
            }).then((res) => {
                if (res && res.code === 1) {
                    let formData = new window.FormData();
                    formData.append('file', file);
                    formData.append('token', res.data.token);
                    formData.append('key', key);
                    fetch('http://up.qiniu.com', {
                        method: 'post',
                        mode: 'cors',
                        body: formData
                    }).then(json => {
                        return json.json();
                    }).then((data) => {
                        resolve({ data: { link: handleIMG(data.key) }});
                    });
                } else {
                    reject(res);
                }
            });
        }
    );
};
