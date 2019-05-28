
import { Params } from "../interface/Params";
import { Package } from "../interface/Package";

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

export function parseQueryString(path: string) {
    var arr = {} as any;
    path.slice(1)
        .split("&")
        .map((e: any) => e.split("="))
        .forEach(e => (arr[e[0]] = e[1]));
    return arr;
}

export function parseURL(str: string) {
    try {
        let jsonString = decodeURIComponent(atob(str));

        let queryString = parseQueryString("?" + jsonString);

        let params = JSON.parse(queryString.params) as Params;
        let packageInfo = JSON.parse(queryString.package_info) as Package;

        return { params, packageInfo };
    } catch (error) {
        return false;
    }
}
