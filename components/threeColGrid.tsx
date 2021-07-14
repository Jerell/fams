import NetworkMap from '@/components/network/networkMap'

const TCGItem = ({ children, i, bg }) => {
	const cln = (item) => {
		let c = `p-2 w-full overflow-hidden md:w-1/2`
		const add = (text) => (c += ` ${text}`)

		if (bg) {
			add(`bg-green-${1 + (i % 9)}00`)
		}
		if (!item.type || item.type !== NetworkMap) {
			add(`lg:w-1/3`)
		}
		if (item.type && item.type === NetworkMap) {
			add(`lg:w-2/3`)
		}
		return c
	}
	return <div className={cln(children)}>{children}</div>
}

const ThreeColGrid = ({ children, demoBG = false }) => {
	return (
		<div className='flex flex-wrap -mx-px overflow-hidden'>
			{children.map((c, i) => (
				<TCGItem key={i} bg={demoBG} i={i}>
					{c}
				</TCGItem>
			))}
		</div>
	)
}

export default ThreeColGrid
