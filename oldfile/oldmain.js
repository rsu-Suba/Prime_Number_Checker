var searchnum;
var searchcurrentnum;
var searchrem;
var nowsearchtext;
var nowdivisortext;
var spnum;
var isprivate;
var nowendlesstext;
var overhalf;
let start;
document.getElementById('form').onsubmit = function (event) {
        event.preventDefault();
        let inputForm = document.getElementById('form').usersnum.value;
        start = performance.now();
        searchnum = `${inputForm}`;
        spnum = '';
        var i = 0;
        search();
    }

    async function search(){
        overhalf = false;
        isprivate = false;
        document.getElementById("searchcalctext").innerHTML = ("[" + searchnum + "]\n");
        document.getElementById("divisortext").innerHTML = ("[" + searchnum + "]\n\n");
        for(i = 2;i <= searchnum;i++){
        nowsearchtext = document.getElementById("searchcalctext");
        nowdivisortext = document.getElementById("divisortext");
        if (isprivate == false){
            if (i %2 !== 0 || i == 2){
                if (searchnum / 2 < i){
                    overhalf = true;
                }
                else{
                    overhalf = false;
                }
                if (overhalf == false){
                searchrem = searchnum % i;
                if (searchrem == 0){
                    if (i == searchnum){
                        nowdivisortext.textContent = ("[" + searchnum + "]\n\n" + searchnum + " is Prime number.");
                        const end = performance.now();
                        divisortext.textContent += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
                    }
                    else if (i > searchnum || i < searchnum){
                        nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = O\n\n");
                        nowdivisortext.textContent = (nowdivisortext.innerHTML + i + "\n");
                        await sleep(250);
                        isprivate = true;
                        searchprivate(searchnum / i);
                    }
                    break;
                }
                else if (searchrem > 0){
                    nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = X\n");
                    await sleep(1);
                }
                }
                else if (overhalf == true){
                    if (searchnum > 2){
                        nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = X\n");
                    }
                    else if (searchnum <= 2){
                    }
                    nowdivisortext.textContent = ("[" + searchnum + "]\n\n" + searchnum + " is Prime number.");
                    const end = performance.now();
                    divisortext.textContent += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
                    break;
                }
            }
            else if (i % 2 == 0){
            }
        }
        else if (isprivate == true){
            break;
        }
        nowsearchtext.scrollTop = nowsearchtext.scrollHeight;
        nowdivisortext.scrollTop = nowdivisortext.scrollHeight;
    }
}

    async function searchprivate(spnum){
        document.getElementById('searchcalctext').textContent = (nowsearchtext.innerHTML + "\n[" + spnum + "]\n");
        for(i = 2;i <= spnum;i++){
        nowsearchtext = document.getElementById("searchcalctext");
        nowdivisortext = document.getElementById("divisortext");
            if (i % 2 !== 0 || i == 2){
                if (searchnum / 2 < i){
                    overhalf = true;
                }
                else{
                    overhalf = false;
                }
                if (overhalf == false){
                    searchrem = spnum % i;
                    if (searchrem == 0){
                        if (i == spnum){
                            nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = O\n");
                            nowdivisortext.textContent = (nowdivisortext.innerHTML + i);
                            isprivate = false;
                            const end = performance.now();
                            divisortext.textContent += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
                            await sleep(250);
                            break;
                        }
                        else if (i > spnum || i < spnum){
                            nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = O\n\n");
                            nowdivisortext.textContent = (nowdivisortext.innerHTML + i + "\n");
                            await sleep(250);
                            searchprivate(spnum / i);
                            break;
                        }
                    }
                    else if (searchrem > 0){
                        nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = X\n");
                        await sleep(1);
                    }
                }
                else if (overhalf == true){
                    if (searchnum > 2){
                        nowsearchtext.textContent = (nowsearchtext.innerHTML + i + " = X\n");
                    }
                    else if (searchnum <= 2){
                    }
                    nowdivisortext.textContent = ("[" + searchnum + "]\n\n" + searchnum + " is Prime number.");
                    const end = performance.now();
                    divisortext.textContent += `\nFinish (${(Math.round((end - start) * 100) / 100)}ms)`;
                    break;
                }
            }
            else if (i % 2 == 0){
            }
        nowsearchtext.scrollTop = nowsearchtext.scrollHeight;
        nowdivisortext.scrollTop = nowdivisortext.scrollHeight;
    }
}

    function sleep(time) {
  return new Promise( (resolve) => {
    setTimeout(resolve, time)
  })
}

