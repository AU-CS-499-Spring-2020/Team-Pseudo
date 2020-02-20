# Pseudocode Command Reference

Display
IF / ENDIF
WHILE / ENDWHILE
FOR / ENDFOR
INPUT
VAR
ASSIGN

Variable types
String
Boolean
Int
Real


Implement Boolean?


Data Types: Integer, Real, String, Character

Page 591
Variables:
Declare DataType VariableName

Named Constants:
Constant DataType Name = Value

Page 592
Arrays:
Declare DataType ArrayName[Size]

Two-Dimensional Arrays:
Declare DataType ArrayName[Rows][Cols]

Displaying Output:
Display var
Display “This text will be displayed as is”
Display var1, var2, var3
Display var, Tab, var2 (The word Tab indents the screen output to the next tab position)

Reading Input:
Input variableName

Page 593
Math Operators: +, -, *, /, MOD, ^

Relational Operators: >, <, >=, <=, ==, !=

Logical Operators: AND, OR, NOT

Page 594
The If-Then Statement:
If condition Then
statement
statement
etc.
           End If

The If-Then-Else:
If condition Then
statement
statement
etc.
             Else
statement
statement
etc.
             End If

The Select Case Statement:
Select testExpression
	Case value_1:
		statement
statement
Etc.
Case value_2:
		statement
statement
Etc.
Case value_N:
		statement
statement
Etc.
Default:
		statement
statement
Etc.
End Select
Page 595
The While Loop:
While condition
	statement
	statement
	etc.
End While

Page 596
The Do-While Loop:
Do
statement
	statement
	Etc.
While condition

The Do-Until Loop:
Do
statement
	statement
	Etc.
Until condition

Page 597
The For Loop:
For counterVariable = startingValue To maxValue
	statement
	statement
	etc.
End For

The For Each Loop:
For Each var In array
	statement
	statement
	etc.
End For

Page 598
Defining a Module:
Module name()
	statement
	statement
	etc.
End Module

Calling a Module:
Call ModuleName()

Parameter Variables:
Module ModuleName(variableType variableName)
statement
	statement
	etc.
End Module

Defining a Function:
Function dataType FunctionName (parameterList)
	statement
	statement
	etc.
Return value
End Function

Page 599
Opening an Output File and Writing Data to it:
Declare OutputFile fileVariable
Open fileVariable “fileName”

Write fileVariable “text”

Close fileVariable

Opening an Input File and Reading Data From it:
Declare InputFile fileVariable
Open fileVariable “fileName”

Read fileVariable variable

Close fileVariable

Page 600
Detecting the End of an Input File:
eof(FileName)
//returns a boolean true if end of file is reached and false if end of file has not been reached

Deleting a File:
Delete FileName

Renaming a File
Rename ExistingName, NewName

Defining a Class
Class className
	Field declarations and method definitions go here…
End Class

Example:
Class CellPhone
// Field declarations
Private String manufacturer
Private String modelNumber
Private Real retailPrice
// Method definitions
Public Module setManufacturer(String manufact)
Set manufacturer = manufact
End Module

Public Module setModelNumber(String modNum)
Set modelNumber = modNum
End Module

Public Module setRetailPrice(Real retail)
Set retailPrice = retail
End Module

Public Function String getManufacturer()
Return manufacturer
End Function

Public Function String getModelNumber()
Return modelNumber
End Function

Public Function Real getRetailPrice()
Return retailPrice
End Function
End Class

Page 601
Creating an Instance of a Class:
Declare ClassName variableName
Set variableName = New ClassName()
