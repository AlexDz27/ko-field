import clipboard from 'clipboardy'

// 1. regexp на три слова, разделённых пробелом
// 2. если две буквы Д, то убрать первую

const str = `
1. ДБришен Федор Михайлович (2 ост, 27.11)
2. ДБыстров Александр Сергеевич (0 ост)
3. ДКарпин Роман Денисович (2 ост, 27.11)
4. ДКлимук Дмитрий Андреевич (2 ост, 27.11)
5. ДКолодинский Тимофей Юрьевич 15 плятат (0 ост)
6. ДКолодич Маргарита Вадимовна (3 ост, 27.11)
7. ДКурашевич Анастасия Юрьевна платят 14 (2 ост, 27.11)
8. ДЛеонюк Михаил Олегович (2 ост, 27.11)
9. ДПильчук Оливия Ильинична (2 ост, 27.11)
10. ДСухаревич Кира Юрьевна (2 ост, 27.11)
11. ДТрубчик Мия Максимовна (2 ост, 27.11)
12. ДХмельницкий Гордей Витальевич (2 ост, 27.11)
13. ДШикун София Максимовна заплатят 20 (0 ост)
14. Куняшевич Илья Витальевич (0 ост)
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