const csv = require('csv-parser')
const fs = require('fs')
import binarySearch from '@/public/utils/binarySearch'

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
