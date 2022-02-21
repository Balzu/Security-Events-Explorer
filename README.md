# Security-Events-Explorer
A user-friendly and powerful tool to analyze Windows Security Events

SEE (Security Event Explorer) is an attempt to create a log intelligence tool which is both user-friendly and powerful.
Indeed, both during the monitoring activity of a security analyst and during Incident Response processes, we need reliable
and fast tools to explore log. One of the best places to look for potential indicator of comprimise is the Windows Event viewer, and Windows Security
Events can allow to discover malicious activities such as lateral movement, privilege escalation and so on. However, Windows Event Viewer, althouh powerful,
is not user friendly, and making research on it is complex and time-consuming. For this reason, I started the deployment of an open-source tool (MIT license once done)
which will be at disposal of cyber security analysts to quickly and better analyze security events happening in their network.
Currently, the tool is under active development, but the basics feature are already present.
For the moment being, the tool allows the analysis of Windows Security Events. You will need a log on Security Event exported from the Windows Event Viewer
to start. If you want to make a demo, you can drag this anonymizeed log fro here. Then, you can uplload it to the website, select which kind of events you are interested in,
apply filtering on time and on events (using the Orchestrator, but this is under development!) and then draw a clear timeline of the events. Finally, you will be able to
export the report in PDF format to provide evidence of your monitoring activity and detections.

## Try

The web-app is currently loaded on (my website)[http://thebytemachine.com/windows_security_explorer].
Code will be added to this GitHub pages as soon as all the features of version 1 will be implemented
and will be working smoothly.

### Demo



