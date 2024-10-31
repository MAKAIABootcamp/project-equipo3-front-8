import { differenceInMonths, subMonths } from "date-fns";
import { std, mean } from "mathjs";

export function calculateRatings(data) {
  // Validar entrada
  if (!data || typeof data !== "object") {
    throw new Error("Se requiere un objeto de datos válido");
  }

  // Inicializar acumuladores por categoría
  const accumulators = {
    "Calidad de la comida": {
      sum: data.firstQuestion || 0,
      count: data.firstQuestion ? 1 : 0,
    },
    Servicio: {
      sum: data.secondQuestion || 0,
      count: data.secondQuestion ? 1 : 0,
    },
    "Valor por dinero": {
      sum: data.thirdQuestion || 0,
      count: data.thirdQuestion ? 1 : 0,
    },
    "Ambiente y decoración": {
      sum: 0,
      count: 0,
    },
  };

  // Procesar tags si existen
  if (Array.isArray(data.tags)) {
    data.tags.forEach((tag) => {
      // Mapear las categorías de los tags a las categorías del sistema
      let categoryMapping = {
        "Calidad de la comida": [
          "Calidad de la comida",
          "calidad comida",
          "comida",
        ],
        Servicio: ["Servicio", "servicio al cliente", "atención"],
        "Valor por dinero": [
          "Valor por dinero",
          "precio",
          "relación calidad-precio",
        ],
        "Ambiente y decoración": [
          "Ambiente y decoración",
          "ambiente",
          "decoración",
        ],
      };

      // Encontrar la categoría correcta
      let matchedCategory = null;
      for (let [mainCategory, aliases] of Object.entries(categoryMapping)) {
        if (
          aliases.some((alias) =>
            tag.category.toLowerCase().includes(alias.toLowerCase())
          )
        ) {
          matchedCategory = mainCategory;
          break;
        }
      }

      if (matchedCategory && typeof tag.value === "number") {
        accumulators[matchedCategory].sum += tag.value;
        accumulators[matchedCategory].count++;
      }
    });
  }

  // Función para calcular el promedio y asegurar que esté entre 1 y 5
  const calculateAverage = (sum, count) => {
    if (count === 0) return 0;
    const avg = Math.round(sum / count);
    return Math.min(Math.max(avg, 1), 5);
  };

  // Construir objeto de resultado
  const result = {
    foodQuality: calculateAverage(
      accumulators["Calidad de la comida"].sum,
      accumulators["Calidad de la comida"].count
    ),
    service: calculateAverage(
      accumulators["Servicio"].sum,
      accumulators["Servicio"].count
    ),
    valueForMoney: calculateAverage(
      accumulators["Valor por dinero"].sum,
      accumulators["Valor por dinero"].count
    ),
    ambience: calculateAverage(
      accumulators["Ambiente y decoración"].sum,
      accumulators["Ambiente y decoración"].count
    ),
  };

  // Si no hay calificaciones de ambiente, eliminar esa propiedad
  if (accumulators["Ambiente y decoración"].count === 0) {
    delete result.ambience;
  }

  return result;
}

// function simpleTextAnalysis(text) {
//   const positiveWords = [
//     "excelente",
//     "bueno",
//     "genial",
//     "increíble",
//     "delicioso",
//     "recomendado",
//     "fantástico",
//     "maravilloso",
//     "mejor",
//     "perfecto",
//   ];

//   const negativeWords = [
//     "malo",
//     "terrible",
//     "pésimo",
//     "horrible",
//     "desagradable",
//     "deficiente",
//     "mediocre",
//     "decepcionante",
//     "peor",
//     "evitar",
//   ];

//   const lowerText = text.toLowerCase();
//   let score = 0;

//   positiveWords.forEach((word) => {
//     if (lowerText.includes(word)) score += 0.2;
//   });

//   negativeWords.forEach((word) => {
//     if (lowerText.includes(word)) score -= 0.2;
//   });

//   return Math.max(-1, Math.min(1, score));
// }

