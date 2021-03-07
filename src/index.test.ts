import JsonCalendar from './index'

test('exports a class', () => {
  const subject = new JsonCalendar()
  expect(subject instanceof JsonCalendar).toBe(true)
})

test('has day names', () => {
  const subject = new JsonCalendar()
  expect(Array.isArray(subject.dayNames)).toBe(true)
  expect(typeof subject.dayNames[0].name).toBe('string')
})

test('has month names', () => {
  const subject = new JsonCalendar()
  expect(Array.isArray(subject.monthNames)).toBe(true)
})

test("has today's date", () => {
  const today = new Date()
  const subject = new JsonCalendar()
  expect(subject.today instanceof Date).toBe(true)
  expect(subject.today.getFullYear()).toBe(today.getFullYear())
  expect(subject.today.getHours()).toBe(0)
  expect(subject.today.getMinutes()).toBe(0)
  expect(subject.today.getHours()).toBe(0)
})

test('uses given today param', () => {
  const today = new Date(2018, 12, 31, 0, 0)
  const calendar = new JsonCalendar({ today })
  expect(calendar.today instanceof Date).toBe(true)
  expect(calendar.today.getFullYear()).toBe(today.getFullYear())
  expect(calendar.today.getMonth()).toBe(today.getMonth())
  expect(calendar.today.getHours()).toBe(0)
  expect(calendar.today.getMinutes()).toBe(0)
  expect(calendar.today.getHours()).toBe(0)
})

test('uses given today param and abbr', () => {
  const today = new Date(2018, 12, 31, 0, 0)
  const calendar = new JsonCalendar({ abbreviate: 0, today })
  expect(calendar.options.abbreviate).toBe(0)
  expect(calendar.dayNames[0]).toEqual({ name: 'Sunday' })
})

test('uses given today param, language, and abbr', () => {
  const today = new Date(2018, 12, 31, 0, 0)
  const calendar = new JsonCalendar({
    abbreviate: 3,
    languageCode: 'fr',
    today
  })
  expect(calendar.options.abbreviate).toBe(3)
  expect(calendar.dayNames[0]).toEqual({ abbr: 'Dim', name: 'Dimanche' })
})

test('has week arrays with 7 days', () => {
  const subject = new JsonCalendar()
  const lastWeekIndex = subject.weeks.length - 1
  expect(subject.weeks[0].length).toBe(7)
  expect(subject.weeks[lastWeekIndex].length).toBe(7)
  expect(typeof subject.weeks[1][1].className).toBe('string')
})

test('displays October 2018 correctly', () => {
  const today = new Date(2018, 12, 1, 0, 0)
  const calendar = new JsonCalendar({ year: 2018, monthIndex: 9, today })
  expect(calendar.weeks[0][0].day).toBe(30)
  expect(calendar.weeks[0][0].date.getMonth()).toBe(8)
  expect(calendar.weeks[0][1].day).toBe(1)
  expect(calendar.weeks[0][1].date.getMonth()).toBe(9)
})

test('accepts change month', () => {
  const calendar = new JsonCalendar()
  calendar.changeMonth(2019, 3)
  expect(calendar.options.monthIndex).toBe(3)
  expect(calendar.options.year).toBe(2019)
})

describe('uses firstDayOfWeek param', () => {
  test('month starts on correct day when firstDayOfWeek is 0', () => {
    const calendar = new JsonCalendar({
      year: 2019,
      monthIndex: 1,
      firstDayOfWeek: 0
    })

    expect(calendar.options.firstDayOfWeek).toBe(0)
    expect(calendar.weeks[0][0].day).toBe(27)
  })

  test('month starts on correct day when firstDayOfWeek is 1', () => {
    const calendar = new JsonCalendar({
      year: 2019,
      monthIndex: 1,
      firstDayOfWeek: 1
    })

    expect(calendar.options.firstDayOfWeek).toBe(1)
    expect(calendar.weeks[0][0].day).toBe(28)
  })
})

