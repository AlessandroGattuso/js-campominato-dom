document.querySelector('button').addEventListener('click', () => { 
  //select the mode and pass the number of cells to the create grid function related to the difficulty
  switch(document.querySelector('select').value){
    case 'easy':
        createGrid(100);
        break; 
    case 'medium':
        createGrid(81);
        break; 
    case 'hard':
        createGrid(49);
        break; 
    default:
        createGrid(100);
        break; 
  }

})

//Function to create a grid
function createGrid(N){
  const grid = document.querySelector('.grid');
  //bombs is an array that we save the cells that have a bomb
  const bombs = fillBombs(N);
  
  //if we already created a list, cancel it
  if(grid)
      grid.innerHTML = null;

  //create the element and append to our grid and do it for the number of cells
  for(let i = 1; i <= N; ++i)
      grid.appendChild(createGridElement(i,N,bombs,grid));

} 

//Function to create the elemend of the grid
function createGridElement(i, N, bombs, grid){
    const e = document.createElement('div');
    e.innerText = i;

    e.className = 'square';
    e.style.height = e.style.width = `calc(100%/${Math.sqrt(N)})`;

    e.addEventListener('click', function(){
      //if the user clicked a cell where there is a bomb the game is over
      if(bombs.find(j => this.innerText == j)){
        //we want a delay that the alert will not appear instantly
        setTimeout(()=>alert("Hai perso"), 75);
        //we end the game
        endGame(N, bombs, grid);
      }
      //else add class active to the cell
      else{
        this.classList.add("active");
        /* 
           we want to know if the cell the user clicked is the last cell of the cells where there is not a bomb
           we used setTimeout to have a little delay
        */
        setTimeout(()=>checkVictory(N, bombs, grid), 75);
      }
    },{once: "true"}); //once: true is an option that we say to run the event once
    
    return e; 
}

//Function to popolate bombs 
function fillBombs(N){
  let bombs = [];
  let i = 0;
  //Number of bombs in the game are 16
  while(i <  16){
    //create a random number in a range 
    let rand = Math.floor(Math.random() * N + 1);
    //if the number doesn't already exists in the array and put it inside the array
    if(!(bombs.includes(rand))){
        bombs.push(rand);
        ++i; 
    }
  }
  return bombs;
}

//Function that we check if the user clicked the last remain cell of the "non-bombs" cells
function checkVictory(N, bombs, grid){
  //select ecery cell have the class active
  const cellsActive = document.querySelectorAll('.grid .active');

  //if the number of cells that have the class active is equal to the total number of cells minus the cells who have the bomb, the user win
  if((cellsActive.length) == (N - bombs.length)){
    alert(`Congratulazioni, hai fatto ${N - bombs.length} punti`);
    endGame(N, bombs, grid);
  }
}

//Function that end the game
function endGame(N, bombs, grid){
  //We show every cell's bomb in the game
  bombs.forEach(k => {
     let bomb = grid.childNodes[k-1];
     bomb.innerText = '';
     bomb.style.backgroundColor = 'rgb(225, 52, 104)';
     bomb.innerHTML = '<i class="fa-solid fa-bomb"></i>';
  });
  //This instruction it helps us that the user can't trigger other events inside the grid
  grid.outerHTML = grid.outerHTML;

  //At the end we wait 2 seconds to show the result and after that we create another game with create grid function
  setTimeout(() => createGrid(N), 2000);
}