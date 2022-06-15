import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const _dateTimeInstance = (dt) => dayjs(dt, 'YYYY-MM-DD HH:mm:ss')
// 驗證傳入日期時間是否符合格式
// '2022-06-13 12:00:00' -> true

export function isFullDateTime(dt) {
  return _dateTimeInstance(dt).isValid()
}

// 將時間日期切分為日期及時間陣列
// 預設: '2022-06-13 12:00:00' -> ['2022-06-13', '12:00:00']
export function splitFullDateTimeAsDateAndTime(dt, { dateFormat = 'YYYY-MM-DD', timeFormat = 'HH:mm:ss' } = {}) {
  if (!isFullDateTime(dt)) {
    return Error(`${dt} 不是合規的日期時間格式`)
  }
  const formatDt = _formatDateTime(dt)
  return { date: formatDt(dateFormat), time: formatDt(timeFormat) }
}
// 格式化日期
function _formatDateTime(dt) {
  return (format) => _dateTimeInstance(dt).format(format)
}
