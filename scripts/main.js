export let AnimaActionHandler = null
export let AnimaRollHandler = null
export let AnimaSystemManager = null
export let DEFAULTS = null

Hooks.on('tokenActionHudCoreApiReady', async (coreModule) => {

    /**
     * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
     */
    AnimaActionHandler = class AnimaActionHandler extends coreModule.api.ActionHandler{


        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */a
        buildSystemActions(groupIds){
            this.#BuildCombat()
            this.#BuildAbilities()
            this.#BuildKi()
            this.#BuildMagic()
            this.#BuildPsy()
            this.#BuildInventory()
            this.#BuildEffect()
        }

        #BuildCombat(){

        }

        #BuildAbilities(){
            let abilitiesList = []
            Object.entries(this.actor.system.secondaryFields).filter(s => s[0] !=='category').forEach(s => Object.entries(s[1]).forEach(a => abilitiesList.push(a[1])))
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
            let strPath = 'tokenActionHud.abfalter.categories.'

            //add custom abilities
            this.actor.items.filter(i => i.type === 'secondary').forEach(i => {
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
                abilities.cust.push(data)
                abilitiesList.push(data)
            })

            //prepare actions
            abilitiesList.forEach(ab => {
                let name = ab.type === 'custom' ? ab.label : game.i18n.localize(`abfalter.${ab.label}`)
                let custLabel = ab.type === 'custom' ? ab.label.replaceAll(' ', '').toLowerCase() : ab.label

                let data = {
                    name: name,
                    id: `ability_${custLabel}`,
                    encodedValue: [
                        'ability',
                        custLabel,
                        ab.final,
                        'secondaryRoll'
                    ].join(this.delimiter)
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
                }

                if(ab.fav)
                    abilities.fav.push(data)
            })

            Object.values(abilities).forEach((_, i) => {
                let aName = `${Object.keys(abilities)[i]}` //TODO add switch to short names is setting set
                this.addGroup({id:`${Object.keys(abilities)[i]}abilities`, name:game.i18n.localize(`${strPath}${aName}`), type:'system'}, {id:'abilities', type: 'system'})
                this.addActions(_, {id:`${Object.keys(abilities)[i]}abilities`, type:'system'})
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

        #BuildKi(){

        }

        #BuildMagic(){

        }

        #BuildPsy(){

        }

        #BuildInventory(){

        }

        #BuildEffect(){

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
         * @param {string} encodedValue The encoded value
         */
        async handleActionClick (event, encodedValue){

            let split = encodedValue.split('|')

            let tokens = canvas.tokens.controlled.filter(t => t.actor?.type === 'character')

            tokens.forEach(async t => {
                await this.#handleAction(event, t.actor, split[0], split[1], split[2], split[3])
            })
        }

        async #handleAction(event, actor, actionTypeId, label, rollValue, actionType){

            //I don't know enough about JS ¯\_(ツ)_/¯
            let juryriggedEvent = {
                preventDefault() {},
                defaultPrevented: true,
                currentTarget : {
                    dataset: {
                        label: label,
                        roll: rollValue,
                        type: actionType
                    }
                }
            }
            
            switch(actionTypeId){
                case 'ability':
                    actor.sheet._onRoll(juryriggedEvent)
                    break
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

        /**
         * Returns the default layout and groups to Token Action HUD Core
         * Called by Token Action HUD Core
         * @returns {object} The default layout and groups
         */
        async registerDefaults () {
            const GROUP = {
                combat: { id: 'combat', name: 'tokenActionHud.abfalter.groups.combat', type: 'system' },
                abilities: { id: 'abilities', name: 'tokenActionHud.abfalter.groups.ability', type: 'system' },
                ki: { id: 'ki', name: 'abfalter.ki', type: 'system' },
                magic: { id: 'magic', name: 'abfalter.magic', type: 'system' },
                psy: { id: 'psy', name: 'abfalter.psychic', type: 'system' },
                inventory: { id: 'inventory', name: 'abfalter.inventory', type: 'system' },
                effects: { id: 'effects', name: 'abfalter.effects', type: 'system' },
                utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' },
                
                favAbilities: { id: 'favabilities', name: 'tokenActionHud.abfalter.groups.fav', type: 'system' },
                athAbilities: { id: 'athabilities', name: 'tokenActionHud.abfalter.groups.ath', type: 'system' },
                subAbilities: { id: 'subabilities', name: 'tokenActionHud.abfalter.groups.sub', type: 'system' },
                socAbilities: { id: 'socabilities', name: 'tokenActionHud.abfalter.groups.soc', type: 'system' },
                intAbilities: { id: 'intabilities', name: 'tokenActionHud.abfalter.groups.int', type: 'system' },
                creaAbilities: { id: 'creaabilities', name: 'tokenActionHud.abfalter.groups.crea', type: 'system' },
                vigAbilities: { id: 'vigabilities', name: 'tokenActionHud.abfalter.groups.vig', type: 'system' },
                perAbilities: { id: 'perabilities', name: 'tokenActionHud.abfalter.groups.per', type: 'system' },
                custAbilities: { id: 'custabilities', name: 'tokenActionHud.abfalter.groups.cust', type: 'system' },
            }

            const groups = GROUP
            Object.values(groups).forEach(group => {
                group.name = coreModule.api.Utils.i18n(group.name)
                group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
            })
            const groupsArray = Object.values(groups)
            DEFAULTS = {
                layout: [
                    {
                        nestId: 'abilities',
                        id: 'abilities',
                        name: coreModule.api.Utils.i18n('tokenActionHud.abfalter.groups.ability'),
                        groups: [
                            { ...groups.favAbilities, nestId: 'abilities_fav' },
                            { ...groups.athAbilities, nestId: 'abilities_ath' },
                            { ...groups.intAbilities, nestId: 'abilities_int' },
                            { ...groups.perAbilities, nestId: 'abilities_per' },
                            { ...groups.socAbilities, nestId: 'abilities_soc' },
                            { ...groups.subAbilities, nestId: 'abilities_sub' },
                            { ...groups.creaAbilities, nestId: 'abilities_crea' },
                            { ...groups.vigAbilities, nestId: 'abilities_vig' },
                            { ...groups.custAbilities, nestId: 'abilities_cust' },
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