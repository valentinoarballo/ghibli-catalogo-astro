import React, { useState } from 'react'

export default function Buscador({ films }) {

    const [query, setQuery] = useState("")
    const [director, setDirector] = useState("todos")

    const directores = [... new Set(films.map((f) => f.director))]

    const filtrados = films.filter(
        (f) =>
            f.title.toLowerCase().includes(query.toLowerCase()) &&
            (director === "todos" || f.director === director)
    )

    return (
        <div>
            <div className='mb-6 flex flex-row gap-3'>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Buscar por titulo...'
                    className=' w-full rounded-2xl bg-zinc-900 px-4 py-2'
                />
                <select
                    onChange={(e) => setDirector(e.target.value)}
                    value={director}
                    className='rounded-2xl bg-zinc-900 px-4 py-2'
                >
                    <option value={"todos"}>
                        Todos los directores
                    </option>
                    {
                        directores.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))
                    }
                </select>
            </div>

            <p> {filtrados.length} Películas </p>


            <div className='grid grid-cols-3 gap-4 p-5'>
                {filtrados.map((film) => (
                    <a href={`pelicula/${film.id}`} className="group block overflow-hidden rounded-xl bg-zinc-900 cursor-pointer transition-all hover:scale-101">
                        <img
                            transition:name={`img-${film.id}`}
                            src={film.image}
                            alt={film.image}
                            loading="lazy"
                            className="aspect-2/3 w-full object-cover"
                        />

                        <div className="p-3">
                            <h2 className="font-semibold group-hover:text-amber-400">
                                {film.title}
                            </h2>
                            <p className="text-sm text-zinc-400">
                                {film.release_date}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
