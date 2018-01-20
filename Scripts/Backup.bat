for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set date=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%


cd c:\Program Files\MySQL\MySQL Server 5.7\bin\
mysqldump.exe --user user --password=aaci1234 aacidatabase --result-file="C:\DatabaseBackup\%date%.sql"
