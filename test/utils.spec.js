import { clamp, caclulatePercentage } from '../src/utils'

describe('utils', () => {
    it('clamp value', () => {
        expect(clamp(0, 10, 5)).toBe(5)
        expect(clamp(0, 10, -1)).toBe(0)
        expect(clamp(0, 10, 11)).toBe(10)
    })

    describe('caclulatePercentage', () => {
        it('when the angle is inside the range ', () => {
            const result = caclulatePercentage({
                startX: 0,
                startY: 0,
                pageX: 0,
                pageY: 10,
                angleOffset: 0,
                angleRange: 360,
            })
            expect(result).toBe(0.5)
        })
        it('when the angle is larger then the range ', () => {
            const result = caclulatePercentage({
                startX: 0,
                startY: 0,
                pageX: 0,
                pageY: 10,
                angleOffset: 0,
                angleRange: 90,
            })
            expect(result).toBe(1)
        })
    })
})