function simpleTextAnalysis(text) {
  // Palabras positivas categorizadas por intensidad y contexto
  const positiveWords = {
    // Palabras muy positivas (0.3)
    exceptional: [
      "excelente",
      "excepcional",
      "extraordinario",
      "magnífico",
      "espectacular",
      "impresionante",
      "insuperable",
      "perfecto",
      "maravilloso",
      "fantástico",
      "sobresaliente",
      "exquisito",
      "sublime",
      "espléndido",
      "brillante",
    ],
    // Palabras positivas (0.2)
    positive: [
      "bueno",
      "recomendado",
      "agradable",
      "satisfactorio",
      "delicioso",
      "sabroso",
      "rico",
      "fresco",
      "calidad",
      "destacado",
      "recomendable",
      "acogedor",
      "cómodo",
      "amable",
      "atento",
      "profesional",
      "limpio",
      "ordenado",
      "eficiente",
      "puntual",
      "variado",
      "generoso",
      "abundante",
    ],
    // Palabras ligeramente positivas (0.1)
    mild_positive: [
      "correcto",
      "aceptable",
      "decente",
      "normal",
      "estándar",
      "típico",
      "tradicional",
      "familiar",
      "casero",
      "sencillo",
      "básico",
      "clásico",
      "común",
      "regular",
      "moderado",
    ],
  };

  // Palabras negativas categorizadas por intensidad y contexto
  const negativeWords = {
    // Palabras muy negativas (-0.3)
    severe: [
      "pésimo",
      "horrible",
      "terrible",
      "desastroso",
      "incomible",
      "asqueroso",
      "repugnante",
      "intragable",
      "deplorable",
      "inaceptable",
      "insalubre",
      "negligente",
      "inmundo",
      "insoportable",
      "nefasto",
    ],
    // Palabras negativas (-0.2)
    negative: [
      "malo",
      "deficiente",
      "mediocre",
      "desagradable",
      "decepcionante",
      "insatisfactorio",
      "descuidado",
      "sucio",
      "lento",
      "caro",
      "frío",
      "soso",
      "insípido",
      "desabrido",
      "salado",
      "crudo",
      "quemado",
      "rancio",
      "viejo",
      "pasado",
      "desatento",
      "maleducado",
    ],
    // Palabras ligeramente negativas (-0.1)
    mild_negative: [
      "regular",
      "mejorable",
      "flojo",
      "simple",
      "básico",
      "escaso",
      "pequeño",
      "inadecuado",
      "inconsistente",
      "irregular",
      "demorado",
      "tardío",
      "desordenado",
      "ruidoso",
      "incómodo",
    ],
  };

  // Modificadores de intensidad
  const intensifiers = {
    increase: [
      "muy",
      "mucho",
      "extremadamente",
      "sumamente",
      "realmente",
      "absolutamente",
      "totalmente",
      "completamente",
      "increíblemente",
      "super",
      "bastante",
      "demasiado",
    ],
    decrease: [
      "poco",
      "algo",
      "un poco",
      "ligeramente",
      "apenas",
      "casi",
      "más o menos",
      "regular",
      "más bien",
    ],
  };

  // Negadores que invierten el sentimiento
  const negators = [
    "no",
    "nunca",
    "jamás",
    "tampoco",
    "ningún",
    "ninguno",
    "nada",
    "ni",
    "sin",
  ];

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  let score = 0;
  let wordCount = 0;

  // Función para verificar si una palabra está precedida por un modificador
  const hasModifier = (index, modifierType) => {
    if (index <= 0) return false;
    return intensifiers[modifierType].some((modifier) =>
      words[index - 1].includes(modifier)
    );
  };

  // Función para verificar si una palabra está negada
  const isNegated = (index) => {
    const lookback = 3; // Buscar hasta 3 palabras atrás
    for (let i = Math.max(0, index - lookback); i < index; i++) {
      if (negators.some((negator) => words[i].includes(negator))) {
        return true;
      }
    }
    return false;
  };

  // Procesar el texto palabra por palabra
  words.forEach((word, index) => {
    let wordScore = 0;

    // Verificar palabras muy positivas
    if (positiveWords.exceptional.some((pw) => word.includes(pw))) {
      wordScore = 0.3;
    }
    // Verificar palabras positivas
    else if (positiveWords.positive.some((pw) => word.includes(pw))) {
      wordScore = 0.2;
    }
    // Verificar palabras ligeramente positivas
    else if (positiveWords.mild_positive.some((pw) => word.includes(pw))) {
      wordScore = 0.1;
    }
    // Verificar palabras muy negativas
    else if (negativeWords.severe.some((nw) => word.includes(nw))) {
      wordScore = -0.3;
    }
    // Verificar palabras negativas
    else if (negativeWords.negative.some((nw) => word.includes(nw))) {
      wordScore = -0.2;
    }
    // Verificar palabras ligeramente negativas
    else if (negativeWords.mild_negative.some((nw) => word.includes(nw))) {
      wordScore = -0.1;
    }

    // Si encontramos una palabra con sentimiento
    if (wordScore !== 0) {
      // Verificar modificadores de intensidad
      if (hasModifier(index, "increase")) {
        wordScore *= 1.5;
      } else if (hasModifier(index, "decrease")) {
        wordScore *= 0.5;
      }

      // Verificar negaciones
      if (isNegated(index)) {
        wordScore *= -1;
      }

      score += wordScore;
      wordCount++;
    }
  });

  // Normalizar el puntaje basado en la cantidad de palabras con sentimiento
  if (wordCount > 0) {
    score = score / Math.sqrt(wordCount);
  }

  // Asegurar que el puntaje esté entre -1 y 1
  return Math.max(-1, Math.min(1, score));
}

// export function calculateOverallRating({
//   foodQuality,
//   service,
//   valueForMoney,
//   ambience = null,
// }) {
//   // Validar que las calificaciones obligatorias existan y estén en rango

//   console.log(foodQuality);
//   console.log(service);
//   console.log(valueForMoney);
//   console.log(ambience);

//   if (!foodQuality || !service || !valueForMoney) {
//     throw new Error(
//       "Se requieren calificaciones para comida, servicio y relación calidad-precio"
//     );
//   }

//   // Validar que las calificaciones estén entre 1 y 5
//   const ratings = [foodQuality, service, valueForMoney];
//   if (ambience !== null) ratings.push(ambience);

