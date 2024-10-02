import React from 'react'

const celular = () => {
  return (
    <div>celular
         <form action="#" className=' w-[283px] h-[642px] m-8 bg-[#FFFFFF] items-center justify-center'>
            <h1  className='font-bold font-goldplay text-center'>Iniciar Sesión</h1>
            <div>
                <input type="text" name="Username" required />
            </div>
            <div className=''> 
                <input type="password" name="password" required />
            </div>
            <div className=''>
                <label><input type="checkbox" />Remember me</label>
                <a href="#"> Forgot Password?</a>
            </div>
            <button type="submit">Sing In </button>
            <div>

            </div>
        </form>
    </div>
  )
}

export default celular