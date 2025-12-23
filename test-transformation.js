// Test script to verify the GeoJSON transformation logic
const fs = require('fs');

// Sample GeoJSON input (same as the one loaded in the app)
const sampleInput = {
  "type": "FeatureCollection",
  "name": "DPVyU",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-60.7091509, -32.9004805, 39.89999771118164]
      },
      "properties": {
        "Tipo de construccion": "Torre",
        "Identificador de la unidad": "76",
        "_uuid": "2dc455dd-b5a8-46c3-81ab-abeb3ef1dd1e"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-60.5018932, -33.1659255, 46.0]
      },
      "properties": {
        "Tipo de construccion": "Departamento",
        "Identificador de la unidad": "40",
        "Número de Plan de Obra": "126",
        "_uuid": "d9aea429-028d-40d5-9133-912d9bde31d0"
      }
    }
  ]
};

// Transformation function (copied from script.js)
function transformGeoJSON(inputData) {
    // Asegurarse de que el objeto tiene un array de features
    if (!inputData.features || !Array.isArray(inputData.features)) {
        throw new Error("El objeto JSON no parece ser un GeoJSON válido (falta el array 'features').");
    }

    // Aplicar la transformación a cada 'feature'
    const transformedFeatures = inputData.features.map(feature => {
        const originalProps = feature.properties || {};
        const originalCoords = feature.geometry.coordinates || [];

        // 1. Mapeo y simplificación de propiedades
        const newProps = {
            "tipo": originalProps["Tipo de construccion"] || "",
            // Convertir a número el identificador
            // Asegurarse de que el identificador existe antes de convertirlo a entero
            "nombre": originalProps["Identificador de la unidad"] ? parseInt(originalProps["Identificador de la unidad"]) : 0, 
            "plan": originalProps["Número de Plan de Obra"] || ""
        };

        // 2. Simplificación de coordenadas (tomar solo Longitud y Latitud, eliminando la altitud Z)
        // Usar un array vacío si no hay coordenadas para evitar errores
        const newCoords = originalCoords.length >= 2 ? [originalCoords[0], originalCoords[1]] : [];

        return {
            "type": "Feature",
            "properties": newProps,
            "geometry": {
                "type": "Point",
                "coordinates": newCoords
            }
        };
    });
    
    // --- MODIFICACIÓN CLAVE DE LA SALIDA ---
    
    // 1. Convertir el array de features a una cadena JSON con formato
    const featuresString = JSON.stringify(transformedFeatures, null, 2);
    
    // 2. Eliminar los corchetes exteriores del array (la primera línea '[' y la última ']')
    // 3. Reemplazar saltos de línea y formatear para quitar indentación innecesaria en el inicio/fin
    let outputContent = featuresString.substring(1, featuresString.length - 1).trim();

    // 4. Asegurarse de que la coma y el salto de línea estén al inicio, si hay contenido
    if (outputContent) {
        outputContent = `,\n${outputContent}`;
    }
    // Si el array de entrada está vacío, la salida también será vacía, lo cual es correcto.
    
    // --- FIN DE LA MODIFICACIÓN ---
    
    return outputContent;
}

// Run the test
try {
    const result = transformGeoJSON(sampleInput);
    console.log("Transformation successful!");
    console.log("Output:");
    console.log(result);
    
    // Verify the output has the expected format
    const expectedLines = [
        ',',
        '{',
        '"type": "Feature",',
        '"properties": {',
        '"tipo": "Torre",',
        '"nombre": 76,',
        '"plan": ""',
        '},',
        '"geometry": {',
        '"type": "Point",',
        '"coordinates": [',
        '-60.7091509,',
        '-32.9004805',
        ']',
        '}',
        '},',
        '{',
        '"type": "Feature",',
        '"properties": {',
        '"tipo": "Departamento",',
        '"nombre": 40,',
        '"plan": "126"',
        '},',
        '"geometry": {',
        '"type": "Point",',
        '"coordinates": [',
        '-60.5018932,',
        '-33.1659255',
        ']',
        '}',
        '}'
    ];
    
    const resultLines = result.split('\n').map(line => line.trim());
    
    console.log("\nVerification:");
    let allMatch = true;
    for (let i = 0; i < Math.min(expectedLines.length, resultLines.length); i++) {
        if (expectedLines[i] !== resultLines[i]) {
            console.log(`Line ${i+1} mismatch:`);
            console.log(`  Expected: ${expectedLines[i]}`);
            console.log(`  Got:      ${resultLines[i]}`);
            allMatch = false;
        }
    }
    
    if (allMatch && expectedLines.length === resultLines.length) {
        console.log("All lines match! Transformation logic is correct.");
    } else {
        console.log("Some lines don't match or length is different.");
    }
    
} catch (error) {
    console.error("Error during transformation:", error.message);
}