import Node from '../node'

describe('Constructor', () => {
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
})

describe('Pressure', () => {
	it('should update when reassigned', () => {
		const node = new Node()
		node.pressure = 1
		expect(node.pressure).toBe(1)
	})
})