describe('language parameter in constructor', () => {
  test('constructor optionally accepts a language', () => {
    let calendar = new JsonCalendar({ languageCode: 'fr' })
    expect(calendar.options.languageCode).toBe('fr')

    calendar = new JsonCalendar()
    expect(calendar.options.languageCode).toBe('en')
  })

  test('optional language param accept french or spanish, otherwise defaults to english', () => {
    let calendar = new JsonCalendar({ languageCode: 'es' })
    expect(calendar.options.languageCode).toBe('es')

    calendar = new JsonCalendar({ languageCode: 'fr' })
    expect(calendar.options.languageCode).toBe('fr')

    calendar = new JsonCalendar({ languageCode: 'esperanto' })
    expect(calendar.options.languageCode).toBe('en')
  })
})

describe('language for months name', () => {
  test('should return french month names', () => {
    const calendar = new JsonCalendar({ languageCode: 'fr' })

    const janvier = calendar.getMonthName(0)
    const fevrier = calendar.getMonthName(1)
    const mars = calendar.getMonthName(2)
    const avril = calendar.getMonthName(3)
    const mai = calendar.getMonthName(4)
    const juin = calendar.getMonthName(5)
    const juillet = calendar.getMonthName(6)
    const aout = calendar.getMonthName(7)
    const septembre = calendar.getMonthName(8)
    const octobre = calendar.getMonthName(9)
    const novembre = calendar.getMonthName(10)
    const decembre = calendar.getMonthName(11)

    expect(janvier).toBe('Janvier')
    expect(fevrier).toBe('Février')
    expect(mars).toBe('Mars')
    expect(avril).toBe('Avril')
    expect(mai).toBe('Mai')
    expect(juin).toBe('Juin')
    expect(juillet).toBe('Juillet')
    expect(aout).toBe('Août')
    expect(septembre).toBe('Septembre')
    expect(octobre).toBe('Octobre')
    expect(novembre).toBe('Novembre')
    expect(decembre).toBe('Décembre')

    expect(calendar.monthNames).toEqual(
      expect.arrayContaining([
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ])
    )
  })

  test('should return spanish month name', () => {
    const calendar = new JsonCalendar({ languageCode: 'es' })

    const enero = calendar.getMonthName(0)
    const febrero = calendar.getMonthName(1)
    const marzo = calendar.getMonthName(2)
    const abril = calendar.getMonthName(3)
    const mayo = calendar.getMonthName(4)
    const junio = calendar.getMonthName(5)
    const julio = calendar.getMonthName(6)
    const agosto = calendar.getMonthName(7)
    const septiembre = calendar.getMonthName(8)
    const octubre = calendar.getMonthName(9)
    const noviembre = calendar.getMonthName(10)
    const diciembre = calendar.getMonthName(11)

    expect(enero).toBe('Enero')
    expect(febrero).toBe('Febrero')
    expect(marzo).toBe('Marzo')
    expect(abril).toBe('Abril')
    expect(mayo).toBe('Mayo')
    expect(junio).toBe('Junio')
    expect(julio).toBe('Julio')
    expect(agosto).toBe('Agosto')
    expect(septiembre).toBe('Septiembre')
    expect(octubre).toBe('Octubre')
    expect(noviembre).toBe('Noviembre')
    expect(diciembre).toBe('Diciembre')

    expect(calendar.monthNames).toEqual(
      expect.arrayContaining([
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ])
    )
  })

  test('should return english month name', () => {
    // by default => english
    const calendar = new JsonCalendar()

    const january = calendar.getMonthName(0)
    const february = calendar.getMonthName(1)
    const march = calendar.getMonthName(2)
    const april = calendar.getMonthName(3)
    const may = calendar.getMonthName(4)
    const june = calendar.getMonthName(5)
    const july = calendar.getMonthName(6)
    const august = calendar.getMonthName(7)
    const septembre = calendar.getMonthName(8)
    const octobre = calendar.getMonthName(9)
    const novembre = calendar.getMonthName(10)
    const decembre = calendar.getMonthName(11)

    expect(january).toBe('January')
    expect(february).toBe('February')
    expect(march).toBe('March')
    expect(april).toBe('April')
    expect(may).toBe('May')
    expect(june).toBe('June')
    expect(july).toBe('July')
    expect(august).toBe('August')
    expect(septembre).toBe('September')
    expect(octobre).toBe('October')
    expect(novembre).toBe('November')
    expect(decembre).toBe('December')

    expect(calendar.monthNames).toEqual(
      expect.arrayContaining([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ])
    )
  })
})

