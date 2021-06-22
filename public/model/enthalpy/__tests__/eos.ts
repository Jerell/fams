import EOS from '../eos'

describe('Constructor - initial properties', () => {
	it('should begin with no data', () => {
		const eos = new EOS()

		expect(eos.data).toEqual([])
	})
})

describe('Load', () => {
	it('should load data from file when load is called', async () => {
		const eos = await new EOS().load()

		const firstRow = {
			HG: '-29062.109',
			TM: '-10.000000',
			PT: '1000.00000',
		}

		expect(eos.data[0]).toMatchObject(firstRow)
	})

	it('should record the first unique pressure value in the unique log', async () => {
		const eos = await new EOS().load()

		const pressures = eos.unique.pressure.values()

		expect(pressures.next().value).toEqual(1000)
	})

	it('should record the second unique pressure value in the unique log', async () => {
		const eos = await new EOS().load()

		const pressures = eos.unique.pressure.values()
		pressures.next()

		expect(pressures.next().value).toEqual(47976.5101)
	})

	it('should record 299 unique pressure values for the given csv (pth.csv)', async () => {
		const eos = await new EOS().load()

		expect(eos.unique.pressure.size).toBe(299)
	})
})

describe('get uniquePressures', () => {
	it('should return an array', () => {
		const eos = new EOS()

		expect(Array.isArray(eos.uniquePressures)).toBe(true)
	})

	it('should contain values from `this.unique.pressure` (first)', async () => {
		const eos = await new EOS().load()

		const first = eos.uniquePressures[0]

		expect(eos.unique.pressure.has(first)).toBe(true)
	})

	it('should contain values from `this.unique.pressure` (last)', async () => {
		const eos = await new EOS().load()

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
		const eos = await new EOS().load()

		const p_out = 1000
		const p = await eos.selectPressure(p_out)

		expect(p).toEqual(1000)
	})

	it('should return 1000 for `p_out=10000', async () => {
		const eos = await new EOS().load()

		const p_out = 10000
		const p = await eos.selectPressure(p_out)

		expect(p).toEqual(1000)
	})

	it('should return 47976.5101 for `p_out=50000', async () => {
		const eos = await new EOS().load()

		const p_out = 50000
		const p = await eos.selectPressure(p_out)

		expect(p).toEqual(47976.5101)
	})
})

describe('Data grouping', () => {
	it('should create a group for the first pressure value', async () => {
		const eos = new EOS()
		await eos.load()

		const groupKey = eos.uniquePressures[0]

		expect(eos.dataGroupedByPressure).toHaveProperty(groupKey.toString())
	})

	it('should create a group for the second pressure value', async () => {
		const eos = new EOS()
		await eos.load()

		expect(eos.dataGroupedByPressure['47976.5101']).not.toBeUndefined() // Not sure why it had to be tested this way
	})
})

describe('selectRow', () => {
	it('should call `this.load` if `this.data` is empty', async () => {
		const eos = new EOS()
		eos.load = jest.fn(eos.load)

		await eos.selectRow(1000, 10)

		expect(eos.load).toHaveBeenCalled()
	})

	it('should return the correct row (1/2)', async () => {
		const eos = await new EOS().load()
		const row = { HG: '-12561.645', PT: '1000.00000', TM: '10.0671141' }

		const selection = await eos.selectRow(1000, 10)

		expect(selection).toMatchObject(row)
	})

	it('should return the correct row (2/2)', async () => {
		const eos = await new EOS().load()
		const row = { HG: '-8370.3307', PT: '1000.00000', TM: '15.0838926' }

		const selection = await eos.selectRow(1000, 15)

		expect(selection).toMatchObject(row)
	})
})
