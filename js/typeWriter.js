export function initTypewriter() {
  const texts = [
    "I'M INDRA JULIANSYAH PUTRA",
    "A DATA ENTHUSIAST",
    "WELCOME TO MY PORTFOLIO"
  ];

  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';
  const typewriterText = document.querySelector('.typewriter-text');
  if (!typewriterText) return;

  function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    typewriterText.textContent = letter;

    if (letter.length === currentText.length) {
      setTimeout(() => {
        index = 0;
        count++;
        setTimeout(type, 500); // delay before next word
      }, 2000); // stay 2 sec after full text
    } else {
      setTimeout(type, 100); // typing speed
    }
  }

  type();
}
