import Page from '@/components/page'
import Network from '@/public/model/network'
import NetworkMap from '@/components/network/networkMap'
import Link from 'next/link'
import NumberInput from '@/components/input/numberInput'
import Button from '@/components/input/button'
import ThreeColGrid from '@/components/threeColGrid'
import Heading from '@/components/heading'
import Section from '@/components/section'
import NodeTable from '@/components/network/nodeTable'
import PipeTable from '@/components/network/pipeTable'

// Network for grid

const tjv = new Network({ name: 'join' })
const N0 = tjv.addNode({ temperature: 220 })
const N1 = tjv.addNode({ temperature: 220 })
const N2 = tjv.addNode({ temperature: 220 })
const N3 = tjv.addNode({ pressure: 10000, temperature: 220 })

const P0 = tjv.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
P0.source = N0
P0.destination = N1
P0.addValve()

const P1 = tjv.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
P1.source = N1
P1.destination = N2

const P2 = tjv.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
P2.source = N3
P2.destination = N1

// End network

const grid1content = [
	<>
		<Button text='Case 1' />
		<Button text='Case 2' />
		<Button text='Case 3' />
		<Button text='Case 4' />
	</>,
	<NetworkMap network={tjv} />,
]

const modifyGrid = [
	<NumberInput
		required
		label='pressure'
		labelClasses=''
		unit='bar'
		unitLeft
	></NumberInput>,
	<NumberInput
		required
		label='temperature'
		labelClasses=''
		unit='°C'
		unitLeft
	></NumberInput>,
	<Button text='Update' />,
]

const UIPage = () => (
	<Page>
		<Section>
			<Heading>Demo</Heading>

			<p className='mt-2 px-2 text-gray-600 dark:text-gray-400'>
				this page will be set up to look like the actual product instead of just
				a list of elements
			</p>
		</Section>
		<Section>
			<Heading>Network map</Heading>

			<p className='mt-2 px-2 text-gray-600 dark:text-gray-400'>
				This network map shows two pipes joining at a node. Node N0 has a higher
				pressure than N3, so there is a pressure discontinuity at the end of
				pipe P0, which connects node N0 to node N1.
			</p>
			<p className='mt-2 px-2 text-gray-600 dark:text-gray-400'>
				Pipe P0 has been drawn in red because of this pressure discontinuity.
			</p>
			<p className='mt-2 pb-5 px-2 text-gray-600 dark:text-gray-400'>
				A valve, represented by the blue circle, has been added to pipe P0.
			</p>
			<ThreeColGrid>{grid1content}</ThreeColGrid>
			<NodeTable network={tjv} />
			<p className='mt-2 px-2 text-gray-600 dark:text-gray-400'>
				Pressure values are only calculated on initialisation or when a pipe
				segment receives a new source or destination node. The pipes were
				created in the order shown below, which means the pressure at N2 is only
				calculated once, before N3 is connected to N1. N2 is unaware of the
				change that affected the pressure at N1, so the calculated pressure
				remains what it was when N1 was only connected to N0.
			</p>
			<PipeTable network={tjv} />
		</Section>
		<Section>
			<Heading>Modify node: join-N0</Heading>
			<ThreeColGrid>{modifyGrid}</ThreeColGrid>
		</Section>
	</Page>
)

export default UIPage
