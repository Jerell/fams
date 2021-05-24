import Node from './node'

interface IPipe {
	name?: string
	length?: number
	diameter?: number
	massFlow?: number
	source?: Node
	destination?: Node
}

export default class Pipe {
	name: string
	length: number
	diameter: number
	massFlow: number
	pressure: {
		in: number
		out: number
	}
	private _source: Node
	private _destination: Node

	constructor(props: IPipe = {}) {
		this.name = props.name || 'pipesection'
		this.length = props.length || 200
		this.diameter = props.diameter || 2
		this.massFlow = props.massFlow || 0
		this.pressure = {
			in: 0,
			out: 0,
		}
		this._source = new Node()
		this._destination = new Node()

		if (props.source) this.source = props.source
		if (props.destination) this.destination = props.destination
	}

	pressureDrop(): number {
		const P1 = this.pressure.in
		const viscosity = 1 // fluid property
		const L = this.length
		const Q = 1 // volumetric flow rate
		const A = 0.25 * Math.PI * this.diameter ** 2
		const d = this.diameter * 1000 // mm
		const z = this.destination.elevation - this.source.elevation
		const g = 9.81
		const density = 1

		return P1 - (32000 * (viscosity * L * Q)) / (A * d ** 2) - z * g * density
	}

	set source(n: Node) {
		this._source = n
		this.pressure.in = n.pressure
		this.pressure.out = this.pressure.in - this.pressureDrop()
	}

	get source() {
		return this._source
	}

	set destination(n: Node) {
		n.pressure = Math.min(this.pressure.out, n.pressure)
		this.pressure.out = n.pressure
		this._destination = n
	}

	get destination() {
		return this._destination
	}

	get direction() {
		if (this.pressure.in > this.pressure.out) return true
		else if (this.pressure.in < this.pressure.out) return false
		return null
	}
}
