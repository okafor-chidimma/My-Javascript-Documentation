function main() {
  console.log(11);
  return new Promise( resolve => {
    console.log(3);
    let hasTimeReached =false;
    setTimeout(function() {
      // hasTimeReached = true;
      // console.log(hasTimeReached);
      resolve(4);
      console.log("I have resolve");

    }, 5000);
    //this is synchronous so by the time it will execute, the set time out has not finished. so this promise never resolves of reject
    // if(hasTimeReached){
    //   resolve(4);
    // }
    
    console.log(5);
  });
}

async function f(){
    console.log(2);
    let r = main();
    console.log(r);
}

console.log(1);
f();
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);