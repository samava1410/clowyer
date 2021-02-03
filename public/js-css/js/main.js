$(document).foundation();

function showSuccessMessage(){
	alert("Agregado");
}

function deleteCase(id){
  $.ajax({
    url: '/case-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}

function deleteClient(id){
  $.ajax({
    url: '/client-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}

function deleteCourt(id){
  $.ajax({
    url: '/court-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}

$("#searchCase").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableCase tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

$("#searchClient").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableClient tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

$("#searchCourt").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableCourt tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
$('.unmask').on('click', function(){

  if($(this).prev('input').attr('type') == 'password')
    changeType($(this).prev('input'), 'text');

  else
    changeType($(this).prev('input'), 'password');

  return false;
});

function changeType(x, type) {
  if(x.prop('type') == type)
  return x; //That was easy.
  try {
    return x.prop('type', type); //Stupid IE security will not allow this
  } catch(e) {
    //Try re-creating the element (yep... this sucks)
    //jQuery has no html() method for the element, so we have to put into a div first
    var html = $("<div>").append(x.clone()).html();
    var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
    //If no match, we add the type attribute to the end; otherwise, we replace
    var tmp = $(html.match(regex) == null ?
      html.replace(">", ' type="' + type + '">') :
      html.replace(regex, 'type="' + type + '"') );
    //Copy data from old element
    tmp.data('type', x.data('type') );
    var events = x.data('events');
    var cb = function(events) {
      return function() {
            //Bind all prior events
            for(i in events)
            {
              var y = events[i];
              for(j in y)
                tmp.bind(i, y[j].handler);
            }
          }
        }(events);
        x.replaceWith(tmp);
    setTimeout(cb, 10); //Wait a bit to call function
    return tmp;
  }
}