const circleButtons = document.querySelectorAll('.circle-button');
const standartButtons = document.querySelectorAll('.standart-button');
let startCircleButtonIndex = 0;

circleButtons.forEach((button, indx) => {
  button.addEventListener('click', () => {
    colorizeCircleButton(button, circleButtons, indx);

    if (indx === 0) {
      changeStandartBtnAttribute(0, standartButtons);
    } else {
      changeStandartBtnAttribute(1, standartButtons);
    }

    startCircleButtonIndex = indx;
  });
});

standartButtons.forEach((button, indx) => {
  button.addEventListener('click', () => {
    if (indx === 1) {
      colorizeCircleButton(
        circleButtons[startCircleButtonIndex + 1],
        circleButtons,
        startCircleButtonIndex + 1,
      );
    } else {
      colorizeCircleButton(
        circleButtons[startCircleButtonIndex - 1],
        circleButtons,
        startCircleButtonIndex - 1,
      );
    }
    changeStandartBtnAttribute(indx, standartButtons);
  });
});

function changeBtnAttribute(
  buttonsArray,
  buttonIndx,
  needAttribute,
  attribute = 'disabled',
) {
  if (needAttribute) {
    if (buttonIndx + 1 !== buttonsArray.length) {
      if (
        buttonIndx !== 0 &&
        buttonsArray[buttonIndx + 1].hasAttribute(attribute)
      ) {
        buttonsArray[buttonIndx + 1].toggleAttribute(attribute);
      }
    }
  } else {
    if (buttonIndx + 1 !== buttonsArray.length) {
      if (
        buttonIndx !== 0 &&
        !buttonsArray[buttonIndx + 1].hasAttribute(attribute)
      ) {
        buttonsArray[buttonIndx + 1].toggleAttribute(attribute);
      }
    }
  }
}

function colorizeCircleButton(button, buttonsArray, index) {
  button.classList.add('active');

  startCircleButtonIndex += 1;
  changeBtnAttribute(buttonsArray, index, true);

  if (index + 1 !== buttonsArray.length) {
    if (buttonsArray[index + 1].classList.contains('active')) {
      startCircleButtonIndex = index;

      buttonsArray.forEach((button1, index1) => {
        if (index < index1) {
          button1.classList.remove('active');
          changeBtnAttribute(buttonsArray, index1, false);
        }
      });
    }
  }
}

function changeStandartBtnAttribute(
  buttonIndex,
  buttonsArray,
  attribute = 'disabled',
) {
  console.log(buttonIndex);
  console.log(startCircleButtonIndex);

  if (buttonIndex === 0) {
    if (startCircleButtonIndex === 0) {
      buttonsArray[0].setAttribute(attribute, true);
      // } else {
      buttonsArray[1].removeAttribute(attribute);
    }
  } else {
    if (startCircleButtonIndex + 1 < circleButtons.length) {
      buttonsArray[0].removeAttribute(attribute);
      buttonsArray[1].removeAttribute(attribute);
    } else if (startCircleButtonIndex + 1 === circleButtons.length) {
      buttonsArray[1].setAttribute(attribute, true);
    }
  }
}
