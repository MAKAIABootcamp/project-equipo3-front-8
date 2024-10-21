import StoryBorder from '../Storys/StoryBorder';
import useRotationAnimation from '../../../hooks/useRotationAnimation';
import PropTypes from 'prop-types';

const UserAvatar = ({ srcAvatar, size = 42, showStoryBorder = false }) => {
    const { rotationAngle, startAnimation, stopAnimation } = useRotationAnimation();

    return (
        <div className={`flex relative overflow-hidden items-center justify-center rounded-full mr-3`} style={{ width: size, height: size }}>
            {showStoryBorder && <StoryBorder rotationAngle={rotationAngle} size={size} />} 
            <figure
                className="cursor-pointer rounded-full bg-grey-basic"
                onMouseEnter={startAnimation}
                onMouseLeave={stopAnimation}
                style={{ width: size * 0.76, height: size * 0.76 }} // Tamaño del avatar (32px de 42px)
                >
                <img
                    src={srcAvatar}
                    alt="User Avatar"
                    className="rounded-full static w-full h-full object-cover"
                    crossOrigin="anonymous"
                    draggable="false"
                // Asegura que no haya espacio en la parte inferior
                />
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
