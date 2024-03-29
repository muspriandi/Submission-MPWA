// BASE URL UNTUK API
var base_url = "https://api.football-data.org/v2/";

// BLOCK KODE YANG AKAN DIPANGGIL JIKA FETCH BERHASIL
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // METHOD reject() AKAN MEMBUAT BLOK CATCH TERPANGGIL
    return Promise.reject(new Error(response.statusText));
  } else {
    // METHOD MENGUBAH SUATU OBJEK MENJADI SUATU OBJEK MENJADI Promise AGAR BISA DI'THEN'KAN
    return Promise.resolve(response);
  }
}

// BLOK KODE UNTUK MEM'PARSING' JSON MENJADI ARRAY JAVASCRIPT
function json(response) {
  return response.json();
}

// BLOK KODE UNTUK MENG'HANDLE' KESALAHAN PADA BLOCK CATCH PROGRAM
function error(error) {
  // PARAMETER ERROR BERASAL DARI Promise.reject()
  console.log("Error : " + error);
  console.log("Pastikan anda terhubung ke jaringan internet untuk mengakses data pada API pertama kali.");
}

// FUNGSI MENJALANKAN PRELOAD
function preLoad() {
  var preLoad = 
  '<div class="preloader-wrapper big active" style="position: relative; left: calc(50% - 30px); top:50%;">'
    +'<div class="spinner-layer spinner-green-only">'
      +'<div class="circle-clipper left">'
        +'<div class="circle"></div>'
      +'</div>'
      +'<div class="gap-patch">'
        +'<div class="circle"></div>'
      +'</div>'
      +'<div class="circle-clipper right">'
        +'<div class="circle"></div>'
      +'</div>'
    +'</div>'
  +'</div>';
  document.getElementById("preLoad").innerHTML = preLoad;
}

// BLOK KODE UNTUK MELAKUKAN Request DATA JSON
function getTeams() {
  // MENJALANKAN PRELOAD
  preLoad();

  var request = new Request(base_url + 'teams', {
    method: 'GET', 
    headers: new Headers({
      'X-Auth-Token': '2b6178e612d8423396872e0246e966f3'
    })
  });

  if ("caches" in window) {
    caches.match(request).then(function(response) {
      if (response) {
        response.json().then(function(data) {
      
          // MENYUSUN KOMPONEN CARD SECARA DINAMIS
          var teamHTML = "";

          for($i=0; $i<data.count; $i++)
          {
            // FUNGSI CEK APAKAH SUDAH TERDAFTAR DALAM FAVORIT
            cekFavorite(data.teams[$i].id);

            teamHTML += `
              <div class="col s10 offset-s1 m3">
                <div class="card center" style="height: 375px;">
                  <div class="card-image waves-effect waves-block waves-light" style="padding: 10px;">
                    <img src="${data.teams[$i].crestUrl}" onerror="imgError(this)" alt="Gambar ${data.teams[$i].shortName}" style="max-height: 175px;">  
                  </div>
                  <div class="card-content">
                    <span class="card-title truncate">${data.teams[$i].shortName}</span>
                    <p>${data.teams[$i].name}</p>
                    <form name="form${data.teams[$i].id}">
                      <input type="hidden" name="teamName" value="${data.teams[$i].name}">
                      <input type="hidden" name="shortName" value="${data.teams[$i].shortName}">
                      <input type="hidden" name="clubColor" value="${data.teams[$i].clubColors}">
                      <input type="hidden" name="teamLogo" value="${data.teams[$i].crestUrl}">
                      <div id="button${data.teams[$i].id}">
                        <button type="button" onclick="simpankeDB(${data.teams[$i].id})" class="waves-effect waves-light btn pulse blue" style="position: absolute; left:10%; bottom: 20px; width:80%;">+ Favorite</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            `;
          }

          // MENYISIPKAN KOMPONEN CARD KE DALAM ELEMENT DENGAN id="teams"
          document.getElementById("teams").innerHTML = teamHTML;

          // MENGHAPUS PRELOADER
          document.getElementById("preLoad").innerHTML = "";
        });
      }
    });
  }
  
  fetch(request)
    .then(status)
    .then(json)
    .then(function(data) {
      // OBJEK/ARRAY JAVASCRIPT DARI response.json() MASUK LEWAT DATA

      // MENYUSUN KOMPONEN CARD SECARA DINAMIS
      var teamHTML = "";

      for($i=0; $i<data.count; $i++)
      {
        //FUNGSI CEK APAKAH SUDAH TERDAFTAR DALAM FAVORIT
        cekFavorite(data.teams[$i].id);

        teamHTML += `
          <div class="col s10 offset-s1 m3">
            <div class="card center" style="height: 375px;">
              <div class="card-image waves-effect waves-block waves-light" style="padding: 10px;">
                <img src="${data.teams[$i].crestUrl}" onerror="imgError(this)" alt="Gambar ${data.teams[$i].shortName}" style="max-height: 175px;">
              </div>
              <div class="card-content">
                <span class="card-title truncate">${data.teams[$i].shortName}</span>
                <p>${data.teams[$i].name}</p>
                <form name="form${data.teams[$i].id}">
                  <input type="hidden" name="teamName" value="${data.teams[$i].name}">
                  <input type="hidden" name="shortName" value="${data.teams[$i].shortName}">
                  <input type="hidden" name="clubColor" value="${data.teams[$i].clubColors}">
                  <input type="hidden" name="teamLogo" value="${data.teams[$i].crestUrl}">
                  <div id="button${data.teams[$i].id}">
                    <button type="button" onclick="simpankeDB(${data.teams[$i].id})" class="waves-effect waves-light btn pulse blue" style="position: absolute; left:10%; bottom: 20px; width:80%;">+ Favorite</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        `;
      }

      // MENYISIPKAN KOMPONEN CARD KE DALAM ELEMENT DENGAN id="teams"
      document.getElementById("teams").innerHTML = teamHTML;

      // MENGHAPUS PRELOADER
      document.getElementById("preLoad").innerHTML = "";
    })
    .catch(error);
}

