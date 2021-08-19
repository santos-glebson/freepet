let filterMenu = document.getElementsByClassName("filter-menu")[0];
let state = 0;
let boxPhoto = document.getElementById("boxPhoto");
let userPhoto = document.getElementById("userPhoto");
let complaintPhoto = document.getElementById("complaintPhoto");
let saveButton = document.getElementById("saveButton");
let dateFrom = document.getElementById("date-from");
let dateTo = document.getElementById("date-to");
let ordering = document.getElementsByName("ordering");
let userId = document.getElementById("userId");
let pending = document.getElementById("pending");
let answered = document.getElementById("answered");
let modal = document.getElementsByClassName("modal")[0];
let deleteButton = document.getElementById("deleteButton");
let link = `/room/${userId.value}?`;
let pageController = document.getElementsByClassName("pageController");

// To show hidden menu
function showMenu(obj) {
  if (!state) {
    state = 1;
    obj.classList.remove("fa-filter");
    obj.classList.add("fa-times");
    obj.style.color = "var(--color5)";
    filterMenu.style.top = "12rem";
  } else {
    state = 0;
    obj.classList.remove("fa-times");
    obj.classList.add("fa-filter");
    obj.style.color = "var(--color2)";
    filterMenu.style.top = "-70rem";
  }
}

// To preview and save a complaint photo
function fileReader(event) {
  saveButton.removeAttribute("disabled");
  let reader = new FileReader();
  reader.onload = function () {
    let dataUrl = reader.result;
    boxPhoto.style.backgroundImage = `url('${dataUrl}')`;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// To delete image

function deleteImage() {
  boxPhoto.style.backgroundImage = "url('/images/user.jpg')";
}

// To filter complaints

function applyFilter() {
  if (ordering[0].checked) {
    order = 1;
  } else {
    order = -1;
  }
  link += `order=${order}&`;
  if (pending.checked) {
    link += "status=0&";
  }
  if (answered.checked) {
    link += "status=1&";
  }
  link += `start=${dateFrom.value}&end=${dateTo.value}&`;
  location.href = link;
}

// To change Page

if (!location.search.includes("skip")) {
  pageController[0].classList.add("selectedPage");
}

for (p of pageController) {
  if (
    Number(location.search.slice(1).split("&")[0].split("=")[1]) + 1 ==
    p.innerText
  ) {
    p.classList.add("selectedPage");
  }
}

function changePage(obj) {
  let page = Number(obj.innerText - 1);
  link += `skip=${page}&`;
  applyFilter();
}

// To open modal

function openModal(obj) {
  modal.style.display = "flex";
  deleteButton.setAttribute(
    "onclick",
    `location.href='/complaint/deleteComplaint/${userId.value}/${obj.dataset.id}'`,
  );
}

function hideModal() {
  modal.style.display = "none";
}
