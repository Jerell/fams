import Network from '../network'

describe('Constructor', () => {
	it('should have a name', () => {
		const net = new Network()

		expect(net.name).toBeTruthy()
	})

	it('should have a list of nodes', () => {
		const net = new Network()

		expect(net.nodes).toEqual([])
	})

	it('should have a list of pipes', () => {
		const net = new Network()

		expect(net.pipes).toEqual([])
	})
})

describe('New node', () => {
	it('should add a node to the list', () => {
		const net = new Network()

		net.addNode()

		expect(net.nodes.length).toBe(1)
	})

	it('should return the new node object', () => {
		const net = new Network()

		const node = net.addNode()

		expect(node).toBe(net.nodes[0])
	})
})

describe('New pipe', () => {
	it('should add a new pipe to the list', () => {
		const net = new Network()

		net.addPipe()

		expect(net.pipes.length).toBe(1)
	})

	it('should return the new pipe object', () => {
		const net = new Network()

		const pipe = net.addPipe()

		expect(pipe).toBe(net.pipes[0])
	})
})

describe('Pipe behaviour', () => {
	it('should store a reference to the specified source node', () => {
		const net = new Network()
		const node = net.addNode()
		const pipe = net.addPipe()

		pipe.source = node

		expect(pipe.source).toBe(node)
	})

	it('should store a reference to the specified destination node', () => {
		const net = new Network()
		const node = net.addNode()
		const pipe = net.addPipe()

		pipe.destination = node

		expect(pipe.destination).toBe(node)
	})

	it('should refer to the same source node as another pipe with the same source', () => {
		const net = new Network()
		const node = net.addNode()
		const pipe1 = net.addPipe()
		const pipe2 = net.addPipe()

		pipe1.source = node
		pipe2.source = node

		expect(pipe1.source).toBe(pipe2.source)
	})

	it('should refer to the same destination node as another pipe with the same destination', () => {
		const net = new Network()
		const node = net.addNode()
		const pipe1 = net.addPipe()
		const pipe2 = net.addPipe()

		pipe1.destination = node
		pipe2.destination = node

		expect(pipe1.destination).toBe(pipe2.destination)
	})
})

describe('Node behaviour', () => {
	it('should have pressure equal to the lowest out-pressure of any connected source pipe', () => {
		const net = new Network()
		const node1 = net.addNode({ pressure: 1 })
		const node2 = net.addNode({ pressure: 2 })
		const pipe1 = net.addPipe()
		const pipe2 = net.addPipe()
		const node3 = net.addNode()

		pipe1.source = node1
		pipe2.source = node2

		pipe1.destination = node3
		pipe2.destination = node3

		expect(node3.pressure).toEqual(pipe1.pressure.out)
	})
})

describe('Validation', () => {
	it('should throw an error if the network has no pipes', () => {
		const net = new Network()

		net.addNode()

		expect(() => net.validate()).toThrow(/.+?has no pipes/)
	})

	it('should throw an error if the network has no nodes', () => {
		const net = new Network()

		net.addPipe()

		expect(() => net.validate()).toThrow(/.+?has no nodes/)
	})

	it('throw an error if a node has missing connections', () => {
		const net = new Network()
		net.addPipe()
		net.addNode()
		expect(() => net.validate()).toThrow(/.+?has missing connections/)
	})

	it('should return true if all nodes have connections', () => {
		const net = new Network()
		const node = net.addNode()
		const pipe = net.addPipe()

		pipe.source = node

		expect(net.validate()).toBe(true)
	})
})
