let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;
//let gameEnded = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        //console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    removeStrikes();
    msgContainer.classList.add("hide");
};

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        //box.parentElement.querySelectorAll(".strike").forEach((line) => line.remove());
    }
    removeStrikes();
};

// const removeStrikes = () =>{
//     let strikeLines = document.querySelectorAll(".strike");
//     for(let i = 0; i < strikeLines.length; i++){
//         strikeLines[i].remove();
//     }
// };

const showWinner = (winner, pattern) =>{
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    //highlightWinner(pattern);
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

        if(post1Val != "" && post2Val != "" && post3Val != ""){
            if(post1Val === post2Val && post2Val === post3Val){
                //console.log("winner",post1Val);
                showWinner(post1Val, pattern);
                return;
            }
        }
    }
    checkDraw();
};

const checkDraw = () =>{
    let allFilled = true;

    for(let box of boxes){
        if(box.innerText === ""){
            allFilled = false;
            break;
        }
    }

    if(allFilled){
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
