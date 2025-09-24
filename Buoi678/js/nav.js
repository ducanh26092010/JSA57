// lay link can chinh sua trong nav
const signin_link = document.getElementById("signin_link");
const signout_link = document.getElementById("signout_link");
// ktra neu da dang nhap -> hien link singout
if (localStorage.getItem("currentUser")) {
    signin_link.style.display = "none"; // an link signin
    signout_link.style.display = "none"; // hien link signout
} else {
    // chua dang nhap -> hien link signin
    signin_link.style.display = "block"; // hien link signin
    signout_link.style.display = "none"; // an link signout
}