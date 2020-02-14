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

        } 
        //Display pseudocode has strings use quotation marks, variable names use no
        //Quotation marks, and concatinates strings with commas
        else if (current.toLowerCase().startsWith("display ")) {
          var print1 = current.substring(8);
          //Tracks if we're currently within a string in quotes
          var isString = false;
          for (var i=0; i < print1.length; i++) {
            //Checks for spaces
            if (print1.charAt(i) == " ") {
                console.log("space")
                //Prints the space if we're in the middle of a string
                if (isString)
                    document.getElementById('console').innerHTML += print1.charAt(i);
                //pass
            }
            //Checks for commas
            else if (print1.charAt(i) == ",") {
                console.log("comma")
                //Prints the comma if we're in the middle of a string
                if (isString)
                    document.getElementById('console').innerHTML += print1.charAt(i);
                //pass
            }
            //Checks for quotes
            else if (print1.charAt(i) == "\"") {
                console.log("quote")
                if (isString == false)
                    isString = true;
                else
                    isString = false;
            }
            //Checks for anything else, meaning a variable name has started
            else {
                console.log("nothing")
                //If it's in a quoted string, print it
                if (isString)
                    document.getElementById('console').innerHTML += print1.charAt(i);
                else {
                    //Find the index where the variable ends
                    var spaceIndex = print1.substring(i,print1.length).indexOf(",")
                    console.log(print1.substring(i,print1.length))
                    console.log("Space" + spaceIndex)
                    //Checks if the line ends after this variable
                    if (spaceIndex <= 0)
                        spaceIndex = print1.length - i;
                    console.log("Space" + spaceIndex)

                    //Grabs the variable name from current point to the comma/end of line
                    var VariableName = print1.substring(i,(i + spaceIndex))
                    console.log(VariableName)
                    console.log(VariableName.length)
                    //Move i forward to the end of the variable name
                    i = i + VariableName.length
                    console.log("V: "+ VariableName)
                    console.log(VariableName.length)
                    VariableName = VariableName.trim()
                    console.log("V: "+ VariableName)
                    console.log(VariableName.length)
                    console.log(i)
                    if (checkVariableExistance(VariableName)) {
                        //Getting the variable needs to be updated
                        document.getElementById('console').innerHTML += getVariable(VariableName);
                    } else {
                        error("Variable \"" + VariableName +"\" does not exist");
                    }
                }
            }
          }
          document.getElementById('console').innerHTML += '<br/>';

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
