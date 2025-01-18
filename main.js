let searchnum = 0;
let setnum = 0;
let start;
let procdiv = false;
let cachei = 0;
let count = 1;
const searchtext = document.getElementById("searchcalctext");
const divisortext = document.getElementById("divisortext");

document.getElementById('form').onsubmit = function (event) {
    event.preventDefault();
    const inputForm = document.getElementById("form").usersnum.value;
    start = performance.now();
    setnum = inputForm;
    if (procdiv == false){
        searchtext.textContent = ``;
        divisortext.textContent = `[${inputForm}]\n`;
        cachei = 0;
        count = 1;
        procdiv = true;
        divide(inputForm);
    }
}

async function divide(searchnum){
    searchtext.textContent += `[${searchnum}]\n`
    for(let i = 2;;i++){
        if ((i > 2 && i % 2 == 0) ||
            (i > 3 && i % 3 == 0) ||
            (i > 5 && i % 5 == 0) ||
            (i > 7 && i % 7 == 0)){
            continue;
        }
        if (i > Math.sqrt(searchnum)){
            if (searchnum == setnum){
                divisortext.textContent += `\n${setnum}は素数\n`;
            }
            if (i != searchnum){
                searchtext.textContent += `\n${i} = X`;
            }
            searchtext.textContent += `\n${searchnum} = O`;
            if (cachei == searchnum){
                count++;
                divisortext.textContent += `^${count}\n`;
            }
            else if (searchnum != setnum){
                if (count > 1){
                    divisortext.textContent += `^${count}`;
                }
                divisortext.textContent += `\n${searchnum}\n`;
            }
            procdiv = false;
            document.getElementById("endlessarea").classname = "endlessarea";
            const end = performance.now();
            divisortext.textContent += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
            break;
        }
        if (searchnum % i == 0){
            searchtext.textContent += `\n${i} = O\n\n`;
            if (cachei == i){
                count++;
            }
            else{
                if (count > 1){
                    divisortext.textContent += `^${count}`;
                }
                cachei = i;
                count = 1;
                divisortext.textContent += `\n${i}`;
            }
            await sleep(1);
            divide(searchnum / i);
            break;
        }
        else{
            searchtext.textContent += `\n${i} = X`;
            if (i < 100 || i % 100 == 1){
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
let endproc = false;
let n;
let m;
let min;
let max;
let cachemin;
let cachemax;
const endlessmin = document.getElementById("endlessmin");
const endlessmax = document.getElementById("endlessmax");
const endlesstext = document.getElementById("endlesstext");
let endlesstextcache = ``;

async function endlessstart(){
    if (proc == false){
        document.getElementById("endstartbtn").className = "clickbutton";
        document.getElementById("endstopbtn").className = "notclickbutton";
        document.getElementById("endlesstext").innerHTML = ("");
        if (limit == true){
            min = 2;
            proc = true;
            endlesstextcache = ``;
            endlessdivide(0);
        }
        else if (limit == false){
            if ((Number(endlessmin.value) > Number(endlessmax.value)) && endlessmax.value != ''){
                endlesstext.textContent = `最大値は最小値以上を入力してください`;
                document.getElementById("endstartbtn").className = "notclickbutton";
                return;
            }
            min = n;
            if (endproc == false){
                if (endlessmin.value != ""){
                    min = endlessmin.value;
                }
                else if (endlessmin.value == ""){
                    min = 2;
                }
                if (endlessmax.value != ""){
                    max = endlessmax.value;
                }
            }
            if ((endlessmin.value != cachemin || endlessmax.value != cachemax) && endproc == true){
                endlesstextcache = ``;
                min = endlessmin.value;
                max = endlessmax.value;
            }
            endlesstext.textContent = endlesstextcache;
            proc = true;
            endproc = true;
            endlessdivide(1);
        }
    }
    else{
        return;
    }
}

async function endlessdivide(mode){
    if (mode == 1){
        cachemin = endlessmin.value;
        cachemax = endlessmax.value;
    }
    for (n = min;;n++){
        if ((mode == 0 && n == 100) || (mode == 1 && n == Number(max) + 1)){
            document.getElementById("endstartbtn").className = "notclickbutton";
            proc = false;
            endproc = false;
            data = 0;
            endlesstextcache = ``;
            break;
        }
        if (n == 1){
            continue;
        }
        if (n == 2 || n == 3){
            endlesstext.textContent += `${n}\n`;
            await sleep(25);
            continue;
        }
        for (m = 2;;m++){
            if (m > Math.sqrt(n)){
                if (n != 1){
                    endlesstext.textContent += `${n}\n`;
                }
                await sleep(25);
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
        if (endproc == true){
            endlesstextcache = endlesstext.textContent;
        }
        document.getElementById("endstopbtn").className = "clickbutton";
    }
}

function endlesslimit(){
    if (proc == false){
        switch(limit){
            case true:
                limit = false;
                document.getElementById("endlimitbtn").className = "limitclickbutton";
                document.getElementById("endlessopt").className = "endlessopt-on";
                document.getElementById("endlessarea").className = "endlessarea-on";
                document.getElementById("endlessexpbtn").className = "endlessexpbtn-on";
                break;
            case false:
                limit = true;
                document.getElementById("endlimitbtn").className = "notlimitclickbutton";
                document.getElementById("endlessopt").className = "endlessopt";
                document.getElementById("endlessarea").className = "endlessarea";
                document.getElementById("endlessexpbtn").className = "endlessexpbtn";
                break;
        }
    }
}

async function endlessexp(){
    if (endlesstext.textContent == '' || endlesstext.textContent == '最大値は最小値以上を入力してください' || limit == true){
        return;
    }
    document.getElementById("endlessexpbtn").className = "endlessexpbtn-on-click";
    const expblob = new Blob([endlesstext.textContent], {type:"text/plain"});
    const explink = document.createElement('a');
    explink.href = URL.createObjectURL(expblob);
    var date = new Date();
    let month = date.getMonth();
    var datetext = `${('0'+(month++)).slice(-2)}-${('0'+date.getDate()).slice(-2)}-${('0'+date.getFullYear()).slice(-2)}-${('0'+date.getHours()).slice(-2)}-${('0'+date.getMinutes()).slice(-2)}-${('0'+date.getSeconds()).slice(-2)}`
    let expminname = cachemin;
    let expmaxname = cachemax;
    if (cachemin == ''){
        expminname = '2';
    }
    if (cachemax == ''){
        expmaxname = 'endless';
    }
    explink.download = `Prime nums ${expminname} to ${expmaxname}  ${datetext}`;
    explink.click();
    await sleep(75);
    document.getElementById("endlessexpbtn").className = "endlessexpbtn-on";
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