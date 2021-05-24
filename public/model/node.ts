interface INode {
	name?: string
	x?: number
	elevation?: number
	pressure?: number
	temperature?: number
}

export default class Node {
	name: string
	x: number
	elevation: number
	pressure: number
	temperature: number

	constructor(props: INode = {}) {
		this.name = props.name || 'node'
		this.x = props.x || 0
		this.elevation = props.elevation || 0
		this.pressure = props.pressure || 0
		this.temperature = props.temperature || 0
	}
}
