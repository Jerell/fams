import Node from './node'
import Network from './network'
import { IPipe } from './pipe'

interface ISection {
	name?: string
	resolution?: number
	length?: number
	source?: Node
	destination?: Node
}

export default class Section {
	name: string
	resolution: number
	length: number
	private _source: Node
	private _destination: Node
	network: Network

	constructor(props: ISection = {}) {
		this.name = props.name || 'section'
		this.resolution = props.resolution || 200
		this.length = props.length || 200
		this._source = new Node({ name: `${this.name}-source` })
		this._destination = new Node({
			name: `${this.name}-destination`,
			x: this.length,
		})

		if (props.source) this.source = props.source
		if (props.destination) this.destination = props.destination

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

		const x = () => this.resolution * this.network.pipes.length

		while (this.length - (x() + this.resolution) >= 0) {
			// const isFirstPipe = this.network.pipes.length === 0
			remainingLength -= this.resolution
			const isLastPipe = remainingLength <= this.resolution

			const newPipeProps: IPipe = {
				name: `${this.name}-P${this.network.pipes.length}`,
				source: lastPipeEnd,
				length: this.resolution,
				x: lastPipeEnd.x,
			}

			if (isLastPipe && !remainingLength) {
				newPipeProps.destination = this.destination
			} else if (this.height) {
				const fractionThroughSection = (x() + this.resolution) / this.length
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

		return remainingLength
	}
}
