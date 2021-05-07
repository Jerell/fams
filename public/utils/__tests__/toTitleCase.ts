import toTitleCase from '../toTitleCase'

describe('toTitleCase', () => {
	it('should capitalize the first letter of a single word', () => {
		const word = 'test'
		expect(toTitleCase(word)).toBe('Test')
	})

	it('should capitalize the first letter of every word in a sentence', () => {
		const sentence = 'test sentence'
		expect(toTitleCase(sentence)).toBe('Test Sentence')
	})

	it('should not capitalize all letters', () => {
		const word = 'test'
		expect(toTitleCase(word)).not.toBe('TEST')
	})
})
