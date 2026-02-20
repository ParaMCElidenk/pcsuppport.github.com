async function loadSorunlar() {
  const response = await fetch("data/sorunlar.json");
  const data = await response.json();

  const listContainer = document.getElementById("sorunListesi");
  const searchInput = document.getElementById("search");

  if (listContainer) {
    function renderList(filter = "") {
      listContainer.innerHTML = "";
      data
        .filter(item =>
          item.baslik.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach(item => {
          const div = document.createElement("div");
          div.innerHTML = `<strong>${item.baslik}</strong><br><small>${item.kategori}</small>`;
          div.onclick = () => {
            window.location.href = `makale.html?id=${item.id}`;
          };
          listContainer.appendChild(div);
        });
    }

    renderList();

    searchInput.addEventListener("input", e => {
      renderList(e.target.value);
    });
  }

  // Makale sayfası
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const makale = data.find(item => item.id == id);
    if (makale) {
      document.getElementById("baslik").innerText = makale.baslik;
      document.getElementById("kategori").innerText = makale.kategori;
      document.getElementById("icerik").innerText = makale.icerik;
    }
  }
}

loadSorunlar();
