 let blocksProperties = {};
 let filtersMap = 
 {
    '2' : 'EventID',
    '4' : 'LogonType', 
    '5' : 'SubjectUserSid', 
    '6' : 'SubjectUserName',
    '7' : 'SubjectLogonId', 
    '8' : 'SubjectDomainName', 
    '9' : 'TargetUserSid', 
    '10' : 'TargetUserName', 
    '11' : 'TargetLogonId', 
    '12' : 'TargetDomainName',
    '13' : 'Computer'
 }

document.addEventListener("DOMContentLoaded", function(){
    var rightcard = false;
    var tempblock;
    var tempblock2;
    document.getElementById("blocklist").innerHTML = '<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="1"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="static/app_see/images/assets/log-event.png" style="width:26px; height:26px;"></div><div class="blocktext">                        <p class="blocktitle">Event</p><p class="blockdesc">Event to which apply filters</p>       </div></div></div>';
    flowy(document.getElementById("canvas"), drag, release, snapping);
    function addEventListenerMulti(type, listener, capture, selector) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener(type, listener, capture);
        }
    }
    function snapping(drag, first) {
        var grab = drag.querySelector(".grabme");
        grab.parentNode.removeChild(grab);
        var blockin = drag.querySelector(".blockin");
        blockin.parentNode.removeChild(blockin);
        if (drag.querySelector(".blockelemtype").value == "1") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/log-event-blue.png' style='width:23px; height:23px;'><p class='blockyname'>Event</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'><span>Security Event</span> to which apply filters</div>";
        } else if (drag.querySelector(".blockelemtype").value == "2") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Event ID</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "4") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Logon Type</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "5") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Subject User SID</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "6") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Subject Username</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "7") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Subject Logon ID</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "8") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Subject Domain Name</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "9") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Target User SID</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "10") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Target User Name</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "11") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Target Logon ID</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "12") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Target Domain Name</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "13") {
            drag.innerHTML += "<div class='blockyleft'><img src='static/app_see/images/assets/filter-blue.png'' style='width:23px; height:23px;'><p class='blockyname'>Filter</p></div><div class='blockyright'><img src='static/app_see/images/assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Filter the <span>Target Computer Name</span></div>";
        }
        addBlockProperty(drag.querySelector(".blockelemtype").value, drag.querySelector(".blockid").value);
        return true;
    }
    function drag(block) {
        block.classList.add("blockdisabled");
        tempblock2 = block;
    }
    function release() {
        if (tempblock2) {
            tempblock2.classList.remove("blockdisabled");
        }
    }
    function closePropertiesSidebar()
    {
        if (rightcard) {
            rightcard = false;
            document.getElementById("properties").classList.remove("expanded");
            setTimeout(function(){
                    document.getElementById("propwrap").classList.remove("itson"); 
            }, 300);
            tempblock.classList.remove("selectedblock");
        } 
    }
    var disabledClick = function(){
        document.querySelector(".navactive").classList.add("navdisabled");
        document.querySelector(".navactive").classList.remove("navactive");
        this.classList.add("navactive");
        this.classList.remove("navdisabled");
        if (this.getAttribute("id") == "events") {
            document.getElementById("blocklist").innerHTML = '<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="1"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/log-event.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Event</p><p class="blockdesc">Event to which apply filters</p></div></div></div>';
        } else if (this.getAttribute("id") == "filters") {
            document.getElementById("blocklist").innerHTML = `<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="2"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Event ID</p><p class="blockdesc">Apply Event ID filter</p></div></div></div>                                                            
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="4"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Logon Type</p><p class="blockdesc">Apply Logon Type filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="5"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Subject User SID</p><p class="blockdesc">Apply Subject User SID filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="6"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Subject Username</p><p class="blockdesc">Apply Subject Username filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="7"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Subject Logon ID</p><p class="blockdesc">Apply Subject Logon ID filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="8"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Subject Domain Name</p><p class="blockdesc">Apply Subject Domain Name filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="9"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Target User SID</p><p class="blockdesc">Apply Target User SID filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="10"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Target User Name</p><p class="blockdesc">Apply Target User Namefilter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="11"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Target Logon ID</p><p class="blockdesc">Apply Target Logon ID filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="12"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Target Domain Name</p><p class="blockdesc">Apply Target Domain Name filter</p></div></div></div>
                                                            <div class="blockelem create-flowy noselect" style="padding-bottom:30px"><input type="hidden" name="blockelemtype" class="blockelemtype" value="13"><div class="grabme"><img src="static/app_see/images/assets/grabme.svg"></div><div class="blockin"><div class="blockico"><span></span><img src="static/app_see/images/assets/filter.png" style="width:26px; height:26px;"></div><div class="blocktext"><p class="blocktitle">Computer Name</p><p class="blockdesc">Apply Computer Name filter</p></div></div></div>`;
        }
    }
    addEventListenerMulti("click", disabledClick, false, ".side");
    document.getElementById("close").addEventListener("click", closePropertiesSidebar);
    document.getElementById("canvas").addEventListener('click', closePropertiesSidebar());
    
    document.getElementById("removeblock").addEventListener("click", function(){
        flowy.deleteBlocks();
        blocksProperties = {};
        if (window.self !== window.top) { parent.blocksProperties = {}; }
    });
    var aclick = false;
    var noinfo = false;
    var beginTouch = function (event) {
        aclick = true;
        noinfo = false;
        if (event.target.closest(".create-flowy")) {
            noinfo = true;
        }
}
var checkTouch = function (event) {
    aclick = false;
}
var doneTouch = function (event) {
    if (event.type === "mouseup" && aclick && !noinfo) {
    if (!rightcard && event.target.closest(".block") && !event.target.closest(".block").classList.contains("dragging")) {
            tempblock = event.target.closest(".block");
            rightcard = true;
            document.getElementById("properties").classList.add("expanded");
            document.getElementById("propwrap").classList.add("itson");
            loadPropertiesForBlock(event.target.closest(".block").childNodes[1].value);
            tempblock.classList.add("selectedblock");
    } 
    }
}
addEventListener("mousedown", beginTouch, false);
addEventListener("mousemove", checkTouch, false);
addEventListener("mouseup", doneTouch, false);
addEventListenerMulti("touchstart", beginTouch, false, ".block");
});

