let currentImage = "";

/* CAMERA */
async function startCamera(){
  const video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({ video:true });
  video.srcObject = stream;
}

function capture(){
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video,0,0);

  currentImage = canvas.toDataURL("image/jpeg",0.9);
  document.getElementById("preview").src = currentImage;
}

/* UPLOAD */
function uploadImage(){
  fetch("YOUR_SCRIPT_URL",{
    method:"POST",
    body:JSON.stringify({ image:currentImage })
  })
  .then(r=>r.json())
  .then(data=>{
    window.location.href = "thankyou.html";
  });
}

/* GALLERY */
function loadGallery(){
  fetch("https://script.google.com/macros/s/AKfycbzytoe3XqFhQkYc65NquU0gedqSruev39a7yVBPp_2pLETEK90g7t_3GRKunNBx5RyKLA/execgallery=1")
  .then(r=>r.json())
  .then(data=>{
    const box = document.getElementById("gallery");
    data.images.forEach(url=>{
      let img = document.createElement("img");
      img.src = url;
      box.appendChild(img);
    });
  });
}