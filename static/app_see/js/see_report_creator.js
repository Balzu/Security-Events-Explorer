/** 
  * Gets the parsed events and normalizes them to fit the Report format
 */ 
function normalizeParsedEvents()    
{
    var parsedEvents = [];	
    for (const filename of Object.keys(eventsFound)) 
    {
        for (const rawEvent of Object.keys(eventsFound[filename])) 
        {
            const eventId = rawEvent.includes("-") ? rawEvent.split("-")[1] : rawEvent; // rawEvent is either like '4332' or like 'logon-4624'
            const rawName = security_events[eventId]["Name"];
            const eventName = rawName.includes("-") ? rawName.split('-')[0] : rawName; // rawEvent is either like 'logon' or like 'logon-4624'
            var logonType, subjectUserSid, subjectUserName, subjectLogonId, subjectDomainName, targetUserSid, 
                targetUserName, targetLogonId, targetDomainName, computer, time;
                eventsFound[filename][rawName].forEach(function(parsedEvent) { 
                    logonType = 'LogonType' in parsedEvent ? parsedEvent['LogonType']  : ""; 
                    subjectUserSid = 'SubjectUserSid' in parsedEvent ? parsedEvent['SubjectUserSid']  : ""; 
                    subjectUserName = 'SubjectUserName' in parsedEvent ? parsedEvent['SubjectUserName']  : ""; 
                    subjectLogonId = 'SubjectLogonId' in parsedEvent ? parsedEvent['SubjectLogonId']  : ""; 
                    subjectDomainName = 'SubjectDomainName' in parsedEvent ? parsedEvent['SubjectDomainName']  : ""; 
                    targetUserSid = 'TargetUserSid' in parsedEvent ? parsedEvent['TargetUserSid']  : ""; 
                    targetUserName = 'TargetUserName' in parsedEvent ? parsedEvent['TargetUserName']  : ""; 
                    targetLogonId = 'TargetLogonId' in parsedEvent ? parsedEvent['TargetLogonId']  : ""; 
                    targetDomainName = 'TargetDomainName' in parsedEvent ? parsedEvent['TargetDomainName']  : ""; 
                    computer = 'Computer' in parsedEvent ? parsedEvent['Computer']  : ""; 
                    time = 'time' in parsedEvent ? parsedEvent['time']  : ""; 
                    parsedEvents.push({
                        "EventID": eventId, 
                        "EventName": eventName, 
                        "LogonType": logonType, 
                        "SubjectUserSID": subjectUserSid, 
                        "SubjectUserName": subjectUserName, 
                        "SubjectLogonID": subjectLogonId, 
                        "SubjectDomainName": subjectDomainName, 
                        "TargetUserSID": targetUserSid, 
                        "TargetUserName": targetUserName, 
                        "TargetLogonID": targetLogonId, 
                        "TargetDomainName" : targetDomainName, 
                        "Computer" : computer, 
                        "Time" : time.slice(0,19) 
                });
			});            
        }
    }
    return parsedEvents;    
}

const makeCell = (content, rowIndex = -1, options = {}) => {
    return Object.assign({text: content, fillColor: rowIndex % 2 ? 'white' : '#f5f5f5'}, options);
}

// -- Format the table cells for presentation.
const thl = (content, rowIndex = -1, options = {}) => {
    return makeCell(content, rowIndex, Object.assign({ bold: true, alignment: 'left', fontSize: 11 }, options));
}
const thr = (content, rowIndex = -1, options = {}) => {
    return makeCell(content, rowIndex, Object.assign({ bold: true, alignment: 'right', fontSize: 11 }, options));
}
const tdl = (content, rowIndex = -1, options = {}) => {
    return makeCell( content, rowIndex, Object.assign({ bold: false, alignment: 'left', fontSize: 9 }, options));
}
const tdr = (content, rowIndex = -1, options = {}) => {
    return makeCell( content, rowIndex,Object.assign({ bold: false, alignment: 'right', fontSize: 9 }, options));
}

// -- Set the report date for display only.
const reportDate = () => new Date().toUTCString().substring(5,16);


const truncateContent = (content, maxLength = 17) => {
    return ''.concat(content.slice(0, maxLength), content.length > maxLength ? '…' : '');
}


