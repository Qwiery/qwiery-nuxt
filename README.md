# Qwiery for Nuxt

This is a Nuxt productivity toolbox to create graph-driven apps. It allows to integrate the main graph visualization libraries on the front-end and diverse graph and classic databases in the backend.

There are three versions within this repo based on three graph visualization frameworks: **yFiles**, **Ogma** and **Cytoscape**. You can access each via git checkout of the respective branches. The core is always the same, only the graph visualization part is implemented differently.


## Required Licenses

Although the code is open source, the dependencies are not (except for Cytoscape):

- The yFiles version requires [a valid license or a trial version](https://www.yworks.com/products/yfiles-for-html). The code is based on yFiles for HTML v2.6.
- The Ogma version requires [a valid Ogma license from Linkurious](http://linkurious.com/ogma/).
- The Cytoscape version does not require a license and can be used freely.

The pro and con and which version is best for your use case is a subtle discussion (price, scope, learning curve, features...). Please contact us (links below) if you need guidance.

## yFiles setup

Checkout the yFiles branch (`git checkout yfiles`).

In order to run you need:

- a yFiles zip containing the demo code and npm package(s),
- a valid license in the form of a JSON files or snippet.

Unizp the distributable (something like `yFiles-for-HTML-Complete-2.6.0.2`) and under `lib-dev` copy the path to `yfiles-umd-26.0.2+dev.tgz`. This is the path you need to assign to the `yfile` dependency in `package.json`.

The license snippet can be either put directly in the code

```javascript
License.value = {
    company: "Your corp",
    ...
    key: "License key"
};
```
or, better, put the snippet as string in a `.env` file

```text
YFILES_LICENSE=`{"company":...}`
```
With this in place use the standard


```bash
npm i
npm run dev
```
or whatever package manager flavor you enjoy most (pnpm, yarn...). 

## Ogma setup

Checkout the yFiles branch (`git checkout ogma`).

In order to run this version you either need a npm package or a link from Linkurious

- if you have distributable, assign in `@linkurious/ogma` the path to this file (typically something like `"@linkurious/ogma": "~/linkurious-ogma-4.5.0.tgz"`),
- if you have a link from Linkurious assign this to `@linkurious/ogma`, typically the link looks like `https://get.linkurio.us/api/get/npm/ogma/4.5.5/?secret=123456`.

Now you can proceed as usual with

```bash
npm i
npm run dev
```

## Cytoscape setup

The [Cytoscape](http://js.cytoscape.org/) version does not require a license but is also the least sophisticate one. For enterprise development and advanced layout you should consider yFiles. If your graph visualization requirements are more towards data visualization (ie. explore data but not edit it) you should consider Ogma. 

Checkout the master branch (`git checkout master`) and use

```bash
npm i
npm run dev
```
There is no 'cytoscape' branch, the master branch contains the Cytoscape version.

## Features

- all versions are made with Nuxt (>=v3.8) and NodeJs >=v21
- [Tailwind](https://tailwindcss.com) styling
- [internationalization ready](https://nuxt.com/modules/i18n)
- graph viewer, graph editor and schema visualization
- data access based on a generic data access layer allowing in-memory JSON graphs, transparent graph database on top of any SQL database, Neo4j and more
- Qwiery plugins allowing all sorts of things like schema protection, triples and more
- a clone of Neo4j's Bloom

Qwiery's mechanics is detailed here.

## Feedback

This template is a stepping stone and we sincerely hope it helps jump-start your own visualizations. It's neither bug-free nor complete and  
if you find something isn't as expected you [can report it](https://github.com/Qwiery/qwiery-nuxt/issues) or contact us:

- [Twitter](https://twitter.com/theorbifold) 
- [Email](mailto:info@orbifold.net)
- [Orbifold Consulting](https://GraphsAndNetworks.com)

## Consulting and Custom Development

You can use any of the links above to contact us with respect to custom development and beyond. We have more than 20 years experience with everything graphs. 

## License
See the [MIT LICENSE](https://github.com/Qwiery/qwiery-nuxt/blob/master/LICENSE) file.
