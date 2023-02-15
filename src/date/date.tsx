

const months = ["enero","febrero","marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre","octubre", "noviembre", "diciembre"]

const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const funcionDate = () => {
    const date = new Date()
    console.log(date)
    console.log(date.getDate())
    console.log(date.getDay())
    console.log(date.getMonth())
    console.log(date.getFullYear())

    console.log(`${days[date.getDay()]},${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`)
    return `${days[date.getDay()]},${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}

console.log(funcionDate())