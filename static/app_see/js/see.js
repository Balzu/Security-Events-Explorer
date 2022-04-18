/*
Copyright 2022, Francesco Balzano (francescobalzano10@gmail.com), All rights reserved.
*/

// TODO: tutte queste variabili vanno dentro oggetto SEE (o App)
const see = {};
var inputElementWSE; // single input element for the windows security logs
var wselog;  // FilePond for windows security log filename
var uploadedwslogs = {}; // dict holding the windows security logs st key: name, value: logfile
see.timelineHeight = 0;
var customStartTimeline = '';
var customEndTimeline = '';
var blocksProperties = {};

$(document).ready(function(){
    $("#upload-ws-logs").click(uploadWindowsSecurityLogsAndEnableOptions);
    inputElementWSE = document.querySelector('#uploaded-wse-logs');
    wselog = FilePond.create(inputElementWSE);
});


function uploadWindowsSecurityLogsAndEnableOptions(){
    if (wselog.getFile() === null)
        return alert("No file selected");
    var filename = wselog.getFile().filename;
    var _file = wselog.getFile().file;
    var reader = new FileReader();
    reader.onload = function(event) {
      var winLog = event.target.result;
	  uploadedwslogs[filename ] = winLog;
      updateSectionWithNewUploadedFilename(filename); //TODO: add check
	  clearWSEInput();
	  $('#OptionsBtn').removeAttr( "disabled" );
	  $('#HeuristicsBtn').removeAttr( "disabled" );
	  $('#OrchestratorBtn').removeAttr( "disabled" );
	  $('#DrawBtn').removeAttr( "disabled" ); //TODO: quando disegni timeline, aggiungi alert se nex opzione selezionata
    };
    reader.readAsText(_file);
    state_3();
}

function continueToOrchestrator()
{
	openSectionByClickOnContinue('Orchestrator', 'OrchestratorBtn');
}

function continueToDrawTimeline()
{
	openSectionByClickOnContinue('Draw', 'DrawBtn');
}

function enableExportTab()
{
	$('#ExportBtn').removeAttr( "disabled" );
}


function updateSectionWithNewUploadedFilename(filename){
  //TODO: check che nome non sia uguale a uno precedente
  if ($("#files-uploaded-table").length === 0){ // First item uploaded
    var upload = `	
	<div style="padding-top : 30px;">
		<table id="files-uploaded-table">
		  <thead>
			<tr>
			  <th>Files Uploaded</th>
			</tr>
		  </thead>
		  <tbody id="files-uploaded-table-body">
			<tr>
			  <td>${filename}</td>          
			</tr>
		  </tbody>  
		</table>
	</div>
	<h4 id="go-to-s3" >Upload another file or <button type="button" id="continue-s2" class="btn btn-danger build_timeline" onclick="openSectionByClickOnContinue(\'Options\', \'OptionsBtn\')">Continue</button></h4>
	`;				  
    //$(upload).insertAfter( $( "#app-description"));
    $(upload).insertAfter( $( "#upload-ws-logs"));
  }
  else // Some file already uploaded, just append to the list
  {
    var upload = '<tr><td>'+filename+'</td></tr>';
    $(upload).appendTo( "#files-uploaded-table-body");
  }
}

function clearWSEInput(){
    wselog.removeFile(); // Works up to the point filepond only uploads one file
}

function state_3(){
    //$( "#go-to-s3" ).remove();
    //$( "#uploaded-wse-logs").remove();
    //$( "#upload-ws-logs").remove();
    if ($("#continue-s3").length == 0) {
		addOptionsSection();  
		addOrchestratorSection();
		addDrawSection();
    }
    //openSectionByClickOnContinue('OptionsBtn');
}

function expandOptions(optionsRow)
{
	let optionsSection = optionsRow.children[1];
	let onOffSwitch = optionsRow.children[0].children[1];

	if (optionsSection.style.visibility == 'hidden')
	{
		optionsSection.style.visibility = 'visible';
		optionsSection.style.height = '100%';
		onOffSwitch.checked = true;
	}	
}

function collapseOptions(onOffSwitch)
{
	const optionsSection = onOffSwitch.parentElement.parentElement.children[1];	
	if (optionsSection.style.visibility == 'visible')
	{			
		optionsSection.style.visibility = 'hidden';
		optionsSection.style.height = '0';
		onOffSwitch.checked = false;
		event.stopPropagation();
	}			
}

