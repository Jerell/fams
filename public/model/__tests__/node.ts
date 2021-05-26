import Node from '../node'

describe('Constructor - initial properties', () => {
	it('should have a name', () => {
		const node = new Node()

		expect(node.name).toBeTruthy()
	})

	it('should have an x position', () => {
		const node = new Node()

		expect(node.x).not.toBeUndefined()
	})

	it('should have an elevation', () => {
		const node = new Node()

		expect(node.elevation).not.toBeUndefined()
	})

	it('should have a pressure', () => {
		const node = new Node()

		expect(node.pressure).not.toBeUndefined()
	})

	it('should have a temperature', () => {
		const node = new Node()

		expect(node.temperature).not.toBeUndefined()
	})

	it('should have an inflow value', () => {
		const node = new Node()

		expect(node.flow.in).not.toBeUndefined()
	})

	it('should have an outflow value', () => {
		const node = new Node()

		expect(node.flow.out).not.toBeUndefined()
	})
})

describe('Constructor - receiving properties', () => {
	it('should accept a name', () => {
		const node = new Node({ name: 'michael' })

		expect(node.name).toBe('michael')
	})

	it('should accept an x position', () => {
		const node = new Node({ x: 1 })

		expect(node.x).toBe(1)
	})

	it('should accept an elevation value', () => {
		const node = new Node({ elevation: 1 })

		expect(node.elevation).toBe(1)
	})

	it('should accept a pressure value', () => {
		const node = new Node({ pressure: 1 })

		expect(node.pressure).toBe(1)
	})

	it('should accept a temperature value', () => {
		const node = new Node({ temperature: 1 })

		expect(node.temperature).toBe(1)
	})

	it('should accept a `flow.in` value', () => {
		const node = new Node({ flow: { in: 1 } })

		expect(node.inflow).toBe(1)
	})

	it('should accept a `flow.out` value', () => {
		const node = new Node({ flow: { out: 1 } })

		expect(node.outflow).toBe(1)
	})
})

describe('Flow getters and setters', () => {
	it('should return the same value for `node.inflow` and `node.flow.in`', () => {
		const node = new Node({ flow: { in: 1 } })

		expect(node.inflow).toEqual(node.flow.in)
	})

	it('should return the same value for `node.outflow` and `node.flow.out`', () => {
		const node = new Node({ flow: { out: 1 } })

		expect(node.outflow).toEqual(node.flow.out)
	})

	it('should update the outflow value when inflow is set', () => {
		const node = new Node()

		node.inflow = 1

		expect(node.inflow).toEqual(node.outflow)
	})

	it('should not update the outflow value when constructed with a `flow.in` value', () => {
		const node = new Node({ flow: { in: 1 } })

		expect(node.inflow).not.toEqual(node.outflow)
	})
})

describe('Pressure', () => {
	it('should update when reassigned', () => {
		const node = new Node()

		node.pressure = 1

		expect(node.pressure).toBe(1)
	})
})

describe('Type', () => {
	it('should have a default type of `closed`', () => {
		const node = new Node()

		expect(node.type).toBe('closed')
	})

	it('should have a type of `source` when its only flow value is `out`', () => {
		const node = new Node({ flow: { out: 1 } })

		expect(node.type).toBe('source')
	})

	it('should have a type of `destination` when its only flow value is `in`', () => {
		const node = new Node({ flow: { in: 1 } })

		expect(node.type).toBe('destination')
	})

	it('should have a type of `internal` when its inflow and outflow are equal and non-zero', () => {
		const node = new Node({ flow: { in: 1, out: 1 } })

		expect(node.type).toBe('internal')
	})
})

describe('Flow', () => {
	it('should update outflow to match when inflow changes', () => {
		const node = new Node()

		node.inflow = 1

		expect(node.outflow).toBe(1)
	})
})
