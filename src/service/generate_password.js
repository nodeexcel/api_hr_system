let fill = require('fill-range');

const _randomString = (callback) => {
    let result = '';
    let length = 5;
    for (var i = 0; i < length; i++) {
        let data;
        let random_case = Math.floor(Math.random() * 2) + 0;
        switch (random_case) {
            case 0:
                data = Math.floor(Math.random() * 10) + 0;
                data = data;
                break;
            case 1:
                let random = fill('A', 'Z');
                let item = Math.floor(Math.random() * 26) + 0;
                let get = random[item];
                data = get;
                break;
        }
        result += data;
    }
    callback(result);
}
export default {
    _randomString
}