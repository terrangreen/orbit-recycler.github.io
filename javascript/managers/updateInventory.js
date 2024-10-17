// updateInventory.js

import { getState } from "../app/gameState.js";
import { loadStationResources } from "../modules/stationResourcesModule.js";
import { updateSpacejunkDisplay, updateStationDisplay } from "./displayManager.js";
import { updateStaticInventoryGrid, updateDynamicInventoryGrid } from "./inventoryManager.js";
import { handleSalveToStation } from "./salvageHandler.js";
import { createStationLayoutGrid, placeModulesInGrid } from "./stationManager.js";

export function updateSpacejunkInventory() {
    const spacejunkInventoryGrid = document.getElementById('spacejunk-inventory-grid');
    const spacejunkItems =  getState('spacejunkItems');
    const rawJunkLimit =  getState('rawJunkLimit');

    updateSpacejunkDisplay();

    const selectFields = spacejunkItems.map(item => ({
        'Item': item.name,
        'Owner': item.owner,
        'Value': item.value
    }));

    updateStaticInventoryGrid(spacejunkInventoryGrid, spacejunkItems, selectFields, rawJunkLimit, true);
    loadStationResources();
}

// Update Salvage Inventory Display
export function updateSalvageInventory() {
    const salvageItems = getState('salvageItems');

    const salvageInventoryGrid = document.getElementById('salvage-inventory-grid');

    const selectFields = (part) => ({
        'Item': part.name,
        'Quantity': part.quantity,
        'Condition': part.condition || 'Unknown'  // Add more fields if needed
    });
    

    updateDynamicInventoryGrid(salvageInventoryGrid, salvageItems, selectFields, true);
    
    handleSalveToStation();
}

// Update Station Inventory Display
export function updateStationInventory() {
    const stationItems = getState('stationItems');
    
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    const stationItemsLimit = getState('stationItemsLimit');

    const selectFields = stationItems.map(item => ({
        'Item': item.name,
        'Quantity': item.quantity,
        'Condition': item.condition || ''
    }));

    updateStationDisplay();

    updateStaticInventoryGrid(stationInventoryGrid, stationItems, selectFields, stationItemsLimit, true);
    
}

export function updateStationLayout() {
    const stationModules = getState('stationModules') || [];

    const stationLayoutGrid = document.getElementById('station-layout-grid');
    const stationSize = Math.sqrt(getState('stationModulesLimit'));

    const selectFields = stationModules.map(module => ({
        'Module': module.name
    }));

    // updateStaticInventoryGrid(stationLayoutGrid, stationModules, selectFields, stationModulesLimit, true);

    // Example call:
    // updateStaticInventoryGrid(stationLayoutGrid, [], {}, stationModulesLimit, false);
    createStationLayoutGrid(stationLayoutGrid, stationSize);
    placeModulesInGrid(stationLayoutGrid, stationModules, selectFields);
}