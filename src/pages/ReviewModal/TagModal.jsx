import { useState } from "react";
import PropTypes from "prop-types";

const availableTags = [
  { tag: "Sabor increíble", value: 5, category: "Calidad de la comida" },
  { tag: "Buenos precios", value: 4, category: "Relación calidad-precio" },
  { tag: "Ambiente acogedor", value: 4, category: "Ambiente y decoración" },
  {
    tag: "Servicio impecable",
    value: 5,
    category: "Servicio y atención al cliente",
  },
  { tag: "Innovación culinaria", value: 5, category: "Calidad de la comida" },
  { tag: "Presentación impecable", value: 4, category: "Calidad de la comida" },
  { tag: "Buena comida", value: 4, category: "Calidad de la comida" },
];

const TagModal = ({ onClose, selectedTags }) => {
  const [tags, setTags] = useState(selectedTags || []);

  const toggleTag = (tagObject) => {
    if (tags.some((t) => t.tag === tagObject.tag)) {
      setTags(tags.filter((t) => t.tag !== tagObject.tag));
    } else {
      setTags([...tags, tagObject]); // Guardamos el objeto completo
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <h2 className="text-2xl font-bold mb-4">Selecciona tu experiencia</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableTags.map((tagObj, index) => (
            <button
              key={tagObj.tag + index}
              type="button"
              className={`border px-4 py-2 rounded-full ${
                tags.some((t) => t.tag === tagObj.tag)
                  ? "bg-morazul text-white"
                  : "border-morazul text-purple-500"
              }`}
              onClick={() => toggleTag(tagObj)}
            >
              {tagObj.tag}
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
  selectedTags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TagModal;