//   if (!ratings.every((rating) => rating >= 1 && rating <= 5)) {
//     throw new Error("Todas las calificaciones deben estar entre 1 y 5");
//   }

//   // Definir los pesos base
//   let weights = {
//     foodQuality: 0.4, // 40%
//     service: 0.25, // 25%
//     valueForMoney: 0.2, // 20%
//     ambience: 0.15, // 15%
//   };

//   // Si no hay calificación de ambiente, redistribuir su peso proporcionalmente
//   if (!ambience) {
//     const ambienceWeight = weights.ambience;
//     const totalOtherWeights = 1 - ambienceWeight;

//     weights = {
//       foodQuality: weights.foodQuality / totalOtherWeights,
//       service: weights.service / totalOtherWeights,
//       valueForMoney: weights.valueForMoney / totalOtherWeights,
//       ambience: 0,
//     };
//   }

//   // Calcular la puntuación ponderada
//   const weightedScore =
//     foodQuality * weights.foodQuality +
//     service * weights.service +
//     valueForMoney * weights.valueForMoney +
//     (ambience || 0) * weights.ambience;

//   // Redondear a un decimal para mayor precisión
//   return Math.round(weightedScore * 10) / 10;
// }

// Calcula la calidad de una reseña basada en su longitud, uso de criterios específicos y presencia de fotos
export function calculateReviewQuality(review) {
  let score = 0;

  // Longitud de la reseña
  if (review.text.length > 50) score += 0.5;
  if (review.text.length > 150) score += 0.5;

  // Uso de criterios específicos
  const criteriaKeywords = [
    "comida",
    "servicio",
    "ambiente",
    "precio",
    "sabor",
    "presentación",
  ];
  const usedCriteria = criteriaKeywords.filter((keyword) =>
    review.text.toLowerCase().includes(keyword)
  );
  score += Math.min(usedCriteria.length * 0.3, 2);

  // Presencia de fotos
  if (review.photos && review.photos.length > 0) score += 1;

  return Math.min(score, 4); // Máximo 4 puntos
}

// Calcula la puntuación basada en la fecha de la reseña
export function calculateDateScore(reviewDate) {
  // Asegurarse de que reviewDate sea un objeto Date
  const reviewDateObj = new Date(reviewDate);

  // Validar que la fecha sea válida
  if (isNaN(reviewDateObj.getTime())) {
    throw new Error("Fecha de reseña inválida");
  }
  const now = new Date();
  const monthsDifference = differenceInMonths(now, reviewDate);

  if (monthsDifference <= 3) return 1;
  if (monthsDifference <= 6) return 0.8;
  if (monthsDifference <= 12) return 0.6;
  return 0.4;
}

// Función para calcular la puntuación general de una reseña
export function calculateOverallReviewScore(review, userProfile) {
  const overallRating = calculateOverallRating({
    ...review,
  });
  const qualityScore = calculateReviewQuality(review);
  const dateScore = calculateDateScore(review.date);
  const sentimentScore = simpleTextAnalysis(review.text);

  const rawScore =
    overallRating * 0.4 +
    qualityScore * 0.2 +
    dateScore * 0.1 +
    (sentimentScore + 1) * 2.5 * 0.1 + // Convertimos el rango -1 a 1 en 0 a 5
    userProfile * 0.2;

  return Math.max(0, Math.min(5, rawScore));
}

// Función para calcular el perfil del comensal
export function calculateUserProfile(user, userReviews, reviews) {
  const frequency = calculateFrequency(user.eatingOutFrecuency);
  const experienceScore = calculateExperienceScore(userReviews.length);
  const consistencyScore = calculateUserConsistencyScore(
    user.id,
    userReviews,
    reviews
  ).finalScore;

  return (frequency + experienceScore + consistencyScore) / 3;
}

export function calculateFrequency(diningFrequency) {
  switch (diningFrequency) {
    case "1 vez al mes":
      return 1; // Muy baja frecuencia
    case "2-3 veces al mes":
      return 2.5; // Baja frecuencia
    case "Una vez por semana":
      return 3.5; // Frecuencia media
    case "2-3 veces por semana":
      return 4.5; // Alta frecuencia
    default:
      return 5; // Muy alta frecuencia
  }
}

// Calcula la puntuación de frecuencia de comidas fuera
// export function calculateFrequency(diningFrequency) {
//   // diningFrequency es el número promedio de comidas fuera por mes
//   if (diningFrequency <= 2) return 1; // Baja frecuencia
//   if (diningFrequency <= 8) return 2; // Media frecuencia
//   if (diningFrequency === "1 vez al mes") return 1; // Baja  frecuencia
//   if (
//     diningFrequency === "Una vez por semana" ||
//     diningFrequency === "2-3 veces al mes"
//   )
//     return 2; // Media frecuencia

//   return 3; //Alta frecuencia
// }

// Calcula la puntuación basada en la experiencia (número de reseñas)
// export function calculateExperienceScore(reviewCount) {
//   if (reviewCount <= 5) return 1;
//   if (reviewCount <= 20) return 2;
//   return 3;
// }

