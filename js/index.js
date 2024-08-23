const imgArr =["./images/1.jpg.png","./images/2.jpg.jpg","./images/3.jpg.jpg"];
let imgIndex =0;
function prev(){
    if(imgIndex ==0){
        imgIndex = imgArr.length-1;
    }else{
        imgIndex--;
    }
    const imgElement =document.getElementById("img");
    imgElement.src =imgArr[imgIndex]
}
function next(){
    if(imgIndex == imgArr.length-1){
        ImgIndex =0;
    }else{
        imgIndex++;
    }
    const imgElement =document.getElementById("img");
    imgElement.src =imgArr[imgIndex];
}