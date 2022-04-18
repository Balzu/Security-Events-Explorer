function addOptionsSection(){
    var options =  
	`<div id="OptionsContainer" class="MenuContainer">
		<div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-logon"><b>LOGON PACKAGE</b><br></h4>
				<input id="files-options-logon-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="LogonPackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-LP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="Logon-4624" type="checkbox" class="lp-opt" value="">Interactive Logon <b>(logon)</b></label></div>				
				<div class="checkbox white-text"><label><input id="Logon-4648"type="checkbox" class="lp-opt" value="">An already logged on user logs on as another user <b>(logon)</b></label></div>
				<div class="checkbox white-text"><label><input id="SpecialLogon-4672"type="checkbox" class="lp-opt" value="">Special Logon <b>(specialLogon)</b></label></div>						
				<div class="checkbox white-text"><label><input id="LogonFailure-4625" type="checkbox" class="lp-opt" value="">Logon Failure <b>(logon fail)</b></label></div>
				<div class="checkbox white-text"><label><input id="Logoff-4647"type="checkbox" class="lp-opt" value="">User-initiated Logoff <b>(logoff)</b></label></div>
				<div class="checkbox white-text"><label><input id="Logoff-4634"type="checkbox" class="lp-opt" value="">Logoff process completed for a user <b>(logoff)</b></label></div>
				<div class="checkbox white-text"><label><input id="Logoff-4779"type="checkbox" class="lp-opt" value="">User disconnects from a RDP session <b>(logoff)</b></label></div>									
			</form>			
		</div>
        <div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-logon"><b>ACCOUNT LOGON PACKAGE</b><br></h4>
				<input id="files-options-account-logon-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="AccountLogonPackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-ALP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="eid672" type="checkbox" class="alp-opt" value="">An authentication service (AS) ticket was successfully issued and validated.</label></div>
				<div class="checkbox white-text"><label><input id="eid673" type="checkbox" class="alp-opt" value="">A Kerberos service ticket was requested./label></div>
				<div class="checkbox white-text"><label><input id="eid674" type="checkbox" class="alp-opt" value="">A Kerberos service ticket was renewed.</label></div>
				<div class="checkbox white-text"><label><input id="eid675" type="checkbox" class="alp-opt" value="">Kerberos pre-authentication failed.</label></div>
				<div class="checkbox white-text"><label><input id="eid676" type="checkbox" class="alp-opt" value="">A user account was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid677" type="checkbox" class="alp-opt" value="">A TGS ticket was not granted. </label></div>
				<div class="checkbox white-text"><label><input id="eid678" type="checkbox" class="alp-opt" value="">An account was mapped for logon.</label></div>
				<div class="checkbox white-text"><label><input id="eid681" type="checkbox" class="alp-opt" value="">The domain controller attempted to validate the credentials for an account.</label></div>
				<div class="checkbox white-text"><label><input id="eid682" type="checkbox" class="alp-opt" value="">A session was reconnected to a Window Station.</label></div>
				<div class="checkbox white-text"><label><input id="eid683" type="checkbox" class="alp-opt" value="">A session was disconnected from a Window Station.</label></div>
			</form>			
		</div>
		<div class="RowContainer" onclick="expandOptions(this)">			
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-account-management"><b>ACCOUNT MANAGEMENT PACKAGE</b><br></h4>
				<input id="files-options-account-management-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;" onclick="collapseOptions(this)">
			</span>
			<form id="AccountManagementOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-AMP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="eid4720-624" type="checkbox" class="am-opt" value="">A user account was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4723-627" type="checkbox" class="am-opt" value="">An attempt was made to change an account's password.</label></div>
				<div class="checkbox white-text"><label><input id="eid4724-628" type="checkbox" class="am-opt" value="">An attempt was made to reset an account's password.</label></div>
				<div class="checkbox white-text"><label><input id="eid4726-630" type="checkbox" class="am-opt" value="">A user account was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4727-631" type="checkbox" class="am-opt" value="">A security-enabled global group was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4728-632" type="checkbox" class="am-opt" value="">A member was added to a security-enabled global group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4729-633" type="checkbox" class="am-opt" value="">A member was removed from a security-enabled global group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4730-634" type="checkbox" class="am-opt" value="">A security-enabled global group was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4731-635" type="checkbox" class="am-opt" value="">A security-enabled local group was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4732-636" type="checkbox" class="am-opt" value="">A member was added to a security-enabled local group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4733-637" type="checkbox" class="am-opt" value="">A member was removed from a security-enabled local group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4734-638" type="checkbox" class="am-opt" value="">A security-enabled local group was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4735-639" type="checkbox" class="am-opt" value="">A security-enabled local group was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4737-641" type="checkbox" class="am-opt" value="">A security-enabled global group was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4738-642" type="checkbox" class="am-opt" value="">A user account was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4739-643" type="checkbox" class="am-opt" value="">Domain Policy was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4740-644" type="checkbox" class="am-opt" value="">A user account was locked out.</label></div>
				<div class="checkbox white-text"><label><input id="eid4741-645" type="checkbox" class="am-opt" value="">A computer account was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4742-646" type="checkbox" class="am-opt" value="">A computer account was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4743-647" type="checkbox" class="am-opt" value="">A computer account was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4744-648" type="checkbox" class="am-opt" value="">A security-disabled local group was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4745-649" type="checkbox" class="am-opt" value="">A security-disabled local group was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4746-650" type="checkbox" class="am-opt" value="">A member was added to a security-disabled local security group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4747-651" type="checkbox" class="am-opt" value="">A member was removed from a security-disabled local security group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4748-652" type="checkbox" class="am-opt" value="">A security-disabled local group was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4749-653" type="checkbox" class="am-opt" value="">A security-disabled global group was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4750-654" type="checkbox" class="am-opt" value="">A security-disabled global group was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4751-655" type="checkbox" class="am-opt" value="">A member was added to a security-disabled global group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4752-656" type="checkbox" class="am-opt" value="">A member was removed from a security-disabled global group</label></div>
				<div class="checkbox white-text"><label><input id="eid4753-657" type="checkbox" class="am-opt" value="">A security-disabled global group was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4754-658" type="checkbox" class="am-opt" value="">A security-enabled universal group was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4755-659" type="checkbox" class="am-opt" value="">A security-enabled universal group was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4756-660" type="checkbox" class="am-opt" value="">A member was added to a security-enabled universal group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4757-661" type="checkbox" class="am-opt" value="">A member was removed from a security-enabled universal group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4758-662" type="checkbox" class="am-opt" value="">A security-enabled universal group was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4759-663" type="checkbox" class="am-opt" value="">A security-disabled universal group was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4760-664" type="checkbox" class="am-opt" value="">A security-disabled universal group was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4761-665" type="checkbox" class="am-opt" value="">A member was added to a security-disabled universal group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4762-666" type="checkbox" class="am-opt" value="">A member was removed from a security-disabled universal group.</label></div>
				<div class="checkbox white-text"><label><input id="eid4763-667" type="checkbox" class="am-opt" value="">A security-disabled universal group was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4764-667" type="checkbox" class="am-opt" value="">A group type was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4780" type="checkbox" class="am-opt" value="">Set the security descriptor of members of administrative groups.</label></div>
				<div class="checkbox white-text"><label><input id="eid685" type="checkbox" class="am-opt" value="">Set the security descriptor of members of administrative groups.</label></div>						
			</form>	
		</div>
		<div class="RowContainer" onclick="expandOptions(this)">
            <span style="display: flex; ">
				<h4 style="display: inline;" id="system-events-logon"><b>SYSTEM EVENTS PACKAGE</b><br></h4>
				<input id="files-options-system-events-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="SystemEventsPackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-ALP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
                <div class="checkbox white-text"><label><input id="eid4608-512" type="checkbox" class="se-opt" value="">Windows is starting up.</label></div>
                <div class="checkbox white-text"><label><input id="eid4609-513" type="checkbox" class="se-opt" value="">Windows is shutting down.</label></div>
                <div class="checkbox white-text"><label><input id="eid4610-514" type="checkbox" class="se-opt" value="">An authentication package was loaded by the Local Security Authority.</label></div>
                <div class="checkbox white-text"><label><input id="eid4611-515" type="checkbox" class="se-opt" value="">A trusted logon process has registered with the Local Security Authority.</label></div>
                <div class="checkbox white-text"><label><input id="eid4612-516" type="checkbox" class="se-opt" value="">Internal resources allocated for the queuing of security event messages have been exhausted, leading to the loss of some security event messages.</label></div>
                <div class="checkbox white-text"><label><input id="eid1102-517" type="checkbox" class="se-opt" value="">The audit log was cleared.</label></div>
                <div class="checkbox white-text"><label><input id="eid4614-518" type="checkbox" class="se-opt" value="">A notification package was loaded by the Security Accounts Manager.</label></div>
                <div class="checkbox white-text"><label><input id="eid4615-519" type="checkbox" class="se-opt" value="">A process is using an invalid local procedure call (LPC) port in an attempt to impersonate a client and reply or read from or write to a client address space.</label></div>
                <div class="checkbox white-text"><label><input id="eid4616-520" type="checkbox" class="se-opt" value="">The system time was changed.</label></div>
			</form>	
		</div>


        <div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-object-access"><b>OBJECT ACCESS PACKAGE</b><br></h4>
				<input id="files-options-object-access-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="ObjectAccessPackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-OAP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="eid4656-560" type="checkbox" class="oa-opt" value="">A handle to an object was requested.</label></div>
				<div class="checkbox white-text"><label><input id="eid4658-562" type="checkbox" class="oa-opt" value="">The handle to an object was closed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4659-563" type="checkbox" class="oa-opt" value="">A handle to an object was requested with intent to delete.</label></div>
				<div class="checkbox white-text"><label><input id="eid4661-565" type="checkbox" class="oa-opt" value="">A handle to an object was requested.</label></div>
				<div class="checkbox white-text"><label><input id="eid4663-567" type="checkbox" class="oa-opt" value="">An attempt was made to access an object.</label></div>
				<div class="checkbox white-text"><label><input id="eid4664-568" type="checkbox" class="oa-opt" value="">An object was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4665-569" type="checkbox" class="oa-opt" value="">An attempt was made to create an application client context.</label></div>
				<div class="checkbox white-text"><label><input id="eid4666-570" type="checkbox" class="oa-opt" value="">An application attempted an operation.</label></div>
				<div class="checkbox white-text"><label><input id="eid4667-571" type="checkbox" class="oa-opt" value="">An application client context was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4668-572" type="checkbox" class="oa-opt" value="">An application was initialized.</label></div>
				<div class="checkbox white-text"><label><input id="eid4868-772" type="checkbox" class="oa-opt" value="">The certificate manager denied a pending certificate request.</label></div>
				<div class="checkbox white-text"><label><input id="eid4869-773" type="checkbox" class="oa-opt" value="">Certificate Services received a resubmitted certificate request.</label></div>
				<div class="checkbox white-text"><label><input id="eid4870-774" type="checkbox" class="oa-opt" value="">Certificate Services revoked a certificate.</label></div>
				<div class="checkbox white-text"><label><input id="eid4871-775" type="checkbox" class="oa-opt" value="">Certificate Services published the certificate revocation list (CRL).</label></div>
				<div class="checkbox white-text"><label><input id="eid4872-776" type="checkbox" class="oa-opt" value="">Certificate Services received a request to publish the certificate revocation list (CRL).</label></div>
				<div class="checkbox white-text"><label><input id="eid4873-777" type="checkbox" class="oa-opt" value="">A certificate request extension changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4874-778" type="checkbox" class="oa-opt" value="">One or more certificate request attributes changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4875-779" type="checkbox" class="oa-opt" value="">Certificate Services received a request to shut down.</label></div>
				<div class="checkbox white-text"><label><input id="eid4876-780" type="checkbox" class="oa-opt" value="">Certificate Services backup started.</label></div>
				<div class="checkbox white-text"><label><input id="eid4877-781" type="checkbox" class="oa-opt" value="">Certificate Services backup completed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4878-782" type="checkbox" class="oa-opt" value="">Certificate Services restore started.</label></div>
				<div class="checkbox white-text"><label><input id="eid4879-783" type="checkbox" class="oa-opt" value="">Certificate Services restore completed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4880-784" type="checkbox" class="oa-opt" value="">Certificate Services started.</label></div>
				<div class="checkbox white-text"><label><input id="eid4881-785" type="checkbox" class="oa-opt" value="">Certificate Services stopped.</label></div>
				<div class="checkbox white-text"><label><input id="eid4882-786" type="checkbox" class="oa-opt" value="">The security permissions for Certificate Services changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4883-787" type="checkbox" class="oa-opt" value="">Certificate Services retrieved an archived key.</label></div>
				<div class="checkbox white-text"><label><input id="eid4884-788" type="checkbox" class="oa-opt" value="">Certificate Services imported a certificate into its database.</label></div>
				<div class="checkbox white-text"><label><input id="eid4885-789" type="checkbox" class="oa-opt" value="">The audit filter for Certificate Services changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4886-790" type="checkbox" class="oa-opt" value="">Certificate Services received a certificate request.</label></div>
				<div class="checkbox white-text"><label><input id="eid4887-791" type="checkbox" class="oa-opt" value="">Certificate Services approved a certificate request and issued a certificate.</label></div>
				<div class="checkbox white-text"><label><input id="eid4888-792" type="checkbox" class="oa-opt" value="">Certificate Services denied a certificate request.</label></div>
				<div class="checkbox white-text"><label><input id="eid4889-793" type="checkbox" class="oa-opt" value="">Certificate Services set the status of a certificate request to pending.</label></div>
				<div class="checkbox white-text"><label><input id="eid4890-794" type="checkbox" class="oa-opt" value="">The certificate manager settings for Certificate Services changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4891-795" type="checkbox" class="oa-opt" value="">A configuration entry changed in Certificate Services.</label></div>
				<div class="checkbox white-text"><label><input id="eid4892-796" type="checkbox" class="oa-opt" value="">A property of Certificate Services changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4893-797" type="checkbox" class="oa-opt" value="">Certificate Services archived a key.</label></div>
				<div class="checkbox white-text"><label><input id="eid4894-798" type="checkbox" class="oa-opt" value="">Certificate Services imported and archived a key.</label></div>
				<div class="checkbox white-text"><label><input id="eid4895-799" type="checkbox" class="oa-opt" value="">Certificate Services published the CA certificate to Active Directory Domain Services.</label></div>
				<div class="checkbox white-text"><label><input id="eid4896-800" type="checkbox" class="oa-opt" value="">One or more rows have been deleted from the certificate database.</label></div>
				<div class="checkbox white-text"><label><input id="eid4897-801" type="checkbox" class="oa-opt" value="">Role separation enabled:</label></div>
			</form>			
		</div>
        <div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-policy"><b>POLICY PACKAGE</b><br></h4>
				<input id="files-options-policy-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="PolicyPackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-PP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="eid4704-608" type="checkbox" class="p-opt" value="">A user right was assigned.</label></div>
				<div class="checkbox white-text"><label><input id="eid4705-609" type="checkbox" class="p-opt" value="">A user right was removed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4706-610" type="checkbox" class="p-opt" value="">A new trust was created to a domain.</label></div>
				<div class="checkbox white-text"><label><input id="eid4707-611" type="checkbox" class="p-opt" value="">A trust to a domain was removed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4719-612" type="checkbox" class="p-opt" value="">System audit policy was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid613" type="checkbox" class="p-opt" value="">IPsec policy agent started</label></div>
				<div class="checkbox white-text"><label><input id="eid614" type="checkbox" class="p-opt" value="">IPsec policy agent disabled</label></div>
				<div class="checkbox white-text"><label><input id="eid615" type="checkbox" class="p-opt" value="">IPsec policy agent</label></div>
				<div class="checkbox white-text"><label><input id="eid616" type="checkbox" class="p-opt" value="">IPsec policy agent encountered a potential serious failure</label></div>
				<div class="checkbox white-text"><label><input id="eid4713-617" type="checkbox" class="p-opt" value="">Kerberos policy was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4714-618" type="checkbox" class="p-opt" value="">Encrypted data recovery policy was changed.</label></div>
				<div class="checkbox white-text"><label><input id="eid4716-620" type="checkbox" class="p-opt" value="">Trusted domain information was modified.</label></div>
				<div class="checkbox white-text"><label><input id="eid4717-621" type="checkbox" class="p-opt" value="">System security access was granted to an account.</label></div>
				<div class="checkbox white-text"><label><input id="eid4718-622" type="checkbox" class="p-opt" value="">System security access was removed from an account.</label></div>
				<div class="checkbox white-text"><label><input id="eid623" type="checkbox" class="p-opt" value="">Per user auditing policy was set for a user.</label></div>
				<div class="checkbox white-text"><label><input id="eid625" type="checkbox" class="p-opt" value="">User Account Type Changed</label></div>
				<div class="checkbox white-text"><label><input id="eid768" type="checkbox" class="p-opt" value="">A collision was detected between a namespace element in one forest and a namespace element in another forest.</label></div>
				<div class="checkbox white-text"><label><input id="eid769" type="checkbox" class="p-opt" value="">Trusted forest information was added.</label></div>
				<div class="checkbox white-text"><label><input id="eid770" type="checkbox" class="p-opt" value="">Trusted forest information was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid771" type="checkbox" class="p-opt" value="">Trusted forest information was modified.</label></div>
				<div class="checkbox white-text"><label><input id="eid805" type="checkbox" class="p-opt" value="">The event log service read the security log configuration for a session.</label></div>
				
			</form>			
		</div>

        <div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="privilege-use-logon"><b>PRIVILEGE USE PACKAGE</b><br></h4>
				<input id="files-options-privilege-use-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="PrivilegeUsePackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-PUP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="eid576" type="checkbox" class="pu-opt" value="">Special privileges assigned to new logon.</label></div>
				<div class="checkbox white-text"><label><input id="eid4673-577" type="checkbox" class="pu-opt" value="">A privileged service was called.</label></div>
				<div class="checkbox white-text"><label><input id="eid4674-578" type="checkbox" class="pu-opt" value="">An operation was attempted on a privileged object.</label></div>
			</form>			
		</div>

        <div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-process-inspection"><b>PROCESS INSPECTION PACKAGE</b><br></h4>
				<input id="files-options-process-inspection-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" >
			</span>
            <form id="ProcessInspectionPackageOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text">
				    <label>
				        <input id="sel-des-all-PIP" type="checkbox" value="" style="width: 18px;height: 18px;" onclick="selectOrDeselectAll(this)">
						<p style="padding-top: 3px;padding-left: 10px;margin-bottom: 0;">
						  <b>[ SELECT / DESELECT ALL ]</b>
						</p>
					</label>
				</div>
				<div class="checkbox white-text"><label><input id="eid4688-592" type="checkbox" class="pi-opt" value="">A new process has been created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4689-593" type="checkbox" class="pi-opt" value="">A process has exited.</label></div>
				<div class="checkbox white-text"><label><input id="eid4690-594" type="checkbox" class="pi-opt" value="">An attempt was made to duplicate a handle to an object.</label></div>
				<div class="checkbox white-text"><label><input id="eid4691-595" type="checkbox" class="pi-opt" value="">Indirect access to an object was requested.</label></div>
				<div class="checkbox white-text"><label><input id="eid4692-596" type="checkbox" class="pi-opt" value="">Backup of data protection master key was attempted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4693-597" type="checkbox" class="pi-opt" value="">Recovery of data protection master key was attempted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4694-598" type="checkbox" class="pi-opt" value="">Low	Protection of auditable protected data was attempted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4695-599" type="checkbox" class="pi-opt" value="">Unprotection of auditable protected data was attempted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4696-600" type="checkbox" class="pi-opt" value="">A primary token was assigned to process.</label></div>
				<div class="checkbox white-text"><label><input id="eid4697-601" type="checkbox" class="pi-opt" value="">Attempt to install a service</label></div>
				<div class="checkbox white-text"><label><input id="eid4698-602" type="checkbox" class="pi-opt" value="">A scheduled task was created.</label></div>
				<div class="checkbox white-text"><label><input id="eid4699" type="checkbox" class="pi-opt" value="">A scheduled task was deleted.</label></div>
				<div class="checkbox white-text"><label><input id="eid4700" type="checkbox" class="pi-opt" value="">A scheduled task was enabled.</label></div>
				<div class="checkbox white-text"><label><input id="eid4701" type="checkbox" class="pi-opt" value="">A scheduled task was disabled.</label></div>
				<div class="checkbox white-text"><label><input id="eid4702" type="checkbox" class="pi-opt" value="">A scheduled task was updated.</label></div>
			</form>			
		</div>


		<div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex; ">
				<h4 style="display: inline;" id="files-options-heuristics"><b>HEURISTICS</b><br></h4>
				<input id="files-options-process-inspection-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;"  onclick="collapseOptions(this)" checked>
			</span>
            	<form id="Heuristics" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text"><label><input id="SqueezeSimultaneousLogons" type="checkbox" value="" checked="">Squeeze Simultaneous Logon events <b>(recommended)</b></label></div>
			</form>			
		</div>
		<div class="RowContainer" onclick="expandOptions(this)">
			<span style="display: flex;">
				<h4 style="display: inline;" id="files-options-advanced"><b>ADVANCED</b><br></h4>
				<input id="files-options-advanced-switch" class="on-off-switch" type="checkbox" style="margin-left: auto;" onclick="collapseOptions(this)">
			</span>
			<form id="AdvancedOptions" class="RowContent" style="visibility:hidden; height:0;">
				<div class="checkbox white-text"><label title="Please, be aware that displaying all system events may lead to too many events"><input id="ShowSystemEvents"type="checkbox" class="lp-opt" value="">Show all System Events for Logon Package</label></div>
				<div class="checkbox white-text"><label><input id="SelectTime"type="checkbox" value="">Select Custom Time Range</label></div>
				<div id="TimeRangePickerContainer" class="checkbox disabled"><label><input id="TimeRangePicker" name="daterange" type="text" disabled></label>
					<script> 
					$(function() {
                      $('input[name="daterange"]').daterangepicker({
					    opens: 'left'
					  }, function(start, end, label) {
					    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
							    customStartTimeline = start.format('YYYY-MM-DD'); 
							    customEndTimeline = end.format('YYYY-MM-DD'); 
					  });
					});
					</script>		
				</div>
			</form>
		</div>
	</div>
	<h4><button type="button" class="btn btn-danger" onclick="continueToOrchestrator()">Continue</button></h4>
    `;
                   
    $( "#Options" ).append(options);
    $("#TimeRangePicker").css('pointer-events', 'none')
    $("#SelectTime").click(showOrHideRangePicker)
}