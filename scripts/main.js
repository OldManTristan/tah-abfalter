export let AnimaActionHandler = null
export let AnimaRollHandler = null
export let AnimaSystemManager = null
export let DEFAULTS = null
/** The sheet one */
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
/** The custom one */
export const ACTION_TYPE_ID = [
    'ability',
    'rollinit',
    'equip',
    'res',
    'atk',
    'combat',
    'item',
    'kiaccu',
    'kiaccuhalf',
    'maccu',
    'maccuhalf',
    'potential',
    'psyProj'
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
        this.id = id

        if(Array.isArray(roll))
            this.roll = roll.split(',')
        else
            this.roll = roll
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
    
    /**
     * returns new EncodedValue with a single roll value, and not an array
     * @param {number} index 
     * @returns {EncodedValue}
     */
    fromRollIndex(index){
        if(!Array.isArray(this.roll))
            return new EncodedValue(this.actionTypeId, this.actionType, this.name, this.roll, this.id)

        return new EncodedValue(this.actionTypeId, this.actionType, this.name, this.roll[index], this.id)
    }

    /**
     * returns new EncodedValue from string with a single roll value, and not an array
     * @param {string} original 
     * @param {string} delimiter 
     * @param {number} index 
     * @returns 
     */
    static fromRollIndex(original, delimiter, index){
        return EncodedValue.unwrap(original, delimiter).fromRollIndex(index)
    }
}
export class ActionData {
    name
    id
    encodedValue

    /**
     * 
     * @param {string} name 
     * @param {string} id 
     * @param {EncodedValue} encodedValue 
     */
    constructor(name, id, encodedValue){
        this.name = name
        this.id = id
        this.encodedValue = encodedValue
    }
}

