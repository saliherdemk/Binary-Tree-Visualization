const output = document.getElementById("tree");

function getInput() {
    const value = document.getElementById("inp").value;
    var arr = value.split(" ")
    var num = [];

    for (var i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i]) && arr[i] != "\n") {
            num.push(arr[i])
        }
    }
    return num
}

function action() {
    getRoot()
    const el = document.querySelector('#tree');
    el.onwheel = zoom;

}

function getRoot() {
    var result = getInput()

    var root = createNodes(result);
    return root
}

var tree = document.getElementById("tree");
var starty, startx, scrleft, scrtop, isdown;

//https://codepen.io/Gutto/pen/GBLPyN
tree.addEventListener('mousedown', e => MouseDown(e));
tree.addEventListener('mouseup', e => mouseUp(e))
tree.addEventListener('mouseleave', e => mouseLeave(e));
tree.addEventListener('mousemove', e => mouseMove(e));

function MouseDown(e) {
    isdown = true;
    startx = e.pageX - tree.offsetLeft;
    starty = e.pageY - tree.offsetTop;
    scrleft = tree.scrollLeft;
    scrtop = tree.scrollTop;
}

function mouseUp(e) {
    isdown = false;
}

function mouseLeave(e) {
    isdown = false;
}

function mouseMove(e) {
    if (isdown) {
        e.preventDefault();

        var y = e.pageY - tree.offsetTop;
        var goY = y - starty;
        tree.scrollTop = scrtop - goY;

        var x = e.pageX - tree.offsetLeft;
        var goX = x - startx;
        tree.scrollLeft = scrleft - goX;
    }
}
let scale = 1;

//https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
function zoom(event) {
    const el = document.querySelector('svg');

    event.preventDefault();

    scale += event.deltaY * -0.001;

    // Restrict scale
    scale = Math.min(Math.max(.250, scale), 1);

    // Apply scale transform
    el.style.transform = `scale(${scale})`;
}

function clear(el) {
    var allContainers = document.querySelectorAll(".numContainer")
    var inp = document.getElementById("inp")

    inp.value += ''

    allContainers.forEach(item => {
        if (item != el) {
            item.style.transform = "scale(0.9)"
            item.style.opacity = 0.7
        } else {
            item.style.transform = "scale(1.1)"
            item.style.opacity = 1
        }

    })
}

function toggleLock() {
    var btn = document.querySelector(".btn")
    var inp = document.getElementById("inp")
    var btn_click = document.querySelector(".btn-clear")
    let cont = document.querySelector(".findContainer")


    if (btn.innerHTML == "Lock") {
        btn.innerHTML = "Unlock"
        clearAndCreate()


    } else {
        cont.innerHTML = ''
        inp.style.display = "block"
        btn_click.style.display = "none"
        btn.innerHTML = "Lock"

        var circles = document.querySelectorAll(".node");

        circles.forEach((circle, i) => {
            setTimeout(() => {
                circle.firstChild.classList.remove("green")
                circle.firstChild.classList.remove("gold")
                circle.firstChild.classList.remove("gray")


            }, i * 100)
        })
    }
}

function clearAndCreate() {
    var inp = document.getElementById("inp")
    var btn_click = document.querySelector(".btn-clear")
    let cont = document.querySelector(".findContainer")
    document.querySelector(".findContainer").innerHTML = ''

    var result = getInput()
    result = result.filter(item => item !== '')

    result = [...new Set(result)]

    if (result.length > 0) {
        inp.style.display = "none"
        btn_click.style.display = "block"

    }

    result.forEach((circle) => {
        var root = getRoot()[0]
        let el = document.createElement("button");
        el.classList.add("numContainer");
        el.innerHTML = circle
        el.style.transition = "1s"
        el.onclick = function () {
            clear(el)
            findTheNode(root, el)
        }
        cont.appendChild(el)
    })
}

function findTheNode(root, node) {
    var value = parseFloat(node.innerHTML)

    fillToColor(root.value, root.value == value ? "green" : "gold")

    if (root.value == value) return

    if (root.value > value) {
        findTheNode(root.left, node)
        fillTheCircle(root.right, value)

    } else {
        findTheNode(root.right, node)
        fillTheCircle(root.left, value)

    }
}

function fillTheCircle(root, value) {

    if (root == null || root.value == value) return
    fillToColor(root.value, "gray")

    fillTheCircle(root.left)
    fillTheCircle(root.right)

}

function fillToColor(value, color) {
    var circles = document.querySelectorAll(".node");

    circles.forEach((circle, i) => {
        circle.firstChild.classList.remove("green")
        circle.firstChild.classList.remove("gold")
        circle.firstChild.classList.remove("gray")
        if (circle.lastChild.innerHTML === value) {

            setTimeout(() => {
                circle.firstChild.classList.add(color)
            }, i * 100)

        }
    })
}