export function calculateExperienceScore(reviewCount) {
  if (reviewCount <= 3) return 1; // Muy poca experiencia
  if (reviewCount <= 5) return 2; // Poca experiencia
  if (reviewCount <= 10) return 3; // Experiencia media
  if (reviewCount <= 20) return 4; // Buena experiencia
  return 5; // Mucha experiencia
}

// Calcula la puntuación de consistencia basada en la desviación estándar de las calificaciones
// export function calculateConsistencyScore(currentReview, restaurantReviews) {
//   // Si no hay suficientes reseñas para comparar, retorna puntuación neutral
//   if (!restaurantReviews || restaurantReviews.length < 3) {
//     return 2;
//   }

//   // Categorías a evaluar y sus pesos según el modelo
//   const categories = [
//     { name: "foodQuality", weight: 0.4 },
//     { name: "service", weight: 0.25 },
//     { name: "valueForMoney", weight: 0.2 },
//     { name: "ambience", weight: 0.15 },
//   ];

//   // Calcular la desviación de la reseña actual respecto al histórico para cada categoría
//   let weightedDeviationScore = 0;
//   let totalWeight = 0;

//   categories.forEach(({ name, weight }) => {
//     // Solo procesar la categoría si existe en la reseña actual
//     if (currentReview[name] !== undefined && currentReview[name] !== null) {
//       // Obtener calificaciones históricas para esta categoría
//       const historicalRatings = restaurantReviews
//         .filter((review) => review[name] !== undefined && review[name] !== null)
//         .map((review) => review[name]);

//       if (historicalRatings.length > 0) {
//         // Calcular estadísticas para la categoría
//         const categoryStd = std(historicalRatings);
//         const categoryMean =
//           historicalRatings.reduce((a, b) => a + b, 0) /
//           historicalRatings.length;

//         // Calcular cuántas desviaciones estándar se aleja del promedio
//         const deviations =
//           Math.abs(currentReview[name] - categoryMean) / (categoryStd || 1);

//         // Convertir la desviación a un puntaje
//         let categoryDeviationScore;
//         if (deviations <= 0.5) {
//           categoryDeviationScore = 3; // Muy consistente
//         } else if (deviations <= 1) {
//           categoryDeviationScore = 2; // Moderadamente consistente
//         } else {
//           categoryDeviationScore = 1; // Poco consistente
//         }

//         weightedDeviationScore += categoryDeviationScore * weight;
//         totalWeight += weight;
//       }
//     }
//   });

//   // Si no se pudo calcular ninguna categoría, retorna puntuación neutral
//   if (totalWeight === 0) return 2;

//   // Normalizar el puntaje final y redondearlo
//   const finalScore = weightedDeviationScore / totalWeight;

//   // Convertir a una escala de 1-3
//   if (finalScore >= 2.5) return 3;
//   if (finalScore >= 1.5) return 2;
//   return 1;
// }

export function calculateConsistencyScore(currentReview, restaurantReviews) {
  if (!restaurantReviews || restaurantReviews.length < 3) {
    return 3; // Puntuación neutral en escala 1-5
  }

  const categories = [
    { name: "foodQuality", weight: 0.4 },
    { name: "service", weight: 0.25 },
    { name: "valueForMoney", weight: 0.2 },
    { name: "ambience", weight: 0.15 },
  ];

  let weightedDeviationScore = 0;
  let totalWeight = 0;

  categories.forEach(({ name, weight }) => {
    if (currentReview[name] !== undefined && currentReview[name] !== null) {
      const historicalRatings = restaurantReviews
        .filter((review) => review[name] !== undefined && review[name] !== null)
        .map((review) => review[name]);

      if (historicalRatings.length > 0) {
        const categoryStd = std(historicalRatings);
        const categoryMean =
          historicalRatings.reduce((a, b) => a + b, 0) /
          historicalRatings.length;
        const deviations =
          Math.abs(currentReview[name] - categoryMean) / (categoryStd || 1);

        // Nueva escala de puntuación 1-5 basada en desviaciones
        let categoryDeviationScore;
        if (deviations <= 0.3) {
          categoryDeviationScore = 5; // Extremadamente consistente
        } else if (deviations <= 0.6) {
          categoryDeviationScore = 4; // Muy consistente
        } else if (deviations <= 1) {
          categoryDeviationScore = 3; // Moderadamente consistente
        } else if (deviations <= 1.5) {
          categoryDeviationScore = 2; // Poco consistente
        } else {
          categoryDeviationScore = 1; // Inconsistente
        }

        weightedDeviationScore += categoryDeviationScore * weight;
        totalWeight += weight;
      }
    }
  });

  if (totalWeight === 0) return 3; // Puntuación neutral

  const finalScore = weightedDeviationScore / totalWeight;
  return Math.round(finalScore * 10) / 10; // Redondear a un decimal
}

// export function calculateUserConsistencyScore(userId, userReviews, allReviews) {
//   // Validar entrada
//   if (!userReviews?.length || !allReviews?.length) {
//     throw new Error("Se requieren reseñas válidas para el análisis");
//   }

