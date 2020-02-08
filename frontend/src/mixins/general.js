export const capitalize = {
  methods: {
    capitalize ([first, ...rest], lowerRest = false) {
      return first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
    }
  }
}

export const notEmptyObject = {
  methods: {
    notEmptyObject (object) {
      return Object.keys(object).length
    }
  }
}

const dateTimeFormatOptions = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Berlin'
}

export const formatDateTime = {
  filters: {
    format (date, template) {
      if (!date) return

      const dateParts = new Intl.DateTimeFormat(document.documentElement.lang, dateTimeFormatOptions).formatToParts(new Date(date))

      for (const part of dateParts) {
        template = template.replace(new RegExp(`\\b${part.type}\\b`, 'g'), part.value)
      }

      return template.replace('dayPeriod', '')
    }
  }
}
