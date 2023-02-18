

const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"]
const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const funcionDate = () => {
    const date = new Date()
    return `${days[date.getDay()]},${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}
export const functionDateConvert = (date: Date) => {
    return `${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`
}
