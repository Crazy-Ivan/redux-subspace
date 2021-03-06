import { applyToRoot } from 'redux-subspace'
import { createEpicMiddleware as baseCreateEpicMiddleware } from 'redux-observable'
import { SUBSPACE_STORE_KEY } from './subspaceStoreKey';

export const createEpicMiddleware = (rootEpic, options = {}) => {
    if (options.dependencies != null && (Array.isArray(options.dependencies) || typeof options.dependencies !== 'object')) {
        throw new TypeError('dependencies must be an object')
    }

    return applyToRoot(store => {
        const optionsWithStore = {
            ...options,
            dependencies: {
                ...options.dependencies,
                [SUBSPACE_STORE_KEY]: store
            }
        }
        return baseCreateEpicMiddleware(rootEpic, optionsWithStore)(store)
    })
}