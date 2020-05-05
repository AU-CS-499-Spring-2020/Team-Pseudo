
var teamPsuedovariables = []
var teamPsuedoLoops = []
var teamPsuedoFunctions = []
var TeamPseudoIfs = []
var TeamPseudoForVars = []

function main() {
    document.getElementById('console').innerHTML = "";

    var teamPsuedocode = document.getElementById('code').value.split("\n");
    var teamPsuedostart = -1;

    // Find all of the loops and add them to a list
    for (var teamPseudoP = 0; teamPseudoP < teamPsuedocode.length; teamPseudoP++) {
        if (teamPsuedocode[teamPseudoP].startsWith("Module ")) {
            var teamPsuedoTemp = teamPsuedocode[teamPseudoP].substring(7);
            teamPsuedoTemp = teamPsuedoTemp.split("(")[0];
            teamPsuedoTemp = teamPsuedoTemp.trim();
            teamPsuedoFunctions.push([teamPsuedoTemp, teamPseudoP + 1]);
        }
    }

    for (var teamPseudoP = 0; teamPseudoP < teamPsuedoFunctions.length; teamPseudoP++) {
        if (teamPsuedoFunctions[teamPseudoP][0].startsWith("main")) {
            teamPsuedostart = teamPsuedoFunctions[teamPseudoP][1];
        }
    }

    if (teamPsuedostart != -1) {
        executeCode(teamPsuedostart);
    } else {
        error("Your program does not have a main method.");
    }

}

