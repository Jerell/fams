import PipeSegment from '../pipeSegment'
import Node from '../node'
import Valve from '../valve'

describe('Constructor', () => {
	it('should have a name', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.name).toBeTruthy()
	})

	it('should have a length', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.length).not.toBeUndefined()
	})

	it('should have a diameter', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.diameter).not.toBeUndefined()
	})

	it('should have a mass flow rate', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.massFlow).not.toBeUndefined()
	})

	it('should have an in pressure', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.pressure.in).not.toBeUndefined()
	})

	it('should have an out pressure', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.pressure.out).not.toBeUndefined()
	})

	it('should have a source node', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.source).toBeInstanceOf(Node)
	})

	it('should have a destination node', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.destination).toBeInstanceOf(Node)
	})
})

describe('Constructor - receiving properties', () => {
	it('should accept a name', () => {
		const pipeSeg = new PipeSegment({ name: 'michael' })

		expect(pipeSeg.name).toBe('michael')
	})

	it('should accept a length', () => {
		const pipeSeg = new PipeSegment({ length: 1 })

		expect(pipeSeg.length).toBe(1)
	})

	it('should accept a diameter', () => {
		const pipeSeg = new PipeSegment({ diameter: 1 })

		expect(pipeSeg.diameter).toBe(1)
	})

	it('should accept a massFlow value', () => {
		const pipeSeg = new PipeSegment({ massFlow: 1 })

		expect(pipeSeg.massFlow).toBe(1)
	})

	it('should accept an endElevation value, which sets the elevation of the destination node', () => {
		const pipeSeg = new PipeSegment({ endElevation: 10 })

		expect(pipeSeg.destination.elevation).toBe(10)
	})

	it('should set the destination x position to be the source x + length', () => {
		const pipeSeg = new PipeSegment({ length: 1 })

		expect(pipeSeg.destination.x).toBe(1)
	})

	it('should have a length equal to the distance between its source and destination nodes (1/2)', () => {
		const s = new Node()
		const d = new Node({ x: 3, elevation: 4 })

		const pipeSeg = new PipeSegment({ source: s, destination: d })

		expect(pipeSeg.length).toBe(5)
	})

	it('should have a length equal to the distance between its source and destination nodes (2/2)', () => {
		const s = new Node()
		const d = new Node({ x: 6, elevation: 8 })

		const pipeSeg = new PipeSegment({ source: s, destination: d })

		expect(pipeSeg.length).toBe(10)
	})
})

describe('Pressure', () => {
	it('should have an input pressure the same as the source node', () => {
		const node = new Node()
		const pipeSeg = new PipeSegment()

		node.pressure = 1
		pipeSeg.source = node

		expect(pipeSeg.pressure.in).toBe(1)
	})

	it('should update destination node pressure if out pressure is lower', () => {
		const node = new Node()
		const pipeSeg = new PipeSegment()

		node.pressure = 2
		pipeSeg.pressure.out = 1
		pipeSeg.destination = node

		expect(node.pressure).toBe(1)
	})

	it('should calculate pressure drop', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipeSeg.source = sourceNode

		expect(pipeSeg.pressure.out).toBeCloseTo(99999.97692)
	})

	it('should set the pressure of the destination node to the calculated value', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipeSeg.source = sourceNode

		expect(pipeSeg.destination.pressure).toBeCloseTo(99999.97692)
	})
})

describe('Pressure continuity', () => {
	it('should return true if `pressure.out === destination.pressure`', () => {
		const nodeA = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg1 = new PipeSegment({
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipeSeg1.source = nodeA

		const nodeB = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg2 = new PipeSegment({
			length: 200,
			diameter: 1,
			massFlow: 10,
		})
		pipeSeg2.source = nodeB

		const dest = new Node({ temperature: 220 })
		pipeSeg1.destination = dest
		pipeSeg2.destination = dest

		expect(pipeSeg2.pressureContinuity).toBe(true)
	})

	it('should return false if `pressure.out !== destination.pressure`', () => {
		const nodeA = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg1 = new PipeSegment({
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipeSeg1.source = nodeA

		const nodeB = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg2 = new PipeSegment({
			length: 200,
			diameter: 1,
			massFlow: 10,
		})
		pipeSeg2.source = nodeB

		const dest = new Node({ temperature: 220 })
		pipeSeg1.destination = dest
		pipeSeg2.destination = dest

		expect(pipeSeg1.pressureContinuity).toBe(false)
	})
})

describe('Direction', () => {
	it('should return null by default', () => {
		const pipeSeg = new PipeSegment()
		expect(pipeSeg.direction).toBeNull()
	})

	it('should return true if the source pressure is greater than the destination pressure', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })

		pipeSeg.source = sourceNode

		expect(pipeSeg.direction).toBe(true)
	})

	it('should return false if the source pressure is less than the destination pressure', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })

		pipeSeg.source = sourceNode
		pipeSeg.pressure.out = 2 * pipeSeg.pressure.in

		expect(pipeSeg.direction).toBe(false)
	})
})

describe('Valve', () => {
	it('should return false by default', () => {
		const pipeSeg = new PipeSegment()

		expect(pipeSeg.valve).toBe(false)
	})

	it('addValve should throw an error when given zero pressure', () => {
		const pipeSeg = new PipeSegment()

		expect(() => pipeSeg.addValve()).toThrow('Invalid')
	})

	it('should create a valve when addValve is called on a pipeSeg with a non-zero out pressure', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipeSeg.source = sourceNode

		pipeSeg.addValve()

		expect(pipeSeg.valve).toBeInstanceOf(Valve)
	})

	it('should reset to false when removeValve is called', () => {
		const sourceNode = new Node({ pressure: 100000, temperature: 220 })
		const pipeSeg = new PipeSegment({ length: 200, diameter: 2, massFlow: 10 })
		pipeSeg.source = sourceNode

		pipeSeg.addValve()
		pipeSeg.removeValve()

		expect(pipeSeg.valve).toBe(false)
	})

	it('should be named after the pipe', () => {
		const sourceNode = new Node({
			pressure: 100000,
			temperature: 220,
		})
		const pipeSeg = new PipeSegment({
			name: 'testpipe',
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipeSeg.source = sourceNode

		pipeSeg.addValve()

		expect((pipeSeg.valve as Valve).name).toBe('testpipe-valve')
	})

	it('should have `pressure.in` equal to the `pressure.out` of the pipe', () => {
		const sourceNode = new Node({
			pressure: 100000,
			temperature: 220,
		})
		const pipeSeg = new PipeSegment({
			name: 'testpipe',
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipeSeg.source = sourceNode

		pipeSeg.addValve()

		expect((pipeSeg.valve as Valve).pressure.in).toEqual(pipeSeg.pressure.out)
	})

	it('should have `pressure.out` equal to the `pressure` of the destination node', () => {
		const sourceNode = new Node({
			pressure: 100000,
			temperature: 220,
		})
		const pipeSeg = new PipeSegment({
			name: 'testpipe',
			length: 200,
			diameter: 2,
			massFlow: 10,
		})
		pipeSeg.source = sourceNode

		pipeSeg.addValve()

		expect((pipeSeg.valve as Valve).pressure.out).toEqual(
			pipeSeg.destination.pressure
		)
	})
})
