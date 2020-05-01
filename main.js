
var teamPsuedovariables = []
var teamPsuedoLoops = []
var teamPsuedoFunctions = []
var TeamPseudoIfs = []

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

    // Find all of the loops and add them to a list
    // var tempLoops = [];
    // for (var teamPsuedoP = 0; teamPsuedoP < teamPsuedoCode.length; teamPsuedoP++) {
    //     teamPsuedoCode[teamPsuedoP] = teamPsuedoCode[teamPsuedoP].trim();
    //     if (teamPsuedoCode[teamPsuedoP].startsWith("While") || teamPsuedoCode[teamPsuedoP].startsWith("Do")) {
    //         tempLoops.push(teamPsuedoP + 1);
    //     } else if (teamPsuedoCode[teamPsuedoP].startsWith("End While") || teamPsuedoCode[teamPsuedoP].startsWith("End Do While")) {
    //         if (tempLoops.length != 0) {
    //             teamPsuedoLoops.push([tempLoops.pop(), teamPsuedoP+1]);
    //         } else {
    //             error("Issue with too few While Statements");
    //         }
    //     }
    //     console.log("loops: " + teamPsuedoLoops)
    // }
    // if (tempLoops.length != 0) {
    //     error("Issue with too many While Statements");
    // }

    // The fun stuff
    for (var teamPsuedoI = line; teamPsuedoI < teamPsuedoCode.length; teamPsuedoI++) {
        var teamPsuedoCurrent = teamPsuedoCode[teamPsuedoI].replace(/^\s+/g, ''); //Removes white space from the left side for indentation
        console.log("Line " + (teamPsuedoI + 1))
        console.log(teamPsuedovariables)
        console.log("Line " + (teamPsuedoI + 1))
        console.log(teamPsuedovariables)

        // Remove any comments that the user puts into the code
        teamPsuedoCurrent = teamPsuedoCurrent.split("//")[0];

        //Checks if the loop is supposed to execute
        if(teamPsuedoLoops.length > 0) {
            workingLoop = teamPsuedoLoops.pop(teamPsuedoLoops.length)
            teamPsuedoLoops.push(workingLoop)
            console.log("work loop: " + workingLoop)
            console.log("loops: " + teamPsuedoLoops)
            console.log(workingLoop[3])
            if (workingLoop[3] == false) {
                console.log("in false")
                loopEnd = false
                currentLoop = teamPsuedoLoops.length
                loopType = workingLoop[1]
                while(!loopEnd) {
                    console.log("move to " + teamPsuedoI)
                    console.log("curent: " + teamPsuedoCurrent)
                    console.log(teamPsuedoLoops.length)
                    if(teamPsuedoCurrent.startsWith("End While")) {
                        if ((teamPsuedoLoops.length == currentLoop) && (loopType == "while")) {
                            loopEnd = true
                            teamPsuedoLoops.pop()
                            console.log("while loop end true")
                            console.log(teamPsuedoI)
                            //teamPsuedoI++
                            //teamPsuedoCurrent = teamPsuedoCode[teamPsuedoI].replace(/^\s+/g, '');
                            console.log(teamPsuedoLoops)
                            console.log(teamPsuedoCurrent)
                            
                        }
                        else if (teamPsuedoLoops.length == currentLoop) {
                            error("There's a missing End While command")
                        }
                        else {
                            teamPsuedoLoops.pop()
                        }
                    }
                    else if (teamPsuedoCurrent.startsWith("End Do While")) {
                        if ((teamPsuedoLoops.length == currentLoop) && (loopType == "do")) {
                            loopEnd = true
                            teamPsuedoLoops.pop()
                            console.log("do loop end true")
                        }
                        else if (teamPsuedoLoops.length == currentLoop) {
                            error("There's a missing End Do While command")
                        }
                        else {
                            teamPsuedoLoops.pop()
                        }
                    }
                    else if (teamPsuedoCurrent.startsWith("End For")) {
                        if ((teamPsuedoLoops.length == currentLoop) && (loopType == "for")) {
                            loopEnd = true
                            teamPsuedoLoops.pop()
                            console.log("for loop end true")
                        }
                        else if (teamPsuedoLoops.length == currentLoop) {
                            error("There's a missing End For command")
                        }
                        else {
                            teamPsuedoLoops.pop()
                        }
                    }
                    else if (teamPsuedoCurrent.startsWith("While ")) {
                    console.log("added while: " + teamPsuedoLoops)
                        teamPsuedoLoops.push([teamPsuedoI, "while", teamPsuedoCurrent.substring(6), false])
                    }
                    teamPsuedoI++
                    teamPsuedoCurrent = teamPsuedoCode[teamPsuedoI].replace(/^\s+/g, '');
                    console.log("leaving at: " + teamPsuedoI + ": " + teamPsuedoCurrent)
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
                //console.log("pass")
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
                //console.log("name " + var2);
                //console.log("value " + var3);

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
                        //console.log("var 3 " + var3)
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
                    //console.log(var2 + " = " + var3)
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
                                //console.log(size + ", " + var1)
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
                //console.log("name " + var2);
                //console.log("value " + var3);

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
                        //console.log("var 3 " + var3)
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
                    //console.log(var2 + " = " + var3)
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
                                //console.log(size + ", " + var1)
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
                //console.log(typeof var3)
                if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                    error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
                } else if (teamPsuedoVar2.includes("[") || teamPsuedoVar2.includes("]")) {
                    //console.log(var2 + "," + var3)
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
            console.log("var2 = " + teamPsuedoVar2)
            console.log("var3 = " + teamPsuedoVar3)
            if (typeof teamPsuedoVar3 == "string")
                teamPsuedoVar3 = "\"" + teamPsuedoVar3 + "\""
            //console.log(typeof var3)
            if (teamPsuedoVar2 == undefined || teamPsuedoVar3 == undefined) {
                error("Syntax Error on line " + (teamPsuedoI + 1) + ".");
            } else if (teamPsuedoVar2.includes("[") || teamPsuedoVar2.includes("]")) {
                //console.log(var2 + "," + var3)
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
                //console.log(ifCond)
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
            //console.log(selectCond)

        } else if (teamPsuedoCurrent.startsWith("While ")) {
            added = false
            evaluate = teamPsuedoCurrent.substring(6);
            //console.log(evaluate);
            teamPsuedoResult = tryEval(evaluate);
            console.log("results: " + teamPsuedoResult);
            console.log("condition: " + teamPsuedoCurrent.substring(6))

            for (x = 0; x < teamPsuedoLoops.length; x++) {
                if (teamPsuedoLoops[x][0] == teamPsuedoI) {
                    added = true
                }
            }
            if (!added) {
                teamPsuedoLoops.push([teamPsuedoI, "while", teamPsuedoCurrent.substring(6), teamPsuedoResult])
            }
            console.log("Loops: " + teamPsuedoLoops)
            console.log("Loops: lengths " + teamPsuedoLoops.length)
        } else if (teamPsuedoCurrent.startsWith("End While")) {
            //temp
            //teamPsuedoI = getLoop(teamPsuedoI);
            console.log(teamPsuedoLoops + " i: " + teamPsuedoCurrent)
            currentLoop = teamPsuedoLoops.pop()
            console.log("current loop:" + currentLoop)
            if(currentLoop[1] == "while") {
                if(tryEval(currentLoop[2]) == true) {
                    currentLoop[3] = true
                    teamPsuedoLoops.push(currentLoop)
                    teamPsuedoI = currentLoop[0]
                    console.log("Loops: " + teamPsuedoLoops)
                    console.log("Going to: " + teamPsuedoI)
                }
                else {
                    currentLoop[3] = false
                }
            }
            else {
                error("There is a missing End While keyword")
            }

        } else if (teamPsuedoCurrent.startsWith("Do")) {
            //Nothing
        } else if (teamPsuedoCurrent.startsWith("End Do While")) {
            evaluate = teamPsuedoCurrent.substring(13);
            teamPsuedoResult = tryEval(evaluate);
            console.log(teamPsuedoResult);
            console.log(typeof (teamPsuedoResult))
            if (teamPsuedoResult) {
                teamPsuedoI = getLoop(teamPsuedoI);
            }
        } else if (teamPsuedoCurrent.startsWith("End Module")) {
            return;
        } else if (teamPsuedoCurrent.startsWith("Module ")) {
            console.log("you should never get this");
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
    console.log("Done")
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
    console.log("var1 " + varName)
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
            //console.log("Type: " + variables[teamPsuedoI][2])
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
                    //console.log(index + ", " + varName)
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
                    //console.log("int " + value)
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
                //console.log("v " + value)
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
                        //console.log((varName + "[" + index + "]= " + value))
                        tryEval(varName + "[" + teamPsuedoIndex + "]= " + teamPsuedoValue)
                    }
                } else {
                    error(varName + " is not a Real value") //mention what line number we are on?
                }
            } else if (teamPsuedovariables[teamPsuedoI][2] == 2) {
                if (!isArray)
                    teamPsuedovariables[teamPsuedoI][1] = teamPsuedoValue;
                else {
                    //console.log(value + ", teamPsuedoI:" + index)
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
        //console.log()
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

    //console.log("P: " + teamPseudoPhrase)
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

    //console.log("After ops: " + teamPseudoPhrase)
    var teamPseudoParts = teamPseudoPhrase.split(/('.*?'|".*?"|\S+)/)

    //console.log("parts: " + teamPseudoParts)

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
    //console.log(bracket)
    name = name.slice(0, bracket)
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

// function getLoop(teamPsuedoI) {
//     var p = 0;
//     while (p < teamPsuedoLoops.length) {
//         if (teamPsuedoLoops[p][1] == teamPsuedoI) {
//             var temp = ((teamPsuedoLoops[p][0]) - 1);
//             return temp;
//         }
//         p++;
//     }
//     error("Loop return point not found.");
// }

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
