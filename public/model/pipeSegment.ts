import Node from './node'
import Valve from './valve'

export interface IPipeSegment {
	name?: string
	length?: number
	diameter?: number
	massFlow?: number
	source?: Node
	destination?: Node
	x?: number
	endElevation?: number
}

export default class PipeSegment {
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
	private _valve: Valve | false

	constructor(props: IPipeSegment = {}) {
		this.name = props.name || 'pipe'
		this.length = props.length || 200
		this.diameter = props.diameter || 2
		this.massFlow = props.massFlow || 1
		this.pressure = {
			in: 0,
			out: 0,
		}

		this._source =
			props.source || new Node({ name: `${this.name}S`, x: props.x })

		this._destination =
			props.destination ||
			new Node({
				name: `${this.name}D`,
				x: this.length,
			})

		if (!props.destination) {
			if (props.x) this.destination.x += props.x
			if (props.endElevation) this.destination.elevation = props.endElevation
		}

		this._valve = false
	}

	destinationPressure(): number {
		const P1 = this.pressure.in
		const viscosity = this.source.viscosity // fluid property
		const L = this.length
		const A = 0.25 * Math.PI * this.diameter ** 2
		const d = this.diameter * 1000 // mm
		const z = this.destination.elevation - this.source.elevation
		const g = 9.81
		const density = this.source.density
		const Q = this.massFlow / density // volumetric flow rate

		return P1 - (32000 * (viscosity * L * Q)) / (A * d ** 2) - z * g * density
	}

	set source(n: Node) {
		this._source = n
		this.pressure.in = n.pressure
		this.pressure.out = this.destinationPressure()
		this.destination.pressure = Math.min(this.pressure.out, n.pressure)
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

	get pressureContinuity() {
		return this.destination.pressure === this.pressure.out
	}

	get valve() {
		return this._valve
	}

	addValve() {
		this._valve = new Valve({
			name: `${this.name}-valve`,
			pressure: { in: this.pressure.out, out: this.destination.pressure },
		})
	}

	removeValve() {
		this._valve = false
	}
}
