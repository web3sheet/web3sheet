const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports
    )
  }
const __export = (target, all) => {
  for (const name in all) __defProp(target, name, { get: all[name], enumerable: true })
}
const __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (const key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
const __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
)
const __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod)

// ../../node_modules/.pnpm/react@19.0.0-rc-66855b96-20241106/node_modules/react/cjs/react.production.js
const require_react_production = __commonJS({
  '../../node_modules/.pnpm/react@19.0.0-rc-66855b96-20241106/node_modules/react/cjs/react.production.js'(
    exports2,
  ) {
    const REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element')
    const REACT_PORTAL_TYPE = Symbol.for('react.portal')
    const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment')
    const REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode')
    const REACT_PROFILER_TYPE = Symbol.for('react.profiler')
    const REACT_CONSUMER_TYPE = Symbol.for('react.consumer')
    const REACT_CONTEXT_TYPE = Symbol.for('react.context')
    const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref')
    const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense')
    const REACT_MEMO_TYPE = Symbol.for('react.memo')
    const REACT_LAZY_TYPE = Symbol.for('react.lazy')
    const MAYBE_ITERATOR_SYMBOL = Symbol.iterator
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || 'object' !== typeof maybeIterable) return null
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable['@@iterator']
      return 'function' === typeof maybeIterable ? maybeIterable : null
    }
    const ReactNoopUpdateQueue = {
      isMounted: () => false,
      enqueueForceUpdate: () => {},
      enqueueReplaceState: () => {},
      enqueueSetState: () => {},
    }
    const assign = Object.assign
    const emptyObject = {}
    function Component(props, context, updater) {
      this.props = props
      this.context = context
      this.refs = emptyObject
      this.updater = updater || ReactNoopUpdateQueue
    }
    Component.prototype.isReactComponent = {}
    Component.prototype.setState = function (partialState, callback) {
      if (
        'object' !== typeof partialState &&
        'function' !== typeof partialState &&
        null != partialState
      )
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.',
        )
      this.updater.enqueueSetState(this, partialState, callback, 'setState')
    }
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
    }
    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype
    function PureComponent(props, context, updater) {
      this.props = props
      this.context = context
      this.refs = emptyObject
      this.updater = updater || ReactNoopUpdateQueue
    }
    const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy())
    pureComponentPrototype.constructor = PureComponent
    assign(pureComponentPrototype, Component.prototype)
    pureComponentPrototype.isPureReactComponent = true
    const isArrayImpl = Array.isArray
    const ReactSharedInternals = { H: null, A: null, T: null, S: null }
    const hasOwnProperty = Object.prototype.hasOwnProperty
    function ReactElement(type, key, self, _source, _owner, props) {
      self = props.ref
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== self ? self : null,
        props,
      }
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, void 0, void 0, void 0, oldElement.props)
    }
    function isValidElement(object) {
      return 'object' === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE
    }
    function escape(key) {
      const escaperLookup = { '=': '=0', ':': '=2' }
      return `$${key.replace(/[=:]/g, (match) => escaperLookup[match])}`
    }
    const userProvidedKeyEscapeRegex = /\/+/g
    function getElementKey(element, index) {
      return 'object' === typeof element && null !== element && null != element.key
        ? escape(`${element.key}`)
        : index.toString(36)
    }
    function noop$1() {}
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case 'fulfilled':
          return thenable.value
        case 'rejected':
          throw thenable.reason
        default:
          switch (
            ('string' === typeof thenable.status
              ? thenable.then(noop$1, noop$1)
              : ((thenable.status = 'pending'),
                thenable.then(
                  (fulfilledValue) => {
                    'pending' === thenable.status &&
                      ((thenable.status = 'fulfilled'), (thenable.value = fulfilledValue))
                  },
                  (error) => {
                    'pending' === thenable.status &&
                      ((thenable.status = 'rejected'), (thenable.reason = error))
                  },
                )),
            thenable.status)
          ) {
            case 'fulfilled':
              return thenable.value
            case 'rejected':
              throw thenable.reason
          }
      }
      throw thenable
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      let type = typeof children
      if ('undefined' === type || 'boolean' === type) children = null
      let invokeCallback = false
      if (null === children) invokeCallback = true
      else
        switch (type) {
          case 'bigint':
          case 'string':
          case 'number':
            invokeCallback = true
            break
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true
                break
              case REACT_LAZY_TYPE:
                return (
                  (invokeCallback = children._init),
                  mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback,
                  )
                )
            }
        }
      if (invokeCallback)
        return (
          (callback = callback(children)),
          (invokeCallback = '' === nameSoFar ? `.${getElementKey(children, 0)}` : nameSoFar),
          isArrayImpl(callback)
            ? ((escapedPrefix = ''),
              null != invokeCallback &&
                (escapedPrefix = `${invokeCallback.replace(userProvidedKeyEscapeRegex, '$&/')}/`),
              mapIntoArray(callback, array, escapedPrefix, '', (c) => c))
            : null != callback &&
              (isValidElement(callback) &&
                (callback = cloneAndReplaceKey(
                  callback,
                  escapedPrefix +
                    (null == callback.key || (children && children.key === callback.key)
                      ? ''
                      : `${(`${callback.key}`).replace(userProvidedKeyEscapeRegex, '$&/')}/`) +
                    invokeCallback,
                )),
              array.push(callback)),
          1
        )
      invokeCallback = 0
      const nextNamePrefix = '' === nameSoFar ? '.' : `${nameSoFar}:`
      if (isArrayImpl(children))
        for (let i = 0; i < children.length; i++)
          (nameSoFar = children[i]),
            (type = nextNamePrefix + getElementKey(nameSoFar, i)),
            (invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback))
      else if (((i = getIteratorFn(children)), 'function' === typeof i))
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          (nameSoFar = nameSoFar.value),
            (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
            (invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback))
      else if ('object' === type) {
        if ('function' === typeof children.then)
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback)
        array = String(children)
        throw Error(
          `Objects are not valid as a React child (found: ${'[object Object]' === array
              ? `object with keys {${Object.keys(children).join(', ')}}`
              : array}). If you meant to render a collection of children, use an array instead.`,
        )
      }
      return invokeCallback
    }
    function mapChildren(children, func, context) {
      if (null == children) return children
      const result = []
      let count = 0
      mapIntoArray(children, result, '', '', (child) => func.call(context, child, count++))
      return result
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        let ctor = payload._result
        ctor = ctor()
        ctor.then(
          (moduleObject) => {
            if (0 === payload._status || -1 === payload._status)
              (payload._status = 1), (payload._result = moduleObject)
          },
          (error) => {
            if (0 === payload._status || -1 === payload._status)
              (payload._status = 2), (payload._result = error)
          },
        )
        ;-1 === payload._status && ((payload._status = 0), (payload._result = ctor))
      }
      if (1 === payload._status) return payload._result.default
      throw payload._result
    }
    const reportGlobalError =
      'function' === typeof reportError
        ? reportError
        : (error) => {
            if ('object' === typeof window && 'function' === typeof window.ErrorEvent) {
              const event = new window.ErrorEvent('error', {
                bubbles: true,
                cancelable: true,
                message:
                  'object' === typeof error && null !== error && 'string' === typeof error.message
                    ? String(error.message)
                    : String(error),
                error,
              })
              if (!window.dispatchEvent(event)) return
            } else if ('object' === typeof process && 'function' === typeof process.emit) {
              process.emit('uncaughtException', error)
              return
            }
            console.error(error)
          }
    function noop() {}
    exports2.Children = {
      map: mapChildren,
      forEach: (children, forEachFunc, forEachContext) => {
        mapChildren(
          children,
          function () {
            forEachFunc.apply(this, arguments)
          },
          forEachContext,
        )
      },
      count: (children) => {
        let n = 0
        mapChildren(children, () => {
          n++
        })
        return n
      },
      toArray: (children) => mapChildren(children, (child) => child) || [],
      only: (children) => {
        if (!isValidElement(children))
          throw Error('React.Children.only expected to receive a single React element child.')
        return children
      },
    }
    exports2.Component = Component
    exports2.Fragment = REACT_FRAGMENT_TYPE
    exports2.Profiler = REACT_PROFILER_TYPE
    exports2.PureComponent = PureComponent
    exports2.StrictMode = REACT_STRICT_MODE_TYPE
    exports2.Suspense = REACT_SUSPENSE_TYPE
    exports2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals
    exports2.act = () => {
      throw Error('act(...) is not supported in production builds of React.')
    }
    exports2.cache = (fn) => () => fn.apply(null, arguments)
    exports2.cloneElement = (element, config, children) => {
      if (null === element || void 0 === element)
        throw Error(`The argument must be a React element, but you passed ${element}.`)
      const props = assign({}, element.props)
      let key = element.key
      let owner = void 0
      if (null != config)
        for (propName in (void 0 !== config.ref && (owner = void 0),
        void 0 !== config.key && (key = `${config.key}`),
        config))
          !hasOwnProperty.call(config, propName) ||
            'key' === propName ||
            '__self' === propName ||
            '__source' === propName ||
            ('ref' === propName && void 0 === config.ref) ||
            (props[propName] = config[propName])
      let propName = arguments.length - 2
      if (1 === propName) props.children = children
      else if (1 < propName) {
        for (let childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2]
        props.children = childArray
      }
      return ReactElement(element.type, key, void 0, void 0, owner, props)
    }
    exports2.createContext = (defaultValue) => {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
      }
      defaultValue.Provider = defaultValue
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue,
      }
      return defaultValue
    }
    exports2.createElement = (type, config, children) => {
      let propName
      const props = {}
      let key = null
      if (null != config)
        for (propName in (void 0 !== config.key && (key = `${config.key}`), config))
          hasOwnProperty.call(config, propName) &&
            'key' !== propName &&
            '__self' !== propName &&
            '__source' !== propName &&
            (props[propName] = config[propName])
      let childrenLength = arguments.length - 2
      if (1 === childrenLength) props.children = children
      else if (1 < childrenLength) {
        for (let childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2]
        props.children = childArray
      }
      if (type?.defaultProps)
        for (propName in ((childrenLength = type.defaultProps), childrenLength))
          void 0 === props[propName] && (props[propName] = childrenLength[propName])
      return ReactElement(type, key, void 0, void 0, null, props)
    }
    exports2.createRef = () => ({ current: null })
    exports2.forwardRef = (render) => ({ $$typeof: REACT_FORWARD_REF_TYPE, render })
    exports2.isValidElement = isValidElement
    exports2.lazy = (ctor) => ({
      $$typeof: REACT_LAZY_TYPE,
      _payload: { _status: -1, _result: ctor },
      _init: lazyInitializer,
    })
    exports2.memo = (type, compare) => ({
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare,
    })
    exports2.startTransition = (scope) => {
      const prevTransition = ReactSharedInternals.T
      const currentTransition = {}
      ReactSharedInternals.T = currentTransition
      try {
        const returnValue = scope()
        const onStartTransitionFinish = ReactSharedInternals.S
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue)
        'object' === typeof returnValue &&
          null !== returnValue &&
          'function' === typeof returnValue.then &&
          returnValue.then(noop, reportGlobalError)
      } catch (error) {
        reportGlobalError(error)
      } finally {
        ReactSharedInternals.T = prevTransition
      }
    }
    exports2.unstable_useCacheRefresh = () => ReactSharedInternals.H.useCacheRefresh()
    exports2.use = (usable) => ReactSharedInternals.H.use(usable)
    exports2.useActionState = (action, initialState, permalink) =>
      ReactSharedInternals.H.useActionState(action, initialState, permalink)
    exports2.useCallback = (callback, deps) => ReactSharedInternals.H.useCallback(callback, deps)
    exports2.useContext = (Context) => ReactSharedInternals.H.useContext(Context)
    exports2.useDebugValue = () => {}
    exports2.useDeferredValue = (value, initialValue) =>
      ReactSharedInternals.H.useDeferredValue(value, initialValue)
    exports2.useEffect = (create, deps) => ReactSharedInternals.H.useEffect(create, deps)
    exports2.useId = () => ReactSharedInternals.H.useId()
    exports2.useImperativeHandle = (ref, create, deps) =>
      ReactSharedInternals.H.useImperativeHandle(ref, create, deps)
    exports2.useInsertionEffect = (create, deps) =>
      ReactSharedInternals.H.useInsertionEffect(create, deps)
    exports2.useLayoutEffect = (create, deps) =>
      ReactSharedInternals.H.useLayoutEffect(create, deps)
    exports2.useMemo = (create, deps) => ReactSharedInternals.H.useMemo(create, deps)
    exports2.useOptimistic = (passthrough, reducer) =>
      ReactSharedInternals.H.useOptimistic(passthrough, reducer)
    exports2.useReducer = (reducer, initialArg, init) =>
      ReactSharedInternals.H.useReducer(reducer, initialArg, init)
    exports2.useRef = (initialValue) => ReactSharedInternals.H.useRef(initialValue)
    exports2.useState = (initialState) => ReactSharedInternals.H.useState(initialState)
    exports2.useSyncExternalStore = (subscribe, getSnapshot, getServerSnapshot) =>
      ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    exports2.useTransition = () => ReactSharedInternals.H.useTransition()
    exports2.version = '19.0.0-rc-66855b96-20241106'
  },
})

