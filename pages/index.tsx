import Page from '@/components/page'
import NodeInput from '@/components/input/nodeInput'

const Index = () => (
	<Page>
		<section className='mt-20'>
			<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
				Metering unit
			</h2>

			<NodeInput properties={['pressure', 'temperature', 'flow rate']} />
		</section>
	</Page>
)

export default Index