// -- Create a base document template for the reports.
//TODO: il content lo crei fuori da questa funzione, in base a scelte fatte da utente
const createDocumentDefinition = (reportDate, reportOptions, timelineImg, ...contentParts) => { 

    let content = [{text: 'Security Events Report', style: 'title', width: '*'}];

    if (reportOptions['exportTimelineImg']){
        content.push({text: 'Security Events Timeline', style: 'titleSub', width: '*'});      
        if (see.timelineHeight > 1910) // The image fits the first page, even if it would be bigger
            content.push({image : timelineImg, width: 520, height: 700}); // Take all the available space, an alternative would be scaling
        else
            content.push({image : timelineImg, width: 520});
    };

    if (reportOptions['exportEventsTable']){
        content.push({text: `Events Details\n\n`, style: 'titleSub'});        
        content.push(...contentParts);
    };

    const baseDocDefinition = {
        pageSize: 'A4',
        footer: (currentPage, pageCount) => {
            return {
                text: `${reportDate} : Page ${currentPage.toString()} of ${pageCount.toString()}`,
                alignment: 'center',
                fontSize: 7
            }
        },

        styles: {
            title: {
                fontSize: 24,
				color : '#808080'
            },
            titleSub: {
                fontSize: 18,
				color : '#808080'
            },
            titleDate: {
                fontSize: 14,
                alignment: 'right',
                bold: true,
				color : '#808080'
            }
        },

        content: content,
    };
    const docDefinition = JSON.parse(JSON.stringify(baseDocDefinition));
    docDefinition.footer = baseDocDefinition.footer;
    //docDefinition.content.push(...contentParts);
    return docDefinition;
};

