import FoddiesIcon from '../assets/icon/Foddies.png';
import LoginButton from './LoginButton';

const LeftAside = () => {
    return (
        <main
            className="flex flex-col-reverse justify-center flex-wrap content-stretch w-[350px] h-[900px] p-0 bg-gray-50 shadow-lg  text-grey-dim font-titulo"
        >
            <div className='pt-[0px] pr-[32px] pb-[0px] pl-[32px] space-y-4 '>
                
                <h1 className="text-[36px] font-bold leading-1.2 text-left" >
                    ¡<span className="text-principal">Foddies</span> es tu app foodie favorita!
                </h1>
                

                <p className="text-[22px] leading-1.2 font-normal">
                    Encuentra restaurantes increíbles, lee reseñas honestas y comparte tus experiencias con otros amantes de la comida.
                </p>
                <div>
                    <p className="font-bold leading-1.2">
                        ¡Es fácil, divertido y delicioso!
                    </p>
                </div>

                <div className="space-y-4 flex flex-col flex-nowrap content-stretch font-bold">
                    <button className="bg-principal text-white py-2 px-8 rounded-[4px] hover:bg-pink-600 transition-all">
                        Registrarme
                    </button>
                    <LoginButton/>
                    {/* <button className="border border-principal text-principal  py-2 px-8 rounded-[4px] hover:bg-pink-100 transition-all">
                        Iniciar Sesión
                    </button> */}
                </div>

                {/* Icono de Foddies */}
                <span className="flex justify-center pt-12">
                    <img src={FoddiesIcon} alt="Foddies Icon" className="w-[167px] h-[56px]" />
                </span>
            </div>
        </main>
    );
};

export default LeftAside;