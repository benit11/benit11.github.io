
function modal_detail(id, desc, img, nama, tutor) {
   // Set data to the modal elements
   $("#workoutName").text(nama);
   $("#workoutDesc").text(desc);
   $(".modal-image").attr("src", "images/" + img);
   $(".btn-tutor").attr("href", tutor);
 
    // Save data to sessionStorage
    const workoutData = { id: id, desc: desc, img: img, nama: nama };
    sessionStorage.setItem(nama, JSON.stringify(workoutData));
   // Show the modal
   $("#workoutModal").modal("show");
  // if (navigator.onLine) {
  //   // Fetch data from network and show modal
  //   fetch(url)
  //     .then(function (res) {
  //       return res.json();
  //     })
  //     .then(function (data) {
  //       // Set modal data
  //       $("#workoutName").text(nama);
  //       $("#workoutDesc").text(desc);
  //       $(".modal-image").attr("src", "images/" + img);
  //       $(".btn-tutor").attr("href", tutor);

  //       const workoutData = { id: id, desc: desc, img: img, nama: nama };
  //       sessionStorage.setItem(nama, JSON.stringify(workoutData));

  //       // Show modal
  //       $("#workoutModal").modal("show");
  //     });
  // } else {
  //   // Check if data exists in localStorage
  //   const workoutData = JSON.parse(sessionStorage.getItem(nama));
  //   if (workoutData) {
  //     // Set modal data from localStorage
  //     $("#workoutName").text(workoutData.nama);
  //     $("#workoutDesc").text(workoutData.desc);
  //     $(".modal-image").attr("src", "images/" + workoutData.img);
  //     $(".btn-tutor").attr("href", workoutData.tutor);

  //     // Show modal
  //     $("#workoutModal").modal("show");
  //   } else {
  //     // Modal cannot be opened offline without cached data
  //     alert("Data tidak tersedia saat offline. Silahkan hubungkan internet Anda untuk membuka modal.");
  //   }
  // }
}


// Mengubah fungsi cardButton.click pada fungsi createCards
function createCards() {
  const container = $("#activity");
  const workouts = JSON.parse(localStorage.getItem("workouts"));

  Object.entries(workouts).forEach(([key, value]) => {
    const cardWrapper = $("<div>").addClass("col");
    cardWrapper.css({
      width: "24rem",
      marginRight: "30px",
      border: "0px solid transparent",
    });

    const cardBody = $("<div>").addClass("card-body").css({
      display: "flex",
      flexDirection: "column",
    });

    const cardImageWrapper = $("<div>").css({ position: "relative" });
    const cardImage = $("<img>").addClass("card-img-top").attr({
      src: "images/" + value.img,
      alt: "Card image cap",
    });
    cardImageWrapper.append(cardImage);

    const cardButton = $("<a>").addClass("btn").text(value.nama).attr({
      "data-bs-toggle": "modal",
      "data-bs-target": "#workoutModal" // Use generic modal ID here
    });
    cardButton.css({
      backgroundColor: "rgb(18, 4, 30)",
      color: "white",
    });

    let alertShown = false; // Variabel untuk menunjukkan apakah alert telah ditampilkan atau tidak

    cardButton.click(() => {
      if (navigator.onLine) { // Memastikan data telah diterima dari jaringan
        modal_detail(value.id, value.desc, value.img, value.nama, value.tutor);
      } else {
        // console.log(value.nama);
        const workoutData = JSON.parse(sessionStorage.getItem(value.nama));
        if (workoutData) {
          if (!alertShown) { // Memeriksa apakah pesan alert sudah ditampilkan sebelumnya
            alert("Data tersimpan secara lokal. Silahkan hubungkan internet Anda untuk memperbarui data.");
            alertShown = true; // Mengatur bahwa pesan alert telah ditampilkan
          }
          // Modal tidak dipanggil di sini karena data tersedia secara lokal
        } else {
          if (!alertShown) { // Memeriksa apakah pesan alert sudah ditampilkan sebelumnya
            alert("Data tidak tersedia secara lokal. Silahkan hubungkan internet Anda untuk membuka modal.");
            alertShown = true; // Mengatur bahwa pesan alert telah ditampilkan
          }
          // Modal tidak dipanggil di sini karena data tidak tersedia secara lokal
        }
      }
    });

    cardBody.append( cardImageWrapper, cardButton);
    cardWrapper.append(cardBody);
    container.append(cardWrapper);
  });
}


var url =
"https://tes1-ambw-c14210125-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json";
let networkDataReceived = false;

if ("indexedDB" in window) {
  readAllData("workouts").then(function (data) {
    console.log("data in indexedDB");
    console.log(data);
  });
}

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataReceived = true;
    localStorage.setItem("workouts", JSON.stringify(data));
  })
  .catch(function (error) {
    if (!localStorage.getItem("workouts")) {
      window.location.href = "offline.html";
    }
  });

  