function executeCode(line) {

    // Clear output of the console
    // document.getElementById('console').innerHTML = "";

    // Reset variables, loops, and ifs everytime the program is run.
    teamPsuedovariables = [];
    teamPsuedoLoops = [];
    inIf = 0
    inSelect = false
    selectCond = null
    foundCase = false
    finishedCase = true

    // Read in all the lines of code and split on new line. No one line programs
    // are allowed.
    var teamPsuedoCode = document.getElementById('code').value.split("\n");

    // The fun stuff
    for (var teamPsuedoI = line; teamPsuedoI < teamPsuedoCode.length; teamPsuedoI++) {
        var teamPsuedoCurrent = teamPsuedoCode[teamPsuedoI].replace(/^\s+/g, ''); //Removes white space from the left side for indentation

        // Remove any comments that the user puts into the code
        teamPsuedoCurrent = teamPsuedoCurrent.split("//")[0];

        //Checks if the loop is supposed to execute
        if (teamPsuedoLoops.length > 0) {
            teamPseudoWorkingLoop = teamPsuedoLoops.pop(teamPsuedoLoops.length)
            teamPsuedoLoops.push(teamPseudoWorkingLoop)



            if (teamPseudoWorkingLoop[3] == false) {

                teamPseudoLoopEnd = false
                teamPseudoCurrentLoop = teamPsuedoLoops.length
                teamPseudoLoopType = teamPseudoWorkingLoop[1]
                while (!teamPseudoLoopEnd) {



                    if (teamPsuedoCurrent.startsWith("End While")) {
                        if ((teamPsuedoLoops.length == teamPseudoCurrentLoop) && (teamPseudoLoopType == "while")) {
                            teamPseudoLoopEnd = true
                            teamPsuedoLoops.pop()





                        }
                        else if (teamPsuedoLoops.length == teamPseudoCurrentLoop) {
                            error("There's a missing End While command")
                        }
                        else {
                            teamPsuedoLoops.pop()
                        }
                    }
                    else if (teamPsuedoCurrent.startsWith("End Do While")) {
                        if ((teamPsuedoLoops.length == teamPseudoCurrentLoop) && (teamPseudoLoopType == "do")) {
                            teamPseudoLoopEnd = true
                            teamPsuedoLoops.pop()
                        }
                        else if (teamPsuedoLoops.length == teamPseudoCurrentLoop) {
                            error("There's a missing End Do While command")
                        }
                        else {
                            teamPsuedoLoops.pop()
                        }
                    }
                    else if (teamPsuedoCurrent.startsWith("End For")) {
                        if ((teamPsuedoLoops.length == teamPseudoCurrentLoop) && (teamPseudoLoopType == "for")) {
                            teamPseudoLoopEnd = true
                            teamPsuedoLoops.pop()
                        }
                        else if (teamPsuedoLoops.length == teamPseudoCurrentLoop) {
                            error("There's a missing End For command")
                        }
                        else {
                            teamPsuedoLoops.pop()
                        }
                    }
                    else if (teamPsuedoCurrent.startsWith("While ")) {

                        teamPsuedoLoops.push([teamPsuedoI, "while", teamPsuedoCurrent.substring(6), false])
                    }
                    else if (teamPsuedoCurrent.startsWith("Do ")) {

                        teamPsuedoLoops.push([teamPsuedoI, "do", teamPsuedoCurrent.substring(3), false])
                    }
                    else if (teamPsuedoCurrent.startsWith("For ")) {

                        teamPsuedoLoops.push([teamPsuedoI, "for", "1 == 0", false, "var", 1])
                    }
                    teamPsuedoI++
                    teamPsuedoCurrent = teamPsuedoCode[teamPsuedoI].replace(/^\s+/g, '');
                }

            }
        }

        //Checks if the line is inside an if statement
        if (TeamPseudoIfs.length > 0) {
            testCond = teamPsuedoCurrent.trim()
            if (testCond == "End If") {
                TeamPseudoIfs.pop()
                if (TeamPseudoIfs.length > 0) {
                    if (TeamPseudoIfs[TeamPseudoIfs.length - 1][1] == false) {
                        teamPsuedoResult = TeamPseudoIfs[TeamPseudoIfs.length - 1][0]
                    }
                    else if (TeamPseudoIfs[TeamPseudoIfs.length - 1][1] == true) {
                        teamPsuedoResult = !TeamPseudoIfs[TeamPseudoIfs.length - 1][0]
                    }
                }
                continue
            }
            if (testCond.slice(0, 2) == "If" && teamPsuedoResult == false) {
                if (TeamPseudoIfs[TeamPseudoIfs.length - 1][1] == false) {
                    if (TeamPseudoIfs[TeamPseudoIfs.length - 1][0] == false)
                        TeamPseudoIfs.push(["skip",])
                    continue
                }
                else if (TeamPseudoIfs[TeamPseudoIfs.length - 1][1] == true) {
                    if (TeamPseudoIfs[TeamPseudoIfs.length - 1][0] == true)
                        TeamPseudoIfs.push(["skip",])
                    continue
                }
            }
            else if (testCond == "Else" && TeamPseudoIfs[TeamPseudoIfs.length - 1][0] == true) {
                teamPsuedoResult = false
                TeamPseudoIfs[TeamPseudoIfs.length - 1][1] = true
                continue
            }
            else if (testCond == "Else" && TeamPseudoIfs[TeamPseudoIfs.length - 1][0] == false) {
                teamPsuedoResult = true
                TeamPseudoIfs[TeamPseudoIfs.length - 1][1] = true
                continue
            }
            else if (testCond == "Skip") {
                teamPsuedoResult = false
                continue
            }
            else if (teamPsuedoResult == false) {
                continue
            }
            else if (teamPsuedoResult == true) {
                //Pass and perform the code
            }
        }

        //Checks if the line is inside a Select statement
        if (inSelect) {
            if (teamPsuedoCurrent == "End Select") {
                finishedCase = true
                inSelect = false
                continue
            }
            else if (!foundCase) {
                if (teamPsuedoCurrent.startsWith("Case ")) {
                    caseEx = teamPsuedoCurrent.substring(5)
                    if (caseEx.endsWith(":")) {
                        caseEx = caseEx.slice(0, caseEx.length - 1)
                    }
                    if (evaluatePhrase(caseEx.toString()).toString() == compareEx) {
                        foundCase = true
                        finishedCase = false
                        continue
                    }
                }
                else if (teamPsuedoCurrent.startsWith("Default") && !foundCase) {
                    foundCase = true
                    finishedCase = false
                    continue
                }
                continue
            }
            else if (teamPsuedoCurrent.startsWith("Default") && foundCase) {
                finishedCase = true
                continue
            }
            else {
                if (teamPsuedoCurrent.startsWith("Case")) {
                    finishedCase = true
                    continue
                }
                else if (finishedCase)
                    continue
                //
                //Pass and perform the code
            }

        }

        if (teamPsuedoCurrent == "") {
            // Do nothing
        } else if (teamPsuedoCurrent.startsWith("Declare ")) {
            // Where we declare variables
            var teamPsuedoVar1 = teamPsuedoCurrent.substring(8);
            var teamPsuedoVarType = teamPsuedoVar1.split(" ")[0];
            if (teamPsuedoVarType == "Integer") {
                teamPsuedoVarType = 0;
                teamPsuedoVar1 = teamPsuedoVar1.substring(8);
            } else if (teamPsuedoVarType == "Real") {
                teamPsuedoVarType = 1;
                teamPsuedoVar1 = teamPsuedoVar1.substring(5);
            } else if (teamPsuedoVarType == "String") {
                teamPsuedoVarType = 2;
                teamPsuedoVar1 = teamPsuedoVar1.substring(7);
            } else if (teamPsuedoVarType == "Character") {
                teamPsuedoVarType = 3;
                teamPsuedoVar1 = teamPsuedoVar1.substring(10);
            } else if (teamPsuedoVarType == "Boolean") {
                teamPsuedoVarType = 4;
                teamPsuedoVar1 = teamPsuedoVar1.substring(8);
            } else {
                error("invalid variable type")
            }

            if (teamPsuedoCurrent.includes("=")) {
                teamPsuedoVar1 = formatEquals(teamPsuedoVar1)
                for (teamPsuedoX = 0; teamPsuedoX < teamPsuedoVar1.length; teamPsuedoX++) {
                    if (teamPsuedoVar1[teamPsuedoX] == "=") {
                        var teamPsuedoVar2 = teamPsuedoVar1.slice(0, teamPsuedoX) //Var Name
                        var teamPsuedoVar3 = teamPsuedoVar1.slice(teamPsuedoX + 1, teamPsuedoVar1.length) //Var Value
                        teamPsuedoX = teamPsuedoVar1.length
                    }
                }
                teamPsuedoVar3 = evaluatePhrase(teamPsuedoVar3).toString()
                //
                //

                //Makes sure the variable name is valid
                checkValidName(teamPsuedoVar2)

                if (teamPsuedoVar2.includes("[") || teamPsuedoVar2.includes("]")) {
                    error("You cannot assign anything to an array as you declare it")
                }

                if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                    error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
                } else if ((checkVariableExistance(teamPsuedoVar2)) === true) {
                    error("Variable " + teamPsuedoVar2 + " already exists");
                } else {
                    if (teamPsuedoVarType == 0) {
                        if (isInteger(teamPsuedoVar3) || isReal(teamPsuedoVar3)) {
                            teamPsuedoVar3 = teamPsuedoVar3.split(".")[0];
                            teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType]);
                        } else {
                            error(teamPsuedoVar2 + " is not an Integer value")
                        }
                    } else if (teamPsuedoVarType == 1) {
                        if (isReal(teamPsuedoVar3)) {
                            teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType]);
                        } else if (isInteger(teamPsuedoVar3)) {
                            teamPsuedoVar3 = teamPsuedoVar3 + "."
                            teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType]);
                        } else {
                            error(teamPsuedoVar2 + " is not a Real value")
                        }
                    } else if (teamPsuedoVarType == 2) {
                        teamPsuedoVar3 = "\"" + teamPsuedoVar3 + "\""
                        teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType]);
                    } else if (teamPsuedoVarType == 3) {
                        //teamPsuedoI dont like the autonarrowing
                        teamPsuedoVar3 = teamPsuedoVar3.charAt(0);
                        teamPsuedoVar3 = "\'" + teamPsuedoVar3 + "\'"
                        teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType]);
                    } else if (teamPsuedoVarType == 4) {
                        //
                        if (teamPsuedoVar3 == "true" || teamPsuedoVar3 == true) {
                            teamPsuedovariables.push([teamPsuedoVar2, true, teamPsuedoVarType]);
                        }
                        else if (teamPsuedoVar3 == "false" || teamPsuedoVar3 == false) {
                            teamPsuedovariables.push([teamPsuedoVar2, false, teamPsuedoVarType]);
                        }
                        else {
                            error(teamPsuedoVar2 + " is not a Boolean True or False value")
                        }

                    } else {
                        error("You should never reach here");
                    }
                    //
                    //Eval creates the variable in the background
                    tryEval(teamPsuedoVar2 + " = " + teamPsuedoVar3)
                }
            } else {
                if (teamPsuedoVar1 == "") {
                    error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
                } else if ((checkVariableExistance(teamPsuedoVar1)) === true) {
                    error("Variable already exists");
                } else {
                    //Makes sure the variable name is valid
                    checkValidName(teamPsuedoVar1)
                    //Checks if the variable is an array
                    if (teamPsuedoVar1.includes("[") && teamPsuedoVar1.includes("]")) {
                        for (teamPsuedoX = 0; teamPsuedoX < teamPsuedoVar1.length; teamPsuedoX++) {
                            if (teamPsuedoVar1[teamPsuedoX] == "[") {
                                var size = teamPsuedoVar1.slice(teamPsuedoX + 1, teamPsuedoVar1.length - 1)
                                teamPsuedoVar1 = teamPsuedoVar1.slice(0, teamPsuedoX)
                                size = evaluatePhrase(size)
                                //
                            }
                        }
                        tryEval(teamPsuedoVar1 + "= []")
                        teamPsuedovariables.push([teamPsuedoVar1, [], teamPsuedoVarType, size]);
                    }
                    else if (teamPsuedoVar1.includes("[") || teamPsuedoVar1.includes("]")) {
                        error("Arrays must be declared using []. At least one bracket is missing")
                    }
                    else {
                        teamPsuedovariables.push([teamPsuedoVar1, null, teamPsuedoVarType]);
                    }
                }
            }

        }
        else if (teamPsuedoCurrent.startsWith("Constant ")) {
            // Where we declare variables
            var teamPsuedoVar1 = teamPsuedoCurrent.substring(9);
            var teamPsuedoVarType = teamPsuedoVar1.split(" ")[0];
            if (teamPsuedoVarType == "Integer") {
                teamPsuedoVarType = 0;
                teamPsuedoVar1 = teamPsuedoVar1.substring(8);
            } else if (teamPsuedoVarType == "Real") {
                teamPsuedoVarType = 1;
                teamPsuedoVar1 = teamPsuedoVar1.substring(5);
            } else if (teamPsuedoVarType == "String") {
                teamPsuedoVarType = 2;
                teamPsuedoVar1 = teamPsuedoVar1.substring(7);
            } else if (teamPsuedoVarType == "Character") {
                teamPsuedoVarType = 3;
                teamPsuedoVar1 = teamPsuedoVar1.substring(10);
            } else if (teamPsuedoVarType == "Boolean") {
                teamPsuedoVarType = 4;
                teamPsuedoVar1 = teamPsuedoVar1.substring(8);
            } else {
                error("invalid variable type")
            }

            if (teamPsuedoCurrent.includes("=")) {
                teamPsuedoVar1 = formatEquals(teamPsuedoVar1)
                for (teamPsuedoX = 0; teamPsuedoX < teamPsuedoVar1.length; teamPsuedoX++) {
                    if (teamPsuedoVar1[teamPsuedoX] == "=") {
                        var teamPsuedoVar2 = teamPsuedoVar1.slice(0, teamPsuedoX) //Var Name
                        var teamPsuedoVar3 = teamPsuedoVar1.slice(teamPsuedoX + 1, teamPsuedoVar1.length) //Var Value
                        teamPsuedoX = teamPsuedoVar1.length
                    }
                }
                teamPsuedoVar3 = evaluatePhrase(teamPsuedoVar3).toString()
                //
                //

                //Makes sure the variable name is valid
                checkValidName(teamPsuedoVar2)

                if (teamPsuedoVar2.includes("[") || teamPsuedoVar2.includes("]")) {
                    error("You cannot assign anything to an array as you declare it")
                }

                if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                    error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
                } else if ((checkVariableExistance(teamPsuedoVar2)) === true) {
                    error("Variable " + teamPsuedoVar2 + " already exists");
                } else {
                    if (teamPsuedoVarType == 0) {
                        if (isInteger(teamPsuedoVar3) || isReal(teamPsuedoVar3)) {
                            teamPsuedoVar3 = teamPsuedoVar3.split(".")[0];
                            teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType, , 1]);
                        } else {
                            error(teamPsuedoVar2 + " is not an Integer value")
                        }
                    } else if (teamPsuedoVarType == 1) {
                        if (isReal(teamPsuedoVar3)) {
                            teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType, , 1]);
                        } else if (isInteger(teamPsuedoVar3)) {
                            teamPsuedoVar3 = teamPsuedoVar3 + "."
                            teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType, , 1]);
                        } else {
                            error(teamPsuedoVar2 + " is not a Real value")
                        }
                    } else if (teamPsuedoVarType == 2) {
                        teamPsuedoVar3 = "\"" + teamPsuedoVar3 + "\""
                        teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType, , 1]);
                    } else if (teamPsuedoVarType == 3) {
                        //teamPsuedoI dont like the autonarrowing
                        teamPsuedoVar3 = teamPsuedoVar3.charAt(0);
                        teamPsuedoVar3 = "\'" + teamPsuedoVar3 + "\'"
                        teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType, , 1]);
                    } else if (teamPsuedoVarType == 4) {
                        //
                        if (teamPsuedoVar3 == "true" || teamPsuedoVar3 == true) {
                            teamPsuedovariables.push([teamPsuedoVar2, true, teamPsuedoVarType, , 1]);
                        }
                        else if (teamPsuedoVar3 == "false" || teamPsuedoVar3 == false) {
                            teamPsuedovariables.push([teamPsuedoVar2, false, teamPsuedoVarType, , 1]);
                        }
                        else {
                            error(teamPsuedoVar2 + " is not a Boolean True or False value")
                        }

                    } else {
                        error("You should never reach here");
                    }
                    //
                    //Eval creates the variable in the background
                    tryEval(teamPsuedoVar2 + " = " + teamPsuedoVar3)
                }
            } else {
                if (teamPsuedoVar1 == "") {
                    error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
                } else if ((checkVariableExistance(teamPsuedoVar1)) === true) {
                    error("Variable already exists");
                } else {
                    //Makes sure the variable name is valid
                    checkValidName(teamPsuedoVar1)
                    //Checks if the variable is an array
                    if (teamPsuedoVar1.includes("[") && teamPsuedoVar1.includes("]")) {
                        for (teamPsuedoX = 0; teamPsuedoX < teamPsuedoVar1.length; teamPsuedoX++) {
                            if (teamPsuedoVar1[teamPsuedoX] == "[") {
                                var size = teamPsuedoVar1.slice(teamPsuedoX + 1, teamPsuedoVar1.length - 1)
                                teamPsuedoVar1 = teamPsuedoVar1.slice(0, teamPsuedoX)
                                size = evaluatePhrase(size)
                                //
                            }
                        }
                        tryEval(teamPsuedoVar1 + "= []")
                        teamPsuedovariables.push([teamPsuedoVar1, [], teamPsuedoVarType, size, 1]);
                    }
                    else if (teamPsuedoVar1.includes("[") || teamPsuedoVar1.includes("]")) {
                        error("Arrays must be declared using []. At least one bracket is missing")
                    }
                    else {
                        teamPsuedovariables.push([teamPsuedoVar1, null, teamPsuedoVarType, , 1]);
                    }
                }
            }

        }
        //Display pseudocode has strings use quotation marks, variable names use no
        //Quotation marks, and concatinates strings with commas
        else if (teamPsuedoCurrent.startsWith("Display ")) {
            var print1 = teamPsuedoCurrent.substring(8);
            var phrase = print1.trim()
            document.getElementById('console').innerHTML += evaluatePhrase(phrase);
            document.getElementById('console').innerHTML += '\n';

        } else if (teamPsuedoCurrent.startsWith("Set ")) {
            if (teamPsuedoCurrent.includes("=")) {
                var teamPsuedoVar1 = teamPsuedoCurrent.substring(4);
                teamPsuedoVar1 = formatEquals(teamPsuedoVar1);
                for (teamPsuedoX = 0; teamPsuedoX < teamPsuedoVar1.length; teamPsuedoX++) {
                    if (teamPsuedoVar1[teamPsuedoX] == "=") {
                        var teamPsuedoVar2 = teamPsuedoVar1.slice(0, teamPsuedoX) //Var Name
                        var teamPsuedoVar3 = teamPsuedoVar1.slice(teamPsuedoX + 1, teamPsuedoVar1.length) //Var Value
                        teamPsuedoX = teamPsuedoVar1.length
                    }
                }
                teamPsuedoVar3 = evaluatePhrase(teamPsuedoVar3)
                if (typeof teamPsuedoVar3 == "string")
                    teamPsuedoVar3 = "\"" + teamPsuedoVar3 + "\""
                //
                if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                    error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
                } else if (teamPsuedoVar2.includes("[") || teamPsuedoVar2.includes("]")) {
                    //
                    updateVariable(teamPsuedoVar2, teamPsuedoVar3);
                } else if ((checkVariableExistance(teamPsuedoVar1)) === false) {
                    if (checkConstant(teamPsuedoVar2)) {
                        error("You cannot change the value of the constant variable " + teamPsuedoVar2)
                    }
                    else {
                        updateVariable(teamPsuedoVar2, teamPsuedoVar3);
                        //Eval updates the variable in the background
                        eval(teamPsuedoVar2 + " = " + teamPsuedoVar3)
                    }
                } else {
                    error("Variable does not exist");
                }

            } else {
                error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
            }

        } else if (teamPsuedoCurrent.startsWith("Input ")) {
            var teamPsuedoVar2 = teamPsuedoCurrent.substring(6);
            teamPsuedoVar2 = teamPsuedoVar2.trim()
            if (teamPsuedoVar2 == "") {
                alert("Syntax Error on line " + (teamPsuedoI + 1) + ".");
            }
            var teamPsuedoVar3 = prompt(); // Need to change from prompt
            teamPsuedoVar3 = evaluatePhrase(teamPsuedoVar3)


            if (typeof teamPsuedoVar3 == "string")
                teamPsuedoVar3 = "\"" + teamPsuedoVar3 + "\""
            //
            if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
            } else if (teamPsuedoVar2.includes("[") || teamPsuedoVar2.includes("]")) {
                //
                updateVariable(teamPsuedoVar2, teamPsuedoVar3);
            } else if ((checkVariableExistance(teamPsuedoVar2)) != false) {
                if (checkConstant(teamPsuedoVar2)) {
                    error("You cannot change the value of the constant variable " + teamPsuedoVar2)
                }
                else {
                    updateVariable(teamPsuedoVar2, teamPsuedoVar3);
                    //Eval updates the variable in the background
                    eval(teamPsuedoVar2 + " = " + teamPsuedoVar3)
                }
            } else {
                error("Error: Variable does not exist");
            }

        } else if (teamPsuedoCurrent.startsWith("If ")) {
            var ifCond = teamPsuedoCurrent.substring(3).trim()
            if (ifCond.endsWith("Then")) {
                ifCond = ifCond.slice(0, ifCond.length - 4)
                inIf = inIf + 1
                //
                TeamPseudoIfs.push([getConditionResult(ifCond.toString()), false])
            }
            else {
                error("If statement conditions must be followed with \"Then\"")
            }

        } else if (teamPsuedoCurrent.startsWith("Select ")) {
            finishedCase = true
            foundCase = false
            selectCond = teamPsuedoCurrent.substring(7).trim()
            compareEx = evaluatePhrase(selectCond.toString()).toString()
            inSelect = true
            //

        } else if (teamPsuedoCurrent.startsWith("While ")) {
            teamPseudoAdded = false
            teamPseudoEvaluate = teamPsuedoCurrent.substring(6);
            //
            teamPsuedoResult = tryEval(teamPseudoEvaluate);



            for (teamPseudoX = 0; teamPseudoX < teamPsuedoLoops.length; teamPseudoX++) {
                if (teamPsuedoLoops[teamPseudoX][0] == teamPsuedoI) {
                    teamPseudoAdded = true
                }
            }
            if (!teamPseudoAdded) {
                teamPsuedoLoops.push([teamPsuedoI, "while", teamPsuedoCurrent.substring(6), teamPsuedoResult])
            }


        } else if (teamPsuedoCurrent.startsWith("End While")) {
            //temp
            //teamPsuedoI = getLoop(teamPsuedoI);

            teamPseudoCurrentLoop = teamPsuedoLoops.pop()

            if (teamPseudoCurrentLoop[1] == "while") {
                if (tryEval(teamPseudoCurrentLoop[2]) == true) {
                    teamPseudoCurrentLoop[3] = true
                    teamPsuedoLoops.push(teamPseudoCurrentLoop)
                    teamPsuedoI = teamPseudoCurrentLoop[0]


                }
                else {
                    teamPseudoCurrentLoop[3] = false
                }
            }
        } else if (teamPsuedoCurrent.startsWith("For ")) {

            // try {

            var teamPsuedoVar1 = teamPsuedoCurrent.substring(4);
            var teamPsuedoStep = 1
            var teamPsuedoVarType = 0
            if (teamPsuedoCurrent.includes("=")) {
                teamPsuedoVar1 = formatEquals(teamPsuedoVar1)
                for (teamPsuedoX = 0; teamPsuedoX < teamPsuedoVar1.length; teamPsuedoX++) {
                    if (teamPsuedoVar1[teamPsuedoX] == "=") {
                        var teamPsuedoVar2 = teamPsuedoVar1.slice(0, teamPsuedoX) //Var Name
                        var teamPsuedoSplit = teamPsuedoVar1.slice(teamPsuedoX + 1, teamPsuedoVar1.length) //Var Value
                        teamPsuedoX = teamPsuedoVar1.length
                    }
                }
            }

            var teamPsuedoSplit = teamPsuedoSplit.split(" To ")
            var teamPsuedoVar3 = teamPsuedoSplit[0].trim()
            var maxValue = teamPsuedoSplit[1]

            if (maxValue.includes(" Step ")) {
                teamPsuedoSplit = maxValue.split(" Step ")
                maxValue = teamPsuedoSplit[0].trim()
                teamPsuedoStep = teamPsuedoSplit[1].trim()
            }






            teamPsuedoVar3 = evaluatePhrase(teamPsuedoVar3).toString()



            //Makes sure the variable name is valid
            checkValidName(teamPsuedoVar2)

            if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
            } else if ((checkVariableExistance(teamPsuedoVar2)) === true) {
                updateVariable(teamPsuedoVar2, teamPsuedoVar3);
                tryEval(teamPsuedoVar2 + " = " + teamPsuedoVar3)
            } else {
                if (teamPsuedoVarType == 0) {
                    if (isInteger(teamPsuedoVar3) || isReal(teamPsuedoVar3)) {
                        teamPsuedoVar3 = teamPsuedoVar3.split(".")[0];
                        teamPsuedovariables.push([teamPsuedoVar2, teamPsuedoVar3, teamPsuedoVarType]);
                    } else {
                        error(teamPsuedoVar2 + " is not an Integer value")
                    }
                } else {
                    error("Your For loop variable must be an Integer");
                }
                //Eval creates the variable in the background
                tryEval(teamPsuedoVar2 + " = " + teamPsuedoVar3)
            }
            // }
            // catch (e) {
            //     error("Make sure your For loop declaration follows the form: For counterVariable = startingValue To maxValue")

            // }

            teamPseudoAdded = false
            teamPseudoEvaluate = teamPsuedoVar2 + " <= " + maxValue;

            teamPsuedoResult = tryEval(teamPseudoEvaluate);



            for (teamPseudoX = 0; teamPseudoX < teamPsuedoLoops.length; teamPseudoX++) {
                if (teamPsuedoLoops[teamPseudoX][0] == teamPsuedoI) {
                    teamPseudoAdded = true
                }
            }
            if (!teamPseudoAdded) {
                teamPsuedoLoops.push([teamPsuedoI, "for", teamPseudoEvaluate, teamPsuedoResult, teamPsuedoVar2, teamPsuedoStep])
                TeamPseudoForVars.push(teamPsuedoVar2)

            }



        }

        else if (teamPsuedoCurrent.startsWith("End For")) {

            teamPseudoCurrentLoop = teamPsuedoLoops.pop()

            if (teamPseudoCurrentLoop[1] == "for") {
                var teamPsuedoVar2 = teamPseudoCurrentLoop[4]; //Var Name
                var teamPsuedoVar3 = teamPsuedoVar2 + " + " + teamPseudoCurrentLoop[5] //Var Value
                teamPsuedoX = teamPsuedoVar1.length


                teamPsuedoVar3 = evaluatePhrase(teamPsuedoVar3)








                updateVariable(teamPsuedoVar2, teamPsuedoVar3);
                //Eval updates the variable in the background
                eval(teamPsuedoVar2 + " = " + teamPsuedoVar3)





                if (tryEval(teamPseudoCurrentLoop[2]) == true) {
                    teamPseudoCurrentLoop[3] = true
                    teamPsuedoLoops.push(teamPseudoCurrentLoop)
                    teamPsuedoI = teamPseudoCurrentLoop[0]



                }
                else if (tryEval(teamPseudoCurrentLoop[2]) == false) {
                    teamPseudoCurrentLoop[3] = false

                    //var removeIndex = checkVariableIndex(teamPsuedoVar2)
                    //
                    //delete teamPsuedovariables[0]
                    //teamPsuedovariables = teamPsuedovariables.splice[removeIndex, 1]
                    //var teamPsuedovariables = teamPsuedovariables.filter(function (el) { return el; });

                }

            }
            else {
                error("There is a missing End For keyword")
            }

        } else if (teamPsuedoCurrent.startsWith("Do While ")) {
            teamPseudoAdded = false
            teamPseudoEvaluate = teamPsuedoCurrent.substring(9);
            //
            teamPsuedoResult = tryEval(teamPseudoEvaluate);



            for (teamPseudoX = 0; teamPseudoX < teamPsuedoLoops.length; teamPseudoX++) {
                if (teamPsuedoLoops[teamPseudoX][0] == teamPsuedoI) {
                    teamPseudoAdded = true
                }
            }
            if (!teamPseudoAdded) {
                teamPsuedoLoops.push([teamPsuedoI, "do", teamPsuedoCurrent.substring(9), true])
            }


        } else if (teamPsuedoCurrent.startsWith("End Do While")) {

            teamPseudoCurrentLoop = teamPsuedoLoops.pop()

            if (teamPseudoCurrentLoop[1] == "do") {
                if (tryEval(teamPseudoCurrentLoop[2]) == true) {
                    teamPseudoCurrentLoop[3] = true
                    teamPsuedoLoops.push(teamPseudoCurrentLoop)
                    teamPsuedoI = teamPseudoCurrentLoop[0]


                }
                else {
                    teamPseudoCurrentLoop[3] = false
                }
            }
            else {
                error("There is a missing End Do While keyword")
            }

        } else if (teamPsuedoCurrent.startsWith("End Module")) {
            return;
        } else if (teamPsuedoCurrent.startsWith("Module ")) {
            //Do nothing
        } else if (teamPsuedoCurrent.startsWith("Call ")) {
            teamPsuedoCurrent = teamPsuedoCurrent.substring(5);
            teamPsuedoCurrent = teamPsuedoCurrent.split("(")[0];
            teamPsuedoCurrent = teamPsuedoCurrent.trim();

            var teamPsuedoStart = -1;

            for (var teamPsuedoP = 0; teamPsuedoP < teamPsuedoFunctions.length; teamPsuedoP++) {
                if (teamPsuedoFunctions[teamPsuedoP][0].startsWith(teamPsuedoCurrent)) {
                    teamPsuedoStart = teamPsuedoFunctions[teamPsuedoP][1];
                    break;
                }
            }

            var tempVarStorage = [];

            if (teamPsuedoStart != 1) {
                // Store Variables temporarily in a holding variable
                for (var teamPsuedoP = 0; teamPsuedoP < teamPsuedovariables.length; teamPsuedoP++) {
                    tempVarStorage.push(teamPsuedovariables[teamPsuedoP]);
                }

                // Run new module
                executeCode(teamPsuedoStart);

                // Add Variables back out of temp storage
                teamPsuedovariables = [];
                for (var teamPsuedoP = 0; teamPsuedoP < tempVarStorage.length; teamPsuedoP++) {
                    teamPsuedovariables.push(tempVarStorage[teamPsuedoP]);
                }
            } else {
                error(teamPsuedoCurrent + " is not a defined Module.");
            }

        } else {
            error("Line " + (teamPsuedoI + 1) + " has invalid syntax.");
        }

        // Output the Current variables and their respective types and values
        document.getElementById('variables').innerHTML = "";
        for (var teamPsuedoJ = 0; teamPsuedoJ < teamPsuedovariables.length; teamPsuedoJ++) {
            var found = false
            for (teamPseudoL = 0; teamPseudoL < TeamPseudoForVars.length; teamPseudoL++) {
                if (teamPsuedovariables[teamPsuedoJ][0] == TeamPseudoForVars[teamPseudoL]) {
                    found = true
                }
            }
            if (!found) {
                if (teamPsuedovariables[teamPsuedoJ][2] == 0) {
                    var temp = "Integer: " + teamPsuedovariables[teamPsuedoJ][0] + " = " + teamPsuedovariables[teamPsuedoJ][1] + "\n"
                } else if (teamPsuedovariables[teamPsuedoJ][2] == 1) {
                    var temp = "Real: " + teamPsuedovariables[teamPsuedoJ][0] + " = " + teamPsuedovariables[teamPsuedoJ][1] + "\n"
                } else if (teamPsuedovariables[teamPsuedoJ][2] == 2) {
                    var temp = "String: " + teamPsuedovariables[teamPsuedoJ][0] + " = " + teamPsuedovariables[teamPsuedoJ][1] + "\n"
                } else if (teamPsuedovariables[teamPsuedoJ][2] == 3) {
                    var temp = "Character: " + teamPsuedovariables[teamPsuedoJ][0] + " = " + teamPsuedovariables[teamPsuedoJ][1] + "\n"
                } else if (teamPsuedovariables[teamPsuedoJ][2] == 4) {
                    var temp = "Boolean: " + teamPsuedovariables[teamPsuedoJ][0] + " = " + teamPsuedovariables[teamPsuedoJ][1] + "\n"
                }
                document.getElementById('variables').innerHTML += temp;
            }

        }
    }
}

