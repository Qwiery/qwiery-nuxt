# Graphalyzer

This is a productivity toolbox to create graph-driven apps. It allows to integrate the main graph visualization libraries on the front-end and diverse graph and classic databases.

## Setup

To install, simply use the usual

```bash
npm i
```

and run with

```bash
npm start
```

## Deploy

The `release.ts` script creates a directory which can be deployed standalone.
This script depends on various utilities like `tsx` and `commander`, they are part of the dev-dependencies.

**Note**:the output still requires an `npm install` after copied at the destination. Since the packages are different for different OS and architectures, they have to be installed at destination.

In the root of this solution run:
```bash
tsx ./release.ts
```
