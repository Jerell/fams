import Node from './node'
import Pipe from './pipe'
import { INode } from './node'
import { IPipe } from './pipe'

interface INetwork {
	name?: string
	nodes?: Node[]
	pipes?: Pipe[]
}

export default class Network {
	name: string
	nodes: Node[]
	pipes: Pipe[]

	constructor(props: INetwork = {}) {
		this.name = props.name || 'network'
		this.nodes = props.nodes || []
		this.pipes = props.pipes || []
	}

	addNode(props: INode = {}) {
		const n = new Node(props)
		this.nodes.push(n)
		return n
	}

	addPipe(props: IPipe = {}) {
		const p = new Pipe(props)
		this.pipes.push(p)
		return p
	}

	validate() {
		if (!this.pipes.length) throw `Network (${this.name}) has no pipes`

		if (!this.nodes.length) throw `Network (${this.name}) has no nodes`

		for (let node of this.nodes) {
			if (
				!this.pipes
					.map((pipe) => pipe.source)
					.some((source) => Object.is(source, node))
			)
				throw `node (${node.name}) has missing connections`
		}
		return true
	}
}