// ../../node_modules/.pnpm/react@19.0.0-rc-66855b96-20241106/node_modules/react/cjs/react.development.js
const require_react_development = __commonJS({
  '../../node_modules/.pnpm/react@19.0.0-rc-66855b96-20241106/node_modules/react/cjs/react.development.js'(
    exports2,
    module2,
  ) {
    'production' !== process.env.NODE_ENV &&
      (() => {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: () => {
              console.warn(
                '%s(...) is deprecated in plain JavaScript React classes. %s',
                info[0],
                info[1],
              )
            },
          })
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || 'object' !== typeof maybeIterable) return null
          maybeIterable =
            (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
            maybeIterable['@@iterator']
          return 'function' === typeof maybeIterable ? maybeIterable : null
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance =
            ((publicInstance = publicInstance.constructor) &&
              (publicInstance.displayName || publicInstance.name)) ||
            'ReactClass'
          const warningKey = `${publicInstance}.${callerName}`
          didWarnStateUpdateForUnmountedComponent[warningKey] ||
            (console.error(
              "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
              callerName,
              publicInstance,
            ),
            (didWarnStateUpdateForUnmountedComponent[warningKey] = true))
        }
        function Component(props, context, updater) {
          this.props = props
          this.context = context
          this.refs = emptyObject
          this.updater = updater || ReactNoopUpdateQueue
        }
        function ComponentDummy() {}
        function PureComponent(props, context, updater) {
          this.props = props
          this.context = context
          this.refs = emptyObject
          this.updater = updater || ReactNoopUpdateQueue
        }
        function testStringCoercion(value) {
          return `${value}`
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value)
            const _JSCompiler_inline_result = false
          } catch (_e) {
            JSCompiler_inline_result = true
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console
            const JSCompiler_temp_const = JSCompiler_inline_result.error
            const JSCompiler_inline_result$jscomp$0 =
              ('function' === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag]) ||
              value.constructor.name ||
              'Object'
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              'The provided key is an unsupported type %s. This value must be coerced to a string before using it here.',
              JSCompiler_inline_result$jscomp$0,
            )
            return testStringCoercion(value)
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null
          if ('function' === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE$2
              ? null
              : type.displayName || type.name || null
          if ('string' === typeof type) return type
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return 'Fragment'
            case REACT_PORTAL_TYPE:
              return 'Portal'
            case REACT_PROFILER_TYPE:
              return 'Profiler'
            case REACT_STRICT_MODE_TYPE:
              return 'StrictMode'
            case REACT_SUSPENSE_TYPE:
              return 'Suspense'
            case REACT_SUSPENSE_LIST_TYPE:
              return 'SuspenseList'
          }
          if ('object' === typeof type)
            switch (
              ('number' === typeof type.tag &&
                console.error(
                  'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
                ),
              type.$$typeof)
            ) {
              case REACT_CONTEXT_TYPE:
                return `${type.displayName || 'Context'}.Provider`
              case REACT_CONSUMER_TYPE:
                return `${type._context.displayName || 'Context'}.Consumer`
              case REACT_FORWARD_REF_TYPE: {
                const innerType = type.render
                type = type.displayName
                type ||
                  ((type = innerType.displayName || innerType.name || ''),
                  (type = '' !== type ? `ForwardRef(${type})` : 'ForwardRef'))
                return type
              }
              case REACT_MEMO_TYPE:
                return (
                  (innerType = type.displayName || null),
                  null !== innerType ? innerType : getComponentNameFromType(type.type) || 'Memo'
                )
              case REACT_LAZY_TYPE:
                innerType = type._payload
                type = type._init
                try {
                  return getComponentNameFromType(type(innerType))
                } catch (_x) {}
            }
          return null
        }
        function isValidElementType(type) {
          return !!('string' === typeof type ||
            'function' === typeof type ||
            type === REACT_FRAGMENT_TYPE ||
            type === REACT_PROFILER_TYPE ||
            type === REACT_STRICT_MODE_TYPE ||
            type === REACT_SUSPENSE_TYPE ||
            type === REACT_SUSPENSE_LIST_TYPE ||
            type === REACT_OFFSCREEN_TYPE ||
            ('object' === typeof type &&
              null !== type &&
              (type.$$typeof === REACT_LAZY_TYPE ||
                type.$$typeof === REACT_MEMO_TYPE ||
                type.$$typeof === REACT_CONTEXT_TYPE ||
                type.$$typeof === REACT_CONSUMER_TYPE ||
                type.$$typeof === REACT_FORWARD_REF_TYPE ||
                type.$$typeof === REACT_CLIENT_REFERENCE$1 ||
                void 0 !== type.getModuleId)))
        }
        function disabledLog() {}
        function disableLogs() {
          if (0 === disabledDepth) {
            prevLog = console.log
            prevInfo = console.info
            prevWarn = console.warn
            prevError = console.error
            prevGroup = console.group
            prevGroupCollapsed = console.groupCollapsed
            prevGroupEnd = console.groupEnd
            const props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true,
            }
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props,
            })
          }
          disabledDepth++
        }
        function reenableLogs() {
          disabledDepth--
          if (0 === disabledDepth) {
            const props = { configurable: true, enumerable: true, writable: true }
            Object.defineProperties(console, {
              log: assign({}, props, { value: prevLog }),
              info: assign({}, props, { value: prevInfo }),
              warn: assign({}, props, { value: prevWarn }),
              error: assign({}, props, { value: prevError }),
              group: assign({}, props, { value: prevGroup }),
              groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
              groupEnd: assign({}, props, { value: prevGroupEnd }),
            })
          }
          0 > disabledDepth &&
            console.error(
              'disabledDepth fell below zero. This is a bug in React. Please file an issue.',
            )
        }
        function describeBuiltInComponentFrame(name) {
          if (void 0 === prefix)
            try {
              throw Error()
            } catch (x) {
              const match = x.stack.trim().match(/\n( *(at )?)/)
              prefix = (match?.[1]) || ''
              suffix =
                -1 < x.stack.indexOf('\n    at')
                  ? ' (<anonymous>)'
                  : -1 < x.stack.indexOf('@')
                    ? '@unknown:0:0'
                    : ''
            }
          return `\n${prefix}${name}${suffix}`
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) return ''
          let frame = componentFrameCache.get(fn)
          if (void 0 !== frame) return frame
          reentry = true
          frame = Error.prepareStackTrace
          Error.prepareStackTrace = void 0
          let previousDispatcher = null
          previousDispatcher = ReactSharedInternals.H
          ReactSharedInternals.H = null
          disableLogs()
          try {
            const RunInRootFrame = {
              DetermineComponentFrameRoot: () => {
                try {
                  if (construct) {
                    const Fake = () => {
                      throw Error()
                    }
                    Object.defineProperty(Fake.prototype, 'props', {
                      set: () => {
                        throw Error()
                      },
                    })
                    if ('object' === typeof Reflect && Reflect.construct) {
                      try {
                        Reflect.construct(Fake, [])
                      } catch (x) {
                        const _control = x
                      }
                      Reflect.construct(fn, [], Fake)
                    } else {
                      try {
                        Fake.call()
                      } catch (x$0) {
                        control = x$0
                      }
                      fn.call(Fake.prototype)
                    }
                  } else {
                    try {
                      throw Error()
                    } catch (x$1) {
                      control = x$1
                    }
                    ;(Fake = fn()) && 'function' === typeof Fake.catch && Fake.catch(() => {})
                  }
                } catch (sample) {
                  if (sample && control && 'string' === typeof sample.stack)
                    return [sample.stack, control.stack]
                }
                return [null, null]
              },
            }
            RunInRootFrame.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot'
            let namePropDescriptor = Object.getOwnPropertyDescriptor(
              RunInRootFrame.DetermineComponentFrameRoot,
              'name',
            )
            namePropDescriptor?.configurable &&
              Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, 'name', {
                value: 'DetermineComponentFrameRoot',
              })
            let _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot()
            const sampleStack = _RunInRootFrame$Deter[0]
            const controlStack = _RunInRootFrame$Deter[1]
            if (sampleStack && controlStack) {
              const sampleLines = sampleStack.split('\n')
              const controlLines = controlStack.split('\n')
              for (
                _RunInRootFrame$Deter = namePropDescriptor = 0;
                namePropDescriptor < sampleLines.length &&
                !sampleLines[namePropDescriptor].includes('DetermineComponentFrameRoot');
              )
                namePropDescriptor++
              while (
                _RunInRootFrame$Deter < controlLines.length &&
                !controlLines[_RunInRootFrame$Deter].includes('DetermineComponentFrameRoot')
              )
                _RunInRootFrame$Deter++
              if (
                namePropDescriptor === sampleLines.length ||
                _RunInRootFrame$Deter === controlLines.length
              )
                for (
                  namePropDescriptor = sampleLines.length - 1,
                    _RunInRootFrame$Deter = controlLines.length - 1;
                  1 <= namePropDescriptor &&
                  0 <= _RunInRootFrame$Deter &&
                  sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter];
                )
                  _RunInRootFrame$Deter--
              for (
                ;
                1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter;
                namePropDescriptor--, _RunInRootFrame$Deter--
              )
                if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                  if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                    do
                      if (
                        (namePropDescriptor--,
                        _RunInRootFrame$Deter--,
                        0 > _RunInRootFrame$Deter ||
                          sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter])
                      ) {
                        let _frame =
                          `\n${sampleLines[namePropDescriptor].replace(' at new ', ' at ')}`
                        fn.displayName &&
                          _frame.includes('<anonymous>') &&
                          (_frame = _frame.replace('<anonymous>', fn.displayName))
                        'function' === typeof fn && componentFrameCache.set(fn, _frame)
                        return _frame
                      }
                    while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter)
                  }
                  break
                }
            }
          } finally {
            ;(reentry = false),
              (ReactSharedInternals.H = previousDispatcher),
              reenableLogs(),
              (Error.prepareStackTrace = frame)
          }
          sampleLines = (sampleLines = fn ? fn.displayName || fn.name : '')
            ? describeBuiltInComponentFrame(sampleLines)
            : ''
          'function' === typeof fn && componentFrameCache.set(fn, sampleLines)
          return sampleLines
        }
        function describeUnknownElementTypeFrameInDEV(type) {
          if (null == type) return ''
          if ('function' === typeof type) {
            const prototype = type.prototype
            return describeNativeComponentFrame(type, !(!prototype || !prototype.isReactComponent))
          }
          if ('string' === typeof type) return describeBuiltInComponentFrame(type)
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame('Suspense')
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame('SuspenseList')
          }
          if ('object' === typeof type)
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return (type = describeNativeComponentFrame(type.render, false)), type
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type)
              case REACT_LAZY_TYPE:
                prototype = type._payload
                type = type._init
                try {
                  return describeUnknownElementTypeFrameInDEV(type(prototype))
                } catch (_x) {}
            }
          return ''
        }
        function getOwner() {
          const dispatcher = ReactSharedInternals.A
          return null === dispatcher ? null : dispatcher.getOwner()
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, 'key')) {
            const getter = Object.getOwnPropertyDescriptor(config, 'key').get
            if (getter?.isReactWarning) return false
          }
          return void 0 !== config.key
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown ||
              ((specialPropKeyWarningShown = true),
              console.error(
                '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)',
                displayName,
              ))
          }
          warnAboutAccessingKey.isReactWarning = true
          Object.defineProperty(props, 'key', {
            get: warnAboutAccessingKey,
            configurable: true,
          })
        }
        function elementRefGetterWithDeprecationWarning() {
          let componentName = getComponentNameFromType(this.type)
          didWarnAboutElementRef[componentName] ||
            ((didWarnAboutElementRef[componentName] = true),
            console.error(
              'Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.',
            ))
          componentName = this.props.ref
          return void 0 !== componentName ? componentName : null
        }
        function ReactElement(type, key, self, _source, owner, props) {
          self = props.ref
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner,
          }
          null !== (void 0 !== self ? self : null)
            ? Object.defineProperty(type, 'ref', {
                enumerable: false,
                get: elementRefGetterWithDeprecationWarning,
              })
            : Object.defineProperty(type, 'ref', { enumerable: false, value: null })
          type._store = {}
          Object.defineProperty(type._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0,
          })
          Object.defineProperty(type, '_debugInfo', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null,
          })
          Object.freeze && (Object.freeze(type.props), Object.freeze(type))
          return type
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            void 0,
            void 0,
            oldElement._owner,
            oldElement.props,
          )
          newKey._store.validated = oldElement._store.validated
          return newKey
        }
        function validateChildKeys(node, parentType) {
          if ('object' === typeof node && node && node.$$typeof !== REACT_CLIENT_REFERENCE) {
            if (isArrayImpl(node))
              for (let i = 0; i < node.length; i++) {
                const child = node[i]
                isValidElement(child) && validateExplicitKey(child, parentType)
              }
            else if (isValidElement(node)) node._store && (node._store.validated = 1)
            else if (
              ((i = getIteratorFn(node)),
              'function' === typeof i && i !== node.entries && ((i = i.call(node)), i !== node))
            )
              while (!(node = i.next()).done)
                isValidElement(node.value) && validateExplicitKey(node.value, parentType)
          }
        }
        function isValidElement(object) {
          return (
            'object' === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE
          )
        }
        function validateExplicitKey(element, parentType) {
          if (
            element._store &&
            !element._store.validated &&
            null == element.key &&
            ((element._store.validated = 1),
            (parentType = getCurrentComponentErrorInfo(parentType)),
            !ownerHasKeyUseWarning[parentType])
          ) {
            ownerHasKeyUseWarning[parentType] = true
            let childOwner = ''
            element &&
              null != element._owner &&
              element._owner !== getOwner() &&
              ((childOwner = null),
              'number' === typeof element._owner.tag
                ? (childOwner = getComponentNameFromType(element._owner.type))
                : 'string' === typeof element._owner.name && (childOwner = element._owner.name),
              (childOwner = ` It was passed a child from ${childOwner}.`))
            const prevGetCurrentStack = ReactSharedInternals.getCurrentStack
            ReactSharedInternals.getCurrentStack = () => {
              let stack = describeUnknownElementTypeFrameInDEV(element.type)
              prevGetCurrentStack && (stack += prevGetCurrentStack() || '')
              return stack
            }
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              parentType,
              childOwner,
            )
            ReactSharedInternals.getCurrentStack = prevGetCurrentStack
          }
        }
        function getCurrentComponentErrorInfo(parentType) {
          let info = ''
          let owner = getOwner()
          owner &&
            (owner = getComponentNameFromType(owner.type)) &&
            (info = `\n\nCheck the render method of \`${owner}\`.`)
          info ||
            ((parentType = getComponentNameFromType(parentType)) &&
              (info = `\n\nCheck the top-level render call using <${parentType}>.`))
          return info
        }
        function escape(key) {
          const escaperLookup = { '=': '=0', ':': '=2' }
          return `$${key.replace(/[=:]/g, (match) => escaperLookup[match])}`
        }
        function getElementKey(element, index) {
          return 'object' === typeof element && null !== element && null != element.key
            ? (checkKeyStringCoercion(element.key), escape(`${element.key}`))
            : index.toString(36)
        }
        function noop$1() {}
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case 'fulfilled':
              return thenable.value
            case 'rejected':
              throw thenable.reason
            default:
              switch (
                ('string' === typeof thenable.status
                  ? thenable.then(noop$1, noop$1)
                  : ((thenable.status = 'pending'),
                    thenable.then(
                      (fulfilledValue) => {
                        'pending' === thenable.status &&
                          ((thenable.status = 'fulfilled'), (thenable.value = fulfilledValue))
                      },
                      (error) => {
                        'pending' === thenable.status &&
                          ((thenable.status = 'rejected'), (thenable.reason = error))
                      },
                    )),
                thenable.status)
              ) {
                case 'fulfilled':
                  return thenable.value
                case 'rejected':
                  throw thenable.reason
              }
          }
          throw thenable
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          let type = typeof children
          if ('undefined' === type || 'boolean' === type) children = null
          let invokeCallback = false
          if (null === children) invokeCallback = true
          else
            switch (type) {
              case 'bigint':
              case 'string':
              case 'number':
                invokeCallback = true
                break
              case 'object':
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true
                    break
                  case REACT_LAZY_TYPE:
                    return (
                      (invokeCallback = children._init),
                      mapIntoArray(
                        invokeCallback(children._payload),
                        array,
                        escapedPrefix,
                        nameSoFar,
                        callback,
                      )
                    )
                }
            }
          if (invokeCallback) {
            invokeCallback = children
            callback = callback(invokeCallback)
            const childKey = '' === nameSoFar ? `.${getElementKey(invokeCallback, 0)}` : nameSoFar
            isArrayImpl(callback)
              ? ((escapedPrefix = ''),
                null != childKey &&
                  (escapedPrefix = `${childKey.replace(userProvidedKeyEscapeRegex, '$&/')}/`),
                mapIntoArray(callback, array, escapedPrefix, '', (c) => c))
              : null != callback &&
                (isValidElement(callback) &&
                  (null != callback.key &&
                    ((invokeCallback && invokeCallback.key === callback.key) ||
                      checkKeyStringCoercion(callback.key)),
                  (escapedPrefix = cloneAndReplaceKey(
                    callback,
                    escapedPrefix +
                      (null == callback.key ||
                      (invokeCallback && invokeCallback.key === callback.key)
                        ? ''
                        : `${(`${callback.key}`).replace(userProvidedKeyEscapeRegex, '$&/')}/`) +
                      childKey,
                  )),
                  '' !== nameSoFar &&
                    null != invokeCallback &&
                    isValidElement(invokeCallback) &&
                    null == invokeCallback.key &&
                    invokeCallback._store &&
                    !invokeCallback._store.validated &&
                    (escapedPrefix._store.validated = 2),
                  (callback = escapedPrefix)),
                array.push(callback))
            return 1
          }
          invokeCallback = 0
          childKey = '' === nameSoFar ? '.' : `${nameSoFar}:`
          if (isArrayImpl(children))
            for (let i = 0; i < children.length; i++)
              (nameSoFar = children[i]),
                (type = childKey + getElementKey(nameSoFar, i)),
                (invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback))
          else if (((i = getIteratorFn(children)), 'function' === typeof i))
            for (
              i === children.entries &&
                (didWarnAboutMaps ||
                  console.warn(
                    'Using Maps as children is not supported. Use an array of keyed ReactElements instead.',
                  ),
                (didWarnAboutMaps = true)),
                children = i.call(children),
                i = 0;
              !(nameSoFar = children.next()).done;
            )
              (nameSoFar = nameSoFar.value),
                (type = childKey + getElementKey(nameSoFar, i++)),
                (invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback))
          else if ('object' === type) {
            if ('function' === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback,
              )
            array = String(children)
            throw Error(
              `Objects are not valid as a React child (found: ${'[object Object]' === array
                  ? `object with keys {${Object.keys(children).join(', ')}}`
                  : array}). If you meant to render a collection of children, use an array instead.`,
            )
          }
          return invokeCallback
        }
        function mapChildren(children, func, context) {
          if (null == children) return children
          const result = []
          let count = 0
          mapIntoArray(children, result, '', '', (child) => func.call(context, child, count++))
          return result
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            let ctor = payload._result
            ctor = ctor()
            ctor.then(
              (moduleObject) => {
                if (0 === payload._status || -1 === payload._status)
                  (payload._status = 1), (payload._result = moduleObject)
              },
              (error) => {
                if (0 === payload._status || -1 === payload._status)
                  (payload._status = 2), (payload._result = error)
              },
            )
            ;-1 === payload._status && ((payload._status = 0), (payload._result = ctor))
          }
          if (1 === payload._status)
            return (
              (ctor = payload._result),
              void 0 === ctor &&
                console.error(
                  "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
                  ctor,
                ),
              'default' in ctor ||
                console.error(
                  "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
                  ctor,
                ),
              ctor.default
            )
          throw payload._result
        }
        function resolveDispatcher() {
          const dispatcher = ReactSharedInternals.H
          null === dispatcher &&
            console.error(
              'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.',
            )
          return dispatcher
        }
        function noop() {}
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              const requireString = (`require${Math.random()}`).slice(0, 7)
              enqueueTaskImpl = (module2?.[requireString]).call(
                module2,
                'timers',
              ).setImmediate
            } catch (_err) {
              enqueueTaskImpl = (callback) => {
                false === didWarnAboutMessageChannel &&
                  ((didWarnAboutMessageChannel = true),
                  'undefined' === typeof MessageChannel &&
                    console.error(
                      'This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.',
                    ))
                const channel = new MessageChannel()
                channel.port1.onmessage = callback
                channel.port2.postMessage(void 0)
              }
            }
          return enqueueTaskImpl(task)
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && 'function' === typeof AggregateError
            ? new AggregateError(errors)
            : errors[0]
        }
        function popActScope(_prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 &&
            console.error(
              'You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ',
            )
          actScopeDepth = prevActScopeDepth
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          let queue = ReactSharedInternals.actQueue
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue)
                enqueueTask(() => recursivelyFlushAsyncActWork(returnValue, resolve, reject))
                return
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error)
              }
            else ReactSharedInternals.actQueue = null
          0 < ReactSharedInternals.thrownErrors.length
            ? ((queue = aggregateErrors(ReactSharedInternals.thrownErrors)),
              (ReactSharedInternals.thrownErrors.length = 0),
              reject(queue))
            : resolve(returnValue)
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true
            let i = 0
            try {
              for (; i < queue.length; i++) {
                let callback = queue[i]
                do {
                  ReactSharedInternals.didUsePromise = false
                  const continuation = callback(false)
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback
                      queue.splice(0, i)
                      return
                    }
                    callback = continuation
                  } else break
                } while (1)
              }
              queue.length = 0
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error)
            } finally {
              isFlushing = false
            }
          }
        }
        'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error())
        const REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element')
        const REACT_PORTAL_TYPE = Symbol.for('react.portal')
        const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment')
        const REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode')
        const REACT_PROFILER_TYPE = Symbol.for('react.profiler')
        Symbol.for('react.provider')
        const REACT_CONSUMER_TYPE = Symbol.for('react.consumer')
        const REACT_CONTEXT_TYPE = Symbol.for('react.context')
        const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref')
        const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense')
        const REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list')
        const REACT_MEMO_TYPE = Symbol.for('react.memo')
        const REACT_LAZY_TYPE = Symbol.for('react.lazy')
        const REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen')
        const MAYBE_ITERATOR_SYMBOL = Symbol.iterator
        const didWarnStateUpdateForUnmountedComponent = {}
        const ReactNoopUpdateQueue = {
            isMounted: () => false,
            enqueueForceUpdate: (publicInstance) => {
              warnNoop(publicInstance, 'forceUpdate')
            },
            enqueueReplaceState: (publicInstance) => {
              warnNoop(publicInstance, 'replaceState')
            },
            enqueueSetState: (publicInstance) => {
              warnNoop(publicInstance, 'setState')
            },
          }
        const assign = Object.assign
        const emptyObject = {}
        Object.freeze(emptyObject)
        Component.prototype.isReactComponent = {}
        Component.prototype.setState = function (partialState, callback) {
          if (
            'object' !== typeof partialState &&
            'function' !== typeof partialState &&
            null != partialState
          )
            throw Error(
              'takes an object of state variables to update or a function which returns an object of state variables.',
            )
          this.updater.enqueueSetState(this, partialState, callback, 'setState')
        }
        Component.prototype.forceUpdate = function (callback) {
          this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
        }
        let deprecatedAPIs = {
            isMounted: [
              'isMounted',
              'Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.',
            ],
            replaceState: [
              'replaceState',
              'Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).',
            ],
          }
        let fnName
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) &&
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName])
        ComponentDummy.prototype = Component.prototype
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy()
        deprecatedAPIs.constructor = PureComponent
        assign(deprecatedAPIs, Component.prototype)
        deprecatedAPIs.isPureReactComponent = true
        const isArrayImpl = Array.isArray
        const REACT_CLIENT_REFERENCE$2 = Symbol.for('react.client.reference')
        const ReactSharedInternals = {
            H: null,
            A: null,
            T: null,
            S: null,
            actQueue: null,
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false,
            didUsePromise: false,
            thrownErrors: [],
            getCurrentStack: null,
          }
        const hasOwnProperty = Object.prototype.hasOwnProperty
        const REACT_CLIENT_REFERENCE$1 = Symbol.for('react.client.reference')
        let disabledDepth = 0
        let prevLog
        let prevInfo
        let prevWarn
        let prevError
        let prevGroup
        let prevGroupCollapsed
        let prevGroupEnd
        disabledLog.__reactDisabledLog = true
        let prefix
        let suffix
        let reentry = false
        const componentFrameCache = new ('function' === typeof WeakMap ? WeakMap : Map)()
        const REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference')
        let specialPropKeyWarningShown
        let didWarnAboutOldJSXRuntime
        const didWarnAboutElementRef = {}
        const ownerHasKeyUseWarning = {}
        let didWarnAboutMaps = false
        const userProvidedKeyEscapeRegex = /\/+/g
        const reportGlobalError =
            'function' === typeof reportError
              ? reportError
              : (error) => {
                  if ('object' === typeof window && 'function' === typeof window.ErrorEvent) {
                    const event = new window.ErrorEvent('error', {
                      bubbles: true,
                      cancelable: true,
                      message:
                        'object' === typeof error &&
                        null !== error &&
                        'string' === typeof error.message
                          ? String(error.message)
                          : String(error),
                      error,
                    })
                    if (!window.dispatchEvent(event)) return
                  } else if ('object' === typeof process && 'function' === typeof process.emit) {
                    process.emit('uncaughtException', error)
                    return
                  }
                  console.error(error)
                }
        let didWarnAboutMessageChannel = false
        let enqueueTaskImpl = null
        let actScopeDepth = 0
        let didWarnNoAwaitAct = false
        let isFlushing = false
        const queueSeveralMicrotasks =
            'function' === typeof queueMicrotask
              ? (callback) => {
                  queueMicrotask(() => queueMicrotask(callback))
                }
              : enqueueTask
        exports2.Children = {
          map: mapChildren,
          forEach: (children, forEachFunc, forEachContext) => {
            mapChildren(
              children,
              function () {
                forEachFunc.apply(this, arguments)
              },
              forEachContext,
            )
          },
          count: (children) => {
            let n = 0
            mapChildren(children, () => {
              n++
            })
            return n
          },
          toArray: (children) => mapChildren(children, (child) => child) || [],
          only: (children) => {
            if (!isValidElement(children))
              throw Error('React.Children.only expected to receive a single React element child.')
            return children
          },
        }
        exports2.Component = Component
        exports2.Fragment = REACT_FRAGMENT_TYPE
        exports2.Profiler = REACT_PROFILER_TYPE
        exports2.PureComponent = PureComponent
        exports2.StrictMode = REACT_STRICT_MODE_TYPE
        exports2.Suspense = REACT_SUSPENSE_TYPE
        exports2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
          ReactSharedInternals
        exports2.act = (callback) => {
          const prevActQueue = ReactSharedInternals.actQueue
          const prevActScopeDepth = actScopeDepth
          actScopeDepth++
          const queue = (ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [])
          let didAwaitActCall = false
          try {
            const _result = callback()
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error)
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw (
              (popActScope(prevActQueue, prevActScopeDepth),
              (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
              (ReactSharedInternals.thrownErrors.length = 0),
              callback)
            )
          if (null !== result && 'object' === typeof result && 'function' === typeof result.then) {
            const thenable = result
            queueSeveralMicrotasks(() => {
              didAwaitActCall ||
                didWarnNoAwaitAct ||
                ((didWarnNoAwaitAct = true),
                console.error(
                  'You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);',
                ))
            })
            return {
              then: (resolve, reject) => {
                didAwaitActCall = true
                thenable.then(
                  (returnValue) => {
                    popActScope(prevActQueue, prevActScopeDepth)
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue),
                          enqueueTask(() =>
                            recursivelyFlushAsyncActWork(returnValue, resolve, reject),
                          )
                      } catch (error$2) {
                        ReactSharedInternals.thrownErrors.push(error$2)
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        const _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors)
                        ReactSharedInternals.thrownErrors.length = 0
                        reject(_thrownError)
                      }
                    } else resolve(returnValue)
                  },
                  (error) => {
                    popActScope(prevActQueue, prevActScopeDepth)
                    0 < ReactSharedInternals.thrownErrors.length
                      ? ((error = aggregateErrors(ReactSharedInternals.thrownErrors)),
                        (ReactSharedInternals.thrownErrors.length = 0),
                        reject(error))
                      : reject(error)
                  },
                )
              },
            }
          }
          const returnValue$jscomp$0 = result
          popActScope(prevActQueue, prevActScopeDepth)
          0 === prevActScopeDepth &&
            (flushActQueue(queue),
            0 !== queue.length &&
              queueSeveralMicrotasks(() => {
                didAwaitActCall ||
                  didWarnNoAwaitAct ||
                  ((didWarnNoAwaitAct = true),
                  console.error(
                    'A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)',
                  ))
              }),
            (ReactSharedInternals.actQueue = null))
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw (
              ((callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
              (ReactSharedInternals.thrownErrors.length = 0),
              callback)
            )
          return {
            then: (resolve, reject) => {
              didAwaitActCall = true
              0 === prevActScopeDepth
                ? ((ReactSharedInternals.actQueue = queue),
                  enqueueTask(() =>
                    recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject),
                  ))
                : resolve(returnValue$jscomp$0)
            },
          }
        }
        exports2.cache = (fn) => () => fn.apply(null, arguments)
        exports2.cloneElement = (element, config, children) => {
          if (null === element || void 0 === element)
            throw Error(`The argument must be a React element, but you passed ${element}.`)
          let props = assign({}, element.props)
          let key = element.key
          let owner = element._owner
          if (null != config) {
            let JSCompiler_inline_result
            a: {
              if (
                hasOwnProperty.call(config, 'ref') &&
                (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, 'ref').get) &&
                JSCompiler_inline_result.isReactWarning
              ) {
                JSCompiler_inline_result = false
                break a
              }
              JSCompiler_inline_result = void 0 !== config.ref
            }
            JSCompiler_inline_result && (owner = getOwner())
            hasValidKey(config) && (checkKeyStringCoercion(config.key), (key = `${config.key}`))
            for (propName in config)
              !hasOwnProperty.call(config, propName) ||
                'key' === propName ||
                '__self' === propName ||
                '__source' === propName ||
                ('ref' === propName && void 0 === config.ref) ||
                (props[propName] = config[propName])
          }
          let propName = arguments.length - 2
          if (1 === propName) props.children = children
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName)
            for (let i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2]
            props.children = JSCompiler_inline_result
          }
          props = ReactElement(element.type, key, void 0, void 0, owner, props)
          for (key = 2; key < arguments.length; key++) validateChildKeys(arguments[key], props.type)
          return props
        }
        exports2.createContext = (defaultValue) => {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }
          defaultValue.Provider = defaultValue
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue,
          }
          defaultValue._currentRenderer = null
          defaultValue._currentRenderer2 = null
          return defaultValue
        }
        exports2.createElement = (type, config, children) => {
          if (isValidElementType(type))
            for (let i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], type)
          else {
            i = ''
            if (
              void 0 === type ||
              ('object' === typeof type && null !== type && 0 === Object.keys(type).length)
            )
              i +=
                " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."
            if (null === type) let typeString = 'null'
            else
              isArrayImpl(type)
                ? (typeString = 'array')
                : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE
                  ? ((typeString =
                      `<${getComponentNameFromType(type.type) || 'Unknown'} />`),
                    (i = ' Did you accidentally export a JSX literal instead of a component?'))
                  : (typeString = typeof type)
            console.error(
              'React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',
              typeString,
              i,
            )
          }
          let propName
          i = {}
          typeString = null
          if (null != config)
            for (propName in (didWarnAboutOldJSXRuntime ||
              !('__self' in config) ||
              'key' in config ||
              ((didWarnAboutOldJSXRuntime = true),
              console.warn(
                'Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform',
              )),
            hasValidKey(config) &&
              (checkKeyStringCoercion(config.key), (typeString = `${config.key}`)),
            config))
              hasOwnProperty.call(config, propName) &&
                'key' !== propName &&
                '__self' !== propName &&
                '__source' !== propName &&
                (i[propName] = config[propName])
          let childrenLength = arguments.length - 2
          if (1 === childrenLength) i.children = children
          else if (1 < childrenLength) {
            for (let childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2]
            Object.freeze?.(childArray)
            i.children = childArray
          }
          if (type?.defaultProps)
            for (propName in ((childrenLength = type.defaultProps), childrenLength))
              void 0 === i[propName] && (i[propName] = childrenLength[propName])
          typeString &&
            defineKeyPropWarningGetter(
              i,
              'function' === typeof type ? type.displayName || type.name || 'Unknown' : type,
            )
          return ReactElement(type, typeString, void 0, void 0, getOwner(), i)
        }
        exports2.createRef = () => {
          const refObject = { current: null }
          Object.seal(refObject)
          return refObject
        }
        exports2.forwardRef = (render) => {
          null != render && render.$$typeof === REACT_MEMO_TYPE
            ? console.error(
                'forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).',
              )
            : 'function' !== typeof render
              ? console.error(
                  'forwardRef requires a render function but was given %s.',
                  null === render ? 'null' : typeof render,
                )
              : 0 !== render.length &&
                2 !== render.length &&
                console.error(
                  'forwardRef render functions accept exactly two parameters: props and ref. %s',
                  1 === render.length
                    ? 'Did you forget to use the ref parameter?'
                    : 'Any additional parameter will be undefined.',
                )
          null != render &&
            null != render.defaultProps &&
            console.error(
              'forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?',
            )
          const elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }
          let ownName
          Object.defineProperty(elementType, 'displayName', {
            enumerable: false,
            configurable: true,
            get: () => ownName,
            set: (name) => {
              ownName = name
              render.name ||
                render.displayName ||
                (Object.defineProperty(render, 'name', { value: name }),
                (render.displayName = name))
            },
          })
          return elementType
        }
        exports2.isValidElement = isValidElement
        exports2.lazy = (ctor) => ({
          $$typeof: REACT_LAZY_TYPE,
          _payload: { _status: -1, _result: ctor },
          _init: lazyInitializer,
        })
        exports2.memo = (type, compare) => {
          isValidElementType(type) ||
            console.error(
              'memo: The first argument must be a component. Instead received: %s',
              null === type ? 'null' : typeof type,
            )
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare,
          }
          let ownName
          Object.defineProperty(compare, 'displayName', {
            enumerable: false,
            configurable: true,
            get: () => ownName,
            set: (name) => {
              ownName = name
              type.name ||
                type.displayName ||
                (Object.defineProperty(type, 'name', { value: name }), (type.displayName = name))
            },
          })
          return compare
        }
        exports2.startTransition = (scope) => {
          const prevTransition = ReactSharedInternals.T
          const currentTransition = {}
          ReactSharedInternals.T = currentTransition
          currentTransition._updatedFibers = /* @__PURE__ */ new Set()
          try {
            const returnValue = scope()
            const onStartTransitionFinish = ReactSharedInternals.S
            null !== onStartTransitionFinish &&
              onStartTransitionFinish(currentTransition, returnValue)
            'object' === typeof returnValue &&
              null !== returnValue &&
              'function' === typeof returnValue.then &&
              returnValue.then(noop, reportGlobalError)
          } catch (error) {
            reportGlobalError(error)
          } finally {
            null === prevTransition &&
              currentTransition._updatedFibers &&
              ((scope = currentTransition._updatedFibers.size),
              currentTransition._updatedFibers.clear(),
              10 < scope &&
                console.warn(
                  'Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.',
                )),
              (ReactSharedInternals.T = prevTransition)
          }
        }
        exports2.unstable_useCacheRefresh = () => resolveDispatcher().useCacheRefresh()
        exports2.use = (usable) => resolveDispatcher().use(usable)
        exports2.useActionState = (action, initialState, permalink) =>
          resolveDispatcher().useActionState(action, initialState, permalink)
        exports2.useCallback = (callback, deps) => resolveDispatcher().useCallback(callback, deps)
        exports2.useContext = (Context) => {
          const dispatcher = resolveDispatcher()
          Context.$$typeof === REACT_CONSUMER_TYPE &&
            console.error(
              'Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?',
            )
          return dispatcher.useContext(Context)
        }
        exports2.useDebugValue = (value, formatterFn) =>
          resolveDispatcher().useDebugValue(value, formatterFn)
        exports2.useDeferredValue = (value, initialValue) =>
          resolveDispatcher().useDeferredValue(value, initialValue)
        exports2.useEffect = (create, deps) => resolveDispatcher().useEffect(create, deps)
        exports2.useId = () => resolveDispatcher().useId()
        exports2.useImperativeHandle = (ref, create, deps) =>
          resolveDispatcher().useImperativeHandle(ref, create, deps)
        exports2.useInsertionEffect = (create, deps) =>
          resolveDispatcher().useInsertionEffect(create, deps)
        exports2.useLayoutEffect = (create, deps) =>
          resolveDispatcher().useLayoutEffect(create, deps)
        exports2.useMemo = (create, deps) => resolveDispatcher().useMemo(create, deps)
        exports2.useOptimistic = (passthrough, reducer) =>
          resolveDispatcher().useOptimistic(passthrough, reducer)
        exports2.useReducer = (reducer, initialArg, init) =>
          resolveDispatcher().useReducer(reducer, initialArg, init)
        exports2.useRef = (initialValue) => resolveDispatcher().useRef(initialValue)
        exports2.useState = (initialState) => resolveDispatcher().useState(initialState)
        exports2.useSyncExternalStore = (subscribe, getSnapshot, getServerSnapshot) =>
          resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
        exports2.useTransition = () => resolveDispatcher().useTransition()
        exports2.version = '19.0.0-rc-66855b96-20241106'
        'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())
      })()
  },
})

