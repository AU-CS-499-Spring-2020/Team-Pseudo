
var variables = []
var loops = []
var functions = []

function main() {
    document.getElementById('console').innerHTML = "";

    var code = document.getElementById('code').value.split("\n");
    var start = -1;

    // Find all of the loops and add them to a list
    for (var p = 0; p < code.length; p++) {
        if (code[p].startsWith("Module ")) {
            var temp = code[p].substring(7);
            temp = temp.split("(")[0];
            temp = temp.trim();
            functions.push([temp, p+1]);
        }
    }

    for (var p = 0; p < functions.length; p++) {
        if (functions[p][0].startsWith("main")){
            start = functions[p][1];
        }
    }

    if (start != -1){
        executeCode(start);
    } else {
        error("Your program does not have a main method.");
    }

}

function executeCode(line) {

    // Clear output of the console
    // document.getElementById('console').innerHTML = "";

    // Reset variables, loops, and ifs everytime the program is run.
    variables = [];
    loops = [];
    inIf = false
    inSelect = false
    selectCond = null
    foundCase = false
    finishedCase = true

    // Read in all the lines of code and split on new line. No one line programs
    // are allowed.
    var code = document.getElementById('code').value.split("\n");

    // Find all of the loops and add them to a list
    var tempLoops = [];
    for (var p = 0; p < code.length; p++) {
        code[p] = code[p].trim();
        if (code[p].startsWith("While") || code[p].startsWith("Do")) {
            tempLoops.push(p);
        } else if (code[p].startsWith("End While") || code[p].startsWith("End Do While")) {
            if (tempLoops.length != 0){
                loops.push([tempLoops.pop(),p]);
            } else {
                error("Issue with too few While Statements");
            }
        }
    }
    if (tempLoops.length != 0){
        error("Issue with too many While Statements");
    }

    // The fun stuff
    for (var i = line; i < code.length; i++) {
        var current = code[i].replace(/^\s+/g, ''); //Removes white space from the left side for indentation
        console.log("Line " + (i + 1))
        console.log(variables)
        console.log("Line " + (i + 1))
        console.log(variables)

        // Remove any comments that the user puts into the code
        current = current.split("//")[0];

        //Checks if the line is inside an if statement
        if (inIf) {
            testCond = current.trim()
            //console.log(testCond)
            if (testCond == "End If") {
                inIf = false
                result = null
                continue
            }
            else if (testCond == "Else" && result == true) {
                result = false
                continue
            }
            else if (testCond == "Else" && result == false) {
                result = true
                continue
            }
            else if (result == false) {
                continue
            }
            else if (result == true) {
                //Pass and perform the code
            }
        }

        //Checks if the line is inside a Select statement
        if (inSelect) {
            if (current == "End Select") {
                finishedCase = true
                inSelect = false
                continue
            }
            else if (!foundCase) {
                if (current.startsWith("Case ")) {
                    caseEx = current.substring(5)
                    if (caseEx.endsWith(":")) {
                        caseEx = caseEx.slice(0, caseEx.length - 1)
                    }
                    if (evaluatePhrase(caseEx.toString()).toString() == compareEx) {
                        foundCase = true
                        finishedCase = false
                        continue
                    }
                }
                else if (current.startsWith("Default") && !foundCase) {
                    foundCase = true
                    finishedCase = false
                    continue
                }
                continue
            }
            else if (current.startsWith("Default") && foundCase) {
                finishedCase = true
                continue
            }
            else {
                if (current.startsWith("Case")) {
                    finishedCase = true
                    continue
                }
                else if (finishedCase)
                    continue
                //console.log("pass")
                //Pass and perform the code
            }

        }

        if (current == "") {
            // Do nothing
        } else if (current.startsWith("Declare ")) {
            // Where we declare variables
            var var1 = current.substring(8);
            var varType = var1.split(" ")[0];
            if (varType == "Integer") {
                varType = 0;
                var1 = var1.substring(8);
            } else if (varType == "Real") {
                varType = 1;
                var1 = var1.substring(5);
            } else if (varType == "String") {
                varType = 2;
                var1 = var1.substring(7);
            } else if (varType == "Character") {
                varType = 3;
                var1 = var1.substring(10);
            } else if (varType == "Boolean") {
                varType = 4;
                var1 = var1.substring(8);
            } else {
                error("invalid variable type")
            }

            if (current.includes("=")) {
                var1 = formatEquals(var1)
                for (x = 0; x < var1.length; x++) {
                    if (var1[x] == "=") {
                        var var2 = var1.slice(0, x) //Var Name
                        var var3 = var1.slice(x + 1, var1.length) //Var Value
                        x = var1.length
                    }
                }
                var3 = evaluatePhrase(var3).toString()
                //console.log("name " + var2);
                //console.log("value " + var3);

                //Makes sure the variable name is valid
                checkValidName(var2)

                if (var2.includes("[") || var2.includes("]")) {
                    error("You cannot assign anything to an array as you declare it")
                }

                if (var2 == undefined || var3 == undefined) {
                    error("Syntax Error on line " + (i + 1) + ".");
                } else if ((checkVariableExistance(var2)) === true) {
                    error("Variable " + var2 + " already exists");
                } else {
                    if (varType == 0) {
                        if (isInteger(var3) || isReal(var3)) {
                            var3 = var3.split(".")[0];
                            variables.push([var2, var3, varType]);
                        } else {
                            error(var2 + " is not an Integer value")
                        }
                    } else if (varType == 1) {
                        if (isReal(var3)) {
                            variables.push([var2, var3, varType]);
                        } else if (isInteger(var3)) {
                            var3 = var3 + "."
                            variables.push([var2, var3, varType]);
                        } else {
                            error(var2 + " is not a Real value")
                        }
                    } else if (varType == 2) {
                        var3 = "\"" + var3 + "\""
                        variables.push([var2, var3, varType]);
                    } else if (varType == 3) {
                        //I dont like the autonarrowing
                        var3 = var3.charAt(0);
                        var3 = "\'" + var3 + "\'"
                        variables.push([var2, var3, varType]);
                    } else if (varType == 4) {
                        //console.log("var 3 " + var3)
                        if (var3 == "true" || var3 == true) {
                            variables.push([var2, true, varType]);
                        }
                        else if (var3 == "false" || var3 == false) {
                            variables.push([var2, false, varType]);
                        }
                        else {
                            error(var2 + " is not a Boolean True or False value")
                        }

                    } else {
                        error("You should never reach here");
                    }
                    //console.log(var2 + " = " + var3)
                    //Eval creates the variable in the background
                    tryEval(var2 + " = " + var3)
                }
            } else {
                if (var1 == "") {
                    error("Syntax Error on line " + (i + 1) + ".");
                } else if ((checkVariableExistance(var1)) === true) {
                    error("Variable already exists");
                } else {
                    //Makes sure the variable name is valid
                    checkValidName(var1)
                    //Checks if the variable is an array
                    if (var1.includes("[") && var1.includes("]")) {
                        for (x = 0; x < var1.length; x++) {
                            if (var1[x] == "[") {
                                var size = var1.slice(x + 1, var1.length - 1)
                                var1 = var1.slice(0, x)
                                size = evaluatePhrase(size)
                                //console.log(size + ", " + var1)
                            }
                        }
                        tryEval(var1 + "= []")
                        variables.push([var1, [], varType, size]);
                    }
                    else if (var1.includes("[") || var1.includes("]")) {
                        error("Arrays must be declared using []. At least one bracket is missing")
                    }
                    else {
                        variables.push([var1, null, varType]);
                    }
                }
            }

        }
        //Display pseudocode has strings use quotation marks, variable names use no
        //Quotation marks, and concatinates strings with commas
        else if (current.startsWith("Display ")) {
            var print1 = current.substring(8);
            phrase = print1.trim()
            document.getElementById('console').innerHTML += evaluatePhrase(phrase);
            document.getElementById('console').innerHTML += '\n';

        } else if (current.startsWith("Set ")) {
            if (current.includes("=")) {
                var var1 = current.substring(4);
                var1 = formatEquals(var1);
                for (x = 0; x < var1.length; x++) {
                    if (var1[x] == "=") {
                        var var2 = var1.slice(0, x) //Var Name
                        var var3 = var1.slice(x + 1, var1.length) //Var Value
                        x = var1.length
                    }
                }
                var3 = evaluatePhrase(var3)
                if (typeof var3 == "string")
                    var3 = "\"" + var3 + "\""
                //console.log(typeof var3)
                if (var2 == undefined || var3 == undefined) {
                    error("Syntax Error on line " + (i + 1) + ".");
                } else if (var2.includes("[") || var2.includes("]")) {
                    //console.log(var2 + "," + var3)
                    updateVariable(var2, var3);
                } else if ((checkVariableExistance(var1)) === false) {
                    updateVariable(var2, var3);
                    //Eval updates the variable in the background
                    eval(var2 + " = " + var3)
                } else {
                    error("Variable does not exist");
                }

            } else {
                error("Syntax Error on line " + (i + 1) + ".");
            }

        } else if (current.startsWith("Input ")) {
            var input1 = current.substring(6);
            if (input1 == "") {
                alert("Syntax Error on line " + (i + 1) + ".");
            } else if (checkVariableExistance(input1)) {
                var input2 = prompt(); // Need to change from prompt
                updateVariable(input1, input2);
            } else {
                error("Error: Variable does not exist");
            }

        } else if (current.startsWith("If ")) {
            var ifCond = current.substring(3).trim()
            if (ifCond.endsWith("Then")) {
                ifCond = ifCond.slice(0, ifCond.length - 4)
                inIf = true
                //console.log(ifCond)
                ifResult = getConditionResult(ifCond.toString())
                //console.log(ifResult)
            }
            else {
                error("If statement conditions must be followed with \"Then\"")
            }

        } else if (current.startsWith("Select ")) {
            finishedCase = true
            foundCase = false
            selectCond = current.substring(7).trim()
            compareEx = evaluatePhrase(selectCond.toString()).toString()
            inSelect = true
            //console.log(selectCond)

        } else if (current.startsWith("While ")) {
            evaluate = current.substring(6);
            //console.log(evaluate);
            result = tryEval(evaluate);
            console.log(result);
            console.log(typeof(result))
            if (result){
                // Do nothing
            } else {
                while (!code[i].startsWith("End While")) {
                    i++;
                }
            }
        } else if (current.startsWith("End While")) {
            //temp
            i = getLoop(i);

        } else if (current.startsWith("Do")) {
            //Nothing
        } else if (current.startsWith("End Do While")) {
            evaluate = current.substring(13);
            result = tryEval(evaluate);
            console.log(result);
            console.log(typeof(result))
            if (result){
                i = getLoop(i);
            }
        } else if (current.startsWith("End Module")) {
            return;
        } else if (current.startsWith("Module ")) {
            console.log("you should never get this");
            //Do nothing
        } else if (current.startsWith("Call ")) {
            current = current.substring(5);
            current = current.split("(")[0];
            current = current.trim();

            var start = -1;

            for (var p = 0; p < functions.length; p++) {
                if (functions[p][0].startsWith(current)){
                    start = functions[p][1];
                    break;
                }
            }

            var tempVarStorage = [];

            if (start != 1) {
                // Store Variables temporarily in a holding variable
                for (var p = 0; p < variables.length; p++){
                    tempVarStorage.push(variables[p]);
                }

                // Run new module
                executeCode(start);

                // Add Variables back out of temp storage
                variables = [];
                for (var p = 0; p < tempVarStorage.length; p++){
                    variables.push(tempVarStorage[p]);
                }
            } else {
                error(current + " is not a defined Module.");
            }

        } else {
            error("Line " + (i + 1) + " has invalid syntax.");
        }

        // Output the Current variables and their respective types and values
        document.getElementById('variables').innerHTML = "";
        for (var j = 0; j < variables.length; j++) {
            if (variables[j][2] == 0) {
                var temp = "Integer: " + variables[j][0] + " = " + variables[j][1] + "\n"
            } else if (variables[j][2] == 1) {
                var temp = "Real: " + variables[j][0] + " = " + variables[j][1] + "\n"
            } else if (variables[j][2] == 2) {
                var temp = "String: " + variables[j][0] + " = " + variables[j][1] + "\n"
            } else if (variables[j][2] == 3) {
                var temp = "Character: " + variables[j][0] + " = " + variables[j][1] + "\n"
            } else if (variables[j][2] == 4) {
                var temp = "Boolean: " + variables[j][0] + " = " + variables[j][1] + "\n"
            }

            document.getElementById('variables').innerHTML += temp;

        }
    }
    console.log("Done")
}

