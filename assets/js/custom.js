const nav = document.querySelector("nav");
const logo = document.getElementById("grit-logo");
const socialIcons = document.getElementById("navSocialIcons");
let dropArea = document.getElementById('drop-area')


//The function is invoked on the hashchange event,
//which is fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the # symbol)
function changeColorOnHashChange() {
  if (location.hash == "#career" || location.hash == "#our-work") {
    nav.classList.add("changeColor");
    socialIcons.classList.add("changeColor")
    logo.classList.add("changeColorLogo");
  } else if (location.hash == "#contact") {
    nav.classList.add("changeColor");
    logo.classList.remove("changeColorLogo");
    socialIcons.classList.remove("changeColor")
  } else {
    nav.classList.remove("changeColor");
    logo.classList.remove("changeColorLogo");
    socialIcons.classList.remove("changeColor")
  }
}

//The function is invoked on the onload event. If the client loads the page from a certain fragment identifier,
//the function will execute.
function changeColorOnLoad() {
  if (location.hash == "#career" || location.hash == "#our-work") {
    nav.classList.add("changeColor");
    socialIcons.classList.add("changeColor")
    logo.classList.add("changeColorLogo");
  } else if (location.hash == "#contact") {
    nav.classList.add("changeColor");
  }
}

function getFileName(fileName){

  var newFileName=fileName.replace(/^.*\\/,"");
  $('#display-file-name').html(newFileName)

}
