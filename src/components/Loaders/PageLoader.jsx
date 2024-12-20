import SpinerIcon from '../../assets/icons/loaders/loading_icon.svg'
import '../../Styles/utils/_animations.css'

const PageLoader = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center flex-col'>

            <figure className="w-28 text-principal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" id="Ico_Negro" viewBox="0 0 283.54 294.62">
                    <path id="Cuadro_de_icon" d="M64.23 52.9h99.54c30.65 0 55.53 24.88 55.53 55.53v133.28H64.23V52.9Z" style={{ fill: 'none', stroke: 'currentColor', strokeMiterlimit: 10, strokeWidth: '3px' }} />
                    <g id="Hamburguesa">
                        <path d="M143.75 90.46h.97c.64 0 1.16.52 1.16 1.16v83.34c0 .64-.52 1.16-1.16 1.16h-.97c-3.37 0-6.11-2.74-6.11-6.11V96.56c0-3.37 2.74-6.11 6.11-6.11Z" transform="rotate(-90 141.77 133.29)" />
                        <path d="M149.08 61.8h1.67c1.04 0 1.88.84 1.88 1.88v81.91c0 1.04-.84 1.88-1.88 1.88h-1.67c-10.03 0-18.17-8.14-18.17-18.17V79.98c0-10.03 8.14-18.17 18.17-18.17Z" transform="rotate(90 141.77 104.63)" />
                        <rect width="4.32" height="38.88" x="152.03" y="68.61" rx="2.16" ry="2.16" transform="rotate(35.34 154.1789249 88.03191971)" />
                        <path d="M163.75 76.3c0-.66 6.84 3.33 6.84 3.24 0 .1 6.84.44 6.84 3.24 0-1.46-11.62-.75-11.62 2.63 0 2.4-11.62 5.88-11.62 2.63 0-.24 4.78-8.79 4.78-5.87 0 .28 4.78-6.43 4.78-5.87Z" />
                    </g>
                    <g id="Estrellas">
                        <path d="m141.77 155.36 1.96 3.97 4.37.63-3.17 3.09.75 4.35-3.91-2.05-3.91 2.05.74-4.35-3.16-3.09 4.37-.63 1.96-3.97zM123.52 155.36l1.95 3.97 4.38.63-3.17 3.09.75 4.35-3.91-2.05-3.91 2.05.74-4.35-3.16-3.09 4.37-.63 1.96-3.97zM159.48 155.36l1.96 3.97 4.37.63-3.16 3.09.74 4.35-3.91-2.05-3.91 2.05.74-4.35-3.16-3.09 4.37-.63 1.96-3.97z" />
                    </g>
                    <g id="Textos">
                        <rect width="85.67" height="5.76" x="98.94" y="185.36" rx="2.88" ry="2.88" />
                        <rect width="57.27" height="5.76" x="113.13" y="199.4" rx="2.88" ry="2.88" />
                    </g>
                </svg>
            </figure>


            <SpinerIcon className='loaderSpin'/>

        </div>
    )
}

export default PageLoader