// Returns the array of chosen columns names
function getChosenColumns()
{
    const chosenColumns = { columnsNames : [], reportColumnsNames : []}; // Name of the column and name of the column in the report (insert spaces!)
    if ($('#EventIdColumn').is(":checked")) 
    {
        chosenColumns["columnsNames"].push('EventID');
        chosenColumns["reportColumnsNames"].push('EventID');
    }
    if ($('#EventNameColumn').is(":checked")) 
    {
        chosenColumns["columnsNames"].push('EventName');
        chosenColumns["reportColumnsNames"].push('Event\nName');
    }
    if ($('#LogonTypeColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('LogonType');
        chosenColumns["reportColumnsNames"].push('Logon\nType');
    }
    if ($('#SubjectUserSIDColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('SubjectUserSID');
        chosenColumns["reportColumnsNames"].push('Subject\nUserSID');
    }

    if ($('#SubjectUserNameColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('SubjectUserName');
        chosenColumns["reportColumnsNames"].push('Subject\nUserName');
    }

    if ($('#SubjectLogonIDColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('SubjectLogonID');
        chosenColumns["reportColumnsNames"].push('Subject\nLogonID');
    }

    if ($('#SubjectDomainNameColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('SubjectDomainName');
        chosenColumns["reportColumnsNames"].push('Subject\nDomain\nName');
    }

    if ($('#TargetUserSIDColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('TargetUserSID');
        chosenColumns["reportColumnsNames"].push('Target\nUserSID');
    }

    if ($('#TargetUserNameColumn').is(":checked")) 
    {
        chosenColumns["columnsNames"].push('TargetUserName');
        chosenColumns["reportColumnsNames"].push('Target\nUserName');
    }

    if ($('#TargetLogonIDColumn').is(":checked")) 
    {
        chosenColumns["columnsNames"].push('TargetLogonID');
        chosenColumns["reportColumnsNames"].push('Target\nLogonID');
    }

    if ($('#TargetDomainNameColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('TargetDomainName');
        chosenColumns["reportColumnsNames"].push('Target\nDomain\nName');
    }

    if ($('#ComputerColumn').is(":checked"))
    {
        chosenColumns["columnsNames"].push('Computer');
        chosenColumns["reportColumnsNames"].push('Computer');
    }
    
    chosenColumns["columnsNames"].push('Time');
    chosenColumns["reportColumnsNames"].push('Time');

    return chosenColumns;
}

function createEventsTable()
{
    const chosenColumns = getChosenColumns();

    const fontSize = 6;
    // -- Generate the body of the document table, with headings
    const tableBody = (dataRows) => {

        let title = [];
        let emptyRow = []; //empty row below title

        chosenColumns["reportColumnsNames"].forEach(function(columnTitle) 
        { 
            title.push( thl(columnTitle, -1, {rowSpan: 2, fontSize: fontSize, fillColor: '#36304a', color : 'white'}));
            emptyRow.push(thl(' '));
        });

        const body = [title, emptyRow];    

        dataRows.forEach((row, index) => {
            const tableRow = [];
            chosenColumns["columnsNames"].forEach(function(columnTitle) 
            { 
                tableRow.push(tdl(row[columnTitle], index, {fontSize: fontSize, color : '#808080'}));
            });
            body.push(tableRow);
        });

        
        return body;
    }

    const colWidth = 420 / chosenColumns["reportColumnsNames"].length; // assume max width: 420
    let colWidths = []; 
    for (let i=0;  i < chosenColumns["reportColumnsNames"].length; i++)
    {
        colWidths.push(colWidth);
    }
	
    // -- The main report table, with the table body.	
    var parsedEvents = normalizeParsedEvents();

    const tableData = {
		layout: 'noBorders',
        table: {
            headerRows: 2,
			widths: colWidths,
            body: tableBody(parsedEvents),
        }
    };
    return tableData;
}

// -- Generate the Underlying Loan Summary report.
function createReport() {
    
    let exportTimelineImg = ($('#ExportTimeline').is(":checked")) ? true : false;
    let exportEventsTable = ($('#ExportEventsTable').is(":checked")) ? true : false;
    let reportOptions = {exportTimelineImg : exportTimelineImg, exportEventsTable : exportEventsTable};
    let tableData = exportEventsTable ? createEventsTable() : null;
	
    //var timelineImg = exportTimelineImage();    
    const docDefinition = createDocumentDefinition(reportDate(), reportOptions, timelineImg, tableData); 
    pdfMake.createPdf(docDefinition).download(`Security Events Explorer Report - ${reportDate()}.pdf`);   
    
}

//TODO: dormi per almeno 2s, e nel frattempo blocca i click sulla pagina?
// Exports the timeline image and stores its height
async function exportTimelineImage(){
    await sleep(1000); //todo: reduce sleep time? Or better, think another way..
    html2canvas(document.querySelector("#visualization"), {backgroundColor:'#131720'}).then(canvas => {
        timelineImg = canvas.toDataURL(); // global variable        
    });
    see.timelineHeight = $('#visualization').height();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Show or hides the options for the columns of the report
function showOrHideReportColumnsOptions(columnCheckbox)
{
    if (columnCheckbox.checked){
        let reportColumnsOptions = 
        '<div class="checkbox white-text innerReportOption"><label><input id="EventIdColumn" type="checkbox" value="" checked>Show the Event ID </label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="EventNameColumn" type="checkbox" value="" checked>Show the Event Name</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="LogonTypeColumn" type="checkbox" value="" checked>Show the Logon Type</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="SubjectUserSIDColumn" type="checkbox" value="" checked>Show the Subject User SID</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="SubjectUserNameColumn" type="checkbox" value="" checked>Show the Subject Username</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="SubjectLogonIDColumn" type="checkbox" value="" checked>Show the Subject Logon ID</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="SubjectDomainNameColumn" type="checkbox" value="" checked>Show the Subject Domain Name</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="TargetUserSIDColumn" type="checkbox" value="" checked>Show the Target User SID</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="TargetUserNameColumn" type="checkbox" value="" checked>Show the Target User Name</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="TargetLogonIDColumn" type="checkbox" value="" checked>Show the Target Logon ID</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="TargetDomainNameColumn" type="checkbox" value="" checked>Show the Target Domain Name</label></div>'+
        '<div class="checkbox white-text innerReportOption"><label><input id="ComputerColumn" type="checkbox" value="" checked>Show the Computer Name</label></div>';
        $("#reportOptions").append(reportColumnsOptions);
    }
    else{
        // TODO: check
        $('#reportOptions .innerReportOption').remove(); //remove all inner options
    }
}