// ../../node_modules/.pnpm/react@19.0.0-rc-66855b96-20241106/node_modules/react/index.js
const require_react = __commonJS({
  '../../node_modules/.pnpm/react@19.0.0-rc-66855b96-20241106/node_modules/react/index.js'(
    _exports2,
    module2,
  ) {
    if (process.env.NODE_ENV === 'production') {
      module2.exports = require_react_production()
    } else {
      module2.exports = require_react_development()
    }
  },
})

// index.ts
const core_exports = {}
__export(core_exports, {
  createWeb3WalletConfig: () => createWeb3WalletConfig,
  useWallet: () => useWallet,
})
module.exports = __toCommonJS(core_exports)

// hooks/useWallet.tsx
const import_react2 = __toESM(require_react())
const import_wagmi2 = require('wagmi')

// hooks/useArbName.tsx
const import_react_query = require('@tanstack/react-query')
async function getArbName(address) {
  const res = await fetch(
    `${'https://api.prd.space.id/v1/getName?tld=arb1&address=' /* ARB_NAME_LOOKUP */}${address}`,
  )
  if (!res.ok) {
    return null
  }
  const body = await res.json()
  if (body.code === 0) {
    return body.name
  }
    return null
}
function useArbName({ address }) {
  const { data: arbName } = (0, import_react_query.useQuery)({
    enabled: !!address,
    queryKey: ['arbName', address],
    queryFn: async () => {
      return getArbName(address)
    },
  })
  return { arbName }
}

