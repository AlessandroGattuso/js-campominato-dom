document.querySelector('button').addEventListener('click', () => {

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

function createGrid(N){
  const grid = document.querySelector('.grid');
  const bombs = fillBombs(N);
  console.log(bombs.sort(function(a,b){return a-b;}));
  if(grid)
      grid.innerHTML = null;

  for(let i = 1; i <= N; ++i){
      grid.appendChild(createGridElement(i,N,bombs,grid));
  }

} 

function createGridElement(i, N, bombs, grid){
    const e = document.createElement('div');
    e.innerText = i;

    e.className = 'square';
    e.style.height = e.style.width = `calc(100%/${Math.sqrt(N)})`;

    e.addEventListener('click', function(){
  
      if(bombs.find(j => this.innerText == j)){
        setTimeout(()=>alert("Hai perso"), 75);
        endGame(N, bombs, grid);
      }
      else{
        this.classList.add("active");
        setTimeout(()=>checkVictory(N, bombs, grid), 75);
      }
    },{once: "true"});
    
    return e;
}

function fillBombs(N){
  let bombs = [];
  let i = 0;
  while(i <  16){
    let rand = Math.floor(Math.random() * N + 1);
    if(!(bombs.includes(rand))){
        bombs.push(rand);
        ++i;
    }
  }
  return bombs;
}

function checkVictory(N, bombs, grid){
  const cellsActive = document.querySelectorAll('.grid .active');

  if((cellsActive.length) == (N - bombs.length)){
    alert(`Congratulazioni, hai fatto ${N - bombs.length} punti`);
    endGame(N, bombs, grid);
  }
}

function endGame(N, bombs, grid){
  bombs.forEach(k => {
     let bomb = grid.childNodes[k-1];
     bomb.innerText = '';
     bomb.style.backgroundColor = 'rgb(225, 52, 104)';
     bomb.innerHTML = '<i class="fa-solid fa-bomb"></i>';
  });
  grid.outerHTML = grid.outerHTML;
  setTimeout(() => createGrid(N), 2000);
}