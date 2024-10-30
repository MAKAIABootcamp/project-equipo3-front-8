import { differenceInMonths } from "date-fns";
import { std } from "mathjs";

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

function simpleTextAnalysis(text) {
  const positiveWords = [
    "excelente",
    "bueno",
    "genial",
    "increíble",
    "delicioso",
    "recomendado",
    "fantástico",
    "maravilloso",
    "mejor",
    "perfecto",
  ];

  const negativeWords = [
    "malo",
    "terrible",
    "pésimo",
    "horrible",
    "desagradable",
    "deficiente",
    "mediocre",
    "decepcionante",
    "peor",
    "evitar",
  ];

  const lowerText = text.toLowerCase();
  let score = 0;

  positiveWords.forEach((word) => {
    if (lowerText.includes(word)) score += 0.2;
  });

  negativeWords.forEach((word) => {
    if (lowerText.includes(word)) score -= 0.2;
  });

  return Math.max(-1, Math.min(1, score));
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

  // Definir los pesos base
  let weights = {
    foodQuality: 0.4, // 40%
    service: 0.25, // 25%
    valueForMoney: 0.2, // 20%
    ambience: 0.15, // 15%
  };

  // Si no hay calificación de ambiente, redistribuir su peso proporcionalmente
  if (ambience === null) {
    const ambienceWeight = weights.ambience;
    const totalOtherWeights = 1 - ambienceWeight;

    weights = {
      foodQuality: weights.foodQuality / totalOtherWeights,
      service: weights.service / totalOtherWeights,
      valueForMoney: weights.valueForMoney / totalOtherWeights,
      ambience: 0,
    };
  }

  // Calcular la puntuación ponderada
  const weightedScore =
    foodQuality * weights.foodQuality +
    service * weights.service +
    valueForMoney * weights.valueForMoney +
    (ambience || 0) * weights.ambience;

  // Redondear a un decimal para mayor precisión
  return Math.round(weightedScore * 10) / 10;
}

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
export function calculateUserProfile(user, reviews) {
  const frequency = calculateFrequency(user.diningFrequency);
  const experienceScore = calculateExperienceScore(reviews.length);
  const consistencyScore = calculateConsistencyScore(reviews);

  return (frequency + experienceScore + consistencyScore) / 3;
}

// Calcula la puntuación de frecuencia de comidas fuera
export function calculateFrequency(diningFrequency) {
  // diningFrequency es el número promedio de comidas fuera por mes
  if (diningFrequency <= 2) return 1; // Baja frecuencia
  if (diningFrequency <= 8) return 2; // Media frecuencia
  return 3; // Alta frecuencia
}

// Calcula la puntuación basada en la experiencia (número de reseñas)
export function calculateExperienceScore(reviewCount) {
  if (reviewCount <= 5) return 1;
  if (reviewCount <= 20) return 2;
  return 3;
}

// Calcula la puntuación de consistencia basada en la desviación estándar de las calificaciones
export function calculateConsistencyScore(currentReview, restaurantReviews) {
  // Si no hay suficientes reseñas para comparar, retorna puntuación neutral
  if (!restaurantReviews || restaurantReviews.length < 3) {
    return 2;
  }

  // Categorías a evaluar y sus pesos según el modelo
  const categories = [
    { name: "foodQuality", weight: 0.4 },
    { name: "service", weight: 0.25 },
    { name: "valueForMoney", weight: 0.2 },
    { name: "ambience", weight: 0.15 },
  ];

  // Calcular la desviación de la reseña actual respecto al histórico para cada categoría
  let weightedDeviationScore = 0;
  let totalWeight = 0;

  categories.forEach(({ name, weight }) => {
    // Solo procesar la categoría si existe en la reseña actual
    if (currentReview[name] !== undefined && currentReview[name] !== null) {
      // Obtener calificaciones históricas para esta categoría
      const historicalRatings = restaurantReviews
        .filter((review) => review[name] !== undefined && review[name] !== null)
        .map((review) => review[name]);

      if (historicalRatings.length > 0) {
        // Calcular estadísticas para la categoría
        const categoryStd = std(historicalRatings);
        const categoryMean =
          historicalRatings.reduce((a, b) => a + b, 0) /
          historicalRatings.length;

        // Calcular cuántas desviaciones estándar se aleja del promedio
        const deviations =
          Math.abs(currentReview[name] - categoryMean) / (categoryStd || 1);

        // Convertir la desviación a un puntaje
        let categoryDeviationScore;
        if (deviations <= 0.5) {
          categoryDeviationScore = 3; // Muy consistente
        } else if (deviations <= 1) {
          categoryDeviationScore = 2; // Moderadamente consistente
        } else {
          categoryDeviationScore = 1; // Poco consistente
        }

        weightedDeviationScore += categoryDeviationScore * weight;
        totalWeight += weight;
      }
    }
  });

  // Si no se pudo calcular ninguna categoría, retorna puntuación neutral
  if (totalWeight === 0) return 2;

  // Normalizar el puntaje final y redondearlo
  const finalScore = weightedDeviationScore / totalWeight;

  // Convertir a una escala de 1-3
  if (finalScore >= 2.5) return 3;
  if (finalScore >= 1.5) return 2;
  return 1;
}