// hooks/useWallet.tsx
const import_string = require('@web3wallet/util/string')

// hooks/useEns.tsx
const import_react = __toESM(require_react())
const import_ens = require('viem/ens')
const import_wagmi = require('wagmi')
const import_chains = require('viem/chains')
function useEns({ address, enabled, config }) {
  const wagmiConfig = (0, import_wagmi.useConfig)()
  const ensConfig = (0, import_react.useMemo)(() => {
    return {
      config: {
        ...(config ?? wagmiConfig),
        chains: [import_chains.mainnet],
      },
      chainId: import_chains.mainnet.id,
      universalResolverAddress: import_chains.mainnet.contracts.ensUniversalResolver.address,
    }
  }, [wagmiConfig, config])
  const { data: ensName } = (0, import_wagmi.useEnsName)({
    query: { enabled },
    address,
    ...ensConfig,
  })
  const normalizedEnsName = (0, import_react.useMemo)(
    () => (ensName ? (0, import_ens.normalize)(ensName) : void 0),
    [ensName],
  )
  const { data: ensAvatar } = (0, import_wagmi.useEnsAvatar)({
    query: { enabled: !!normalizedEnsName },
    name: normalizedEnsName,
    ...ensConfig,
  })
  return { ensName, ensAvatar }
}

