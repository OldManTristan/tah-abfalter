import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
    })
    const groupsArray = Object.values(groups)
    DEFAULTS = {
        layout: [
            /*{
                nestId: 'initiative',
                id: 'initiative',
                name: coreModule.api.Utils.i18n('abfalter.initiative'),
                groups:[
                    {...groups.initiative, nestId: 'initiative_initiative'},
                    {...groups.DEV, nestId: 'initiative_dev'}
                ]
            },
            {
                nestId: 'attack',
                id: 'attack',
                name: coreModule.api.Utils.i18n('abfalter.attack'),
                groups: [
                    { ...groups.attack, nestId: 'attack_attack' }
                ]
            },
            {
                nestId: 'strikes',
                id: 'strikes',
                name: 'strikes',//coreModule.api.Utils.i18n('PF2E.StrikesLabel'),
                groups: [
                    { ...groups.toggles, nestId: 'strikes_toggles' },
                    { ...groups.strikes, nestId: 'strikes_strikes' }
                ],
                settings: { customWidth: 500 }
            },
            {
                nestId: 'inventory',
                id: 'inventory',
                name: coreModule.api.Utils.i18n('abfalter.inventory'),
                groups: [
                    { ...groups.weapons, nestId: 'inventory_weapons' },
                    { ...groups.shields, nestId: 'inventory_shields' },
                    { ...groups.armor, nestId: 'inventory_armor' },
                    { ...groups.equipment, nestId: 'inventory_equipment' },
                    //{ ...groups.consumables, nestId: 'inventory_consumables' },
                    //{ ...groups.containers, nestId: 'inventory_containers' },
                    //{ ...groups.treasure, nestId: 'inventory_treasure' }
                ]
            },
            {
                nestId: 'spells',
                id: 'spells',
                name: coreModule.api.Utils.i18n('PF2E.Item.Spell.Plural'),
                groups: [
                    { ...groups.spells, nestId: 'spells_spells' }
                ]
            },
            {
                nestId: 'attributes',
                id: 'attributes',
                name: coreModule.api.Utils.i18n('tokenActionHud.pf2e.attributes'),
                groups: [
                    { ...groups.heroPoints, nestId: 'attributes_hero-points' },
                    { ...groups.mythicPoints, nestId: 'attributes_mythic-points' },
                    { ...groups.initiative, nestId: 'attributes_initiative' },
                    { ...groups.perceptionCheck, nestId: 'attributes_perception-check' },
                    { ...groups.saves, nestId: 'attributes_saves' }
                ]
            },
            {
                nestId: 'abilities',
                id: 'abilities',
                name: coreModule.api.Utils.i18n('tokenActionHud.abfalter.ability.full'),
                groups: [
                    { ...groups.favAbilities, nestId: 'abilities_fav' },
                    { ...groups.athAbilities, nestId: 'abilities_ath' },
                    { ...groups.creaAbilities, nestId: 'abilities_crea' },
                    { ...groups.intAbilities, nestId: 'abilities_int' },
                    { ...groups.subAbilities, nestId: 'abilities_sub' },
                    { ...groups.socAbilities, nestId: 'abilities_soc' },
                    { ...groups.vigAbilities, nestId: 'abilities_vig' },
                    { ...groups.custAbilities, nestId: 'abilities_cust' },
                ]
            },
            {
                nestId: 'effects',
                id: 'effects',
                name: coreModule.api.Utils.i18n('abfalter.effects'),
                groups: [
                    { ...groups.conditions, nestId: 'effects_conditions' },
                    { ...groups.socialConditions, nestId: 'effects_social-conditions' },
                    { ...groups.otherConditions, nestId: 'effects_other-conditions' },
                    { ...groups.effects, nestId: 'effects_effects' }
                ]
            },*/
            {
                nestId: 'utility',
                id: 'utility',
                name: coreModule.api.Utils.i18n('tokenActionHud.utility'),
                groups: [
                    //{ ...groups.combat, nestId: 'utility_combat' },
                    { ...groups.token, nestId: 'utility_token' }//,
                    //{ ...groups.recoveryCheck, nestId: 'utility_recovery-check' },
                    //{ ...groups.rests, nestId: 'utility_rests' },
                    //{ ...groups.utility, nestId: 'utility_utility' }
                ]
            }
        ],
        groups: groupsArray
    }
})