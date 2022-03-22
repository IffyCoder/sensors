import { get } from "adapters/xhr";

export class PM25 {
    static getLatestSamples(cb:(data: any) => void) {
        return get('/pm25/20').then((response: any) => {
            cb(response.data);
        });
    }
}