// hooks/useWallet.tsx
function useWallet() {
  const config = (0, import_wagmi2.useConfig)()
  const { address, isConnected, chainId, chain } = (0, import_wagmi2.useAccount)({ config })
  const { disconnect: disconnectWagmi } = (0, import_wagmi2.useDisconnect)({ config })
  const { connect, connectors, status, error, isError, isSuccess, data } = (0,
  import_wagmi2.useConnect)({ config })
  if (isError) {
    console.error('Error connecting to wallet', error)
  }
  if (isSuccess) {
  }
  const chains = (0, import_wagmi2.useChains)({ config })
  const {
    switchChain,
    isError: switchChainIsError,
    error: switchChainError,
  } = (0, import_wagmi2.useSwitchChain)({ config })
  if (switchChainIsError) {
    console.error('Error switching chain', switchChainError)
  }
  const { data: balanceData } = (0, import_wagmi2.useBalance)({
    config,
    address,
    query: { enabled: isConnected },
  })
  const { ensName, ensAvatar } = useEns({
    config,
    address,
    enabled: isConnected,
  })
  const { arbName } = useArbName({ address })
  const disconnect = () => {
    disconnectWagmi()
  }
  const nativeBalanceData = (0, import_react2.useMemo)(() => {
    return {
      nativeBalance: balanceData ? balanceData?.value : null,
      nativeBalanceDecimals: balanceData ? balanceData?.decimals : null,
      nativeBalanceSymbol: balanceData ? balanceData?.symbol : null,
    }
  }, [balanceData])
  const resolvedName = (0, import_react2.useMemo)(() => {
    const name = arbName ?? ensName ?? address
    if (!name) return void 0
    return (0, import_string.collapseString)(name, 6, 4)
  }, [ensName, arbName, address])
  return {
    config,
    address,
    resolvedName,
    ensName,
    ensAvatar,
    arbName,
    isConnected,
    disconnect,
    connect,
    connectors,
    chainId,
    chain,
    chains,
    switchChain,
    ...nativeBalanceData,
  }
}

