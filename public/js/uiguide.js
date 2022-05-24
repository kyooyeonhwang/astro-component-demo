// import * as ImportTest from "./menu.js";

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1).slice(0, -5);
// let uiCategory = document.querySelector('#uiCategory');

// ImportTest.MENU.map(item => {
//   let li = document.createElement('li')
//   let a = document.createElement('a');
//   if(item.link) {
//     li.innerHTML = `<a href="${item.link}">${item.depth1}</a>`;
//   } else {
//     li.innerHTML = `<strong>${item.depth1}</strong>`;
//   }

//   if(item.subDepth) {
//     let ul = document.createElement('ul')
//     item.subDepth.sort((a, b) => {
//       let fa = a.depth2.toLowerCase(),
//       fb = b.depth2.toLowerCase();

//       if (fa < fb) {
//         return -1;
//       }
//       if (fa > fb) {
//         return 1;
//       }
//       return 0;
//     });
//     item.subDepth.forEach(smenu => {
//       let sli = document.createElement('li')
//       sli.innerHTML = `<a href="${smenu.link}.html">${smenu.depth2} ${smenu.status ? `<span class="status">${smenu.status}</span>` : ''}</a>`;
//       let smenuLinks = smenu.link.split('/')
//       if(smenuLinks[smenuLinks.length - 1] === filename) {
//         sli.innerHTML = `<a href="${smenu.link}.html" aria-current="page">${smenu.depth2} ${smenu.status ? `<span class="status">${smenu.status}</span>` : ''}</a>`;
//       }
//       ul.appendChild(sli)
//     })
//     li.appendChild(ul)
//   }
//   uiCategory.appendChild(li)
// })

const uiCodes = document.querySelectorAll('.ui-code');

if(uiCodes) {
  uiCodes.forEach(element => {
    element.style.height = element.scrollHeight + 5 + 'px';
  });
}

let currentClassName = '';
let prevClassName = '';

if(document.querySelector('.ui_doc_radio_group')) {
  const uiDocRadioRroup = document.querySelector('.ui_doc_radio_group');
  const radioItems = uiDocRadioRroup.querySelectorAll('.doc_radio_item input');
  var parentEl = uiDocRadioRroup.parentElement;
  const ChildEls = parentEl.querySelectorAll('.btn')

  Array.from(radioItems).map(radioItem => {
    // radioItem.classList.remove('')
    if(radioItem.checked) {
      currentClassName = radioItem.dataset.size;
    }

    Array.from(ChildEls).map(ChildEl => {
      // console.log(prevClassName, currentClassName)
      if(prevClassName) {
        ChildEl.classList.remove(prevClassName)
      }
      if(currentClassName) {
        ChildEl.classList.add(currentClassName)
      }
    })

    radioItem.addEventListener('change', function() {
      prevClassName = currentClassName
      currentClassName = radioItem.dataset.size;

      Array.from(ChildEls).map(ChildEl => {
        if(prevClassName) {
          ChildEl.classList.remove(prevClassName)
        }
        if(currentClassName) {
          ChildEl.classList.add(currentClassName)
        }
      })
    })
  })
}

const jsInputModifier = document.querySelector('.js_input_modifiers');

function inputModifier() {
  const codePreview = jsInputModifier.querySelector('.code_preview');

  const inputText = jsInputModifier.querySelector('.input-text');
  const checkboxs = jsInputModifier.querySelectorAll('.checkbox-txt input');
  Array.from(checkboxs).map(checkbox => {
    checkbox.addEventListener('change', function(e) {
      const paraEl = document.createElement('p');
      if(e.target.checked) {
        if(e.target.value == 'invalid') {
          inputText.classList.add(`is-${e.target.value}`);
          paraEl.setAttribute('role', 'alert');
          paraEl.id = 'error-text';
          paraEl.classList.add('input-alert-help');
          paraEl.innerHTML = `툭수 문자는 _ 만 사용 가능합니다`;
          codePreview.append(paraEl);
        };
        if(e.target.value == 'readonly') inputText.value = '홍길동...'
        if(e.target.value == 'focus') inputText.focus();
        inputText.setAttribute(e.target.value, true)
      } else {
        if(e.target.value === 'invalid') {
          document.querySelector('.input-alert-help').remove();
        }
        if(e.target.value == 'readonly') inputText.value = '';
        inputText.classList.remove(`is-${e.target.value}`);
        inputText.removeAttribute(e.target.value)
      }
    })
  })
}

if(jsInputModifier) {
  inputModifier()
}

function sidebarPos() {
  const docSidebar = document.getElementById('doc_sidebar');
  if(!docSidebar) return;
  window.addEventListener('scroll', function(e) {
    const posTop = docSidebar.getBoundingClientRect().top;
    docSidebar.classList.remove('is-fixed')
    if(posTop <= 0) {
      docSidebar.classList.add('is-fixed')
    }
  })
}
sidebarPos()
