const inputJsonElement = document.getElementById("input-json");
const outputJsonElement = document.getElementById("output-json");
const messageElement = document.getElementById("message");
const copyButton = document.getElementById("copy-button");

// Asegurarse de que el textarea permita pegar
inputJsonElement.addEventListener("paste", function (e) {
  // Permitir el evento de pegar
  e.stopPropagation();
});

/**
 * Función principal para transformar el GeoJSON.
 */
function transformGeoJSON() {
  messageElement.classList.add("hidden");
  outputJsonElement.value = "";
  copyButton.disabled = true;

  const rawInput = inputJsonElement.value.trim();
  if (!rawInput) {
    messageElement.textContent =
      "Error: Por favor, pega el GeoJSON en el área de entrada.";
    messageElement.classList.remove("hidden");
    return;
  }

  try {
    const inputData = JSON.parse(rawInput);

    // Asegurarse de que el objeto tiene un array de features
    if (!inputData.features || !Array.isArray(inputData.features)) {
      throw new Error(
        "El objeto JSON no parece ser un GeoJSON válido (falta el array 'features').",
      );
    }

    // Aplicar la transformación a cada 'feature'
    const transformedFeatures = inputData.features.map((feature) => {
      const originalProps = feature.properties || {};
      const originalCoords = feature.geometry.coordinates || [];

      // 1. Mapeo y simplificación de propiedades
      const newProps = {
        tipo: originalProps["Tipo de construccion"] || "",
        // Convertir a número el identificador
        // Asegurarse de que el identificador existe antes de convertirlo a entero
        nombre: originalProps["Identificador de la unidad"]
          ? parseInt(originalProps["Identificador de la unidad"])
          : 0,
        plan: originalProps["Número de Plan de Obra"] || "",
      };

      // 2. Simplificación de coordenadas (tomar solo Longitud y Latitud, eliminando la altitud Z)
      // Usar un array vacío si no hay coordenadas para evitar errores
      const newCoords =
        originalCoords.length >= 2
          ? [originalCoords[0], originalCoords[1]]
          : [];

      return {
        type: "Feature",
        properties: newProps,
        geometry: {
          type: "Point",
          coordinates: newCoords,
        },
      };
    });

    // --- MODIFICACIÓN CLAVE DE LA SALIDA ---

    // 1. Convertir el array de features a una cadena JSON con formato
    const featuresString = JSON.stringify(transformedFeatures, null, 2);

    // 2. Eliminar los corchetes exteriores del array (la primera línea '[' y la última ']')
    // 3. Reemplazar saltos de línea y formatear para quitar indentación innecesaria en el inicio/fin
    let outputContent = featuresString
      .substring(1, featuresString.length - 1)
      .trim();

    // 4. Asegurarse de que la coma y el salto de línea estén al inicio, si hay contenido
    if (outputContent) {
      outputContent = `,\n${outputContent}`;
    }
    // Si el array de entrada está vacío, la salida también será vacía, lo cual es correcto.

    // --- FIN DE LA MODIFICACIÓN ---

    outputJsonElement.value = outputContent;
    copyButton.disabled = false;
    copyButton.textContent = "Copiar al Portapapeles";
  } catch (error) {
    console.error("Error durante la transformación:", error);
    messageElement.textContent = `Error: No se pudo procesar el JSON. Mensaje: ${error.message}`;
    messageElement.classList.remove("hidden");
  }
}

/**
 * Copia el contenido del área de salida al portapapeles.
 */
function copyOutput() {
  outputJsonElement.select();
  outputJsonElement.setSelectionRange(0, 99999); // Para móviles

  try {
    // Utiliza document.execCommand('copy') como fallback para entornos sandboxed
    document.execCommand("copy");
    copyButton.textContent = "¡Copiado!";
    setTimeout(() => {
      copyButton.textContent = "Copiar al Portapapeles";
    }, 2000);
  } catch (err) {
    console.error("No se pudo copiar el texto", err);
    copyButton.textContent = "Error al Copiar";
  }
}

// Carga el ejemplo inicial solo si el textarea está vacío para permitir pegar contenido
window.onload = function () {
  // Solo cargar el ejemplo si no hay contenido previo (para permitir pegar)
  if (!inputJsonElement.value || inputJsonElement.value.trim() === "") {
    inputJsonElement.value = `{
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
}`;
  }
};
