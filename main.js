var variables = []

function executeCode(line) {
  //Clear output of the console
  document.getElementById('console').innerHTML = "test";
  variables = [];
  var code = document.getElementById('code').value.split("\n");
}
