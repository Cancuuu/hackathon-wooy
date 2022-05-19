# Wooy Private App

To run the project against a local node you can use the [wooy-contracts](https://github.com/wooy-donations/pool-contracts). With those contracts you can bootstrap a local Buidler EVM instance with test data so that you can develop the app locally.

# Setup

Install dependencies:

```bash
$ yarn
```

Make sure you have `direnv` installed and well configured ([SETUP](https://direnv.net/docs/hook.html)). Copy `.envrc.example` to `.envrc`:

```bash
$ cp .envrc.example .envrc
```

Fill in your own values for `.envrc`, then run:

```bash
$ direnv allow
```

To run the local server, run:

```
$ yarn dev
```

## Tests

Locally, run:

```sh
yarn cypress
```
