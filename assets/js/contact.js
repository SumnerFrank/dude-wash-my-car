
  var submitBtn = document.querySelector('#btn');

submitBtn.addEventListener('click', function(e){
  var name = document.querySelector('#full-name');
  var email = document.querySelector('#E-Mail');
  var zip = document.querySelector('#Zipcode');

  name = name.value;
  localStorage.setItem('name', name);

  email = email.value;
  localStorage.setItem('email', email);

  zip = zip.value;
  localStorage.setItem('zip', zip);

});