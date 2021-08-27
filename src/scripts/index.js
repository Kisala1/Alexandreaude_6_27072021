fetch("../../data/fisheyeData.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    for (const photographer of data.photographers) {
      displayPhotographer(photographer);
    }
    displayTagsMenu(data.photographers);
  })
  .catch((error) => {
    console.error(error);
  });

function displayTagsMenu(photographers) {
  const tags = [];
  for (const photographer of photographers) {
    for (const tag of photographer.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  const tagsMenu = document.querySelector(".tagsMenu");
  for (const tag of tags) {
    const tags = document.createElement("span");
    tags.textContent = "#" + tag;
    tagsMenu.appendChild(tags);
  }
}

function displayPhotographer(photographer) {
  const profilList = document.getElementById("profil_photographer");
  const profilElementTemplate = document.getElementById(
    "profil_photographer_element"
  );
  const el = document.importNode(profilElementTemplate.content, true);
  const imgSelector = el.querySelector(".portrait");

  imgSelector.alt = photographer.name;
  imgSelector.src = "../../data/Portraits/" + photographer.portrait;
  el.querySelector(".lieu").textContent =
    photographer.city + ", " + photographer.country;
  el.querySelector(".tagline").textContent = photographer.tagline;
  el.querySelector(".price").textContent = photographer.price + "€/jour";

  const tags = el.querySelector(".tags");
  for (let i = 0; i < photographer.tags.length; i++) {
    const tag = document.createElement("span");
    tag.textContent = "#" + photographer.tags[i];
    tags.appendChild(tag);
  }
  profilList.appendChild(el);
}
