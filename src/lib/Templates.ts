export interface Template {
  readonly name: string
  readonly ownerUsername: string
  readonly repositoryName: string
}

export const templates = Object.freeze<Template>([
  {
    name: 'teste-app',
    ownerUsername: 'pedrinholemes',
    repositoryName: 'trend-colors'
  },
  {
    name: 'react-electron-app',
    ownerUsername: 'diego3g',
    repositoryName: 'electron-typescript-react'
  },
  {
    name: 'next-app',
    ownerUsername: 'rocketseat-content',
    repositoryName: 'react-nextjs-typescript-structure'
  }
])
