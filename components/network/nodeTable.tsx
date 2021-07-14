import Node from '@/public/model/node'

interface IRow {
	node: Node
}

const NodeRow = ({ node }: IRow) => {
	const selected = false
	return (
		<tr className={`text-center ${selected ? 'bg-green-100' : ''}`}>
			<td className='text-left'>
				<div className='flex items-center'>
					<div className='ml-2'>
						<div className='font-medium text-gray-900'>{node.name}</div>
					</div>
				</div>
			</td>
			<td>
				<div className='text-gray-900'>{node.temperature}</div>
			</td>
			<td className='py-1'>
				<span
					className={`py-0.5 px-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
				>
					{node.pressure}
				</span>
			</td>
			<td className='text-gray-500'>
				{node.flow.in}, {node.flow.out}
			</td>
		</tr>
	)
}

const NodeTable = ({ network }) => {
	const { nodes } = network
	const headings = [
		'Node',
		'Temp (K)',
		'Pressure (Pa)',
		'Flow rate (in, out) (kg/s)',
	]

	const heading = (h, i) => (
		<th
			key={i}
			scope='col'
			className={`px-2 py-1 ${
				!i ? 'text-left ' : ''
			}font-medium text-gray-500 uppercase tracking-wider`}
		>
			{h}
		</th>
	)

	return (
		<table className='text-md font-normal text-left w-full bg-white mb-4'>
			<thead className='bg-blue-50'>
				<tr className='text-center'>{headings.map((h, i) => heading(h, i))}</tr>
			</thead>
			<tbody className='divide-y divide-gray-200'>
				{nodes.map((n, i) => (
					<NodeRow node={n} key={i} />
				))}
			</tbody>
		</table>
	)
}

export default NodeTable