export const GROUPS = {
    //#region Combat
    combat: { id: 'combat', nestId: 'combat', name: 'tokenActionHud.abfalter.tabs.combat', type: 'system' },

    initiative: { id: 'initiative', nestId: 'combat_initiative', name: 'abfalter.initiative', type: 'system' },
    combatAction: { id: 'combataction', nestId: 'combat_combataction', name: 'tokenActionHud.abfalter.tabs.combat', type: 'system' },

    //rollinit: { id: 'rollinit', nestId: 'combat_initiative_rollinit', name: 'tokenActionHud.abfalter.rinit', type: 'system-derived'},
    equipWeapon: { id: 'equip', nestId: 'combat_initiative_equip', name: 'tokenActionHud.abfalter.equipw', type: 'system-derived'},
    //#endregion

    //#region Ability
    abilities: { id: 'ability', nestId: 'ability', name: 'tokenActionHud.abfalter.tabs.ability', type: 'system' },
    
    favAbility: { id: 'favability', nestId: 'ability_favability', name: 'tokenActionHud.abfalter.abillityGroup.fav', type: 'system' },
    athAbility: { id: 'athability', nestId: 'ability_athability', name: 'tokenActionHud.abfalter.abillityGroup.ath', type: 'system' },
    subAbility: { id: 'subability', nestId: 'ability_subability', name: 'tokenActionHud.abfalter.abillityGroup.sub', type: 'system' },
    socAbility: { id: 'socability', nestId: 'ability_socability', name: 'tokenActionHud.abfalter.abillityGroup.soc', type: 'system' },
    intAbility: { id: 'intability', nestId: 'ability_intability', name: 'tokenActionHud.abfalter.abillityGroup.int', type: 'system' },
    creaAbility: { id: 'creaability', nestId: 'ability_creaability', name: 'tokenActionHud.abfalter.abillityGroup.crea', type: 'system' },
    vigAbility: { id: 'vigability', nestId: 'ability_vigability', name: 'tokenActionHud.abfalter.abillityGroup.vig', type: 'system' },
    perAbility: { id: 'perability', nestId: 'ability_perability', name: 'tokenActionHud.abfalter.abillityGroup.per', type: 'system' },
    custAbility: { id: 'custability', nestId: 'ability_custability', name: 'tokenActionHud.abfalter.abillityGroup.cust', type: 'system' },
    //#endregion

    //#region Resistances 
    resistances: { id:'res', name: 'abfalter.resistances', type: 'system'},

    resistanceGroup: { id:'resgroup', nestId: 'res_resgroup', name: 'abfalter.resistances', type: 'system'},
    //#endregion

    //#region Ki
    ki: { id: 'ki', name: 'abfalter.ki', type: 'system' },

    kiAbilities: { id: 'kiabs', nestId: 'ki_kiabs', name: 'abfalter.kiTab.kiAbilities', type: 'system' },

    nemAbilities: { id: 'nemabs', nestId: 'ki_nemabs', name: 'tokenActionHud.abfalter.nemabs', type: 'system' },

    techs : { id: 'kitech', nestId: 'ki_kitech', name: 'abfalter.kiTechnique', type: 'system'},
    //#endregion

    //#region Magic
    magic: { id: 'magic', name: 'abfalter.magic', type: 'system' },

    magicAcc: { id: 'maccu', nestId: 'magic_maccu', name: 'abfalter.maccu', type: 'system' },

    magicProj: { id: 'mproj', nestId: 'magic_mproj', name: 'abfalter.mproj', type: 'system' },
    spellBook: { id: 'spellbook', nestId: 'magic_spellbook', name: 'abfalter.spellBook', type: 'system' },

    pathLight: { id: 'pathlight', nestId: 'magic_spellbook_pathlight', name: 'tokenActionHud.abfalter.mpath.light', type: 'system' },
    pathDark: { id: 'pathdark', nestId: 'magic_spellbook_pathdark', name: 'tokenActionHud.abfalter.mpath.darkness', type: 'system' },
    pathCrea: { id: 'pathcrea', nestId: 'magic_spellbook_pathcrea', name: 'tokenActionHud.abfalter.mpath.creation', type: 'system' },
    pathDest: { id: 'pathdest', nestId: 'magic_spellbook_pathdest', name: 'tokenActionHud.abfalter.mpath.destruction', type: 'system' },
    pathAir: { id: 'pathair', nestId: 'magic_spellbook_pathair', name: 'tokenActionHud.abfalter.mpath.air', type: 'system' },
    pathWater: { id: 'pathwat', nestId: 'magic_spellbook_pathwat', name: 'tokenActionHud.abfalter.mpath.water', type: 'system' },
    pathFire: { id: 'pathfire', nestId: 'magic_spellbook_pathfire', name: 'tokenActionHud.abfalter.mpath.fire', type: 'system' },
    pathEarth: { id: 'pathearth', nestId: 'magic_spellbook_pathearth', name: 'tokenActionHud.abfalter.mpath.earth', type: 'system' },
    pathEss: { id: 'pathess', nestId: 'magic_spellbook_pathess', name: 'tokenActionHud.abfalter.mpath.essence', type: 'system' },
    pathIll: { id: 'pathill', nestId: 'magic_spellbook_pathill', name: 'tokenActionHud.abfalter.mpath.illusion', type: 'system' },
    pathNec: { id: 'pathnec', nestId: 'magic_spellbook_pathnec', name: 'tokenActionHud.abfalter.mpath.necromancy', type: 'system' },
    pathFree: { id: 'pathfree', nestId: 'magic_spellbook_pathfree', name: 'tokenActionHud.abfalter.mpath.free', type: 'system' },
    pathChaos: { id: 'pathchaos', nestId: 'magic_spellbook_pathchaos', name: 'tokenActionHud.abfalter.mpath.chaos', type: 'system' },
    pathKnow: { id: 'pathknow', nestId: 'magic_spellbook_pathknow', name: 'tokenActionHud.abfalter.mpath.knowledge', type: 'system' },
    pathWar: { id: 'pathwar', nestId: 'magic_spellbook_pathwar', name: 'tokenActionHud.abfalter.mpath.war', type: 'system' },
    pathLit: { id: 'pathlit', nestId: 'magic_spellbook_pathlit', name: 'tokenActionHud.abfalter.mpath.literature', type: 'system' },
    pathDeath: { id: 'pathdeath', nestId: 'magic_spellbook_pathdeath', name: 'tokenActionHud.abfalter.mpath.death', type: 'system' },
    pathMusic: { id: 'pathmusic', nestId: 'magic_spellbook_pathmusic', name: 'tokenActionHud.abfalter.mpath.music', type: 'system' },
    pathNob: { id: 'pathnob', nestId: 'magic_spellbook_pathnob', name: 'tokenActionHud.abfalter.mpath.nobility', type: 'system' },
    pathPeace: { id: 'pathpeace', nestId: 'magic_spellbook_pathpeace', name: 'tokenActionHud.abfalter.mpath.peace', type: 'system' },
    pathSin: { id: 'pathsin', nestId: 'magic_spellbook_pathsin', name: 'tokenActionHud.abfalter.mpath.sin', type: 'system' },
    pathBlood: { id: 'pathblood', nestId: 'magic_spellbook_pathblood', name: 'tokenActionHud.abfalter.mpath.blood', type: 'system' },
    pathUmbra: { id: 'pathumbra', nestId: 'magic_spellbook_pathumbra', name: 'tokenActionHud.abfalter.mpath.umbra', type: 'system' },
    pathDream: { id: 'pathdream', nestId: 'magic_spellbook_pathdream', name: 'tokenActionHud.abfalter.mpath.dreams', type: 'system' },
    pathTime: { id: 'pathtime', nestId: 'magic_spellbook_pathtime', name: 'tokenActionHud.abfalter.mpath.time', type: 'system' },
    pathVoid: { id: 'pathvoid', nestId: 'magic_spellbook_pathvoid', name: 'tokenActionHud.abfalter.mpath.void', type: 'system' },
    pathCust: { id: 'pathcust', nestId: 'magic_spellbook_pathcust', name: 'tokenActionHud.abfalter.mpath.custom', type: 'system' },
    //#endregion

    //#region Psy
    psy: { id: 'psy', name: 'abfalter.psychic', type: 'system' },

    psyPotential: { id: 'potential', nestId: 'psy_potential', name: 'abfalter.psychicPotential', type: 'system', settings:{showTitle : false} },
    
    psyProj: { id: 'psyproj', nestId: 'psy_psyproj', name: 'abfalter.pproj', type: 'system', settings:{showTitle : false} },
    
    matrix: { id: 'matrix', nestId: 'psy_matrix', name: 'abfalter.psychicMatrices', type: 'system' },

    //#endregion

    //#region Inventory
    inventory: { id: 'inventory', name: 'abfalter.inventory', type: 'system' },
    //#endregion

    //#region Effects
    effects: { id: 'effects', name: 'abfalter.effects', type: 'system' },
    //#endregion

    //#region Utility
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' },
    //#endregion
}

