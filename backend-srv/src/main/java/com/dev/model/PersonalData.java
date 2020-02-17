package com.dev.model;

import lombok.Data;

@Data
public class PersonalData {
    String client_name;
    String client_surname;
    String client_patronymic;
    String passport_series;
    String passport_number;
    String passport_date_of_issue;
}