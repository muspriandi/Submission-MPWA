// BUAT DB DENGAN INDEXED DB
var dbPromise = idb.open("db_bola", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("teams")) {
    var peopleOS = upgradeDb.createObjectStore('teams', {keyPath: 'idTeam'});
    peopleOS.createIndex("teamName", "teamName", { unique: false });
    peopleOS.createIndex("shortName", "shortName", { unique: false });
    peopleOS.createIndex("clubColor", "clubColor", { unique: false });
    peopleOS.createIndex("teamLogo", "teamLogo", { unique: false });
    peopleOS.createIndex("created_at", "created_at", { unique: false });
  }
});

// READ ALL DATA
function lihatdariDB() {
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
    }).then(function(items) {
      var page = window.location.hash.substr(1)
      var isi = "";
      for(i=0; i<items.length; i++) {
        isi += `
          <tr>
            <td>${(i+1)}</td>
            <td>${items[i].idTeam}</td>
            <td><img src="${items[i].teamLogo}" onerror="imgError(this)" alt="${items[i].teamName}" width="50px"></td>
            <td>${items[i].teamName}</td>
            <td>${items[i].shortName}</td>
            <td>${items[i].clubColor}</td>
            <td>
                <button onclick='hapusdariDB(${items[i].idTeam})' class="waves-effect waves-light btn red">Hapus</button>
            </td>
          </tr>
        `;
      }

      if(isi == ""){
        isi = "<tr><td colspan='7'><label><p class='flow-text' style='margin-bottom: 0;'>Data pada Indexed DB kosong!</p>Silahkan tambahkan Tim Favorit Anda.<br>.</label></td></tr>";
      }
      
      if(document.getElementById("isiTabelDariDB") == null) {
        lihatdariDB();  // UNTUK MENGHINDARI DATA DARI INDEXED DB TIDAK MAU DI BUKA
      }
      else {
        document.getElementById("isiTabelDariDB").innerHTML = isi;
      }
    });
};

// FUNGSI UNTUK CEK APAKAH TIM SUDAH ADA DALAM LIST FAVORIT
function cekFavorite(idTeam) {
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    // mengambil primary key berdasarkan idTeam
    return store.get(idTeam); 
  }).then(function(val) {
    if(val != null && val.idTeam == idTeam) {
      // JIKA TIM TELAH MENJADI FAVORIT, MAKA TOMBOL DI 'DISABLE' DAN EFEK 'PULSE' DIMATIKAN/DIHAPUS
      if(val.idTeam == idTeam) {
        var x = document.getElementById("button"+idTeam);
        x.innerHTML="<button type='button' onclick='hapusdariDB("+idTeam+")' class='waves-effect waves-light btn red' style='position: absolute; left:10%; bottom: 20px; width:80%;'>- Favorite</button>";
      }
    }
  });
}

// FUNGSI UNTUK SIMPAN DATA KE INDEXED DB
function simpankeDB(id) {
    var a = document.forms["form"+id]["teamName"].value;
    var b = document.forms["form"+id]["shortName"].value;
    var c = document.forms["form"+id]["clubColor"].value;
    var d = document.forms["form"+id]["teamLogo"].value;

    //CREATE DATA
    dbPromise.then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        var item = {
            idTeam: id,
            teamName: a,
            shortName: b,
            clubColor: c,
            teamLogo: d,
            created_at: new Date().getTime()
        };
        store.add(item);
        return tx.complete;
    }).then(function() {
      M.toast({html: 'Data berhasil disimpan.', classes: 'rounded'});
      getTeams();
    }).catch(function() {
      M.toast({html: 'Data gagal disimpan.', classes: 'rounded'});
      getTeams();
    })
}

// FUNGSI UNTUK MENGHAPUS RECORD TERTENTU (BERDASARKAN ID) DARI INDEXED DB
function hapusdariDB(id) {
  // DELETE DATA
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(id);
    return tx.complete;
  }).then(function() {
    M.toast({html: 'Data berhasil dihapus.', classes: 'rounded'});
    lihatdariDB();
    getTeams();
  });
}