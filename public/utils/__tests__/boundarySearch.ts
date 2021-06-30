import boundarySearch from '../boundarySearch'

describe('Search `list=[1, 2, 3, 4, 5]`', () => {
	it('returns the expected result for `item=1.1`', () => {
		const list = [1, 2, 3, 4, 5]
		const item = 1.1

		const result = boundarySearch(list, item)

		const expected = {
			low: 1,
			high: 2,
			weights: {
				low: 0.8999999999999999,
				high: 0.10000000000000009,
			},
			idx: {
				low: 0,
				high: 1,
			},
		}

		expect(result).toMatchObject(expected)
	})
})
