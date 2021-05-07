const molarMass = 44
const r = 0.0821
const temperature = 10
const pressure = 1

const mtpaToM3ps = (mtpa) => {
	const secondsInAYear = 60 * 60 * 24 * 365.25

	const tpa = mtpa * 10 ** 6

	const kgpa = tpa * 1000
	const kgps = kgpa / secondsInAYear
	const molesps = kgps / molarMass

	const m3ps = (molesps * r * (temperature + 273)) / pressure

	const result = m3ps

	return result
}

module.exports = {
	mtpaToM3ps: mtpaToM3ps,
}
