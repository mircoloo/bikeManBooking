//search params of the query
const queryParams = new URL(document.URL).searchParams;

//====================JQUERY===================
$(document).ready(function () {
  $("#info-modify-btn").click(() => {
    $(".update-info").css({ visibility: "visible" });
    $("#info-confirm-btn").css({ visibility: "visible" });
  });

  $("#info-confirm-btn").click(() => {

    let nome_upd = $("#update-nome-input").val();
    let cognome_upd = $("#update-cognome-input").val();
    let indirizzo_upd = $("#update-indirizzo-input").val();
    let email_upd = $("#update-email-input").val();
    let telefono_upd = $("#update-telefono-input").val();
    let bikes_upd = $("#add-bike-input").val();
    let ebikes_upd = $("#add-ebike-input").val();

    var data = {};

    if(nome_upd != '') data['nome'] = nome_upd;

    if(cognome_upd != '') data['cognome'] = cognome_upd;

    if(indirizzo_upd != '') data['indirizzo'] = indirizzo_upd;

    if(email_upd != '') data['email'] = email_upd;

    if(telefono_upd != '') data['telefono'] = telefono_upd;

    if(bikes_upd != '') data['bikes'] = bikes_upd;

    if(ebikes_upd != '') data['ebikes'] = ebikes_upd;


    let email = $("#email-span").text();
    $.ajax({
      url: "/api/v1/users/" + email,
      type: "PUT",
      data: data,
      dataType: "json",
      success: () => {},
    });
 
    $(".update-info").css({ visibility: "hidden" });
    $("#info-confirm-btn").css({ visibility: "hidden" });
    //$("input").reset()
    //window.location = window.location.href;
    
    location.reload();
    return false;
  });
  
});

