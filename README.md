# moneybird-gmail
Send your receipts from your gmail inbox directly to moneybird

# install
1. go to [Google Scripts](script.google.com) and create a new project
2. paste the content of `moneybird.gs.js` into the `.gs` file
3. replace `xxx@expenses.moneybird.com` with your moneybird email
4. add time triggerd project triggers for both functions
5. create rules in your gmail (or do it manually) to apply the labels `#MbReceipt` or `#MbReceiptAttch` to emails which include receips or attached receipts
