export interface IValve {
	name?: string
	pressure?: {
		in: number
		out: number
	}
	temperature?: {
		in: number
	}
}

export default class Valve {
	name: string
	pressure: {
		in: number
		out: number
	}

	constructor(props: IValve = {}) {
		this.name = props.name || 'valve'

		this.pressure = { in: NaN, out: NaN }

		if (props.pressure) {
			if (props.pressure.out && props.pressure.in) {
				if (props.pressure.out > props.pressure.in) {
					throw `Invalid pressure input: the given in pressure is less than the given out pressure`
				} else {
					this.pressure = props.pressure
				}
			} else {
				let msg = `Invalid pressure input: `
				if (!props.pressure.in) {
					msg += 'no in pressure, '
				}
				if (!props.pressure.out) {
					msg += 'no out pressure'
				}
				throw msg
			}
		}
	}
}
