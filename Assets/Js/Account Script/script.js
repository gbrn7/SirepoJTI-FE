const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(ddn => {

  const select = ddn.querySelector('.select');
  const caret = ddn.querySelector('.caret');
  const menu = ddn.querySelector('.menu');


  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
    menu.classList.toggle('menu-open-self');
  });

  //intilizing the cart earlier 
  if (menu.classList.contains("menu-cart")) {
    const menuwrap = menu.querySelector('.menu-wrap');
    if (menuwrap.childElementCount < 1) {
      const btn = menu.querySelector('.btn');
      btn.classList.add('disabled');
      return;
    }
    const items = menuwrap.querySelectorAll('li');
    items.forEach(item => {
      const deleteBtn = item.querySelector('.bx-trash');
      deleteBtn.addEventListener('click', addDelFunction);

      const plusBtn = item.querySelector('.plus');
      plusBtn.addEventListener('click', clickHandler);

      const minusBtn = item.querySelector('.minus');
      minusBtn.addEventListener('click', clickHandler);

    });

  }

});

function clickHandler(event) {
  console.log(event.target);
  var countEl = event.target.parentNode.querySelector(".qty-input");
  if (event.target.classList.contains("plus")) {
    countEl.value = Number(countEl.value) + 1;
  } else {
    if (countEl.value > 1) {
      countEl.value = Number(countEl.value) - 1;
    }
  }
  // triggerEvent(countEl, "change");
}

function addToCart(id, title) {
  const menu = document.querySelector('.menu-wrap');
  const items = document.querySelectorAll('.menu-wrap li');
  let isDuplicate = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].querySelector('.id').value === id) {
      isDuplicate = true;
      break;
    }
  }
  if (!isDuplicate) {
    const item = elementFromHtml(
      `
      <li>
      <input type="hidden" class="id" name="id-${id}" value="${id}">
      <div class="title m-0 row align-items-center">
        <div class="col-8 title">${title}</div>
        <div class="col-3 qty-btn d-flex gap-3 justify-content-center align-items-center">
          <div class="minus"  class="col-4">-</div>
          <input type="text" name="qty-${id}"  value="1"  class="col-4 qty-input">
          <div class="plus" class="col-4">+</div>
        </div>
        <div class="col-1 delete-wrap text-center"><i class='bx bx-trash'></i></div>
      </div>
    </li>
      `);
    menu.appendChild(item);
    return item;
  }

  return false;
}

function iteminit(item) {
  const btn = document.querySelector('.btn');
  btn.classList.remove('disabled');

  const deleteBtn = item.querySelector('.bx-trash');
  deleteBtn.addEventListener('click', addDelFunction);

  const plusBtn = item.querySelector('.plus');
  plusBtn.addEventListener('click', clickHandler);

  const minusBtn = item.querySelector('.minus');
  minusBtn.addEventListener('click', clickHandler);

  menuOpen();

}

function menuOpen() {
  const menuCart = document.querySelector('.menu-cart');

  if (!menuCart.classList.contains('menu-open')) {
    menuCart.classList.add('menu-open');
  }
  setTimeout(() => {
    if (menuCart.classList.contains('menu-open') && !menuCart.classList.contains('menu-open-self')) {
      menuCart.classList.remove('menu-open');
    }
  }, 2000);
}

function addDelFunction(event) {
  const menuwrap = document.querySelector('.menu-wrap');
  const listItem = event.target.parentNode.parentNode.parentNode;
  menuwrap.removeChild(listItem);
  if (menuwrap.childElementCount < 1) {
    const btn = document.querySelector('.btn');
    btn.classList.add('disabled');
    return;
  }
}

function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

const z = document.querySelectorAll(".t-history");
const th = document.querySelector(".t-history-1");
const th2 = document.querySelector(".t-history-2");
const row1 = document.querySelector(".op-wrapper");
const row2 = document.querySelector(".completed-wrapper");

th.addEventListener('click', () => {
  if (row1.classList.contains('d-none')) {
    row1.classList.remove('d-none');
    row2.classList.add('d-none');
    z.forEach((x) => {
      x.classList.toggle('bb')
    });
  }
})
// th2.addEventListener('click', () => {
//   if (!row1.classList.contains('d-none')) {
//     row1.classList.add('d-none');
//     row2.classList.remove('d-none');
//     z.forEach((x) => {
//       x.classList.toggle('bb')
//     });
//   }
// })


const cb = document.querySelector(".checkbox");

cb.addEventListener('click', () => {
  const x = document.querySelector('#profile');
  const y = document.querySelector('#history');

  x.classList.toggle('d-none');
  y.classList.toggle('d-none');
});

const statusField = document.querySelectorAll(".status-field");
statusField.forEach((e) => {
  if (e.textContent !== "On Process") {
    e.innerHTML = `No. Resi : <strong class="d-block">${e.textContent}</strong>`;
  }
});


const btnUpdate = document.querySelector('.btn-update');
btnUpdate.addEventListener('click', (e)=>{
  document.querySelector('.default-wrapper').classList.add('d-none');
  document.querySelector('.update-wrapper').classList.remove('d-none');
  let formInput = document.querySelectorAll('.profile-form');
  formInput.forEach((element)=>{
    element.removeAttribute('disabled');
  });
  // console.log(formInput[0]);
  formInput[0].focus();
});

let nameUser = document.querySelector('#nama').value;
let emailUser = document.querySelector('#email').value;
let alamatUser = document.querySelector('#alamat').value;
let noHpUser = document.querySelector('#noHp').value;


const btnBatal = document.querySelector('.btn-batal');
btnBatal.addEventListener('click', (e)=>{
  document.querySelector('.default-wrapper').classList.remove('d-none');
  document.querySelector('.update-wrapper').classList.add('d-none');

  let nameVal = document.querySelector('#nama').value = nameUser;
  let emailVal = document.querySelector('#email').value = emailUser;
  let alamatVal = document.querySelector('#alamat').value = alamatUser;
  let noHpVal = document.querySelector('#noHp').value = noHpUser;

  let profileForm = document.querySelectorAll('.profile-form');
  profileForm.forEach((element)=>{
    element.setAttribute('disabled', null);
  });
});

const btnSimpan = document.querySelector('.btn-simpan');
btnSimpan.addEventListener('click', (e)=>{
  let nameVal = document.querySelector('#nama');
  let alamatVal = document.querySelector('#alamat');
  let noHpVal = document.querySelector('#noHp');
  let form = document.querySelector('.update-form');
  e.preventDefault();
  if(nameVal.value === '' || noHpVal.value === '' || alamatVal.value === ''){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Harap lengkapi kolom yang ada',
    });
  }else if(noHpVal.value.length < 12 ){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Maaf Kolom No Handphone minimal 12 karakter',
    });
  }else{
    form.submit();
  };
});