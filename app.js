async function loadSorunlar() {
  const response = await fetch("data/sorunlar.json");
  const data = await response.json();

  const listContainer = document.getElementById("sorunListesi");
  const searchInput = document.getElementById("search");
  const searchForm = document.getElementById("searchForm");

  // Liste sayfası
  if (listContainer) {

    function renderList(filter = "") {
      listContainer.innerHTML = "";

      const filtered = data.filter(item =>
        item.baslik.toLowerCase().includes(filter.toLowerCase())
      );

      if (filtered.length === 0) {
        listContainer.innerHTML = "<p>Sonuç bulunamadı.</p>";
        return;
      }

      filtered.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${item.baslik}</strong><br><small>${item.kategori}</small>`;
        div.onclick = () => {
          window.location.href = `makale.html?id=${item.id}`;
        };
        listContainer.appendChild(div);
      });
    }

    renderList();

    searchForm.addEventListener("submit", function(e) {
      e.preventDefault();
      renderList(searchInput.value);
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