/**
 * @param blockId Id of the block. Allows to discriminate events and filters
 * @param blockNum Incremental Id assigned to the block. Represents the count of blocks inserted from the beginning
 */
function addBlockProperty(blockId, blockNum)
{
    function isEventBlock()
    {
        return blockId === '1';
    }

    if (isEventBlock())
    {
        blocksProperties[blockNum] = {'type' : 'Event', 'Filter Logic' : '', 'Time Delta' : '1', 'Filters' : [], 'Next Event' : ''} // Filter Logic = AND | OR
        if (window.self !== window.top) { parent.blocksProperties[blockNum] = {'type' : 'Event', 'Filter Logic' : '', 'Time Delta' : '1', 'Filters' : [], 'Next Event' : ''} }// Filter Logic = AND | OR
    }
    else // is filter
    {
        blocksProperties[blockNum] = {'type' : 'Filter', 'Filter Condition' : '', 'Filter Value' : '', 'Filter Field' : filtersMap[blockId]} // FIlter condition: Equal to | Different From | Substring Search (research case insensitive)
        if (window.self !== window.top) { parent.blocksProperties[blockNum] = {'type' : 'Filter', 'Filter Condition' : '', 'Filter Value' : '', 'Filter Field' : filtersMap[blockId] } } // FIlter condition: Equal to | Different From | Substring Search (research case insensitive)
    }

}


// Loads the properties tab for the specified block_id
function loadPropertiesForBlock(blockNum)
{
    function getEventHtml()
    {
        return `
        <p class="inputlabel">Select Event Filter Logic</p>
        <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="filter-logic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="width: 90%; margin-bottom: 10px;">
                ${blocksProperties[blockNum]['Filter Logic']}
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="#" onclick="setFilterLogic('AND', ${blockNum})">AND</a></li>
                <li><a href="#" onclick="setFilterLogic('OR', ${blockNum})">OR</a></li>
            </ul>
        </div>
        <p class="inputlabel">Select Time Span for Next Event</p>
        <div class="input-group" style="width : 90%;">
            <input type="text" id="event-time-delta" class="form-control" placeholder="${blocksProperties[blockNum]['Time Delta']} seconds" aria-describedby="basic-addon2">
            <div class="input-group-btn"> <button type="button" class="btn btn-default" onclick="setTimeDelta(${blockNum})">Set</button></div>
        </div>
        `
    }

    function getFilterHtml()
    {
        return `
        <p class="inputlabel">Select Filter Condition</p>
        <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="filter-condition" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="width: 90%; margin-bottom: 10px;">
                    ${blocksProperties[blockNum]['Filter Condition']}
                    <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="#" onclick="setFilterCondition('Equal', ${blockNum})">Equal To</a></li>
                <li><a href="#" onclick="setFilterCondition('Different', ${blockNum})">Different From</a></li>
                <li><a href="#" onclick="setFilterCondition('Contains', ${blockNum})">Contains</a></li>
            </ul>
        </div>
        <p class="inputlabel">Insert Filter Value</p>
        <div class="input-group" style="width : 90%;">
            <input type="text" id="filter-value" title="Separate multiple values with a comma" class="form-control" placeholder="${blocksProperties[blockNum]['Filter Value']}" aria-describedby="basic-addon2">
            <div class="input-group-btn"> <button type="button" class="btn btn-default" onclick="setFilterValue(${blockNum})">Set</button></div>
        </div>
        `
    }

    let HTMLBlock = '';
    if (blocksProperties[blockNum]['type'] === 'Event')
    {
        HTMLBlock = getEventHtml();
    }
    else
    {
        HTMLBlock = getFilterHtml();
    }
    document.getElementById("proplist").innerHTML = HTMLBlock;
}