function selectOrDeselectAll(selectSwitch)
{
	const options = selectSwitch.parentElement.parentElement.parentElement.children
	if (selectSwitch.checked)
	{			
		for(var i= 1; i < options.length; i++)
		{
			options[i].children[0].children[0].checked = true;
		}
	}			
	else
	{
		for(var i= 1; i < options.length; i++)
		{
			options[i].children[0].children[0].checked = false;
		}
	}
}


function addOrchestratorSection()
{
	//addOrchestratorEventListeners();
	$( "#Orchestrator" ).append(orchestratorHTML);
}


function addDrawSection()
{
    var draw =  //'<h4 id="files-options-section"><b>Draw the Timeline:</b><br></h4>' + 
				'<h4><button type="button" id="continue-s3" class="btn btn-danger build_timeline" onclick="displayTimelineOverlay(); state_4(); exportTimelineImage(); removeTimelineOverlay();">Draw Timeline</button></h4>';                  
    $( "#Draw" ).prepend(draw);
}

function addExportSection()
{
    var _export =  '<h4 id="export-section"><b>Customize your report:</b><br></h4>'+   
                      '<form id="reportOptions">'+
                        '<div class="checkbox white-text"><label><input id="ExportTimeline" type="checkbox"  value="">Export the timeline image</label></div>'+					
                        '<div class="checkbox white-text"><label><input id="ExportEventsTable" onclick="showOrHideReportColumnsOptions(this)" type="checkbox" value="">Export the table with the selected events</label></div>'+					
					  '</form>'+
					  '<h4><button type="button" class="btn btn-danger" onclick="createReport()">Create Report</button></h4>';                   
    $( "#Export" ).append(_export);
}

function showOrHideRangePicker()
{
    if ($('#SelectTime').is(":checked"))
    {
        $("#TimeRangePicker").css('pointer-events', '');
	$('#TimeRangePicker').removeAttr( "disabled" );
        $('#TimeRangePickerContainer').removeClass( "disabled" );   
    }
    else
    {
        $("#TimeRangePicker").css('pointer-events', 'none');
	$('#TimeRangePicker').attr( "disabled","" );
        $('#TimeRangePickerContainer').addClass( "disabled" );
    }
}

function state_4()
{
    let useSystemEvents = false;
    let useCustomTimeRange = false;
    let squeezeSimLogons = false;    
    if ($('#SelectTime').is(":checked")) {useCustomTimeRange = true;}
    if ($('#SqueezeSimultaneousLogons').is(":checked")) {squeezeSimLogons = true;}
    if ($('#ShowSystemEvents').is(":checked"))    
    {
	    useSystemEvents= true;        
    }
    let eventsFound = parseXMLEventsLogs(useSystemEvents, useCustomTimeRange); 
    console.log(eventsFound);	
	//Apply heuristics here:
	if (!useSystemEvents) //apply filter heuristic only if not shown all system events
	{
		if ($('#Logon-4624').is(":checked") && squeezeSimLogons) // Logon heuristic only applies to events '4624' (could be extended)
		{
			filterEventsBySimultaneousLoginsHeuristic(eventsFound);
		}
	}	
	if (isOrchestratorValid())
	{
		enrichEventsWithOrchestrator(eventsFound);
	}
    drawTimeline(eventsFound);	
	if ($("#export-section").length == 0) {
		addExportSection();
		enableExportTab();	
	}	
}

function displayTimelineOverlay()
{
	const firstChild = document.body.children[0];
	const overlay = document.createElement('div');
	overlay.id = "timeline-overlay";
	overlay.style.display = 'block';	
	document.body.insertBefore(overlay, firstChild);
}

function removeTimelineOverlay()
{
	document.getElementById('timeline-overlay').remove();
}

/**
 * Validates the properties of the orchestrator. Returns True if a valid orchestration was defined, false otherwise
 */
function isOrchestratorValid()
{
	function isOrchestratorEmpty()
	{
		return Object.keys(blocksProperties).length === 0;
	}

	function missBlocksFields()
	{
		return false; //TODO TBD
	}

	if (isOrchestratorEmpty())
	{
		return false;
	}
	if (missBlocksFields())
	{
		console.log("Cannot run the Orchestrator: missing fields discovered");
		return false;
	}
	return true;
}

