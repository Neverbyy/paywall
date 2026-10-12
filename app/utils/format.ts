const NBSP = ' '

export const formatPrice = (rub: number): string =>
  `${String(Math.round(rub)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}₽`

const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

export const formatDate = (iso: string): string => {
  const date = new Date(iso)
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}