function replaceVariables(string) {
    // Need to work on this
    return string
}

function getVariable(varName) {
    for (var i = 0; i < variables.length; i++) {
        if (variables[i][0] == varName) {
            return variables[i][1];
        }
    }
    error("The variable " + varName + " is not declared.");
}

function getVariableType(varName) {
    for (var i = 0; i < variables.length; i++) {
        if (variables[i][0] == varName) {
            //console.log("Type: " + variables[i][2])
            return variables[i][2];
        }
    }
    error("The variable " + varName + " is not declared.");
}

function updateVariable(varName, value) {
    var isArray = false
    for (var i = 0; i < variables.length; i++) {

        if (varName.includes("[") && varName.includes("]")) {
            for (x = 0; x < varName.length; x++) {
                if (varName[x] == "[") {
                    var index = varName.slice(x + 1, varName.length - 1)
                    varName = varName.slice(0, x)
                    index = evaluatePhrase(index)
                    //console.log(index + ", " + varName)
                }
            }
            isArray = true
        }
        else if (varName.includes("[") || varName.includes("]")) {
            error("Arrays values must be set using []. At least one bracket is missing")
        }

        if (variables[i][0] === varName) {
            //Checks if the array will be in bounds
            if (isArray) {
                if (index >= variables[i][3]) {
                    error("Array " + varName + " is out of bounds at index " + index)
                }
            }

            if (variables[i][2] == 0) {
                if (isInteger(value) || isReal(value)) {
                    //console.log("int " + value)
                    try {
                        value = value.split(".")[0];
                    }
                    catch{
                        value = Math.floor(value)
                    }
                    try {
                        if (!isArray)
                            variables[i][1] = value;
                        else {
                            variables[i][1][index] = value
                            tryEval(varName + "[" + index + "]= " + value)
                        }
                    }
                    catch {
                        error(varName + " is not an Integer value.") //mention what line number we are on?
                    }

                } else {
                    error(varName + " is not an Integer value.") //mention what line number we are on?
                }
            } else if (variables[i][2] == 1) {
                //console.log("v " + value)
                if (isReal(value)) {
                    if (!isArray)
                        variables[i][1] = value;
                    else {
                        variables[i][1][index] = value
                        tryEval(varName + "[" + index + "]= " + value)
                    }
                } else if (isInteger(value)) {
                    if(!value.toString().includes("."))
                        value = value + "."
                    if (!isArray)
                        variables[i][1] = value;
                    else {
                        variables[i][1][index] = value
                        //console.log((varName + "[" + index + "]= " + value))
                        tryEval(varName + "[" + index + "]= " + value)
                    }
                } else {
                    error(varName + " is not a Real value") //mention what line number we are on?
                }
            } else if (variables[i][2] == 2) {
                if (!isArray)
                    variables[i][1] = value;
                else {
                    //console.log(value + ", i:" + index)
                    variables[i][1][index] = value
                    tryEval(varName + "[" + index + "]= " + value)
                }
            } else if (variables[i][2] == 3) {
                value = value.toString();
                value = value.trim();
                value = value.charAt(0);
                if (!isArray)
                    variables[i][1] = value;
                else {
                    variables[i][1][index] = value
                    //tryEval(varName + "[" + index + "]= " + value)
                }
            } else if (variables[i][2] == 4) {
                if (value == "true" || value == true) {
                    if (!isArray)
                        variables[i][1] = value;
                    else {
                        variables[i][1][index] = value
                        tryEval(varName + "[" + index + "]= " + value)
                    }
                }
                else if (value == "false" || value == false) {
                    if (!isArray)
                        variables[i][1] = value;
                    else {
                        variables[i][1][index] = value
                        tryEval(varName + "[" + index + "]= " + value)
                    }
                }
                else {
                    error(varName + " is not a Boolean True or False value")
                }
            } else {
                error("You should never get this. Error in updateVariable function.")
            }
            return;

        }
    }
    error("Syntax error: Variable " + varName + " does not exist.");
}

