#pragma strict

var Inputs = new Array (float);
var Weights = new Array (float);
var Sum : float;
var Difference : float;
var Learning_Rate : float;

var Input_1 : UnityEngine.UI.Text;
var Input_2 : UnityEngine.UI.Text;
var Input_3 : UnityEngine.UI.Text;
var Neuron_1 : UnityEngine.UI.Text;
var Output_1 : UnityEngine.UI.Text;
var Weight_1 : UnityEngine.UI.Text;
var Weight_2 : UnityEngine.UI.Text;
var Weight_3 : UnityEngine.UI.Text;
var Weight_4 : UnityEngine.UI.Text;

var Time_Elapsed : UnityEngine.UI.Text;
var Cycles_Completed : UnityEngine.UI.Text;
var Cycles : float;
var Amount_Correct : UnityEngine.UI.Text;
var Correct : float;
var Percentage_Correct : UnityEngine.UI.Text;
var Correct_1000 : float;
var Cycles_1000 : float;

function Start () {
	Weights.length = 4;
	Inputs.length = 4;
	Learning_Rate = .2;
	Cycles = 0;
	Generate_Inputs();
	Generate_Weights();
}

function Update () {
	Input_1.text = Inputs[0].ToString();
	Input_2.text = Inputs[1].ToString();
	Input_3.text = Inputs[2].ToString();
	Neuron_1.text = Sum.ToString();
	Output_1.text = Difference.ToString();
	Weight_1.text = Weights[0].ToString();
	Weight_2.text = Weights[1].ToString();
	Weight_3.text = Weights[2].ToString();
	Weight_4.text = Weights[3].ToString();
	Time_Elapsed.text = "Time Elapsed: " + Mathf.Round(Time.realtimeSinceStartup);
	Cycles_Completed.text = "Cycles Completed: " + Cycles;
	Amount_Correct.text = "Amount Correct: " + Correct + " / " + Cycles;
	Percentage_Correct.text = "% Correct (In past 1000): " + (Correct_1000 / Cycles_1000 * 100).ToString();
	Generate_Inputs();
	Train();
}

function Generate_Weights () {
	for (var i : int = 0; i < Weights.length; i++) {
		Weights[i] = Random.Range(-1.00f, 1.00f);
	}
	Train();
}

function Generate_Inputs () {
	var initial : float = Random.Range(-.1f, .1f);
	Difference = Random.Range(-.1f, .1f);
	for (var i : int = 0; i + 1 < Inputs.length; i++) {
		Inputs[i] = (i * Difference) + initial;
	}
	Inputs[3] = 1;
}

function Train () {
	Sum = 0;
	for (var i : int = 0; i < Weights.length; i++) {
		var input : float = Inputs[i];
		var weight : float = Weights[i];
		Sum += input * weight;
	}
	Adjust_Weights();
}

function Adjust_Weights () {
	var error : float = Difference - Sum;
	for (var i : int = 0; i < Weights.length; i++) {
		var input : float = Inputs[i];
		var weight : float = Weights[i];
		Weights[i] = weight + (error * input * Learning_Rate);
	}
	Cycles++;
	Cycles_1000++;
	if (Cycles_1000 > 1000) {
		Cycles_1000 = 1;
		Correct_1000 = 0;
	}
	if (Sum / Difference > .999995 && Sum / Difference < 1.000005) {
		Correct++;
		Correct_1000++;
	}
}

//Error correctin
//Weight = Weight + (Weight * error%)