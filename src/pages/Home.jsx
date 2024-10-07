import FoddiesIcon from '../assets/icon/Foddies.png';

const Home = () => {
    return (
        <main className="fflex flex-col items-center justify-center max-w-[447px] h-[900px] p-4 bg-gray-50 shadow-lg rounded-lg ">
            <h1 className="text-4xl font-bold">
                ¡<span className="text-principal">Foddies</span> es tu app foodie favorita!
            </h1>
            <p className="text-lg text-gray-600 text-center mt-4">
                Encuentra restaurantes increíbles, lee reseñas honestas y comparte tus experiencias con otros amantes de la comida.
            </p>
            
            <p className="text-2xl font-semibold text-gray-800 mt-6 mb-8">
                Es fácil, divertido y delicioso!
            </p>

            <div className="space-y-4">
                <button className="bg-principal text-white font-semibold py-2 px-8 rounded-md hover:bg-pink-600 transition-all">
                    Registrarme
                </button>
                <button className="border border-principal text-principal font-semibold py-2 px-8 rounded-md hover:bg-pink-100 transition-all">
                    Iniciar Sesión
                </button>
            </div>

            <button className="bg-secundario text-white font-semibold py-2 px-6 mt-8 rounded-md flex items-center hover:bg-green-500 transition-all">
                <span className="mr-2">+</span>
                Crear Reseña
            </button>

            <span className='pt-10 w-24 h-auto'> <img src={FoddiesIcon} alt="foddiesIcon" /></span>

        </main>
    );
};

export default Home;
