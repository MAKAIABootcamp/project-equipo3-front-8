import UserAvatarAlt from '../../../assets/icons/core/person_icon_filled.svg'; // Ícono de usuario de respaldo
import StoryBorder from '../Storys/StoryBorder';
import useRotationAnimation from '../../../hooks/useRotationAnimation';
import PropTypes from 'prop-types';
import { useState } from 'react';

const UserAvatar = ({ srcAvatar, size = 42, showStoryBorder = false }) => {
    const { rotationAngle, startAnimation, stopAnimation } = useRotationAnimation();
    const [hasError, setHasError] = useState(false); // Estado para manejar errores de carga

    return (
        <div className={`flex relative overflow-hidden items-center justify-center rounded-full mr-3`} style={{ width: size, height: size }}>
            {showStoryBorder && <StoryBorder rotationAngle={rotationAngle} size={size} />}
            <figure
                className="cursor-pointer rounded-full bg-grey-basic flex items-center justify-center"
                onMouseEnter={startAnimation}
                onMouseLeave={stopAnimation}
                style={{ width: size * 0.76, height: size * 0.76 }} // Tamaño del avatar (32px de 42px)
            >
                {hasError ? (
                    <UserAvatarAlt size={size * 0.76} className="text-grey-dim" /> // Icono de respaldo
                ) : (
                    <img
                        src={srcAvatar}
                        alt="User Avatar"
                        className="rounded-full w-full h-full object-cover"
                        crossOrigin="anonymous"
                        draggable="false"
                        onError={() => setHasError(true)} // Maneja el error de carga
                    />
                )}
            </figure>
        </div>
    );
};

UserAvatar.propTypes = {
    srcAvatar: PropTypes.string.isRequired,
    size: PropTypes.number,
    showStoryBorder: PropTypes.bool,
};

export default UserAvatar;