//   // Categorías a evaluar con sus pesos
//   const categories = [
//     { name: "foodQuality", weight: 0.4, label: "Calidad de Comida" },
//     { name: "service", weight: 0.25, label: "Servicio" },
//     { name: "valueForMoney", weight: 0.2, label: "Relación Calidad-Precio" },
//     { name: "ambience", weight: 0.15, label: "Ambiente" },
//   ];

//   // Agrupar reseñas por restaurante
//   const restaurantReviews = new Map();
//   allReviews.forEach((review) => {
//     if (!restaurantReviews.has(review.restaurantId)) {
//       restaurantReviews.set(review.restaurantId, []);
//     }
//     restaurantReviews.get(review.restaurantId).push(review);
//   });

//   // Analizar cada categoría
//   const categoryAnalysis = categories.map((category) => {
//     let deviations = [];
//     let validComparisons = 0;

//     userReviews.forEach((userReview) => {
//       // Obtener todas las reseñas del mismo restaurante
//       const otherReviews = restaurantReviews
//         .get(userReview.restaurantId)
//         ?.filter((r) => r.userId !== userId && r[category.name] !== undefined);

//       if (
//         otherReviews?.length >= 3 &&
//         userReview[category.name] !== undefined
//       ) {
//         // Calcular estadísticas de otros usuarios
//         const otherRatings = otherReviews.map((r) => r[category.name]);
//         const meanOthers =
//           otherRatings.reduce((a, b) => a + b, 0) / otherRatings.length;
//         const stdOthers = std(otherRatings);

//         // Calcular qué tanto se desvía el usuario del consenso
//         const deviation =
//           Math.abs(userReview[category.name] - meanOthers) / (stdOthers || 1);
//         deviations.push(deviation);
//         validComparisons++;
//       }
//     });

//     // Calcular puntuación para esta categoría
//     let categoryScore = 0;
//     if (deviations.length > 0) {
//       const avgDeviation =
//         deviations.reduce((a, b) => a + b, 0) / deviations.length;
//       if (avgDeviation <= 0.5) categoryScore = 3; // Muy consistente
//       else if (avgDeviation <= 1)
//         categoryScore = 2; // Moderadamente consistente
//       else categoryScore = 1; // Poco consistente
//     }

//     return {
//       category: category.label,
//       score: categoryScore,
//       weight: category.weight,
//       validComparisons,
//       avgDeviation:
//         deviations.length > 0
//           ? deviations.reduce((a, b) => a + b, 0) / deviations.length
//           : null,
//     };
//   });

//   // Calcular puntuación general ponderada
//   let totalWeightedScore = 0;
//   let totalWeight = 0;

//   categoryAnalysis.forEach((analysis) => {
//     if (analysis.validComparisons > 0) {
//       totalWeightedScore += analysis.score * analysis.weight;
//       totalWeight += analysis.weight;
//     }
//   });

//   const finalScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 2;

//   // Generar mensaje de análisis
//   const getConsistencyLabel = (score) => {
//     if (score >= 2.5) return "Muy consistente";
//     if (score >= 1.5) return "Moderadamente consistente";
//     return "Poco consistente";
//   };

//   // Identificar tendencias de calificación
//   const biasAnalysis = analyzeBias(userId, userReviews, allReviews);

//   return {
//     finalScore,
//     overallScore: Math.round(finalScore * 10) / 10,
//     consistencyLabel: getConsistencyLabel(finalScore),
//     categoryAnalysis: categoryAnalysis,
//     reviewCount: userReviews.length,
//     validComparisons: Math.min(
//       ...categoryAnalysis.map((c) => c.validComparisons)
//     ),
//     biasAnalysis,
//     reliability: calculateReliabilityScore(finalScore, userReviews.length),
//   };
// }

