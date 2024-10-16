import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const StoryBorder = ({ size = 42, borderWidth = 2, rotationAngle = 0 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Ajustar el tamaño del canvas para alta resolución
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(dpr, dpr);

        const radius = size / 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const drawCircle = (angle) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar

            // Crear el gradiente con el ajuste para que el morado esté en la parte inferior izquierda y el rosa en la parte superior derecha
            const gradient = ctx.createLinearGradient(
                radius * (1 - Math.cos(Math.PI / 4)), // Coordenada ajustada para el morado en la parte inferior izquierda
                radius * (1 + Math.sin(Math.PI / 4)),
                radius * (1 + Math.cos(Math.PI / 4)), // Coordenada ajustada para el rosa en la parte superior derecha
                radius * (1 - Math.sin(Math.PI / 4))
            );

            gradient.addColorStop(0, '#9600ff'); // Morado en la parte inferior izquierda
            gradient.addColorStop(1, '#ff0066'); // Rosa en la parte superior derecha

            // Rotar el canvas para animar el gradiente
            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(angle);
            ctx.translate(-radius, -radius);

            // Dibujar el borde del círculo con el degradado
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.arc(radius, radius, radius - borderWidth / 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        };

        drawCircle(rotationAngle); // Dibuja el círculo con el ángulo actual

    }, [size, borderWidth, rotationAngle]);

    return <canvas ref={canvasRef} className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />;
};

StoryBorder.propTypes = {
    size: PropTypes.number,
    borderWidth: PropTypes.number,
    rotationAngle: PropTypes.number,
};

export default StoryBorder;
