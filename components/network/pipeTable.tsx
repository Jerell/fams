import PipeSegment from '@/public/model/pipeSegment'
import Pipe from '@/public/model/pipe'

interface IRow {
	pipe: PipeSegment | Pipe
}

const PipeRow = ({ pipe }: IRow) => {
	const selected = false
	return (
		<tr className={`text-center ${selected ? 'bg-green-100' : ''}`}>
			<td className='text-left'>
				<div className='flex items-center'>
					<div className='ml-2'>
						<div className='font-medium text-gray-900'>{pipe.name}</div>
					</div>
				</div>
			</td>
			<td>
				<div className='text-gray-900'>{pipe.source.name}</div>
			</td>
			<td>
				<div className='text-gray-900'>{pipe.destination.name}</div>
			</td>
			<td>
				<div className='text-gray-900'>{pipe.length}</div>
			</td>
		</tr>
	)
}

const PipeTable = ({ network }) => {
	const { pipes } = network
	const headings = ['Pipe', 'Source', 'Destination', 'Length (m)']

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
		<table className='text-md font-normal text-left w-full bg-white'>
			<thead className='bg-blue-50'>
				<tr className='text-center'>{headings.map((h, i) => heading(h, i))}</tr>
			</thead>
			<tbody className='divide-y divide-gray-200'>
				<PipeRow pipe={pipes[0]} />
				{pipes.map((n, i) => (
					<PipeRow pipe={n} key={i} />
				))}
			</tbody>
		</table>
	)
}

export default PipeTable