/**
 * Applies Orchestrator Rules and adds the discovered sequences to the events to be plotted on the timeline
 * @param  {Object} eventsFound Events found: contains the events to be drawed on the timeline
 * @return {Object} Returns eventsFound, enriched with the sequence of events discovered through the orchestrator rules
*/
function enrichEventsWithOrchestrator(eventsFound)
{
	function findSequenceLength()
	{
		let eventBlock = blocksProperties[0];
		let slength = 1;
		while (eventBlock["Next Event"] !== "")
		{
			eventBlock = blocksProperties[eventBlock["Next Event"]];
			slength ++;
		}
		return slength;
	}

	function filterEventsBasedOnStep(numStep, events)
	{
		function filterEvent(condition, value, field, event)
		{
			if (!field in event)
			{
				return false;
			}
			else 
			{
				if (condition === 'Equal')
				{
					if (event[field] === value)
					{
						return true;
					}
				}
				else if (condition === 'Different')
				{
					if (event[field] !== value)
					{
						return true;
					}
				}
				else if (condition === 'Contains')
				{
					if (field in event && event[field].includes(value))
					{
						return true;
					}
				}
				return false;
			}			
		}

		const allEvents = getEventsList(events);
		const filterLogic = getFilterLogic(numStep); //AND or OR
		const filters = getFilters(numStep); // [ {'Filter Condition': 'Equal|Different|Contains', 'Filter Value' : <VALUE>}, ... ]
		const filteredEvents = [];
		if (filterLogic === 'AND')
		{
			allEvents.forEach(event => {
				let allFiltersSatisfied = true;
				filters.forEach(filter => {
					const filtersValues = filter['Filter Value'].split(',');
					for (const fval of filtersValues) 
					{
						const filterSuccess = filterEvent(filter['Filter Condition'], fval, filter['Filter Field'], event);
						if (!filterSuccess)
						{
							allFiltersSatisfied = false; // just need one filter not satisfied to discard the event
						}
					}					
				});
				if (allFiltersSatisfied)
				{
					filteredEvents.push([event]);
				}
			});
		}
		else 
		{
			allEvents.forEach(event => {
				let allFiltersSatisfied = false;
				filters.forEach(filter => {
					const filtersValues = filter['Filter Value'].split(',');
					for (const fval of filtersValues) 
					{
						const filterSuccess = filterEvent(filter['Filter Condition'], fval, filter['Filter Field'], event);
						if (filterSuccess)
						{
							allFiltersSatisfied = true; // just need one filter satisfied to take the event
						}
					}
				});
				if (allFiltersSatisfied)
				{
					filteredEvents.push([event]);
				}
			});
		}
		return filteredEvents;
	}

	function getEventsList(events)
	{
		const eventsList = [];
		for (let rawEvent in events)
		{
			const eventId = rawEvent.includes("-") ? rawEvent.split("-")[1] : rawEvent;
			for (let j in events[rawEvent])
			{
				const event = events[rawEvent][j];
				event['EventID'] = eventId;
				eventsList.push(event);
			}
		}
		return eventsList;
	}

	function getFilterLogic(numStep)
	{
		let eventBlock = blocksProperties[0];
		let currStep = 1;
		while (currStep < numStep)
		{
			eventBlock = blocksProperties[eventBlock["Next Event"]];
			currStep ++;
		}
		return eventBlock["Filter Logic"];
	}

	function getFilters(numStep)
	{
		let eventBlock = blocksProperties[0];
		let currStep = 1;
		const filters = [];
		while (currStep < numStep)
		{
			eventBlock = blocksProperties[eventBlock["Next Event"]];
			currStep ++;
		}
		eventBlock["Filters"].forEach(index => {
			let filter = blocksProperties[index];
			filters.push({'Filter Condition' : filter['Filter Condition'], 'Filter Value' : filter['Filter Value'],  'Filter Field' : filter['Filter Field']})
		});
		return filters;
	}

	// Returns the timeDelta for the step (numStep-1 -> numStep), which is hold in block numStep-1
	function getTimeDeltaStep(numStep)
	{
		let eventBlock = blocksProperties[0];
		let currStep = 1;
		while (currStep < numStep-1)
		{
			eventBlock = blocksProperties[eventBlock["Next Event"]];
			currStep ++;
		}
		return eventBlock["Time Delta"];
	}

	/**
	 * Filter the events based on the timedelta, returning only the sequences of events which are inside the given time delta.
	 * The previous sequences of events are already formed: in this function, we see which sequence can be augmented with events from the next step
	 * @param  {Object} eventsStepPrev List of sequences: [ [e11, ... , e1n], [e21, ... , e 2n], ... ] ]
	 * @param  {Object} eventsStepNext List of compatible events in the next step: [ e1, ... , en]
	 * @param  {Object} timeDelta Maximum time delta to attach an event of the next step to a 'previous' sequence
	 * @return {Object} The sequences of eventsStepPrev aumented with the compatible events from the next step
	*/
	function filterEventsBasedOnTime(eventsStepPrev, eventsStepNext, timeDelta)
	{
		const orchestratorEvents = [];
		eventsStepPrev.forEach( (eventsSequence) => {
			const lastEvent = eventsSequence[eventsSequence.length - 1];
			eventsStepNext.forEach( (nextEvent) => {
				const lastEventTime = new Date(lastEvent["time"]);
				const nextEventTime = new Date(nextEvent[0]["time"]);
				const differenceInSeconds = (nextEventTime - lastEventTime) / 1000;
				if (parseFloat(differenceInSeconds) >= 0) // If < 0, nextEvent happens before lastEvent -> skip
				{
					if (parseFloat(differenceInSeconds) <= parseFloat(timeDelta))			
					{
						orchestratorEvents.push(eventsSequence.concat(nextEvent));
					}
				}				
			});
		});
		return orchestratorEvents;
	}

	const slength = findSequenceLength();
	let orchestratorSequences = {};
	for (let host in eventsFound)
	{	
		const eventsStep1 = filterEventsBasedOnStep(1, eventsFound[host]);
		let eventsStep12 = {};
		// TODO: anche gli altru 'eventsStep' vanno dichiarati qui?		
		orchestratorSequences[host] = eventsStep1;		
		if (slength >= 2)
		{
			const eventsStep2 = filterEventsBasedOnStep(2, eventsFound[host]);
			const timeDelta = getTimeDeltaStep(2);
			eventsStep12 = filterEventsBasedOnTime(eventsStep1, eventsStep2, timeDelta);
			orchestratorSequences[host] = eventsStep12;
		}
		if (slength == 3)
		{
			const eventsStep3 = filterEventsBasedOnStep(3, eventsFound[host]);
			const timeDelta = getTimeDeltaStep(3);
			// TODO: Come eventi di partenza, devi prendere gli ultimi dello step12
			const eventsStep123 = filterEventsBasedOnTime(eventsStep12, eventsStep3, timeDelta);
			orchestratorSequences[host] = eventsStep123;
		}
	}

	let numOrchestrations = 0;
	for (host in orchestratorSequences)
	{
		for (let i in orchestratorSequences[host])
		{
			const sequence = orchestratorSequences[host][i];
			const orchestrationName = `Orchestration ${++numOrchestrations} (${host})`;
			eventsFound[orchestrationName] = {};
			for (let j in sequence) 
			{
				const event = sequence[j];
				let eid = event['EventID'];
				eid = security_events[eid]['Name'];
				const copiedEvent = Object.assign({}, event);
				delete copiedEvent['EventID'];				
				if (! (eid in eventsFound[orchestrationName]))
				{
					eventsFound[orchestrationName][eid] = [];
				}
				eventsFound[orchestrationName][eid].push(copiedEvent);
			}
		}
	}
	return orchestratorSequences;
}


