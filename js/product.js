 console.log("Radili")

$.ajax({
    url:"js/sortBy.json",
    method:"get",
    dataType:"json",
    success: function(data){
       // console.log(data)
       ispisSort(data);
    },
    error: function(err){
        //console.log(err);
    }
})

$.ajax({
    url:"js/platform.json",
    method:"get",
    dataType:"json",
    success: function(data){
       // console.log(data)
       ispisPlatform(data);
    },
    error: function(err){
        //console.log(err);
    }
})

$.ajax({
    url:"js/genre.json",
    method:"get",
    dataType:"json",
    success: function(data){
       // console.log(data)
       ispisGenre(data);
    },
    error: function(err){
        //console.log(err);
    }
})

$.ajax({
    url:"js/manufacturer.json",
    method:"get",
    dataType:"json",
    success: function(data){
       // console.log(data)
       ispisManufacturer(data);
    },
    error: function(err){
        //console.log(err);
    }
})

$.ajax({
    url:"js/proizvodi.json",
    method:"get",
    dataType:"json",
    success: function(data){
       // console.log(data)
       displayItem(data);
       search_animal(data)
    },
    error: function(err){
        //console.log(err);
    }
})


//Za uzimanje vrednosti koje cemo sortirati
$('#SortBy').on('change', 'input[type="radio"]', function() {
    let sortBy = $(this).next('label').text().trim();
    // Učitajte proizvode i primenite sortiranje
    $.ajax({
        url: "js/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            data = sortProducts(data, sortBy);
            displayItem(data);
        },
        error: function(err) {
            console.log(err);
        }
    });
});

