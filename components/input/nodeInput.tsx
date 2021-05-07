import SingleProperty from './singleProperty'

const NodeInput = () => {
	const properties = ['pressure', 'temperature', 'flow rate']
	return (
		<>
			<div className='max-w-xs'>
				{properties.map((p, i) => (
					<SingleProperty property={p} key={i} />
				))}
			</div>
		</>
	)
}

export default NodeInput
