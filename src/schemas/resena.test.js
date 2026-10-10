import { describe, it, expect } from 'vitest';
import { validarResena } from './resena.js';

const valido = {
  nombre: 'Ana',
  puntaje: '9',
  comentario: 'Una película preciosa y emotiva',
};

describe('validarResena', () => {
  it('acepta datos válidos y convierte el puntaje a número', () => {
    const r = validarResena(valido);
    expect(r.ok).toBe(true);
    expect(r.datos.puntaje).toBe(9);
  });

  it('rechaza un nombre demasiado corto', () => {
    const r = validarResena({ ...valido, nombre: '' });
    expect(r.ok).toBe(false);
    expect(r.errores.nombre).toMatch("El nombre debe tener al menos un caracter");
  });

  it('rechaza puntajes fuera de rango', () => {
    expect(validarResena({ ...valido, puntaje: '0' }).errores.puntaje).toBeDefined();
    expect(validarResena({ ...valido, puntaje: '11' }).errores.puntaje).toBeDefined();
  });

  it('rechaza un comentario corto', () => {
    const r = validarResena({ ...valido, comentario: 'Linda' });
    expect(r.errores.comentario).toMatch(/al menos 10/);
  });
});