var endsearchrem;
var nowendlesstext;
var x;
var islimit = true;
var isbeha = false;
var isdupl = false;

function endlessstart(){
    isbeha = true;
    if (isdupl == false){
    document.getElementById("endstartbtn").className = "clickbutton";
    document.getElementById("endstopbtn").className = "notclickbutton";
    document.getElementById("endlesstext").innerHTML = ("");
        if (islimit == true){
            endlessnowlimit();
        }
        else if (islimit == false){
            endlesswithoutlimit();
        }
    }
    else if (isdupl == true){
        return;
    }
}

async function endlessnowlimit(){
    isdupl = true;
    for(x = 2;x <= 100;x++){
        nowendlesstext = document.getElementById("endlesstext");
        if (isbeha == true){
            for(var y = 2;y <= x;y++){
                endsearchrem = x % y;
                if (endsearchrem == 0){
                    if (y == x){
                        nowendlesstext.textContent = (nowendlesstext.innerHTML + x + "\n");
                        await sleep(50);
                    }
                    else if (y > x || y < x){
                        break;
                    }
                }
                else if (endsearchrem > 0){
                }
            }
        }
        else if (isbeha == false){
            break;
        }
        nowendlesstext.scrollTop = nowendlesstext.scrollHeight;
    }
}

async function endlesswithoutlimit(){
    isdupl = true;
    for(x = 2;;x++){
        nowendlesstext = document.getElementById("endlesstext");
        if (isbeha == true){
            for(var y = 2;y <= x;y++){
                endsearchrem = x % y;
                if (endsearchrem == 0){
                    if (y == x){
                        nowendlesstext.textContent = (nowendlesstext.innerHTML + x + "\n");
                        await sleep(50);
                   }
                    else if (y > x || y < x){
                       break;
                   }
                }
                else if (endsearchrem > 0){
                }
            }
        }
        else if (isbeha == false){
           break;
        }
        nowendlesstext.scrollTop = nowendlesstext.scrollHeight;
    }
}

function endlessstop(){
    document.getElementById("endstartbtn").className = "notclickbutton";
    document.getElementById("endstopbtn").className = "clickbutton";
    isbeha = false;
    isdupl = false;
}

function endlesslimit(){
    if (islimit == true){
        document.getElementById("endlimitbtn").className = "limitclickbutton";
        islimit = false;
    }
    else if (islimit == false){
        document.getElementById("endlimitbtn").className = "notlimitclickbutton";
        islimit = true;
    }
}


function searchmode(){
    document.getElementById("searchbtn").className = "clickbutton";
    document.getElementById("endlessbtn").className = "notclickbutton";
    document.getElementById("endlesses").className = "endlesstools-search";
    document.getElementById("searches").className = "searchtools";
    document.getElementById("calcspace").className = "calcspace";
    document.getElementById("endlessspace").className = "endlessspace-search";
    document.getElementById("endstartbtn").className = "notclickbutton";
    document.getElementById("endstopbtn").className = "notclickbutton";
}
function endlessmode(){
    document.getElementById("searchbtn").className = "notclickbutton";
    document.getElementById("endlessbtn").className = "clickbutton";
    document.getElementById("endlesses").className = "endlesstools";
    document.getElementById("searches").className = "searchtools-endless";
    document.getElementById("calcspace").className = "calcspace-endless";
    document.getElementById("endlessspace").className = "endlessspace";
    document.getElementById("endstartbtn").className = "notclickbutton";
    document.getElementById("endstopbtn").className = "notclickbutton";
}