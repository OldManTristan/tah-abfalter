/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-abfalter'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '2.0' //update this when new Core functions are needed

/**
 * Action types
 */
export const ACTION_TYPE = {
    //TODO
    //Add to this when groups are made
    item: 'tokenActionHud.template.item',
    utility: 'tokenActionHud.utility'
}

/**
 * Groups
 */
export const GROUP = {
    armor: { id: 'armor', name: 'tokenActionHud.template.armor', type: 'system' },
    equipment: { id: 'equipment', name: 'tokenActionHud.template.equipment', type: 'system' },
    consumables: { id: 'consumables', name: 'tokenActionHud.template.consumables', type: 'system' },
    containers: { id: 'containers', name: 'tokenActionHud.template.containers', type: 'system' },
    treasure: { id: 'treasure', name: 'tokenActionHud.template.treasure', type: 'system' },
    weapons: { id: 'weapons', name: 'tokenActionHud.template.weapons', type: 'system' },
    combat: { id: 'combat', name: 'tokenActionHud.combat', type: 'system' },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system' },
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' },
    abilities: { id:'abilities', name: 'tokenActionHud.abfalter.abilities', type: 'system'},
    "fav-abilities": { id:'fav_abilities', name: 'tokenActionHud.abfalter.abilities', type: 'system'},
}

/**
 * Item types
 */
export const ITEM_TYPE = {
    advantage: { groupId: 'advantage' },
    disadvantage: { groupId: 'disadvantage' },
    elan: { groupId: 'elan' },
    proficiency: { groupId: 'proficiency' },
    spell: { groupId: 'spell' },
    spellPath: { groupId: 'spellPath' },
    turnMaint: { groupId: 'turnMaint' },
    dailyMaint: { groupId: 'dailyMaint' },
    incarnation: { groupId: 'incarnation' },
    invocation: { groupId: 'invocation' },
    mentalPattern: { groupId: 'mentalPattern' },
    psychicMatrix: { groupId: 'psychicMatrix' },
    maintPower: { groupId: 'maintPower' },
    discipline: { groupId: 'discipline' },
    arsMagnus: { groupId: 'arsMagnus' },
    martialArt: { groupId: 'martialArt' },
    kiTechnique: { groupId: 'kiTechnique' },
    kiSealCreature: { groupId: 'kiSealCreature' },
    armor: { groupId: 'armor' },
    armorHelmet: { groupId: 'armorHelmet' },
    weapon: { groupId: 'weapon' },
    ammo: { groupId: 'ammo' },
    inventory: { groupId: 'inventory' },
    currency: { groupId: 'currency' },
    class: { groupId: 'class' }
}
