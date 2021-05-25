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

	it('should create two pipes when its length is 200 and resolution is 100', () => {
		const sec = new Section({ length: 200, resolution: 100 })

		expect(sec.network.pipes.length).toBe(2)
	})

	it('should create three pipes when its length is 250 and resolution is 100', () => {
		const sec = new Section({ length: 250, resolution: 100 })

		expect(sec.network.pipes.length).toBe(3)
	})

	it('should link one pipe to the next', () => {
		const sec = new Section({ length: 200, resolution: 100 })

		expect(sec.network.pipes[0].destination).toBe(sec.network.pipes[1].source)
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

	// it('should produce a valid network', () => {
	// 	const sec = new Section()

	// 	const node = sec.source

	// 	const connections = sec.network.pipes.map((pipe) => [
	// 		pipe.source,
	// 		pipe.destination,
	// 	])

	// 	// const nodeHasAConnection = connections.some((c) => c.includes(node))

	// 	// expect(nodeHasAConnection).toBe(true)
	// 	// expect(sec.network.pipes[0].source).toBe(node)

	// 	// expect(connections[0]).toContain(node)
	// 	expect(sec.network.validate()).toBe(true)
	// })
})
