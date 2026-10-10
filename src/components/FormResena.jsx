import { useState } from 'react';

const inicial = { nombre: '', puntaje: '', comentario: '' };

const campo =
  'w-full border-b border-zinc-800 bg-transparent py-2 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-amber-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';
const etiqueta = 'mb-1 block text-xs uppercase tracking-wider text-zinc-500';

export default function FormResena() {
  const [valores, setValores] = useState(inicial);
  const [resenas, setResenas] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setResenas((prev) => [{ ...valores, id: Date.now() }, ...prev]);
    setValores(inicial);
  }

  return (
    <section className="w-full">
      <h2 className="my-6 text-xl font-light tracking-tight">Dejá tu reseña</h2>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="nombre" className={etiqueta}>Nombre</label>
            <input
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={valores.nombre}
              onChange={handleChange}
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="puntaje" className={etiqueta}>Puntaje</label>
            <input
              id="puntaje"
              name="puntaje"
              type="number"
              placeholder="De 1 a 10"
              value={valores.puntaje}
              onChange={handleChange}
              className={campo}
            />
          </div>
        </div>

        <div>
          <label htmlFor="comentario" className={etiqueta}>Comentario</label>
          <textarea
            id="comentario"
            name="comentario"
            rows={3}
            placeholder="¿Qué te pareció?"
            value={valores.comentario}
            onChange={handleChange}
            className={`${campo} resize-none`}
          />
        </div>

        <div className="flex sm:justify-end">
          <button
            type="submit"
            className="w-full rounded-full border border-zinc-700 px-6 py-2 text-sm text-zinc-300 transition hover:border-amber-400 hover:text-amber-400 sm:w-auto"
          >
            Enviar reseña
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
          Reseñas · {resenas.length}
        </h3>

        {resenas.length === 0 ? (
          <p className="py-6 text-sm text-zinc-600">
            Todavía no hay reseñas.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-800/60">
            {resenas.map((r) => (
              <li key={r.id} className="py-4">
                <p className="text-sm text-zinc-400">
                  <span className="text-zinc-200">{r.nombre || 'Anónimo'}</span>
                  <span className="mx-2 text-zinc-700">·</span>
                  <span className="text-amber-400/80">⭐ {r.puntaje || '–'}/10</span>
                </p>
                <p className="mt-1 break-words font-light leading-relaxed text-zinc-400">
                  {r.comentario}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}