function setFilterLogic(logic, blockNum)
{
    blocksProperties[blockNum]['Filter Logic'] = logic;
    if (window.self !== window.top) { parent.blocksProperties[blockNum]['Filter Logic'] = logic; }
    document.getElementById("filter-logic").innerHTML = logic;    
}

function setTimeDelta(blockNum)
{
    let tdelta = parseFloat(document.querySelector('#event-time-delta').value);
    if (isNaN(tdelta))
    {
        alert("Invalid Time delta provided. Please specify a number");
    }
    else
    {
        blocksProperties[blockNum]['Time Delta'] = tdelta;
        if (window.self !== window.top) { parent.blocksProperties[blockNum]['Time Delta'] = tdelta; }
    }
}

function setFilterCondition(condition, blockNum)
{
    blocksProperties[blockNum]['Filter Condition'] = condition;
    if (window.self !== window.top) { parent.blocksProperties[blockNum]['Filter Condition'] = condition; }
    document.getElementById("filter-condition").innerHTML = condition;
}

function setFilterValue(blockNum)
{
    blocksProperties[blockNum]['Filter Value'] = document.querySelector('#filter-value').value;
    if (window.self !== window.top) { parent.blocksProperties[blockNum]['Filter Value'] = document.querySelector('#filter-value').value; }
}

//TODO: rimuovi?
function removeBlock(blockNum)
{
    function removeSelectionFromButton()
    {
        if (blockNum != 0) {
            document.querySelector(".arrowid[value='" + blockNum + "']").parentNode.remove();
        }
        document.getElementById('canvas').appendChild(document.querySelector(".indicator"));
        const drag = document.querySelector(".blockid[value='" + blockNum + "']").parentNode;
        drag.parentNode.removeChild(drag);
    }
    removeSelectionFromButton();
    removeBlockProperty(parseInt(blockNum));
}

// Removes the block property with given ID. To be called when the corresponding block is removed
function removeBlockProperty(bid)
{
    if (blocksProperties[bid]['type'] === "Filter")
    {
        removeFilterBlockAndUpdateEvent(bid);
    }
    else if (blocksProperties[bid]['type'] === "Event")
    {
        removeEventBlockAndChildren(bid);
    }
    draggingBlockId = "";    
}

function removeEventBlockAndChildren(bid)
{
    if (blocksProperties[bid]["Next Event"] !== "")
    {
        removeEventBlockAndChildren(blocksProperties[bid]["Next Event"]);
    }
    const filters = blocksProperties[bid]['Filters'];
    filters.forEach(index => {delete blocksProperties[index]})
    delete blocksProperties[bid];
    let eventBlock = blocksProperties[0];		
    while (eventBlock["Next Event"] !== bid)
    {
        eventBlock = blocksProperties[eventBlock["Next Event"]];        
    }
    eventBlock["Next Event"] = "";

    if (window.self !== window.top) {
        filters.forEach(index => {delete parent.blocksProperties[index]})
        delete parent.blocksProperties[bid];
        let eventBlock = parent.blocksProperties[0];		
        while (eventBlock["Next Event"] !== bid && eventBlock["Next Event"] !== "")
        {
            eventBlock = parent.blocksProperties[eventBlock["Next Event"]];        
        }
        eventBlock["Next Event"] = "";
    }
}

function removeFilterBlockAndUpdateEvent(bid) //TODO: CHECK
{
    let eventBlock = blocksProperties[0];
    let found = false;
    let parentIndex = 0;
    while (!found)
    {
        found = eventBlock['Filters'].includes(bid);
        if (found)
        {
            const findex = eventBlock['Filters'].indexOf(bid);
            eventBlock['Filters'].splice(findex, 1);
        }
        else
        {
            eventBlock = blocksProperties[eventBlock["Next Event"]];
            parentIndex = eventBlock["Next Event"];
        }        
    }
    delete blocksProperties[bid];
    if (window.self !== window.top) 
    { 
        const pfindex = parent.blocksProperties[parentIndex]['Filters'].indexOf(bid);
        parent.blocksProperties[parentIndex]['Filters'].splice(pfindex, 1);
        delete parent.blocksProperties[bid];
    }
}

function blockInCanvas(element)
        {
            let upLevels = 0;
            while (!element.classList.contains('blockelem') && upLevels <= 2)
            {
                element = element.parentElement;
                upLevels ++;
            }
            if (upLevels <= 2)
            {
                return true;
            } 
            return false;
        }

function getBlockId(element)
{
    while (!element.classList.contains('blockelem'))
    {
        element = element.parentElement;
    }
    return element.querySelector('.blockid').value;
}
/* proplist:
<!--p class="inputlabel">Select database</p>
        <div class="dropme">Database 1 <img src="static/app_see/images/assets/dropdown.svg"></div>
        <p class="inputlabel">Check properties</p>
        <div class="dropme">All<img src="static/app_see/images/assets/dropdown.svg"></div>
        <div class="checkus"><img src="static/app_see/images/assets/checkon.svg"><p>Log on successful performance</p></div>
        <div class="checkus"><img src="static/app_see/images/assets/checkoff.svg"><p>Give priority to this block</p></div-->
*/ 