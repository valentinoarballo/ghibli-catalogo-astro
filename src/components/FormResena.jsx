import React, { useState } from 'react'
import { validarResena } from '../schemas/resena'

const inicial = { nombre: "", puntaje: "", comentario: "" }


export default function FormResena() {

    const [valores, setValores] = useState(inicial)
    const [resenas, setResenas] = useState([])
    const [errores, setErrores] = useState({})


    function handleChange(e) {
        const { name, value } = e.target
        setValores((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        const resultado = validarResena(valores)
        
        if (!resultado.ok) {
            setErrores(resultado.errores)
            return;
        }
        
        console.log(valores)

        setErrores({})
        setResenas((prev) => [{ ...valores, id: Date.now() }, ...prev])
        setValores(inicial)       

    }

    return (
        <section>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="nombre">nombre</label>
                    <input
                        value={valores.nombre}
                        onChange={handleChange}
                        className=''
                        type="text"
                        name='nombre'
                    />
                    { errores.nombre && <p>{errores.nombre}</p> }
                </div>


                <div>
                    <label htmlFor="puntaje">puntaje</label>
                    <input
                        value={valores.puntaje}
                        onChange={handleChange}
                        className=''
                        type="text"
                        name='puntaje'
                    />
                    { errores.puntaje && <p>{errores.puntaje}</p> }
                </div>


                <div>
                    <label htmlFor="comentario">comentario</label>
                    <input
                        value={valores.comentario}
                        onChange={handleChange}
                        className=''
                        type="text"
                        name='comentario'
                    />
                    { errores.comentario && <p>{errores.comentario}</p> }
                </div>

                <button type='submit'>
                    Enviar reseña
                </button>

            </form>


            {resenas.length > 0 && (
                <ul>
                    {resenas.map((r) => (
                        <li className='text-xl'>
                            <p>
                                {r.nombre} - {r.puntaje}
                            </p>
                            <p>
                                {r.comentario}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

        </section>
    )
}
