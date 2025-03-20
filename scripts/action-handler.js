// System Module Imports
import { ACTION_TYPE, ITEM_TYPE } from './constants.js'
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
     */
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {

        // Initialize actor and token variables
        actors = null
        actorId = null
        actorType = null
        tokenId = null

        // Initialize items variable
        items = null

        //Initialize abilities variables
        regAbilities = []
        athAbilities = []
        creaAbilities = []
        intAbilities = []
        perAbilities = []
        socAbilities = []
        subAbilities = []
        vigAbilities = []
        custAbilities = []
        favAbilities = []

        // Initialize groupIds variables
        groupIds = null
        activationGroupIds = null
        effectGroupIds = null
        inventoryGroupIds = null
        spellGroupIds = null

        // Initialize action variables
        featureActions = null
        inventoryActions = null
        spellActions = null


        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */
        async buildSystemActions (groupIds) {
            console.log("Starting building system actions")
            // Set actor and token variables
            this.actors = (!this.actor) ? this.#getActors() : [this.actor]
            this.actorType = this.actor?.type

            // Exit if actor is not a known type
            const knownActors = ['character']
            if (this.actorType && !knownActors.includes(this.actorType)) return

            // Set items variable
            if (this.actor) {
                /*let items = this.actor.items
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items*/
            }

            // Set abilities variables
            if (this.actor) {
                let abs = this.actor.system.secondary

                let temp = abs.acrobatics;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.alchemy;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.animals;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.animism;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.appraisal;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.architecture;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.art;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.athleticism;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.climb;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.composure;
                this.regAbilities.push(temp)
                this.vigAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.cooking;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.dance;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.disguise;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.etiquette;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.featsofstr;
                this.regAbilities.push(temp)
                this.vigAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.forging;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.herballore;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.hide;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.history;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.intimidate;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.jewelry;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.jump;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.kiconceal;
                if(!temp){
                    this.regAbilities.push(temp)
                    this.subAbilities.push(temp)
                    if(temp.fav)
                        this.favAbilities.push(temp)
                }
                
                temp = abs.kidetection;
                if(!temp){
                    this.regAbilities.push(temp)
                    this.perAbilities.push(temp)
                    if(temp.fav)
                        this.favAbilities.push(temp)
                }
                
                temp = abs.law;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.leadership;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.lockpicking;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.magicappr;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.medicine;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.memorize;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.music;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.navigation;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.notice;
                this.regAbilities.push(temp)
                this.perAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.occult;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.persuasion;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.piloting;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.poisons;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.ride;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.ritualcalig;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.runes;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.science;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.search;
                this.regAbilities.push(temp)
                this.perAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.slofhand;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.stealth;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.streetwise;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.style;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.swin;
                this.regAbilities.push(temp)
                this.athAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.tactics;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.tailoring;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.technomagic;
                this.regAbilities.push(temp)
                this.intAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.theft;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.toymaking;
                this.regAbilities.push(temp)
                this.creaAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)

                temp = abs.track;
                this.regAbilities.push(temp)
                this.perAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.trading;
                this.regAbilities.push(temp)
                this.socAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.traplore;
                this.regAbilities.push(temp)
                this.subAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                temp = abs.withstpain;
                this.regAbilities.push(temp)
                this.vigAbilities.push(temp)
                if(temp.fav)
                    this.favAbilities.push(temp)
                
                this.actor.items.values().toArray().forEach(element => {
                    this.custAbilities.push(element)
                    this.regAbilities.push(element)
                });
            }
            
            // Settings
            this.displayUnequipped = Utils.getSetting('displayUnequipped')

            if (this.actorType === 'character') {
                this.#buildCharacterActions()
            } else if (!this.actor) {
                this.#buildMultipleTokenActions()
            }
        }

        /**
         * Build character actions
         * @private
         */
        async #buildCharacterActions () {
            
            console.log("Starting building character actions")
            await Promise.all([
                //this.#buildInventory(),
                this.#buildAbilities()
            ])
        }

        /**
         * Build multiple token actions
         * @private
         * @returns {object}
         */
        #buildMultipleTokenActions () {
        }

        /**
         * Build inventory
         * @private
         */
        async #buildInventory () {
            if (this.items.size === 0) return

            const actionTypeId = 'item'
            const inventoryMap = new Map()

            for (const [itemId, itemData] of this.items) {
                const type = itemData.type
                const equipped = itemData.equipped

                if (equipped || this.displayUnequipped) {
                    const typeMap = inventoryMap.get(type) ?? new Map()
                    typeMap.set(itemId, itemData)
                    inventoryMap.set(type, typeMap)
                }
            }

            for (const [type, typeMap] of inventoryMap) {
                const groupId = ITEM_TYPE[type]?.groupId

                if (!groupId) continue

                const groupData = { id: groupId, type: 'system' }

                // Get actions
                const actions = [...typeMap].map(([itemId, itemData]) => {
                    const id = itemId
                    const name = itemData.name
                    const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
                    const listName = `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`
                    const encodedValue = [actionTypeId, id].join(this.delimiter)

                    return {
                        id,
                        name,
                        listName,
                        encodedValue
                    }
                })

                // TAH Core method to add actions to the action list
                this.addActions(actions, groupData)
            }
        }

        /**
         * Build Secondary abilitites
         * @private
         */
        async #buildAbilities(){
            console.log("Starting building abilities actions")
            // Exit early if no abilities exist
            if (this.abilities.size === 0) return

            const actionType = 'abilities'
            const abilityMap = new Map()


            this.regAbilities.forEach(element => {
                const type = element.type
                let id = this.#hash(element)

                const itemCategoryMap = abilityMap.get(abilityType) ?? new Map()
                itemCategoryMap.set(id, element)
                abilityMap.set(abilityType, itemCategoryMap)

                if (isEquippedItem) {
                    const categoryTypeMap = abilityMap.get(type) ?? new Map()
                    categoryTypeMap.set(id, element)
                    abilityMap.set(type, categoryTypeMap)
                }
            });

            // Loop through inventory group ids
            for (const [id, items] of abilityMap) {
                const groupId = ITEM_TYPE[id]?.groupId

                if (!groupId) continue

                // Create group data
                const groupData = { id: groupId, type: 'system' }

                // Get actions
                const actions = await Promise.all(
                    [...items].map(async ([_, itemData]) => {
                        const id = this.#getActionID(itemData)
                        const name = this.#getActionName(itemData)
                        const listName = this.#getActionListName(itemData, actionType)
                        const encodedValue = [actionType, id].join(this.delimiter)

                        return {
                            id,
                            name,
                            encodedValue,
                            cssClass,
                            img,
                            icon1,
                            icon2,
                            info,
                            listName,
                            tooltip
                        }
                    })
                )

                // Add actions to action list
                this.addActions(actions, groupData)
            }
        }

        //TODO
        //add spell level part
        #getActionID(entity, actiontype, spellLevel){
            return `${entity.id ?? entity._id}`
        }

        #getActionName (entity) {
            return entity?.name ?? entity?.label ?? ''
        }

        #getActionListName (entity, actionType) {
            const name = this.#getActionName(entity)
            const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
            return entity.listName ?? `${actionTypeName}${name}`
        }

        #getActionEncodedValue (entity, actionType, spellLevel) {
            const spellcastingId = entity?.spellcasting?.id
            const encodedId = (actionType === 'spell') ? `${spellcastingId}>${spellLevel}>${entity.id ?? entity._id}` : this.#getActionID(entity, actionType, spellLevel)
            return [actionType, encodedId].join(this.delimiter)
        }
        
        /**
         * Get actors
         * @private
         * @returns {object}
         */
        #getActors () {
            const allowedTypes = ['character']
            const actors = canvas.tokens.controlled.map(token => token.actor)
            if (actors.every(actor => allowedTypes.includes(actor.type))) { return actors }
        }

        /**
         * Get item info
         * @private
         * @param {object} item
         * @returns {object}
         */
        #getItemInfo (item) {
            const quantityData = this.#getQuantityData(item) ?? ''
            return {
                info1: { text: quantityData }
            }
        }

        /**
         * Get quantity
         * @private
         * @param {object} item
         * @returns {string}
         */
        #getQuantityData (item) {
            const quantity = item?.system?.quantity?.value
            return (quantity > 1) ? quantity : ''
        }

        /**
         * Get tooltip data
         * @param {object} entity     The entity
         * @param {string} actionType The action type
         * @returns {Promise<object>} The tooltip data
         */
        async #getTooltipData (entity, actionType, spellRank = null) {
            if (this.tooltipsSetting === 'none' || !entity) return ''
            else if (this.tooltipsSetting === 'nameOnly') return entity.name ?? ''

            const itemActionTypes = ['elementalBlast', 'strike']

            let chatData

            if (itemActionTypes.includes(actionType)) {
                chatData = await entity.item.getChatData()
            } else {
                chatData = await entity.getChatData()
            }

            if (!chatData) return ''

            switch (actionType) {
            case 'item':
                return {
                    name: entity.name,
                    description: chatData.description?.value,
                    rarity: chatData.rarity,
                    traits: chatData.traits,
                    traits2: chatData.properties
                }
            case 'spell':
            {
                return {
                    name: entity.name,
                    description: chatData.description?.value,
                    properties: chatData.properties,
                    rarity: chatData.rarity,
                    traits: chatData.traits,
                    traitsAlt: chatData.spellTraits
                }
            }
            case 'strike':
                return {
                    name: entity.label,
                    descriptionLocalised: "",
                    modifiers: entity.modifiers,
                    properties: chatData.properties?.filter(property => property !== 'PF2E.WeaponTypeMartial'),
                    traits: entity.traits,
                    traitsAlt: entity.weaponTraits
                }
            default:
                return {
                    name: actionType === 'elementalBlast' ? entity.item.name : entity.name,
                    description: chatData.description?.value,
                    properties: chatData.properties,
                    rarity: chatData.rarity,
                    traits: chatData.traits
                }
            }
        }

        /**
         * Get tooltip
         * @private
         * @param {string} actionType  The action type
         * @param {object} tooltipData The tooltip data
         * @returns {Promise<string>}  The tooltip
         */
        async #getTooltip (actionType, tooltipData) {
            if (this.tooltipsSetting === 'none') return ''

            const name = coreModule.api.Utils.i18n(tooltipData.name)

            if (this.tooltipsSetting === 'nameOnly') return name

            if (typeof tooltipData === 'string') return tooltipData

            const nameHtml = `<h3>${name}</h3>`

            const description = coreModule.api.Utils.i18n(tooltipData?.description ?? tooltipData?.descriptionLocalised ?? '')

            const rarityHtml = tooltipData?.rarity
                ? `<span class="tag ${tooltipData.rarity.name}">${coreModule.api.Utils.i18n(tooltipData.rarity.label)}</span>`
                : ''

            const propertiesHtml = tooltipData?.properties
                ? `<div class="tah-properties">${tooltipData.properties.map(property => `<span class="tah-property">${coreModule.api.Utils.i18n(property)}</span>`).join('')}</div>`
                : ''

            const traitsHtml = tooltipData?.traits
                ? tooltipData.traits.map(trait => `<span class="tag">${coreModule.api.Utils.i18n(trait.label)}</span>`).join('')
                : ''

            const traits2Html = tooltipData?.traits2
                ? tooltipData.traits2.map(trait => `<span class="tag tag_secondary">${coreModule.api.Utils.i18n(trait.label ?? trait)}</span>`).join('')
                : ''

            const traitsAltHtml = tooltipData?.traitsAlt
                ? tooltipData.traitsAlt.map(trait => `<span class="tag tag_alt">${coreModule.api.Utils.i18n(trait.label)}</span>`).join('')
                : ''

            const modifiersHtml = tooltipData?.modifiers
                ? `<div class="tags">${tooltipData.modifiers.filter(modifier => modifier.enabled).map(modifier => {
                    const label = coreModule.api.Utils.i18n(modifier.label)
                    const sign = modifier.modifier >= 0 ? '+' : ''
                    const mod = `${sign}${modifier.modifier ?? ''}`
                    return `<span class="tag tag_transparent">${label} ${mod}</span>`
                }).join('')}</div>`
                : ''

            const tagsJoined = [rarityHtml, traitsHtml, traits2Html, traitsAltHtml].join('')

            const tagsHtml = (tagsJoined) ? `<div class="tags">${tagsJoined}</div>` : ''

            const headerTags = (tagsHtml || modifiersHtml) ? `<div class="tah-tags-wrapper">${tagsHtml}${modifiersHtml}</div>` : ''

            if (!description && !tagsHtml && !modifiersHtml) return name

            const tooltipHtml = `<div>${nameHtml}${headerTags}${description}${propertiesHtml}</div>`

            return await TextEditor.enrichHTML(tooltipHtml, { async: true })
        }

        /**
         * 
         * @param {object} obj 
         * @returns {string}
         */
        #hash(obj){
            let hash = 0;
            let str = JSON.stringify(obj)
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = (hash << 5) - hash + char;
            }
            // Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
            return (hash >>> 0).toString(36).padStart(7, '0');
        }
    }
})
