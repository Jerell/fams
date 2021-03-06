import binarySearch from './binarySearch'

export default function boundarySearch(list: number[], item): IBoundary {
	const closestIdx = binarySearch(list, item)
	const closest = list[closestIdx]
	const isGreaterThanClosest = item > closest
	const isLessThanClosest = item < closest

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

	return {
		low,
		high,
		closest,
		weights: { low: lowWeight, high: highWeight },
		idx: { low: lowIdx, high: highIdx, closest: closestIdx },
	}
}

export interface IBoundary {
	low: number
	high: number
	closest: number
	weights: {
		low: number
		high: number
	}
	idx: {
		low: number
		high: number
		closest: number
	}
}
