(function() {
  // Pluginin alustusfunktio, joka saa parametrinaan Windyn API-olion.
  function init(windyAPI) {
    // Haetaan Windyn Leaflet-kartta
    var map = windyAPI.map;

    // Luo tile layer ECMWF-dataa varten.
    // Muokkaa URL:ia vastaamaan omaa tile-serveriasi!
    var ecmwfLayer = L.tileLayer('https://esimerkki.com/ecmwf_tiles/{z}/{x}/{y}.png', {
      attribution: 'ECMWF Data',
      opacity: 0.6 // Säädä läpinäkyvyyttä tarpeen mukaan
    });

    // Lisää tile layer Windyn kartalle
    ecmwfLayer.addTo(map);
  }

  // Tarkistetaan, että Windyn alustusfunktio on olemassa
  if (typeof windyInit === 'function') {
    windyInit(null, function(windyAPI) {
      init(windyAPI);
    });
  } else {
    console.error("Windy API:ta ei löytynyt. Varmista, että plugin ladataan Windyn alustuksen jälkeen.");
  }
})();