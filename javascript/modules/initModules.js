// initModules.js

import { initializeSpacejunkInventoryTemplate } from './spacejunkInventoryTemplateModule.js';
import { initializeSalvageAreaTemplate } from './salvageTemplateModule.js';
import { initializeStationInventoryTemplate } from './stationInventoryTemplateModule.js';


export function initializeModules() {
  initializeStationInventoryTemplate();
  initializeSpacejunkInventoryTemplate();
  initializeSalvageAreaTemplate();
  // initializeStationInventoryTemplate();
  // initializeCraftingTemplate();

}