//Funkcija za dinamicko ispisivanje sorta
function ispisSort(data) {
    let html = "";
    data.forEach(function(option) {
        html += `
            <div class="form-check" id="chbSort">
                <input class="form-check-input" type="radio" value="${option.value}" id="radio${option.ID}" name="opcija">
                <label class="form-check-label ms-3" for="radio${option.ID}">
                    ${option.label}
                </label>
            </div>`;
    });
    document.querySelector("#SortBy").innerHTML = html;

    $(document).on("change", "#chbSort", function(){
        let tip = $("#chbSort").val();
        let sortiraniProizvodi = [];
        if( tip == "chbSort"){
            proizvodi.sort(function(a, b){
                if(a.naziv < b.naziv){
                    return -1;
                }
                else if(a.naziv > b.naziv){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }
        if( tip == "nazivDesc"){
            proizvodi.sort(function(a, b){
                if(a.naziv > b.naziv){
                    return -1;
                }
                else if(a.naziv < b.naziv){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }
        if( tip == "cenaAsc"){
            proizvodi.sort(function(a, b){
                return a.cena.aktuelnaCena - b.cena.aktuelnaCena;
            })
        }
        if( tip == "cenaAsc"){
            proizvodi.sort(function(a, b){
                return b.cena.aktuelnaCena - a.cena.aktuelnaCena;
            })
        }
    })
}

//Funkcija za dinamicko ispisivanje platformi
function ispisPlatform (data) {
    let html = "";
    data.forEach(function(option) {
        html += `
            <div class="form-check" id="chbSort2">
            <input class="form-check-input Platform1" type="checkbox" value="" id="checkbox${option.ID}" data-platformid="cat-${option.ID}">
                <label class="form-check-label ms-3" for="checkbox${option.ID}">
                    ${option.label}
                    <span class="fw-bold ms-2 Proizvodjaci" data-id="${option.ID}">${option.count}</span>
                </label>
            </div>`;
    });
    document.querySelector("#Platform").innerHTML = html;
}


//Funkcija za dinamicko ispisivanje genrea
function ispisGenre (data) {
    let html = "";
    data.forEach(function(option) {
        html += `
            <div class="form-check">
                <input class="form-check-input Genre1" type="checkbox" value="" id="checkbox${option.ID}">
                <label class="form-check-label ms-3" for="checkbox${option.ID}">
                    ${option.label}
                    <span class="fw-bold ms-2 Proizvodjaci" data-id="${option.ID}">${option.count}</span>
                </label>
            </div>`;
    });
    document.querySelector("#Genre").innerHTML = html;
}

//Funkcija za dinamicko ispisivanje manufacturera
function ispisManufacturer (data) {
    let html = "";
    data.forEach(function(option) {
        html += `
            <div class="form-check">
                <input class="form-check-input Manufacturer1" type="checkbox" value="" id="checkbox${option.ID}">
                <label class="form-check-label ms-3" for="checkbox${option.ID}">
                    ${option.label}
                    <span class="fw-bold ms-2 Proizvodjaci" data-id="${option.ID}">${option.count}</span>
                </label>
            </div>`;
    });
    document.querySelector("#Manufacturer").innerHTML = html;
}

//Funkcija za dinamicko ispisivanje Proizvoda
function displayItem (data) {
    html = ""
    data.forEach(function(item) {
        html += `<div class="col-lg-4 col-md-4 col-12 az-opacity">
                    <div class="card mb-4 rounded-top-left rounded-top-right" style="border-top-left-radius: 2%; border-top-right-radius: 2%;">
                        <img src="${item.picture.src}" class="card-img-top" alt="${item.picture.alt}" width="300px">
                        <div class="card-body text-center">
                            <h5 class="card-title text-center" id="animals">${item.name}</h5>
                            <hr class="w-60 bg-primary" style="height: 2px;">
                            <p style="margin: 1px;">${printStars(item.stars.brStars)}<span class="fw-bold ms-2" data-id="1">${item.stars.count}</span></p>
                            
                            <div class="row flex" style="justify-content: center;" id="novac">
                            ${zameniPrice(item)}                
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary w-100" onclick="addToCart()">Add to Cart</button>
                        </div>
                        </div>
                    </div>
                </div>`
    });
    document.querySelector("#displayItem").innerHTML = html;   
}

//Funkcija za ispisivanje zvezdica na proizvodima
function printStars(numberOfStars) {
    html=""

    for(let i = 1; i <= 5; i++){
    if(i <= numberOfStars){
        html += `<i class="fas fa-star"></i>`
    } 
    else{
        html += `<i class="far fa-star"></i>`
    }
    }
    return html
}

//Funkcija za dodavanje margina cenama
function zameniPrice(item) {
    let html = "";
    if (item.price.old === "") {
        html += `<del class="col-6">${item.price.old}</del>
                <p class="col-6" style="margin: 31px;font-weight: 600;">${item.price.new}</p>`;
    } else {
        html += `<del class="col-6">${item.price.old}</del>
                <p class="col-6" style="margin: 15px;font-weight: 600;">${item.price.new}</p>`;
    }
    return html;
}

//Funkcija za sortiranje proizvoda
function sortProducts(data, sortBy) {
    switch (sortBy) {
        case 'Name Ascending':
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'Name Descending':
            data.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'Price Ascending':
            data.sort((a, b) => parseFloat(a.price.new) - parseFloat(b.price.new));
            break;
        case 'Price Descending':
            data.sort((a, b) => parseFloat(b.price.new) - parseFloat(a.price.new));
            break;
        default:
            break;
    }
    return data;
}

//Dohvatanje vrednosti iz search bara
$(document).ready(function() {
    // Učitajte sve proizvode kada se stranica prvi put učita
    displayAllItems();

    // Dodajte event listener na promenu teksta u search baru
    $('#searchBar').on('input', function() {
        let searchText = $(this).val().toLowerCase(); // Dobijte tekst unet u search baru i pretvorite ga u mala slova
        if (searchText.trim() === "") {
            displayAllItems(); // Ako je search bar prazan, prikažite sve proizvode
        } else {
            filterItemsBySearch(searchText); // Inače, filtrirajte proizvode na osnovu unetog teksta
        }
    });
});

// Funkcija koja prikazuje sve proizvode
function displayAllItems() {
    $.ajax({
        url: "js/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            displayItem(data);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

// Funkcija koja filtrira proizvode na osnovu unetog teksta u search baru
function filterItemsBySearch(searchText) {
    $.ajax({
        url: "js/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            let filteredData = data.filter(function(item) {
                // Filtrirajte proizvode na osnovu naziva ili drugih svojstava koji sadrže uneti tekst
                return item.name.toLowerCase().includes(searchText); // Ovde možete dodati i druga svojstva proizvoda za pretragu
            });
            // Ako ima proizvoda koji odgovaraju pretrazi, prikažite ih
            if (filteredData.length > 0) {
                displayItem(filteredData);
            } else {
                // Inače, ako nema proizvoda koji odgovaraju pretrazi, prikažite odgovarajuću poruku
                $('#displayItem').html('<p>No products found for the entered search criteria</p>');
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

$('#searchBar').on('input', function() {
    // Dobijte tekst iz pretraživača
    let searchText = $(this).val().toLowerCase();
    // Pozovite funkciju za ponovno filtriranje proizvoda sa unetim tekstom
    filterItems(null, searchText);
});

$('#SortBy').on('change', 'input[type="radio"]', function() {
    // Dobijte vrednost izabranog sorta
    let sortBy = $(this).next('label').text().trim();
    // Pozovite funkciju za ponovno filtriranje proizvoda sa izabranim sortom
    filterItems(sortBy);
});

$(document).on('change', '.Platform1, .Genre1, .Manufacturer1', function() {
    // Pozovite funkciju za ponovno filtriranje proizvoda sa izabranim parametrima
    filterItems();
});


function filterItems(sortBy = null, searchText = null) {
    // Dobijte ID-jeve odabranih platformi
    let selectedPlatforms = $('.Platform1:checked').map(function() {
        return $(this).data('platformid').split('-')[1];
    }).get();
    // Dobijte ID-jeve odabranih žanrova
    let selectedGenres = $('.Genre1:checked').map(function() {
        return $(this).attr('id').replace('checkbox', '');
    }).get();
    // Dobijte ID-jeve odabranih proizvođača
    let selectedManufacturers = $('.Manufacturer1:checked').map(function() {
        return $(this).attr('id').replace('checkbox', '');
    }).get();

    // Pozovite AJAX zahtev za proizvodima
    $.ajax({
        url: "js/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            // Filtrirajte proizvode na osnovu trenutnih parametara
            let filteredData = data.filter(function(item) {
                return (
                    (selectedPlatforms.length === 0 || selectedPlatforms.includes(item.platformID.toString())) &&
                    (selectedGenres.length === 0 || selectedGenres.includes(item.genreID.toString())) &&
                    (selectedManufacturers.length === 0 || selectedManufacturers.includes(item.manufacturerID.toString())) &&
                    (searchText === null || item.name.toLowerCase().includes(searchText))
                );
            });

            // Sortirajte proizvode ako je izabrano sortiranje
            if (sortBy !== null) {
                filteredData = sortProducts(filteredData, sortBy);
            }

            // Prikazati filtrirane i sortirane proizvode
            displayItem(filteredData);
        },
        error: function(err) {
            console.log(err);
        }
    });
}


// Dodajte event listener na klik dugmeta "Clean sort"
$('button.btn-primary').on('click', function() {
    // Resetujte sve izabrane opcije sortiranja
    $('input[type="radio"]').prop('checked', false);
    // Odčekirajte sve checkboxove
    $('input[type="checkbox"]').prop('checked', false);
    // Ponovo učitajte sve proizvode na početno stanje
    displayAllItems();
});

// Funkcija koja prikazuje sve proizvode
function displayAllItems() {
    $.ajax({
        url: "js/proizvodi.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            displayItem(data);
        },
        error: function(err) {
            console.log(err);
        }
    });
}


