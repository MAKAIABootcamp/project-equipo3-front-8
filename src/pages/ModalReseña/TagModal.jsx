import React, { useState } from 'react';
import PropTypes from 'prop-types';

const availableTags = [
  'Sabor increíble',
  'Buenos precios',
  'Ambiente acogedor',
  'Servicio impecable',
  'Innovación culinaria',
  'Presentación impecable',
  'buena comida'
];

const TagModal = ({ onClose, selectedTags }) => {
  const [tags, setTags] = useState(selectedTags || []);

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag)); // Des-selecciona si ya está seleccionado
    } else {
      setTags([...tags, tag]); // Agrega el tag
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <h2 className="text-2xl font-bold mb-4">Selecciona tu experiencia</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`border px-4 py-2 rounded-full ${
                tags.includes(tag)
                  ? 'bg-morazul text-white'
                  : 'border-morazul text-purple-500'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-principal text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600"
            onClick={() => onClose(tags)}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};

TagModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
};

export default TagModal;
