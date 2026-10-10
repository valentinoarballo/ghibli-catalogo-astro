import { z } from "zod";

export const resenaSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(1, "El nombre debe tener al menos un caracter"),
    puntaje: z.coerce
        .number()
        .int("El puntaje debe ser un numero entero")
        .min(1, "El puntaje minimo es 1")
        .max(10, "El puntaje maximo es 10"),
    comentario: z
        .string()
        .trim()
        .min(10, "El comentario debe tener al menos 10 caracteres")
        .max(300, "El comentario no puede superar los 300 caracteres")
})


export function validarResena(valores) {

    const resultados = resenaSchema.safeParse(valores)

    if (resultados.success) {
        return { ok: true, datos: resultados.data, errores: {} }
    }

    const errores = {}

    for (const issue of resultados.error.issues) {
        const campo = issue.path[0]
        if (!errores[campo]) errores[campo] = issue.message
    }

    return { ok: false, datos: null, errores }

}



