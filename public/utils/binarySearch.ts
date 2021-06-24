export default function binarySearch(list: number[], item) {
	if (item > list[list.length - 1]) {
		throw `Invalid search value (too high): ${item} > ${list[list.length - 1]}`
	}

	if (item < list[0]) {
		throw `Invalid search value (too low): ${item} < ${list[0]}`
	}

	let low = 0
	let high = list.length - 1
	let mid = 0
	let best_index = low

	while (low <= high) {
		mid = Math.floor((low + high) / 2)

		if (list[mid] < item) {
			low = mid + 1
		} else if (list[mid] > item) {
			high = mid - 1
		} else {
			best_index = mid
			break
		}

		const diff_b = Math.abs(list[best_index] - item)
		const diff_m = Math.abs(list[mid] - item)

		if ((best_index < mid && diff_m <= diff_b) || diff_m < diff_b) {
			best_index = mid
		}
	}

	return best_index
}
