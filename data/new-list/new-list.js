// TODO: мб сделать, чтоб более нормально аутпутились фамилии-имена: чтоб не было запятых лишних 
// (сделать таким образом аутпут компактнее) 
// TODO: new-list.txt тоже чтоб склеивало
// TODO (pos): сделать тесты (что совпадает количество и данные из robox (функциональный))
// TODO (pos): попереименовывать переменные, вспоминая правило "Слишком большая ответственность"?
// например, entries в таком случае будет inputItems?

import clipboard from 'clipboardy'

const input = `
1. ДАнтощенко Елизавета Михайловна (1 ост, 25.01)
2. ДБич Никита Витальевич (1 ост, 25.01)
3. ДБондарук Тимофей Николаевич (1 ост, 25.01)
4. ДВасильев Глеб Алексеевич (1 ост, 25.01)
5. ДГерасимук Максим Сергеевич (1 ост, 25.01)
6. ДГригорчук Илья Сергеевич (1 ост, 25.01)
7. ДДавидюк Дмитрий Сергеевич (1 ост, 25.01)
8. ДКинчак Кирилл Романович (1 ост, 25.01)
9. ДКлимук Пётр Николаевич (1 ост, 25.01)
10. ДКоверец Руслан Вадимович (1 ост, 25.01)
11. ДНикитюк Артем Александрович (1 ост, 25.01)
12. ДПавлючик Тимофей Игоревич (1 ост, 25.01)
13. ДСамосюк Максим Васильевич (1 ост, 25.01)
`

// Удалить ненужные символы, если они есть, которые появляются после копирования из robox
const entries = input.split('\n')
if (entries[0].trim() === '') {
  entries.shift()
}
if (entries[entries.length - 1].trim() === '') {
  entries.pop()
}

// Непосредственно главное: вычленить фамилию-имя
const outputEntries = []
const regex = /\p{L}+ \p{L}+/u
for (const entry of entries) {
  const match = entry.match(regex)
  if (match) {
    outputEntries.push(match[0])
  }
}
// Удалить лишнюю букву д в начале (в robox буква "д" означает "договор", типа того)
const regexDeleteD = /^д/i
for (let i = 0; i < outputEntries.length; i++) {
  let entry = outputEntries[i]
  const match = entry.match(regexDeleteD)
  if (match) {
    outputEntries[i] = entry.slice(1)
  }
}

// Добавить \n после какого-то большого кол-ва фамилий-имён для удобства
const outputEntriesWithNs = outputEntries.flatMap((o, i) => {
  if (i % 4 === 0 && i !== 0) return [o, '\n']
  return o
})

// Заджоинить
const output = outputEntriesWithNs.join(', ')

// Вывести и скопировать в буфер обмена
console.log(output)
await clipboard.write(output);