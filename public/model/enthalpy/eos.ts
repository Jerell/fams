const csv = require('csv-parser')
const fs = require('fs')
import binarySearch from '@/public/utils/binarySearch'

export default class EOS {
	data: Object[]
	unique: {
		pressure: Set<Number>
	}
	constructor() {
		this.data = []
		this.unique = {
			pressure: new Set(),
		}
	}

	async load() {
		const logUniquePressure = (row) => {
			this.unique.pressure.add(Number(row.PT))
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
						logUniquePressure(row)
					})
					.on('end', () => {
						resolve(data)
					})
			})
		}

		this.data = (await readData()) as Object[]
	}

	get uniquePressures() {
		return Array.from(this.unique.pressure) as number[]
	}

	async selectPressure(p_out) {
		if (!this.data.length) this.load()

		const idx = binarySearch(this.uniquePressures, p_out)

		return this.uniquePressures[idx]
	}
}
