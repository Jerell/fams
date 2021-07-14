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
const TJV0 = tjv.addNode({ temperature: 220 })
const TJV1 = tjv.addNode({ temperature: 220 })
const TJV2 = tjv.addNode({ temperature: 220 })
const TJV3 = tjv.addNode({ pressure: 10000, temperature: 220 })

const tjvP0 = tjv.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
tjvP0.source = TJV0
tjvP0.destination = TJV1
tjvP0.addValve()

const tjvP1 = tjv.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
tjvP1.source = TJV1
tjvP1.destination = TJV2

const tjvP2 = tjv.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
tjvP2.source = TJV3
tjvP2.destination = TJV1

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
		unitRight
	></NumberInput>,
	<NumberInput
		required
		label='temperature'
		labelClasses=''
		unit='°C'
		unitRight
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
			<PipeTable network={tjv} />
		</Section>
		<Section>
			<Heading>Modify node: join-N0</Heading>
			<ThreeColGrid>{modifyGrid}</ThreeColGrid>
		</Section>
	</Page>
)

export default UIPage
