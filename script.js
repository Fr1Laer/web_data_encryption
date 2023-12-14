var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+_";

// Адмін
var admin = {
  admin: "admin",
};

// Звичайні користувачі
var users = {
  user1: "PaSSwoRD1",
  user2: "my_password123",
};

// Масив для збереження незашифрованих даних користувачів для адміністратора
var userInfoAdmin = [];

// Функція для перевірки логіну та паролю
function checkLogin() {
  var loginInput = document.getElementById("login").value;
  var passwordInput = document.getElementById("password").value;

  if (admin.hasOwnProperty(loginInput) && admin[loginInput] === passwordInput) {
    // Адміністратор

    // Якщо логін та пароль введені адміном
    var userKeys = Object.keys(users);

    // Проходимося по користувачах та формуємо дані в форматі "Користувач: {ім'я}, Пароль: {пароль}"
    for (var i = 0; i < userKeys.length; i++) {
      var userKey = userKeys[i];
      var userInfo = `Користувач: ${userKey}, Пароль: ${users[userKey]}`;
      userInfoAdmin.push(userInfo);
    }

    // Зберігаємо масив з незашифрованими даними в Local Storage
    localStorage.setItem(
      "userInfoAdmin",
      JSON.stringify(userInfoAdmin, null, 1)
    );

    // Перенаправляємо на сторінку адміністратора
    window.location.href = "admin.html";

    // Перевірка, чи введений логін та пароль відповідають даним конкретного користувача в об'єкті users
  } else if (
    users.hasOwnProperty(loginInput) &&
    users[loginInput] === passwordInput
  ) {
    // Якщо логін та пароль введені звичайним користувачем

    // Формуємо дані користувача в форматі "Користувач: {ім'я}, Пароль: {пароль}"
    var userInfo = `Користувач: ${loginInput}, Пароль: ${users[
      loginInput
    ].toLowerCase()}`; // додаємо toLowerCase() щоб переводити літери паролю в нижній регістр (щоб шифрувати літери верхнього регістру)

    // Шифруємо дані користувача та зберігаємо у Local Storage
    var encryptedInfo = encrypt(userInfo, 15); // зсув на 15 позицій
    localStorage.setItem("userInfo", encryptedInfo);

    window.location.href = "user.html";
  } else {
    alert("Неправильний логін або пароль");
  }
}

// Функція для зсуву символів (шифрування)
function encrypt(text, shift) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var char = text.charAt(i);
    var index = alphabet.indexOf(char);
    if (index !== -1) {
      var newIndex = (index + shift) % alphabet.length;
      result += alphabet[newIndex];
    } else {
      result += char;
    }
  }
  return result;
}
