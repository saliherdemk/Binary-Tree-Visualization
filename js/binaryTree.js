function Node(value,right,left){
    this.value = value;
    this.right = right;
    this.left = left;
}

function createTree(arr){


    for(var i = 1;i<arr.length;i++){
        recursive(arr[0],arr[i])
    }

    drawGraph(arr[0])



}

function recursive(root,node){

   if(node.value < root.value){
       if(root.left == null){
           root.left = node
       } else{
           recursive(root.left,node);
       } 
       
   } else if(node.value > root.value){
    if(root.right == null){
        root.right = node
    } else{
        recursive(root.right,node);
    }
}

          
}

function createNodes(list){
    new_list = [];

    for(var i = 0;i<list.length;i++){
        if(list[i] == ""){continue}
        new_list.push(new Node(list[i],null,null));

    }

    

    createTree(new_list)
}