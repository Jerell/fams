import Valve from '../valve'

describe('Constructor', () => {
	it('should have a name', () => {
		const valve = new Valve({ pressure: { in: 2, out: 1 } })

		expect(valve.name).toBeTruthy()
	})

	it('should throw if given a zero pressure value (in)', () => {
		expect(() => new Valve({ pressure: { out: 1, in: 0 } })).toThrow('Invalid')
	})

	it('should throw if given a zero pressure value (out)', () => {
		expect(() => new Valve({ pressure: { out: 0, in: 1 } })).toThrow('Invalid')
	})

	it('should throw if given a zero pressure value (both)', () => {
		expect(() => new Valve({ pressure: { out: 0, in: 0 } })).toThrow('Invalid')
	})

	it('should throw if given an out pressure greater than its in pressure', () => {
		expect(() => new Valve({ pressure: { out: 2, in: 1 } })).toThrow('Invalid')
	})
})
