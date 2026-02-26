import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type ConversationTurn = {
    user : Text;
    robot : Text;
    correction : ?Text;
  };

  let conversationLog = List.empty<ConversationTurn>();

  public shared ({ caller }) func processInput(userInput : Text) : async Text {
    if (userInput.size() == 0) { Runtime.trap("Input cannot be empty.") };

    let analyzedInput = analyzeInput(userInput);
    let robotResponse = generateResponse(analyzedInput);
    conversationLog.add(robotResponse);
    robotResponse.robot;
  };

  func analyzeInput(input : Text) : ConversationTurn {
    if (input.contains(#char 'I') and input.contains(#text "goed")) {
      {
        user = input;
        robot = "I see what you mean! Remember, it's 'went', not 'goed'. Can you repeat that for me?";
        correction = ?"Correction: 'I went to the store yesterday.'";
      };
    } else if (input.contains(#text "gonna")) {
      {
        user = input;
        robot = "That's a common phrase! In formal English, we say 'going to'.";
        correction = ?"Correction: 'I am going to play.'";
      };
    } else {
      {
        user = input;
        robot = "Great sentence! Try using some new words you've learned recently.";
        correction = null;
      };
    };
  };

  func generateResponse(turn : ConversationTurn) : ConversationTurn {
    turn;
  };

  public query ({ caller }) func getConversationLog() : async [ConversationTurn] {
    conversationLog.toArray();
  };
};
