let birthDate = new Date(1995, 4, 21);
let todayDate = new Date();
let age = (todayDate-birthDate)/(1000*60*60*24*365);
let proofs;
$.getJSON("data/proofs.json", function(data){
  proofs = data;
});

$('#age').html(parseInt(age));

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

  gtag('select_content', {'content_type': name});

  if(isCheating){
    $('#modalTitle').html("<div class=\"alert alert-danger\" role=\"alert\"> Stop trying to change my site !!!! </div>");
    $('#modalImg').attr({
      'src': '',
      'alt': 'Image inexistante'
    });
  }
}