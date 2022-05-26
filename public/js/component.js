// Accordion
function accordion() {
  const accordionContainer = document.querySelector('.js-accordion-container')
  if(accordionContainer) {
    const btnToggles = accordionContainer.querySelectorAll('.js-toggle')
    btnToggles.forEach(btnToggle => {
      btnToggle.addEventListener('click', function(e) {
        console.log(e.currentTarget)
      })
    })
  }
}

// Choice Button
function choiceButton() {
  const choiceContainer = document.querySelector('.js-choice-container')
  if(choiceContainer) {
    const choiceItems = choiceContainer.querySelectorAll('.choice-item')
    choiceItems.forEach(choiceItem => {
      const inputCheck = choiceItem.querySelector('input');
      if(inputCheck.checked) {
        choiceItem.classList.add('is-active')
      }
      choiceItem.addEventListener('click', function(event) {
        const target = event.currentTarget;
        const inputEl = target.querySelector('input')
        target.classList.remove('is-active')
        if(inputEl.checked) {
          target.classList.add('is-active')
        }
      })
    })
  }
}

function choiceRadioButton() {
  const labels = document.querySelectorAll('.js-choice-container02 label');
  for (var i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', function(e) {
      labels.forEach(item => {
        item.parentElement.classList.remove('is-active')
        item.querySelector('input').checked = false;
      })
      if(!(e.currentTarget.parentElement.classList.contains('is-active'))) {
        e.currentTarget.parentElement.classList.add('is-active')
        e.currentTarget.querySelector('input').checked = true;
      }
      e.preventDefault();
    });
  }
}

// Number Input
function numberInput() {
  const uiQuantityForm = document.querySelector('.js-quantity-form');
  if(!uiQuantityForm) return;
  const uiBtnDecrement = document.querySelector('.js-btn-decrement');
  const uiCounter = document.querySelector('.js-counter');
  const uiBtnIncrement = document.querySelector('.js-btn-increment');

  let numberValue = Number(uiCounter.value);
  let minValue = 1;
  let inpValue;

  function decrement(){
    const targetValue = uiCounter.value;
    numberValue = Number(targetValue);
    uiCounter.value = numberValue - 1;
    inpValue = uiCounter.value;

    if(uiCounter.value < minValue){
      uiBtnDecrement.disabled = true;
      uiCounter.value = minValue;
      return;
    }
    totalPriceGroup(uiCounter.value);

    uiBtnDecrement.classList.add('active');
  }
  function increment(){
    const targetValue = uiCounter.value;
    numberValue = Number(targetValue);
    uiCounter.value = numberValue + 1;
    inpValue = uiCounter.value;
    if(numberValue > minValue){
      uiBtnIncrement.disabled = false;
    }
    uiBtnIncrement.classList.add('active');
    totalPriceGroup();
  }

  function totalPriceGroup(){
    if(uiCounter.value == 1){
      uiBtnDecrement.disabled = true;
      uiCounter.value = minValue;
      return;
    }
    if(uiCounter.value > 1){
      if(uiCounter.value > minValue){
        uiBtnDecrement.disabled = false;
      };
    }
  }

  totalPriceGroup();
  decrement();

  uiBtnDecrement.addEventListener('click', decrement);
  uiBtnIncrement.addEventListener('click', increment);
  uiCounter.addEventListener('keyup', function(event){
    let key = event.key || event.keyCode;
    let target = event.currentTarget;
    if(event.key >= 1 && event.key <= 9) {
      return true;
    }
    if(target.value > 1) {
      uiBtnDecrement.disabled = false;
    } else {
      uiBtnDecrement.disabled = true;
    }
    if(key === 'ArrowDown' || key == 40){
      inpValue = event.currentTarget.value;
      totalPriceGroup()
      return inpValue;
    };
    if(key === 'ArrowUp' || key == 38){
      inpValue = event.currentTarget.value;
      totalPriceGroup()
      return inpValue;
    }
  });
}

// Form
function emailAutocompleteList() {
  const emailDomainList = [
    '@empas.com',
    '@gmail.com',
    '@hanmail.net',
    '@kakao.com',
    '@live.com',
    '@nate.com',
    '@naver.com',
  ]

  const emailListWrap = document.querySelector('.js-email-list');
  if(emailListWrap) {
    const inputText = emailListWrap.querySelector('.input-text');
    const emailList = emailListWrap.querySelector('.email-list');
    inputText.addEventListener('input', function(e) {
      const emailId = e.currentTarget.value;
      if(emailId.includes('@') || emailId == '') {
        emailList.style.display = 'none';
      } else {
        emailList.style.display = 'block';
      }
      emailList.innerHTML = '';
      emailDomainList.map(el => {
        const li = document.createElement('li');
        const buttonEl = document.createElement('button');
        buttonEl.textContent = emailId + el;
        li.append(buttonEl);
        buttonEl.addEventListener('click', function(event) {
          inputText.value = event.currentTarget.textContent;
          emailList.style.display = 'none';
          inputText.focus();
          event.preventDefault();
        })
        emailList.append(li)
      })
      e.preventDefault();
    })
  }
}

function passwordShowHide() {
  const passwordItem = document.querySelector('.js-password-item');
  if(!passwordItem) return;
  const inputEl = passwordItem.querySelector('.input-text');
  const passwordButton = passwordItem.querySelector('.js-btn-password');
  let el = true;
  passwordButton.addEventListener('click', function(e) {
    if(el) {
      inputEl.setAttribute('type', 'text')
      passwordButton.querySelector('.icon').classList.remove('icon-hide')
      passwordButton.querySelector('.icon').classList.add('icon-show')
    } else {
      inputEl.setAttribute('type', 'password')
      passwordButton.querySelector('.icon').classList.remove('icon-show')
      passwordButton.querySelector('.icon').classList.add('icon-hide')
    }
    el = !el;
  })
}

function sliderComponent() {
  const slideContainer = document.querySelectorAll('.slide-container')
  if(slideContainer.length <= 0) return;

  slideContainer.forEach(el => {
    const rangeEl = el.querySelector('.js-slider');
    const numberEl = el.nextElementSibling;
    function initSetup() {
      numberEl.value = rangeEl.value;
      rangeEl.style.backgroundSize = rangeEl.value + '% 100%';
      numberEl.disabled = rangeEl.disabled ? true : false;
      numberEl.min = rangeEl.min;
      numberEl.max = rangeEl.max;
    }

    function handleInputChange(e) {
      let min;
      let max;
      let val;
      if (e.target.type === 'range') {
        numberEl.value = e.target.value;
      }
      if (e.target.type === 'number') {
        rangeEl.value = e.target.value;
      }
      min = rangeEl.min;
      max = rangeEl.max;
      val = rangeEl.value;

      rangeEl.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    }
    initSetup()
    rangeEl.addEventListener('input', handleInputChange);
    numberEl.addEventListener('input', handleInputChange);
  })
}


document.addEventListener('DOMContentLoaded', function() {
  accordion()
  choiceButton()
  choiceRadioButton()
  emailAutocompleteList()
  setTimeout(function() {
    passwordShowHide()
    numberInput()
    sliderComponent()
  }, 500)
})
