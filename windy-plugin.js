(function() {
  // Pluginin alustusfunktio, joka saa parametrinaan Windyn API-olion.
  function init(windyAPI) {
    // Haetaan Leaflet-kartta, jota Windy käyttää
    var map = windyAPI.map;

    // Luo tile layer ECMWF-datan aallon korkeuden esittämistä varten
    // HUOM: Vaihda URL oikeaksi tile-serveriksesi, jossa on aallon korkeus
    var waveHeightLayer = L.tileLayer('https://esimerkki.com/aallon_korkeus_tiles/{z}/{x}/{y}.png', {
      attribution: 'ECMWF Aallon Korkeus Data',
      opacity: 0.6
    });

    // Lisää tile layer Windyn kartalle
    waveHeightLayer.addTo(map);
    
    // Jos sinulla on graafista dataa aallon korkeudelle, voit käyttää sitä värittämään kartan alueet:
    // Oletetaan, että "aallon_korkeus" on numeerinen arvo, joka saadaan joko datasta tai laskelmista
    var colorize = function(value) {
      if (value < 4) {
        return 'rgba(0, 0, 0, 0)';  // Läpinäkyvä alle 4 m
      } else {
        return 'rgba(255, 0, 0, 0.6)';  // Punainen, yli 4 m
      }
    };

    // Esimerkki: Käytä tätä, jos sinulla on suoraa tietoa aallon korkeuksista
    // ja haluat piirtää kartalle korkeuksia ja värittää ne.
    var waveHeight = function(lat, lng) {
      // Tässä voisi olla koodi, joka hakee aallon korkeuden koordinaateista
      var height = 5;  // Esimerkki: Aallon korkeus, joka on yli 4 m
      return height;
    };

    // Lisää interaktiivinen väritysmekanismi
    map.on('mousemove', function(event) {
      var latLng = event.latlng;
      var height = waveHeight(latLng.lat, latLng.lng);
      var color = colorize(height);
      // Päivitä kartan väritys
      // Tämä voisi olla osana kaavion, jossa värjätään tilejen sisällä.
      console.log('Aallon korkeus: ' + height + ' m, Väri: ' + color);
    });
  }

  // Tarkistetaan, että Windyn alustusfunktio windyInit on olemassa
  if (typeof windyInit === 'function') {
    // windyInit ottaa mahdolliset konfiguraatioparametrit ja callback-funktion, jolle Windy API-olio välitetään
    windyInit(null, function(windyAPI) {
      init(windyAPI);
    });
  } else {
    console.error("Windy API:ta ei löytynyt. Varmista, että plugin ladataan Windyn alustuksen jälkeen.");
  }
})();