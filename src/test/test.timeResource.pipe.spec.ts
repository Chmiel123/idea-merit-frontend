import { TimeResourcePipe } from "src/helpers/timeResource.pipe";

describe('TimeResourcePipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new TimeResourcePipe();

    it('transforms "72 + 5" to "3d 5h"', () => {
        expect(pipe.transform(72 + 5).trim()).toBe('3d 5h');
    });

    it('transforms "24" to "1d 0h"', () => {
        expect(pipe.transform(24).trim()).toBe('1d 0h');
    });

    it('transforms "23.5" to "23h 30m"', () => {
        expect(pipe.transform(23.5).trim()).toBe('23h 30m');
    });

    it('transforms "1" to "1h 0m"', () => {
        expect(pipe.transform(1).trim()).toBe('1h 0m');
    });

    it('transforms "0.5" to "30m 0s"', () => {
        expect(pipe.transform(0.5).trim()).toBe('30m 0s');
    });

    it('transforms "1.5 min" to "1m 30s"', () => {
        expect(pipe.transform(1.5 / 60).trim()).toBe('1m 30s');
    });

});