function findHostname(logName)
/*Finds and returns the name of the host which produced the logfile*/
{
	//TODO
    return logName;
}

function initEventsStructures(eventsFound, searchedEvents, hostname)
{

	// Retrieves the selected events of the specified class
	function retrieveSelectedEvents (optionsClass){
		$( `.${optionsClass}` ).each(function() {
			if ($(this).is(":checked")) {
				const eid = $( this ).attr('id');
				let ids = eid.split('eid')[1]; // raw ids, like '3432-632'
				ids = ids.split('-');
				ids.forEach(element => {
					eventsFound[hostname][element.toString()] = []; 
					searchedEvents.add(element.toString());
				});
			}			
		});
	}

	eventsFound[hostname]={};
	if ($('#files-options-logon-switch').is(":checked")){
		if ($('#Logon-4624').is(":checked")) {
			eventsFound[hostname]['logon-4624'] = []; 
			searchedEvents.add("4624");
		}

		if ($('#Logon-4648').is(":checked")) {
			eventsFound[hostname]['logon-4648'] = []; 
			searchedEvents.add("4648");
		}		

    	if ($('#SpecialLogon-4672').is(":checked")) {
			eventsFound[hostname]['specialLogon-4672'] = []; 
			searchedEvents.add("4672");
		}

		if ($('#LogonFailure-4625').is(":checked")) {
			eventsFound[hostname]['logon fail-4625'] = []; 
			searchedEvents.add("4625");
		}		

    	if ($('#Logoff-4647').is(":checked")) {
			eventsFound[hostname]['logoff-4647'] = []; 
			searchedEvents.add("4647");
		}
		
		if ($('#Logoff-4634').is(":checked")) {
			eventsFound[hostname]['logoff-4634'] = []; 
			searchedEvents.add("4634");
		}

		if ($('#Logoff-4779').is(":checked")) {
			eventsFound[hostname]['logoff-4779'] = []; 
			searchedEvents.add("4779");
		}
	}

	if ($('#files-options-account-management-switch').is(":checked")){
		retrieveSelectedEvents("am-opt");		
	}

	if ($('#files-options-account-logon-switch').is(":checked")){
		retrieveSelectedEvents("alp-opt");		
	}

	if ($('#files-options-system-events-switch').is(":checked")){
		retrieveSelectedEvents("se-opt");
	}

	if ($('#files-options-object-access-switch').is(":checked")){
		retrieveSelectedEvents("oa-opt");
	}

	if ($('#files-options-policy-switch').is(":checked")){
		retrieveSelectedEvents("p-opt");
	}

	if ($('#files-options-privilege-use-switch').is(":checked")){
		retrieveSelectedEvents("pu-opt");
	}

	if ($('#files-options-process-inspection-switch').is(":checked")){
		retrieveSelectedEvents("pi-opt");
	}
}

