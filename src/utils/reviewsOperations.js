// import { mean, std, quantile } from "mathjs";
// import Sentiment from 'sentiment'; // Importamos Sentiment
// import { differenceInMonths, subMonths } from "date-fns";

// const sentiment = new Sentiment(); // Creamos una instancia de Sentiment



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

// // Función para calcular el perfil del comensal
// export function calculateUserProfile(user, reviews) {
//   const frequency = calculateFrequency(user.diningFrequency);
//   const experienceScore = calculateExperienceScore(reviews.length);
//   const consistencyScore = calculateConsistencyScore(reviews);

//   return (frequency + experienceScore + consistencyScore) / 3;
// }

// // Función para calcular el peso de una reseña
// export function calculateReviewWeight(review, userProfile) {
//   const qualityScore = calculateReviewQuality(review);
//   const dateScore = calculateDateScore(review.date);

//   return userProfile * 0.6 + qualityScore * 0.3 + dateScore * 0.1;
// }

// // Función para calcular la puntuación final de un restaurante
// export function calculateRestaurantScore(reviews, users) {
//   const weightedScores = reviews.map((review) => {
//     const userProfile = calculateUserProfile(users[review.userId], reviews);
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
//   return adjustForOutliers(finalScore, reviews);
// }

// // Función para asignar estrellas al restaurante
// export function assignStars(score, reviews) {
//   const sixMonthsAgo = subMonths(new Date(), 6);

//   const recentReviews = reviews.filter(
//     (review) => new Date(review.date) >= sixMonthsAgo
//   );

//   if (recentReviews.length < 30) {
//     return {
//       stars: 0,
//       message:
//         "Insuficientes reseñas recientes para asignar estrellas. Se requieren al menos 30 reseñas en los últimos 6 meses.",
//     };
//   }

//   if (score > 4.8) {
//     return {
//       stars: 3,
//       message: "Extraordinario. Una experiencia culinaria excepcional.",
//     };
//   } else if (score > 4.2) {
//     return {
//       stars: 2,
//       message: "Excelente. Vale la pena hacer un viaje especial para visitarlo.",
//     };
//   } else if (score > 3.5) {
//     return {
//       stars: 1,
//       message:
//         "Muy bueno en su categoría. Vale la pena una visita si estás en la zona.",
//     };
//   } else {
//     return {
//       stars: 0,
//       message:
//         "No califica para estrellas en este momento. Buena calidad, pero aún no alcanza el nivel para estrellas.",
//     };
//   }
// }

// // Calcula la puntuación de frecuencia de comidas fuera
// export function calculateFrequency(diningFrequency) {
//   if (diningFrequency <= 2) return 1;
//   if (diningFrequency <= 8) return 2;
//   return 3;
// }

// // Calcula la puntuación basada en la experiencia (número de reseñas)
// export function calculateExperienceScore(reviewCount) {
//   if (reviewCount <= 5) return 1;
//   if (reviewCount <= 20) return 2;
//   return 3;
// }

// // Calcula la puntuación de consistencia basada en la desviación estándar de las calificaciones
// export function calculateConsistencyScore(reviews) {
//   const ratings = reviews.map((review) => review.overallRating);
//   const standardDeviation = std(ratings);

//   if (standardDeviation < 0.5) return 3;
//   if (standardDeviation < 1) return 2;
//   return 1;
// }

// // Calcula la calidad de una reseña
// export function calculateReviewQuality(review) {
//   let score = 0;

//   if (review.text.length > 50) score += 0.5;
//   if (review.text.length > 150) score += 0.5;

//   const criteriaKeywords = [
//     "comida",
//     "servicio",
//     "ambiente",
//     "precio",
//     "sabor",
//     "presentación",
//   ];
//   const usedCriteria = criteriaKeywords.filter((keyword) =>
//     review.text.toLowerCase().includes(keyword)
//   );
//   score += Math.min(usedCriteria.length * 0.3, 2);

//   if (review.photos && review.photos.length > 0) score += 1;

//   return Math.min(score, 4);
// }

// // Calcula la puntuación basada en la fecha de la reseña
// export function calculateDateScore(reviewDate) {
//   const now = new Date();
//   const monthsDifference = differenceInMonths(now, reviewDate);

//   if (monthsDifference <= 3) return 1;
//   if (monthsDifference <= 6) return 0.8;
//   if (monthsDifference <= 12) return 0.6;
//   return 0.4;
// }

// // Ajusta la puntuación final considerando valores atípicos
// export function adjustForOutliers(score, reviews) {
//   const ratings = reviews.map((review) => review.overallRating);
//   const q1 = quantile(ratings, 0.25);
//   const q3 = quantile(ratings, 0.75);
//   const iqr = q3 - q1;
//   const lowerBound = q1 - 1.5 * iqr;
//   const upperBound = q3 + 1.5 * iqr;

//   const filteredRatings = ratings.filter(
//     (rating) => rating >= lowerBound && rating <= upperBound
//   );
//   const adjustedMean = mean(filteredRatings);

//   return score * 0.7 + adjustedMean * 0.3;
// }

// // Analiza el sentimiento de una reseña
// export function analyzeSentiment(text) {
//   return sentiment.analyze(text).score;
// }

// // Calcula la puntuación general de una reseña
// export function calculateOverallReviewScore(review, userProfile) {
//   const qualityScore = calculateReviewQuality(review);
//   const dateScore = calculateDateScore(review.date);
//   const sentimentScore = analyzeSentiment(review.text);

//   const rawScore =
//     review.overallRating * 0.4 +
//     qualityScore * 0.2 +
//     dateScore * 0.1 +
//     sentimentScore * 0.1 +
//     userProfile * 0.2;

//   return Math.max(0, Math.min(5, rawScore));
// }