export function calculateUserConsistencyScore(userId, userReviews, allReviews) {
  if (!userReviews?.length || !allReviews?.length) {
    throw new Error("Se requieren reseñas válidas para el análisis");
  }

  const categories = [
    { name: "foodQuality", weight: 0.4, label: "Calidad de Comida" },
    { name: "service", weight: 0.25, label: "Servicio" },
    { name: "valueForMoney", weight: 0.2, label: "Relación Calidad-Precio" },
    { name: "ambience", weight: 0.15, label: "Ambiente" },
  ];

  const restaurantReviews = new Map();
  allReviews.forEach((review) => {
    if (!restaurantReviews.has(review.restaurantId)) {
      restaurantReviews.set(review.restaurantId, []);
    }
    restaurantReviews.get(review.restaurantId).push(review);
  });

  const categoryAnalysis = categories.map((category) => {
    let deviations = [];
    let validComparisons = 0;

    userReviews.forEach((userReview) => {
      const otherReviews = restaurantReviews
        .get(userReview.restaurantId)
        ?.filter((r) => r.userId !== userId && r[category.name] !== undefined);

      if (
        otherReviews?.length >= 3 &&
        userReview[category.name] !== undefined
      ) {
        const otherRatings = otherReviews.map((r) => r[category.name]);
        const meanOthers =
          otherRatings.reduce((a, b) => a + b, 0) / otherRatings.length;
        const stdOthers = std(otherRatings);
        const deviation =
          Math.abs(userReview[category.name] - meanOthers) / (stdOthers || 1);
        deviations.push(deviation);
        validComparisons++;
      }
    });

    let categoryScore = 3; // Valor neutral por defecto
    if (deviations.length > 0) {
      const avgDeviation =
        deviations.reduce((a, b) => a + b, 0) / deviations.length;
      if (avgDeviation <= 0.3) categoryScore = 5; // Extremadamente consistente
      else if (avgDeviation <= 0.6) categoryScore = 4; // Muy consistente
      else if (avgDeviation <= 1)
        categoryScore = 3; // Moderadamente consistente
      else if (avgDeviation <= 1.5) categoryScore = 2; // Poco consistente
      else categoryScore = 1; // Inconsistente
    }

    return {
      category: category.label,
      score: categoryScore,
      weight: category.weight,
      validComparisons,
      avgDeviation:
        deviations.length > 0
          ? deviations.reduce((a, b) => a + b, 0) / deviations.length
          : null,
    };
  });

  let totalWeightedScore = 0;
  let totalWeight = 0;

  categoryAnalysis.forEach((analysis) => {
    if (analysis.validComparisons > 0) {
      totalWeightedScore += analysis.score * analysis.weight;
      totalWeight += analysis.weight;
    }
  });

  const finalScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 3;

  const getConsistencyLabel = (score) => {
    if (score >= 4.5) return "Excepcionalmente consistente";
    if (score >= 3.5) return "Muy consistente";
    if (score >= 2.5) return "Moderadamente consistente";
    if (score >= 1.5) return "Poco consistente";
    return "Inconsistente";
  };

  return {
    finalScore,
    overallScore: Math.round(finalScore * 10) / 10,
    consistencyLabel: getConsistencyLabel(finalScore),
    categoryAnalysis,
    reviewCount: userReviews.length,
    validComparisons: Math.min(
      ...categoryAnalysis.map((c) => c.validComparisons)
    ),
    biasAnalysis: analyzeBias(userId, userReviews, allReviews),
    reliability: calculateReliabilityScore(finalScore, userReviews.length),
  };
}

/**
 * Analiza si el usuario tiende a calificar más alto o más bajo que el promedio
 */
function analyzeBias(userId, userReviews, allReviews) {
  let totalDifference = 0;
  let comparisons = 0;

  userReviews.forEach((userReview) => {
    const restaurantReviews = allReviews.filter(
      (r) => r.restaurantId === userReview.restaurantId && r.userId !== userId
    );

    if (restaurantReviews.length >= 3) {
      const avgOthers =
        restaurantReviews.reduce((sum, r) => sum + r.overallRating, 0) /
        restaurantReviews.length;
      totalDifference += userReview.overallRating - avgOthers;
      comparisons++;
    }
  });

  if (comparisons === 0) return "Insuficientes datos para determinar tendencia";

  const avgDifference = totalDifference / comparisons;
  if (Math.abs(avgDifference) < 0.3) return "Neutral";
  return avgDifference > 0
    ? "Tiende a calificar más alto"
    : "Tiende a calificar más bajo";
}

/**
 * Calcula un puntaje de confiabilidad basado en la consistencia y cantidad de reseñas
 */
// function calculateReliabilityScore(consistencyScore, reviewCount) {
//   // Factores de confiabilidad
//   const consistencyWeight = 0.7;
//   const reviewCountWeight = 0.3;

//   // Normalizar cantidad de reseñas (máximo 20 para puntaje completo)
//   const normalizedReviewCount = Math.min(reviewCount, 20) / 20;

//   // Normalizar consistencyScore a escala 0-1
//   const normalizedConsistency = (consistencyScore - 1) / 2;

//   const reliabilityScore =
//     normalizedConsistency * consistencyWeight +
//     normalizedReviewCount * reviewCountWeight;

//   return Math.round(reliabilityScore * 100);
// }

function calculateReliabilityScore(consistencyScore, reviewCount) {
  const consistencyWeight = 0.7;
  const reviewCountWeight = 0.3;

  const normalizedReviewCount = Math.min(reviewCount, 20) / 20;
  const normalizedConsistency = (consistencyScore - 1) / 4; // Ajustado para escala 1-5

  const reliabilityScore =
    (normalizedConsistency * consistencyWeight +
      normalizedReviewCount * reviewCountWeight) *
    100;

  return Math.round(reliabilityScore);
}

// Función para calcular la puntuación final de un restaurante
// export function calculateRestaurantScore(reviews, users, restaurantId) {
//   const restaurantReviews = reviews.filter(
//     (r) => r.restaurantId === restaurantId
//   );
//   const weightedScores = restaurantReviews.map((rvw) => {
//     const review = {
//       ...rvw.review,
//       text: rvw.description,
//       photos: rvw.postImage,
//       date: rvw.createdAt,
//       userId: rvw.userId,
//       restaurantId: rvw.restaurantId,
//     };
//     const user = users.find((u) => u.id === review.userId);
//     const userReviews = reviews.filter((r) => r.userId === review.userId);
//     const userProfile = calculateUserProfile(user, userReviews, reviews);
//     const weight = calculateReviewWeight(review, userProfile);
//     return {
//       foodQuality: review.foodQuality * weight * 0.4,
//       service: review.service * weight * 0.25,
//       ambience: review.ambience * weight * 0.15,
//       valueForMoney: review.valueForMoney * weight * 0.2,
//     };
//   });

