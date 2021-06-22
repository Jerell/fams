import EOS from '../eos'

describe('Constructor - initial properties', () => {
	it('should begin with no data', () => {
		const eos = new EOS()

		expect(eos.data).toEqual([])
	})
})

describe('Load', () => {
	it('should load data from file when load is called', async () => {
		const eos = new EOS()
		await eos.load()

		const firstRow = {
			HG: '-29062.109',
			TM: '-10.000000',
			PT: '1000.00000',
		}

		expect(eos.data[0]).toMatchObject(firstRow)
	})

	it('should record the first unique pressure value in the unique log', async () => {
		const eos = new EOS()
		await eos.load()

		const pressures = eos.unique.pressure.values()

		expect(pressures.next().value).toEqual(1000)
	})

	it('should record the second unique pressure value in the unique log', async () => {
		const eos = new EOS()
		await eos.load()

		const pressures = eos.unique.pressure.values()
		pressures.next()

		expect(pressures.next().value).toEqual(47976.5101)
	})

	it('should record 299 unique pressure values for the given csv (pth.csv)', async () => {
		const eos = new EOS()
		await eos.load()

		expect(eos.unique.pressure.size).toBe(299)
	})
})

describe('get uniquePressures', () => {
	it('should return an array', () => {
		const eos = new EOS()

		expect(Array.isArray(eos.uniquePressures)).toBe(true)
	})

	it('should contain values from `this.unique.pressure` (first)', async () => {
		const eos = new EOS()
		await eos.load()

		const first = eos.uniquePressures[0]

		expect(eos.unique.pressure.has(first)).toBe(true)
	})

	it('should contain values from `this.unique.pressure` (last)', async () => {
		const eos = new EOS()
		await eos.load()

		const last = eos.uniquePressures[eos.uniquePressures.length - 1]

		expect(eos.unique.pressure.has(last)).toBe(true)
	})
})

describe('selectPressure', () => {
	it('should call `this.load` if `this.data` is empty', async () => {
		const eos = new EOS()
		eos.load = jest.fn()

		await eos.selectPressure(1)

		expect(eos.load).toHaveBeenCalled()
	})

	it('should return 1000 for `p_out=1000', async () => {
		const eos = new EOS()
		await eos.load()

		const p_out = 1000
		const p = await eos.selectPressure(p_out)

		expect(p).toEqual(1000)
	})

	it('should return 1000 for `p_out=10000', async () => {
		const eos = new EOS()
		await eos.load()

		const p_out = 10000
		const p = await eos.selectPressure(p_out)

		expect(p).toEqual(1000)
	})

	it('should return 47976.5101 for `p_out=50000', async () => {
		const eos = new EOS()
		await eos.load()

		const p_out = 50000
		const p = await eos.selectPressure(p_out)

		expect(p).toEqual(47976.5101)
	})
})