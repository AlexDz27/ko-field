import clipboard from 'clipboardy'

// 1. regexp на три слова, разделённых пробелом
// 2. если две буквы Д, то убрать первую

const str = `
1. ДАнтощенко Елизавета Михайловна (0 ост)
2. ДБич Никита Витальевич (0 ост)
3. ДБондарук Тимофей Николаевич (0 ост)
4. ДВасильев Глеб Алексеевич (0 ост)
5. ДГерасимук Максим Сергеевич (0 ост)
6. ДГригорчук Илья Сергеевич (0 ост)
7. ДДавидюк Дмитрий Сергеевич (0 ост)
8. ДКинчак Кирилл Романович (0 ост)
9. ДКлимук Пётр Николаевич (4 ост, 30.11)
10. ДКоверец Руслан Вадимович (0 ост)
11. ДНикитюк Артем Александрович (0 ост)
12. ДСамосюк Максим Васильевич (0 ост)
13. ДСеменюк Тихон Витальевич (4 ост, 30.11)
14. Павлючик Тимофей Игоревич (0 ост)
15. qwe
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