import Page from '@/components/page'
import NodeInput from '@/components/input/nodeInput'
import NetworkMap from '@/components/networkMap'
import Network from '@/public/model/network'

const basicnet = new Network({ name: 'basic' })
const B0 = basicnet.addNode()
const B1 = basicnet.addNode()
basicnet.addPipe({ source: B0, destination: B1 })

const net = new Network({ name: 'twojoin' })
const N0 = net.addNode()
const N1 = net.addNode()
const N2 = net.addNode()
const N3 = net.addNode()

const P1 = net.addPipe({ source: N0, destination: N1 })
const P2 = net.addPipe({ source: N1, destination: N2 })
const P3 = net.addPipe({ source: N3, destination: N1 })

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