function shouldUseEvent(eid, ename, interactiveEvent, parsedFields, useSystemEvents, filteredTargetSIDs, time, useCustomTimeRange, searchedEvents)
{
/*
* param eid: Event ID (string)
* param ename: Event name (string). Different from eid only for particular events (such as login)
* param interactiveEvent: Tells whether the current event is interactive (boolean)
* param parsedFields: Fields parsed for the current event (associative array)
* param systemEvent: Boolean telling whether or not system Events should be used
* param filteredTargetSIDs: Target user IDs filtered because belonging to System, not tu users (associative array)
* param time: Time of the event (string)
* param useCustomTimeRange: Tells whether events should be filtered based on date (boolean)
*/
    var useEvent = false;    
    if (useCustomTimeRange)
	{
		var dateEvent = new Date(time);  
		var dateStart = new Date(customStartTimeline);  
		var dateEnd = new Date(customEndTimeline);  
		if (dateEvent < dateStart || dateEvent > dateEnd )
		{
			return false;
		}
	}
     
	if (searchedEvents.has(eid))
	{
		if (ename == 'logon-4624') //special case
		{
			if (!useSystemEvents && filteredTargetSIDs.has(parsedFields['TargetUserSid']))
				{
					useEvent = false; // se c'  evento di sistema e te scarti eventi di sistema -> scarta evento
				}
			
			else if (interactiveEvent)
			{
				useEvent = true; // in case of a logon, only use if interactive
			}
		}
		else if (ename == 'specialLogon-4672') //special case
		{		
			if (!useSystemEvents && filteredTargetSIDs.has(parsedFields['SubjectUserSid']))
				{
					useEvent = false; // se c'  evento di sistema e te scarti eventi di sistema -> scarta evento
				}

			else if (parsedFields['SubjectUserName'] !== 'SYSTEM')	//TODO: aggiungi condizione: se prendi tutti gli eventi di sistema, lo fai vedere
			{
				useEvent = true; //TODO: devi prima controllare che 'SubjectUserName' esista? sennò  c'è eccezione!
			}
		}
		else //normal case: no additional condition has to be tested
		{
			useEvent = true;
		}
	}
	return useEvent; // if event not found, ename is null, and so 'false' is returned
}

