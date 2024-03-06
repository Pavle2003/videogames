console.log("START")

window.onload = function(){
    $.ajax({
        url:"js/Meni.json",
        method:"get",
        dataType:"json",
        success: function(data){
           // console.log(data)
           ispisNavigacije(data);
        },
        error: function(err){
            //console.log(err);
        }
    })

    $.ajax({
      url:"js/carousel.json",
      method:"post",
      dataType:"json",
      success: function(data){
         // console.log(data)
         generisiCarousel(data);
      },
      error: function(err){
          console.log(err);
      }
    })
    
    $.ajax({
      url:"js/about.json",
      method:"get",
      dataType:"json",
      success: function(data){
         // console.log(data)
         ispisAbout(data);
      },
      error: function(err){
          console.log(err);
      }
    }) 
    
    $.ajax({
      url:"js/3D.json",
      method:"get",
      dataType:"json",
      success: function(data){
         // console.log(data)
         generisi3D(data);
      },
      error: function(err){
          console.log(err);
      }
    })

    $.ajax({
      url:"js/review.json",
      method:"get",
      dataType:"json",
      success: function(data){
         // console.log(data)
         ispisiReview(data);
      },
      error: function(err){
          console.log(err);
      }
    })
    
}

function ispisNavigacije(nizLinkova){
  let html = "";
  let brojac = 0;
  let clas = "";
  for(let link of nizLinkova){
      if(brojac == 0 ){
          clas = "active";
      }
      else{
          clas = "";
      }
      html +=`<li class="nav item ${clas}"><a class="nav-link" href="${link.textLink}">${link.name}</a></li>`;
     brojac ++;
  }
  document.querySelector("#menu").innerHTML = html;
}

function generisiCarousel(data) {
  let html = '';
  data.forEach(function(item, index) {
    let activeClass = index === 0 ? 'active' : ''; // Postavljanje klase 'active' za prvi element

    let imageWidth = (item.picture.src === 'images/tekken8r.png') ? 'width="380"' : '';

    html += `<div class="carousel-item ${activeClass}">
              <div class="row">
                <div class="col-md-6">
                  <h1 class="video_text">${item.VGames}</h1>
                  <h1 class="controller_text">${item.type}</h1>
                  <p class="banner_text">${item.description}</p>
                  <div class="shop_bt"><a href="${item.shop_bt.link}">${item.shop_bt.text}</a></div>
                </div>
                <div class="col-md-6">
                  <div class="image_1"><img src="${item.picture.src}" alt="${item.picture.alt}" ${imageWidth}></div>
                </div>
              </div>
            </div>`;
  });
  
  document.getElementById('ispisCarousela').innerHTML = html;
}

function ispisAbout(data) {
  let html = '';
  
  data.forEach(function(item) {
    html += `<div class="col-md-6">
                <div class="image_2"><img src="${item.picture.src}" alt="${item.picture.alt}"></div>
              </div>
              <div class="col-md-6">
                <h1 class="about_text">${item.title}</h1>
                <p class="lorem_text">${item.textDES}</p>
                <button class="toggleButton shop_bt_2">${item.shop_bt.text1}</button>
              </div>`;
  });
  
  document.getElementById('About').innerHTML = html;

  $('.toggleButton').on('click', function() {
    $('.lorem_text').slideToggle(500);
    var buttonText = $(this).text();
    if (buttonText === "Hide text") {
      $(this).text("Hide text");
      console.log(buttonText)
    } else {
      $(this).text("Open the text");
      console.log(buttonText)
    }
  });
}

function generisi3D(data) {
  let html = ""

    html += `<div class="col-md-6">
                <h1 class="video_text_2">${data[0].title}</h1>
                <h1 class="controller_text_2">${data[1].text}</h1>
                <p class="banner_text_2">${data[2].description}</p>
                <div class="shop_bt"><a href="${data[3].shop_bt.link}">${data[3].shop_bt.text}</a></div>
              </div>
              <div class="col-md-6">
                <div class="image_4"><img src="${data[4].picture.src}" alt="${data[4].picture.alt}"></div>
              </div>`;
              
  document.getElementById("ispis3D").innerHTML = html;
}

function ispisiReview(data) {
  const container = document.querySelector('.testi-content');

  data.forEach(item => {
      const slide = document.createElement('div');
      slide.classList.add('slide', 'swiper-slide', 'slideT');
      
      const innerHTML = `
          <img src="${item.picture.src}" alt="${item.picture.alt}" class="slika"/>
          <p>${item.description}</p>
          <i class="fa-solid fa-quote-left quote-icon"></i>
          <div class="details">
              <span class="name">${item.name}</span>
              <span class="job">${item.work}</span>
          </div>
      `;
      slide.innerHTML = innerHTML;
      container.appendChild(slide);
  });

  const swiper = new Swiper('.mySwiper', {
      loop: true,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
  });
}
/*<div class="slide swiper-slide" id="slideT">
          <img src="images/people1.png" alt="People1" class="slika"/>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Harum officia deserunt dolore optio molestias ipsam aperiam 
            omnis amet obcaecati quasi, placeat accusantium rerum laboriosam
             quia accusamus vero architecto assumenda voluptatum!</p>
          <i class="fa-solid fa-quote-left quote-icon"></i>

          <div class="details">
            <span class="name">Martin Luter</span>
            <span class="job">Web Deweloper</span>
          </div>
        </div>*/
//validacija imena






var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