function getStanding() {
  // MENJALANKAN PRELOAD
  preLoad();

  var request = new Request(base_url + 'competitions/2015/standings', {
    method: 'GET', 
    headers: new Headers({
      'X-Auth-Token': '2b6178e612d8423396872e0246e966f3'
    })
  });

  if ("caches" in window) {
    caches.match(request).then(function(response) {
      if (response) {
        response.json().then(function(data) {

          // MENYUSUN KOMPONEN CONTENT SECARA DINAMIS
          var standingHTML = "";
      
          standingHTML += `
            <p>Negara : <strong>${data.competition.area.name} (${data.competition.id})</strong> &nbsp; &nbsp; | &nbsp; &nbsp; 
            Liga : <strong>${data.competition.name} (${data.competition.code})</strong></p>
            <hr>
            <table class="striped responsive-table centered">
              <thead>
                <tr>
                  <th>Posisi</th>
                  <th>Logo Tim</th>
                  <th>Nama Tim</th>
                  <th>Jumlah Menang</th>
                  <th>Jumlah Seri</th>
                  <th>Jumlah Kalah</th>
                  <th>Total Goal</th>
                </tr>
              </thead>
              <tbody>
          `;

          for($i=0; $i<data.standings[0].table.length; $i++)
          {
            standingHTML += `
                <tr>
                  <td>${data.standings[0].table[$i].position}</td>
                  <td><img src="${data.standings[0].table[$i].team.crestUrl}" onerror="imgError(this)" alt="Gambar ${data.standings[0].table[$i].team.name}" style="max-height: 50px;"> </td>
                  <td>${data.standings[0].table[$i].team.name}</td>
                  <td>${data.standings[0].table[$i].won}</td>
                  <td>${data.standings[0].table[$i].draw}</td>
                  <td>${data.standings[0].table[$i].lost}</td>
                  <td>${data.standings[0].table[$i].goalsFor}</td>
                </tr>
            `;
          }
          standingHTML += `
              </tbody>
            </table>
          `;

          // MENYISIPKAN KOMPONEN CARD KE DALAM ELEMENT DENGAN id="standings"
          document.getElementById("standings").innerHTML = standingHTML;
  
          // MENGHAPUS PRELOADER
          document.getElementById("preLoad").innerHTML = "";
        });
      }
    });
  }
  
  fetch(request)
    .then(status)
    .then(json)
    .then(function(data) {
      // OBJEK/ARRAY JAVASCRIPT DARI response.json() MASUK LEWAT DATA

      // MENYUSUN KOMPONEN CONTENT SECARA DINAMIS
      var standingHTML = "";
      
      standingHTML += `
        <p>Area : <strong>${data.competition.area.name} (${data.competition.id})</strong> &nbsp; &nbsp; | &nbsp; &nbsp; 
        Liga : <strong>${data.competition.name}(${data.competition.code})</strong></p>
        <hr>
        <table class="striped responsive-table centered">
          <thead>
            <tr>
              <th>Posisi</th>
              <th>Logo Tim</th>
              <th>Nama Tim</th>
              <th>Jumlah Menang</th>
              <th>Jumlah Seri</th>
              <th>Jumlah Kalah</th>
              <th>Total Goal</th>
            </tr>
          </thead>
          <tbody>
      `;

      for($i=0; $i<data.standings[0].table.length; $i++)
      {
        standingHTML += `
            <tr>
              <td>${data.standings[0].table[$i].position}</td>
              <td><img src="${data.standings[0].table[$i].team.crestUrl}" onerror="imgError(this)" alt="Gambar ${data.standings[0].table[$i].team.name}" style="max-height: 50px;"> </td>
              <td>${data.standings[0].table[$i].team.name}</td>
              <td>${data.standings[0].table[$i].won}</td>
              <td>${data.standings[0].table[$i].draw}</td>
              <td>${data.standings[0].table[$i].lost}</td>
              <td>${data.standings[0].table[$i].goalsFor}</td>
            </tr>
        `;
      }
      standingHTML += `
          </tbody>
        </table>
      `;

    // MENYISIPKAN KOMPONEN CARD KE DALAM ELEMENT DENGAN id="standings"
    document.getElementById("standings").innerHTML = standingHTML;
  
    // MENGHAPUS PRELOADER
    document.getElementById("preLoad").innerHTML = "";
  })
  .catch(error);
}