//   const averageScores = {
//     foodQuality: mean(weightedScores.map((s) => s.foodQuality)),
//     service: mean(weightedScores.map((s) => s.service)),
//     ambience: mean(weightedScores.map((s) => s.ambience)),
//     valueForMoney: mean(weightedScores.map((s) => s.valueForMoney)),
//   };
//   const finalScore = Object.values(averageScores).reduce((a, b) => a + b, 0);
//   return {
//     ...averageScores,
//     overallRating: adjustForOutliers(finalScore, restaurantReviews),
//   };
// }

export function calculateRestaurantScore(reviews, users, restaurantId) {
  const restaurantReviews = reviews.filter(
    (r) => r.restaurantId === restaurantId
  );

  // Si no hay reseñas, retornar objeto con valores por defecto
  if (!restaurantReviews.length) {
    return {
      foodQuality: 0,
      service: 0,
      ambience: 0,
      valueForMoney: 0,
      overallRating: 0,
    };
  }

  const weightedScores = restaurantReviews.map((rvw) => {
    const review = {
      ...rvw.review,
      text: rvw.description,
      photos: rvw.postImage,
      date: rvw.createdAt,
      userId: rvw.userId,
      restaurantId: rvw.restaurantId,
    };

    const user = users.find((u) => u.id === review.userId);
    const userReviews = reviews.filter((r) => r.userId === review.userId);
    const userProfile = calculateUserProfile(user, userReviews, reviews);
    const weight = calculateReviewWeight(review, userProfile);

    // Determinar si la reseña tiene calificación de ambiente
    const hasAmbience = review.ambience != null && !isNaN(review.ambience);

    // Ajustar los pesos según si existe calificación de ambiente
    const weights = hasAmbience
      ? {
          foodQuality: 0.4,
          service: 0.25,
          ambience: 0.15,
          valueForMoney: 0.2,
        }
      : {
          foodQuality: 0.47, // 0.4 / 0.85
          service: 0.29, // 0.25 / 0.85
          valueForMoney: 0.24, // 0.2 / 0.85
          ambience: 0,
        };

    return {
      foodQuality: review.foodQuality * weight * weights.foodQuality,
      service: review.service * weight * weights.service,
      valueForMoney: review.valueForMoney * weight * weights.valueForMoney,
      ambience: hasAmbience
        ? review.ambience * weight * weights.ambience
        : null,
    };
  });

  // Calcular promedios, excluyendo valores nulos
  const averageScores = {
    foodQuality: mean(
      weightedScores.map((s) => s.foodQuality).filter((v) => v != null)
    ),
    service: mean(
      weightedScores.map((s) => s.service).filter((v) => v != null)
    ),
    valueForMoney: mean(
      weightedScores.map((s) => s.valueForMoney).filter((v) => v != null)
    ),
  };

  // Calcular promedio de ambiente solo si hay valores válidos
  const ambienceValues = weightedScores
    .map((s) => s.ambience)
    .filter((v) => v != null);

  if (ambienceValues.length > 0) {
    averageScores.ambience = mean(ambienceValues);
  }

  // Calcular puntuación final considerando solo las categorías con valores
  const finalScore = Object.values(averageScores)
    .filter((v) => v != null && !isNaN(v))
    .reduce((a, b) => a + b, 0);

  return {
    ...averageScores,
    overallRating: adjustForOutliers(finalScore, restaurantReviews),
  };
}

// Función para calcular el peso de una reseña
export function calculateReviewWeight(review, userProfile) {
  const qualityScore = calculateReviewQuality(review);
  const dateScore = calculateDateScore(review.date);

  return userProfile * 0.6 + qualityScore * 0.3 + dateScore * 0.1;
}

// export function adjustForOutliers(score, reviews) {
//   if (!reviews || reviews.length === 0) {
//     return score;
//   }

//   // Obtener y ordenar las calificaciones
//   const ratings = reviews
//     .map((review) => {
//       return calculateOverallRating({
//         ...review.review,
//       });
//     })
//     .sort((a, b) => a - b);

//   // Calcular Q1 y Q3
//   const q1 = calculateQuartile(ratings, 0.25);
//   const q3 = calculateQuartile(ratings, 0.75);

//   // Calcular rango intercuartil (IQR)
//   const iqr = q3 - q1;

//   // Definir límites para valores atípicos
//   const lowerBound = q1 - 1.5 * iqr;
//   const upperBound = q3 + 1.5 * iqr;

//   // Filtrar valores atípicos
//   const filteredRatings = ratings.filter(
//     (rating) => rating >= lowerBound && rating <= upperBound
//   );

//   // Si no quedan ratings después del filtrado, retornar score original
//   if (filteredRatings.length === 0) {
//     return score;
//   }

//   // Calcular media ajustada y combinar con la puntuación original
//   const adjustedMean = mean(filteredRatings);

//   // Peso para el score original (70%) y la media ajustada (30%)
//   const adjustedScore = score * 0.7 + adjustedMean * 0.3;

//   // Asegurar que el resultado esté entre 1 y 5
//   return Math.max(1, Math.min(5, Math.round(adjustedScore * 10) / 10));
// }


