import React, { useRef, useEffect } from 'react'
import {
	forceSimulation,
	forceManyBody,
	forceCenter,
	forceLink,
} from 'd3-force'
import { select } from 'd3-selection'
import Network from '@/public/model/network'
import networkStyles from '../styles/network.module.css'

const NetworkMap = (props: { network: Network }) => {
	const svg = useRef<SVGSVGElement>(null)

	const { network } = props

	const nodePos = (node, network: Network) => network.nodes.indexOf(node)

	function init(svgRef: React.RefObject<SVGSVGElement>, network: Network) {
		const settings = {
			width: 300,
			height: 150,
			node: {
				radius: 5,
			},
			pipe: {
				color: '#0D9488',
				lineThickness: 5,
			},
		}

		const nodes = network.nodes
		const links = network.pipes.map((pipe) => {
			console.log(pipe, pipe.destinationPressure())
			return {
				source: nodePos(pipe.source, network),
				target: nodePos(pipe.destination, network),
				cont: pipe.pressureContinuity,
			}
		})

		console.log(links)

		const svg = select(svgRef.current)
			.attr('width', settings.width)
			.attr('height', settings.height)

		const link = svg.selectAll('line').data(links).join('line')
		const node = svg.selectAll('g').data(nodes).enter().append('g')

		function updateNodes() {
			// Position
			node.attr('transform', (d) => {
				return `translate(${d.x}, ${d.y})`
			})

			// Point
			node.append('circle').attr('r', settings.node.radius)

			// Text
			node
				.append('text')
				.attr('font-size', settings.node.radius + 8)
				.attr('dx', settings.node.radius * 1.5)
				.text((d) => d.name)
		}

		function updateLinks() {
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y)
				.style('stroke', (d) => (d.cont ? '#86EFAC' : 'red'))
				.attr('class', networkStyles.path)
				.attr('stroke-width', settings.pipe.lineThickness)
		}

		function ticked() {
			updateLinks()
			updateNodes()
		}

		const simulation = forceSimulation(nodes)
			.force('link', forceLink(links))
			.force('charge', forceManyBody().strength(-300))
			.force('center', forceCenter(settings.width / 2, settings.height / 2))
			.on('tick', ticked)
	}

	useEffect(() => {
		init(svg, network)
	}, [])

	return (
		<>
			<div className='network relative overflow-hidden w-full h-full mb-6'>
				<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
					Network Map
				</h2>
				<svg ref={svg}></svg>
				<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
					Entities
				</h2>
				<p className='italic'>nodes</p>
				<ul className='list-disc'>
					{network.nodes.map((n, i) => (
						<li key={i}>{n.name}</li>
					))}
				</ul>
				<p className='mt-2 italic'>pipes</p>
				<ul className='list-disc'>
					{network.pipes.map((p, i) => (
						<li key={i}>{`${p.source.name} → ${p.destination.name}`}</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default NetworkMap
