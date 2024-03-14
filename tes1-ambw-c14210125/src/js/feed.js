
function modal_detail(id, desc, img, nama, tutor) {
  // Set data to the modal elements
  $("#workoutName").text(nama);
  $("#workoutDesc").text(desc);
  $(".modal-image").attr("src", "images/" + img);
  $(".btn-tutor").attr("href", tutor);

   // Save data to sessionStorage
   const workoutData = { id: id, desc: desc, img: img, nama: nama };
   sessionStorage.setItem("workoutModalData", JSON.stringify(workoutData));
  // Show the modal
  $("#workoutModal").modal("show");
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

    // Mengubah cardButton.click untuk menampilkan modal_detail saat tombol ditekan
    cardButton.click(() => {
      if (networkDataReceived) { // Memastikan data telah diterima dari jaringan
        modal_detail(value.id, value.desc, value.img, value.nama, value.tutor);
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

  