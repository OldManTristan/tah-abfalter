import { SystemManager } from './system-manager.js'
import { MODULE, REQUIRED_CORE_MODULE_VERSION, LOG_PREFIX } from './constants.js'

Hooks.on('tokenActionHudCoreApiReady', async () => {
    console.log(`${LOG_PREFIX}init start`)
    /**
     * Return the SystemManager and requiredCoreModuleVersion to Token Action HUD Core
     */
    const module = game.modules.get(MODULE.ID)

    console.log(game.modules)

    /*if(core.version < REQUIRED_CORE_MODULE_VERSION)
        throw new Error(`${LOG_PREFIX}Update ${CORE_MODULE.ID}. Minimum version needed is ${REQUIRED_CORE_MODULE_VERSION}`)*/

    module.api = {
        requiredCoreModuleVersion: REQUIRED_CORE_MODULE_VERSION,
        SystemManager
    }
    Hooks.call('tokenActionHudSystemReady', module)
})
