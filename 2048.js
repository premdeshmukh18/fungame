var board;
var score= 0;
var rows=4;
var cols=4;

window.onload=function() {
    setGame();
}

function setGame() {
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for(let r=0; r<rows; r++)
    {
        for(let c=0; c<cols; c++)
        {
            //div></div>
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            let num=board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile()
{
    for(let r=0; r<rows; r++)
    {
        for(let c=0; c<cols; c++)
        {
            if(board[r][c]==0)
            return true;
        }
    }
    return false;
}

function setTwo()
{
    if(!hasEmptyTile())
    {
        console.log(hasEmptyTile());
        alert("GAME OVER!");
        return;
    }
    let found=false;
    while(!found)
    {
        // random r,c
        let r =Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*cols);

        if(board[r][c]==0)
        {
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            found=true;
        }
    }
}

function updateTile(tile,num)
{
    tile.innerText = "";
    tile.classList.value=""; //clear the classList;
    tile.classList.add("tile");
    if(num>0)
    {
        tile.innerText = num;
        if(num<=4096)
        {
            tile.classList.add("x"+num.toString());
            if (num > 2) {
                tile.classList.add("add-animation"); // Add this class for animation
                tile.addEventListener("animationend", () => {
                    tile.classList.remove("add-animation");
                });
            }
        }
        else
        {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e)=>{
    if(e.code=="ArrowLeft")
    {
        slideLeft();
        //setTwo();
    }
    else if(e.code=="ArrowRight")
    {
        slideRight();
        //setTwo();
    }
    else if(e.code=="ArrowUp")
    {
        slideUp();
        //setTwo();
    }
    else if(e.code=="ArrowDown")
    {
        slideDown();
        //setTwo();
    }
    document.getElementById("score").innerText=score;
})

function filterZero(row)
{
    return row.filter(num=>num!=0); //create a new array without zeros
}

function slide(row)
{
    //[0,2,2,2]
    row=filterZero(row);  //get rid os zeros ->[2,2,2]

    for(let i=0; i<row.length-1; i++)
    {
        if(row[i]==row[i+1])
        {
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }

        // [2,2,2]->[4,0,2]
    }

    row=filterZero(row); //[4,2]

    while(row.length<cols)
    {
        row.push(0);
    }//

    return row;
}

function slideLeft()
{
    let flag=true;
    for(let r=0; r<rows; r++)
    {
        let row=board[r];
        let pv=row;
        row=slide(row);
        if(((pv[0]!=row[0])||(pv[1]!=row[1])||(pv[2]!=row[2])||(pv[3]!=row[3]))&&flag)
        {
            flag=false;
        }
        board[r]=row;

        for(let c=0; c<cols; c++ )
        {
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
    if(!flag)
    {
        setTwo();
    }
}

function slideRight()
{
    let flag=true;
    for(let r=0; r<rows; r++)
    {
        let row=board[r];
        row.reverse();
        let pv=row;
        row=slide(row);
        if(((pv[0]!=row[0])||(pv[1]!=row[1])||(pv[2]!=row[2])||(pv[3]!=row[3]))&&flag)
        {
            flag=false;
        }
        row.reverse();
        board[r]=row;

        for(let c=0; c<cols; c++ )
        {
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
    if(!flag)
    {
        setTwo();
    }
}

function slideUp()
{
    let flag=true;
    for(c=0; c<cols; c++)
    {
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        let pv=row;
        row=slide(row);
        if(((pv[0]!=row[0])||(pv[1]!=row[1])||(pv[2]!=row[2])||(pv[3]!=row[3]))&&flag)
        {
            flag=false;
        }
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[3];
        // board[3][c]=row[4];

        for(let r=0; r<rows; r++ )
        {
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
    if(!flag)
    {
        setTwo();
    }
}

function slideDown()
{
    let flag=true;
    for(c=0; c<cols; c++)
    {
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        let pv=row;
        row=slide(row);
        if(((pv[0]!=row[0])||(pv[1]!=row[1])||(pv[2]!=row[2])||(pv[3]!=row[3]))&&flag)
        {
            flag=false;
        }
        row.reverse();
        // board[0][c]=row[0];
        // board[1][c]=row[1];
        // board[2][c]=row[3];
        // board[3][c]=row[4];

        for(let r=0; r<rows; r++ )
        {
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
    if(!flag)
    {
        setTwo();
    }
}
