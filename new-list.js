// TODO: \n on multiple entries for convenience

import clipboard from 'clipboardy'

const input = `
1. ДАлексиевич Кира Александровна (1 ост, 30.11)
2. ДБаранчук Давид Анатольевич (1 ост, 30.11)
3. ДВенско Александр Владимирович (1 ост, 30.11)
4. ДГордиевич Захар Олегович (1 ост, 30.11)
5. ДГречка Евгений Дмитриевич (1 ост, 30.11)
6. ДКиселев Глеб Денисович (1 ост, 30.11)
7. ДКулик Алексей Александрович (1 ост, 30.11)
8. ДЛевонюк Дарья Антоновна (1 ост, 30.11)
9. ДПильщикова Алиса Дмитриевна (1 ост, 30.11)
10. ДСачко Матвей Романович (1 ост, 30.11)
11. ДТроцюк София Максимовна (0 ост)
12. ДТурченок Артём Ярославович (1 ост, 30.11)
13. ДЯкунова Эмилия Эльдаровна (1 ост, 30.11)
14. ДЯчник Арсений Александрович (1 ост, 30.11)
`

const entries = input.split('\n')
if (entries[0].trim() === '') {
  entries.shift()
}
if (entries[entries.length - 1].trim() === '') {
  entries.pop()
}

const outputEntries = []
const regex = /\p{L}+ \p{L}+/u
for (const entry of entries) {
  const match = entry.match(regex)
  if (match) {
    outputEntries.push(match[0])
  }
}
const regexDeleteD = /^д/i
for (let i = 0; i < outputEntries.length; i++) {
  let entry = outputEntries[i]
  const match = entry.match(regexDeleteD)
  if (match) {
    outputEntries[i] = entry.slice(1)
  }
}

// Заджоинить
const output = outputEntries.join(', ')

// Вывести и скопировать в буфер обмена
console.log(output)
await clipboard.write(output);