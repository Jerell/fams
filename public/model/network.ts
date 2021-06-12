import Node from './node'
import Pipe from './pipe'
import { INode } from './node'
import { IPipe } from './pipe'

interface INetwork {
	name?: string
	nodes?: Node[]
	pipes?: Pipe[]
}

interface INetworkPipe extends IPipe {
	ignoreDestination?: boolean
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
		const name = props.name || `${this.name}-N${this.nodes.length}`
		props.name = name
		const n = new Node(props)
		this.nodes.push(n)
		return n
	}

	addPipe(props: INetworkPipe = {}) {
		const name = props.name || `${this.name}-P${this.pipes.length}`
		props.name = name
		if (!props.source && this.nodes.length)
			props.source = this.nodes[this.nodes.length - 1]
		const p = new Pipe(props)
		this.pipes.push(p)
		if (!props.ignoreDestination && !this.nodes.includes(p.destination)) {
			this.nodes.push(p.destination)
		}
		return p
	}

	validate() {
		if (!this.nodes.length) throw `Network (${this.name}) has no nodes`

		if (!this.pipes.length) throw `Network (${this.name}) has no pipes`

		const connections = this.pipes.map((pipe) => [
			pipe.source,
			pipe.destination,
		])

		const nodesWithConnections = connections.flat()

		for (let node of this.nodes) {
			if (!nodesWithConnections.some((n) => n.name === node.name))
				throw `node (${node.name}) has missing connections`
		}
		return true
	}
}
