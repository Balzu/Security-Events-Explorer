# Security-Events-Explorer

### A user-friendly and powerful tool to analyze Windows Security Events

<p align="center">
<img src="see.png" width=300>
</p>

SEE (Security Event Explorer) is an attempt to create a log intelligence tool which is both user-friendly and powerful.

Indeed, both during the monitoring activity of a security analyst and during Incident Response processes, we need reliable
and fast tools to explore logs. One of the best places to look for potential indicators of comprimise is the Windows Event viewer, and Windows Security
Events can allow to discover malicious activities such as lateral movement, privilege escalation and many others. However, Windows Event Viewer, although powerful,
is not user friendly, and making searches on it is complex and time-consuming. For this reason, I started the deployment of an open-source tool
which will be at disposal of cyber security analysts to quickly and better analyze security events happening in their network.

The tool allows the analysis of Windows Security Events. You will need to export Security Events in **xml** format from the Windows Event Viewer
to start. Then, you can load the logs on the webapp (note that *logs will stay on your browser and won't be sent to the server!*) or to your locally deployed application, select which kind of events you are interested in,
apply filtering on time and highlighting events using the Orchestrator and then draw a clear timeline of the events. Finally, you will be able to
export the report in PDF format to provide evidence of your monitoring activity and detections.

## Download and Run ...

Prerequisites:

You will need **Docker** and **Docker Compose** to run the tool: you can find the installation steps on the Docker website:

**Docker** : [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

**Docker Compose** : [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

Clone the Repo:

`git clone https://github.com/Balzu/Security-Events-Explorer.git`

Enter the folder:

`cd Security-Events-Explorer`

Run the tool in two distinct containers using Docker:

`docker-compose up`

Then access the tool, by opening your browser and simply typing in the bar: `localhost`

When you are done, turn off the tool:

`docker-compose down`

## ... Or try it Online!

The web-app is currently loaded on https://securityeventsexplorer.com

## Getting Started

* **Upload**

    Load one or more Windows Security Events in **xml** format.
    It is possible to export and save them in XML format from the Event Viewer or, to get started,
    you can use the *events.xml* file available in this repo.    
    
* **Options**

    Choose the events that you are interested into. Events are organized in categories.
    In the *Advanced* tab, you can set a custom time range.
    
* **Orchestrator**

    The orchestrator allows you to search for very specific chains of events.
    An example is a privilege escalation event, where a standard user logon (event id 4624)
    is followed by an Administrator logon (event id 4672).
    It is possible to apply filtering conditions on various fields (event ID, event name, 
    subject SID, etcetera) and combine different filters with AND or OR logic.
    
* **Draw**

    The *Draw* view allows to draw a timeline of the events. The timeline of all the selected events is shown,
    together with a timeline for each chain of events that matches the conditions defined with the orchestrator.
    
* **Export**

    The export view allows to export the timeline image and a table with all the selected events in PDF format.

### Demo

<img src="see-demo.gif" width="100%" >


