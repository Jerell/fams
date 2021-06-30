import binarySearch from './binarySearch'

export default function boundarySearch(list: number[], item) {
	const closestIdx = binarySearch(list, item)
	const isGreaterThanClosest = item > list[closestIdx]
	const isLessThanClosest = item < list[closestIdx]

	let neighbour = closestIdx

	if (isGreaterThanClosest) {
		neighbour += 1
	} else if (isLessThanClosest) {
		neighbour -= 1
	}

	const lowIdx = Math.min(closestIdx, neighbour)
	const highIdx = Math.max(closestIdx, neighbour)

	const low = list[lowIdx]
	const high = list[highIdx]

	const interval = high - low
	const highWeight = (item - low) / interval
	const lowWeight = 1 - highWeight

	const average = lowWeight * low + highWeight * high

	return {
		low,
		high,
		weights: { low: lowWeight, high: highWeight },
		idx: { low: lowIdx, high: highIdx },
	}
}
