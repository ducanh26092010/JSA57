// khai bao html element can sd
const switch_signin_btn = document.getElementById("signin-btn");
const switch_signup_btn = document.getElementById("signup-btn");
const signin_form = document.getElementById("signin-form");
const signup_form = document.getElementById("signup-form");
// xu li sk submit form dang nhap
function signin() {
    // lay du lieu tu input
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

  // tim du lieu trong local storage (email la key)
  const userData = localStorage.getItem(email);
  if (userData) {
    // chuyen kieu du lieu cho userData
    const user0bj = JSON.parse(userData); // string -> obj
    // ktra password
    if (user0bj.password === password) {
        alert("Dang nhap thanh cong!");
        // luu thong tin dang nhap
        localStorage.setItem("currentUser", email);
        // chuyen huong ve trang chu
        location.href = "../index.html";
    
    } else {
        // sai pass
        alert("Sai thong tin dang nhap!");
        return;
    }

} else {
    // kco du lieu ng dung
    alert("Email khong ton tai tren he thong!");
    return;
}
}
// ktra du lieu nhap vao
function validateSignupData(username, email, password, confirmPassword) {
    if (username.includes(" ")) {
        alert("Username khong duoc chua khoang trang!");
        return false;
    }
    if (confirmPassword !== password) {
        alert("Password va Confirm Password phai giong nhau!");
        return false;
    }
    if (localStorage.getItem(email)) {
        alert("Email da duoc su dung!");
    }
  return true;
}
// bat sk
signin_form.addEventListener("submit", function (event) {
    event.preventDefault(); // chan luong hd mac dinh tu HTML form
    signin();
});

//xu li sk form dki (Lưu trữ dữ liệu và LocalStorage)
function signup() {
    // lay du lieu tu input
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // ktra du lieu hop le
    const isValid = validateSignupData(
        username,
        email,
        password,
        confirmPassword
    );
    if (isValid) {
        // tao objet new user
        const newUser = {
            username,
            email,
            password,
        };
        // luu du lieu vao local storage
        localStorage.setItem(email, JSON.stringify(newUser));
        alert("Dang ki thanh cong!");
        // chuyen ve dang nhap
        switch_signin_btn.click();
    }
}

// bat sk
signup_form.addEventListener("submit", function (event) {
    event.preventDefault(); // chan luong hd mac dinh tu HTML form
    signup();
});



// ---------------------------------
// chuyển đổi giữa đăng nhập và đăng kí
switch_signin_btn.addEventListener("click", function () {
  signin_form.style.display = "block";
  signup_form.style.display = "none";

  this.classList.add("active"); // this = switch_signin_btn
  switch_signup_btn.classList.remove("active");
});

switch_signup_btn.addEventListener("click", function () {
  signin_form.style.display = "none";
  signup_form.style.display = "block";

  this.classList.add("active"); // this = switch_signup_btn
  switch_signin_btn.classList.remove("active");
});

