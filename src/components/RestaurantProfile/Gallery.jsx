import React, { useState } from "react";
import Borojo from "../../assets/User/choco.jpg";
import Comida from "../../assets/User/comida.jfif";
import Mariscos from "../../assets/User/mariscos.jfif";
import Jaiba from "../../assets/User/jaiba.jpg";
import Pastel from "../../assets/User/pastel.webp";
import Bocachico from "../../assets/User/bocachico.jfif";


// Datos iniciales de fotos, perfil y banner
const initialPhotos = [
  { id: 1, src: Borojo, alt: "Borojo", likes: 25, dislikes: 3, description: "Delicioso borojo", comments: [] },
  { id: 2, src: Comida, alt: "Comida", likes: 18, dislikes: 2, description: "Comida tradicional", comments: [] },
  { id: 3, src: Mariscos, alt: "Mariscos", likes: 34, dislikes: 1, description: "Mariscos frescos", comments: [] },
  { id: 4, src: Jaiba, alt: "Jaiba", likes: 12, dislikes: 0, description: "Jaiba deliciosa", comments: [] },
  { id: 5, src: Pastel, alt: "Pastel", likes: 45, dislikes: 4, description: "Pastel de Arroz con Pollo", comments: [] },
  { id: 6, src: Bocachico, alt: "Bocachico", likes: 29, dislikes: 3, description: "Pescado bocachico", comments: [] },
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Estado para el modal de fotos
  const [modalType, setModalType] = useState(""); // Identifica si es un modal de perfil, banner, historia o foto

  // Función para abrir el modal con la foto seleccionada
  const openModal = (photo, type) => {
    setSelectedPhoto(photo);
    setModalType(type); // Define el tipo de modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedPhoto(null);
    setModalType("");
  };

  return (
    <div className="w-full">

      {/* Grid de Historias destacadas */}
      <h2 className="text-center mt-6 text-xl font-semibold">Historias destacadas</h2>
      <div className="flex gap-4 justify-center mt-4">
        {initialPhotos.slice(0, 5).map((photo) => (
          <div
            key={photo.id}
            className="w-24 h-24 rounded-full overflow-hidden cursor-pointer"
            onClick={() => openModal(photo, "historia")}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Grid de fotos subidas */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {initialPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer"
            onClick={() => openModal(photo, "foto")}
          >
            <img src={photo.src} alt={photo.alt} className="aspect-square w-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg">❤️ {photo.likes} | 👎 {photo.dislikes}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal reutilizable */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative w-11/12 md:w-1/2 lg:w-1/3">
            <button
              className="absolute top-2 right-2 text-xl text-gray-600"
              onClick={closeModal}
            >
              &#10005;
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-full h-auto rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{selectedPhoto.alt}</h2>
            <p className="text-gray-600">{selectedPhoto.description}</p>
            <div className="flex justify-between mt-4">
              <p>❤️ Likes: {selectedPhoto.Likes}</p>
              <p>👎 Dislikes: {selectedPhoto.Dislikes}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comentarios:</h3>
              <ul className="mt-2">
                {selectedPhoto.comments.length > 0 ? (
                  selectedPhoto.comments.map((comment, index) => (
                    <li key={index} className="text-gray-700">
                      {comment}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No hay comentarios aún.</p>
                )}
              </ul>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Escribe un comentario..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <button className="mt-2 w-full bg-principal text-white py-2 rounded-md" type="submit">
                Comentar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