export const MODULEID = 'tah-abfalter'
export const Settings = {
    weaponImage: 'weaponImage',
    weaponBreakAction: 'weaponBreakAction',
    weaponForceUnarmed: 'weaponForceUnarmed',
    shortMagicProj: 'shortMagicProj',
    showAccuKi: 'showAccuKi',
    showKiAbility: 'showKiAbility',
    showAccuMagic: 'showAccuMagic'
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
                this.#BuildAbilitiesMultiple()
                this.#BuildResMultiple()
            }
            else{
                this.#BuildCombat()
                this.#BuildAbilities()
                this.#BuildRes()
                this.#BuildKi()
                this.#BuildMagic()
                this.#BuildPsy()
                //this.#BuildInventory()
                //this.#BuildEffect()
            }

        }

        #BuildCombat(){
            let weapons = this.actor.items.filter(i => i.type === 'weapon')

            
            this.addGroup(GROUPS.equipWeapon, GROUPS.initiative)

            weapons.forEach(w => {
                //#region equip weapons
                let groupInit = {
                    id: `equip${w.name}`,
                    name: w.name,
                    type: 'system-derived',
                    settings: {showTitle: false}
                }

                this.addGroup(groupInit, GROUPS.equipWeapon)

                let label = (w.system.equipped) ?
                    game.i18n.localize('tokenActionHud.abfalter.unequip') + w.name :
                    game.i18n.localize('tokenActionHud.abfalter.equip') + w.name
                
                this.addActions([
                    new ActionData (label, `equip_${w.name}`, new EncodedValue(
                        ACTION_TYPE_ID[2],
                        '',
                        w.name,
                        '',
                        w._id
                    ).wrap(this.delimiter))
                ], groupInit)
            
                //#endregion

                //#region combat weapon
                let groupCombat = {
                    id: `combat${w.name}`,
                    name: w.name,
                    type: 'system-derived',
                    settings: {/*showTitle: false*/}
                }

                //TODO
                //setting show image

                if(game.settings.get(MODULEID, Settings.weaponImage))
                    groupCombat.settings.image = w.img

                this.addGroup(groupCombat, GROUPS.combatAction)

                let wActions = this.#BuildWeaponActions(w)

                this.addActions(wActions.actions, groupCombat)


                // setting show break
                if(game.settings.get(MODULEID, Settings.weaponBreakAction))
                    this.addActions((wActions.break || []), groupCombat)
                //#endregion
            })

            //add unarmed weapon, just in case
            if(this.#isUnnarmed(weapons)  || game.settings.get(MODULEID, Settings.weaponForceUnarmed)){
                this.addActions(this.#BuildWeaponActions(null).actions, GROUPS.combatAction)
            }
            
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
        }

        #BuildCombatMultiple(){
            
            if(this.#isUnnarmed()){
                this.addActions(this.#BuildWeaponActions(null).actions, GROUPS.combatAction)
            }

            
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
        }

        /**
         * Returns wether or not this actor is unarmed
         * @param {any[]} weapons 
         * @returns {boolean} true if unarmed, false otherwise
         */
        #isUnnarmed(weapons = []){
            if(weapons.length < 1)
                return true

            let equipped
            weapons.forEach(w => equipped = equipped || w.system.equipped)

            return !equipped
        }

        /**
         * Returns an object with 2 arrays:
         * 
         * -actions : atk, block & dodge
         * 
         * -break : break (separated because optionnal)
         * @param {*} w set null for unarmed
         * @returns 
         */
        #BuildWeaponActions(w){
            let _return = {
                actions: [],
                break: []
            }
            let label = (!!w ? w.name : 'unarmed')
            let id = !!w ? w._id : ''

            let atkValues = []
            let blockValues = []
            let dodgeValues = []
            this.actors.forEach(a => {
                atkValues.push(a.system.combatValues.attack.final)
                blockValues.push(a.system.combatValues.block.final)
                dodgeValues.push(a.system.combatValues.dodge.final)
            })


            let actionAtk = new ActionData(
                game.i18n.localize('abfalter.attack'),
                `atk${label}`,
                new EncodedValue(
                    ACTION_TYPE_ID[(w ? 4 : 5)],
                    ACTION_TYPE[(w ? 5 : 4)],
                    (w ? w.name : 'attack'),
                    (w ? '' : atkValues.toString()),
                    id
                ).wrap(this.delimiter))
            

            let actionBlock = new ActionData(
                game.i18n.localize('abfalter.block'),
                `block${label}`,
                new EncodedValue(
                    ACTION_TYPE_ID[5],
                    ACTION_TYPE[(!!w ? 6 : 4)],
                    (w ? w.name : 'block'),
                    (w ? '' : blockValues.toString()),
                    id
                ).wrap(this.delimiter)
            )

            let actionDodge = new ActionData (
                game.i18n.localize('abfalter.dodge'),
                `dodge${label}`,
                new EncodedValue(
                    ACTION_TYPE_ID[5],
                    ACTION_TYPE[(!!w ? 6 : 4)],
                    (w ? w.name : 'dodge'),
                    (w ? '' : dodgeValues.toString()),
                    id
                ).wrap(this.delimiter)
            )

            _return.actions.push(actionAtk, actionBlock, actionDodge)
            
            //break
            if(w){
                let actionBreak = new ActionData (
                    game.i18n.localize('abfalter.breakageShort'),
                    `break${w.name}`,
                    new EncodedValue(
                        ACTION_TYPE_ID[4],
                        ACTION_TYPE[7],
                        w.name,
                        '',
                        w._id
                    ).wrap(this.delimiter)
                )
                _return.break.push(actionBreak)
            }

            return _return
            
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

            //add custom abilities
            this.actor.items.filter(i => i.type === 'secondary').forEach(i => {
                let data = {
                    fav: i.system.fav,
                    final: i.system.base + Math.min(100, this.getStatMod(i.system.atr) * i.system.nat + i.system.natural) + i.system.temp + i.system.spec + i.system.extra,
                    label: i.name,
                    type: "custom"
                }
                abilitiesList.push(data)
            })

            //prepare actions
            abilitiesList.forEach(ab => {

                //abilities needing to be unlocked
                if(ab.label ==='kiDetection' && !this.actor.system.kiAbility.kiDetection.status)
                    return

                if(ab.label ==='kiConceal' && !this.actor.system.kiAbility.kiConceal.status)
                    return

                let name = ab.type === 'custom' ? ab.label : game.i18n.localize(`abfalter.${ab.label}`)
                let custLabel = ab.type === 'custom' ? ab.label.replaceAll(' ', '').toLowerCase() : ab.label

                let data = new ActionData(
                    name,
                    `ability_${custLabel}`,
                    new EncodedValue (
                        ACTION_TYPE_ID[0],
                        ACTION_TYPE[1],
                        custLabel,
                        ab.final,
                        ''
                    ).wrap(this.delimiter))

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

            Object.values(abilities).forEach((_, i) => {
                let abID = `${Object.keys(abilities)[i]}${GROUPS.abilities.id}`
                let currentGroup = Object.values(GROUPS).find(i => i.id === abID)

                this.addGroup(currentGroup, GROUPS.abilities)

                this.addActions(_, currentGroup)
            })
        }

        #BuildAbilitiesMultiple(){
            let abilitiesList = []
            Object.entries(this.actors[0].system.secondaryFields)
            .filter(s => s[0] !=='category')
            .forEach(s => 
                Object.entries(s[1]).forEach(a => 
                    abilitiesList.push(a[1])))
            //might have to separate abilities from item secondary, depending on how the rollHandler fares
            let abilities = {
                ath: [],
                int: [],
                crea: [],
                sub: [],
                soc: [],
                vig: [],
                per: [],
                cust: []
            }

            //prepare actions
            abilitiesList.forEach(ab => {

                let name = ab.type === 'custom' ? ab.label : game.i18n.localize(`abfalter.${ab.label}`)
                let custLabel = ab.type === 'custom' ? ab.label.replaceAll(' ', '').toLowerCase() : ab.label

                let values = []
                //get rollvalue from each actor for this ability
                this.actors.forEach(a => {
                    Object.entries(a.system.secondaryFields).filter(s => s[0] !=='category')
                    .forEach(c => 
                        Object.entries(c[1]).forEach(a => {
                            if(a[1].label != ab.label)
                                return
                            values.push(a[1].final)
                        }))
                })

                let data = new ActionData(
                    name,
                    `ability_${custLabel}`,
                    new EncodedValue (
                        ACTION_TYPE_ID[0],
                        ACTION_TYPE[1],
                        custLabel,
                        values.toString(),
                        ''
                    ).wrap(this.delimiter))

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
            })

            let parentGroup = GROUPS.abilities
            Object.values(abilities).forEach((_, i) => {
                let abID = `${Object.keys(abilities)[i]}${parentGroup.id}`
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
                this.addActions([ new ActionData(
                    r.name,
                    `${GROUPS.resistances.id}_${r.name}`,
                    new EncodedValue (
                        ACTION_TYPE_ID[3],
                        ACTION_TYPE[6],
                        r.name,
                        r.final,
                        '').wrap(this.delimiter)
                )], GROUPS.resistanceGroup)
            })
        }

        #BuildResMultiple(){

            this.addGroup(GROUPS.resistanceGroup, GROUPS.resistances)

            let res = {
                Physical: {
                    values: [],
                    res: this.actors[0].system.resistances.Physical
                },
                Disease: {
                    values: [],
                    res: this.actors[0].system.resistances.Disease
                },
                Poison: {
                    values: [],
                    res: this.actors[0].system.resistances.Poison
                },
                Magic: {
                    values: [],
                    res: this.actors[0].system.resistances.Magic
                },
                Psychic: {
                    values: [],
                    res: this.actors[0].system.resistances.Psychic
                }
            }

            let resList = [
                this.actors[0].system.resistances.Physical,
                this.actors[0].system.resistances.Disease,
                this.actors[0].system.resistances.Poison,
                this.actors[0].system.resistances.Magic,
                this.actors[0].system.resistances.Psychic
            ]

            this.actors.forEach(a => {
                let _ = a.system.resistances

                res.Physical.values.push(_.Physical.final)
                res.Disease.values.push(_.Disease.final)
                res.Poison.values.push(_.Poison.final)
                res.Magic.values.push(_.Magic.final)
                res.Psychic.values.push(_.Psychic.final)
            })

            Object.values(res).forEach(r => {

                this.addActions([new ActionData(
                    r.res.name,
                    `${GROUPS.resistances.id}_${r.res.name}`,
                    new EncodedValue (
                        ACTION_TYPE_ID[3],
                        ACTION_TYPE[6],
                        r.res.name,
                        r.values.toString(),
                        '').wrap(this.delimiter)
                )], GROUPS.resistanceGroup)
            })
        }

        #BuildKi(){
            if(this.actor.system.toggles.kiTab)
                return;
            
            let kiAbs = []
            let nemAbs = []


            if(game.settings.get(MODULEID, Settings.showKiAbility)){

                Object.entries(this.actor.system.kiAbility).forEach(a => {
                    if(!a[1].status) return
    
                    if(a[0].includes('nemi') || a[0].includes('Nemesis'))
                        nemAbs.push(a)
                    else
                        kiAbs.push(a)
                })
    
                let actions = []
                //ki abs
                kiAbs.forEach(a => {
                    actions.push(new ActionData(
                        game.i18n.localize(`abfalter.kiTab.${a[0]}`), a[0],
                        new EncodedValue(
                            '',
                            '',
                            a[0],
                            '',
                            ''
                        ).wrap(this.delimiter)
                    ))
                })
                this.addActions(actions, GROUPS.kiAbilities)
                actions = []
                //nem abs
                nemAbs.forEach(a => {
                    actions.push(new ActionData(
                        game.i18n.localize(`abfalter.kiTab.${a[0]}`), a[0],
                        new EncodedValue(
                            '',
                            '',
                            a[0],
                            '',
                            ''
                        ).wrap(this.delimiter)
                    ))
                })
                this.addActions(actions, GROUPS.nemAbilities)
            }

            //techs
            let listTechs = this.actor.items.filter(i => i.type === 'kiTechnique')

            let actionTech = []

            listTechs.forEach(t => {
                actionTech.push(new ActionData(
                    t.name, t._id, new EncodedValue(
                        ACTION_TYPE_ID[6],
                        '',
                        t.name,
                        '',
                        t._id
                    ).wrap(this.delimiter)
                ))
            })

            this.addActions(actionTech, GROUPS.techs)

        }

        #BuildMagic(){
            if(this.actor.system.toggles.magicTab) return;

            let system = this.actor.system

            /*
            let accu = [
                new ActionData(
                    game.i18n.localize('abfalter.half'),
                    'maccuhalf',
                    new EncodedValue (
                        ACTION_TYPE_ID[10],
                        '',
                        game.i18n.localize('abfalter.half'),
                        '',
                        '').wrap(this.delimiter)
                ),
                new ActionData(
                    game.i18n.localize('abfalter.full'),
                    'maccufull',
                    new EncodedValue (
                        ACTION_TYPE_ID[9],
                        '',
                        game.i18n.localize('abfalter.full'),
                        '',
                        '').wrap(this.delimiter)
                    )
                ]
            
            //TODO setting accu
            if(game.settings.get(MODULEID, Settings.showAccuMagic))
                this.addActions(accu, GROUPS.magicAcc)

            */

            let def
            if(system.toggles.magicDefModule)
                def = system.mproj.defModule
            else if(system.toggles.magicDodgeModule)
                def = system.mproj.dodModule
            else
                def = system.mproj.finalDefensive

            let setShort = game.settings.get(MODULEID, Settings.shortMagicProj)

            let proj = [
                new ActionData(
                    game.i18n.localize(`abfalter.offensive${(setShort ? '' : '1')}`),
                    'mprojoff',
                    new EncodedValue (
                        ACTION_TYPE_ID[5],
                        ACTION_TYPE[5],
                        game.i18n.localize('abfalter.offMagicProj'),
                        system.toggles.magicAtkModule ? system.mproj.atkModule : system.mproj.finalOffensive,
                        '').wrap(this.delimiter)),
                new ActionData(
                    game.i18n.localize(`abfalter.defensive${(setShort ? '' : '1')}`),
                    'mprojdef',
                    new EncodedValue (
                        ACTION_TYPE_ID[5],
                        ACTION_TYPE[5],
                        game.i18n.localize('abfalter.defMagicProj'),
                        def,
                        '').wrap(this.delimiter))
            ]

            this.addActions(proj, GROUPS.magicProj)

            //spell book

            let spellList = []
            let paths = {
                light: [],
                darkness: [],
                creation: [],
                destruction: [],
                air: [],
                water: [],
                fire: [],
                earth: [],
                essence: [],
                illusion: [],
                necromancy: [],
                free: [],
                chaos: [],
                knowledge: [],
                war: [],
                literature: [],
                death: [],
                music: [],
                nobility: [],
                peace: [],
                blood: [],
                umbra: [],
                dreams: [],
                sin: [],
                time: [],
                _void: [],
                custom: [],
            }

            spellList = this.actor.items.filter(i => i.type === 'spell')

            if(spellList.length < 1) return

            spellList.forEach(s => {
                switch(s.system.path.toLowerCase()){
                    //spell path will be hard coded until I find a way to get a localize in a specifi language
                    case "Light".toLowerCase():
                        paths.light.push(s)
                        break;
                    
                    case "Darkness".toLowerCase():
                        paths.darkness.push(s)
                        break;
                            
                    case "Creation".toLowerCase():
                        paths.creation.push(s)
                        break;
                        
                    case "Destruction".toLowerCase():
                        paths.destruction.push(s)
                        break;
                        
                    case "Air".toLowerCase():
                        paths.air.push(s)
                        break;
                        
                    case "Water".toLowerCase():
                        paths.water.push(s)
                        break;
                        
                    case "Fire".toLowerCase():
                        paths.fire.push(s)
                        break;
                        
                    case "Earth".toLowerCase():
                        paths.earth.push(s)
                        break;
                        
                    case "Essence".toLowerCase():
                        paths.essence.push(s)
                        break;
                        
                    case "Illusion".toLowerCase():
                        paths.illusion.push(s)
                        break;
                        
                    case "Necromancy".toLowerCase():
                        paths.necromancy.push(s)
                        break;
                        
                    case "Free-Access".toLowerCase():
                        paths.free.push(s)
                        break;
                        
                    case "Chaos".toLowerCase():
                        paths.chaos.push(s)
                        break;
                        
                    case "Knowledge".toLowerCase():
                        paths.knowledge.push(s)
                        break;
                        
                    case "War".toLowerCase():
                        paths.war.push(s)
                        break;
                        
                    case "Literature".toLowerCase():
                        paths.literature.push(s)
                        break;
                        
                    case "Death".toLowerCase():
                        paths.death.push(s)
                        break;
                        
                    case "Music".toLowerCase():
                        paths.music.push(s)
                        break;
                        
                    case "Nobility".toLowerCase():
                        paths.nobility.push(s)
                        break;
                        
                    case "Peace".toLowerCase():
                        paths.peace.push(s)
                        break;
                        
                    case "Blood".toLowerCase():
                        paths.blood.push(s)
                        break;
                    
                    case "Umbra".toLowerCase():
                        paths.umbra.push(s)
                        break;
                
                    case "Dreams".toLowerCase():
                        paths.dreams.push(s)
                        break;
            
                    case "Sin".toLowerCase():
                        paths.sin.push(s)
                        break;
            
                    case "Time".toLowerCase():
                        paths.time.push(s)
                        break;
        
                    case "Void".toLowerCase():
                        paths._void.push(s)
                        break;
    
                    default:
                        paths.custom.push(s)
                        break;

                }
            })

            Object.values(paths).forEach(p => {
                p.sort(this.#sortSpellsASC)
                let spells = []
                p.forEach(s => {
                    spells.push(
                        new ActionData(
                            s.name,
                            `spell_${s._id}_${s.system.path}`,
                            new EncodedValue (
                                ACTION_TYPE_ID[6],
                                game.i18n.localize('tokenActionHUD.abfalter.mpath.' + s.system.path.toLowerCase()),
                                s.name,
                                '',
                                s._id).wrap(this.delimiter)
                            ))
                })
                if(spells.length < 1) return
                let temp = spells[0].id.split('_')[2]
                switch(temp.toLowerCase()){
                    //still hardcoded
                    case "Light".toLowerCase():
                        this.addGroup(GROUPS.pathLight, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathLight)
                        break;
                    
                    case "Darkness".toLowerCase():
                        this.addGroup(GROUPS.pathDark, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathDark)
                        break;
                            
                    case "Creation".toLowerCase():
                        this.addGroup(GROUPS.pathCrea, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathCrea)
                        break;
                        
                    case "Destruction".toLowerCase():
                        this.addGroup(GROUPS.pathDest, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathDest)
                        break;
                        
                    case "Air".toLowerCase():
                        this.addGroup(GROUPS.pathAir, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathAir)
                        break;
                        
                    case "Water".toLowerCase():
                        this.addGroup(GROUPS.pathWater, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathWater)
                        break;
                        
                    case "Fire".toLowerCase():
                        this.addGroup(GROUPS.pathFire, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathFire)
                        break;
                        
                    case "Earth".toLowerCase():
                        this.addGroup(GROUPS.pathEarth, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathEarth)
                        break;
                        
                    case "Essence".toLowerCase():
                        this.addGroup(GROUPS.pathEss, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathEss)
                        break;
                        
                    case "Illusion".toLowerCase():
                        this.addGroup(GROUPS.pathIll, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathIll)
                        break;
                        
                    case "Necromancy".toLowerCase():
                        this.addGroup(GROUPS.pathNec, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathNec)
                        break;
                        
                    case "Free-Access".toLowerCase():
                        this.addGroup(GROUPS.pathFree, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathFree)
                        break;
                        
                    case "Chaos".toLowerCase():
                        this.addGroup(GROUPS.pathChaos, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathChaos)
                        break;
                        
                    case "Knowledge".toLowerCase():
                        this.addGroup(GROUPS.pathKnow, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathKnow)
                        break;
                        
                    case "War".toLowerCase():
                        this.addGroup(GROUPS.pathWar, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathWar)
                        break;
                        
                    case "Literature".toLowerCase():
                        this.addGroup(GROUPS.pathLit, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathLit)
                        break;
                        
                    case "Death".toLowerCase():
                        this.addGroup(GROUPS.pathDeath, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathDeath)
                        break;
                        
                    case "Music".toLowerCase():
                        this.addGroup(GROUPS.pathMusic, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathMusic)
                        break;
                        
                    case "Nobility".toLowerCase():
                        this.addGroup(GROUPS.pathNob, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathNob)
                        break;
                        
                    case "Peace".toLowerCase():
                        this.addGroup(GROUPS.pathPeace, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathPeace)
                        break;
                        
                    case "Blood".toLowerCase():
                        this.addGroup(GROUPS.pathBlood, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathBlood)
                        break;
                    
                    case "Umbra".toLowerCase():
                        this.addGroup(GROUPS.pathUmbra, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathUmbra)
                        break;
                
                    case "Dreams".toLowerCase():
                        this.addGroup(GROUPS.pathDream, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathDream)
                        break;

                    case "Sin".toLowerCase():
                        this.addGroup(GROUPS.pathSin, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathSin)
                        break;
            
                    case "Time".toLowerCase():
                        this.addGroup(GROUPS.pathTime, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathTime)
                        break;
        
                    case "Void".toLowerCase():
                        this.addGroup(GROUPS.pathVoid, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathVoid)
                        break;
    
                    default:
                        this.addGroup(GROUPS.pathCust, GROUPS.spellBook)
                        this.addActions(spells, GROUPS.pathCust)
                        break;

                }
            })
        }

        /**
         * Algorithm to sort spells by ascending level
         */
        #sortSpellsASC(a, b){
            return a.system.level - b.system.level
        }

        #BuildPsy(){
            if(this.actor.system.toggles.psychicTab) return;

            //potential
            this.addActions([
                new ActionData(
                    game.i18n.localize('abfalter.ppotential'),
                    'ppot',
                    new EncodedValue(
                        ACTION_TYPE_ID[11],
                        ACTION_TYPE[2],
                        'psychicPotential',
                        this.actor.system.ppotential.final,
                        ''
                    ).wrap(this.delimiter))
            ], GROUPS.psyPotential)

            //proj
            this.addActions([
                new ActionData(
                    game.i18n.localize('abfalter.pproj'),
                    'pproj',
                    new EncodedValue(
                        ACTION_TYPE_ID[12],
                        ACTION_TYPE[4],
                        'psyProj',
                        this.actor.system.pproj.final,
                        ''
                    ).wrap(this.delimiter))
            ], GROUPS.psyProj)

            //matrices
            let listMat = this.actor.items.filter(i => i.type === 'psychicMatrix')

            listMat.sort(this.#SortMatrixASC)

            let actionMat = []

            listMat.forEach(m => {
                actionMat.push(new ActionData(
                    m.name,
                    `matrix${m._id}`,
                    new EncodedValue(
                        ACTION_TYPE_ID[6],
                        '',
                        m.name,
                        '',
                        m._id).wrap(this.delimiter)
                ))
            })

            this.addActions(actionMat, GROUPS.matrix)
        }

        /**
         * Algorithm to sort matrices by ascending level
         */
        #SortMatrixASC(a, b){
            return a.system.level - b.system.level
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

            tokens.forEach(async (t, i) => {
                await this.#handleAction(event, t.actor, t, EncodedValue.fromRollIndex(encodedValue, '|', i).wrap('|'))
            })
        }

        async #handleAction(event, actor, token, encodedValue){
            let value = EncodedValue.unwrap(encodedValue, '|')
            let eventValue
            //TODO
            // updates case values with CharacterSheet._onWeaponRoll switch values when they are implemented
            switch(value.actionType){
                case 'weaponCombatRoll':
                    eventValue = 'weaponAtk'
                    break;

                case 'breakageRoll':
                    eventValue = 'weaponBreak'
                    break;
            }

            //I don't know enough about JS ¯\_(ツ)_/¯
            let juryriggedEvent = {
                preventDefault() {},
                defaultPrevented: true,
                currentTarget : {
                    dataset: {
                        label: value.name,
                        roll: value.roll,
                        type: value.actionType,
                        value: eventValue,
                        id: value.id
                    }
                }
            }
            
            switch(value.actionTypeId){

                case ACTION_TYPE_ID[0]: //ability
                case ACTION_TYPE_ID[3]: //res
                case ACTION_TYPE_ID[11]: //potential
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

                case ACTION_TYPE_ID[4]: //atk
                    actor.sheet._onWeaponRoll(juryriggedEvent)
                    break;

                case ACTION_TYPE_ID[5]: //combat
                case ACTION_TYPE_ID[12]: //psyProj
                    actor.sheet._onAttackRoll(juryriggedEvent)
                    break;

                case ACTION_TYPE_ID[6]: //item
                    actor.items.get(value.id).roll(value.name)
                    break;

                default:
                    console.log('nothing yet for that')
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
            let settingPath = 'tokenActionHud.abfalter.settings.'

            game.settings.register(MODULEID, Settings.weaponImage, {
                name: game.i18n.localize(settingPath + 'weaponImageName'),
                hint: game.i18n.localize(settingPath + 'weaponImageHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: true,
                onChange: (value) => { onChangeFunc(value) }
            })
            game.settings.register(MODULEID, Settings.weaponBreakAction, {
                name: game.i18n.localize(settingPath + 'weaponBreakActionName'),
                hint: game.i18n.localize(settingPath + 'weaponBreakActionHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: false,
                onChange: (value) => { onChangeFunc(value) }
            })
            game.settings.register(MODULEID, Settings.weaponForceUnarmed, {
                name: game.i18n.localize(settingPath + 'weaponForceUnarmedName'),
                hint: game.i18n.localize(settingPath + 'weaponForceUnarmedHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: false,
                onChange: (value) => { onChangeFunc(value) }
            })
            game.settings.register(MODULEID, Settings.shortMagicProj, {
                name: game.i18n.localize(settingPath + 'shortMagicProjName'),
                hint: game.i18n.localize(settingPath + 'shortMagicProjHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: false,
                onChange: (value) => { onChangeFunc(value) }
            })
            game.settings.register(MODULEID, Settings.showAccuKi, {
                name: game.i18n.localize(settingPath + 'showAccuKiName'),
                hint: game.i18n.localize(settingPath + 'showAccuKiHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: false,
                onChange: (value) => { onChangeFunc(value) }
            })
            game.settings.register(MODULEID, Settings.showKiAbility, {
                name: game.i18n.localize(settingPath + 'showKiAbilityName'),
                hint: game.i18n.localize(settingPath + 'showKiAbilityHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: false,
                onChange: (value) => { onChangeFunc(value) }
            })
            game.settings.register(MODULEID, Settings.showAccuMagic, {
                name: game.i18n.localize(settingPath + 'showAccuMagicName'),
                hint: game.i18n.localize(settingPath + 'showAccuMagicHint'),
                scope: 'client',
                config: true,
                type: Boolean,
                default: false,
                onChange: (value) => { onChangeFunc(value) }
            })
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
                            { ...groups.techs },
                            { ...groups.kiAbilities },
                            { ...groups.nemAbilities }
                        ]
                    },
                    {
                        ...groups.magic,
                        nestId: groups.magic.id,
                        groups: [
                            { ...groups.magicAcc },
                            { ...groups.magicProj },
                            { ...groups.spellBook }
                        ]
                    },
                    {
                        ...groups.psy,
                        nestId: groups.psy.id,
                        groups: [
                            { ...groups.psyPotential },
                            { ...groups.psyProj },
                            { ...groups.matrix }
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