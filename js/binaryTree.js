function Node(value,right,left,parent = "",children = []){
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
    this.children = children;

}


function createTree(arr){


    for(var i = 1;i<arr.length;i++){
        recursive(arr[0],arr[i])
    }

    createData(arr[0]);
    drawGraph(arr);



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

function createData(node){

    if(node == null){return}

    if(node.right){
        node.children.push(node.right);
        node.right.parent = node;
    }

    if(node.left){
        node.children.push(node.left);
        node.left.parent = node;

    }


    createData(node.left);
    createData(node.right);

}

function createNodes(list){
    new_list = [];

    for(var i = 0;i<list.length;i++){
        if(list[i] == ""){continue}
        new_list.push(new Node(list[i],null,null));

    }

    

    createTree(new_list)
}