// If variable exists return true. Otherwise return false
function checkVariableExistance(varName) {
    if (variables.length == 0) {
        return false;
    }
    for (var i = 0; i < variables.length; i++) {
        if (variables[i][0] === varName) {
            return true;
        }
    }
    return false;
}

// Standard error msg function. Want to convert to a banner.
// Should add the line the error crashed on as an arguement
function error(errorMsg) {
    alert(errorMsg);

    //Stops the program on an error. Needs testing.
    throw new Error();
}


//Flag
function tryEval(code) {
    try {
        code = eval(code)
        // if (typeof code == String) {
        //     code = "\"" + code + "\""
        // }
        return (code)
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            error("There was an undefined syntax error. These errors are often caused by non matching parentheses/quotes, misplaced operators, operations that need to use parenthesis, etc.")
            return
        }
        if (e instanceof RangeError) {
            error("There was an undefined RangeError error. These errors are often caused by numbers exceeds their maximum possible value.")
            return
        }
        if (e instanceof ReferenceError) {
            error("There was an undefined reference error. These errors are often caused by variables being referenced that don't exist or are refered to with an incorrect method.")
            return
        }
        if (e instanceof TypeError) {
            error("There was an undefined type error. These errors are often caused by the variable type not being valid.")
            return
        }
        error("There was an undefined error")
    }
}

