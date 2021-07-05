const output = document.getElementById("tree");

function binary(){
    const value = document.getElementById("inp").value;
    var arr = value.split(" ")
    var num = [];

    for(var i = 0; i < arr.length;i++){
        if(!isNaN(arr[i])){
            num.push(arr[i])
        }
    }

    createNodes(num);

}