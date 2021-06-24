<p align="center">
	<img alt="Pace" src="public/images/logo-512.png" width="90">
	<h2 align="center">Digital Twin</h2>
</p>

<p align="center">A TypeScript web application for modelling pipeline networks</p>

<p align="center">
	<a href="https://fams.vercel.app/">Application</a>
</p>

<p align="center">
	<a href="https://fams-docs.vercel.app/">Documentation</a>
</p>

## Overview

The model has a range of different entities that work together to simulate the functionality of the pipe system.

The most essential of these entities are nodes and pipes:

- [**Nodes**](https://fams-docs.vercel.app/docs/model/Node) are the points at the start and end of each pipe. They have input and output properties that can be specified or calculated.

- [**Pipes**](https://fams-docs.vercel.app/docs/model/Pipe) are connections between nodes.

## Aims

Given a set of starting conditions, the model should calculate the behaviour of fluid within the system.

A user interface will be used to set up a pipeline network and begin a simulation.

Data should be presented in easily readable graphs and visualizations that can be understood by laymen.
