let arrayColors = [];

function randomColor(numberOfColors) {
  const firstColor = 'rgb(0, 0, 0)';
  arrayColors[0] = firstColor;
  for (let index = 1; index <= numberOfColors; index += 1) {
    const createColor = {
      r: parseInt((Math.random() * 255), 10),
      g: parseInt((Math.random() * 255), 10),
      b: parseInt((Math.random() * 255), 10),
    };
    arrayColors[index] = (`rgb(${createColor.r}, ${createColor.g}, ${createColor.b})`);
  }
  return arrayColors;
}



function addPaletteColor() {
  const elementHolder = document.querySelector('#color-palette');
  const colorListElements = document.querySelectorAll('.color');
  for (let index1 = 0; index1 < colorListElements.length; index1 += 1) {
    elementHolder.removeChild(colorListElements[index1]);
  }
  for (let index = 0; index < arrayColors.length; index += 1) {
    const newElement = document.createElement('div');
    newElement.className = 'color box';
    newElement.style.backgroundColor = arrayColors[index];
    elementHolder.appendChild(newElement);
  }
}


function createPixelBoard(sizeBoard) {
  const elementHolder = document.querySelector('#pixel-board');
  for (let indexRow = 0; indexRow < sizeBoard; indexRow += 1) {
    const divRow = document.createElement('div');
    divRow.className = 'pixelBoardRow';
    for (let indexCol = 0; indexCol < sizeBoard; indexCol += 1) {
      const divCol = document.createElement('div');
      divCol.className = 'pixel box';
      divRow.appendChild(divCol);
    }
    elementHolder.appendChild(divRow);
  }
}


function changeColor() {
  const colorPaleteAll = document.querySelector('#color-palette').children;
  colorPaleteAll[0].className += ' selected';
  for (let index1 = 0; index1 < colorPaleteAll.length; index1 += 1) {
    colorPaleteAll[index1].addEventListener('click', function (event) {
      for (let index2 = 0; index2 < colorPaleteAll.length; index2 += 1) {
        colorPaleteAll[index2].className = 'color box';
      }
      event.target.className = 'color box selected';
    });
  }
}

function paintPixel() {
  const colorPaleteAll = document.querySelector('#color-palette').children;
  const pixelsBoardAll = document.querySelectorAll('.pixel');
  for (let index1 = 0; index1 < pixelsBoardAll.length; index1 += 1) {
    pixelsBoardAll[index1].addEventListener('click', function (event) {
      for (let index2 = 0; index2 < colorPaleteAll.length; index2 += 1) {
        if (colorPaleteAll[index2].className === 'color box selected') {
          event.target.style.backgroundColor = colorPaleteAll[index2].style.backgroundColor;
        }
      }
    });
  }
}


function clearButton() {
  const elementHolder = document.querySelector('#color-palette');
  const pixelsBoardAll = document.querySelectorAll('.pixel');
  const newelement = document.createElement('button');
  newelement.id = 'clear-board';
  newelement.className = 'buttonClear';
  newelement.innerText = 'Limpar';
  newelement.addEventListener('click', function () {
    for (let index = 0; index < pixelsBoardAll.length; index += 1) {
      pixelsBoardAll[index].style.backgroundColor = 'white';
    }
  });
  const elementHolder2 = document.querySelector('.container');
  const buttonClearRemove = document.querySelector('button#clear-board');
  if (buttonClearRemove != null) {
    elementHolder2.removeChild(buttonClearRemove);
  }
  elementHolder.insertAdjacentElement('afterend', newelement);
}


function CreateButtonSizePainel() {
  const elementHolder = document.querySelector('#clear-board');
  const formulary = document.createElement('form');
  formulary.id = 'myForm';
  formulary.className = 'formContent';
  const inputlabel = document.createElement('label');
  inputlabel.for = 'sizeOfElement';
  inputlabel.innerText = 'Digite o tamanho do painel: ';
  const inputData = document.createElement('input');
  inputData.min = 1;
  inputData.id = 'board-size';
  inputData.type = 'number';
  inputData.name = 'sizeOfElement';
  inputData.className = 'inputElement';
  const buttonSubmit = document.createElement('button');
  buttonSubmit.type = 'submit';
  buttonSubmit.id = 'generate-board';
  buttonSubmit.className = 'headerButton';
  buttonSubmit.innerText = 'VQV';
  formulary.appendChild(inputlabel);
  formulary.appendChild(inputData);
  formulary.appendChild(buttonSubmit);
  elementHolder.insertAdjacentElement('afterend', formulary);
}

function sortNewColors() {
  const elementHolder = document.querySelector('#color-palette');
  const buttonSortNewColors = document.createElement('button');
  buttonSortNewColors.innerText = 'Novas Cores';
  buttonSortNewColors.addEventListener('click', function (event) {
    randomColor(8);
    addPaletteColor();
    changeColor();
  });
  elementHolder.insertAdjacentElement('afterend', buttonSortNewColors);
}

function clearPixelBoard() {
  const pixelsBoard = document.querySelector('#pixel-board');
  const pixelsBoardRows = document.querySelectorAll('.pixelBoardRow');
  for (let index = 0; index < pixelsBoardRows.length; index += 1) {
    pixelsBoard.removeChild(pixelsBoardRows[index]);
  }
}

function createNewBoard(valueInput) {
  clearPixelBoard();
  createPixelBoard(valueInput);
  paintPixel();
  clearButton();
}

function minMaxBoardCreator(valueInput) {
  let sizeBoard = 0;
  if (valueInput <= 50) {
    sizeBoard = 5;
    if (valueInput > 5) {
      sizeBoard = valueInput;
    }
  } else {
    sizeBoard = 50;
    alert('Tamanho máximo 50');
  }
  createNewBoard(sizeBoard);
}

function verifyPainelNumber(valueInput) {
  if (valueInput === '') {
    alert('Board inválido!');
  } else {
    minMaxBoardCreator(valueInput);
  }
}

function changePainelSize() {
  const formulary = document.querySelector('#myForm');
  formulary.addEventListener('submit', function (event) {
    event.preventDefault();
    const sizePainel = event.target.sizeOfElement.value;
    verifyPainelNumber(sizePainel);
  });
}

arrayColors = randomColor(8);
addPaletteColor();
createPixelBoard(9);
changeColor();
paintPixel();
clearButton();
CreateButtonSizePainel();
sortNewColors();
changePainelSize();