function replaceVariables(teamPsuedoString) {
    // Need to work on this
    return teamPsuedoString
}

function getVariable(varName) {
    for (var teamPsuedoI = 0; teamPsuedoI < teamPsuedovariables.length; teamPsuedoI++) {
        if (teamPsuedovariables[teamPsuedoI][0] == varName) {
            return teamPsuedovariables[teamPsuedoI][1];
        }
    }
    error("The variable " + varName + " is not declared.");
}

function checkConstant(varName) {
    for (var teamPsuedoI = 0; teamPsuedoI < teamPsuedovariables.length; teamPsuedoI++) {
        if (teamPsuedovariables[teamPsuedoI][0] == varName) {
            if (teamPsuedovariables[teamPsuedoI][4] == 1) {
                return true
            }
            else {
                return false
            }
        }
    }
    error("The variable " + varName + " is not declared.");
}

function getVariableType(varName) {
    for (var teamPsuedoI = 0; teamPsuedoI < teamPsuedovariables.length; teamPsuedoI++) {
        if (teamPsuedovariables[teamPsuedoI][0] == varName) {
            //
            return teamPsuedovariables[teamPsuedoI][2];
        }
    }
    error("The variable " + varName + " is not declared.");
}

function updateVariable(varName, teamPsuedoValue) {
    var isArray = false
    for (var teamPsuedoI = 0; teamPsuedoI < teamPsuedovariables.length; teamPsuedoI++) {

        if (varName.includes("[") && varName.includes("]")) {
            for (teamPsuedoX = 0; teamPsuedoX < varName.length; teamPsuedoX++) {
                if (varName[teamPsuedoX] == "[") {
                    var teamPsuedoIndex = varName.slice(teamPsuedoX + 1, varName.length - 1)
                    varName = varName.slice(0, teamPsuedoX)
                    teamPsuedoIndex = evaluatePhrase(teamPsuedoIndex)
                    //
                }
            }
            isArray = true
        }
        else if (varName.includes("[") || varName.includes("]")) {
            error("Arrays values must be set using []. At least one bracket is missing")
        }

        if (teamPsuedovariables[teamPsuedoI][0] === varName) {
            //Checks if the array will be in bounds
            if (isArray) {
                if (teamPsuedoIndex >= teamPsuedovariables[teamPsuedoI][3]) {
                    error("Array " + varName + " is out of bounds at index " + teamPsuedoIndex)
                }
            }

            if (teamPsuedovariables[teamPsuedoI][2] == 0) {
                if (isInteger(teamPsuedoValue) || isReal(teamPsuedoValue)) {
                    //
                    try {
                        teamPsuedoValue = teamPsuedoValue.split(".")[0];
                    }
                    catch{
                        teamPsuedoValue = Math.floor(teamPsuedoValue)
                    }
                    try {
                        if (!isArray)
                            teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                        else {
                            teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                            tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
                        }
                    }
                    catch {
                        error(varName + " is not an Integer value.") //mention what line number we are on?
                    }

                } else {
                    error(varName + " is not an Integer value.") //mention what line number we are on?
                }
            } else if (teamPsuedovariables[teamPsuedoI][2] == 1) {
                //
                if (isReal(teamPsuedoValue)) {
                    if (!isArray)
                        teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                    else {
                        teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                        tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
                    }
                } else if (isInteger(teamPsuedoValue)) {
                    if (!teamPsuedoValue.toString().includes("."))
                        teamPsuedoValue = teamPsuedoValue + "."
                    if (!isArray)
                        teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                    else {
                        teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                        //
                        tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
                    }
                } else {
                    error(varName + " is not a Real value") //mention what line number we are on?
                }
            } else if (teamPsuedovariables[teamPsuedoI][2] == 2) {
                if (!isArray)
                    teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                else {
                    //
                    teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                    tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
                }
            } else if (teamPsuedovariables[teamPsuedoI][2] == 3) {
                teamPsuedoValue = teamPsuedoValue.toString();
                teamPsuedoValue = teamPsuedoValue.trim();
                teamPsuedoValue = teamPsuedoValue.charAt(0);
                if (!isArray)
                    teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                else {
                    teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                    //tryEval(varName + "[" + index + "]= " + value)
                }
            } else if (teamPsuedovariables[teamPsuedoI][2] == 4) {
                if (teamPsuedoValue == "true" || teamPsuedoValue == true) {
                    if (!isArray)
                        teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                    else {
                        teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                        tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
                    }
                }
                else if (teamPsuedoValue == "false" || teamPsuedoValue == false) {
                    if (!isArray)
                        teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                    else {
                        teamPsuedovariables[teamPsuedoI][1][teamPsuedoIndex] = teamPsuedoValue
                        tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
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
    if (teamPsuedovariables.length == 0) {
        return false;
    }
    for (var teamPsuedoI = 0; teamPsuedoI < teamPsuedovariables.length; teamPsuedoI++) {
        if (teamPsuedovariables[teamPsuedoI][0] === varName) {
            return true;
        }
    }
    return false;
}

function checkVariableIndex(varName) {
    if (teamPsuedovariables.length == 0) {
        return false;
    }
    for (var teamPsuedoI = 0; teamPsuedoI < teamPsuedovariables.length; teamPsuedoI++) {
        if (teamPsuedovariables[teamPsuedoI][0] === varName) {
            return teamPsuedoI;
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
            error("There was an undefined reference error. These errors are often caused by using Strings without quotation marks or variables being referenced that don't exist or are refered to with an incorrect method.")
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
    for (var teamPsuedoI = 0; teamPsuedoI < var1.length; teamPsuedoI++) {
        //
        if (var1[0] == "-")
            teamPsuedoI++
        if (var1[teamPsuedoI] === "0" || var1[teamPsuedoI] === "1" || var1[teamPsuedoI] === "2" || var1[teamPsuedoI] === "3" || var1[teamPsuedoI] === "4" || var1[teamPsuedoI] === "5" || var1[teamPsuedoI] === "6" || var1[teamPsuedoI] === "7" || var1[teamPsuedoI] === "8" || var1[teamPsuedoI] === "9") {
            //Do nothing
        } else {
            return false;
        }
    }
    return true;
}

function isReal(var1) {
    var numOfDots = 0;
    for (var teamPsuedoI = 0; teamPsuedoI < var1.length; teamPsuedoI++) {
        if (var1[0] == "-")
            teamPsuedoI++
        if (var1[teamPsuedoI] === "0" || var1[teamPsuedoI] === "1" || var1[teamPsuedoI] === "2" || var1[teamPsuedoI] === "3" || var1[teamPsuedoI] === "4" || var1[teamPsuedoI] === "5" || var1[teamPsuedoI] === "6" || var1[teamPsuedoI] === "7" || var1[teamPsuedoI] === "8" || var1[teamPsuedoI] === "9") {
            //Do nothing
            if (var1[teamPsuedoI] === "-0" || var1[teamPsuedoI] === "-1" || var1[teamPsuedoI] === "-2" || var1[teamPsuedoI] === "-3" || var1[teamPsuedoI] === "-4" || var1[teamPsuedoI] === "-5" || var1[teamPsuedoI] === "-6" || var1[teamPsuedoI] === "-7" || var1[teamPsuedoI] === "-8" || var1[teamPsuedoI] === "-9" && !leftSide) {
                error("You cannot have a negative in the decimal spot")
            }
        } else if (var1[teamPsuedoI] === ".") {
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
function evaluatePhrase(teamPseudoPhrase) {

    //
    var teamPseudoIsQuote = false
    var teamPseudoI = 0
    var teamPseudoHadQuote = false

    if (teamPseudoPhrase.length == 0)
        return

    //Formats the teamPseudoPhrase to fit JavaScript syntax
    for (teamPseudoX = 0; teamPseudoX < teamPseudoPhrase.length; teamPseudoX++) {
        //Checks if we're in a String literal
        if (teamPseudoPhrase[teamPseudoX] == "\"" || teamPseudoPhrase[teamPseudoX] == "\'") {
            teamPseudoHadQuote = true;
            if (teamPseudoIsQuote)
                teamPseudoIsQuote = false
            else
                teamPseudoIsQuote = true
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

    //
    var teamPseudoParts = teamPseudoPhrase.split(/('.*?'|".*?"|\S+)/)

    //

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
        else if (!teamPseudoHadQuote) {
            (isInteger(teamPseudoParts[teamPseudoI]) || isReal(teamPseudoParts[teamPseudoI]))
        }
        else if (teamPseudoParts[teamPseudoI] == "" || teamPseudoParts[teamPseudoI] == " ") {
        }
        else {
            error("The variable " + teamPseudoParts[teamPseudoI] + " has not been declared. If you meant to print out this word/number as text, make sure you have quotes around it.")
        }

        teamPseudoI++
    }

    return (tryEval(teamPseudoPhrase))
}

function getConditionResult(phrase) {
    teamPsuedoResult = evaluatePhrase(phrase)
    if (teamPsuedoResult == true)
        return (true)
    else if (teamPsuedoResult == false)
        return (false)
    else
        error("The condition " + phrase + " must teamPsuedoResult in either true or false")
}

function checkValidName(name) {
    bracket = name.length

    for (teamPsuedoX = 0; teamPsuedoX < name.length; teamPsuedoX++) {
        if (name[teamPsuedoX] == "[") {
            bracket = teamPsuedoX
            break
        }
    }
    //
    name = name.slice(0, bracket)
    //

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
    if (name == "Step")
        error("Step is a reserved word that can't be used in variable names")
    if (name == "To")
        error("To is a reserved word that can't be used in variable names")
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
            var contents = e.target.teamPsuedoResult;
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
$(function () {
    $(".lined").linedtextarea();
});

//Copies contents of output box
function copy() {
    let textarea = document.getElementById("console");
    textarea.select();
    document.execCommand("copy");
}

function toggleHelp() {
    var help = document.querySelector("iframe");
    var question = document.querySelector("#help-btn");
    if (help.classList.contains("show")) {
        help.classList.remove("show");
        question.classList.remove("show");
    }
    else {
        help.classList.add("show");
        question.classList.add("show");
    }
}

//Allows user to download output text
$(document).ready(function () {

    function saveTextAsFile() {
        var textToWrite = document.getElementById("console").value;
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

        var fileNameToSaveAs = prompt("Enter the filename you wish to save your output to", "");
        if (fileNameToSaveAs === "") {
            fileNameToSaveAs = "PseudoOutput"
        }

        var downloadLink = document.createElement("a");

        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "link";
        window.URL = window.URL || window.webkitURL;
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }

    $("#save-to-file").click(function (e) {
        e.preventDefault();
        saveTextAsFile();
    });
});