function formatEquals(var1) {
    var1 = var1.replace(" = ", "=");
    var1 = var1.replace(" =", "=");
    var1 = var1.replace("= ", "=");
    return var1
}

function isInteger(var1) {
    for (var i = 0; i < var1.length; i++) {
        //console.log()
        if (var1[0] == "-")
            i++
        if (var1[i] === "0" || var1[i] === "1" || var1[i] === "2" || var1[i] === "3" || var1[i] === "4" || var1[i] === "5" || var1[i] === "6" || var1[i] === "7" || var1[i] === "8" || var1[i] === "9") {
            //Do nothing
        } else {
            return false;
        }
    }
    return true;
}

function isReal(var1) {
    var numOfDots = 0;
    for (var i = 0; i < var1.length; i++) {
        if (var1[0] == "-")
            i++
        if (var1[i] === "0" || var1[i] === "1" || var1[i] === "2" || var1[i] === "3" || var1[i] === "4" || var1[i] === "5" || var1[i] === "6" || var1[i] === "7" || var1[i] === "8" || var1[i] === "9") {
            //Do nothing
            if (var1[i] === "-0" || var1[i] === "-1" || var1[i] === "-2" || var1[i] === "-3" || var1[i] === "-4" || var1[i] === "-5" || var1[i] === "-6" || var1[i] === "-7" || var1[i] === "-8" || var1[i] === "-9" && !leftSide) {
                error("You cannot have a negative in the decimal spot")
            }
        } else if (var1[i] === ".") {
            if (numOfDots < 1) {
                numOfDots = numOfDots + 1;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    if (numOfDots == 1) {
        return true;
    } else {
        return false;
    }
}

//This method evaluates phrases that use operators such as +, -, *, /, mod, etc.
//TO DO: add arithmetic with spaces, add negative numbers
function evaluatePhrase(teamPseudoPhrase) {

    //console.log("P: " + teamPseudoPhrase)
    var teamPseudoIsQuote = false
    var teamPseudoI = 0

    if (teamPseudoPhrase.length == 0)
        return

    //Work back in some old code for error checking
    //Parentheses Matching
    //Operator Order
    //Catch general eval errors (put in its own method?)

    //Formats the teamPseudoPhrase to fit JavaScript syntax
    for (teamPseudoX = 0; teamPseudoX < teamPseudoPhrase.length; teamPseudoX++) {
        //Checks if we're in a String literal
        if (teamPseudoPhrase[teamPseudoX] == "\"" || teamPseudoPhrase[teamPseudoX] == "\'") {
            if (teamPseudoIsQuote)
                teamPseudoIsQuote = false
            else
                teamPseudoIsQuote = true
        }
        //Keeps escape characters
        if (teamPseudoIsQuote) {
            if (teamPseudoPhrase[teamPseudoX] == "\\") {
                teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + "\\" + "\\" + teamPseudoPhrase.slice(teamPseudoX, teamPseudoPhrase.length)
                teamPseudoX += 2
            }
        }
        //Adds spacing to operators
        if (!teamPseudoIsQuote) {
            if (teamPseudoPhrase[teamPseudoX] == "^") {
                teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " ** " + teamPseudoPhrase.slice(teamPseudoX + 1, teamPseudoPhrase.length)
                teamPseudoX += 3
            }
            if (teamPseudoPhrase[teamPseudoX] == "," || teamPseudoPhrase[teamPseudoX] == "+") {
                teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " + " + teamPseudoPhrase.slice(teamPseudoX + 1, teamPseudoPhrase.length)
                teamPseudoX += 2
            }
            if (teamPseudoPhrase[teamPseudoX] == "*") {
                teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " * " + teamPseudoPhrase.slice(teamPseudoX + 1, teamPseudoPhrase.length)
                teamPseudoX += 2
            }
            if (teamPseudoPhrase[teamPseudoX] == "/") {
                teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " / " + teamPseudoPhrase.slice(teamPseudoX + 1, teamPseudoPhrase.length)
                teamPseudoX += 2
            }
            //Converts MOD, AND, OR, and NOT to JavaSCript equivalents
            if (teamPseudoPhrase[teamPseudoX] == 'M')
                if (teamPseudoPhrase[teamPseudoX + 1] == 'O')
                    if (teamPseudoPhrase[teamPseudoX + 2] == 'D') {
                        teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " % " + teamPseudoPhrase.slice(teamPseudoX + 3, teamPseudoPhrase.length)
                        teamPseudoX += 4
                    }
            if (teamPseudoPhrase[teamPseudoX] == 'N')
                if (teamPseudoPhrase[teamPseudoX + 1] == 'O')
                    if (teamPseudoPhrase[teamPseudoX + 2] == 'T') {
                        teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " ! " + teamPseudoPhrase.slice(teamPseudoX + 3, teamPseudoPhrase.length)
                        teamPseudoX += 4
                    }
            if (teamPseudoPhrase[teamPseudoX] == 'A')
                if (teamPseudoPhrase[teamPseudoX + 1] == 'N')
                    if (teamPseudoPhrase[teamPseudoX + 2] == 'D') {
                        teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " && " + teamPseudoPhrase.slice(teamPseudoX + 3, teamPseudoPhrase.length)
                        teamPseudoX += 4
                    }
            if (teamPseudoPhrase[teamPseudoX] == 'O')
                if (teamPseudoPhrase[teamPseudoX + 1] == 'R') {
                    teamPseudoPhrase = teamPseudoPhrase.slice(0, teamPseudoX) + " || " + teamPseudoPhrase.slice(teamPseudoX + 2, teamPseudoPhrase.length)
                    teamPseudoX += 3
                }
        }
    }

    var teamPseudoParts = teamPseudoPhrase.split(" ")

    //Checks that all variables are valid
    while (teamPseudoI < teamPseudoParts.length) {

        teamPseudoParts[teamPseudoI] = teamPseudoParts[teamPseudoI].trim()

        if (checkVariableExistance(teamPseudoParts[teamPseudoI])) {
        }
        else if (teamPseudoParts[teamPseudoI].includes('+') || teamPseudoParts[teamPseudoI].includes('-') || teamPseudoParts[teamPseudoI].includes('*') || teamPseudoParts[teamPseudoI].includes('/') || teamPseudoParts[teamPseudoI].includes('^') || teamPseudoParts[teamPseudoI].includes('%')) {
        }
        else if (teamPseudoParts[teamPseudoI].includes('==') || teamPseudoParts[teamPseudoI].includes('!') || teamPseudoParts[teamPseudoI].includes('>') || teamPseudoParts[teamPseudoI].includes('<') || teamPseudoParts[teamPseudoI].includes('&&') || teamPseudoParts[teamPseudoI].includes('||')) {
        }
        else if (teamPseudoParts[teamPseudoI].includes("\"") || teamPseudoParts[teamPseudoI].includes("\'")) {
        }
        else if (teamPseudoParts[teamPseudoI].includes("(") || teamPseudoParts[teamPseudoI].includes(")") || teamPseudoParts[teamPseudoI].includes("]") || teamPseudoParts[teamPseudoI].includes("[")) {
        }
        else if (teamPseudoParts[teamPseudoI].includes("true") || teamPseudoParts[teamPseudoI].includes("false")) {
        }
        else if (isInteger(teamPseudoParts[teamPseudoI]) || isReal(teamPseudoParts[teamPseudoI])) {
        }
        else {
            error("The variable " + teamPseudoParts[teamPseudoI] + " has not been declared")
        }

        teamPseudoI++

    }

    //console.log("New Phrase: " + teamPseudoPhrase)
    //console.log(typeof("5 % 2 + 1.99 + 2.99") + " " + 5 % 2 + 1.99 + 2.99)

    return (tryEval(teamPseudoPhrase))
}

function getConditionResult(phrase) {
    result = evaluatePhrase(phrase)
    if (result == true)
        return (true)
    else if (result == false)
        return (false)
    else
        error("The condition " + phrase + " must result in either true or false")
}

function checkValidName(name) {
    bracket = name.length

    for(x=0; x < name.length; x++) {
        if(name[x] == "[") {
            bracket = x
            break
        }
    }
    //console.log(bracket)
    name = name.slice(0,bracket)
    //console.log(name)

    if (/^[a-zA-Z0-9\[\]]*$/.test(name) == false) {
        error(name + " contains a special character that variable names cannot contain")
    }

    //Checks to ensure that variables can't use reserved words
    if (name.includes("MOD"))
        error("MOD is a reserved word that can't be used in variable names")
    if (name.includes("NOT"))
        error("NOT is a reserved word that can't be used in variable names")
    if (name.includes("AND"))
        error("AND is a reserved word that can't be used in variable names")
    if (name.includes("OR"))
        error("OR is a reserved word that can't be used in variable names")
    if (name == "Declare")
        error("Declare is a reserved word that can't be used in variable names")
    if (name == "If")
        error("If is a reserved word that can't be used in variable names")
    if (name == "Then")
        error("Then is a reserved word that can't be used in variable names")
    if (name == "End")
        error("End is a reserved word that can't be used in variable names")
    if (name == "Set")
        error("Set is a reserved word that can't be used in variable names")
    if (name == "Input")
        error("Input is a reserved word that can't be used in variable names")
    if (name == "Display")
        error("Display is a reserved word that can't be used in variable names")
    if (name == "Function")
        error("Function is a reserved word that can't be used in variable names")
    if (name == "Call")
        error("Call is a reserved word that can't be used in variable names")
    if (name == "Module")
        error("Module is a reserved word that can't be used in variable names")
    if (name == "Do")
        error("Do is a reserved word that can't be used in variable names")
    if (name == "For")
        error("For is a reserved word that can't be used in variable names")
    if (name == "To")
        error("To is a reserved word that can't be used in variable names")
    if (name == "Each")
        error("Each is a reserved word that can't be used in variable names")
    if (name == "In")
        error("In is a reserved word that can't be used in variable names")
    if (name == "Else")
        error("Else is a reserved word that can't be used in variable names")
    if (name == "While")
        error("While is a reserved word that can't be used in variable names")
    if (name == "Until")
        error("Until is a reserved word that can't be used in variable names")
    if (name == "Select")
        error("Select is a reserved word that can't be used in variable names")
    if (name == "Case")
        error("Case is a reserved word that can't be used in variable names")
    if (name == "Default")
        error("Default is a reserved word that can't be used in variable names")
    if (name == "Set")
        error("Set is a reserved word that can't be used in variable names")
    if (name == "True")
        error("True is a reserved word that can't be used in variable names")
    if (name == "False")
        error("False is a reserved word that can't be used in variable names")
    if (name == "true")
        error("true is a reserved word that can't be used in variable names")
    if (name == "false")
        error("false is a reserved word that can't be used in variable names")
}

function getLoop(i) {
    var p = 0;
    while (p < loops.length) {
        if (loops[p][1]==i) {
            var temp = ((loops[p][0]) - 1);
            return temp;
        }
        p++;
    }
    error("Loop return point not found.");
}

// Code for front end features only below here.

// Code to choose which file we will open into the code box
function openFile(func) {
    readFile = function (e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            fileInput.func(contents);
            document.body.removeChild(fileInput);
        }
        reader.readAsText(file);
    }
    fileInput = document.createElement("input");
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.onchange = readFile;
    fileInput.func = func;
    document.body.appendChild(fileInput);
    clickElem(fileInput);
}

function dispFile(contents) {
    document.getElementById('code').innerHTML = contents;
}

function clickElem(elem) {
    var eventMouse = document.createEvent("MouseEvents");
    eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elem.dispatchEvent(eventMouse);
}

//Code to clear contents
function clearAll() {
    document.getElementById('console').innerHTML = "";
}

//Creates lined textarea
$(function() {
  $(".lined").linedtextarea();
});

//Copies contents of output box
function copy() {
  let textarea = document.getElementById("console");
  textarea.select();
  document.execCommand("copy");
}
