import { execSync } from 'child_process'
import * as dns from 'dns'
import { URL } from 'url'

function getProxy(): string | undefined {
  if (process.env.https_proxy) {
    return process.env.https_proxy
  }

  try {
    const httpsProxy = execSync('npm config get https-proxy')
      .toString()
      .trim()
    return httpsProxy !== 'null' ? httpsProxy : undefined
  } catch {}
}

export function getOnline(packageManager: 'yarn' | 'npm'): Promise<boolean> {
  return new Promise(resolve => {
    let registryURL = 'registry.'
    if (packageManager === 'yarn') {
      registryURL += 'yarnpkg'
    } else {
      registryURL += 'npmjs'
    }
    registryURL += '.com'
    dns.lookup(registryURL, registryErr => {
      if (!registryErr) {
        return resolve(true)
      }

      const proxy = getProxy()
      if (!proxy) {
        return resolve(false)
      }

      const { hostname } = new URL(proxy)
      if (!hostname) {
        return resolve(false)
      }

      dns.lookup(hostname, proxyErr => {
        resolve(proxyErr == null)
      })
    })
  })
}
