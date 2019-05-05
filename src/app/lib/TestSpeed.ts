import Axios from "axios";

import url from "url";

const TestSpeed = async (urls: string[], count?: number) => {
    count = count || urls.length;

    return await new Promise((r, j) => {
        let obj: any = [];

        let counter = 0;

        let fn = (o: any) => {
            obj.push(o);

            counter++;

            if (counter === count) {
                r(obj);
            }

            if (counter === urls.length) {
                // console.log("ALL TEST SPEED TASK DONE", obj);
            }
        };

        let errObj: any = [];

        let errCounter = 0;

        let err = (error: { toString: () => void }) => {
            errObj.push(error.toString());
            errCounter++;
            if (errCounter === urls.length) {
                console.log(errCounter, urls.length);
                j(new Error(errObj));
            }
        };

        for (let index = 0; index < urls.length; index++) {
            let u = urls[index];
            let startTime = Date.now();
            Axios.get(u)
                .then((res: any) => {
                    if (res.status === 200) {
                        let c = url.parse(res.config.url);

                        fn({
                            delay: Date.now() - startTime,
                            data: res.data,
                            url: res.config.url,
                            host: c.host,
                            protocol: c.protocol ? c.protocol.replace(":", "") : "",
                            port: c.port || 80,
                            path: c.path,
                            query: c.query
                        });
                    }
                })
                .catch(error => {
                    err(error);
                });
        }
    });
};

export default TestSpeed;
