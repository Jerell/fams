import binarySearch from '../binarySearch'

describe('Search `list=[1, 2, 3, 4, 5]`', () => {
	it('should return 0 for `item = 1`', () => {
		const list = [1, 2, 3, 4, 5]
		const item = 1

		expect(binarySearch(list, item)).toEqual(0)
	})

	it('should return 2 for `item = 3`', () => {
		const list = [1, 2, 3, 4, 5]
		const item = 3

		expect(binarySearch(list, item)).toEqual(2)
	})

	it('should return 1 for `item = 1.5`', () => {
		const list = [1, 2, 3, 4, 5]
		const item = 1.5

		expect(binarySearch(list, item)).toEqual(1)
	})

	it('should return 3 for `item = 3.5`', () => {
		const list = [1, 2, 3, 4, 5]
		const item = 3.5

		expect(binarySearch(list, item)).toEqual(3)
	})

	it('should return 0 for `item = 1.4`', () => {
		const list = [1, 2, 3, 4, 5]
		const item = 1.4

		expect(binarySearch(list, item)).toEqual(0)
	})

	it('should return 2 for `item = 2.5`', () => {
		const list = [1, 2, 3, 4, 5, 6]
		const item = 2.5

		expect(binarySearch(list, item)).toEqual(2)
	})
})

describe('Search pressures', () => {
	it('Should return 1 for `item = 47976.5101', () => {
		const pressures = [
			1000, 47976.5101, 94953.0201, 141929.53, 188906.04, 235882.55, 282859.06,
			329835.57, 376812.081,
		]
		const item = 47976.5101

		expect(binarySearch(pressures, item)).toEqual(1)
	})

	it('Should return 1 for `item = 47 (concat)', () => {
		const pressures = [1, 47, 94, 141, 188, 235, 282, 329, 376]
		const item = 47

		expect(binarySearch(pressures, item)).toEqual(1)
	})

	it('Should return 0 for `item = 5 (concat)', () => {
		const pressures = [1, 47, 94, 141, 188, 235, 282, 329, 376]
		const item = 5

		expect(binarySearch(pressures, item)).toEqual(0)
	})

	it('Should return 0 for `item = 1 (concat)', () => {
		const pressures = [1, 47, 94, 141, 188, 235, 282, 329, 376]
		const item = 1

		expect(binarySearch(pressures, item)).toEqual(0)
	})

	it('Should return 1 for `item = 35 (concat)', () => {
		const pressures = [1, 47, 94, 141, 188, 235, 282, 329, 376]
		const item = 35

		expect(binarySearch(pressures, item)).toEqual(1)
	})

	it('Should return 1 for `item = 48 (concat)', () => {
		const pressures = [1, 47, 94, 141, 188, 235, 282, 329, 376]
		const item = 48

		expect(binarySearch(pressures, item)).toEqual(1)
	})

	it('Should return 1 for `item = 50000', () => {
		const pressures = [
			1000, 47976.5101, 94953.0201, 141929.53, 188906.04, 235882.55, 282859.06,
			329835.57, 376812.081,
		]
		const item = 50000

		expect(binarySearch(pressures, item)).toEqual(1)
	})
})
