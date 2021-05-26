import Pipe from '../pipe'
import Node from '../node'

describe('Constructor', () => {
	it('should have a name', () => {
		const pipe = new Pipe()
		expect(pipe.name).toBeTruthy()
	})

	it('should have a length', () => {
		const pipe = new Pipe()
		expect(pipe.length).not.toBeUndefined()
	})

	it('should have a diameter', () => {
		const pipe = new Pipe()
		expect(pipe.diameter).not.toBeUndefined()
	})

	it('should have a mass flow rate', () => {
		const pipe = new Pipe()
		expect(pipe.massFlow).not.toBeUndefined()
	})

	it('should have an in pressure', () => {
		const pipe = new Pipe()
		expect(pipe.pressure.in).not.toBeUndefined()
	})

	it('should have an out pressure', () => {
		const pipe = new Pipe()
		expect(pipe.pressure.out).not.toBeUndefined()
	})

	it('should have a source node', () => {
		const pipe = new Pipe()
		expect(pipe.source).toBeInstanceOf(Node)
	})

	it('should have a destination node', () => {
		const pipe = new Pipe()
		expect(pipe.destination).toBeInstanceOf(Node)
	})
})

describe('Constructor - receiving properties', () => {
	it('should accept a name', () => {
		const pipe = new Pipe({ name: 'michael' })

		expect(pipe.name).toBe('michael')
	})

	it('should accept a length', () => {
		const pipe = new Pipe({ length: 1 })

		expect(pipe.length).toBe(1)
	})

	it('should accept a diameter', () => {
		const pipe = new Pipe({ diameter: 1 })

		expect(pipe.diameter).toBe(1)
	})

	it('should accept a massFlow value', () => {
		const pipe = new Pipe({ massFlow: 1 })

		expect(pipe.massFlow).toBe(1)
	})

	it('should accept an endElevation value, which sets the elevation of the destination node', () => {
		const pipe = new Pipe({ endElevation: 10 })

		expect(pipe.destination.elevation).toBe(10)
	})

	it('should set the destination x position to be the source x + length', () => {
		const pipe = new Pipe({ length: 1 })

		expect(pipe.destination.x).toBe(1)
	})
})

describe('Pressure', () => {
	it('should have an input pressure the same as the source node', () => {
		const node = new Node()
		const pipe = new Pipe()

		node.pressure = 1
		pipe.source = node

		expect(pipe.pressure.in).toBe(1)
	})

	it('should update destination node pressure if out pressure is lower', () => {
		const node = new Node()
		const pipe = new Pipe()

		node.pressure = 2
		pipe.pressure.out = 1
		pipe.destination = node

		expect(node.pressure).toBe(1)
	})

	it('should calculate pressure drop', () => {
		const node = new Node({ pressure: 1 })
		const pipe = new Pipe({ length: 200, diameter: 2 })
		pipe.source = node

		const drop = pipe.pressureDrop()

		expect(drop).toBeCloseTo(0.49)
	})
})

describe('Direction', () => {
	it('should return null by default', () => {
		const pipe = new Pipe()
		expect(pipe.direction).toBeNull()
	})

	it('should return true if the source pressure is greater than the destination pressure', () => {
		const pipe = new Pipe()
		const input = new Node({ pressure: 2 })

		pipe.source = input

		expect(pipe.direction).toBe(true)
	})

	it('should return false if the source pressure is less than the destination pressure', () => {
		const pipe = new Pipe()
		const input = new Node({ pressure: 1 })

		pipe.source = input
		pipe.pressure.out = 2

		expect(pipe.direction).toBe(false)
	})
})
