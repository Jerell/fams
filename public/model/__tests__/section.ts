import Section from '../section'
import Node from '../node'

describe('Constructor', () => {
	it('should have a name', () => {
		const sec = new Section()

		expect(sec.name).toBeTruthy()
	})

	it('should have a default resolution of 200', () => {
		const sec = new Section()

		expect(sec.resolution).toBe(200)
	})

	it('should have a default length of 200', () => {
		const sec = new Section()

		expect(sec.length).toBe(200)
	})

	it('should have a source node', () => {
		const sec = new Section()

		expect(sec.source).toBeInstanceOf(Node)
	})

	it('should have a destination node', () => {
		const sec = new Section()

		expect(sec.destination).toBeInstanceOf(Node)
	})

	it('should have a default node list that begins with its source node', () => {
		const sec = new Section()

		const source = sec.source

		expect(sec.nodes[0]).toBe(source)
	})

	it('should have a network containing its source node', () => {
		const sec = new Section()

		expect(sec.network.nodes).toContainEqual(sec.source)
	})
})

describe('Chain', () => {
	it('should create 1 pipe when the resolution of the section equals its length', () => {
		const sec = new Section()

		expect(sec.network.pipes.length).toBe(1)
	})

	it('should create a pipe of length `resolution`', () => {
		const sec = new Section({ resolution: 100 })

		expect(sec.network.pipes[0].length).toBe(sec.resolution)
	})

	it('should create a series of pipes of length `resolution`', () => {
		const sec = new Section({ resolution: 10, length: 30 })

		const lengths = sec.network.pipes.map((p) => p.length)

		expect(lengths).toEqual([10, 10, 10])
	})

	it('should create two pipes when its length is 200 and resolution is 100', () => {
		const sec = new Section({ length: 200, resolution: 100 })

		expect(sec.network.pipes.length).toBe(2)
	})

	it('should create four nodes when its length is 250 and resolution is 100', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.nodes.length).toBe(4)
	})

	it('should create three pipes when its length is 250 and resolution is 100', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.pipes.length).toBe(3)
	})

	it('should create a final pipe of length 50 when the section length is 250 and resolution is 100', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.pipes[2].length).toBe(50)
	})

	it('should set the x position of the second node to be 100 when the resolution is 100', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.nodes[1].x).toBe(100)
	})

	it('should set the x position of the third node to be 200 when the resolution is 100', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.nodes[2].x).toBe(200)
	})

	it('should set the x positions for `resolution = 10`, `length = 30` to be [0, 10, 20, 30]', () => {
		const sec = new Section({ length: 30, resolution: 10 })

		const xPositions = sec.network.nodes.map((n) => n.x)

		expect(xPositions).toEqual([0, 10, 20, 30])
	})

	it('should start the second pipe from the destination node of the first pipe', () => {
		const sec = new Section({ length: 200, resolution: 100 })

		expect(sec.network.pipes[1].source).toBe(sec.network.pipes[0].destination)
	})

	it('should start the third pipe from the destination node of the second pipe', () => {
		const sec = new Section({ length: 300, resolution: 100 })

		expect(sec.network.pipes[2].source).toBe(sec.network.pipes[1].destination)
	})

	it('should end the last pipe with the section destination node', () => {
		const sec = new Section({ length: 200, resolution: 100 })
		const destination = sec.destination

		expect(sec.network.pipes[sec.network.pipes.length - 1].destination).toBe(
			destination
		)
	})

	it('should set final pipe length to the remainder', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.pipes[sec.network.pipes.length - 1].length).toBe(50)
	})

	it('should produce a valid network', () => {
		const sec = new Section()

		expect(sec.network.validate()).toBe(true)
	})

	it('should elevate intermediate pipes according to their distance through the section', () => {
		const source = new Node({ elevation: 10 })
		const destination = new Node({ elevation: 20 })
		const sec = new Section({
			name: `test`,
			length: 20,
			resolution: 10,
			source: source,
			destination: destination,
		})

		expect(sec.network.pipes[0].destination.elevation).toBe(15)
	})
})

describe('Height', () => {
	it('should return the elevation difference between its source and destination nodes', () => {
		const source = new Node({ elevation: 23 })
		const destination = new Node({ elevation: 100 })
		const sec = new Section({ source: source, destination: destination })

		expect(sec.height).toBe(77)
	})

	it('should return a height of 10 for `source.elevation = 10` -> `destination.elevation = 20`', () => {
		const source = new Node({ elevation: 10 })
		const destination = new Node({ elevation: 20 })
		const sec = new Section({
			length: 20,
			resolution: 10,
			source: source,
			destination: destination,
		})

		expect(sec.height).toBe(10)
	})
})