function parseXMLEventsLogs(useSystemEvents = false, useCustomTimeRange=false) //TODO prendi valore systemEvents da checkbox
{
	var parser = new DOMParser();
	var eventDataFields = new Set(['TargetUserName', 'TargetDomainName', 'SubjectUserSid',
	                             'SubjectUserName', 'SubjectDomainName', 'TargetUserSid', 
				     'SubjectLogonId', 'CallerProcessName', 'TargetLogonId']); //TODO prendi 'Computer' da System
	var filteredTargetSIDs = new Set(['S-1-5-96-0-0', 'S-1-5-96-0-1', 'S-1-5-96-0-2', 'S-1-5-96-0-3', 'S-1-5-96-0-4', 'S-1-5-96-0-5', 'S-1-5-96-0-6', 'S-1-5-96-0-7', 'S-1-5-96-0-8', 'S-1-5-96-0-9', 'S-1-5-96-0-10', 
				'S-1-5-90-0-0', 'S-1-5-90-0-1', 'S-1-5-90-0-2', 'S-1-5-90-0-3', 'S-1-5-90-0-4', 'S-1-5-90-0-5', 'S-1-5-90-0-6', 'S-1-5-90-0-7', 'S-1-5-90-0-8', 'S-1-5-90-0-9', 'S-1-5-90-0-10', 
				'S-1-5-18', 'S-1-5-19', 'S-1-5-20']) //TODO
	eventsFound = {}; 
	var searchedEvents = new Set();
	for (let wslog in uploadedwslogs) {
		var host = findHostname(wslog);
		initEventsStructures(eventsFound, searchedEvents, host);		
		xmlDoc = parser.parseFromString(uploadedwslogs[wslog],"text/xml");
		var events = xmlDoc.getElementsByTagName("Event");
		for (let i=0;i<events.length;i++)
		{
			var ename = null;
			var interactiveEvent = false; // interactive only if entailed from the parsing of the fields	
			let computer = '';			
			for (let j=0; j<events[i].children.length; j++) {							
				if (events[i].children[j].nodeName == 'System') //poi vedi che fare con EventsData 
				{
				    var systemEvents = events[i].children[j].children;
					var time = '';
					var eventID = '';					
					//TODO: aggiungi var per altri campi utili qui..
					for (let k=0; k<systemEvents.length; k++) 
					{
					    if (systemEvents[k].nodeName == 'EventID')
						{
						    eventID = systemEvents[k].getInnerHTML();	
 						    //console.log(eventID);						
						}
						if (systemEvents[k].nodeName == 'TimeCreated')
						{
						    time = systemEvents[k].getAttribute('SystemTime');  // "2021-08-25T07:05:44.100829400Z"					
						}
						if (systemEvents[k].nodeName == 'Computer')
						{
						    computer = systemEvents[k].getInnerHTML();						
						}
						//TODO: fai parsing per altri campi utili qui..
					}
					if (searchedEvents.has(eventID))
					{					    
					    ename = security_events[eventID]['Name'];					    
					}
				}
				if (events[i].children[j].nodeName == 'EventData' && ename !== null) //  un evento con associato un login 
				{
					var dataEvents = events[i].children[j].children;
					
					var parsedFields = {};
					for (k=0; k<dataEvents.length; k++) 
					{
						if (dataEvents[k].getAttribute('Name') == 'LogonType' ) 
						{
							var logonType = dataEvents[k].getInnerHTML();
							parsedFields['LogonType'] = logonType;
							if (logonType === '2' || logonType === '10' || logonType === '11') //TODO use variables to check the logontype
							{								
								interactiveEvent = true; 
							}
						}
						if (eventDataFields.has(dataEvents[k].getAttribute('Name')))
						{                                                    
						    var key = dataEvents[k].getAttribute('Name');
						    var value = dataEvents[k].getInnerHTML();						    
						    parsedFields[key] = value;
						}
					}
					useEvent = shouldUseEvent(eventID, ename, interactiveEvent, parsedFields, useSystemEvents, filteredTargetSIDs, time, useCustomTimeRange, searchedEvents);
					if (useEvent)
					{
                        parsedFields['time'] = time;
                        parsedFields['Computer'] = computer;
						eventsFound[host][ename].push(parsedFields); //TODO: inserisci altri eventi qui						
					}
				}
			}
		}
	}
        return eventsFound;
}

