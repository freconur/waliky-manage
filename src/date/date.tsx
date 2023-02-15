

const months = ["enero","febrero","marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre","octubre", "noviembre", "diciembre"]

const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const funcionDate = () => {
    const date = new Date()
    return `${days[date.getDay()]},${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}
