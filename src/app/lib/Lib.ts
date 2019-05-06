import url from "url";
import qs from "querystring";
import Base64 from "./Base64";

export function createObject(dotString: string, value: any) {
    let array = dotString.split(".");

    let object = {};

    let create = (obj: any, arr: any, val: any) => {
        let l = arr.shift();

        if (arr.length === 0) {
            obj[l] = val;
            return obj;
        }

        obj[l] = {};

        create(obj[l], arr, val);
    };

    create(object, array, value);

    return object;
}

export function deepMerge(obj1: any, obj2: any) {
    let key;
    for (key in obj2) {
        obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
    }
    return obj1;
}

export function copyTextToClipboard(text: any) {
    let txtArea = document.createElement("textarea");
    txtArea.id = "txt";
    txtArea.style.position = "fixed";
    txtArea.style.top = "0";
    txtArea.style.left = "0";
    txtArea.style.opacity = "0";
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();
    try {
        return document.execCommand("copy");
    } catch (err) {
        console.log(err);
    } finally {
        document.body.removeChild(txtArea);
    }
    return false;
}

export function parseURL() {
    let urlInfo = url.parse(window.location.href);

    let query = urlInfo.query;
    if (!query) return false;

    let q = qs.parse(query);
    if (!q.package_info) return false;
    if (!q.params) return false;

    let params = {};
    let packageInfo = {};

    try {
        params = JSON.parse(decodeURIComponent(atob(q.params as string)));
        packageInfo = JSON.parse(decodeURIComponent(atob(q.package_info as string) as string));
    } catch (error) {
        console.log(error);
        return false;
    }

    return { params, packageInfo };
}
