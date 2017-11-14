function send_Gmail_as_PDF() {
    var GMAIL_LABEL = "#MbReceipt";
    var thread = GmailApp.search("label:" + GMAIL_LABEL);
    var MONEYBIRD_EMAIL = "xxx@expenses.moneybird.com";
    var SENT_LABEL = "sentToMoneybird";
    var SUBJECT = "Receipt for processing in Moneybird";

    for (var x = 0; x < thread.length; x++) {
        var messages = thread[x].getMessages();
        for (var y = 0; y < messages.length; y++) {
            var attach = messages[y].getAttachments();
            var body = messages[y].getBody();
            var subject = messages[y].getSubject();
            // Create an HTML File from the Message Body
            var bodydochtml = DriveApp.createFile('body.html', body, "text/html")
            var bodyId = bodydochtml.getId()
            // Convert the HTML to PDF
            var bodydocpdf = bodydochtml.getAs('application/pdf').getBytes();
            var body_to_send = {
                fileName: subject+'.pdf',
                content: bodydocpdf,
                mimeType: 'application/pdf'
            };
            var attachmentList = [];
            attachmentList.push(body_to_send);
            // Trash the temporary file
            bodydochtml.setTrashed(true);
            // Process all attachments
            for (var att = 0; att < attach.length; att++) {
                var file = DriveApp.createFile(attach[att]);
                var pdf = file.getAs('application/pdf').getBytes();
                var attach_to_send = {
                    fileName: 'receipt.pdf',
                    content: pdf,
                    mimeType: 'application/pdf'
                };
                attachmentList.push(attach_to_send);
                // Trash the temporary file
                file.setTrashed(true);
            }
        }
        // Send the PDF to any email address
        MailApp.sendEmail(MONEYBIRD_EMAIL,
            SUBJECT,
            'see attachment', {
            attachments: attachmentList
        });
    
        //Mark as Read
        for (var r = 0; r < messages.length; r++) {
            GmailApp.markMessageRead(messages[r]);
        }
    
        // Set new Label as message sent to Moneybird
        GmailApp.getUserLabelByName(SENT_LABEL).addToThread(thread[x]);
        
        // Message Processed; Archive and Remove #Receipt Label
        GmailApp.moveThreadToArchive(thread[x]);
        GmailApp.getUserLabelByName(GMAIL_LABEL)
        .removeFromThread(thread[x]);
    }
}

function send_as_Attchment() {
    var GMAIL_LABEL = "#MbReceiptAttch";
    var thread = GmailApp.search("label:" + GMAIL_LABEL);

    for (var x = 0; x < thread.length; x++) {
        var messages = thread[x].getMessages();
        for (var y = 0; y < messages.length; y++) {
            var attach = messages[y].getAttachments();
            var body = messages[y].getBody();
            var subject = messages[y].getSubject();
        }
        // Send the PDF to any email address
        MailApp.sendEmail(MONEYBIRD_EMAIL,
            SUBJECT,
            'see attachment', {
            attachments: attach
        });
    
        //Mark as Read
        for (var r = 0; r < messages.length; r++) {
            GmailApp.markMessageRead(messages[r]);
        }
    
        // Set new Label as message sent to Moneybird
        GmailApp.getUserLabelByName(SENT_LABEL).addToThread(thread[x]);
        
        // Message Processed; Archive and Remove #Receipt Label
        GmailApp.moveThreadToArchive(thread[x]);
        GmailApp.getUserLabelByName(GMAIL_LABEL)
        .removeFromThread(thread[x]);
    
    }
}