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

		if (!props.TM) {
			throw new Error('Missing argument 3: temperature')
		}
		const temps = {
			lowPressure: pressureRows.lowPressure.map((r) => r.TM),
			highPressure: pressureRows.highPressure.map((r) => r.TM),
		}

		// These are likely to be the same
		boundaries.temperature.lowPT = boundarySearch(temps.lowPressure, props.TM)
		boundaries.temperature.highPT = boundarySearch(temps.highPressure, props.TM)

		// x = pressure, y = temp
		const x0y0_enth =
			pressureRows.lowPressure[boundaries.temperature.lowPT.idx.low].HG
		const x1y0_enth =
			pressureRows.highPressure[boundaries.temperature.highPT.idx.low].HG
		const x0y1_enth =
			pressureRows.lowPressure[boundaries.temperature.lowPT.idx.high].HG
		const x1y1_enth =
			pressureRows.highPressure[boundaries.temperature.highPT.idx.high].HG

		const weight_left = boundaries.pressure.weights.low || 1
		const weight_right = boundaries.pressure.weights.high || 0

		const weight_down = boundaries.temperature.lowPT.weights.low || 1
		const weight_up = boundaries.temperature.lowPT.weights.high || 0

		const y0_avg = weight_left * x0y0_enth + weight_right * x1y0_enth
		const y1_avg = weight_left * x0y1_enth + weight_right * x1y1_enth

		const hg = weight_down * y0_avg + weight_up * y1_avg

		return {
			hg,
			weights: {
				up: weight_up,
				right: weight_right,
				down: weight_down,
				left: weight_left,
			},
			boundaries,
			enths: {
				x0y0: x0y0_enth,
				x0y1: x0y1_enth,
				x1y0: x1y0_enth,
				x1y1: x1y1_enth,
			},
		}
	}

	async getOutTemp(p_in: number, t_in: number, p_out: number) {
		if (!this.data.length) await this.load()

		const { hg } = await this.interpolateEnthalpy({
			PT: p_in,
			TM: t_in,
		})

		const p2search = boundarySearch(this.uniquePressures, p_out)

		const p2_low = p2search.low
		const p2_high = p2search.high

		const rows1 = this.dataGroupedByPressure[p2_low]
		const rows2 = this.dataGroupedByPressure[p2_high]

		const listEnths = (rowList) => rowList.map((r) => r.HG)

		const enthLists = {
			left: listEnths(rows1),
			right: listEnths(rows2),
		}

		const enthSearch = {
			left: boundarySearch(enthLists.left, hg),
			right: boundarySearch(enthLists.right, hg),
		}

		const h = {
			right: {
				high: enthSearch.right.high, // H_high1
				low: enthSearch.right.low, // H_low1
			},
			left: {
				high: enthSearch.left.high, // H_high2
				low: enthSearch.left.low, // H_low2
			},
		}

		const newPoints = {
			x0y0: rows1[enthSearch.left.idx.low],
			x0y1: rows1[enthSearch.left.idx.high],
			x1y0: rows2[enthSearch.right.idx.low],
			x1y1: rows2[enthSearch.right.idx.high],
		}

		const tempEnthScaleFactor = {
			x0: (newPoints.x0y1.TM - newPoints.x0y0.TM) / (h.left.high - h.left.low),
			x1:
				(newPoints.x1y1.TM - newPoints.x1y0.TM) / (h.right.high - h.right.low),
		}

		const enthDist = {
			left: hg - h.left.low,
			right: hg - h.right.low,
		}

		const tempDist = {
			left: tempEnthScaleFactor.x0 * enthDist.left,
			right: tempEnthScaleFactor.x1 * enthDist.right,
		}

		const Te = Number(newPoints.x0y0.TM) + tempDist.left
		const Th = Number(newPoints.x1y0.TM) + tempDist.right

		console.log({
			Th,
			tm: Number(newPoints.x1y0.TM),
			t_dist: tempDist.right,
			h_dist: enthDist.right,
		})

		console.log(
			`Th = ${Number(newPoints.x1y0.TM)} + ${
				tempEnthScaleFactor.x0
			} * (${hg} - ${h.right.low})`
		)

		const xCentre = (Th - Te) / (p2_high - p2_low)
		console.log({ xCentre })
		console.log(`${p_out} - ${p2_low} = ${p_out - p2_low}`)
		const t_out = Te + xCentre * (p_out - p2_low)

		return t_out
	}
}

interface IRow {
	PT: number
	TM?: number
	HG?: number
}
