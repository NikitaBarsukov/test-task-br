"# test-task-br" 


JAVA_HOME must be set.

Using PowerShell

`git clone https://github.com/NikitaBarsukov/test-task-br.git`

`cd test-task-br`

`.\gradlew.bat start`

npmInstall task may be too long(about 15min)

front - localhost:3000

back - localhost:8081

```
curl --location --request POST 'localhost:8081/app/nbkirequest' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic dXNlcjpwYXNzd29yZA==' \
--data-raw '{
"personaldata": {
    "client_name": "Александр",
    "client_surname": "Громыко",
    "client_patronymic": "Александрович",
    "passport_series": "4109",
    "passport_number": "123 456",
    "passport_date_of_issue": "10.10.2010"
  }
}'
```

