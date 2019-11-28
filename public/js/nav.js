document.addEventListener("DOMContentLoaded", function() {
  // SIDEBAR NAV AKTIF
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // MUAT DAFTAR TAUTAN MENU
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // DAFTARKAN EVENT LISTENER UNTUK TERIAP TAUTAN MENU
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // TUTUP SIDENAV
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // MUAT KONTEN HALAMAN YANG DIPANGGIL
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // LOAD HALAMAN KONTENT
  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  
  loadPage(page);

  function loadPage(page) {
    
    // REQUEST API KETIKA PAGE SAMA DENGAN standing
    if(page == "standing")
    {
      getStanding();
    }
    // REQUEST API KETIKA PAGE SAMA DENGAN team
    if(page == "team")
    {
      getTeams();
    }
    // REQUEST API KETIKA PAGE SAMA DENGAN favorite
    if(page == "favorite")
    {
      lihatdariDB();
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