export function calculateUserConsistencyScore(userId, userReviews, allReviews) {
  // Validar entrada
  if (!userReviews?.length || !allReviews?.length) {
    throw new Error("Se requieren reseñas válidas para el análisis");
  }

  // Categorías a evaluar con sus pesos
  const categories = [
    { name: "foodQuality", weight: 0.4, label: "Calidad de Comida" },
    { name: "service", weight: 0.25, label: "Servicio" },
    { name: "valueForMoney", weight: 0.2, label: "Relación Calidad-Precio" },
    { name: "ambience", weight: 0.15, label: "Ambiente" },
  ];

  // Agrupar reseñas por restaurante
  const restaurantReviews = new Map();
  allReviews.forEach((review) => {
    if (!restaurantReviews.has(review.restaurantId)) {
      restaurantReviews.set(review.restaurantId, []);
    }
    restaurantReviews.get(review.restaurantId).push(review);
  });

  // Analizar cada categoría
  const categoryAnalysis = categories.map((category) => {
    let deviations = [];
    let validComparisons = 0;

    userReviews.forEach((userReview) => {
      // Obtener todas las reseñas del mismo restaurante
      const otherReviews = restaurantReviews
        .get(userReview.restaurantId)
        ?.filter((r) => r.userId !== userId && r[category.name] !== undefined);

      if (
        otherReviews?.length >= 3 &&
        userReview[category.name] !== undefined
      ) {
        // Calcular estadísticas de otros usuarios
        const otherRatings = otherReviews.map((r) => r[category.name]);
        const meanOthers =
          otherRatings.reduce((a, b) => a + b, 0) / otherRatings.length;
        const stdOthers = std(otherRatings);

        // Calcular qué tanto se desvía el usuario del consenso
        const deviation =
          Math.abs(userReview[category.name] - meanOthers) / (stdOthers || 1);
        deviations.push(deviation);
        validComparisons++;
      }
    });

    // Calcular puntuación para esta categoría
    let categoryScore = 0;
    if (deviations.length > 0) {
      const avgDeviation =
        deviations.reduce((a, b) => a + b, 0) / deviations.length;
      if (avgDeviation <= 0.5) categoryScore = 3; // Muy consistente
      else if (avgDeviation <= 1)
        categoryScore = 2; // Moderadamente consistente
      else categoryScore = 1; // Poco consistente
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

  // Calcular puntuación general ponderada
  let totalWeightedScore = 0;
  let totalWeight = 0;

  categoryAnalysis.forEach((analysis) => {
    if (analysis.validComparisons > 0) {
      totalWeightedScore += analysis.score * analysis.weight;
      totalWeight += analysis.weight;
    }
  });

  const finalScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 2;

  // Generar mensaje de análisis
  const getConsistencyLabel = (score) => {
    if (score >= 2.5) return "Muy consistente";
    if (score >= 1.5) return "Moderadamente consistente";
    return "Poco consistente";
  };

  // Identificar tendencias de calificación
  const biasAnalysis = analyzeBias(userId, userReviews, allReviews);

  return {
    finalScore,
    overallScore: Math.round(finalScore * 10) / 10,
    consistencyLabel: getConsistencyLabel(finalScore),
    categoryAnalysis: categoryAnalysis,
    reviewCount: userReviews.length,
    validComparisons: Math.min(
      ...categoryAnalysis.map((c) => c.validComparisons)
    ),
    biasAnalysis,
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
function calculateReliabilityScore(consistencyScore, reviewCount) {
  // Factores de confiabilidad
  const consistencyWeight = 0.7;
  const reviewCountWeight = 0.3;

  // Normalizar cantidad de reseñas (máximo 20 para puntaje completo)
  const normalizedReviewCount = Math.min(reviewCount, 20) / 20;

  // Normalizar consistencyScore a escala 0-1
  const normalizedConsistency = (consistencyScore - 1) / 2;

  const reliabilityScore =
    normalizedConsistency * consistencyWeight +
    normalizedReviewCount * reviewCountWeight;

  return Math.round(reliabilityScore * 100);
}
