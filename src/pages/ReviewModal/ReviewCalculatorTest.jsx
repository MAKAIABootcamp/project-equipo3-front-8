import React, { useState } from 'react';
import { calculateUserProfile, calculateRestaurantScore, assignStars } from '../../utils/reviewsOperations'; // Ajusta el path de las funciones

const ReviewCalculatorTest = () => {
  // Ejemplo de usuarios y reseñas
  const [users] = useState({
    1: { diningFrequency: 5 },
    2: { diningFrequency: 10 },
  });

  const [reviews] = useState([
    {
      userId: 1,
      foodQuality: 4,
      service: 3.5,
      ambience: 4,
      valueForMoney: 3.5,
      overallRating: 4,
      text: 'La comida fue deliciosa, el servicio estuvo bien, pero el ambiente necesita mejorar.',
      date: new Date(),
      photos: ['photo1.jpg'],
    },
    {
      userId: 2,
      foodQuality: 5,
      service: 4,
      ambience: 4.5,
      valueForMoney: 4,
      overallRating: 4.5,
      text: 'Excelente comida y buen ambiente, pero el precio es un poco alto.',
      date: new Date(),
      photos: [],
    },
  ]);

  const userProfile1 = calculateUserProfile(users[1], reviews);
  const userProfile2 = calculateUserProfile(users[2], reviews);
  const restaurantScore = calculateRestaurantScore(reviews, users);
  const stars = assignStars(restaurantScore, reviews);

  return (
    <div>
      <h2>Resultados de Cálculos de Reseñas</h2>
      <p><strong>Perfil del Usuario 1:</strong> {userProfile1}</p>
      <p><strong>Perfil del Usuario 2:</strong> {userProfile2}</p>
      <p><strong>Puntuación del Restaurante:</strong> {restaurantScore}</p>
      <p><strong>Estrellas Asignadas:</strong> {stars.stars} - {stars.message}</p>
    </div>
  );
};

export default ReviewCalculatorTest;
