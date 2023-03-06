import { MonthsAvailableType } from "../types"


const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"]
const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const monthForNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
const monthNumberForArray = ["0" ,"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const funcionDate = () => {
    const date = new Date()
    return `${days[date.getDay()]},${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}
export const functionDateConvert = (date: Date) => {
    return `${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`
}

export const MonthsAvailable = () => {
    const date = new Date()
    const monthOnNumber = monthNumber[date.getMonth()]
    console.log(months.slice(0,parseInt(monthOnNumber)))
    return months.slice(0,parseInt(monthOnNumber))
}
export const MothsAvailableForGraphics = () => {
    const date = new Date()
    const monthsAvailable:MonthsAvailableType[] = []
    let count = 0
    months.map((month, index) => {
        if(count <= date.getMonth()) {
            count = count + 1
            const currentMonth:MonthsAvailableType = {
                id: index+1,
                nameMonth: month
            }
            monthsAvailable.push(currentMonth)
        }
    })
    return monthsAvailable
}

export const currentMonth = () => {
    const date = new Date()
    return months[date.getMonth()]
}
// currentMonth()
// MonthsAvailable()
// MothsAvailableForGraphics()