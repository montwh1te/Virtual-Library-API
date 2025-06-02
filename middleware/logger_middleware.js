export async function realizaLog(req, res, next) {
    let requestTime = Date.now();
    console.log("Accessed Route: ",req.method+" "+req.path);    
    await next();
    console.log("Status Code: ",res.statusCode);
    let tempoExec = Date.now() - requestTime;
    console.log("Execution Time: ", tempoExec+"ms");
}