
# Mithra Herramientas

This is a software that will help you convert neodata catalogs compatible with Mithra México


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Installation

recommended node version

```bash
  v14.19.0
```
Install my-project with npm

```bash
  npm install
  npm run electron:serve
```
Generate icons

```bash
  npm run electron:generate-icons
```

Publish a version new for windows and linux

```bash
  npm run electron:build -- --linux --win -p always
```
## Deployment windows

Install wine to generate windows app
```bash
  sudo dpkg --add-architecture i386
  sudo apt update
  wget -qO- https://dl.winehq.org/wine-builds/winehq.key | sudo apt-key add -
  sudo apt install software-properties-common
  sudo apt-add-repository "deb http://dl.winehq.org/wine-builds/ubuntu/ $(lsb_release -cs) main"
  sudo apt install --install-recommends winehq-stable
  wine --version
```

Configure wine

```bash
  winecfg
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GH_TOKEN`


## Authors

- [@RYADJRH](https://github.com/RYADJRH)