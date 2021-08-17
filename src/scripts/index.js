fetch("../../data/fisheyeData.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    const profilList = document.getElementById("profil_photographer");
    const profilElementTemplate = document.getElementById(
      "profil_photographer_element"
    );

    for (const photographer of data.photographers) {
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
  })
  .catch((error) => {
    console.error(error);
  });
