var draggingBlockId = '';
var draggingBlockX = '';
var draggingBlockY = '';

var flowy = function(canvas, grab, release, snapping, rearrange, spacing_x, spacing_y) {
    if (!grab) {
        grab = function() {};
    }
    if (!release) {
        release = function() {};
    }
    if (!snapping) {
        snapping = function() {
            return true;
        }
    }
    if (!rearrange) {
        rearrange = function() {
            return false;
        }
    }
    if (!spacing_x) {
        spacing_x = 20;
    }
    if (!spacing_y) {
        spacing_y = 80;
    }
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
    var loaded = false;
    flowy.load = function() {
        if (!loaded)
            loaded = true;
        else
            return;
        var blocks = [];
        var blockstemp = [];
        var canvas_div = canvas;
        var absx = 0;
        var absy = 0;
        if (window.getComputedStyle(canvas_div).position == "absolute" || window.getComputedStyle(canvas_div).position == "fixed") {
            absx = canvas_div.getBoundingClientRect().left;
            absy = canvas_div.getBoundingClientRect().top;
        }
        var active = false;
        var paddingx = spacing_x;
        var paddingy = spacing_y;
        var offsetleft = 0;
        var rearrange = false;
        var drag, dragx, dragy, original;
        var mouse_x, mouse_y;
        var dragblock = false;
        var prevblock = 0;
        var el = document.createElement("DIV");
        el.classList.add('indicator');
        el.classList.add('invisible');
        canvas_div.appendChild(el);
        flowy.deleteBlocks = function() {
            blocks = [];
            canvas_div.innerHTML = "<div class='indicator invisible'></div>";
            draggingBlockId = '';
        }        

        flowy.beginDrag = function(event) {     
            if (blockInCanvas(event.target)) // not a block definition on the left side
            {
                draggingBlockId = getBlockId(event.target);  
                draggingBlockX = event.clientX;     
                draggingBlockY = event.clientY; 
            }      
            else
            {
                draggingBlockId = "";
            }            
            if (window.getComputedStyle(canvas_div).position == "absolute" || window.getComputedStyle(canvas_div).position == "fixed") {
                absx = canvas_div.getBoundingClientRect().left;
                absy = canvas_div.getBoundingClientRect().top;
            }
            if (event.targetTouches) {
                mouse_x = event.changedTouches[0].clientX;
                mouse_y = event.changedTouches[0].clientY;
            } else {
                mouse_x = event.clientX;
                mouse_y = event.clientY;
            }
            if (event.which != 3 && event.target.closest(".create-flowy")) {
                original = event.target.closest(".create-flowy");
                var newNode = event.target.closest(".create-flowy").cloneNode(true);
                event.target.closest(".create-flowy").classList.add("dragnow");
                newNode.classList.add("block");
                newNode.classList.remove("create-flowy");
                if (blocks.length === 0) {
                    newNode.innerHTML += "<input type='hidden' name='blockid' class='blockid' value='" + blocks.length + "'>";
                    document.body.appendChild(newNode);
                    drag = document.querySelector(".blockid[value='" + blocks.length + "']").parentNode;
                } else {
                    newNode.innerHTML += "<input type='hidden' name='blockid' class='blockid' value='" + (Math.max.apply(Math, blocks.map(a => a.id)) + 1) + "'>";
                    document.body.appendChild(newNode);
                    drag = document.querySelector(".blockid[value='" + (parseInt(Math.max.apply(Math, blocks.map(a => a.id))) + 1) + "']").parentNode;
                }
                blockGrabbed(event.target.closest(".create-flowy"));
                drag.classList.add("dragging");
                active = true;
                dragx = mouse_x - (event.target.closest(".create-flowy").getBoundingClientRect().left);
                dragy = mouse_y - (event.target.closest(".create-flowy").getBoundingClientRect().top);
                drag.style.left = mouse_x - dragx + "px";
                drag.style.top = mouse_y - dragy + "px";                
            }
        }

        flowy.endDrag = function(event) {
            if (event.which != 3 && (active || rearrange)) {
                dragblock = false;
                blockReleased();
                if (!document.querySelector(".indicator").classList.contains("invisible")) {
                    document.querySelector(".indicator").classList.add("invisible");
                }
                if (active) {
                    original.classList.remove("dragnow");
                    drag.classList.remove("dragging");
                }
                if (parseInt(drag.querySelector(".blockid").value) === 0 && rearrange) {
                    firstBlock("rearrange")    
                } else if (active && blocks.length == 0 && (drag.getBoundingClientRect().top + window.scrollY) > (canvas_div.getBoundingClientRect().top + window.scrollY) && (drag.getBoundingClientRect().left + window.scrollX) > (canvas_div.getBoundingClientRect().left + window.scrollX)) {
                    firstBlock("drop");
                } else if (active && blocks.length == 0) {
                    removeSelection();
                } else if (active) {
                    var blocko = blocks.map(a => a.id);
                    for (var i = 0; i < blocks.length; i++) {
                        if (checkAttach(blocko[i])) {
                            active = false;
                            if (blockSnap(drag, false, document.querySelector(".blockid[value='" + blocko[i] + "']").parentNode)) {
                                snap(drag, i, blocko);
                            } else {
                                active = false;
                                removeSelection();
                            }
                            break;
                        } else if (i == blocks.length - 1) {
                            active = false;
                            removeSelection();
                        }
                    }
                } else if (rearrange) {
                    var blocko = blocks.map(a => a.id);
                    for (var i = 0; i < blocks.length; i++) {
                        if (checkAttach(blocko[i])) {
                            active = false;
                            drag.classList.remove("dragging");
                            snap(drag, i, blocko);
                            break;
                        } else if (i == blocks.length - 1) {
                            if (beforeDelete(drag, blocks.filter(id => id.id == blocko[i])[0])) {
                                active = false;
                                drag.classList.remove("dragging");
                                snap(drag, blocko.indexOf(prevblock), blocko);
                                break;
                            } 
                            else 
                            {
                                if (draggingBlockId === drag.querySelector(".blockid").value &&  // Only remove the block that you were dragging
                                    Math.abs(draggingBlockX - event.clientX) > 10 && // no accidental touch
                                    Math.abs(draggingBlockY - event.clientY) > 10
                                ) 
                                {   
                                    rearrange = false;
                                    blockstemp = [];
                                    active = false;
                                    removeSelection();
                                    removeBlockProperty(parseInt(drag.querySelector(".blockid").value));
                                    break;
                                }
                            }
                                
                        }
                    }
                }
            }
        }

        /**
         * Computes the number of ancestors of a block
         * @param  {Number} num Number of ancestors already computed
         * @param  {Object} blocks Blocks to navigate to find ancestors
         * @param  {Object} id Id of the current block
         * @return {Number} Returns the number of ancestors
         */
        function computeNumberOfFathers(num, blocks, id)
        {
            if (blocks[id].parent === -1)
            {
                return num;
            }
            else
            {
                let fid = blocks.filter(a => a.id == blocks[id].parent)[0].id;
                return  computeNumberOfFathers(num+1, blocks, fid);
            }
        }
        
        function checkAttach(id) {
            const xpos = (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left;
            const ypos = (drag.getBoundingClientRect().top + window.scrollY) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top;
            const fixedBlockType = blocks.filter(a => a.id == id)[0].type;
            const draggingBlockTypeId = parseInt(drag.querySelector(".blockelemtype").value);
            const draggingBlockType = draggingBlockTypeId === 1 ? 'Event' : "Filter";
            if (fixedBlockType === "Event" && draggingBlockType === "Event")
            {
                if (computeNumberOfFathers(1, blocks, id) >= 3)
                {
                    return false; // limit event chains to a maximum of 3 events
                }
                const blocksWithThisParent = blocks.filter(a => a.parent == id);
                const eventBlocksWithThisParent = blocksWithThisParent.filter(a => a.type == "Event");
                if (eventBlocksWithThisParent.length === 0)
                {
                    if (ypos >= blocks.filter(a => a.id == id)[0].y - (blocks.filter(a => a.id == id)[0].height / 2) - paddingy && ypos <= blocks.filter(a => a.id == id)[0].y + (blocks.filter(a => a.id == id)[0].height / 2) + paddingy && xpos >= blocks.filter(a => a.id == id)[0].x - (blocks.filter(a => a.id == id)[0].width / 2) && xpos <= blocks.filter(a => a.id == id)[0].x + blocks.filter(a => a.id == id)[0].width)
                    {
                        return true; 
                    }                      
                }
            }                
            else if (fixedBlockType === "Event" && draggingBlockType === "Filter")
            {   
                if (xpos >= blocks.filter(a => a.id == id)[0].x - (blocks.filter(a => a.id == id)[0].width / 2) - paddingx && xpos <= blocks.filter(a => a.id == id)[0].x + (blocks.filter(a => a.id == id)[0].width / 2) + paddingx && ypos >= blocks.filter(a => a.id == id)[0].y - (blocks.filter(a => a.id == id)[0].height / 2) && ypos <= blocks.filter(a => a.id == id)[0].y + blocks.filter(a => a.id == id)[0].height) 
                {
                    if ( (draggingBlockId === '' && !eventHasFilterOfSameType(id, draggingBlockTypeId) ) || eventIsTheOldFather(draggingBlockId, id))
                    {
                        return true;
                    }                    
                }                       
            }                   
            return false;            
        }

        function eventIsTheOldFather(childId, fatherID) 
        {
            return blocksProperties[fatherID]['Filters'].includes(parseInt(childId));
        }

        function eventHasFilterOfSameType(fatherID, childBlockTypeId) 
        {
            const filterField = filtersMap[childBlockTypeId];
            for (var j in blocksProperties[fatherID].Filters)
            {
                const filter = blocksProperties[blocksProperties[fatherID].Filters[j]];
                if (filter['Filter Field'] === filterField)
                {
                    return true;
                }
            }
            return false;
        }
        
        function removeSelection() {
            canvas_div.appendChild(document.querySelector(".indicator"));
            drag.parentNode.removeChild(drag);
        }
        
        function firstBlock(type) {
            if (type == "drop") {
                blockSnap(drag, true, undefined);
                active = false;
                drag.style.top = (drag.getBoundingClientRect().top + window.scrollY) - (absy + window.scrollY) + canvas_div.scrollTop + "px";
                drag.style.left = (drag.getBoundingClientRect().left + window.scrollX) - (absx + window.scrollX) + canvas_div.scrollLeft + "px";
                canvas_div.appendChild(drag);
                blocks.push({
                    parent: -1,
                    childwidth: 0,
                    id: parseInt(drag.querySelector(".blockid").value),
                    type: parseInt(drag.querySelector(".blockelemtype").value) === 1 ? 'Event' : "Filter",
                    x: (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left,
                    y: (drag.getBoundingClientRect().top + window.scrollY) + (parseInt(window.getComputedStyle(drag).height) / 2) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top,
                    width: parseInt(window.getComputedStyle(drag).width),
                    height: parseInt(window.getComputedStyle(drag).height)
                });
            } else if (type == "rearrange") {
                drag.classList.remove("dragging");
                rearrange = false;
                for (var w = 0; w < blockstemp.length; w++) {
                    if (blockstemp[w].id != parseInt(drag.querySelector(".blockid").value)) {
                        const blockParent = document.querySelector(".blockid[value='" + blockstemp[w].id + "']").parentNode;
                        const arrowParent = document.querySelector(".arrowid[value='" + blockstemp[w].id + "']").parentNode;
                        blockParent.style.left = (blockParent.getBoundingClientRect().left + window.scrollX) - (window.scrollX) + canvas_div.scrollLeft - 1 - absx + "px";
                        blockParent.style.top = (blockParent.getBoundingClientRect().top + window.scrollY) - (window.scrollY) + canvas_div.scrollTop - absy - 1 + "px";
                        arrowParent.style.left = (arrowParent.getBoundingClientRect().left + window.scrollX) - (window.scrollX) + canvas_div.scrollLeft - absx - 1 + "px";
                        arrowParent.style.top = (arrowParent.getBoundingClientRect().top + window.scrollY) + canvas_div.scrollTop - 1 - absy + "px";
                        canvas_div.appendChild(blockParent);
                        canvas_div.appendChild(arrowParent);
                        blockstemp[w].x = (blockParent.getBoundingClientRect().left + window.scrollX) + (parseInt(blockParent.offsetWidth) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left - 1;
                        blockstemp[w].y = (blockParent.getBoundingClientRect().top + window.scrollY) + (parseInt(blockParent.offsetHeight) / 2) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top - 1;
                    }
                }
                blockstemp.filter(a => a.id == 0)[0].x = (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left;
                blockstemp.filter(a => a.id == 0)[0].y = (drag.getBoundingClientRect().top + window.scrollY) + (parseInt(window.getComputedStyle(drag).height) / 2) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top;
                blocks = blocks.concat(blockstemp);
                blockstemp = [];
            }
        }
        
        function drawArrow(arrow, x, y, id) {
            const draggingBlockType = parseInt(drag.querySelector(".blockelemtype").value) === 1 ? 'Event' : "Filter";
            if (x < 0) { // TODO devi aggiungere condizione quando x < 0: non l'ho modificata ancora
                canvas_div.innerHTML += '<div class="arrowblock"><input type="hidden" class="arrowid" value="' + drag.querySelector(".blockid").value + '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 20 0 L 42 0 L 81 0 L 200 0" stroke="#C5CCD0" stroke-width="2px"/><path d="M 200 -5 L 205 0 L 200 5" fill="#C5CCD0"/></svg></div>';
                document.querySelector('.arrowid[value="' + drag.querySelector(".blockid").value + '"]').parentNode.style.left = (arrow.x - 5) - (absx + window.scrollX) + canvas_div.scrollLeft + canvas_div.getBoundingClientRect().left + "px";
            } 
            else 
            {                
                if (draggingBlockType == "Event")
                {
                    canvas_div.innerHTML += '<div class="arrowblock"><input type="hidden" class="arrowid" value="' + drag.querySelector(".blockid").value + '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 20 0 L 42 0 L 81 0 L 200 0"  stroke="#C5CCD0" stroke-width="2px"/><path d="M 200 -5 L 205 0 L 200 5" fill="#C5CCD0"/></svg></div>';
                    document.querySelector('.arrowid[value="' + parseInt(drag.querySelector(".blockid").value) + '"]').parentNode.style.left = blocks.filter(a => a.id == id)[0].x + (blocks.filter(a => a.id == id)[0].width / 2) - 20 - (absx + window.scrollX) + canvas_div.getBoundingClientRect().left + "px"; 
                }
                else
                {
                    canvas_div.innerHTML += '<div class="arrowblock"><input type="hidden" class="arrowid" value="' + drag.querySelector(".blockid").value + '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0L20 ' + (paddingy / 2) + 'L' + (x) + ' ' + (paddingy / 2) + 'L' + x + ' ' + y + '" stroke="#C5CCD0" stroke-width="2px"/><path d="M' + (x - 5) + ' ' + (y - 5) + 'H' + (x + 5) + 'L' + x + ' ' + y + 'L' + (x - 5) + ' ' + (y - 5) + 'Z" fill="#C5CCD0"/></svg></div>';
                    document.querySelector('.arrowid[value="' + parseInt(drag.querySelector(".blockid").value) + '"]').parentNode.style.left = blocks.filter(a => a.id == id)[0].x - 20 - (absx + window.scrollX) + canvas_div.scrollLeft + canvas_div.getBoundingClientRect().left + "px";
                }                
            }
            if (draggingBlockType == "Event")
            {
                document.querySelector('.arrowid[value="' + parseInt(drag.querySelector(".blockid").value) + '"]').parentNode.style.top = blocks.filter(a => a.id == id)[0].y  + canvas_div.getBoundingClientRect().top - absy + "px";
            }
            else
            {
                document.querySelector('.arrowid[value="' + parseInt(drag.querySelector(".blockid").value) + '"]').parentNode.style.top = blocks.filter(a => a.id == id)[0].y + (blocks.filter(a => a.id == id)[0].height / 2) + canvas_div.getBoundingClientRect().top - absy + "px";
            }
            
        }
        
        function updateArrow(arrow, x, y, children) { 
            if (x < 0) {
                document.querySelector('.arrowid[value="' + children.id + '"]').parentNode.style.left = (arrow.x - 5) - (absx + window.scrollX) + canvas_div.getBoundingClientRect().left + "px";
                document.querySelector('.arrowid[value="' + children.id + '"]').parentNode.innerHTML = '<input type="hidden" class="arrowid" value="' + children.id + '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M' + (blocks.filter(id => id.id == children.parent)[0].x - arrow.x + 5) + ' 0L' + (blocks.filter(id => id.id == children.parent)[0].x - arrow.x + 5) + ' ' + (paddingy / 2) + 'L5 ' + (paddingy / 2) + 'L5 ' + y + '" stroke="#C5CCD0" stroke-width="2px"/><path d="M0 ' + (y - 5) + 'H10L5 ' + y + 'L0 ' + (y - 5) + 'Z" fill="#C5CCD0"/></svg>';
            } else {
                document.querySelector('.arrowid[value="' + children.id + '"]').parentNode.style.left = blocks.filter(id => id.id == children.parent)[0].x - 20 - (absx + window.scrollX) + canvas_div.getBoundingClientRect().left + "px";
                document.querySelector('.arrowid[value="' + children.id + '"]').parentNode.innerHTML = '<input type="hidden" class="arrowid" value="' + children.id + '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0L20 ' + (paddingy / 2) + 'L' + (x) + ' ' + (paddingy / 2) + 'L' + x + ' ' + y + '" stroke="#C5CCD0" stroke-width="2px"/><path d="M' + (x - 5) + ' ' + (y - 5) + 'H' + (x + 5) + 'L' + x + ' ' + y + 'L' + (x - 5) + ' ' + (y - 5) + 'Z" fill="#C5CCD0"/></svg>';
            }
        }

        function snap(drag, i, blocko) {
            draggingBlockId = '';
            if (!rearrange) {
                canvas_div.appendChild(drag);
            }
            var totalwidth = 0;
            var totalremove = 0;
            var maxheight = 0;
            for (var w = 0; w < blocks.filter(id => id.parent == blocko[i] && id.type === "Filter").length; w++) {
                var children = blocks.filter(id => id.parent == blocko[i] && id.type === "Filter")[w];
                if (children.childwidth > children.width) {
                    totalwidth += children.childwidth + paddingx;
                } else {
                    totalwidth += children.width + paddingx;
                }
            }
            totalwidth += parseInt(window.getComputedStyle(drag).width);
            for (var w = 0; w < blocks.filter(id => id.parent == blocko[i] && id.type === "Filter").length; w++) {
                var children = blocks.filter(id => id.parent == blocko[i] && id.type === "Filter")[w];
                if (!parseInt(drag.querySelector(".blockelemtype").value) === 1)
                {
                    if (children.childwidth > children.width) {
                        document.querySelector(".blockid[value='" + children.id + "']").parentNode.style.left = blocks.filter(a => a.id == blocko[i])[0].x - (totalwidth / 2) + totalremove + (children.childwidth / 2) - (children.width / 2) + "px";
                        children.x = blocks.filter(id => id.parent == blocko[i] && id.type === "Filter")[0].x - (totalwidth / 2) + totalremove + (children.childwidth / 2);
                        totalremove += children.childwidth + paddingx;
                    } else {
                        document.querySelector(".blockid[value='" + children.id + "']").parentNode.style.left = blocks.filter(a => a.id == blocko[i])[0].x - (totalwidth / 2) + totalremove + "px";
                        children.x = blocks.filter(id => id.parent == blocko[i] && id.type === "Filter")[0].x - (totalwidth / 2) + totalremove + (children.width / 2);
                        totalremove += children.width + paddingx;
                    }
                }                
            }
            const draggingBlockType = parseInt(drag.querySelector(".blockelemtype").value) === 1 ? 'Event' : "Filter";
            if (draggingBlockType == "Event")
            {
                drag.style.left = blocks.filter(id => id.id == blocko[i])[0].x + 345 - (window.scrollX + absx) + canvas_div.getBoundingClientRect().left + "px";
                console.log("Father block x = " + blocks.filter(id => id.id == blocko[i])[0].x + " totalremove = " + totalremove + " window.scrollX + absx = " + (window.scrollX + absx));
                drag.style.top = blocks.filter(id => id.id == blocko[i])[0].y - (blocks.filter(id => id.id == blocko[i])[0].height / 2) + "px";
            }
            else
            {
                drag.style.left = blocks.filter(id => id.id == blocko[i])[0].x - (totalwidth / 2) + totalremove - (window.scrollX + absx) + canvas_div.scrollLeft + canvas_div.getBoundingClientRect().left + "px";
                drag.style.top = blocks.filter(id => id.id == blocko[i])[0].y + (blocks.filter(id => id.id == blocko[i])[0].height / 2) + paddingy - (window.scrollY + absy) + canvas_div.getBoundingClientRect().top + "px";
            }
            if (rearrange) {
                blockstemp.filter(a => a.id == parseInt(drag.querySelector(".blockid").value))[0].x = (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left;
                blockstemp.filter(a => a.id == parseInt(drag.querySelector(".blockid").value))[0].y = (drag.getBoundingClientRect().top + window.scrollY) + (parseInt(window.getComputedStyle(drag).height) / 2) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top;
                blockstemp.filter(a => a.id == drag.querySelector(".blockid").value)[0].parent = blocko[i];
                for (var w = 0; w < blockstemp.length; w++) {
                    if (blockstemp[w].id != parseInt(drag.querySelector(".blockid").value)) {
                        const blockParent = document.querySelector(".blockid[value='" + blockstemp[w].id + "']").parentNode;
                        const arrowParent = document.querySelector(".arrowid[value='" + blockstemp[w].id + "']").parentNode;
                        blockParent.style.left = (blockParent.getBoundingClientRect().left + window.scrollX) - (window.scrollX + canvas_div.getBoundingClientRect().left) + canvas_div.scrollLeft + "px";
                        blockParent.style.top = (blockParent.getBoundingClientRect().top + window.scrollY) - (window.scrollY + canvas_div.getBoundingClientRect().top) + canvas_div.scrollTop + "px";
                        arrowParent.style.left = (arrowParent.getBoundingClientRect().left + window.scrollX) - (window.scrollX + canvas_div.getBoundingClientRect().left) + canvas_div.scrollLeft + 20 + "px";
                        arrowParent.style.top = (arrowParent.getBoundingClientRect().top + window.scrollY) - (window.scrollY + canvas_div.getBoundingClientRect().top) + canvas_div.scrollTop + "px";
                        canvas_div.appendChild(blockParent);
                        canvas_div.appendChild(arrowParent);

                        blockstemp[w].x = (blockParent.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(blockParent).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left;
                        blockstemp[w].y = (blockParent.getBoundingClientRect().top + window.scrollY) + (parseInt(window.getComputedStyle(blockParent).height) / 2) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top;
                    }
                }
                blocks = blocks.concat(blockstemp);
                blockstemp = [];
            } else {
                let _id = parseInt(drag.querySelector(".blockid").value);
                let _parent = blocko[i];
                let _type = parseInt(drag.querySelector(".blockelemtype").value) === 1 ? 'Event' : "Filter";
                blocks.push({
                    childwidth: 0,
                    parent: _parent,
                    id: _id,
                    type: _type,
                    x: (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left,
                    y: (drag.getBoundingClientRect().top + window.scrollY) + (parseInt(window.getComputedStyle(drag).height) / 2) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top,
                    width: parseInt(window.getComputedStyle(drag).width),
                    height: parseInt(window.getComputedStyle(drag).height)
                });

                if (_type === "Event")
                {                    
                    blocksProperties[_parent]['Next Event'] = _id;
                    if (window.self !== window.top) { parent.blocksProperties[_parent]['Next Event'] = _id; } 
                }
                else
                {
                    blocksProperties[_parent]['Filters'].push(_id);
                    if (window.self !== window.top) { parent.blocksProperties[_parent]['Filters'].push(_id); }                    
                }
            }
            
            var arrowblock = blocks.filter(a => a.id == parseInt(drag.querySelector(".blockid").value))[0];
            var arrowx = arrowblock.x - blocks.filter(a => a.id == blocko[i])[0].x + 20;
            var arrowy = paddingy;
            drawArrow(arrowblock, arrowx, arrowy, blocko[i]);
            
            if (blocks.filter(a => a.id == blocko[i])[0].parent != -1) {
                var flag = false;
                var idval = blocko[i];
                while (!flag) {
                    if (blocks.filter(a => a.id == idval)[0].parent == -1) {
                        flag = true;
                    } else {
                        var zwidth = 0;
                        for (var w = 0; w < blocks.filter(id => id.parent == idval && id.type === "Filter").length; w++) {
                            var children = blocks.filter(id => id.parent == idval && id.type === "Filter")[w];
                            if (children.childwidth > children.width) {
                                if (w == blocks.filter(id => id.parent == idval && id.type === "Filter").length - 1) {
                                    zwidth += children.childwidth;
                                } else {
                                    zwidth += children.childwidth + paddingx;
                                }
                            } else {
                                if (w == blocks.filter(id => id.parent == idval && id.type === "Filter").length - 1) {
                                    zwidth += children.width;
                                } else {
                                    zwidth += children.width + paddingx;
                                }
                            }
                        }
                        blocks.filter(a => a.id == idval)[0].childwidth = zwidth;
                        idval = blocks.filter(a => a.id == idval)[0].parent;
                    }
                }
                blocks.filter(id => id.id == idval)[0].childwidth = totalwidth;
            }
            if (rearrange) {
                rearrange = false;
                drag.classList.remove("dragging");
            }
            const blockId = parseInt(drag.querySelector(".blockid").value);
            rearrangeMe(blockId, blocko[i]); 
            checkOffset(blockId,  blocko[i]);
        }

        function touchblock(event) {
            dragblock = false;
            if (//(event.target.classList.contains('blocktitle') || event.target.childNodes[0].value == '1') && // Block definition (on the left side) or block in the canvas of type Event
                hasParentClass(event.target, "block")) {
                var theblock = event.target.closest(".block");
                if (event.targetTouches) {
                    mouse_x = event.targetTouches[0].clientX;
                    mouse_y = event.targetTouches[0].clientY;
                } else {
                    mouse_x = event.clientX;
                    mouse_y = event.clientY;
                }
                if (event.type !== "mouseup" && hasParentClass(event.target, "block")) {
                    if (event.which != 3) {
                        if (!active && !rearrange) {
                            dragblock = true;
                            drag = theblock;
                            dragx = mouse_x - (drag.getBoundingClientRect().left + window.scrollX);
                            dragy = mouse_y - (drag.getBoundingClientRect().top + window.scrollY);
                        }
                    }
                }
            }
        }

        function hasParentClass(element, classname) {
            if (element.className) {
                if (element.className.split(' ').indexOf(classname) >= 0) return true;
            }
            return element.parentNode && hasParentClass(element.parentNode, classname);
        }

        flowy.moveBlock = function(event) {
            if (event.targetTouches) {
                mouse_x = event.targetTouches[0].clientX;
                mouse_y = event.targetTouches[0].clientY;
            } else {
                mouse_x = event.clientX;
                mouse_y = event.clientY;
            }
            if (dragblock) {
                rearrange = true;
                drag.classList.add("dragging");
                var blockid = parseInt(drag.querySelector(".blockid").value);
                prevblock = blocks.filter(a => a.id == blockid)[0].parent;
                blockstemp.push(blocks.filter(a => a.id == blockid)[0]);
                blocks = blocks.filter(function(e) {
                    return e.id != blockid
                });
                if (blockid != 0) {
                    document.querySelector(".arrowid[value='" + blockid + "']").parentNode.remove();
                }
                var layer = blocks.filter(a => a.parent == blockid);
                var flag = false;
                var foundids = [];
                var allids = [];
                while (!flag) {
                    for (var i = 0; i < layer.length; i++) {
                        if (layer[i] != blockid) {
                            blockstemp.push(blocks.filter(a => a.id == layer[i].id)[0]);
                            const blockParent = document.querySelector(".blockid[value='" + layer[i].id + "']").parentNode;
                            const arrowParent = document.querySelector(".arrowid[value='" + layer[i].id + "']").parentNode;
                            blockParent.style.left = (blockParent.getBoundingClientRect().left + window.scrollX) - (drag.getBoundingClientRect().left + window.scrollX) + "px";
                            blockParent.style.top = (blockParent.getBoundingClientRect().top + window.scrollY) - (drag.getBoundingClientRect().top + window.scrollY) + "px";
                            arrowParent.style.left = (arrowParent.getBoundingClientRect().left + window.scrollX) - (drag.getBoundingClientRect().left + window.scrollX) + "px";
                            arrowParent.style.top = (arrowParent.getBoundingClientRect().top + window.scrollY) - (drag.getBoundingClientRect().top + window.scrollY) + "px";
                            drag.appendChild(blockParent);
                            drag.appendChild(arrowParent);
                            foundids.push(layer[i].id);
                            allids.push(layer[i].id);
                        }
                    }
                    if (foundids.length == 0) {
                        flag = true;
                    } else {
                        layer = blocks.filter(a => foundids.includes(a.parent));
                        foundids = [];
                    }
                }
                for (var i = 0; i < blocks.filter(a => a.parent == blockid).length; i++) {
                    var blocknumber = blocks.filter(a => a.parent == blockid)[i];
                    blocks = blocks.filter(function(e) {
                        return e.id != blocknumber
                    });
                }
                for (var i = 0; i < allids.length; i++) {
                    var blocknumber = allids[i];
                    blocks = blocks.filter(function(e) {
                        return e.id != blocknumber
                    });
                }
                if (blocks.length > 1) {
                    rearrangeMe();
                }
                dragblock = false;
            }
            if (active) {
                drag.style.left = mouse_x - dragx + "px";
                drag.style.top = mouse_y - dragy + "px";
            } else if (rearrange) {
                drag.style.left = mouse_x - dragx - (window.scrollX + absx) + canvas_div.scrollLeft + "px";
                drag.style.top = mouse_y - dragy - (window.scrollY + absy) + canvas_div.scrollTop + "px";
                blockstemp.filter(a => a.id == parseInt(drag.querySelector(".blockid").value)).x = (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft; 
                blockstemp.filter(a => a.id == parseInt(drag.querySelector(".blockid").value)).y = (drag.getBoundingClientRect().top + window.scrollY) + (parseInt(window.getComputedStyle(drag).height) / 2) + canvas_div.scrollTop;
            }
            if (active || rearrange) {
                if (mouse_x > canvas_div.getBoundingClientRect().width + canvas_div.getBoundingClientRect().left - 10 && mouse_x < canvas_div.getBoundingClientRect().width + canvas_div.getBoundingClientRect().left + 10) {
                    canvas_div.scrollLeft += 10;
                } else if (mouse_x < canvas_div.getBoundingClientRect().left + 10 && mouse_x > canvas_div.getBoundingClientRect().left - 10) {
                    canvas_div.scrollLeft -= 10;
                } else if (mouse_y > canvas_div.getBoundingClientRect().height + canvas_div.getBoundingClientRect().top - 10 && mouse_y < canvas_div.getBoundingClientRect().height + canvas_div.getBoundingClientRect().top + 10) {
                    canvas_div.scrollTop += 10;
                } else if (mouse_y < canvas_div.getBoundingClientRect().top + 10 && mouse_y > canvas_div.getBoundingClientRect().top - 10) {
                    canvas_div.scrollLeft -= 10;
                }
                var xpos = (drag.getBoundingClientRect().left + window.scrollX) + (parseInt(window.getComputedStyle(drag).width) / 2) + canvas_div.scrollLeft - canvas_div.getBoundingClientRect().left;
                var ypos = (drag.getBoundingClientRect().top + window.scrollY) + canvas_div.scrollTop - canvas_div.getBoundingClientRect().top;
                var blocko = blocks.map(a => a.id);
                for (var i = 0; i < blocks.length; i++) {
                    if (checkAttach(blocko[i])) {
                        document.querySelector(".blockid[value='" + blocko[i] + "']").parentNode.appendChild(document.querySelector(".indicator"));
                        const draggingBlockType = parseInt(drag.querySelector(".blockelemtype").value) === 1 ? 'Event' : "Filter";
                        if (draggingBlockType == "Event")
                        {
                            document.querySelector(".indicator").style.left = (document.querySelector(".blockid[value='" + blocko[i] + "']").parentNode.offsetWidth) - 5 + "px"; 
                            document.querySelector(".indicator").style.top = document.querySelector(".blockid[value='" + blocko[i] + "']").parentNode.offsetHeight / 2 + "px"; 
                        }
                        else
                        {
                            document.querySelector(".indicator").style.left = (document.querySelector(".blockid[value='" + blocko[i] + "']").parentNode.offsetWidth / 2) - 5 + "px"; 
                            document.querySelector(".indicator").style.top = document.querySelector(".blockid[value='" + blocko[i] + "']").parentNode.offsetHeight + "px"; 
                        }                        
                        document.querySelector(".indicator").classList.remove("invisible");
                        break;
                    } else if (i == blocks.length - 1) {
                        if (!document.querySelector(".indicator").classList.contains("invisible")) {
                            document.querySelector(".indicator").classList.add("invisible");
                        }
                    }
                }
            }
        }

        function checkOffset(blockId = null, parentBlockId = null) {
            if (blockId !== null && parentBlockId !== null )
            {
                if (blocksProperties[blockId].type === "Event" && blocksProperties[parentBlockId].type === "Event" ) //era blocks invece di blocksProperties
                {
                    return;
                }
            }
            offsetleft = blocks.map(a => a.x);
            var widths = blocks.map(a => a.width);
            var mathmin = offsetleft.map(function(item, index) {
                return item - (widths[index] / 2);
            })
            offsetleft = Math.min.apply(Math, mathmin);
            if (offsetleft < (canvas_div.getBoundingClientRect().left + window.scrollX - absx)) {
                var blocko = blocks.map(a => a.id);
                for (var w = 0; w < blocks.length; w++) {
                    //if (blocks.filter(a => a.id == blocko[w])[0].type == "Filter") 
                    //{
                        const newLeft = blocks.filter(a => a.id == blocko[w])[0].x - (blocks.filter(a => a.id == blocko[w])[0].width / 2) - offsetleft + canvas_div.getBoundingClientRect().left - absx + 20;
                        const offset = newLeft - parseInt(document.querySelector(".blockid[value='" + blocks.filter(a => a.id == blocko[w])[0].id + "']").parentNode.style.left .split('px')[0]);
                        document.querySelector(".blockid[value='" + blocks.filter(a => a.id == blocko[w])[0].id + "']").parentNode.style.left = newLeft  + "px";
                        const parentBlockId = blocks.filter(a => a.id == blocko[w])[0].id;
                        
                        if (blocks.filter(a => a.parent == parentBlockId && a.type == "Event").length > 0)
                        {
                            const bid = blocks.filter(a => a.parent == parentBlockId && a.type == "Event")[0].id;
                            let arrowPath = document.querySelector('.arrowid[value="' + bid + '"]').parentNode.children[1].children[0]; 
                            console.log('before: ' + arrowPath.getAttribute('d'));
                            //todo: refactor followinfg lines in a function
                            let d = arrowPath.getAttribute('d');
                            let dPieces = d.split(' ');
                            dPieces [1] = String(parseInt(dPieces[1]) + offset); 
                            dPieces [10] = String(parseInt(dPieces[10]) + offset); 
                            arrowPath.setAttribute('d', dPieces.join(' '));
                            console.log('after: ' + arrowPath.getAttribute('d')); 
                            arrowPath = document.querySelector('.arrowid[value="' + bid + '"]').parentNode.children[1].children[1]; 
                            d = arrowPath.getAttribute('d');
                            dPieces = d.split(' ');
                            dPieces [1] = String(parseInt(dPieces[1]) + offset); 
                            dPieces [4] = String(parseInt(dPieces[4]) + offset); 
                            dPieces [7] = String(parseInt(dPieces[7]) + offset); 
                            arrowPath.setAttribute('d', dPieces.join(' '));
                        }
                        
                        
                        if (blocks.filter(a => a.id == blocko[w])[0].parent != -1) {
                            var arrowblock = blocks.filter(a => a.id == blocko[w])[0];
                            if (arrowblock.type === "Filter")
                            {
                                var arrowx = arrowblock.x - blocks.filter(a => a.id == blocks.filter(a => a.id == blocko[w])[0].parent)[0].x;
                                if (arrowx < 0) {
                                    document.querySelector('.arrowid[value="' + blocko[w] + '"]').parentNode.style.left = (arrowblock.x - offsetleft + 20 - 5) + canvas_div.getBoundingClientRect().left - absx + "px";
                                } else {
                                    document.querySelector('.arrowid[value="' + blocko[w] + '"]').parentNode.style.left = blocks.filter(id => id.id == blocks.filter(a => a.id == blocko[w])[0].parent)[0].x - 20 - offsetleft + canvas_div.getBoundingClientRect().left - absx + 20 + "px";
                                }
                            }                            
                        }
                    //}                    
                }
                for (var w = 0; w < blocks.length; w++) {
                    //if (blocks.filter(a => a.id == blocko[w])[0].type == "Filter") 
                    //{
                        blocks[w].x = (document.querySelector(".blockid[value='" + blocks[w].id + "']").parentNode.getBoundingClientRect().left + window.scrollX) + (canvas_div.scrollLeft) + (parseInt(window.getComputedStyle(document.querySelector(".blockid[value='" + blocks[w].id + "']").parentNode).width) / 2) - 20 - canvas_div.getBoundingClientRect().left;
                    //}                    
                }
            }
        }

        function rearrangeMe(blockId = null, parentBlockId = null) {
            if (parseInt(drag.querySelector(".blockelemtype").value) === 1 )
            {
                return; // never rearrange when the dragged block is of type 'Event'
            }
            var result = blocks.map(a => a.parent);
            for (var z = 0; z < result.length; z++) {
                if (result[z] == -1) {
                    z++;
                }
                var totalwidth = 0;
                var totalremove = 0;
                var maxheight = 0;
                for (var w = 0; w < blocks.filter(id => id.parent == result[z] && id.type === "Filter").length; w++) {
                    var children = blocks.filter(id => id.parent == result[z] && id.type === "Filter")[w];
                    if (blocks.filter(id => id.parent == children.id).length == 0) {
                        children.childwidth = 0;
                    }
                    if (children.childwidth > children.width) {
                        if (w == blocks.filter(id => id.parent == result[z] && id.type === "Filter").length - 1) {
                            totalwidth += children.childwidth;
                        } else {
                            totalwidth += children.childwidth + paddingx;
                        }
                    } else {
                        if (w == blocks.filter(id => id.parent == result[z] && id.type === "Filter").length - 1) {
                            totalwidth += children.width;
                        } else {
                            totalwidth += children.width + paddingx;
                        }
                    }
                }
                if (result[z] != -1) {
                    blocks.filter(a => a.id == result[z])[0].childwidth = totalwidth;
                }
                for (var w = 0; w < blocks.filter(id => id.parent == result[z] && id.type === "Filter").length; w++) {
                    var children = blocks.filter(id => id.parent == result[z] && id.type === "Filter")[w];
                    const r_block = document.querySelector(".blockid[value='" + children.id + "']").parentNode;
                    const currentBlockType = parseInt(r_block.querySelector(".blockelemtype").value) === 1 ? 'Event' : "Filter";
                    if (currentBlockType === "Event") //TODO: TIENI O RIMUOVI?
                    {
                        continue; // Event block arrows never get updated
                    }
                    const r_array = blocks.filter(id => id.id == result[z]);
                    r_block.style.top = r_array.y + paddingy + canvas_div.getBoundingClientRect().top - absy + "px";
                    r_array.y = r_array.y + paddingy;
                    if (children.childwidth > children.width) {
                        r_block.style.left = r_array[0].x - (totalwidth / 2) + totalremove + (children.childwidth / 2) - (children.width / 2) - (absx + window.scrollX) + canvas_div.getBoundingClientRect().left + "px";
                        children.x = r_array[0].x - (totalwidth / 2) + totalremove + (children.childwidth / 2);
                        totalremove += children.childwidth + paddingx;
                    } else {
                        r_block.style.left = r_array[0].x - (totalwidth / 2) + totalremove - (absx + window.scrollX) + canvas_div.getBoundingClientRect().left + "px";
                        children.x = r_array[0].x - (totalwidth / 2) + totalremove + (children.width / 2);
                        totalremove += children.width + paddingx;
                    }
                    var arrowblock = blocks.filter(a => a.id == children.id)[0];
                    var arrowx = arrowblock.x - blocks.filter(a => a.id == children.parent)[0].x + 20;
                    var arrowy = paddingy;
                    if (arrowblock.type === "Filter")
                    {
                        updateArrow(arrowblock, arrowx, arrowy, children);
                    }                    
                }                
            }
            if (parentBlockId !== null && blocks.filter(id => id.parent == parentBlockId && id.type === "Filter").length > 1)
            {
                for (var w = 0; w < blocks.filter(id => id.parent == parentBlockId && id.type === "Event").length; w++) // If present, only one: translate block and increase the arrow length
                {
                    const currentBlock = blocks.filter(id => id.parent == parentBlockId && id.type === "Event")[w];
                    const r_block = document.querySelector(".blockid[value='" + currentBlock.id + "']").parentNode;
                    r_block.style.left = String(parseInt(r_block.style.left.split('px')[0])+200)+'px';
                    currentBlock.x += 200;
                    document.querySelector('.arrowid[value="' + currentBlock.id + '"]').parentNode.style.left = String( parseInt(document.querySelector('.arrowid[value="' + currentBlock.id + '"]').parentNode.style.left.split('px')[0])+200)+'px';
                    const arrowPath = document.querySelector('.arrowid[value="' + currentBlock.id + '"]').parentNode.children[1].children[0];
                    const d = arrowPath.getAttribute('d');
                    let dPieces = d.split(' ');
                    dPieces [1] = String(parseInt(dPieces[1]) - 200); 
                    arrowPath.setAttribute('d', dPieces.join(' '));
                    console.log('Event descendant');
                }
                const parent_x = blocks[parentBlockId].x;
                for (var w = 0; w < blocks.filter(id => id.parent != parentBlockId && id.parent != '-1' && id.x > parent_x).length; w++) // All not descendant blocks: translate blocks and arrows
                {
                    const currentBlock = blocks.filter(id => id.parent != parentBlockId && id.parent != '-1' && id.x > parent_x)[w];
                    const r_block = document.querySelector(".blockid[value='" + currentBlock.id + "']").parentNode;
                    r_block.style.left = String(parseInt(r_block.style.left.split('px')[0])+200)+'px';
                    currentBlock.x += 200;
                    document.querySelector('.arrowid[value="' + currentBlock.id + '"]').parentNode.style.left = String( parseInt(document.querySelector('.arrowid[value="' + currentBlock.id + '"]').parentNode.style.left.split('px')[0])+200)+'px';
                    console.log('Non descendant');
                }
            }
        }
        
        document.addEventListener("mousedown", flowy.beginDrag);
        document.addEventListener("mousedown", touchblock, false);
        document.addEventListener("touchstart", flowy.beginDrag);
        document.addEventListener("touchstart", touchblock, false);
        

        document.addEventListener("mouseup", touchblock, false);
        document.addEventListener("mousemove", flowy.moveBlock, false);
        document.addEventListener("touchmove", flowy.moveBlock, false);

        document.addEventListener("mouseup", flowy.endDrag, false);
        document.addEventListener("touchend", flowy.endDrag, false);
    }

    function blockGrabbed(block) {
        grab(block);
    }

    function blockReleased() {
        release();
    }

    function blockSnap(drag, first, parent) {
        return snapping(drag, first, parent);
    }

    function beforeDelete(drag, parent) {
        return rearrange(drag, parent);
    }

    function addEventListenerMulti(type, listener, capture, selector) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener(type, listener, capture);
        }
    }

    function removeEventListenerMulti(type, listener, capture, selector) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].removeEventListener(type, listener, capture);
        }
    }
    
    flowy.load();
}
