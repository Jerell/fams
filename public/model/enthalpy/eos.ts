const csv = require('csv-parser')
const fs = require('fs')
import binarySearch from '@/public/utils/binarySearch'
import boundarySearch from '@/public/utils/boundarySearch'
import { IBoundary } from '@/public/utils/boundarySearch'

export default class EOS {
	data: Object[]
	unique: {
		pressure: Set<Number>
	}
	dataGroupedByPressure: object

	constructor() {
		this.data = []
		this.unique = {
			pressure: new Set(),
		}
		this.dataGroupedByPressure = {}
	}

	async load() {
		const logRowPressure = (row) => {
			this.unique.pressure.add(Number(row.PT))

			// Group
			const pString = Number(row.PT).toString()
			if (!this.dataGroupedByPressure[pString])
				this.dataGroupedByPressure[pString] = []
			this.dataGroupedByPressure[pString].push(row)
		}

		function readData() {
			const data: Object[] = []
			return new Promise((resolve, reject) => {
				fs.createReadStream('./public/model/enthalpy/pth.csv')
					.on('error', (error) => {
						reject(error)
					})
					.pipe(csv())
					.on('data', (row) => {
						data.push(row)
						logRowPressure(row)
					})
					.on('end', () => {
						resolve(data)
					})
			})
		}

		this.data = (await readData()) as Object[]
		return this
	}

	get uniquePressures() {
		return Array.from(this.unique.pressure) as number[]
	}

	async selectPressure(pressure: number) {
		if (!this.data.length) await this.load()

		const idx = binarySearch(this.uniquePressures, pressure)

		return this.uniquePressures[idx]
	}

	async selectRow(props: IRow = { PT: 0 }) {
		if (!this.data.length) await this.load()

		const pressure = await this.selectPressure(props.PT)

		if (props.TM) {
			const rows = this.dataGroupedByPressure[pressure]
			const temps = rows.map((r) => r.TM)

			const temp_idx = binarySearch(temps, props.TM)

			return rows[temp_idx]
		} else if (props.HG) {
			const rows = this.dataGroupedByPressure[pressure]
			const enths = rows.map((r) => r.HG)

			const enth_idx = binarySearch(enths, props.HG)

			return rows[enth_idx]
		} else {
			return {}
		}
	}

	async interpolateEnthalpy(props: IRow = { PT: 0 }) {
		if (!this.data.length) await this.load()

		const boundaries = {
			pressure: <IBoundary>{},
			temperature: {
				lowPT: <IBoundary>{},
				highPT: <IBoundary>{},
			},
		}

		boundaries.pressure = boundarySearch(this.uniquePressures, props.PT)
		// const closestPT = boundaries.pressure.closest
		const lowPT = boundaries.pressure.low
		const highPT = boundaries.pressure.high

		const pressureRows = {
			// closest: this.dataGroupedByPressure[closestPT],
			lowPressure: this.dataGroupedByPressure[lowPT],
			highPressure: this.dataGroupedByPressure[highPT],
		}

		if (props.TM) {
			const temps = {
				lowPressure: pressureRows.lowPressure.map((r) => r.TM),
				highPressure: pressureRows.highPressure.map((r) => r.TM),
			}

			// These are likely to be the same
			boundaries.temperature.lowPT = boundarySearch(temps.lowPressure, props.TM)
			boundaries.temperature.highPT = boundarySearch(
				temps.highPressure,
				props.TM
			)

			// x = pressure, y = temp
			const x0y0_enth =
				pressureRows.lowPressure[boundaries.temperature.lowPT.idx.low].HG
			const x1y0_enth =
				pressureRows.highPressure[boundaries.temperature.highPT.idx.low].HG
			const x0y1_enth =
				pressureRows.lowPressure[boundaries.temperature.lowPT.idx.high].HG
			const x1y1_enth =
				pressureRows.highPressure[boundaries.temperature.highPT.idx.high].HG

			const weight_left = boundaries.pressure.weights.low
			const weight_right = boundaries.pressure.weights.high

			const weight_down = boundaries.temperature.lowPT.weights.low
			const weight_up = boundaries.temperature.lowPT.weights.high

			const y0_avg = weight_left * x0y0_enth + weight_right * x1y0_enth
			const y1_avg = weight_left * x0y1_enth + weight_right * x1y1_enth

			const y_avg = weight_down * y0_avg + weight_up * y1_avg

			return y_avg
		}

		return boundaries
	}

	async getOutTemp(p_in: number, t_in: number, p_out: number) {
		if (!this.data.length) await this.load()

		const inrow = await this.selectRow({ PT: p_in, TM: t_in })
		const h = inrow.HG

		const outrow = await this.selectRow({ PT: p_out, HG: h })
		const t_out = Number(outrow.TM)

		return t_out
	}
}

interface IRow {
	PT: number
	TM?: number
	HG?: number
}
