import PipeSegment from '../pipeSegment'
import Node from '../node'
import Valve from '../valve'

describe('Constructor', () => {
	it('should have a name', () => {
		const pipe = new PipeSegment()
		expect(pipe.name).toBeTruthy()
	})

	it('should have a length', () => {
		const pipe = new PipeSegment()
		expect(pipe.length).not.toBeUndefined()
	})

	it('should have a diameter', () => {
		const pipe = new PipeSegment()
		expect(pipe.diameter).not.toBeUndefined()
	})

	it('should have a mass flow rate', () => {
		const pipe = new PipeSegment()
		expect(pipe.massFlow).not.toBeUndefined()
	})

	it('should have an in pressure', () => {
		const pipe = new PipeSegment()
		expect(pipe.pressure.in).not.toBeUndefined()
	})

	it('should have an out pressure', () => {
		const pipe = new PipeSegment()
		expect(pipe.pressure.out).not.toBeUndefined()
	})

	it('should have a source node', () => {
		const pipe = new PipeSegment()
		expect(pipe.source).toBeInstanceOf(Node)
	})

	it('should have a destination node', () => {
		const pipe = new PipeSegment()
		expect(pipe.destination).toBeInstanceOf(Node)
	})
})

describe('Constructor - receiving properties', () => {
	it('should accept a name', () => {
		const pipe = new PipeSegment({ name: 'michael' })

		expect(pipe.name).toBe('michael')
	})

	it('should accept a length', () => {
		const pipe = new PipeSegment({ length: 1 })

		expect(pipe.length).toBe(1)
	})

	it('should accept a diameter', () => {
		const pipe = new PipeSegment({ diameter: 1 })

		expect(pipe.diameter).toBe(1)
	})

	it('should accept a massFlow value', () => {
		const pipe = new PipeSegment({ massFlow: 1 })

		expect(pipe.massFlow).toBe(1)
	})

	it('should accept an endElevation value, which sets the elevation of the destination node', () => {
		const pipe = new PipeSegment({ endElevation: 10 })

		expect(pipe.destination.elevation).toBe(10)
	})

	it('should set the destination x position to be the source x + length', () => {
		const pipe = new PipeSegment({ length: 1 })

		expect(pipe.destination.x).toBe(1)
	})
})

describe('Pressure', () => {
	it('should have an input pressure the same as the source node', () => {
		const node = new Node()
		const pipe = new PipeSegment()

		node.pressure = 1
		pipe.source = node

		expect(pipe.pressure.in).toBe(1)
	})

	it('should update destination node pressure if out pressure is lower', () => {
		const node = new Node()
		const pipe = new PipeSegment()

		node.pressure = 2
		pipe.pressure.out = 1
		pipe.destination = node

		expect(node.pressure).toBe(1)
	})

	it('should calculate pressure drop', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipe = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipe.source = sourceNode

		expect(pipe.pressure.out).toBeCloseTo(99999.97692)
	})

	it('should set the pressure of the destination node to the calculated value', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipe = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipe.source = sourceNode

		expect(pipe.destination.pressure).toBeCloseTo(99999.97692)
	})
})

describe('Pressure continuity', () => {
	it('should return true if `pressure.out === destination.pressure`', () => {
		const nodeA = new Node({ pressure: 100000, temperature: 220 })
		const pipe1 = new PipeSegment({
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipe1.source = nodeA

		const nodeB = new Node({ pressure: 100000, temperature: 220 })
		const pipe2 = new PipeSegment({
			length: 200,
			diameter: 1,
			massFlow: 10,
		})
		pipe2.source = nodeB

		const dest = new Node({ pressure: 100000, temperature: 220 })
		pipe1.destination = dest
		pipe2.destination = dest

		expect(pipe2.pressureContinuity).toBe(true)
	})

	it('should return false if `pressure.out !== destination.pressure`', () => {
		const nodeA = new Node({ pressure: 100000, temperature: 220 })
		const pipe1 = new PipeSegment({
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipe1.source = nodeA

		const nodeB = new Node({ pressure: 100000, temperature: 220 })
		const pipe2 = new PipeSegment({
			length: 200,
			diameter: 1,
			massFlow: 10,
		})
		pipe2.source = nodeB

		const dest = new Node({ pressure: 100000, temperature: 220 })
		pipe1.destination = dest
		pipe2.destination = dest

		expect(pipe1.pressureContinuity).toBe(false)
	})
})

describe('Direction', () => {
	it('should return null by default', () => {
		const pipe = new PipeSegment()
		expect(pipe.direction).toBeNull()
	})

	it('should return true if the source pressure is greater than the destination pressure', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipe = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })

		pipe.source = sourceNode

		expect(pipe.direction).toBe(true)
	})

	it('should return false if the source pressure is less than the destination pressure', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipe = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })

		pipe.source = sourceNode
		pipe.pressure.out = 2 * pipe.pressure.in

		expect(pipe.direction).toBe(false)
	})
})

describe('Valve', () => {
	it('should return false by default', () => {
		const pipe = new PipeSegment()

		expect(pipe.valve).toBe(false)
	})

	it('addValve should throw an error when given zero pressure', () => {
		const pipe = new PipeSegment()

		expect(() => pipe.addValve()).toThrow('Invalid')
	})

	it('should create a valve when addValve is called on a pipe with a non-zero out pressure', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipe = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipe.source = sourceNode

		pipe.addValve()

		expect(pipe.valve).toBeInstanceOf(Valve)
	})

	it('should reset to false when removeValve is called', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipe = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipe.source = sourceNode

		pipe.addValve()
		pipe.removeValve()

		expect(pipe.valve).toBe(false)
	})

	it('should be named after the pipe', () => {
		const sourceNode = new Node({
			pressure: 100000,
			temperature: 220,
		})
		const pipe = new PipeSegment({
			name: 'testpipe',
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipe.source = sourceNode

		pipe.addValve()

		expect((pipe.valve as Valve).name).toBe('testpipe-valve')
	})

	it('should have `pressure.in` equal to the `pressure.out` of the pipe', () => {
		const sourceNode = new Node({
			pressure: 100000,
			temperature: 220,
		})
		const pipe = new PipeSegment({
			name: 'testpipe',
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipe.source = sourceNode

		pipe.addValve()

		expect((pipe.valve as Valve).pressure.in).toEqual(pipe.pressure.out)
	})

	it('should have `pressure.out` equal to the `pressure` of the destination node', () => {
		const sourceNode = new Node({
			pressure: 100000,
			temperature: 220,
		})
		const pipe = new PipeSegment({
			name: 'testpipe',
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipe.source = sourceNode

		pipe.addValve()

		expect((pipe.valve as Valve).pressure.out).toEqual(
			pipe.destination.pressure
		)
	})
})
