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

	async selectRow(PT: number, TM: number) {
		if (!this.data.length) await this.load()

		const pressure = await this.selectPressure(PT)

		const rows = this.dataGroupedByPressure[pressure]
		const temps = rows.map((r) => r.TM)

		const temp_idx = binarySearch(temps, TM)

		return rows[temp_idx]
	}
}
