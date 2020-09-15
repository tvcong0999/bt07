var curentPage = 1;

async function getData(url) {
  let response = await fetch(url);
  let users = await response.json();
  return users;
}
let url0 = "https://reqres.in/api/users?page=1&per_page=2";
getData(url0).then((users) => {
  loadData(users);
});
$(document).ready(function () {
  $("ul.pagination").on("click", "li a", function () {
    let clickPage = $(this).text();
    if (clickPage.indexOf("Next") != -1) {
      curentPage = parseInt(curentPage) + 1;
      if (curentPage > 6) curentPage = 6;
    }
    if (clickPage.indexOf("Previous") != -1) {
      curentPage = parseInt(curentPage) - 1;
      if (curentPage < 1) curentPage = 1;
    }
    if (!isNaN(clickPage)) curentPage = clickPage;
    let url = "https://reqres.in/api/users?page=" + curentPage + "&per_page=2";
    getData(url).then((users) => {
      loadData(users);
    });
    $("li").removeClass("active");
    let parent = $(this).parent();
    console.log($(this));

    $(parent).addClass("active");
  });
});

function loadData(users) {
  $("table tbody").empty();
  for (const user of users.data) {
    var tBody2 = `
    <tr>
      <td>${user.id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.email}</td>
      <td> <img src="${user.avatar}" alt="${user.email}" class="img-thumbnail" </td>
    </tr>
    `;
    // var tBody =
    //   '<tr> <th scope="row">' +
    //   user.id +
    //   "</th> <td>" +
    //   user.first_name +
    //   "</td> <td>" +
    //   user.last_name +
    //   "</td> <td>" +
    //   user.email +
    //   "</td> <td> <img src=" +
    //   user.avatar +
    //   " alt=" +
    //   user.email +
    //   ' class="img-thumbnail" </td> </tr>';
    $("table tbody").append(tBody2);
  }
}
