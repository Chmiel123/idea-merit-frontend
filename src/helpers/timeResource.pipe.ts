import { Pipe } from '@angular/core';
import { classicNameResolver } from 'typescript';

@Pipe({
    name: 'TimeResource'
})
export class TimeResourcePipe {
    static multipliers: { [key: string]: number } = {
        "m": 1/60,
        "min": 1/60,
        "mins": 1/60,
        "minute": 1/60,
        "minutes": 1/60,
        "h": 1,
        "hour": 1,
        "hours": 1,
        "s": 1/60/60,
        "sec": 1/60/60,
        "secs": 1/60/60,
        "second": 1/60/60,
        "seconds": 1/60/60,
        "d": 24,
        "day": 24,
        "days": 24
    }

    transform(value: any, ...args: any[]) {
        const timeH = value as number;
        const timeD = timeH / 24.0;
        const timeM = timeH * 60.0;
        const timeS = timeM * 60.0;
        let result = "";

        if (timeD >= 1) {
            result += Math.floor(timeD) + "d "
        }
        if (timeH >= 1 && timeH % 24 != 0) {
            result += Math.floor(timeH % 24) + "h "
        }
        if (timeH < 24 && timeM >= 1 && timeM % 60 != 0) {
            result += Math.floor(timeM % 60) + "m "
        }
        if (timeH < 1 && timeS % 60 != 0) {
            result += Math.floor(timeS % 60) + "s"
        }
        return result;
    }

    reverse_transform(text: String): number {
        console.log(text);
        let matches = text.match(/\d+/gi);
        let number = 0;
        if (matches) {
            number = Number(matches[0]);
        }
        matches = text.match(/[m,min,mins,minute,minutes,h,hour,hours,s,sec,second,seconds,d,day,days]/gi);
        let multipier = 1;
        if (matches) {
            multipier = TimeResourcePipe.multipliers[matches[0]]
        }
        if (multipier) {
            number *= multipier;
        }
        return number;
    }
}