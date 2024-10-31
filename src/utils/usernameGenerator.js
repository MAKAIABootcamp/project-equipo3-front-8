import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig"; // Ajusta la ruta si es necesario

// Función para generar un nombre de usuario único
export async function generateUniqueUsername(displayName) {
  // Eliminar espacios y caracteres especiales del nombre para crear un nombre de usuario base
  let baseUsername = displayName.replace(/\s+/g, "").toLowerCase();
  let username = baseUsername;
  let count = 0;

  // Verificar si el nombre de usuario ya existe en la base de datos de Firestore
  const userRef = collection(database, "users");
  let usernameExists = true;

  while (usernameExists) {
    const q = query(userRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // El nombre de usuario está disponible
      usernameExists = false;
    } else {
      // El nombre de usuario está en uso, se añade un número al nombre base para hacerlo único
      count++;
      username = `${baseUsername}${count}`;
    }
  }

  return username;
}
