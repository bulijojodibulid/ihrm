let i = 0
for(i = 0; i < 10; i++) {  
    (function (i){
        setTimeout(()=>{
            console.log(i)
        })
    })(i) 
}