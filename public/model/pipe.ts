import Node from './node'
import Network from './network'
import { IPipeSegment } from './pipeSegment'

interface IPipe {
	name?: string
	resolution?: number
	length?: number
	source?: Node
	destination?: Node
}

export default class Pipe {
	name: string
	resolution: number
	length: number
	private _source: Node
	private _destination: Node
	network: Network
	cosine: number

	constructor(props: IPipe = {}) {
		this.name = props.name || 'pipe'
		this.resolution = props.resolution || 200
		this.length = props.length || 200
		this._source = new Node({ name: `${this.name}-source` })
		this._destination = new Node({
			name: `${this.name}-destination`,
			x: this.length,
		})

		if (props.source) this.source = props.source
		if (props.destination) this.destination = props.destination

		if (!this.destination.x) this.destination.x = this.source.x + this.length

		if (props.source || props.destination) {
			const distance = this.destination.x - this.source.x
			if (distance) this.length = distance
			else this.destination.x = this.length + this.source.x
		}

		const hypotenuse = Math.sqrt(this.height ** 2 + this.length ** 2)

		this.cosine = this.length / hypotenuse

		this.network = new Network({ name: `${this.name}-net` })
		this.network.addNode(this.source)

		this.chain()
	}

	get source() {
		return this._source
	}

	set source(n) {
		this._source = n
	}

	get destination() {
		return this._destination
	}

	set destination(n) {
		this._destination = n
	}

	get height() {
		return this.destination.elevation - this.source.elevation
	}

	chain() {
		let remainingLength = this.length
		let lastPipeEnd = this.source

		const xDist = () => this.resolution * this.cosine
		const x = () => xDist() * this.network.pipes.length

		while (this.length - (x() + xDist()) >= 0) {
			// const isFirstPipe = this.network.pipes.length === 0
			remainingLength -= xDist()
			const isLastPipe = remainingLength <= xDist()

			const newPipeProps: IPipeSegment = {
				source: lastPipeEnd,
				length: xDist(),
				x: lastPipeEnd.x,
			}

			if (isLastPipe && !remainingLength) {
				newPipeProps.destination = this.destination
			} else if (this.height) {
				const fractionThroughSection = (x() + xDist()) / this.length
				const heightGain =
					fractionThroughSection * this.height + this.source.elevation

				newPipeProps.endElevation = heightGain
			}

			const newPipe = this.network.addPipe(newPipeProps)

			lastPipeEnd = newPipe.destination
		}

		if (remainingLength) {
			this.network.addPipe({
				source: this.network.nodes[this.network.nodes.length],
				length: remainingLength,
				destination: this.destination,
				x: x(),
			})
			remainingLength = 0
		}

		return this.network
	}
}
