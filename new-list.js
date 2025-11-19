import clipboard from 'clipboardy'

// 1. regexp на три слова, разделённых пробелом
// 2. если две буквы Д, то убрать первую

const str = `
1. ДАдамчук Александр Игоревич (0 ост)
2. ДАндреянцева Маргарита Игоревна (2 ост, 26.11)
3. ДБурда Анастасия Денисовна (2 ост, 26.11)
4. ДДылюк Мария Руслановна (2 ост, 26.11)
5. ДЗаруба Матвей Витальевич (2 ост, 26.11)
6. ДКальман Валерия Денисовна (2 ост, 26.11)
7. ДКононюк Мария Сергеевна (0 ост)
8. ДЛевчук Михаил Валерьевич заплатят 20 (0 ост)
9. ДНовик Михаил Александрович (2 ост, 26.11)
10. ДПарфенюк Иван Дмитриевич (2 ост, 26.11)
11. ДСавчук Кирилл Викторович платят 13 (2 ост, 26.11)
12. ДСтефаник Дмитрий Сергеевич (2 ост, 26.11)
13. Саливончик Кирилл Анатольевич (0 ост)
`

const entries = str.split('\n')
if (entries[0].trim() === '') {
  entries.shift()
}
if (entries[entries.length - 1].trim() === '') {
  entries.pop()
}

const newEntries = []
const regex = /\p{L}+ \p{L}+ \p{L}+/u
for (const entry of entries) {
  const match = entry.match(regex)
  if (match) {
    newEntries.push(match[0])
  }
}

console.log('-------------------------------------')
const regexDeleteD = /^д/i

for (let i = 0; i < newEntries.length; i++) {
  let ent = newEntries[i]
  const match = ent.match(regexDeleteD)
  if (match) {
    newEntries[i] = ent.slice(1)
  }
}

// Оставить только Фамилия Имя
const regexLeaveSurnameName = /\p{L}+ \p{L}+/u
const newEntries2 = []
for (const entry of newEntries) {
  const match = entry.match(regexLeaveSurnameName)
  if (match) {
    newEntries2.push(match[0])
  }
}

// Заджоинить
const finalStr = newEntries2.join(', ')

console.log(finalStr)

await clipboard.write(finalStr);