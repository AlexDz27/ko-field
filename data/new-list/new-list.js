// TODO: мб сделать, чтоб более нормально аутпутились фамилии-имена: чтоб не было запятых лишних 
// (сделать таким образом аутпут компактнее) 
// TODO: new-list.txt тоже чтоб склеивало
// TODO (pos): сделать тесты (что совпадает количество и данные из robox (функциональный))
// TODO (pos): попереименовывать переменные, вспоминая правило "Слишком большая ответственность"?
// например, entries в таком случае будет inputItems?

import clipboard from 'clipboardy'

const input = `
1. ДБришен Федор Михайлович (1 ост, 25.12)
2. ДБыстров Александр Сергеевич (1 ост, 25.12)
3. ДКарпин Роман Денисович (1 ост, 25.12)
4. ДКлимук Дмитрий Андреевич (1 ост, 25.12)
5. ДКолодинский Тимофей Юрьевич 15 плятат (0 ост)
6. ДКолодич Маргарита Вадимовна (1 ост, 25.12)
7. ДКуняшевич Илья Витальевич (1 ост, 25.12)
8. ДКурашевич Анастасия Юрьевна платят 14 (1 ост, 25.12)
9. ДЛеонюк Михаил Олегович (1 ост, 25.12)
10. ДПильчук Оливия Ильинична (0 ост)
11. ДСухаревич Кира Юрьевна (1 ост, 25.12)
12. ДТрубчик Мия Максимовна (1 ост, 25.12)
13. ДХмельницкий Гордей Витальевич (1 ост, 25.12)
14. ДШикун София Максимовна заплатят 20 (0 ост)
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