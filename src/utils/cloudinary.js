export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tu_preset'); // Configura tu preset
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload`, {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return data.secure_url;
};
  