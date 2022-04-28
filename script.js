const circleButtons = document.querySelectorAll('.circle-button');
const allLines = document.querySelectorAll('.line');
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
  startCircleButtonIndex = index;

  button.classList.add('active');
  changeBtnAttribute(buttonsArray, index, true);
  colorizeLine(allLines, button, index);

  if (index + 1 !== buttonsArray.length) {
    if (buttonsArray[index + 1].classList.contains('active')) {
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
  if (buttonIndex === 0) {
    if (startCircleButtonIndex === 0) {
      buttonsArray[0].setAttribute(attribute, true);
      buttonsArray[1].removeAttribute(attribute);
    } else {
      buttonsArray[1].removeAttribute(attribute);
    }
  } else {
    if (startCircleButtonIndex + 1 < circleButtons.length) {
      buttonsArray[0].removeAttribute(attribute);
      buttonsArray[1].removeAttribute(attribute);
    } else {
      buttonsArray[1].setAttribute(attribute, true);
    }
  }
}

function colorizeLine(linesArray, button, indxB) {
  console.log(indxB);
  if (indxB > 0) {
    linesArray.forEach((line, indxL) => {
      if (indxB - 1 >= indxL) {
        if (
          button.classList.contains('active') &&
          !line.classList.contains('active')
        ) {
          line.classList.add('active');
        }
      } else {
        line.classList.remove('active');
      }
    });
  } else {
    linesArray.forEach(line => {
      line.classList.remove('active');
    });
  }
}
