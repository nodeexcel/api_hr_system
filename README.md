# Api-Hr-System



### To install Dependencies

 npm install

### Add config file 
	add a config file at directory where you have cloned api_hr_system
format:

{
    "db":
    {
        "name": "",//database name
        "username": "",
        "password": "",
        "dialect": "mysql",
        "pool":
        {
            "max": 5,
            "min": 0,
            "idle": 20000,
            "acquire": 50000
        }
    },
    "port": , //port number
    "path": "", // path for attendance file
    "errMsg1": "Data not found",
    "fileSuccessMsg": "file uploaded successfully",
    "recordExists": "Record alredy exists",
    "success": "Your working hours are added for review",
    "secret": "" //secret key for token decoding 
}

### To run on local use

$ npm run dev

### To run on server use

$ pm2 start npm --name api_hr_system -- run dev
