import {get} from "adapters/xhr";

export class SHT31Entry {
    id: number;
    timestamp: number;
    temperature: number;
    relative_humidity: number;

    constructor() {
        this.id = 0;
        this.timestamp = 0;
        this.temperature = 0;
        this.relative_humidity = 0;
    }
}

export class SHT31Data {
    entries: SHT31Entry[]

    constructor() {
        this.entries = [];
    }
}


export class SHT31 {
    static getLatestSamples(cb: (data: any) => void) {
        return get('/sht31d/20').then((response: any) => {
            cb(response.data);
        });
    }

    static getInterval(start: Date, end: Date, cb: (data: any) => void) {
        const startTs = start.getTime() / 1000;
        const endTs = end.getTime() / 1000;
        return get(`/sht31d/interval/${startTs}/${endTs}`).then((response: any) => {
            cb(response.data);
        });
    }
}