function filterEventsBySimultaneousLoginsHeuristic(events)
{
	function insertEventInNonSimultaneousEvents(event, index, nonSimultaneousEvents)
	/* Returns true if the event can be inserted in the non-simultaneous events data structure,
	*  false otherwise. In case returns false, it means that a simultaneous event already exists.	
	*/
	{
		var subjectUserName = event['subjectUserName'];
		var subjectDomainName = event['subjectDomainName'];
		var targetUserName = event['targetUserName'];
		var targetDomainName = event['targetDomainName'];
		var time = event['time'];		
		if (subjectUserName in nonSimultaneousEvents)
		{
			if (subjectDomainName in nonSimultaneousEvents[subjectUserName])
			{
				if (targetUserName in nonSimultaneousEvents[subjectUserName][subjectDomainName])
				{
					if (targetDomainName in nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName])
					{
						nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName][targetDomainName]['timeAndIndex'].push({'time' : time, 'index': index});
					}
					else
					{
						nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName][targetDomainName] = { 'timeAndIndex' : [ {'time' : time, 'index': index} ]};
					}
				}
				else
				{
					nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName] = { [targetDomainName] : { 'timeAndIndex' : [{'time' : time, 'index': index}]}};
				}
			}
			else
			{
				nonSimultaneousEvents[subjectUserName][subjectDomainName] = { [targetUserName] : { [targetDomainName] : { 'timeAndIndex' : [{'time' : time, 'index': index}]}}};
			}
		}
		else
		{
			nonSimultaneousEvents[subjectUserName] = { [subjectDomainName] : { [targetUserName] : { [targetDomainName] : { 'timeAndIndex' : [{'time' : time, 'index': index}]}}}};
		}
		return true;
	}

	function compare( a, b )
	/* Takes pairs: {'time' = <TIME>, 'index' : <i>}*/ 
	{
		if ( a.time < b.time ){
		  return -1;
		}
		if ( a.time > b.time ){
		  return 1;
		}
		return 0;
	  }

	
	function sortEventsByIndex(nonSimultaneousEvents)
	{
		for (subjectUserName in nonSimultaneousEvents)
		{
			for (subjectDomainName in nonSimultaneousEvents[subjectUserName])
			{
				for (targetUserName in nonSimultaneousEvents[subjectUserName][subjectDomainName])
				{
					for (targetDomainName in nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName])
					{
						nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName][targetDomainName]['timeAndIndex'].sort(compare);
					}
				}
			}
		}		
	}

    function findIndexesOfSimultaneousPairsOfEvents(timeAndIndexes)
	/* 
	Gets an array of objects {'time' : <TIME>, 'index' : <INDEX>} 
	and returns the indexes of the simultaneous pairs of events
	*/ 
	{
		var indexes = [];
		var i = 0; //index of first item of the pair
		var j = 1; //index of second item of the pair
		while (j < timeAndIndexes.length)
		{
			var ti = new Date(timeAndIndexes[i]['time'])
			var tj = new Date(timeAndIndexes[j]['time'])
			if (Math.abs(ti.getTime() - tj.getTime()) < 1000) // simultaneous events:remove the second one
			{
				indexes.push(timeAndIndexes[j]['index']);
				i = i + 2;
				j = j + 2;
			}
			else
			{
				i = i + 1;
				j = j + 1;
			}
		}
		return indexes;
	}

	function findIndexesOfsimultaneousEvents(nonSimultaneousEvents)
	{
		var simultaneousIndexes = [];
		for (subjectUserName in nonSimultaneousEvents)
		{
			for (subjectDomainName in nonSimultaneousEvents[subjectUserName])
			{
				for (targetUserName in nonSimultaneousEvents[subjectUserName][subjectDomainName])
				{
					for (targetDomainName in nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName])
					{
						var indexes = findIndexesOfSimultaneousPairsOfEvents(nonSimultaneousEvents[subjectUserName][subjectDomainName][targetUserName][targetDomainName]['timeAndIndex']);
						simultaneousIndexes = simultaneousIndexes.concat(indexes);
					}
				}
			}
		}
		return simultaneousIndexes;
	}

	for (ename in events) //for each events file submitted
	{
		var nonSimultaneousEvents = {}; // remove nearly simultaneous events only if they fall in the same bucket
		var logonEvents = events[ename]["logon-4624"];
		var eventsIndexesToBeRemoved = []; // indexes of the events to be removed
		for (var i = 0; i < logonEvents.length; i++) 
		{
			var subjectUserName = logonEvents[i]['SubjectUserName'];
			var subjectDomainName = logonEvents[i]['SubjectDomainName'];
			var targetUserName = logonEvents[i]['TargetUserName'];
			var targetDomainName = logonEvents[i]['TargetDomainName'];
			var time = logonEvents[i]['time'];
			var event = 
			{
				'subjectUserName' : subjectUserName,
				'subjectDomainName' : subjectDomainName,
				'targetUserName' : targetUserName,
				'targetDomainName' : targetDomainName,
				'time' : time,
			}
			insertEventInNonSimultaneousEvents(event, i, nonSimultaneousEvents); // inserts events with index		
		}
		sortEventsByIndex(nonSimultaneousEvents); //sort in increasing order
		var indexesToBeRemoved = findIndexesOfsimultaneousEvents(nonSimultaneousEvents);
		
		// Only inserts not simultaneous events
		events[ename]["logon-4624"] = []
		for (var i = 0; i < logonEvents.length; i++) 
		{
			if (! indexesToBeRemoved.includes(i))
			{
				events[ename]["logon-4624"].push(logonEvents[i]);
			}
		}
	}    
}

