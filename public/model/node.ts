export interface INode {
	name?: string
	x?: number
	elevation?: number
	pressure?: number
	temperature?: number
	flow?: {
		in?: number
		out?: number
	}
}

export default class Node {
	name: string
	x: number
	elevation: number
	pressure: number
	temperature: number
	private _flow: {
		in: number
		out: number
	}

	constructor(props: INode = {}) {
		this.name = props.name || 'node'
		this.x = props.x || 0
		this.elevation = props.elevation || 0
		this.pressure = props.pressure || 0
		this.temperature = props.temperature || 0
		this._flow = {
			in: 0,
			out: 0,
		}

		if (props.flow && props.flow.out) this._flow.out = props.flow.out
		if (props.flow && props.flow.in) this._flow.in = props.flow.in
	}

	get flow() {
		return this._flow
	}

	get type() {
		if (this.flow.in + this.flow.out === 0) return 'closed'
		if (this.flow.out > this.flow.in) return 'source'
		if (this.flow.in > this.flow.out) return 'destination'
		return 'internal'
	}

	get inflow() {
		return this.flow.in
	}

	set inflow(i) {
		this._flow.in = i
		this._flow.out = i // conserve mass
	}

	get outflow() {
		return this._flow.out
	}
}
