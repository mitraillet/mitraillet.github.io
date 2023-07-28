
function getAge() {
  var today = new Date();
  var birthDate = new Date(1995, 3, 21);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let age = document.getElementById('age')
let ageValue = document.createTextNode(getAge())
age.appendChild(ageValue) 

let postsData = "";
let filterData = "";
const postsContainer = document.querySelector(".posts-container");
const filterContainer = document.querySelector(".filter-container");
const modalContainer = document.querySelector(".modal");

fetch('https://raw.githubusercontent.com/mitraillet/mitraillet.github.io/Pure-HTML-CSS/data/portfolio.json'
).then(async (response) => {
  postsData = await response.json();
  postsData.map((post) => createPost(post));
  filterData = [
    ...new Set(
      postsData
        .map((post) => post.categories)
        .reduce((acc, curVal) => acc.concat(curVal), [])
    )
  ];
  filterData.map((filter) => createFilter(filter));
});

const createPost = (postData) => {
  const { title, shortDescription, icon} = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
      <div class="post-preview view effect" onclick="modalClick('${title}')">
        <img class="post-image" src="${icon}">
        <div class="mask">
        <h4>${title}</h4><br>
        <p class="info" title="Full Image">"${shortDescription}"</p></div>
      </div>
  `;

  postsContainer.append(post);
};

const createFilter = (filter) => {
  const filterButton = document.createElement("button");
  filterButton.className = "filter-button btn w3-text-blue-grey w3-margin w3-large";
  filterButton.innerText = filter;
  filterButton.setAttribute('data-state', 'inactive');
  filterButton.addEventListener("click", (e) =>
    handleButtonClick(e, filter)
  );

  filterContainer.append(filterButton);
};

const resetFilterButtons = (currentButton) => {
  const filterButtons = document.querySelectorAll('.filter-button');
  [...filterButtons].map(button => {
    if (button != currentButton) {
      button.classList.remove('is-active');
      button.setAttribute('data-state', 'inactive')
    }
  })
}

const handleButtonClick = (e, param) => {
  const button = e.target;
  const buttonState = button.getAttribute('data-state');
  resetFilterButtons(button);
  
  if (buttonState =='inactive') {
    button.classList.add('is-active');
    button.setAttribute('data-state', 'active');
    handleFilterPosts(param)
  } else {
    button.classList.remove('is-active');
    button.setAttribute('data-state', 'inactive')
    resetPosts()
  }
}

const handleFilterPosts = (param) => {
  let filteredPosts = [...postsData].filter(post => post.categories.includes(param))
  
  postsContainer.innerHTML = "";
  filteredPosts.map(post => createPost(post))
};

const resetPosts = () => {
  postsContainer.innerHTML = "";
  postsData.map((post) => createPost(post));
}

// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

function modalClick(t) {
  modal.style.display = "block";
  const { title, description, image, proof} = postsData.find(e => e.title === t);
  const post = document.createElement("div");
  post.className = "modal-content";
  post.innerHTML = `
    <div class="modal-header">
      <span class="close" onclick="modal.style.display = 'none';">&times;</span>
      <h2>${title}</h2>
    </div>
    <div class="modal-body">
      <img class="modal-image" src="${image}">
      <p>${description}</p>
    </div>
    <div class="modal-footer">
    <button class="w3-button w3-light-grey w3-padding-large w3-section">
      <i class="fa fa-download"></i> <a href="${proof}"
      target="_blank">Lien vers la preuve</a>
    </button>
    </div>
  `;
  modalContainer.innerHTML = "";
  modalContainer.append(post);
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// function showProof(name) {
//   let i = 0;
//   let isCheating = true;
//   for (let property in proofs) {
//     if (property === name) {
//       isCheating = false;
//       document.getElementById('modalTitle').html(proofs[name]["title"]);
//       document.getElementById('modalImg').attr({
//         'src': proofs[name]["src"],
//         'alt': proofs[name]["alt"]
//       });
//     }
//     i++;
//   }
//   if(isCheating){
//     document.getElementById('modalTitle').html("<div class=\"alert alert-danger\" role=\"alert\"> Stop trying to change my site !!!! </div>");
//     document.getElementById('modalImg').attr({
//       'src': '',
//       'alt': 'Image inexistante'
//     });
//   }
// }
