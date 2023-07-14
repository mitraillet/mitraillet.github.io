
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

// let proofs;
// $.getJSON("data/proofs.json", function(data){
//   proofs = data;
// });

let age = document.getElementById('age')
let ageValue = document.createTextNode(getAge())
age.appendChild(ageValue) 

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


let postsData = "";
let filterData = "";
const postsContainer = document.querySelector(".posts-container");
const filterContainer = document.querySelector(".filter-container");

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
  const { title, description, image, categories } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
      <div class="post-preview view effect">
        <img class="post-image" src="${image}">
        <div class="mask">
        <h4>${title}</h4>
        <a href="#" class="info" title="Full Image">"${description}"</a></div>
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