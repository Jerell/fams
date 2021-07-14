import Page from '@/components/page'
import Network from '@/public/model/network'
import NetworkMap from '@/components/networkMap'
import Link from 'next/link'
import NumberInput from '@/components/input/numberInput'

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
		<div className='flex flex-wrap -mx-px overflow-hidden border-t border-green-300'>
			{children.map((c, i) => (
				<TCGItem key={i} bg={demoBG} i={i}>
					{c}
				</TCGItem>
			))}
		</div>
	)
}

const gridItems = [
	'these',
	'boxes',
	'have',
	'2 pixels',
	'of padding',
	'and scale to fit the screen size',
	'they should increase in height to fit more text too',
	'✔',
	'👍',
]

const gridItems2 = [
	'this',
	'grid',
	'is',
	'just',
	'like',
	'the',
	'one',
	'above',
	'but',
	'without',
	'the',
	'background.',
	'it',
	'can',
	'have',
	'as',
	'many',
	'items',
	'as',
	'we',
	'need',
]

// Network for grid

const net = new Network({ name: 'net' })
const B0 = net.addNode()
const B1 = net.addNode()
net.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	source: B0,
	destination: B1,
})

const gi3 = [
	'Network maps can go in the grid too and the surrounding panels could have content related to the map',
	<NetworkMap network={net} />,
	'because of their size their box is never 1/3 width',
	'these boxes',
	'go underneath',
]

const gInputElems = [
	<NumberInput
		required
		label='temperature'
		labelClasses=''
		unit='K'
		unitRight
	></NumberInput>,
	<NumberInput
		required
		label='temperature'
		labelClasses=''
		unit='°C'
		unitRight
	></NumberInput>,
	<NumberInput
		required
		label='temperature'
		labelClasses=''
		unit='°F'
		unitRight
	></NumberInput>,
	<NumberInput
		required
		label='pressure'
		labelClasses=''
		unit='bar'
		unitRight
	></NumberInput>,
	<NumberInput
		required
		label='pressure'
		labelClasses=''
		unit='pa'
		unitRight
	></NumberInput>,
	<NumberInput label='???' labelClasses='' unit='£'></NumberInput>,
]

const UIPage = () => (
	<Page>
		<section className='mt-20 border-r border-t border-green-300'>
			<h2 className='text-xl font-semibold border-l pl-1 border-green-300 text-green-700'>
				User interface
			</h2>

			<p className='mt-2 pb-5 px-2 text-gray-600 dark:text-gray-400'>
				I copied the borders on{' '}
				<Link href='https://angaraservice.com/'>
					<span className='font-bold hover:underline cursor-pointer text-green-500'>
						this page
					</span>
				</Link>{' '}
				but moved it to the top and right sides of each section and made it
				green because it looks a bit like a plant with leaves that branch out
				over each heading. we could add svg decorations and animations to these
				borders to make it look nice
			</p>
		</section>
		<section className='border-r border-t border-green-300'>
			<h2 className='text-xl font-semibold border-l pl-1 border-green-300 text-green-700'>
				Grid
			</h2>

			<p className='mt-2 pb-5 px-2 text-gray-600 dark:text-gray-400'>
				this section just shows a few panels in a grid. this text is outside of
				the grid
			</p>
			<ThreeColGrid demoBG={true}>{gridItems}</ThreeColGrid>
			<ThreeColGrid>{gridItems2}</ThreeColGrid>
			<ThreeColGrid demoBG={false}>{gi3}</ThreeColGrid>
		</section>
		<section className='border-r border-t border-green-300'>
			<h2 className='text-xl font-semibold border-l pl-1 border-green-300 text-green-700'>
				Input fields and buttons
			</h2>

			<p className='mt-2 pb-5 px-2 text-gray-600 dark:text-gray-400'>
				gonna show some input elements here
			</p>

			<ThreeColGrid>{gInputElems}</ThreeColGrid>
		</section>
		<section className='border-r border-t border-green-300'>
			<h2 className='text-xl font-semibold border-l pl-1 border-green-300 text-green-700'>
				Display elements
			</h2>

			<p className='mt-2 pb-5 px-2 text-gray-600 dark:text-gray-400'>
				and some display elements here. probably just a big number with a unit
				or something not sure yet
			</p>
			<ThreeColGrid demoBG={true}>{Array(9).fill(' ')}</ThreeColGrid>
		</section>
	</Page>
)

export default UIPage
