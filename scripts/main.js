export let AnimaActionHandler = null
export let AnimaRollHandler = null
export let AnimaSystemManager = null
export let DEFAULTS = null
export const ACTION_TYPE = [
    'characteristicRoll',
    'secondaryRoll',
    'potentialRoll',
    'summoningRoll',
    'combatRoll',
    'weaponCombatRoll',
    'resRoll',
    'breakageRoll'
]
export const ACTION_TYPE_ID = [
    'ability',
    'rollinit',
    'equip',
    'res',
]
export class EncodedValue {

    actionTypeId
    actionType
    name
    roll
    id

    constructor(actionTypeId, actionType, name, roll, id){
        this.actionTypeId = actionTypeId
        this.actionType = actionType
        this.name = name
        this.roll = roll
        this.id = id
    }

    /**
     * Turns fields into a string separated by delimiter
     * @param {string} delimiter 
     * @returns {string}
     */
    wrap(delimiter){
        return Object.values(this).join(delimiter)
    }

    /**
     * returns new EncodedValue from string
     * @param {string} encoded 
     * @param {string} delimiter 
     * @returns {EncodedValue}
     */
    static unwrap(encoded, delimiter){
        let _ = encoded.split(delimiter)
        return new EncodedValue(_[0], _[1], _[2], _[3], _[4])
    }
}
export const GROUPS = {
    combat: { id: 'combat', name: 'tokenActionHud.abfalter.tabs.combat', type: 'system' },

    initiative: { id: 'initiative', nestId: 'combat_initiative', name: 'abfalter.initiative', type: 'system' },
    combatAction: { id: 'combataction', nestId: 'combat_combataction', name: 'tokenActionHud.abfalter.tabs.combat', type: 'system' },

    //rollinit: { id: 'rollinit', nestId: 'combat_initiative_rollinit', name: 'tokenActionHud.abfalter.rinit', type: 'system-derived'},
    equipWeapon: { id: 'equip', nestId: 'combat_initiative_equip', name: 'tokenActionHud.abfalter.equipw', type: 'system-derived'},
//  __________________________________________________
    abilities: { id: 'ability', name: 'tokenActionHud.abfalter.tabs.ability', type: 'system' },
    
    favAbility: { id: 'favability', nestId: 'ability_favability', name: 'tokenActionHud.abfalter.abillityGroup.fav', type: 'system' },
    athAbility: { id: 'athability', nestId: 'ability_athability', name: 'tokenActionHud.abfalter.abillityGroup.ath', type: 'system' },
    subAbility: { id: 'subability', nestId: 'ability_subability', name: 'tokenActionHud.abfalter.abillityGroup.sub', type: 'system' },
    socAbility: { id: 'socability', nestId: 'ability_socability', name: 'tokenActionHud.abfalter.abillityGroup.soc', type: 'system' },
    intAbility: { id: 'intability', nestId: 'ability_intability', name: 'tokenActionHud.abfalter.abillityGroup.int', type: 'system' },
    creaAbility: { id: 'creaability', nestId: 'ability_creaability', name: 'tokenActionHud.abfalter.abillityGroup.crea', type: 'system' },
    vigAbility: { id: 'vigability', nestId: 'ability_vigability', name: 'tokenActionHud.abfalter.abillityGroup.vig', type: 'system' },
    perAbility: { id: 'perability', nestId: 'ability_perability', name: 'tokenActionHud.abfalter.abillityGroup.per', type: 'system' },
    custAbility: { id: 'custability', nestId: 'ability_custability', name: 'tokenActionHud.abfalter.abillityGroup.cust', type: 'system' },
//  __________________________________________________
    resistances: { id:'res', name: 'abfalter.resistances', type: 'system'},

    resistanceGroup: { id:'resgroup', nestId: 'res_resgroup', name: 'abfalter.resistances', type: 'system'},
//  __________________________________________________
    ki: { id: 'ki', name: 'abfalter.ki', type: 'system' },

    kiGroup: { id: 'kigroup', nestId: 'ki_kigroup', name: 'abfalter.ki', type: 'system' },
    nemesisGroup: { id: 'nemesis', nestId: 'ki_nemesis', name: 'tokenActionHud.abfalter.nemesis', type: 'system' },

    kiAbilities: { id: 'kiabs', nestId: 'ki_kigroup_kiabs', name: 'abfalter.kiTab.kiAbilities', type: 'system' },
//  __________________________________________________
    magic: { id: 'magic', name: 'abfalter.magic', type: 'system' },
//  __________________________________________________
    psy: { id: 'psy', name: 'abfalter.psychic', type: 'system' },
//  __________________________________________________
    inventory: { id: 'inventory', name: 'abfalter.inventory', type: 'system' },
//  __________________________________________________
    effects: { id: 'effects', name: 'abfalter.effects', type: 'system' },
//  __________________________________________________
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' },
}

