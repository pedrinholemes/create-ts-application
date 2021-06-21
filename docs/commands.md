# Command Reference for create-ts-application

## Table of Contents
- [`new`](#new-command)
- [`help`](#help-command)
- [`list`](#list-command)
- [`search`](#search-command)


## New Command

### Usage

#### With `yarn create`
```sh
$ yarn create ts-application [project_name]
# or
$ yarn create ts-application new [project_name]
```

#### With `npm init`
```sh
$ npm init ts-application [project_name]
# or
$ npm init ts-application new [project_name]
```

#### Global Install
```sh
# use yarn
$ yarn global add create-ts-application
# or npm
$ npm install -g create-ts-application

$ create-ts-application [project_name]
# or
$ create-ts-application new [project_name]
```

### Description

This command open a prompt to you insert some infos to create a new project with typescript

### Output

```sh
? Informe nome do projeto my-project
? Informe onde o projeto será criado C:\Users\Pedro\www\my-project
? Selecione o template do projeto react-electron-app
? Selecione o seu gerenciador de pacotes yarn
? Você deseja iniciar o projeto com Git No
```
