
function getAge() {
  var today = new Date();
  var birthDate = new Date(1995, 3, 21);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let proofs;
$.getJSON("data/proofs.json", function(data){
  proofs = data;
});

$('#age').html(getAge());

function showProof(name) {
  let i = 0;
  let isCheating = true;
  for (let property in proofs) {
    if (property === name) {
      isCheating = false;
      $('#modalTitle').html(proofs[name]["title"]);
      $('#modalImg').attr({
        'src': proofs[name]["src"],
        'alt': proofs[name]["alt"]
      });
    }
    i++;
  }

  if(isCheating){
    $('#modalTitle').html("<div class=\"alert alert-danger\" role=\"alert\"> Stop trying to change my site !!!! </div>");
    $('#modalImg').attr({
      'src': '',
      'alt': 'Image inexistante'
    });
  }
}
