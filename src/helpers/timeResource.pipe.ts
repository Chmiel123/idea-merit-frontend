import { Pipe } from '@angular/core';

@Pipe({
    name: 'TimeResource'
})
export class TimeResourcePipe {
    transform(value: any, ...args: any[]) {
        const timeH = value as number;
        const timeD = timeH / 24.0;
        const timeM = timeH * 60.0;
        const timeS = timeM * 60.0;
        let result = "";

        if (timeD > 1) {
            result += Math.floor(timeD) + "d "
        }
        if (timeH > 1) {
            result += Math.floor(timeH % 24) + "h "
        }
        if (timeH < 24 && timeM > 0) {
            result += Math.floor(timeM % 60) + "m "
        }
        if (timeH < 1) {
            result += Math.floor(timeS % 60) + "s"
        }
        return result;
    }
}