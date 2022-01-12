// NOTE: this is for internal Cypress types that we don't want exposed in the public API but want for development
// TODO: find a better place for this

interface InternalWindowLoadDetails {
  type: 'same:domain' | 'cross:domain' | 'cross:domain:failure'
  error?: Error
  window?: AUTWindow
}

declare namespace Cypress {
  interface Actions {
    (action: 'internal:window:load', fn: (details: InternalWindowLoadDetails) => void)
    (action: 'net:stubbing:event', frame: any)
    (action: 'request:event', data: any)
  }

  interface cy {
    /**
     * If `as` is chained to the current command, return the alias name used.
     */
    getNextAlias: () => string | undefined
    noop: <T>(v: T) => Cypress.Chainable<T>
    queue: any
    retry: (fn: () => any, opts: any) => any
    state: State
    pauseTimers: <T>(shouldPause: boolean) => Cypress.Chainable<T>
    // TODO: this function refers to clearTimeout at cy/timeouts.ts, which doesn't have any argument.
    // But in many cases like cy/commands/screenshot.ts, it's called with a timeout id string.
    // We should decide whether calling with id is correct or not.
    clearTimeout: <T>(timeoutId?: string) => Cypress.Chainable<T>
  }

  interface Cypress {
    backend: (eventName: string, ...args: any[]) => Promise<any>
    // TODO: how to pull this from proxy-logging.ts? can't import in a d.ts file...
    ProxyLogging: any
    // TODO: how to pull these from resolvers.ts? can't import in a d.ts file...
    resolveWindowReference: any
    resolveLocationReference: any
    routes: {
      [routeId: string]: any
    }
    sinon: sinon.SinonApi
    utils: CypressUtils
    state: State
  }

  interface CypressUtils {
    throwErrByPath: (path: string, obj?: { args: object }) => void
    warnByPath: (path: string, obj?: { args: object }) => void
    warning: (message: string) => void
  }

  type Log = ReturnType<Cypress.log>

  interface LogConfig {
    message: any[]
    instrument?: 'route'
    isStubbed?: boolean
    alias?: string
    aliasType?: 'route'
    commandName?: string
    type?: 'parent'
    event?: boolean
    method?: string
    url?: string
    status?: number
    numResponses?: number
    response?: string | object
    renderProps?: () => {
      indicator?: 'aborted' | 'pending' | 'successful' | 'bad'
      message?: string
    }
    browserPreRequest?: any
  }

  interface State {
    (k: '$autIframe', v?: JQuery<HTMLIFrameElement>): JQuery<HTMLIFrameElement> | undefined
    (k: 'routes', v?: RouteMap): RouteMap
    (k: 'aliasedRequests', v?: AliasedRequest[]): AliasedRequest[]
    (k: 'document', v?: Document): Document
    (k: 'window', v?: Window): Window
    (k: string, v?: any): any
    state: Cypress.state
  }

  interface InternalConfig {
    (k: keyof ResolvedConfigOptions, v?: any): any
  }

  // Extend Cypress.state properties here
  interface ResolvedConfigOptions {
    $autIframe: JQuery<HTMLIFrameElement>
    document: Document
  }
}

type AliasedRequest = {
  alias: string
  request: any
}

// utility types
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
