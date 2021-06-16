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
				valve: {
					color: '#0d4c94',
				},
			},
		}

		const nodes = network.nodes
		const links = network.pipes.map((pipe) => {
			return {
				source: nodePos(pipe.source, network),
				target: nodePos(pipe.destination, network),
				valve: pipe.valve,
				cont: pipe.pressureContinuity,
			}
		})

		const svg = select(svgRef.current)
			.attr('width', settings.width)
			.attr('height', settings.height)

		// LINKS

		const link = svg
			.selectAll('g')
			.filter('.link')
			.data(links)
			.join('g')
			.attr('class', (d) => (d.valve ? 'link valve' : 'link'))
		// Line
		const line = link
			.append('line')
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y)
			.style('stroke', (d) => (d.cont ? settings.pipe.color : 'red'))
			.attr('class', networkStyles.path)
			.attr('stroke-width', settings.pipe.lineThickness)
		// Valve
		const valve = link
			.filter((p) => p.valve)
			.append('circle')
			.attr('r', settings.node.radius)
			.attr('class', 'valve')
			.attr('cx', (p) => (p.source.x + p.target.x) / 2)
			.attr('cy', (p) => (p.source.y + p.target.y) / 2)
			.style('fill', settings.pipe.valve.color)
		console.log(valve)

		// END LINKS

		// NODES

		const node = svg
			.selectAll('g')
			.filter('.node')
			.data(nodes)
			.join('g')
			.attr('class', 'node')
		// Point
		node.append('circle').attr('r', settings.node.radius)
		// Text
		node
			.append('text')
			.attr('font-size', settings.node.radius + 8)
			.attr('dx', settings.node.radius * 1.5)
			.text((d) => d.name)
		// END NODES

		function updateNodes() {
			// Position
			node.attr('transform', (d) => {
				return `translate(${d.x}, ${d.y})`
			})
		}

		function updateLinks() {
			line
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y)
				.style('stroke', (d) => (d.cont ? '#86EFAC' : 'red'))
				.attr('class', networkStyles.path)
				.attr('stroke-width', settings.pipe.lineThickness)

			const valveDestPosWeight = 0.85
			const valveSourcePosWeight = 1 - valveDestPosWeight
			valve
				.attr(
					'cx',
					(p) =>
						valveSourcePosWeight * p.source.x + valveDestPosWeight * p.target.x
				)
				.attr(
					'cy',
					(p) =>
						valveSourcePosWeight * p.source.y + valveDestPosWeight * p.target.y
				)
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
					Network Map: {network.name}
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
						<li key={i}>{`${p.name}: ${p.source.name} → ${p.destination.name} ${
							p.valve ? '(has valve)' : ''
						}`}</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default NetworkMap
