
//YouTube Video Link: https://youtu.be/jjBfz5_yJP8

//Game Objective: Two players race to press their button as soon as the green “GO” LED lights up.
//Rules: If you press before the green LED, you “false start” and lose the round. Otherwise, the first button press after the green LED wins.
//Challenge: You don’t know exactly when the green LED will turn on—react too early and you’re penalized; react too late and you lose.
//Interaction: Arduino randomly delays (while checking for early presses), lights up the green LED, and then reads two button inputs; the winner’s red or blue LED lights and the result prints over on the Serial Page.
//

const int greenLED  = 5;   // “GO” signal (PWM pin)
const int redLED    = 10;  // Player 1 win indicator (PWM pin)
const int blueLED   = 11;  // Player 2 win indicator (PWM pin)
const int button1   = 2;   // Player 1 button (external pull-down resistor)
const int button2   = 3;   // Player 2 button (external pull-down resistor)

bool    greenOn        = false;
bool    winnerDeclared = false;
unsigned long startTime = 0;

void setup() {
  pinMode(greenLED, OUTPUT);
  pinMode(redLED,   OUTPUT);
  pinMode(blueLED,  OUTPUT);
  pinMode(button1, INPUT);
  pinMode(button2, INPUT);

  Serial.begin(9600);
  Serial.println("Get ready...");

  waitForGo();  
}

void loop() {
  bool p1 = digitalRead(button1) == HIGH;
  bool p2 = digitalRead(button2) == HIGH;

  // After GO, first press wins!
  if (greenOn && !winnerDeclared) {
    if (p1) {
      unsigned long reaction = millis() - startTime;
      Serial.print("Player 1 wins! Reaction time: ");
      Serial.print(reaction);
      Serial.println(" ms");
      digitalWrite(redLED, HIGH);
      greenOn        = false;
      winnerDeclared = true;
      delay(3000);
      resetGame();
    }
    else if (p2) {
      unsigned long reaction = millis() - startTime;
      Serial.print("Player 2 wins! Reaction time: ");
      Serial.print(reaction);
      Serial.println(" ms");
      digitalWrite(blueLED, HIGH);
      greenOn        = false;
      winnerDeclared = true;
      delay(3000);
      resetGame();
    }
  }
}

// random time before GO, checking for false starts
void waitForGo() {
  unsigned long target = millis() + random(2000, 5000);
  while (millis() < target) {
    if (digitalRead(button1) == HIGH || digitalRead(button2) == HIGH) {
      Serial.println("False start! Wait for GO!");
      delay(2000);
      resetGame();
      return;
    }
    delay(10);
  }
  digitalWrite(greenLED, HIGH);
  greenOn   = true;
  startTime = millis();
  Serial.println("GO!");
}

// Resets the game for the next round
void resetGame() {
  digitalWrite(greenLED, LOW);
  digitalWrite(redLED,   LOW);
  digitalWrite(blueLED,  LOW);
  greenOn        = false;
  winnerDeclared = false;

  Serial.println("Resetting...");
  delay(2000);
  Serial.println("Get ready...");

  waitForGo();
}
