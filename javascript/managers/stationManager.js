// stationManager.js

import { getState, setState, saveStateToLocalStorage } from '../app/gameState.js';
import { possibleModules } from '../resources/stationModulesData.js';

export function createStationLayoutGrid(gridElement, gridSize) {
    gridElement.innerHTML = '';
  
    for (let y = -Math.floor(gridSize / 2); y <= Math.floor(gridSize / 2); y++) {
        for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
            const square = document.createElement('div');
            square.classList.add('inventory-square');
            square.id = `square-${x}-${y}`;
            gridElement.appendChild(square);
        }
    }
}

export function placeModulesInGrid(gridElement, modules, selectFields = {}) {
    const defaultIcon = getState('defaultIcon');

    modules.forEach((module, index) => {
        const { x, y } = module.location;
        const square = gridElement.querySelector(`#square-${x}-${y}`);

        if (square) {
            square.innerHTML = `<i data-lucide="${module.iconType || defaultIcon}" class="icon ${module.iconColor}"></i>`;
        
            const fields = selectFields[index] || {};
            // const fields = selectFields ? selectFields(module, index): {};

            let tooltipContent = '';
            for (const [key, value] of Object.entries(fields)) {
                tooltipContent += `<p><strong>${key}:</strong> ${value}</p>`;
            }

            square.setAttribute('data-tippy-content', tooltipContent);
            tippy(square, {
                allowHTML: true,
                placement: 'top',
                animation: 'scale'
            });

        } else {
            console.error(`Grid square with ID square-${x}-${y} not found within the specified gridElement.`);
        }
    });

    lucide.createIcons();
}

  

export function addNewModule(moduleName, location) {
  const stationModules = getState('stationModules');
  const moduleTemplate = possibleModules.find(module => module.name === moduleName);

  if (moduleTemplate) {
    const newModule = {
      ...moduleTemplate,
      id: stationModules.length + 1, // ID based on the length of stationModules at this point
      location: location || { row: 0, col: 0 } // Specify a location or use default (0, 0)
    };

    stationModules.push(newModule);
    setState('stationModules', stationModules);
    saveStateToLocalStorage(); // Save the updated state with the new module
  } else {
    console.error(`Module with name ${moduleName} not found in possibleModules.`);
  }
}

export function renderModule(module) {
    const { x, y } = module.location;
    const stationModulesLimit = getState('stationModulesLimit');
    let gridSize = Math.sqrt(stationModulesLimit);

    // Assuming x, y maps directly to grid rows and columns:
    const gridRow = Math.floor(gridSize / 2) + y; // Add offset to find center
    const gridCol = Math.floor(gridSize / 2) + x; // Same here
    
    const gridSquare = document.querySelector(`.grid-square[data-row="${gridRow}"][data-col="${gridCol}"]`);
    if (gridSquare) {
      gridSquare.innerHTML = `<div class="module">${module.name}</div>`;
    }
}