Hooks.on('tokenActionHudCoreApiReady', async (coreModule) => {

    /**
     * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
     */
    AnimaActionHandler = class AnimaActionHandler extends coreModule.api.ActionHandler{

        multiple 

        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */
        buildSystemActions(groupIds){
            this.multiple = this.actors.length > 1
            if(this.multiple){
                this.#BuildCombatMultiple()
                this.#BuildAbilities()
                this.#BuildRes()
            }
            else{
                this.#BuildCombat()
                this.#BuildAbilities()
                this.#BuildRes()
                this.#BuildKi()
                this.#BuildMagic()
                this.#BuildPsy()
                this.#BuildInventory()
                this.#BuildEffect()
            }

        }

        #BuildCombat(){
            let weapons = this.actor.items.filter(i => i.type === 'weapon')

            //#region equip weapons
            this.addGroup(GROUPS.equipWeapon, GROUPS.initiative)

            weapons.forEach(w => {
                let group = {
                    id: `equip${w.name}`,
                    name: w.name,
                    type: 'system-derived',
                    settings: {showTitle: false}
                }

                this.addGroup(group, GROUPS.equipWeapon)

                let label = (w.system.equipped) ?
                    game.i18n.localize('tokenActionHud.abfalter.unequip') + w.name :
                    game.i18n.localize('tokenActionHud.abfalter.equip') + w.name
                
                this.addActions([{
                    name : label,
                    id: `equip_${w.name}`,
                    encodedValue: new EncodedValue(
                        ACTION_TYPE_ID[2],
                        '',
                        w.name,
                        '',
                        w._id
                    ).wrap(this.delimiter)
                }], group)
            })
            
            //#endregion
            
            //roll init
            this.addActions([{
                name: game.i18n.localize('tokenActionHud.abfalter.rinit'),
                id: 'roll_init',
                encodedValue: new EncodedValue(
                    ACTION_TYPE_ID[1],
                    '',
                    game.i18n.localize('tokenActionHud.abfalter.rinit'),
                    '', //no value since we don't need it in actionHandler
                    ''
                ).wrap(this.delimiter)
            }], GROUPS.initiative)

            //addgroup combat

            //foreach weapon
            //->foreach attack
            //-> add group attack
            //->add group defense

            //this.addGroup(initG, combatG)
            //this.addGroup(combat2G, combatG)
        }

        #BuildCombatMultiple(){
            let rollInitAction = [{
                name: game.i18n.localize('tokenActionHud.abfalter.rinit'),
                id: 'roll_init',
                encodedValue: new EncodedValue(
                    ACTION_TYPE_ID[1],
                    '',
                    game.i18n.localize('tokenActionHud.abfalter.rinit'),
                    '', //no value since we don't need it in actionHandler
                    ''
                ).wrap(this.delimiter)
            }]

            this.addActions(rollInitAction, GROUPS.initiative)
        }

        #BuildAbilities(){
            let abilitiesList = []
            Object.entries(this.actors[0].system.secondaryFields).filter(s => s[0] !=='category').forEach(s => Object.entries(s[1]).forEach(a => abilitiesList.push(a[1])))
            //might have to separate abilities from item secondary, depending on how the rollHandler fares
            let abilities = {
                fav: [],
                ath: [],
                int: [],
                crea: [],
                sub: [],
                soc: [],
                vig: [],
                per: [],
                cust: []
            }
            let strPath = 'tokenActionHud.abfalter.abillityGroup.'

            //add custom abilities
            this.actors[0].items.filter(i => i.type === 'secondary').forEach(i => {
                let data = {
                    /*armorPen: false,
                    base: i.system.base,
                    bonus: 0,
                    classBonus: 0,*/
                    fav: i.system.fav,
                    final: i.system.base + Math.min(100, this.getStatMod(i.system.atr) * i.system.nat + i.system.natural) + i.system.temp + i.system.spec + i.system.extra,
                    label: i.name,/*
                    modValue: this.getStatMod(i.system.atr),
                    modifier: i.system.atr,
                    nat: i.system.nat,
                    natTotal: Math.min(100, this.getStatMod(i.system.atr) * i.system.nat + i.system.natural),
                    natural: i.system.natural,
                    parentField: false,
                    spec: i.system.spec,
                    status: false,
                    temp: 0,*/
                    type: "custom"
                }
                abilitiesList.push(data)
            })

            //prepare actions
            abilitiesList.forEach(ab => {

                //abilities needing to be unlocked
                if(!this.multiple){ //multiple actor selected bypasses this restriction
                    if(ab.label ==='kiDetection' && !this.actor.system.kiAbility.kiDetection.status)
                        return
    
                    if(ab.label ==='kiConceal' && !this.actor.system.kiAbility.kiConceal.status)
                        return
                }

                let name = ab.type === 'custom' ? ab.label : game.i18n.localize(`abfalter.${ab.label}`)
                let custLabel = ab.type === 'custom' ? ab.label.replaceAll(' ', '').toLowerCase() : ab.label

                let data = {
                    name: name,
                    id: `ability_${custLabel}`,
                    encodedValue: new EncodedValue (ACTION_TYPE_ID[0], ACTION_TYPE[1], custLabel, ab.final, '').wrap(this.delimiter)
                }

                switch(ab.label){
                    case 'acrobatic':
                    case 'athleticism':
                    case 'climb':
                    case 'jump':
                    case 'piloting':
                    case 'ride':
                    case 'swim':
                        abilities.ath.push(data)
                        break;
                    
                    case 'alchemy':
                    case 'animism':
                    case 'art':
                    case 'cooking':
                    case 'dance':
                    case 'forging':
                    case 'jewelry':
                    case 'music':
                    case 'ritualcalig':
                    case 'runes':
                    case 'slofhand':
                    case 'tailoring':
                    case 'toymaking':
                        abilities.crea.push(data)
                        break;

                    case 'animals':
                    case 'appraisal':
                    case 'architecture':
                    case 'herballore':
                    case 'history':
                    case 'law':
                    case 'magicAppr':
                    case 'medicine':
                    case 'memorize':
                    case 'navigation':
                    case 'occult':
                    case 'science':
                    case 'tactics':
                    case 'technomagic':
                        abilities.int.push(data)
                        break;
                    
                    case 'kiDetection':
                    case 'notice':
                    case 'search':
                    case 'track':
                        abilities.per.push(data)
                        break;

                    case 'etiquette':
                    case 'intimidate':
                    case 'leadership':
                    case 'persuasion':
                    case 'streetwise':
                    case 'style':
                    case 'trading':
                        abilities.soc.push(data)
                        break;

                    case 'disguise':
                    case 'hide':
                    case 'kiConceal':
                    case 'lockpicking':
                    case 'poisons':
                    case 'stealth':
                    case 'theft':
                    case 'traplore':
                        abilities.sub.push(data)
                        break;

                    case 'composure':
                    case 'featsofstr':
                    case 'withstpain':
                        abilities.vig.push(data)
                        break;

                    default:
                        abilities.cust.push(data)
                }

                if(ab.fav)
                    abilities.fav.push(data)
            })

            let parentGroup = GROUPS.abilities
            Object.values(abilities).forEach((_, i) => {
                let abID = `${Object.keys(abilities)[i]}${parentGroup.id}` //TODO add switch to short names is setting set
                let currentGroup = Object.values(GROUPS).find(i => i.id === abID)

                this.addGroup(currentGroup, parentGroup, true)

                this.addActions(_, currentGroup)
            })
        }

        /**
         * Get the mod value associated to parameter
         * @param {*} name 
         * @returns {number} mod value
         */
        getStatMod(name){
            switch (name.toUpperCase()) {
                case coreModule.api.Utils.i18n('abfalter.agi'):
                    return this.actor.system.stats.Agility.mod
                
                case coreModule.api.Utils.i18n('abfalter.con'):
                    return this.actor.system.stats.Agility.Constitution
                    
                case coreModule.api.Utils.i18n('abfalter.str'):
                    return this.actor.system.stats.Agility.Strength
                
                case coreModule.api.Utils.i18n('abfalter.dex'):
                    return this.actor.system.stats.Agility.Dexterity
                    
                case coreModule.api.Utils.i18n('abfalter.int'):
                    return this.actor.system.stats.Agility.Intelligence
                
                case coreModule.api.Utils.i18n('abfalter.per'):
                    return this.actor.system.stats.Agility.Perception

                case coreModule.api.Utils.i18n('abfalter.pow'):
                    return this.actor.system.stats.Agility.Power

                case coreModule.api.Utils.i18n('abfalter.wp'):
                    return this.actor.system.stats.Agility.Willpower
            
                default:
                    return 0
            }
        }

        #BuildRes(){
            let actorRes = this.actors[0].system.resistances

            let res = [actorRes.Physical, actorRes.Disease, actorRes.Poison, actorRes.Magic, actorRes.Psychic]

            this.addGroup(GROUPS.resistanceGroup, GROUPS.resistances)

            res.forEach(r => {
                this.addActions([{
                    id: `${GROUPS.resistances.id}_${r.name}`,
                    name: r.name,
                    encodedValue: new EncodedValue (
                        ACTION_TYPE_ID[3],
                        ACTION_TYPE[6],
                        r.name,
                        r.final,
                        '').wrap(this.delimiter)
                }], GROUPS.resistanceGroup)
            })
        }

        #BuildKi(){
            if(this.multiple) return;
            if(this.actor.system.toggles.kiTab)
                return;

            this.addGroup(GROUPS.kiGroup, GROUPS.ki)

        }

        #BuildMagic(){
            if(this.multiple) return;
            if(this.actor.system.toggles.magiciTab) return;
        }

        #BuildPsy(){
            if(this.multiple) return;
            if(this.actor.system.toggles.psychicTab) return;
        }

        #BuildInventory(){
            if(this.multiple) return;
        }

        #BuildEffect(){
            if(this.multiple) return;
        }
    }

    /**
     * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
     */
    AnimaRollHandler = class AnimaRollHandler extends coreModule.api.RollHandler{
        /**
         * Handle action event
         * Called by Token Action HUD Core when an action event is triggered
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value, array elements delimited by a pipe.
         */
        async handleActionClick (event, encodedValue){
            let tokens = canvas.tokens.controlled.filter(t => t.actor?.type === 'character')

            tokens.forEach(async t => {
                await this.#handleAction(event, t.actor, t, encodedValue)
            })
        }

        async #handleAction(event, actor, token, encodedValue){
            let value = EncodedValue.unwrap(encodedValue, '|')
            //I don't know enough about JS ¯\_(ツ)_/¯
            let juryriggedEvent = {
                preventDefault() {},
                defaultPrevented: true,
                currentTarget : {
                    dataset: {
                        label: value.name,
                        roll: value.roll,
                        type: value.actionType
                    }
                }
            }
            
            switch(value.actionTypeId){

                case ACTION_TYPE_ID[0]: //ability
                case ACTION_TYPE_ID[3]: //res
                    actor.sheet._onRoll(juryriggedEvent)
                    break;

                case ACTION_TYPE_ID[1]: //inititative
                    let t
                    //add to combat if it isn't yet
                    if(!token.inCombat)
                        t = await game.combat.createEmbeddedDocuments("Combatant", [{tokenId: token.id}])
                    else
                        t = game.combat.getCombatantsByToken(token)

                    for (let i of Array.from(t))
                        i.actor.rollInitiative()

                    break;

                case ACTION_TYPE_ID[2]: //equip
                    let item = actor.items.get(value.id)
                    item.system.equipped = !item.system.equipped;
                    item.update({ "system.equipped": item.system.equipped });
                    break;
            }
        }
    }

    /**
     * Extends Token Action HUD Core's SystemManager class
     */
    AnimaSystemManager = class AnimaSystemManager extends coreModule.api.SystemManager{
        /**
         * Returns an instance of the ActionHandler to Token Action HUD Core
         * Called by Token Action HUD Core
         * @override
         * @returns {ActionHandler} The ActionHandler instance
         */
        getActionHandler () {
            return new AnimaActionHandler()
        }

        /**
         * Returns a list of roll handlers to Token Action HUD Core
         * Used to populate the Roll Handler module setting choices
         * Called by Token Action HUD Core
         * @override
         * @returns {object} The available roll handlers
         */
        getAvailableRollHandlers () {
            const coreTitle = 'Core abfalter'
            const choices = { core: coreTitle }
            return choices
        }

        /**
         * Returns an instance of the RollHandler to Token Action HUD Core
         * Called by Token Action HUD Core
         * @override
         * @param {string} rollHandlerId The roll handler ID
         * @returns {rollHandler}        The RollHandler instance
         */
        getRollHandler (rollHandlerId) {
            return new AnimaRollHandler()
        }

        registerSettings (onChangeFunc){
            //game.settings.register()
        }

        /**
         * Returns the default layout and groups to Token Action HUD Core
         * Called by Token Action HUD Core
         * @returns {object} The default layout and groups
         */
        async registerDefaults () {
            const groups = GROUPS
            Object.values(GROUPS).forEach(group => {
                group.name = coreModule.api.Utils.i18n(group.name)
                group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
            })
            const groupsArray = Object.values(GROUPS)
            DEFAULTS = {
                layout: [
                    {
                        ...groups.combat,
                        nestId: groups.combat.id,
                        groups: [
                            { ...groups.initiative },
                            { ...groups.combatAction }
                        ]
                    },
                    {
                        ...groups.abilities,
                        nestId: groups.abilities.id,
                        groups: [
                            { ...groups.favAbility },
                            { ...groups.athAbility },
                            { ...groups.intAbility },
                            { ...groups.perAbility },
                            { ...groups.socAbility },
                            { ...groups.subAbility },
                            { ...groups.creaAbility },
                            { ...groups.vigAbility },
                        ]
                    },
                    {
                        ...groups.resistances,
                        nestId: groups.resistances.id
                    },
                    {
                        ...groups.ki,
                        nestId: groups.ki.id,
                        groups: [
                            { ...groups.kiGroup },
                            { ...groups.nemesisGroup }
                        ]
                    }
                ],
                groups: groupsArray
            }
            return DEFAULTS
        }
    }

    const module = game.modules.get('tah-abfalter')
    module.api = {
        requiredCoreModuleVersion: '2.0',
        SystemManager: AnimaSystemManager
    }
    Hooks.call('tokenActionHudSystemReady', module)
})