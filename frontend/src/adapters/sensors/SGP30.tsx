import { get } from "adapters/xhr";

export class SGP30 {
    static getLatestSamples(cb:(data: any) => void) {
        return get('/sgp30/20').then((response: any) => {
            cb(response.data);
        });
    }
}