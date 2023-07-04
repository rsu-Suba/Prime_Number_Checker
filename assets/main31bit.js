let searchnum = 0;
let setnum = 0;
let start;
const searchtext = document.getElementById("searchcalctext");
const divisortext = document.getElementById("divisortext");

document.getElementById('form').onsubmit = function (event) {
    event.preventDefault();
    const inputForm = document.getElementById("form").usersnum.value;
    start = performance.now();
    setnum = inputForm;
    searchtext.textContent = ``;
    divisortext.textContent = `[${inputForm}]\n\n`;
    divide(inputForm,0);
}

async function divide(searchnum){
    searchtext.textContent += `[${searchnum}]\n`
    for(let i = 2;;i++){
        if (i > 2 && i % 2 == 0){
            continue;
        }
        if (i > Math.sqrt(searchnum)){
            if (searchnum == 3){
                searchtext.textContent += `\n2 = X`;
            }
            if (searchnum == setnum){
                divisortext.textContent += `${setnum}は素数\n`;
            }
            else{
                divisortext.textContent += `${searchnum}\n`;
            }
            searchtext.textContent += `\n${searchnum} = O`;
            const end = performance.now();
            divisortext.textContent += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
            break;
        }
        if (searchnum % i == 0){
            searchtext.textContent += `\n${i} = O\n\n`;
            divisortext.textContent += `${i}\n`;
            await sleep(150);
            divide(searchnum / i);
            break;
        }
        else{
            searchtext.textContent += `\n${i} = X`;
            if (i < 100 || i % 40 == 1){
                await sleep(1);
            }
        }
        searchtext.scrollTop = searchtext.scrollHeight;
        divisortext.scrollTop = divisortext.scrollHeight;
    }
    searchtext.scrollTop = searchtext.scrollHeight;
    divisortext.scrollTop = divisortext.scrollHeight;
}

function sleep(time) {
  return new Promise( (resolve) => {
    setTimeout(resolve, time)
  })
}



let limit = true;
let proc = false;
let n = 2;
let m;
const endlesstext = document.getElementById("endlesstext");
let endlesstextcache = ``;

async function endlessstart(){
    if (proc == false){
        document.getElementById("endstartbtn").className = "clickbutton";
        document.getElementById("endstopbtn").className = "notclickbutton";
        document.getElementById("endlesstext").innerHTML = ("");
        if (limit == true){
            n = 2;
            m = 2;
            proc = true;
            endlesstextcache = ``;
            endlessdivide(0);
        }
        else if (limit == false){
            endlesstext.textContent = endlesstextcache;
            proc = true;
            endlessdivide(1);
        }
    }
    else{
        return;
    }
}

async function endlessdivide(mode){
    for (n;;n++){
        if (mode == 0 && n == 100){
            document.getElementById("endstartbtn").className = "notclickbutton";
            n = 2;
            m = 2;
            proc = false;
            data = 0;
            break;
        }
        if (n == 2 || n == 3){
            endlesstext.textContent += `${n}\n`;
            await sleep(50);
            continue;
        }
        for (m = 2;;m++){
            if (m > Math.sqrt(n)){
                endlesstext.textContent += `${n}\n`;
                await sleep(50);
                break;
            }
            if (m > 2 && m % 2 == 0){
                continue;
            }
            if (n % m == 0){
                break;
            }
        }
        if (proc == false){
            document.getElementById("endstartbtn").className = "notclickbutton";
            n++;
            break;
        }
        endlesstext.scrollTop = endlesstext.scrollHeight;
    }
}

function endlessstop(){
    if (limit == false){
        proc = false;
        endlesstextcache = endlesstext.textContent;
        document.getElementById("endstopbtn").className = "clickbutton";
    }
}

function endlesslimit(){
    if (proc == false){
        switch(limit){
            case true:
                limit = false;
                document.getElementById("endlimitbtn").className = "limitclickbutton";
                break;
            case false:
                limit = true;
                document.getElementById("endlimitbtn").className = "notlimitclickbutton";
                break;
        }
    }
}

let data = 0;

function searchmode(){
    if (proc == true && limit == false){
        data = 1;
        proc = false;
        endlesstextcache = endlesstext.textContent;
    }
    if (data == 0 || data == 1 || data == 2){
        document.getElementById("endstopbtn").className = "notclickbutton";
        document.getElementById("searches").className = "searchtools";
        document.getElementById("calcspace").className = "calcspace";
        document.getElementById("searchbtn").className = "clickbutton";
        document.getElementById("endlesses").className = "endlesstools-search";
        document.getElementById("endlessbtn").className = "notclickbutton";
        document.getElementById("endstartbtn").className = "notclickbutton";
        document.getElementById("endlessspace").className = "endlessspace-search";
    }
}
function endlessmode(){
    if (proc == true && limit == true){
        data = 2;
    }
    document.getElementById("searches").className = "searchtools-endless";
    document.getElementById("searchbtn").className = "notclickbutton";
    document.getElementById("endlesses").className = "endlesstools";
    document.getElementById("calcspace").className = "calcspace-endless";
    document.getElementById("endlessbtn").className = "clickbutton";
    if (data == 0){
        document.getElementById("endstopbtn").className = "notclickbutton";
        document.getElementById("endstartbtn").className = "notclickbutton";
        document.getElementById("endlessspace").className = "endlessspace";
    }
    else if (data == 1){
        document.getElementById("endstopbtn").className = "clickbutton";
        document.getElementById("endstartbtn").className = "notclickbutton";
        document.getElementById("endlessspace").className = "endlessspace";
    }
    else if (data == 2){
        document.getElementById("endstopbtn").className = "notclickbutton";
        document.getElementById("endstartbtn").className = "clickbutton";
        document.getElementById("endlessspace").className = "endlessspace";
    }
}