import Page from '@/components/page'
import NodeInput from '@/components/input/nodeInput'
import NetworkMap from '@/components/networkMap'
import Network from '@/public/model/network'

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

const net = new Network({ name: 'twojoin' })
const N0 = net.addNode({ pressure: 100000, temperature: 220 })
const N1 = net.addNode({ pressure: 100000, temperature: 220 })
const N2 = net.addNode({ pressure: 100000, temperature: 220 })
const N3 = net.addNode({ pressure: 10000, temperature: 220 })

const P0 = net.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
P0.source = N0
P0.destination = N1

const P1 = net.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
P1.source = N1
P1.destination = N2

const P2 = net.addPipe({
	length: 200,
	diameter: 2,
	massFlow: 10,
	ignoreDestination: true,
})
P2.source = N3
P2.destination = N1

const Index = () => (
	<Page>
		<section className='mt-20'>
			{/* <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
				Metering unit
			</h2> */}

			{/* <NodeInput properties={['pressure', 'temperature', 'flow rate']} /> */}

			<NetworkMap network={basicnet} />
			<NetworkMap network={net} />
		</section>
	</Page>
)

export default Index
