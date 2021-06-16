import Page from '@/components/page'
import NodeInput from '@/components/input/nodeInput'
import NetworkMap from '@/components/networkMap'
import Network from '@/public/model/network'

// Network: basic

const basicnet = new Network({ name: 'basic' })
const B0 = basicnet.addNode({ pressure: 100000, temperature: 220 })
const B1 = basicnet.addNode({ pressure: 100000, temperature: 220 })
const bP1 = basicnet.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
bP1.source = B0
bP1.destination = B1

// Network: twojoin

const tj = new Network({ name: 'twojoin' })
const TJ0 = tj.addNode({ pressure: 100000, temperature: 220 })
const TJ1 = tj.addNode({ pressure: 100000, temperature: 220 })
const TJ2 = tj.addNode({ pressure: 100000, temperature: 220 })
const TJ3 = tj.addNode({ pressure: 10000, temperature: 220 })

const tjP0 = tj.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
tjP0.source = TJ0
tjP0.destination = TJ1

const tjP1 = tj.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
tjP1.source = TJ1
tjP1.destination = TJ2

const tjP2 = tj.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
tjP2.source = TJ3
tjP2.destination = TJ1

// Network: twojoinvalve

const tjv = new Network({ name: 'twojoinvalve' })
const TJV0 = tjv.addNode({ pressure: 100000, temperature: 220 })
const TJV1 = tjv.addNode({ pressure: 100000, temperature: 220 })
const TJV2 = tjv.addNode({ pressure: 100000, temperature: 220 })
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

const Index = () => (
	<Page>
		<section className='mt-20'>
			{/* <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
				Metering unit
			</h2> */}

			{/* <NodeInput properties={['pressure', 'temperature', 'flow rate']} /> */}

			<NetworkMap network={basicnet} />
			<NetworkMap network={tj} />
			<NetworkMap network={tjv} />
		</section>
	</Page>
)

export default Index
