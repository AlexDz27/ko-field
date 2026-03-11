// TODO: мб сделать, чтоб более нормально аутпутились фамилии-имена: чтоб не было запятых лишних 
// (сделать таким образом аутпут компактнее) 
// TODO: new-list.txt тоже чтоб склеивало
// TODO (pos): сделать тесты (что совпадает количество и данные из robox (функциональный))
// TODO (pos): попереименовывать переменные, вспоминая правило "Слишком большая ответственность"?
// например, entries в таком случае будет inputItems?

import clipboard from 'clipboardy'

const input = `
1. Адамчук Александр Игоревич (0 ост)
2. Андреянцева Маргарита Игоревна (0 ост)
3. Бурда Анастасия Денисовна (3 ост, 25.03)
4. Гасюк Аделина Дмитриевна (0 ост)
5. Дайнеко Кирилл Алексеевич (0 ост)
6. Дылюк Мария Руслановна (3 ост, 25.03)
7. Заруба Матвей Витальевич (0 ост)
8. Кальман Валерия Денисовна (3 ост, 25.03)
9. Новик Михаил Александрович (0 ост)
10. Парфенюк Иван Дмитриевич (3 ост, 25.03)
11. Псыщаница Ангелина Игоревна (3 ост, 25.03)
12. Савчук Кирилл Викторович платят 13 (0 ост)
13. Сахарчук Марк Дмитриевич (1 ост)
14. Стефаник Дмитрий Сергеевич (3 ост, 25.03)
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

// Тест на то, что кол-во изначальных энтрис и полученных после главной обработки совпадают - это оч важно, чтоб мне потом не пришлось глазами перепроверять
if (entries.length !== outputEntries.length) {
  console.log('ERR: ❌  Initial entries and output entries\'s count are NOT the same!')
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