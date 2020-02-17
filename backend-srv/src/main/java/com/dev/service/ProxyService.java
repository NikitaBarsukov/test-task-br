package com.dev.service;

import com.dev.model.PersonalData;
import com.dev.model.dto.DocumentDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;
import java.io.StringReader;

@Service
public class ProxyService {

    private final String FILEHOLDER_URI = "http://localhost:8081/getFile";

    public DocumentDto getBase64FileFromAPIResponse(PersonalData personalData) throws Exception {
        String text = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            String response =
                    restTemplate.postForObject(FILEHOLDER_URI, wrapPersonalDataToSoap(personalData), String.class);

            XPath xPath = XPathFactory.newInstance().newXPath();
            text = xPath.evaluate("//document",
                    loadXMLFromString(response).getDocumentElement());
        } catch (Exception e) {
           text = "Error";
        }
        return new DocumentDto(text);
    }

    private static Document loadXMLFromString(String xml) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        InputSource is = new InputSource(new StringReader(xml));
        return builder.parse(is);
    }

    private String wrapPersonalDataToSoap(PersonalData personalData) {
        return "<soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:urn=\"urn:mFlow\">\n" +
                "  <soapenv:Header />\n" +
                " <soapenv:Body>\n" +
                "    <urn:request>\n" +
                "      <correlationId>C3BC97E1-2AE6-468A-B01B-E24659CC95F0</correlationId>\n" +
                "      <payload>\n" +
                "        <first_name>" + personalData.getClient_name() + "</first_name>\n" +
                "        <last_name>" + personalData.getClient_surname() + "</last_name>\n" +
                "        <patr_name>" + personalData.getClient_patronymic() + "</patr_name>\n" +
                "        <doc_number>" + personalData.getPassport_number() + "</doc_number>\n" +
                "        <doc_series>" + personalData.getPassport_series() + "</doc_series>\n" +
                "        <doc_issue_date>" + personalData.getPassport_date_of_issue() + "</doc_issue_date>\n" +
                "      </payload>\n" +
                "    </urn:request>\n" +
                "  </soapenv:Body>\n" +
                "</soapenv:Envelope>";
    }
}