export function adjustForOutliers(score, reviews) {
  if (!reviews || reviews.length === 0) {
    return score;
  }

  // Obtener y ordenar las calificaciones
  const ratings = reviews
    .map((review) => {
      try {
        return calculateOverallRating({
          ...review.review,
        });
      } catch (error) {
        return null;
      }
    })
    .filter((rating) => rating != null) // Filtrar calificaciones nulas
    .sort((a, b) => a - b);

  // Si no hay ratings válidos, retornar score original
  if (ratings.length === 0) {
    return score;
  }

  // Calcular Q1 y Q3
  const q1 = calculateQuartile(ratings, 0.25);
  const q3 = calculateQuartile(ratings, 0.75);

  // Calcular rango intercuartil (IQR)
  const iqr = q3 - q1;

  // Definir límites para valores atípicos
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  // Filtrar valores atípicos
  const filteredRatings = ratings.filter(
    (rating) => rating >= lowerBound && rating <= upperBound
  );

  // Si no quedan ratings después del filtrado, retornar score original
  if (filteredRatings.length === 0) {
    return score;
  }

  // Calcular media ajustada y combinar con la puntuación original
  const adjustedMean = mean(filteredRatings);
  const adjustedScore = score * 0.7 + adjustedMean * 0.3;

  // Asegurar que el resultado esté entre 1 y 5
  return Math.max(1, Math.min(5, Math.round(adjustedScore * 10) / 10));
}

export function calculateOverallRating({
  foodQuality,
  service,
  valueForMoney,
  ambience = null,
}) {
  // Validar que las calificaciones obligatorias existan y estén en rango
  if (!foodQuality || !service || !valueForMoney) {
    throw new Error(
      "Se requieren calificaciones para comida, servicio y relación calidad-precio"
    );
  }

  // Validar que las calificaciones estén entre 1 y 5
  const ratings = [foodQuality, service, valueForMoney];
  if (ambience !== null) ratings.push(ambience);

  if (!ratings.every((rating) => rating >= 1 && rating <= 5)) {
    throw new Error("Todas las calificaciones deben estar entre 1 y 5");
  }

  // Definir los pesos base y ajustarlos según la presencia de ambience
  const hasAmbience = ambience !== null && !isNaN(ambience);
  const weights = hasAmbience
    ? {
        foodQuality: 0.4,
        service: 0.25,
        valueForMoney: 0.2,
        ambience: 0.15,
      }
    : {
        foodQuality: 0.47, // 0.4 / 0.85
        service: 0.29, // 0.25 / 0.85
        valueForMoney: 0.24, // 0.2 / 0.85
        ambience: 0,
      };

  // Calcular la puntuación ponderada
  const weightedScore =
    foodQuality * weights.foodQuality +
    service * weights.service +
    valueForMoney * weights.valueForMoney +
    (hasAmbience ? ambience * weights.ambience : 0);

  // Redondear a un decimal para mayor precisión
  return Math.round(weightedScore * 10) / 10;
}

function calculateQuartile(sortedArr, q) {
  const pos = (sortedArr.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sortedArr[base + 1] !== undefined) {
    return sortedArr[base] + rest * (sortedArr[base + 1] - sortedArr[base]);
  } else {
    return sortedArr[base];
  }
}


export function assignStars(score, reviews) {
  const sixMonthsAgo = subMonths(new Date(), 6);

  // Filtra las reseñas de los últimos 6 meses
  const recentReviews = reviews.filter(
    (review) => new Date(review.createdAt) >= sixMonthsAgo
  );

  // Verifica si hay al menos 30 reseñas válidas en los últimos 6 meses
  if (recentReviews.length < 30) {
    return {
      stars: 0,
      message:
        "Actualmente no hay suficientes reseñas recientes para asignar una calificación. Se requieren al menos 30 reseñas en los últimos 6 meses.",
      category: "Sin Clasificar",
    };
  }

  // Asigna estrellas basado en la puntuación
  if (score > 4.8) {
    return {
      stars: 5,
      message:
        "Excepcional. Una experiencia gastronómica extraordinaria que define nuevos estándares de excelencia.",
      category: "Excepcional",
    };
  } else if (score > 4.6) {
    return {
      stars: 4,
      message:
        "Sobresaliente. Un destino culinario que ofrece una experiencia memorable y única.",
      category: "Sobresaliente",
    };
  } else if (score > 4.2) {
    return {
      stars: 3,
      message:
        "Excelente. Vale la pena hacer un viaje especial para visitarlo.",
      category: "Excelente",
    };
  } else if (score > 3.8) {
    return {
      stars: 2,
      message:
        "Muy bueno. Ofrece una experiencia consistentemente notable en su categoría.",
      category: "Muy Bueno",
    };
  } else if (score > 3.5) {
    return {
      stars: 1,
      message: "Bueno. Vale la pena una visita si estás en la zona.",
      category: "Bueno",
    };
  } else {
    return {
      stars: 0,
      message:
        "No califica para estrellas en este momento. Calidad estándar, pero aún no alcanza el nivel para estrellas.",
      category: "Sin Estrellas",
    };
  }
}