describe('language for day name', () => {
  test('should return french day names', () => {
    const calendar = new JsonCalendar({ languageCode: 'fr' })

    const dimanche = calendar.getDayName(0)
    const lundi = calendar.getDayName(1)
    const mardi = calendar.getDayName(2)
    const mercredi = calendar.getDayName(3)
    const jeudi = calendar.getDayName(4)
    const vendredi = calendar.getDayName(5)
    const samedi = calendar.getDayName(6)

    expect(dimanche).toBe('Dimanche')
    expect(lundi).toBe('Lundi')
    expect(mardi).toBe('Mardi')
    expect(mercredi).toBe('Mercredi')
    expect(jeudi).toBe('Jeudi')
    expect(vendredi).toBe('Vendredi')
    expect(samedi).toBe('Samedi')
  })

  test('should return spanish day abbr', () => {
    const calendar = new JsonCalendar({ languageCode: 'es' })

    const domingo = calendar.getDayAbbr(0)
    const lunes = calendar.getDayAbbr(1)
    const martes = calendar.getDayAbbr(2)
    const miercole = calendar.getDayAbbr(3)
    const jueves = calendar.getDayAbbr(4)
    const viernes = calendar.getDayAbbr(5)
    const sabado = calendar.getDayAbbr(6)
    const nada = calendar.getDayAbbr(9)

    expect(domingo).toBe('Do')
    expect(lunes).toBe('Lu')
    expect(martes).toBe('Ma')
    expect(miercole).toBe('Mi')
    expect(jueves).toBe('Ju')
    expect(viernes).toBe('Vi')
    expect(sabado).toBe('Sá')
    expect(nada).toBe('')
  })

  test('should return spanish day names', () => {
    const calendar = new JsonCalendar({ languageCode: 'es' })

    const domingo = calendar.getDayName(0)
    const lunes = calendar.getDayName(1)
    const martes = calendar.getDayName(2)
    const miercole = calendar.getDayName(3)
    const jueves = calendar.getDayName(4)
    const viernes = calendar.getDayName(5)
    const sabado = calendar.getDayName(6)

    expect(domingo).toBe('Domingo')
    expect(lunes).toBe('Lunes')
    expect(martes).toBe('Martes')
    expect(miercole).toBe('Miércoles')
    expect(jueves).toBe('Jueves')
    expect(viernes).toBe('Viernes')
    expect(sabado).toBe('Sábado')
  })

  test('should return english day names', () => {
    // by default => english
    const calendar = new JsonCalendar()

    const sunday = calendar.getDayName(0)
    const monday = calendar.getDayName(1)
    const tuesday = calendar.getDayName(2)
    const wednesday = calendar.getDayName(3)
    const thursday = calendar.getDayName(4)
    const friday = calendar.getDayName(5)
    const saturday = calendar.getDayName(6)

    expect(sunday).toBe('Sunday')
    expect(monday).toBe('Monday')
    expect(tuesday).toBe('Tuesday')
    expect(wednesday).toBe('Wednesday')
    expect(thursday).toBe('Thursday')
    expect(friday).toBe('Friday')
    expect(saturday).toBe('Saturday')
  })
})
