const {execFileSync}=require('child_process');
for(const file of ['campaign-browser-qa.cjs','missions-browser-qa.cjs'])execFileSync(process.execPath,[__dirname+'/'+file],{stdio:'inherit',env:process.env});
