var variables = []
var loops = []
var ifs = []

function executeCode(line) {

    // Clear output of the console
    document.getElementById('console').innerHTML = "";

    // Reset variables, loops, and ifs everytime the program is run.
    variables = [];
    loops = [];
    ifs = [];

    // Read in all the lines of code and split on new line.    No one line programs
    // are allowed.
    var code = document.getElementById('code').value.split("\n");

    // Find all of the ifs and loops and add them to a list
    for (var p = 0; p < code.length; p++) {
        if (code[p].startsWith("if")) {
            ifs.push(p);
        } else if (code[p].startsWith("while") || code[p].startsWith("for") || code[p].startsWith("do")) {
            loops.push(p);
        }
    }

    // The fun stuff
    for (var i = line; i < code.length; i++) {
        var current = code[i];
        console.log(i)
        console.log(variables)

        // Remove any comments that the user puts into the code
        current = current.split("//")[0];

        if (current == ""){
            // Do nothing
        } else if (current.toLowerCase().startsWith("declare ")) {
            if (current.includes("=")) {
                var var1 = current.substring(8);
                var1 = var1.replace(" = ", "=");
                var1 = var1.replace(" =", "=");
                var1 = var1.replace("= ", "=");
                var var2 = var1.split("=")[0]; // Var Name
                var var3 = var1.split("=")[1]; // Var Value
                if (var2 == "" || var3 == "") {
                    error("Syntax Error on line " + (i + 1) + ".");
                } else if ((checkVariableExistance(var1))===true){
                    error("Variable already exists");
                } else {
                    variables.push([var2,var3]);
                }
            } else {
                var var1 = current.substring(8);
                if (var1 == ""){
                    error("Syntax Error on line " + (i + 1) + ".");
                } else if ((checkVariableExistance(var1))===true){
                    error("Variable already exists");
                } else {
                    variables.push([var1,null]);
                }
            }

        } else if (current.toLowerCase().startsWith("display ")) {
          var print1 = current.substring(8);
          print1 = print1.replace("\\n", "<br/>");
          document.getElementById('console').innerHTML += replaceVariables(print1) + '<br/>';

        } else if (current.toLowerCase().startsWith("assign ")) {
            if (current.includes("=")) {
                var var1 = current.substring(7);
                var1 = formatEquals(var1);
                var var2 = var1.split("=")[0]; // Var Name
                var var3 = var1.split("=")[1]; // Var Value
                if (var2 == "" || var3 == "") {
                    error("Syntax Error on line " + (i + 1) + ".");
                } else if ((checkVariableExistance(var1))===false){
                    updateVariable(var2,var3);
                } else {
                    error("Variable does not exist");
                }

            } else {
                error("Syntax Error on line " + (i + 1) + ".");
            }

        } else if (current.toLowerCase().startsWith("input ")) {
            var input1 = current.substring(6);
            if (input1 == "") {
                alert("Syntax Error on line " + (i + 1) + ".");
            } else if (checkVariableExistance(input1)) {
                var input2 = prompt(); // Need to change from prompt
                updateVariable(input1,input2);
            } else {
               error("Error: Variable does not exist");
            }
        }
    }
}

function replaceVariables(string) {
    // Need to work on this
    return string
}

function getVariable(varName) {
    for (var i = 0; i < variables.length; i++) {
        if (variables[i][0] == varName){
            return variables[i][1];
        }
    }
    error("The variable " + varName + " is not declared.");
}

function updateVariable(varName, value){
  for (var i = 0; i < variables.length; i++){
    if (variables[i][0] === varName) {
      variables[i][1] = value;
      return;
    }
  }
  error("Syntax error: Variable " + varName + " does not exist.");
}

// If variable exists return true. Otherwise return false
function checkVariableExistance(varName) {
    if (variables.length == 0){
        return false;
    }
    for (var i = 0; i < variables.length; i++){
        if (variables[i][0] === varName) {
            return true;
        }
    }
    return false;
}

// Standard error msg function. Want to convert to a banner.
function error(errorMsg) {
    alert(errorMsg);

    // Need to crash program
}

function formatEquals(var1) {
    var1 = var1.replace(" = ", "=");
    var1 = var1.replace(" =", "=");
    var1 = var1.replace("= ", "=");
    return var1
}