/*@param eventsFound: Dict st key = hostname, value = dict st key: <event_name> : value: array st each entry is a dict with keys <time>, .... */
function drawTimeline(eventsFound)
{
	function getClassNameAndEvent()
	{
		if (!rawEvent.includes("logon") && !rawEvent.includes("logoff") && !rawEvent.includes("specialLogon"))
		{
			return {className :'standardEvent', event : rawEvent};
		}
		else
		{
			const event = rawEvent.split('-')[0]; //return logon | logoff | specialLogon | logon fail
			const cname = event.replaceAll(" ", "-"); // Css class does not support whitespaces (logon fail -> logon-fail)
			return {className :cname, event : event};			
		}
	}

    $('#visualization').empty(); 
    var container = document.getElementById('visualization');
    // Group section
    var groups = [];
    var num_host = 0;
    var host2num = {};
    for (var host in eventsFound) 
    {
        groups.push({'id':num_host, 'content':host});
        host2num[host] = num_host;
        num_host++;
    }

    // Items section
    var events = [];
    var eventCount= 0;
    for (var host in eventsFound)
    {
        for (var rawEvent in eventsFound[host])
        {
            for (var j in eventsFound[host][rawEvent])
            {
				const eventId = rawEvent.includes("-") ? rawEvent.split("-")[1] : rawEvent; // There is a distinction btw events like 'logon-4624' and just like '4678'
				const eventDescription = security_events[eventId]["Description"];
                var titleText = `Event ID: ${eventId}<br>Description: ${eventDescription}<br>`;
				for (var key in eventsFound[host][rawEvent][j])
				{    
					titleText += key + ' : ' + eventsFound[host][rawEvent][j][key] + '<br>';
	   			}
		
				const cAndE = getClassNameAndEvent();		
				events.push({'id':eventCount, 'className':cAndE['className'], 'content':cAndE['event'], 'start':eventsFound[host][rawEvent][j]['time'], group:host2num[host], title:titleText});
                eventCount++;
            }
        }            
    }
    var items = new vis.DataSet(events);
    var options = {tooltip : {overflowMethod : 'cap'}};
    var timeline = new vis.Timeline(container, items, groups, options);
}


/*TODO: cambia nome,  funzione usata per menu*/
function openLink(evt, animName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(animName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}

function openSectionByDirectClick(evt, sectionBtnName) 
{
    openLink(sectionBtnName);
    evt.currentTarget.className += " w3-red";    
}


function openSectionByClickOnContinue(sectionName, sectionBtnName) 
{
    openLink(sectionName);
    $('#' + sectionBtnName).addClass( "w3-red" );
}

/*TODO: cambia nome a funzione*/
function openLink(animName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(animName).style.display = "block";
}