// lib/wagmi.ts
const import_wagmi3 = require('wagmi')
const import_viem = require('viem')
const import_connectors = require('@wagmi/connectors')
const createWeb3WalletWagmiConfig = ({
  walletConnectConfig,
  metaMaskConfig,
  wagmiConfig: {
    chains,
    overrideConnectors,
    overrideStorage,
    additionalConnectors = [],
    ssr = true,
  },
}) => {
  const connectors = [(0, import_connectors.coinbaseWallet)()]
  if (metaMaskConfig) connectors.push((0, import_connectors.metaMask)(metaMaskConfig))
  if (walletConnectConfig)
    connectors.push((0, import_connectors.walletConnect)(walletConnectConfig))
  connectors.concat(additionalConnectors)
  return (0, import_wagmi3.createConfig)({
    chains,
    ssr,
    connectors: overrideConnectors ?? connectors,
    client({ chain }) {
      return (0, import_viem.createClient)({ chain, transport: (0, import_wagmi3.http)() })
    },
    storage:
      overrideStorage ??
      (0, import_wagmi3.createStorage)({
        storage: import_wagmi3.cookieStorage,
      }),
  })
}

// lib/config.ts
const createWeb3WalletConfig = ({ wagmiConfig, walletConnectConfig, metaMaskConfig }) => {
  return {
    wagmiConfig: createWeb3WalletWagmiConfig({
      wagmiConfig,
      walletConnectConfig,
      metaMaskConfig,
    }),
    walletConnectConfig,
    metaMaskConfig,
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    createWeb3WalletConfig,
    useWallet,
  })
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=index.js.map
