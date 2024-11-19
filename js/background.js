const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#6673HB", "#F85F36"];
const numBalls = 30;
const balls = [];
const container = document.getElementsByClassName('background-balls')[0]; 

for (let i = 0; i <= numBalls; i++) {
   let ball = document.createElement("div");
   ball.classList.add('ball');
   ball.style.background = colors[Math.floor(Math.random() * colors.length)];
   ball.style.width = `${Math.random() + 0.5}em`;
   ball.style.height = ball.style.width;
   ball.style.position = "absolute"; 
   ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
   ball.style.top = `${Math.floor(Math.random() * 70)}vh`;
   
   balls.push(ball);
   container.appendChild(ball); 
}
balls.forEach((el, i, ra) => {
   let to = {
      x: Math.random() * (i % 2 === 0 ? -11 : 11),
      y: Math.random() * 12
   }


   let anim = el.animate(
      [
         { transform: "translate(0,0)" },
         { transform: `translate(${to.x}rem, ${to.y}rem)` }
      ],
      {
         duration: (Math.random() + 1) * 1500,
         iterations: Infinity,
         fill: "both",
         direction: "alternate",
         easing: "ease-in-out"
      }
   )
});



