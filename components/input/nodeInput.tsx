import SingleProperty from './singleProperty'

interface Props {
	properties: string[]
}

const NodeInput = ({ properties }: Props) => {
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
