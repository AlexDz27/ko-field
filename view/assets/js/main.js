let btnState = 0
const btnStates = {
  0: {
    text: 'Привет',
    backgroundColor: 'green'
  },
  1: {
    text: 'Как дела?',
    backgroundColor: 'red'
  },
  2: {
    text: 'Пока',
    backgroundColor: 'yellow'
  },
}

btn.onclick = () => {
  btnState = (btnState + 1) % 3
  btn.textContent = btnStates[btnState].text
  btn.style.backgroundColor = btnStates[btnState].backgroundColor
}