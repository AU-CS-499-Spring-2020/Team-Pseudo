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

        // Remove any comments that the user puts into the code
        current = current.split("//")[0];

        if (current == ""){
            // Do nothing
        } else if (current.startsWith("var ")) {
            if (current.includes("=")) {
                var var1 = current.substring(4);
                var1 = var1.replace(" = ", "=");
                var1 = var1.replace(" =", "=");
                var1 = var1.replace("= ", "=");
                var var2 = var1.split("=")[0]; // Var Name
                var var3 = var1.split("=")[1]; // Var Value
                if (var2 == "" || var3 == "") {
                    alert("Syntax Error on line " + (i + 1) + ".");
                } else {
                    if (var3.startsWith("random(") && endsWith(")")) {
                        var random1 = var3.substring(7);
                    }
                    variables.push(var2 + "=" + replaceVars(var3));
                }
            }

        } else if (current.startsWith("Display ")) {
          var print1 = current.substring(8);
          print1 = print1.replace("\\n", "<br>");
          document.getElementById('console').append(print1);

        } else if (current.startsWith("Assign ")) {

        } else if (current.startsWith("Input ")) {
            var input1 = current.substring(6);
            if (input1 == "") {
                alert("Syntax Error on line " + (i + 1) + ".");
            } else { // Need to do a check to see if the variable exists.
                var input2 = prompt(); // Need to change from prompt
                variables.push(input1 + "=" + input2);
            // } else {
            //   alert("Error: Variable does not exist")
            }

        }



    }
}
